import { useEffect, useState } from "react";
import { Button } from "../../components/Button.jsx";
import StatsSection from "../../components/StatsSection.jsx";
import { apiRequest } from "../../utils/api.js";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Admin(){

    const [activeTab, setActiveTab] = useState("users");

    // requests
    const [requests, setRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [visitDate, setVisitDate] = useState(null);

    useEffect(() => {
        if(activeTab === "requests"){
            fetchRequests();
        }
    }, [activeTab]);

    const fetchRequests = async () => {
        try {
            const res = await apiRequest("GET", "/admin/requests");

            setRequests(res.data || []);
        } catch(err){
            toast.error(err.message);
        }
    };

    // Split requests
    const pendingRequests = requests.filter(
        r => r.status === "pending"
    );

    const completedRequests = requests.filter(
        r => r.status === "approved" || r.status === "rejected"
    );

    const renderRequestCards = (list) => {

        return list.map(request => {

            const image =
                request.Property?.images?.length > 0
                ? `http://localhost:5000/${request.Property.images[0]}`
                : "/home.jpg";

            return (
                <div
                    key={request.id}
                    onClick={()=>{
                        setSelectedRequest(request);
                        setShowModal(true);
                    }}
                    className="
                        flex
                        flex-col
                        sm:flex-row
                        items-start
                        sm:items-center
                        justify-between
                        gap-4
                        p-4
                        rounded-xl
                        shadow
                        bg-soft-purple
                        cursor-pointer
                        hover:shadow-lg
                        transition
                    "
                >

                    <img
                        src={image}
                        alt="property"
                        className="
                            w-20 h-20
                            rounded-lg
                            object-cover
                            self-center sm:self-auto
                        "
                    />

                    <div className="flex-1">
                        <h3 className="font-semibold">
                            {request.Property?.title}
                        </h3>

                        <p className="text-sm text-gray-500">
                            {request.User?.name}
                        </p>

                        <p className="text-sm text-gray-500">
                            {request.description}
                        </p>
                    </div>

                    <span
                        className={`
                            px-3 py-1 rounded-full text-sm capitalize
                            ${
                                request.status === "pending"
                                ? "bg-yellow-200 text-yellow-800"
                                : request.status === "approved"
                                ? "bg-soft-olive text-green-800"
                                : "bg-red text-red-800"
                            }
                        `}
                    >
                        {request.status}
                    </span>

                </div>
            );
        });
    };

    const updateRequestStatus = async (status) => {

        try {

            await apiRequest("PATCH",
                `/requests/${selectedrequest.id}`,
                {
                    data:{
                        status,
                        visitDate
                    }
                }
            );

            toast.success("request updated");

            setShowModal(false);
            fetchRequests();

        } catch(err){
            toast.error(err.message);
        }
    };

    return(
        <div className="p-6 max-w-[1200px] mx-auto px-6">

            <div className="flex flex-row gap-16">

                {/* Sidebar */}
                <div className="mt-16 w-[300px]">

                    <Button onClick={()=>setActiveTab("users")}>
                        Users
                    </Button>

                    <Button
                        className="mt-2"
                        onClick={()=>setActiveTab("requests")}
                    >
                        Requests
                    </Button>

                </div>

                {/* Main Content */}
                <div className="flex-1">

                    <StatsSection/>

                    {/* USERS TAB */}
                    {activeTab === "users" && (
                        <div className="mt-6">
                            <h2 className="text-xl font-semibold">
                                Users Section
                            </h2>
                        </div>
                    )}

                    {/* requestS TAB */}
                    {activeTab === "requests" && (

                        <div className="mt-6">

                            <h2 className="text-xl font-semibold mb-4">
                                Pending Requests
                            </h2>

                            <div className="grid gap-4">
                                {renderRequestCards(pendingRequests)}
                            </div>

                            <h2 className="text-xl font-semibold mt-8 mb-4">
                                Completed Requests
                            </h2>

                            <div className="grid gap-4">
                                {renderRequestCards(completedRequests)}
                            </div>

                        </div>
                    )}

                </div>
            </div>

            {/* MODAL */}
            {showModal && selectedRequest && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

                    <div className="bg-white p-6 rounded-xl w-[500px]">

                        <h2 className="text-xl font-semibold mb-4">
                            request Details
                        </h2>

                        <p>
                            User: {selectedRequest.User?.name}
                        </p>

                        <p>
                            Email: {selectedRequest.User?.email}
                        </p>

                        <p className="mt-2">
                            Property: {selectedRequest.Property?.title}
                        </p>

                        <p className="text-sm text-gray-500 mt-2">
                            {selectedRequest.description}
                        </p>

                        {/* Visit Date */}
                        <div className="mt-4">
                            <label className="block text-sm mb-1">
                                Schedule Visit Date
                            </label>

                            <DatePicker
                                selected={visitDate}
                                onChange={setVisitDate}
                                className="border p-2 rounded w-full"
                            />
                        </div>

                        <div className="flex justify-end gap-3 mt-6">

                            <Button
                                onClick={()=>setShowModal(false)}
                            >
                                Close
                            </Button>

                            <Button
                                onClick={()=>updateRequestStatus("approved")}
                                className="bg-green-600"
                            >
                                Approve
                            </Button>

                            <Button
                                onClick={()=>updateRequestStatus("rejected")}
                                className="bg-red"
                            >
                                Reject
                            </Button>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}
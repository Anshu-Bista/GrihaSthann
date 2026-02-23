import { useEffect, useState } from "react";
import { Button } from "../../components/Button.jsx";
import StatsSection from "../../components/StatsSection.jsx";
import { apiRequest } from "../../utils/api.js";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("users");

  // Requests
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [visitDate, setVisitDate] = useState(null);

  // Request filter toggle
  const [requestFilter, setRequestFilter] = useState("pending");

  //User
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (activeTab === "requests") fetchRequests();
    if (activeTab === "users") fetchUsers();
  }, [activeTab]);

  const fetchRequests = async () => {
    try {
      const res = await apiRequest("GET", "/admin/requests");
      setRequests(res.data || []);
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Split requests
  const pendingRequests = requests.filter((r) => r.status === "pending");

  const completedRequests = requests.filter(
    (r) => r.status === "approved" || r.status === "rejected"
  );

  const renderRequestCards = (list) => {
    return list.map((request) => {
      const image =
        request.Property?.images?.length > 0
          ? `http://localhost:5000/${request.Property.images[0]}`
          : "/home.jpg";

      return (
        <div
          key={request.id}
          onClick={() => {
            setSelectedRequest(request);
            setShowModal(true);
          }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl shadow bg-soft-purple cursor-pointer hover:shadow-lg transition"
        >
          <img
            src={image}
            alt="property"
            className="w-20 h-20 rounded-lg object-cover self-center sm:self-auto"
          />

          <div className="flex-1">
            <h3 className="font-semibold">{request.Property?.title}</h3>

            <p className="text-sm text-gray-500">{request.User?.name}</p>

            <p className="text-sm text-gray-500">{request.description}</p>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-sm capitalize
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
      await apiRequest("PATCH", `/admin/requests/${selectedRequest.id}`, {
        data: {
          status,
          visitDate,
        },
      });

      toast.success("Request updated");

      setShowModal(false);
      fetchRequests();
    } catch (err) {
      toast.error(err.message);
    }
  };

  //fetch users
  const fetchUsers = async () => {
    try {
      const res = await apiRequest("GET", "/admin/users");

    console.log("USERS RESPONSE:", res);
  
      setUsers(res || []);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const renderUserCards = () => {
    return users.map(user => {
  
      const image =
        user.profile
          ? `http://localhost:5000/${user.profile}`
          : "/home.jpg";
  
      return (
        <div
          key={user.id}
          className="
            flex
            items-center
            gap-4
            p-4
            rounded-xl
            shadow
            bg-soft-purple
            hover:shadow-lg
            transition
          "
        >
  
          {/* Image */}
          <img
            src={image}
            alt="user"
            className="
              w-16 h-16
              rounded-full
              object-cover
            "
          />
  
          {/* Details */}
          <div className="flex-1">
            <h3 className="font-semibold text-forest-green">
              {user.name}
            </h3>
  
            <p className="text-sm text-gray-500">
              {user.email}
            </p>
  
            <p className="text-xs text-gray-400">
              Registered:
              {" "}
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
  
        </div>
      );
    });
  };

  return (
    <div className="p-4 md:p-6 max-w-[1200px] mx-auto">
  
      {/* ⭐ Main Layout Row */}
      <div className="flex flex-col md:flex-row gap-6">
  
        {/* ⭐ Sidebar (Desktop Left) */}
        <div className="w-full md:w-[220px] flex md:flex-col mt-16 gap-2">
  
          <Button
            onClick={() => setActiveTab("users")}
            className={`w-full ${
              activeTab === "users" ? "bg-green-600" : ""
            }`}
          >
            Users
          </Button>
  
          <Button
            onClick={() => setActiveTab("requests")}
            className={`w-full ${
              activeTab === "requests" ? "bg-green-600" : ""
            }`}
          >
            Requests
          </Button>
  
        </div>
  
        {/* ⭐ Right Side Content */}
        <div className="flex-1 space-y-6">
  
          {/* ⭐ Stats Section (Aligned with Sidebar Top) */}
          <StatsSection />
  
          {/* USERS TAB */}
          {activeTab === "users" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Users List
              </h2>
  
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {users.length > 0
                  ? renderUserCards()
                  : (
                    <p className="text-gray-500 text-center col-span-full">
                      No users found
                    </p>
                  )}
              </div>
            </div>
          )}
  
          {/* REQUEST TAB */}
          {activeTab === "requests" && (
            <div className="grid md:grid-cols-2 gap-6">
  
              {/* Pending */}
              <div>
                <h3 className="font-semibold text-yellow-600 mb-3">
                  Pending Requests
                </h3>
  
                {pendingRequests.length > 0
                  ? renderRequestCards(pendingRequests)
                  : <p className="text-gray-500">No pending requests</p>
                }
              </div>
  
              {/* Completed */}
              <div>
                <h3 className="font-semibold text-green-600 mb-3">
                  Completed Requests
                </h3>
  
                {completedRequests.length > 0
                  ? renderRequestCards(completedRequests)
                  : <p className="text-gray-500">No completed requests</p>
                }
              </div>
  
            </div>
          )}
  
        </div>
  
      </div>
  
      {/* ⭐ Modal (unchanged) */}
      {showModal && selectedRequest && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-4 z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              Request Details
            </h2>
  
            <p>User: {selectedRequest.User?.name}</p>
            <p>Email: {selectedRequest.User?.email}</p>
  
            <p className="mt-2">
              Property: {selectedRequest.Property?.title}
            </p>
  
            <p className="text-sm text-gray-500 mt-2">
              {selectedRequest.description}
            </p>
  
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
  
            <div className="flex justify-end gap-3 mt-6 flex-wrap">
              <Button onClick={() => setShowModal(false)}>
                Close
              </Button>
  
              <Button
                onClick={() => updateRequestStatus("approved")}
                className="bg-green-600"
              >
                Approve
              </Button>
  
              <Button
                onClick={() => updateRequestStatus("rejected")}
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

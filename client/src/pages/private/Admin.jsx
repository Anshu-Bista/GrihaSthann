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
    <div className="p-6 max-w-[1200px] mx-auto px-6">
      <div className="flex flex-row gap-16">
        {/* Sidebar */}
        <div className="mt-16 w-[300px]">
          <Button onClick={() => setActiveTab("users")}>Users</Button>

          <Button className="mt-2" onClick={() => setActiveTab("requests")}>
            Requests
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <StatsSection />

          {/* USERS TAB */}
          {activeTab === "users" && (
            <div className="mt-6">

                <h2 className="text-xl font-semibold mb-4">
                Users List
                </h2>

                <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-4
                ">
                {users.length > 0
                    ? renderUserCards()
                    : (
                    <p className="text-gray-500">
                        No users found
                    </p>
                    )
                }
                </div>

            </div>
            )}

          {/* REQUEST TAB */}
          {activeTab === "requests" && (
            <div className="mt-6">
              {/* Toggle Buttons */}
              <div className="flex gap-4 mb-6">
                <Button
                  onClick={() => setRequestFilter("pending")}
                  className={requestFilter === "pending" ? "bg-green-600" : ""}
                >
                  Pending Requests
                </Button>

                <Button
                  onClick={() => setRequestFilter("completed")}
                  className={requestFilter === "completed" ? "bg-blue-600" : ""}
                >
                  Completed Requests
                </Button>
              </div>

              {/* Request Lists */}
              <div className="grid gap-4">

                {/* Pending */}
                {requestFilter === "pending" && (
                    pendingRequests.length > 0 ? (
                    renderRequestCards(pendingRequests)
                    ) : (
                    <p className="text-gray-500 text-center">
                        No pending requests
                    </p>
                    )
                )}

                {/* Completed */}
                {requestFilter === "completed" && (
                    completedRequests.length > 0 ? (
                    renderRequestCards(completedRequests)
                    ) : (
                    <p className="text-gray-500 text-center">
                        No completed requests
                    </p>
                    )
                )}

                </div>
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      {showModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-[500px]">
            <h2 className="text-xl font-semibold mb-4">Request Details</h2>

            <p>User: {selectedRequest.User?.name}</p>
            <p>Email: {selectedRequest.User?.email}</p>

            <p className="mt-2">Property: {selectedRequest.Property?.title}</p>

            <p className="text-sm text-gray-500 mt-2">
              {selectedRequest.description}
            </p>

            {/* Visit Date */}
            <div className="mt-4">
              <label className="block text-sm mb-1">Schedule Visit Date</label>

              <DatePicker
                selected={visitDate}
                onChange={setVisitDate}
                className="border p-2 rounded w-full"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button onClick={() => setShowModal(false)}>Close</Button>

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

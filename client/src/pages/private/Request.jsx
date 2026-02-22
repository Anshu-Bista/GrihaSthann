import { useEffect, useState } from "react";
import { apiRequest } from "../../utils/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Request() {

  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await apiRequest("GET", "/requests/user");

      setRequests(res.data || []);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter requests
  const pendingRequests = requests.filter(
    r => r.status === "pending"
  );

  const completedRequests = requests.filter(
    r => r.status === "approved" || r.status === "rejected"
  );

  const displayedRequests =
    activeTab === "pending"
      ? pendingRequests
      : completedRequests;

  if (loading) return (
    <p className="p-6 text-center">Loading...</p>
  );

  return (
    <div className="p-6 max-w-[1200px] mx-auto">

      {/* Toggle Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("pending")}
          className={`
            px-4 py-2 rounded-lg font-medium transition
            ${activeTab === "pending"
              ? "bg-forest-green text-white"
              : "bg-gray-200"}
          `}
        >
          Pending Requests
        </button>

        <button
          onClick={() => setActiveTab("completed")}
          className={`
            px-4 py-2 rounded-lg font-medium transition
            ${activeTab === "completed"
              ? "bg-forest-green text-white"
              : "bg-gray-200"}
          `}
        >
          Completed Requests
        </button>
      </div>

      {/* Request List */}
      <div className="grid gap-4">

        {displayedRequests.length === 0 && (
          <p className="text-gray-500">
            No requests found
          </p>
        )}

        {displayedRequests.map(req => {

          const image =
            req.Property?.images?.length > 0
              ? `http://localhost:5000/${req.Property.images[0]}`
              : "/home.jpg";

          return (
            <div
              key={req.id}

              // Navigation on click
              onClick={() =>
                navigate(`/property/${req.propertyId}`)
              }
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
                transition
                duration-300
                hover:shadow-lg
                hover:-translate-y-1
                hover:scale-[1.01]" >

              {/* LEFT - Image */}
              <img
                src={image}
                alt="Property"
                className="
                        w-20
                        h-20
                        rounded-lg
                        object-cover
                        self-center
                        sm:self-auto
                        "/>

              {/* MIDDLE - Details */}
              <div className="flex-1">
                <p className="text-sm text-gray-500">
                  ID:
                  <span className="font-medium ml-1">
                    {req.propertyId}
                  </span>
                </p>

                <p className="text-lg font-semibold text-forest-green">
                  {req.Property?.title || "Property Name"}
                </p>

                <p className="text-sm text-gray-500 capitalize">
                  {req.Property?.locationArea},
                  {" "}
                  {req.Property?.city}
                </p>
              </div>

              {/* RIGHT - Status */}
              <div className="flex flex-col items-end">

                <span
                  className={`
                    px-3 py-1 rounded-full text-sm font-medium capitalize
                    ${
                      req.status === "pending"
                        ? "bg-off-white text-yellow-800"
                        : req.status === "approved"
                        ? "bg-soft-olive text-green-800"
                        : "bg-red text-red-800"
                    }
                  `}
                >
                  {req.status}
                </span>

                {req.visitDate && (
                  <span className="text-xs text-gray-500 mt-2">
                    {new Date(req.visitDate).toLocaleDateString()}
                  </span>
                )}

              </div>

            </div>
          );
        })}

      </div>
    </div>
  );
}
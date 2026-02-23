import bed from "../assets/bed.png";
import bath from "../assets/shower.png";
import area from "../assets/area.png";
import eye from "../assets/eye.svg";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useState } from "react";

export default function PropertyCard({ item }) {
  const {user} = useAuth();
  const isAdmin = user?.role === "admin";

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // Handle click
  const handleClick = () => {
    navigate(`/property/${item.propertyId}`); 
  };

  // Determine image
  const propertyImage =
    item.images && item.images.length > 0
      ? `http://localhost:5000/${item.images[0]}`
      : "/home.jpg";

  //delete  item
  const handleDelete = () => {

    swal({
      title: "Are you sure?",
      text: "Once deleted, this property cannot be recovered!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
  
      if (willDelete) {
  
        // Call your delete API here
        console.log("Delete property:", item.propertyId);
  
        swal("Property deleted successfully!", {
          icon: "success",
        });
  
      }
    });
  };

  return (
    <div
      onClick={handleClick}
      className="
        flex flex-col
        bg-soft-purple
        shadow-md
        overflow-hidden
        rounded-xl
        w-full
        max-w-[340px]
        cursor-pointer
        hover::shadow-lg
        transition
      "
    >
      {/* Image (No Padding) */}
      <img
        src={propertyImage}
        alt="Property"
        className="w-full h-[200px] object-cover"
      />

      {/* Content */}
      <div
        className="
          px-4 sm:px-5 lg:px-[20px]
          pt-6 sm:pt-7 lg:pt-8
          pb-2
          flex
          flex-col
        "
      >
        <div className="flex justify-between items-center relative">

          {/* Price */}
          <p className="text-gold font-bold text-[24px]">
            {item.price || "0"}

            <span className="text-[16px] text-dark-grey font-normal ml-1">
              / month
            </span>
          </p>

          {/* Right Side Controls */}
          <div className="flex items-center gap-4">

            {/* View Count */}
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-full bg-off-white hover:bg-gray-100">
                <img src={eye} alt="" className="w-5 h-5" />
              </button>

              <span className="text-sm text-gray-600 font-medium">
                {item.viewCount || 0}
              </span>
            </div>

            {/* ⭐ ADMIN ONLY MORE MENU */}
            {isAdmin && (
              <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuOpen(prev => !prev);
                    }}
                    className="text-xl font-bold px-2 hover:bg-gray-100 rounded"
                  >
                    ⋮
                  </button>
                {menuOpen && (
                  <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-32 z-50">

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete();
                      }}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Delete
                    </button>

                  </div>
                )}

              </div>
            )}

          </div>
        </div>

        {/* Title */}
        <h3
          className="
            mt-2
            text-[22px] sm:text-[24px]
            font-bold
            text-forest-green
            leading-tight
          "
        >
          {item.title}
        </h3>

        {/* Location */}
        <p
          className="
            text-[14px] sm:text-[16px]
            text-dark-grey
            mt-1
            mb-4 sm:mb-6 lg:mb-8
          "
        >
          {item.street}, {item.locationArea}, {item.city}
        </p>

        {/* Details */}
        <div
          className="
            flex
            flex-wrap
            gap-3 sm:gap-4
            text-[13px] sm:text-[14px]
            text-gray-700
            font-medium
          "
        >
          {/* Bed */}
          <div className="flex items-center gap-1">
            <img src={bed} alt="Bed" className="w-4 h-4" />
            <span>{item.bed} Bedrooms</span>
          </div>

          {/* Bath */}
          <div className="flex items-center gap-1">
            <img src={bath} alt="Bath" className="w-4 h-4" />
            <span>{item.bath} Bathrooms</span>
          </div>

          {/* Area */}
          <div className="flex items-center gap-1">
            <img src={area} alt="Area" className="w-4 h-4" />
            <span>{item.area} m²</span>
          </div>
        </div>
      </div>
    </div>
  );
}

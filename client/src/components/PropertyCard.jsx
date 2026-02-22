import bed from "../assets/bed.png";
import bath from "../assets/shower.png";
import area from "../assets/area.png";
import eye from "../assets/eye.svg";
import { useNavigate } from "react-router-dom";

export default function PropertyCard({ item }) {

  const navigate = useNavigate();

  // Handle click
  const handleClick = () => {
    navigate(`/property/${item.propertyId}`); 
  };

  // Determine image
  const propertyImage =
    item.images && item.images.length > 0
      ? `http://localhost:5000/${item.images[0]}`
      : "/home.jpg";

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
        {/* Price + Views */}
        <div className="flex justify-between items-center">
          <p className="text-gold font-bold text-[24px]">
            {item.price || "0"}

            <span className="text-[16px] text-dark-grey font-normal ml-1">
              / month
            </span>
          </p>

          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full bg-off-white hover:bg-gray-100">
              <img src={eye} alt="" className="w-5 h-5" />
            </button>

            <span className="text-sm text-gray-600 font-medium">
              {item.viewCount || 0}
            </span>
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

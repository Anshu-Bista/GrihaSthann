import favourite from "../assets/favourite.png";
import bed from "../assets/bed.png";
import bath from "../assets/shower.png";
import area from "../assets/area.png";

export default function PropertyCard({ item }) {
  // Determine image
  const propertyImage =
    item.images && item.images.length > 0
      ? `http://localhost:5000${item.images[0]}`
      : "/home.jpg";

  return (
    <div
      className="
        flex flex-col
        bg-soft-purple
        shadow-md
        overflow-hidden
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
        px-[25px]
        pt-8
        pb-2
        flex
        flex-col
        "
      >
        {/* Price + Favorite */}
        <div className="flex justify-between items-start">
          <p className="text-old text-gold font-bold text-[24px]">
            {item.price || "0"}

            <span className="text-[16px] text-dark-grey font-normal ml-1">/ month</span>
          </p>

          <div
            className="
              w-9 h-9
              rounded-full
              bg-off-white
              flex
              items-center
              justify-center
            "
          >
            <img src={favourite} alt="Favourite" className="w-4 h-4" />
          </div>
        </div>

        {/* Title */}
        <h3
          className="
            mt-2
            text-[24px]
            font-bold
            text-forest-green
          "
        >
          {item.title}
        </h3>

        {/* Location (32px margin bottom) */}
        <p
          className="
            text-[16px]
            text-dark-grey
            mt-1
            mb-8
          "
        >
          {item.street}, {item.locationArea}, {item.city}
        </p>

        {/* Details */}
        <div
          className="
            flex
            gap-4
            text-[14px]
            text-gray-700
            font-medium
          "
        >
          {/* Bed */}
          <div className="flex items-center gap-1">
            <img src={bed} alt="Bed" className="w-4 h-4 font-bold" />

            <span>{item.bed} Bedrooms</span>
          </div>

          {/* Bath */}
          <div className="flex items-center gap-1">
            <img src={bath} alt="Bath" className="w-4 h-4 font-bold" />

            <span>{item.bath} Bathrooms</span>
          </div>

          {/* Area */}
          <div className="flex items-center gap-1">
            <img src={area} alt="Area" className="w-4 h-4 font-bold" />

            <span>{item.area} m. sq.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

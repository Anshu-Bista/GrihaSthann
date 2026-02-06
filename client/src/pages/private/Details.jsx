import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Button } from "../../components/Button.jsx";
import bed from "../../assets/bed.png";
import bath from "../../assets/shower.png";
import kitchen from "../../assets/kitchen.png";
import furniture from "../../assets/furniture.png";
import category from "../../assets/category.png";
import area from "../../assets/area.png";
import favourite from "../../assets/favourite.png";
import eye from "../../assets/eye.svg";

export default function Details() {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch single property
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/properties/${id}`)
      .then((res) => {
        console.log(res.data.data);
        setProperty(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch property", err);
        setLoading(false);
      });
  }, [id]);

  // Loading state
  if (loading) {
    return <p className="p-6 text-center">Loading...</p>;
  }

  // Not found
  if (!property) {
    return <p className="p-6 text-center">Property not found</p>;
  }

  // Determine image
  const propertyImage =
    property.images && property.images.length > 0
      ? `http://localhost:5000${property.images[0]}`
      : "/home.jpg";

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-bright-green";
      case "rented":
        return "bg-primary-purple";
      case "inactive":
        return "bg-red";
      default:
        return "bg-dark-grey";
    }
  };
  const getFurnishingLabel = (value) => {
    if (value === "yes") return "Furnished";
    if (value === "no") return "Unfurnished";
    return "N/A";
  };

  return (
    <div className="p-6 max-w-[1200px] mx-auto px-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        {/* Left Content */}
        <div className="flex flex-col gap-2">
          {/* Title */}
          <h3
            className="
            text-[26px] sm:text-[30px]
            font-bold
            text-forest-green
            leading-tight
            "
          >
            {property.title}
          </h3>

          {/* Location */}
          <p className="text-[14px] sm:text-[16px] text-dark-grey">
            {property.street}, {property.locationArea}, {property.city}
          </p>

          {/* Status */}
          <div className="flex items-center gap-2">
            {/* Color Circle */}
            <span
              className={`
                w-3 h-3
                rounded-full
                ${getStatusColor(property.status)}
            `}
            ></span>

            {/* Status Text and Date*/}
            <p className="text-[14px] sm:text-[16px] text-dark-grey capitalize">
              {property.status} -{" "}
              {new Date(property.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Right Button */}
        <div className="flex items-center sm:self-center">
          <Button type="submit" className="px-6 py-2">
            Request A Visit
          </Button>
        </div>
      </div>

      {/* Image (No Padding) */}
      <img
        src={propertyImage}
        alt="Property"
        className="w-full h-[200px] object-cover"
      />
      {/* Price */}
      <p className="text-gold font-bold text-[24px]">
        {property.price || "0"}

        <span className="text-[16px] text-dark-grey font-normal ml-1">
          / month
        </span>
      </p>

      {/* Details + Actions */}
      <div className="flex justify-between items-start">
        {/* Left Details */}
        <div
          className="
                grid
                grid-cols-2
                sm:grid-cols-3
                gap-x-4
                gap-y-2
                text-[13px] sm:text-[14px]
                text-gray-700
                font-medium
            "
        >
          {/* Bed */}
          <div className="flex items-center gap-1">
            <img src={bed} alt="Bed" className="w-4 h-4" />
            <span>{property.bed} Bedrooms</span>
          </div>

          {/* Bath */}
          <div className="flex items-center gap-1">
            <img src={bath} alt="Bath" className="w-4 h-4" />
            <span>{property.bath} Bathrooms</span>
          </div>

          {/* Kitchen */}
          <div className="flex items-center gap-1">
            <img src={kitchen} alt="Kitchen" className="w-4 h-4" />
            <span>{property.kitchen} Kitchen</span>
          </div>

          {/* Area */}
          <div className="flex items-center gap-1">
            <img src={area} alt="Area" className="w-4 h-4" />
            <span>{property.area} m²</span>
          </div>

          {/* Category */}
          <div className="flex items-center gap-1">
            <img src={category} alt="Category" className="w-4 h-4" />
            <span className="capitalize">{property.propertyType}</span>
          </div>

          {/* Furniture */}
          <div className="flex items-center gap-1">
            <img src={furniture} alt="Furniture" className="w-4 h-4" />
            <span>{getFurnishingLabel(property.furnishingStatus)}</span>
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex gap-2 ml-4">
          {/* Favorite */}
          <button className="p-2 rounded-full bg-off-white hover:bg-gray-100">
            <img src={favourite} alt="" className="w-5 h-5" />
          </button>

          {/* Views */}
          <button className="p-2 rounded-full bg-off-white hover:bg-gray-100">
            <img src={eye} alt="" className="w-5 h-5 stroke-[3.5]" />
          </button>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { Button } from "../../components/Button.jsx";
import bed from "../../assets/bed.png";
import bath from "../../assets/shower.png";
import kitchen from "../../assets/kitchen.png";
import furniture from "../../assets/furniture.png";
import category from "../../assets/category.png";
import area from "../../assets/area.png";
import time from "../../assets/time.png";
import point from "../../assets/point.png";
import eye from "../../assets/eye.svg";
import { apiRequest } from "../../utils/api.js";

export default function Details() {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [requestSent, setRequestSent] = useState(false);

  // Fetch single property
  useEffect(() => {

    let isMounted = true;
  
    const fetchProperty = async () => {
      try {
        const response = await apiRequest(
          "GET",
          `/properties/${id}`
        );
  
        if (isMounted) {
          setProperty(response.data);
        }
  
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProperty();
  
    return () => {
      isMounted = false;
    };
  
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
    const images =
    Array.isArray(property.images) && property.images.length > 0
      ? property.images
      : [];
    
    const totalImages = images.length;
    
    const nextImage = () =>
      setCurrentIndex((prev) => (prev + 1) % totalImages);
    
    const prevImage = () =>
      setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
    
    const propertyImage =
      totalImages > 0
        ? `http://localhost:5000/${images[currentIndex].replace(/^\/+/, "")}`
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

  const sendRequest = async () => {console.log("PROPERTY ID:", property?.propertyId);
    const toastId = toast.loading("Sending request...");
  
    try {
      const response = await apiRequest("POST", "/requests/send", {
        data: { propertyId: property.propertyId},
      });
  
      toast.success(response.message, { id: toastId });
    } catch (error) {
      toast.error(error.message, { id: toastId });
    }
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

          {/* Category */}
          <div className="flex items-center gap-2">
            <img src={category} alt="Category" className="w-4 h-4" />
            <span className="capitalize">{property.propertyType}</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2">
            <img
              src={point}
              alt="Location"
              className="w-3 h-4"
            />

            <p className="text-[14px] sm:text-[16px] text-dark-grey capitalize">
              {property.street}, {property.locationArea}, {property.city}
            </p>
          </div>


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
        <div className="flex items-center sm:sticky bottom-4 self-end bg-mint-green p-3 rounded-xl">
          <Button onClick={sendRequest} 
                  className="px-6 py-2">
            {requestSent ? "Request Sent":"Request A Visit"}
          </Button>
        </div>
      </div>

      {/* Image (No Padding) */}
      <div className="relative mt-5">
        {totalImages > 0 ? (
        <>
          {/* Left Button */}
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 px-3 py-1 rounded-full shadow"
          >
            ‹
          </button>

          {/* Image */}
          <img
            src={propertyImage}
            alt={`Property ${currentIndex}`}
            className="w-full h-[400px] object-cover rounded-lg"
            onError={(e) => (e.target.src = "/home.jpg")}
          />

          {/* Right Button */}
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 px-3 py-1 rounded-full shadow"
          >
            ›
          </button>

          {/* Counter */}
          <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 text-xs rounded">
            {currentIndex + 1} / {totalImages}
          </div>
        </>
          ) : (
            <img
              src="/home.jpg"
              alt="No Property"
              className="w-full h-[250px] object-cover rounded-lg"
            />
          )}
      </div>

      {/* Price */}
      <p className="text-gold font-bold text-[24px] mt-5">
        {property.price || "0"}

        <span className="text-[16px] text-dark-grey font-normal ml-1">
          / month
        </span>
      </p>

      {/* Details + Actions */}
      <div className="flex justify-between items-start mt-2">
        {/* Left Details */}
        <div
          className="
                grid grid-cols-2
                sm:grid-cols-3 gap-x-4 gap-y-2
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

          {/* Furniture */}
          <div className="flex items-center gap-1">
            <img src={furniture} alt="Furniture" className="w-4 h-4" />
            <span>{getFurnishingLabel(property.furnishingStatus)}</span>
          </div>

          {/* Lease */}
          <div className="flex items-center gap-1">
            <img src={time} alt="Furniture" className="w-4 h-4" />
            <span className="capitalize">{property.leaseType}</span>
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex gap-2 ml-4">
          {/* Favorite
          <button className="p-2 rounded-full bg-off-white hover:bg-gray-100">
            <img src={favourite} alt="" className="w-5 h-5" />
          </button> */}

          <div className="flex flex-col items-center gap-2">
            <button className="p-2 rounded-full bg-off-white hover:bg-gray-100">
              <img src={eye} alt="" className="w-5 h-5" />
            </button>

            <span className="text-sm text-gray-600 font-medium">
              {property.viewCount || 0}
            </span>
          </div>
        </div>
      </div>

      {/*Content */}
      {/* Description */}
      <div className="mt-5">
        <h5 className="text-lg font-semibold mb-1">Description</h5>
        <p className="text-dark-grey text-sm leading-relaxed">
          {property.description}
        </p>
      </div>

      {/* Key Information */}
      <div className="mt-5">

        <h5 className="text-lg font-semibold mb-3">Key Information</h5>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-3">

          {/* Left Column */}
          <div className="space-y-2">

            <div className="flex items-center gap-4">
              <p className="text-dark-grey min-w-[130px]">Tenant Type</p>
              <span className="font-medium capitalize">
                {property.tenantType || "N/A"}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <p className="text-dark-grey min-w-[130px]">Lease Duration</p>
              <span className="font-medium capitalize">
                {property.leaseType || "N/A"}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <p className="text-dark-grey min-w-[130px]">Year Built</p>
              <span className="font-medium">
                {property.yearBuilt || "N/A"}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <p className="text-dark-grey min-w-[130px]">Levels</p>
              <span className="font-medium">
                {property.level || "N/A"}
              </span>
            </div>

          </div>


          {/* Right Column */}
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <p className="text-dark-grey min-w-[130px]">City</p>
              <span className="font-medium capitalize">
                {property.city}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-dark-grey min-w-[130px]">Location</p>
              <span className="font-medium capitalize">
                {property.locationArea || "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-dark-grey min-w-[130px]">Street</p>
              <span className="font-medium capitalize">
                {property.street}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-dark-grey min-w-[130px]">Zip Code</p>
              <span className="font-medium">
                {property.zip || "N/A"}
              </span>
            </div>

          </div>

        </div>
      </div>

      {/* Amenities */}
      {property.amenities?.length > 0 && (
        <div className="mt-6">

          <h5 className="text-lg font-semibold mb-2">Amenities</h5>

          <div className="flex flex-wrap gap-2">

            {property.amenities.map((item, index) => (
              <span
                key={index}
                className="
                  px-3 py-1
                  text-sm
                  rounded-full
                  bg-soft-purple
                  text-forest-green
                  font-medium
                "
              >
                {item}
              </span>
            ))}

          </div>

        </div>
      )}

    </div>
  );
}

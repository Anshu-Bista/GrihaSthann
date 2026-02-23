import { useEffect, useState } from "react";
import axios from "axios";

import prop from "../../assets/noproperty.jpg";
import PropertyCard from "../../components/PropertyCard";
import { FilterBar } from "../../components/FilterBar";

export default function Browse() {
  const [items, setItems] = useState([]);

  const [filters, setFilters] = useState({
    city: "",
    propertyType: "",
    priceRange: "",
    minPrice: "",
    maxPrice: "",
    bed: "",
    bath: "",
    furnishingStatus: "",
    leaseType: "",
    amenities: [],
  });

  const filteredItems = items.filter((item) => {

    // City
    if (filters.city && item.city !== filters.city) {
      return false;
    }
  
    // Property Type
    if (
      filters.propertyType &&
      item.propertyType !== filters.propertyType
    ) {
      return false;
    }
  
    // Price Range (if using string ranges like "0-10000")
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-");
  
      if (Number(item.price) < Number(min)) return false;
      if (max && Number(item.price) > Number(max)) return false;
    }
  
      // Bedrooms
    if (filters.bed) {
      const itemBed = Number(item.bed);

      if (filters.bed.includes("+")) {
        const minBed = Number(filters.bed.replace("+", ""));

        if (itemBed < minBed) {
          return false;
        }
      } else {
        if (itemBed !== Number(filters.bed)) {
          return false;
        }
      }
    }

    // Bathrooms
    if (filters.bath) {
      const itemBath = Number(item.bath);

      if (filters.bath.includes("+")) {
        const minBath = Number(filters.bath.replace("+", ""));

        if (itemBath < minBath) {
          return false;
        }
      } else {
        if (itemBath !== Number(filters.bath)) {
          return false;
        }
      }
    }
    
    // Lease
    if (
      filters.leaseType &&
      item.leaseType !== filters.leaseType
    ) {
      return false;
    }
  
    // Amenities (ALL must match)
    if (
      filters.amenities.length > 0 &&
      (!item.amenities ||
        !filters.amenities.every((a) =>
          item.amenities.includes(a)
        ))
    ) {
      return false;
    }
  
    return true;
  });
  
  
  //FETCH items
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/properties")
      .then((res) => {
        console.log(res.data.data);
        setItems(res.data.data);
      })
      .catch((err) => {
        console.error("Failed to fetch properties");
      });
  }, []);

  return (
    <div className="p-6 max-w-[1200px] mx-auto px-6">
      <FilterBar
        filters={filters}
        setFilters={setFilters}
       />
      {filteredItems.length > 0 ? (
  <div
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
  >
    {filteredItems.map((item) => (
      <PropertyCard key={item.propertyId} item={item} />
        ))}
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center gap-4">

        <img
          src={prop}
          alt="No property"
          className="w-60 md:w-72 opacity-80"
        />

        <p className="text-dark-grey text-lg font-medium">
          No matching properties available
        </p>

      </div>
    )}
    </div>
  );
}

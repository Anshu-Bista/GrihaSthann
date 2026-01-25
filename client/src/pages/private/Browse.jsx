import { useEffect, useState } from "react";
import axios from "axios";

import PropertyCard from "../../components/PropertyCard";

export default function Browse() {
  const [items, setItems] = useState([]);
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
      {items.length > 0 ? (
        <div
          className="grid grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                gap-6">
          {items.map((item) => (
            <PropertyCard key={item.propertyId} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-dark-grey text-center">No properties available</p>
      )}
    </div>
  );
}

import { useState } from "react";
import { SelectInput } from "./SelectInput";

import {
  cityOptions,
  propertyTypeOptions,
  priceRangeOptions,
  bedOptions,
  bathOptions,
  furnishingOptions,
  leaseOptions,
  amenityOptions
} from "../utils/filterOptions";
import { AmenityChips } from "./AmenityChips";

export function FilterBar({ filters, setFilters }) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="p-2">

      {/* Main Filters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

        <SelectInput
          name="city"
          label="City"
          value={filters.city}
          onChange={handleChange}
          options={cityOptions}
        />

        <SelectInput
          name="propertyType"
          label="Property Type"
          value={filters.propertyType}
          onChange={handleChange}
          options={propertyTypeOptions}
        />

        <SelectInput
          name="priceRange"
          label="Price"
          value={filters.priceRange}
          onChange={handleChange}
          options={priceRangeOptions}
        />

      </div>

      {/* Toggle */}
      <button
        type="button"
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="text-green-600 mt-3 text-sm"
      >
        {showAdvanced ? "− Less Filters" : "+ More Filters"}
      </button>

      {/* Advanced */}
      {showAdvanced && (

        <div className="mt-4 space-y-3 pb-2">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

            <SelectInput
              name="bed"
              label="Bedroom"
              value={filters.bed}
              onChange={handleChange}
              options={bedOptions}
            />

            <SelectInput
              name="bath"
              label="Bathroom"
              value={filters.bath}
              onChange={handleChange}
              options={bathOptions}
            />

            <SelectInput
              name="furnishingStatus"
              label="Furnishing Status"
              value={filters.furnishingStatus}
              onChange={handleChange}
              options={furnishingOptions}
            />

            <SelectInput
              name="leaseType"
              label="Lease Type"
              value={filters.leaseType}
              onChange={handleChange}
              options={leaseOptions}
            />

          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-3">

          <AmenityChips
            name="amenities"
            options={amenityOptions}
            value={filters.amenities}
            onChange={(val) =>
                setFilters((prev) => ({
                ...prev,
                amenities: val,
                }))
            }
            allowCustom={false}
            />

          </div>
        </div>
      )}
    </div>
  );
}

import { useState, useEffect } from "react";

export function AmenityChips({
  name,
  options = [],
  value = [],
  onChange,
  register,
  setValue,
  error,
  allowCustom = true,
}) {
  const [customOptions, setCustomOptions] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [newAmenity, setNewAmenity] = useState("");

  // Merge default + custom
  const allOptions = [...options, ...customOptions];

  // Toggle select
  const toggleAmenity = (val) => {
    let updated;

    if (value.includes(val)) {
      updated = value.filter((v) => v !== val);
    } else {
      updated = [...value, val];
    }

    if (onChange) onChange(updated);
    if (setValue) setValue(name, updated, { shouldValidate: true });
  };

  // Add custom amenity
  const handleAddAmenity = () => {
    if (!newAmenity.trim()) return;

    const formattedValue = newAmenity
      .toLowerCase()
      .replace(/\s+/g, "-");

    if (allOptions.some((o) => o.value === formattedValue)) {
      setNewAmenity("");
      setShowInput(false);
      return;
    }

    const newOption = {
      value: formattedValue,
      label: newAmenity,
    };

    setCustomOptions((prev) => [...prev, newOption]);

    const updated = [...value, formattedValue];

    if (onChange) onChange(updated);
    if (setValue) setValue(name, updated, { shouldValidate: true });

    setNewAmenity("");
    setShowInput(false);
  };

  // Delete custom amenity
  const deleteAmenity = (val) => {
    setCustomOptions((prev) =>
      prev.filter((c) => c.value !== val)
    );

    const updated = value.filter((v) => v !== val);

    if (onChange) onChange(updated);
    if (setValue) setValue(name, updated, { shouldValidate: true });
  };

  return (
    <div className="space-y-2">

      <div className="flex flex-wrap gap-3 items-center">

        {allOptions.map((opt) => {
          const active = value.includes(opt.value);
          const isCustom = customOptions.some(
            (c) => c.value === opt.value
          );

          return (
            <div key={opt.value} className="relative group">

              <button
                type="button"
                onClick={() => toggleAmenity(opt.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium border
                  transition-all duration-200 shadow-sm pr-8
                  ${
                    active
                      ? "bg-forest-green text-white border-bright-green scale-105"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-mint-green"
                  }
                `}
              >
                {active && "✓ "}
                {opt.label}
              </button>

              {allowCustom && isCustom && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteAmenity(opt.value);
                  }}
                  className="absolute top-1 right-1 hidden group-hover:flex
                    items-center justify-center w-5 h-5 text-xs
                    bg-red-500 text-white rounded-full"
                >
                  ✕
                </button>
              )}
            </div>
          );
        })}

        {allowCustom && !showInput && (
          <button
            type="button"
            onClick={() => setShowInput(true)}
            className="px-4 py-2 rounded-full text-sm font-medium
              border border-dashed border-forest-green
              text-forest-green hover:bg-mint-green transition"
          >
            + Add
          </button>
        )}

        {allowCustom && showInput && (
          <div className="flex items-center gap-2">

            <input
              type="text"
              value={newAmenity}
              onChange={(e) => setNewAmenity(e.target.value)}
              placeholder="New amenity"
              className="px-3 py-1.5 text-sm border rounded-lg
                focus:outline-none focus:ring-2 focus:ring-forest-green"
              autoFocus
            />

            <button
              type="button"
              onClick={handleAddAmenity}
              className="px-3 py-1.5 text-sm rounded-lg
                bg-forest-green text-white"
            >
              Add
            </button>

            <button
              type="button"
              onClick={() => setShowInput(false)}
              className="px-2 text-gray-500"
            >
              ✕
            </button>

          </div>
        )}
      </div>

      {register && (
        <input type="hidden" {...register(name)} />
      )}

      {error && (
        <p className="text-red-500 text-xs">
          {error.message}
        </p>
      )}
    </div>
  );
}
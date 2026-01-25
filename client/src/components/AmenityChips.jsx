import { useState } from "react";

export function AmenityChips({
  name,
  options = [],
  register,
  setValue,
  error,
}) {
  const [selected, setSelected] = useState([]);
  const [customOptions, setCustomOptions] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [newAmenity, setNewAmenity] = useState("");

  const allOptions = [...options, ...customOptions];

  // Toggle select/unselect
  const toggleAmenity = (value) => {
    let updated;

    if (selected.includes(value)) {
      updated = selected.filter((v) => v !== value);
    } else {
      updated = [...selected, value];
    }

    setSelected(updated);
    setValue(name, updated, { shouldValidate: true });
  };

  // Add custom amenity
  const handleAddAmenity = () => {
    if (!newAmenity.trim()) return;

    const value = newAmenity
      .toLowerCase()
      .replace(/\s+/g, "-");

    // Prevent duplicates
    if (allOptions.some((o) => o.value === value)) {
      setNewAmenity("");
      setShowInput(false);
      return;
    }

    const newOption = {
      value,
      label: newAmenity,
    };

    setCustomOptions((prev) => [...prev, newOption]);

    const updated = [...selected, value];

    setSelected(updated);
    setValue(name, updated, {
      shouldValidate: true,
    });

    setNewAmenity("");
    setShowInput(false);
  };

  // Delete custom amenity
  const deleteAmenity = (value) => {
    // Remove from custom list
    setCustomOptions((prev) =>
      prev.filter((c) => c.value !== value)
    );

    // Remove from selected
    const updated = selected.filter(
      (v) => v !== value
    );

    setSelected(updated);
    setValue(name, updated, {
      shouldValidate: true,
    });
  };

  return (
    <div className="space-y-2">

      {/* Chips */}
      <div className="flex flex-wrap gap-3 items-center">

        {allOptions.map((opt) => {
          const active = selected.includes(opt.value);

          const isCustom = customOptions.some(
            (c) => c.value === opt.value
          );

          return (
            <div
              key={opt.value}
              className="relative group"
            >
              {/* Chip */}
              <button
                type="button"
                onClick={() =>
                  toggleAmenity(opt.value)
                }
                className={`px-4 py-2 rounded-full text-sm font-medium border
                  transition-all duration-200 shadow-sm pr-8
                  ${
                    active
                      ? "bg-forest-green text-off-white border-bright-green shadow-md scale-105"
                      : "bg-off-white text-dark-grey border-sand-beige hover:bg-mint-green hover:border-forest-green"
                  }
                `}
              >
                {active && "✓ "}
                {opt.label}
              </button>

              {/* Delete Button (Custom Only) */}
              {isCustom && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteAmenity(opt.value);
                  }}
                  className="
                    absolute top-1 right-1
                    hidden group-hover:flex
                    items-center justify-center
                    w-5 h-5 text-xs
                    bg-bright-green text-white
                    rounded-full
                    hover:bg-soft-olive
                  "
                >
                  ✕
                </button>
              )}
            </div>
          );
        })}

        {/* Add Button */}
        {!showInput && (
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

        {/* Input Box */}
        {showInput && (
          <div className="flex items-center gap-2">

            <input
              type="text"
              value={newAmenity}
              onChange={(e) =>
                setNewAmenity(e.target.value)
              }
              placeholder="New amenity"
              className="px-3 py-1.5 text-sm border rounded-lg
                focus:outline-none focus:ring-2 focus:ring-forest-green"
              autoFocus
            />

            <button
              type="button"
              onClick={handleAddAmenity}
              className="px-3 py-1.5 text-sm rounded-lg
                bg-forest-green text-white hover:opacity-90"
            >
              Add
            </button>

            <button
              type="button"
              onClick={() => setShowInput(false)}
              className="px-2 text-gray-500 hover:text-black"
            >
              ✕
            </button>

          </div>
        )}

      </div>

      {/* Hidden Input */}
      <input
        type="hidden"
        {...register(name)}
      />

      {/* Error */}
      {error && (
        <p className="text-red-500 text-xs">
          {error.message}
        </p>
      )}

    </div>
  );
}

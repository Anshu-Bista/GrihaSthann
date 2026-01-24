import { useState } from "react";

export function AmenityChips({
  name,
  options = [],
  register,
  setValue,
  error,
}) {
  const [selected, setSelected] = useState([]);

  const toggleAmenity = (value) => {
    let updated;

    if (selected.includes(value)) {
      updated = selected.filter((v) => v !== value);
    } else {
      updated = [...selected, value];
    }

    setSelected(updated);

    // Sync with react-hook-form
    setValue(name, updated);
  };

  return (
    <div className="space-y-2">

      {/* Chips */}
      <div className="flex flex-wrap gap-3">

        {options.map((opt) => {
          const active = selected.includes(opt.value);

          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => toggleAmenity(opt.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium border
                transition-all duration-200 shadow-sm
                
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
          );
        })}
      </div>

      {/* Hidden Input for RHF */}
      <input type="hidden" {...register(name)} />

      {/* Error */}
      {error && (
        <p className="text-red-500 text-xs">
          {error.message}
        </p>
      )}
    </div>
  );
}

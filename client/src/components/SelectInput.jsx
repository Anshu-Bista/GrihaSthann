export function SelectInput({
  name,
  label,
  options = [],
  register,
  error,
  value,
  onChange,
}) {
  return (
    <div className="flex flex-col space-y-1">

      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-gray-600"
        >
          {label}
        </label>
      )}

      <select
        id={name}
        name={name}

        /* Works for both Form + Filter */
        {...(register ? register(name) : {})}
        value={value}
        onChange={onChange}

        className={`w-full px-4 py-2 rounded-lg border
          focus:outline-none focus:ring-2 focus:ring-gold
          ${
            error
              ? "border-red-500"
              : "border-sand-beige"
          }`}
      >
        {/* Default option */}
        <option value="">
          {label ? `Select ${label}` : "All"}
        </option>

        {options.map((opt, i) => (
          <option
            key={opt.value || i}
            value={opt.value}
          >
            {opt.label}
          </option>
        ))}
      </select>

      {/* Error Message (Only for Forms) */}
      {error && (
        <p className="text-red-600 text-xs">
          {error.message || "This field is required"}
        </p>
      )}

    </div>
  );
}

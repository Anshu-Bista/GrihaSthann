export function SelectInput({
    name,
    label,
    register,
    options = [],
    error,
    required = false,
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
          {...register(name, { required })}
          className={`w-full px-4 py-2 border rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-forest-green
          ${error ? "border-red-500" : "border-gray-300"}`}
        >
          <option value="">Select {label}</option>
  
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
  
        {error && (
          <p className="text-red-600 text-xs">
            {error.message || "This field is required"}
          </p>
        )}
      </div>
    );
  }
  
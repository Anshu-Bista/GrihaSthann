export function TextInput({
  type = "text",
  name,
  label,
  placeholder,
  iconClass,
  register,
  error,
  required = false,
}) {
  return (
    <div className="flex flex-col space-y-1">

      {/* Label */}
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-600 mb-1"
        >
          {label}
        </label>
      )}

      {/* Input */}
      <div className="input-group">

        {iconClass && (
          <span className={`icon ${iconClass}`}></span>
        )}

        <input
          id={name}
          type={type}
          placeholder={placeholder}
          {...register(name, { required })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none
                     focus:ring-1 focus:ring-forest-green"
        />
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-600 text-xs">
          {error.message || "This field is required"}
        </p>
      )}
    </div>
  );
}

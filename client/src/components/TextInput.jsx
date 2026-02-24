
import eyeOpen from "../../public/eyeon.png";
import eyeClose from "../../public/eyeoff.png";
import { useState } from "react";

export function TextInput({
  type = "text",
  name,
  label,
  placeholder,
  iconClass,
  register,
  error,
  multiline = false,
  rows = 4,
  integerOnly = false,
  maxDigits = null,
}) {

  /* Password Visibility */
  const [showPassword, setShowPassword] = useState(false);

  /* Determine Input Type */
  const inputType =
    type === "password"
      ? (showPassword ? "text" : "password")
      : type;

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

      {/* Input Wrapper */}
      <div className="input-group">

        {/* Left Icon */}
        {iconClass && (
          <span className={`icon ${iconClass}`}></span>
        )}

        {multiline ? (

          /* TEXTAREA */
          <textarea
            id={name}
            rows={rows}
            placeholder={placeholder}
            {...register(name)}
            className="w-full bg-off-white px-4 py-2 border border-sand-beige rounded-lg
                       focus:outline-none focus:ring-1 focus:ring-gold resize-none"
          />

        ) : (

          <>
            {/* INPUT */}
            <input
              id={name}
              type={inputType}
              step={
                type === "number"
                  ? integerOnly
                    ? "1"
                    : "0.01"
                  : undefined
              }
              inputMode={type === "number" ? "decimal" : undefined}
              maxLength={maxDigits || undefined}

              onInput={(e) => {
                if (type === "number" && maxDigits) {
                  e.target.value =
                    e.target.value.slice(0, maxDigits);
                }
              }}

              placeholder={placeholder}

              {...register(
                name,
                type === "number"
                  ? { valueAsNumber: true }
                  : {}
              )}

              className="w-full bg-off-white px-4 py-2 border border-sand-beige rounded-lg
                        focus:outline-none focus:ring-1 focus:ring-gold"
            />

            {/* Password Eye Toggle */}
            {type === "password" && (
  <span
    className="right-icon"
    onClick={() => setShowPassword(!showPassword)}
  >
    <img
      src={showPassword ? eyeOpen : eyeClose}
      alt="toggle visibility"
      className="eye-icon"
    />
  </span>
)}
          </>
        )}

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
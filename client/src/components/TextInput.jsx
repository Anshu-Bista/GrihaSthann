export function TextInput({
  type = "text",
  name,
  placeholder,
  iconClass,
  register,
  error
}) {
  return (
    <>
      <div className="input-group">
        {iconClass && <span className={`icon ${iconClass}`}></span>}

        <input
          type={type}
          placeholder={placeholder}
          {...register(name)}
        />
      </div>

      {error && <p className="error">{error.message}</p>}
    </>
  );
}

export function TextInput({
    type = "text",
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
            {...register}
          />
        </div>
        {error && <p className="error">{error.message}</p>}
      </>
    );
  }
  
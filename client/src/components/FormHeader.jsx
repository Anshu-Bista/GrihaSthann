export function FormHeader({ title, subtitle }) {
    return (
      <div className="form-header">
        <h1 className="form-title">{title}</h1>
        {subtitle && <p className="form-subtitle">{subtitle}</p>}
      </div>
    );
  }
  
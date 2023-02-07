const FormRow = ({
  type,
  name,
  value,
  handleChange,
  labelText,
  noLabel,
  min,
}) => {
  return (
    <div className="form-row">
      {!noLabel && (
        <label htmlFor={name} className="form-label">
          {labelText || name}
        </label>
      )}
      <input
        type={type}
        value={value}
        name={name}
        autoComplete="on"
        onChange={handleChange}
        className="form-input"
        min={min ? min : null}
      />
    </div>
  );
};

export default FormRow;

const FormRow = ({
  type,
  name,
  value,
  handleChange,
  labelText,
  noLabel,
  min,
  step,
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
        step={step ? step : null}
      />
    </div>
  );
};

export default FormRow;

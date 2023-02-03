const FormRow = ({ type, name, value, handleChange, labelText, noLabel }) => {
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
      />
    </div>
  );
};

export default FormRow;

import Wrapper from "../assets/wrappers/Modal";

const Modal = ({
  handleSubmit,
  handleClick,
  handleChange,
  selected,
  handleSelect,
}) => {
  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <div className="formWrapper">
          <h5>Add New Workout</h5>
          <button
            type="button"
            onClick={handleClick}
            className="btn closeButton"
          >
            X
          </button>
          <input
            type="date"
            name="date"
            id="date"
            className="form-input dateInput"
            onChange={(e) => handleChange(e)}
          ></input>

          <div className="checkboxWrapper">
            <input
              type="checkbox"
              name="currentDate"
              id="currentDate"
              checked={selected}
              onChange={handleSelect}
            />
            <label htmlFor="currentDate">Current Date</label>
          </div>

          <button type="submit" className="btn">
            Submit
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Modal;

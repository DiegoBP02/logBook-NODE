import Wrapper from "../assets/wrappers/Modal";
import { useAppContext } from "../context/appContext";

const Modal = ({
  handleSubmit,
  handleClick,
  handleChange,
  selected,
  handleSelect,
}) => {
  const { language } = useAppContext();
  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <div className="formWrapper">
          <h5>{language === "en" ? "Add New Workout" : "Adicionar treino"}</h5>
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
            <label htmlFor="currentDate">
              {language === "en" ? "Current Date" : "Data Atual"}
            </label>
          </div>

          <button type="submit" className="btn">
            {language === "en" ? "Submit" : "Enviar"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Modal;

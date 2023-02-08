import styled from "styled-components";

const Wrapper = styled.div`
  width: var(--fluid-width);
  max-width: var(--max-width);
  margin: 0 auto;
  .form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    padding: 0.5rem 0.625rem;
    background-color: #e0e0e0;
    position: relative;
  }
  .formWrapper {
    display: flex;
    gap: 1rem;
  }
  .btn {
    width: fit-content;
  }
  .removeBtn {
    position: absolute;
    bottom: -3rem;
  }
`;

export default Wrapper;

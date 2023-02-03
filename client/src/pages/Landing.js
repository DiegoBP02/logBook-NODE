import Wrapper from "../assets/wrappers/Landing";
import { Link, Navigate } from "react-router-dom";
import img from "../assets/images/landing.svg";
import Logo from "../components/Logo";
import { useAppContext } from "../context/appContext";

const Landing = () => {
  const { user } = useAppContext();
  return (
    <>
      {user && <Navigate to="/" />}
      <Wrapper>
        <Logo />
        <div className="container page">
          <div className="info">
            <h1>Log Book</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque
              aliquid voluptates, explicabo rem nesciunt eum consequuntur
              consectetur veritatis optio amet sunt.
            </p>
            <Link to="/register" className="btn btn-hero">
              Login / Register
            </Link>
          </div>
          <img src={img} alt="log book landing" className="img" />
        </div>
      </Wrapper>
    </>
  );
};

export default Landing;

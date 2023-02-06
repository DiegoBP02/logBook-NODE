import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

const Logo = ({ center, noMargin, widthFix }) => {
  let className = "nav";
  if (center) {
    className += " center";
  }
  if (noMargin) {
    className += " noMargin";
  }
  if (widthFix) {
    className += " widthFix";
  }
  return (
    <Link className={className} to="/">
      <img src={logo} alt="logo image" />
      <h2>Todo List</h2>
    </Link>
  );
};
export default Logo;

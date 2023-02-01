import logo from "../assets/images/logo.png";

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
    <nav className={className}>
      <img src={logo} alt="logo image" />
      <h2>Todo List</h2>
    </nav>
  );
};
export default Logo;

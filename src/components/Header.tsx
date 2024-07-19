import logo from "/images/TODO.svg";
import Theme from "./Theme";
const Header = () => {
  return (
    <div className="flex justify-between">
      <img src={logo} alt="logo image" />
      <Theme />
    </div>
  );
};

export default Header;

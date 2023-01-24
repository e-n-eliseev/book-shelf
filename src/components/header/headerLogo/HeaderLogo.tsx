import { FC } from "react";
import logo from "../../../assets/bookLogo.svg";

const HeaderLogo: FC = () => {
  return (
    <li className="header__logo">
      <img className="header__img" src={logo} alt="Logo" />
    </li>
  );
};

export default HeaderLogo;

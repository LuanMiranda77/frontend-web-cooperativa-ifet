import React from "react";
import { Link } from "react-router-dom";

// import { Container } from './styles';
interface MenuProps {
  icon: React.ReactNode;
  link: string;
  label: string;
}

const ButtonMenu: React.FC<MenuProps> = ({ icon, label, link }) => {
  return (
    <Link to={link}>
      <div className="w-100 text-center mb-5 duration-300 origin-center hover:-translate-y-1">
        {icon}
        <label className="text-white font-bold" style={{ fontSize: "11px" }}>
          {label}
        </label>
      </div>
    </Link>
  );
};

export default ButtonMenu;

import { Link, NavLink } from "react-router-dom";
import LOGO from "../assets/logo_main.png";

export default function Navbar() {
  return (
    <div>
      <nav className="h-20 border-b-2 border-gray-100 flex justify-center items-center px-5">
        <div className="w-full h-full max-w-7xl flex items-center">
          <Link to="/">
            <img src={LOGO} alt="logo" className="h-10" />
          </Link>
          <ul className="h-full font-light flex space-x-5 ml-12">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "h-full flex justify-center items-center font-bold border-b-4 border-primary transform translate-y-[2px]"
                  : "h-full flex justify-center items-center"
              }
              to={"/tableaudebord"}
            >
              Tableau de bord
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "h-full flex justify-center items-center font-bold border-b-4 border-primary transform translate-y-[2px]"
                  : "h-full flex justify-center items-center"
              }
              to={"/"}
            >
              Mes gardes{" "}
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "h-full flex justify-center items-center font-bold border-b-4 border-primary transform translate-y-[2px]"
                  : "h-full flex justify-center items-center"
              }
              to={"/client"}
            >
              Client{" "}
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "h-full flex justify-center items-center font-bold border-b-4 border-primary transform translate-y-[2px]"
                  : "h-full flex justify-center items-center"
              }
              to={"/avis"}
            >
              Avis{" "}
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "h-full flex justify-center items-center font-bold border-b-4 border-primary transform translate-y-[2px]"
                  : "h-full flex justify-center items-center"
              }
              to={"/mapharmacie"}
            >
              Ma pharmacie{" "}
            </NavLink>
          </ul>
          <div className="h-full flex justify-center items-center space-x-8 ml-auto">
            <button className="px-8 bg-black text-white h-2/3 rounded-md text-sm font-semibold">
              + Ajouter une garde
            </button>
            <div className="h-4/5 w-0.5 bg-gray-200" />
            <button className="w-12 h-12 bg-gray-300 rounded-full">HM</button>
          </div>
        </div>
      </nav>
    </div>
  );
}

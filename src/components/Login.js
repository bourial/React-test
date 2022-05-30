import LOGO from "../assets/logo_main.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import IMG from "../assets/login.png";
import jsCookie from "js-cookie";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state ? location.state.from.pathname : "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleClick = () => {
    if (!email) {
      setError("Adresse e-mail requise");
      return;
    }
    if (!password) {
      setError("Mot de passe requis");
      return;
    }
    axios
      .post("https://memedoc.herokuapp.com/v1/auth/login", {
        email,
        password,
      })
      .then(function (response) {
        jsCookie.set("token", response.data.tokens.access.token);
        navigate(from, { replace: true });
        window.location.reload();
      })
      .catch(function (error) {
        setError(error.response.data.message);
      });
  };

  return (
    <div className="min-h-screen grid grid-cols-2 relative">
      {/* left */}
      <section className="px-16 pt-12">
        <nav className="flex justify-between items-center">
          <Link to="/">
            <img src={LOGO} alt="logo" className="h-10" />
          </Link>
          <Link to="/register">
            <button className="font-extrabold text-sm">Register</button>
          </Link>
        </nav>
        <article className="px-12 mt-20">
          <h1 className="text-[28px] font-bold">Ravis de vous revoir !</h1>
          <div className="flex flex-col space-y-4 my-20">
            <input
              type="email"
              className="h-[52px] bg-gray-100 pl-4 rounded-lg"
              placeholder="E-mail"
              onChange={e => {
                setEmail(e.target.value);
                setError("");
              }}
            />
            <input
              type="password"
              className="h-[52px] bg-gray-100 pl-4 rounded-lg"
              placeholder="Mot de passe"
              onChange={e => {
                setPassword(e.target.value);
                setError("");
              }}
            />
            {/* error */}
            {error && (
              <div className="bg-red-500 text-white rounded-lg px-4 py-1 w-fit mt-2 text-xs font-semibold">
                {error}
              </div>
            )}
            <button className="font-bold w-fit text-sm mb-6">
              Mot de passe oublié
            </button>
            <button
              className="bg-primary text-white font-semibold h-12 rounded-lg"
              onClick={handleClick}
            >
              S’identifier
            </button>
          </div>
          <p className="text-sm">
            Pas encore de compte ? ?{" "}
            <Link
              to={"/register"}
              className="text-primary font-semibold cursor-pointer"
            >
              Ouvrir un compte
            </Link>{" "}
          </p>
        </article>
      </section>

      {/* right */}
      <section className="bg-light3 flex justify-center items-center">
        <img src={IMG} alt="" className="h-screen w-screen object-cover" />
      </section>
    </div>
  );
}

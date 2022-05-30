import LOGO from "../../assets/logo_main.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import IMG from "../../assets/login-img-3.png";
import { AuthContext } from "../../context/AuthContext";

export default function RegisterConfirm({ toStep2 }) {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [passStatus, setPassStatus] = useState("");
  const [error, setError] = useState(null);

  const { user, setUser, token } = useContext(AuthContext);

  const svg = {
    gray: (
      <svg
        width="120"
        height="4"
        viewBox="0 0 120 4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="120" height="4" rx="2" fill="#F7F7F7" />
      </svg>
    ),
    green: (
      <svg
        width="120"
        height="4"
        viewBox="0 0 120 4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="120" height="4" rx="2" fill="#00B963" />
      </svg>
    ),
    red: (
      <svg
        width="120"
        height="4"
        viewBox="0 0 120 4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="120" height="4" rx="2" fill="#DF2935" />
      </svg>
    ),
    yellow: (
      <svg
        width="120"
        height="4"
        viewBox="0 0 120 4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="120" height="4" rx="2" fill="#FFB30F" />
      </svg>
    ),
    blue: (
      <svg
        width="120"
        height="4"
        viewBox="0 0 120 4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="120" height="4" rx="2" fill="#0F61FF" />
      </svg>
    ),
  };

  const handleClick = () => {
    if (
      passStatus === "" ||
      passStatus === "faible" ||
      passStatus === "convenable"
    ) {
      setError("Veuillez entrer un mot de passe valide");
    } else {
      axios
        .post(
          "https://memedoc.herokuapp.com/v1/auth/set-password",
          {
            password,
          },
          {
            headers: { Authorization: `Bearer ${token.access}` },
          }
        )
        .then(function (response) {
          setUser({
            ...user,
            isEmailVerified: response.data.user.isEmailVerified,
          });
          navigate("/login");
        })
        .catch(function (error) {
          setError(error.response.data.message);
        });
    }
  };

  useEffect(() => {
    password === "" && setPassStatus("");

    if (/^(?=.*[a-z])/.test(password) === true) {
      setPassStatus("faible");
    }

    if (/^(?=.*[a-z])(?=.*[A-Z])/.test(password) === true) {
      setPassStatus("convenable");
    }

    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(password) === true) {
      setPassStatus("bon");
    }

    if (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(
        password
      ) === true
    ) {
      setPassStatus("excellent");
    }
  }, [password]);

  const handleChange = e => {
    setPassword(e.target.value);
    setError("");
  };

  return (
    <div className="min-h-screen grid grid-cols-2">
      {/* left */}
      <section className="px-16 pt-12">
        <nav className="flex justify-between items-center">
          <Link to="/">
            <img src={LOGO} alt="logo" className="h-10" />
          </Link>
          <Link to="/login">
            <button className="font-extrabold text-sm">Se connecter</button>
          </Link>
        </nav>
        <article className="px-12 mt-20">
          <h1 className="text-[28px] font-bold">
            Un code de confirmation vous attend dans votre boîte e-mail
          </h1>
          <p className="text-sm text-gray-600 mt-3">
            Choisissez un mot de passe sécurisé dont vous vous souviendrez
            facilement.
          </p>
          <div className="mt-10 flex flex-col">
            <label htmlFor="password" className="font-semibold text-gray-500">
              Mot de passe
            </label>
            <input
              value={password}
              type="password"
              onChange={e => handleChange(e)}
              id="password"
              className={`h-[52px] bg-gray-100 pl-4 rounded-lg outline-none`}
              placeholder="Saisissez votre mot de passe ici"
            />
            {/* strong password design */}
            <div className="mt-2">
              {passStatus === "" && (
                <>
                  <div className="flex justify-between space-x-2">
                    {svg.gray} {svg.gray} {svg.gray} {svg.gray}
                  </div>
                  <div className="text-gray-300 text-sm font-semibold text-right mt-2">
                    Mot de passe trop faible
                  </div>
                </>
              )}
              {passStatus === "faible" && (
                <>
                  <div className="flex justify-between space-x-2">
                    {svg.red} {svg.gray} {svg.gray} {svg.gray}
                  </div>
                  <div className="text-gray-300 text-sm font-semibold text-right mt-2">
                    Mot de passe trop faible
                  </div>
                </>
              )}
              {passStatus === "convenable" && (
                <>
                  <div className="flex justify-between space-x-2">
                    {svg.yellow} {svg.yellow} {svg.gray} {svg.gray}
                  </div>
                  <div className="text-gray-300 text-sm font-semibold text-right mt-2">
                    Mot de passe convenable
                  </div>
                </>
              )}
              {passStatus === "bon" && (
                <>
                  <div className="flex justify-between space-x-2">
                    {svg.blue} {svg.blue} {svg.blue} {svg.gray}
                  </div>
                  <div className="text-gray-300 text-sm font-semibold text-right mt-2">
                    Bon mot de passe
                  </div>
                </>
              )}
              {passStatus === "excellent" && (
                <>
                  <div className="flex justify-between space-x-2">
                    {svg.green} {svg.green} {svg.green} {svg.green}
                  </div>
                  <div className="text-gray-300 text-sm font-semibold text-right mt-2">
                    Mot de passe excellent
                  </div>
                </>
              )}
            </div>
            <button
              className={`font-bold h-12 rounded-lg mt-8 mb-2  ${
                passStatus === "bon" || passStatus === "excellent"
                  ? "text-white bg-primary"
                  : "text-gray-400 bg-gray-100"
              }`}
              onClick={handleClick}
            >
              Confirmer
            </button>
            {/* error */}
            {error && (
              <div className="bg-red-500 text-white rounded-lg px-4 py-1 w-fit text-xs font-semibold">
                {error}
              </div>
            )}
          </div>
          <button
            className="flex items-center mt-16 font-bold text-sm"
            onClick={toStep2}
          >
            <svg
              className="mr-2"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.52331 6.16667H13.6666V7.83333H3.52331L7.99331 12.3033L6.81498 13.4817L0.333313 7L6.81498 0.518333L7.99331 1.69667L3.52331 6.16667Z"
                fill="#2D3436"
              />
            </svg>
            Retour
          </button>
        </article>
      </section>

      {/* right */}
      <section className="bg-light3 flex justify-center items-center">
        <img src={IMG} alt="" className="max-h-screen w-4/5 object-cover" />
      </section>
    </div>
  );
}

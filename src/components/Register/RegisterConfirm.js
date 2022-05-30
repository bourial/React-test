import LOGO from "../../assets/logo_main.png";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import IMG from "../../assets/login-img-3.png";
import { AuthContext } from "../../context/AuthContext";

export default function RegisterConfirm({ toStep1, toStep3 }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { user, setUser, token, setToken } = useContext(AuthContext);

  useEffect(() => {
    if (code.length === 4) {
      setLoading(true);
      axios
        .post("https://memedoc.herokuapp.com/v1/auth/verify-otp", {
          code,
          userId: user.id,
        })
        .then(function (response) {
          setLoading(false);
          setUser({
            ...user,
            isEmailVerified: response.data.user.isEmailVerified,
          });
          setToken({ ...token, access: response.data.tokens.access.token });
          toStep3();
        })
        .catch(function (error) {
          setError(error.response.data.message);
        });
    }
  }, [code]);
  const handleChange = e => {
    setCode(e.target.value);
  };

  return (
    <div className="min-h-screen grid grid-cols-2 relative">
      {loading}
      {loading && (
        <div className="absolute inset-0 h-screen w-screen z-50 bg-gray-700 bg-opacity-80 flex justify-center items-center">
          <svg
            className="animate-[spin_3s_infinite]"
            xmlns="http://www.w3.org/2000/svg"
            width="190"
            height="190"
            fill="none"
            viewBox="0 0 190 190"
          >
            <path
              stroke="#00B963"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="15.833"
              d="M95 47.5V23.75M128.646 61.354l17.021-17.02M142.5 95h23.75M128.646 128.646l17.021 17.021M95 142.5v23.75M61.354 128.646l-17.02 17.021M47.5 95H23.75M61.354 61.354l-17.02-17.02"
            ></path>
          </svg>
        </div>
      )}
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
            Saisissez le code à 6 chiffres que nous vous avons envoyé sur{" "}
            <span className="font-bold">{user.email}</span>
          </p>
          <div className="mt-10 flex flex-col">
            <label htmlFor="code" className="font-semibold text-gray-500">
              Code de confirmation
            </label>
            <input
              value={code}
              onChange={e => handleChange(e)}
              id="code"
              className={`h-[52px] bg-gray-100 pl-4 rounded-lg`}
              type="number"
              placeholder="XXX- XXX"
            />
            <p className="text-gray-400 text-xs my-6">
              Votre code est peut-être dans vos spams
            </p>
            <p className="text-sm">
              Toujours rien ?{" "}
              <span className="text-primary font-semibold cursor-pointer">
                Renvoyer le code
              </span>{" "}
            </p>
          </div>
          <button
            className="flex items-center mt-16 font-bold text-sm"
            onClick={toStep1}
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

import LOGO from "../../assets/logo_main.png";
import IMG1 from "../../assets/login-img-1.svg";
import IMG2 from "../../assets/login-img-2.jpg";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function RegisterEmail({ toStep2 }) {
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { user, setUser } = useContext(AuthContext);

  const handleChange = e => {
    setEmail(e.target.value);
    setError(null);
  };

  useEffect(() => {
    if (email && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  }, [email]);

  const handleClick = () => {
    if (!email) {
      setError("Adresse e-mail requise");
      return;
    }
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === false) {
      setError("Please enter a valid email.");
      return;
    }
    if (email && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setLoading(true);
      axios
        .post("https://memedoc.herokuapp.com/v1/auth/register", {
          email,
        })
        .then(function (response) {
          let userData = response.data.user;
          setUser({
            ...user,
            id: userData.id,
            email: userData.email,
            isEmailVerified: userData.isEmailVerified,
            role: userData.role,
          });
          setLoading(false);
        })
        .catch(function (error) {
          setError(error.response.data.message);
        });
    }
    toStep2();
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
            Saisissez votre adresse e-mail
          </h1>
          <p className="text-sm text-dark">
            Vous en aurez besoin pour vous connecter et accéder à votre
            application Memedoc.
          </p>
          <div className="mt-10 flex flex-col">
            <label htmlFor="email" className="font-semibold text-gray-500">
              Adresse e-mail
            </label>
            <input
              value={email}
              onChange={e => handleChange(e)}
              id="email"
              className={`h-[52px] bg-gray-100 pl-4 rounded-lg ${
                validEmail && "outline-primary outline outline-offset-2"
              }`}
              type="email"
              placeholder="Nathalie.durand@exemple.com"
            />
            {/* error */}
            {error && (
              <div className="bg-red-500 text-white rounded-lg px-4 py-1 w-fit mt-2 text-xs font-semibold">
                {error}
              </div>
            )}
            <button
              className="bg-primary text-white font-semibold h-12 rounded-lg mt-8 mb-6 flex justify-center items-center"
              onClick={handleClick}
            >
              {loading ? (
                <svg
                  className="animate-spin"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.364 2.636L13.95 4.05C12.8049 2.9048 11.2982 2.19206 9.6865 2.03324C8.07482 1.87442 6.45794 2.27933 5.11134 3.17899C3.76474 4.07865 2.77174 5.41739 2.30154 6.96711C1.83134 8.51683 1.91302 10.1816 2.53268 11.6779C3.15234 13.1741 4.27162 14.4092 5.69983 15.1727C7.12803 15.9362 8.77679 16.1809 10.3652 15.8651C11.9536 15.5492 13.3833 14.6924 14.4108 13.4406C15.4382 12.1888 15.9999 10.6195 16 9H18C18 11.0822 17.278 13.1 15.957 14.7095C14.6361 16.3191 12.7979 17.4208 10.7557 17.827C8.71355 18.2332 6.5937 17.9187 4.75737 16.9372C2.92104 15.9556 1.48187 14.3677 0.685061 12.444C-0.111747 10.5203 -0.216886 8.37983 0.387558 6.3873C0.992002 4.39477 2.26863 2.67346 3.99992 1.51666C5.73121 0.359868 7.81004 -0.160839 9.88221 0.0432657C11.9544 0.24737 13.8917 1.16366 15.364 2.636Z"
                    fill="white"
                  />
                </svg>
              ) : (
                <p>Confirmer</p>
              )}
            </button>
            <p className="text-sm">
              En cliquant sur Confirmer, vous acceptez notre{" "}
              <span className="text-primary font-semibold cursor-pointer">
                politique de confidentialité
              </span>{" "}
              applicable au traitement de vos données personnelles.
            </p>
          </div>
          {/* bottom */}
          <div className="mt-16 flex items-center space-x-4 text-gray-500">
            <p>Privacy Policy</p>
            <p>•</p>
            <p>Term of use</p>
          </div>
        </article>
      </section>

      {/* right */}
      <section className="bg-light3 flex flex-col justify-center items-center gap-y-20">
        <article>
          <img src={IMG1} alt="" className="" />
        </article>
        <article>
          <div className="bg-dark max-w-[500px] h-72 rounded-3xl flex flex-col items-center pt-7 gap-y-4 px-10">
            <img
              src={IMG2}
              alt=""
              className="w-16 h-16 object-cover object-top rounded-full"
            />
            <p className="font-extrabold text-white text-center">
              “In the tech world, you can’t afford to be slow. Because of
              Uizard, within five days of getting my idea – with only two days
              of working in the Uizard platform – I already had a proof of
              concept.”
            </p>
          </div>
          <div className="relative left-72 w-fit -top-10">
            <svg
              className="absolute -left-3 -top-3"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.719854 1.76194C0.527476 1.01656 1.21413 0.342448 1.95583 0.548531L22.4263 6.23627C23.3058 6.48064 23.4249 7.67883 22.6108 8.09165L12.9834 12.9736L7.88169 22.5588C7.45313 23.364 6.25862 23.222 6.03067 22.3388L0.719854 1.76194Z"
                fill="#00B963"
              />
            </svg>
            <div className="w-[150px] h-[70px] bg-primary rounded-2xl text-white flex justify-center items-center font-bold text-sm pl-4">
              Nthalie Durand, WellPharma
            </div>
          </div>
          <div className="font-extrabold text-2xl text-dark text-center max-w-sm mx-auto">
            Rejoingez +10,000 pharmaciens connectés
          </div>
        </article>
      </section>
    </div>
  );
}

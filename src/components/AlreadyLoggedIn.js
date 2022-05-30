import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AlreadyLoggedIn() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 3000);
  }, []);

  return (
    <div className="h-12 w-11/12 absolute left-1/2 transform -translate-x-1/2 top-1 rounded-md bg-gray-600 text-white grid place-content-center">
      <h1>Your Already logged in</h1>
    </div>
  );
}

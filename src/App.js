import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Layout from "./components/Layout";
import Home from "./components/Home";
import RequireAuth from "./components/RequireAuth";
import Missing from "./components/Midding";
import { AuthProvider } from "./context/AuthContext";
import jsCookie from "js-cookie";
import AlreadyLoggedIn from "./components/AlreadyLoggedIn";
import TableauDeBord from "./components/TableauDeBord";
import Client from "./components/Client";
import Avis from "./components/Avis";
import MaPharmacie from "./components/MaPharmacie";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* public routes */}
            <Route
              path="login"
              element={jsCookie.get("token") ? <AlreadyLoggedIn /> : <Login />}
            />
            <Route
              path="register"
              element={
                jsCookie.get("token") ? <AlreadyLoggedIn /> : <Register />
              }
            />

            {/* protected routes */}
            <Route element={<RequireAuth />}>
              <Route path="/" element={<Home />} />
              <Route path="tableaudebord" element={<TableauDeBord />} />
              <Route path="/client" element={<Client />} />
              <Route path="/avis" element={<Avis />} />
              <Route path="/mapharmacie" element={<MaPharmacie />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<Missing />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

import * as React from "react";
import * as ReactDOM from "react-dom/client";
import css from "./index.css"

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import Login from './pages/Login';
import Home from './pages/user/home/Home';
import Reclamo from './pages/user/reclamoUnidad/Reclamo';
import ReclamoComun from "./pages/user/reclamoComun/ReclamoComun";
import Unidad from "./pages/admin/edificios/unidad/Unidad";
import MisReclamos from "./pages/user/misReclamos/MisReclamos";
import MisEdificios from "./pages/user/misEdificios/MisEdificios";
import MisReclamosPorEdificio from "./pages/user/misEdificios/reclamosPorEdificio/MisReclamosPorEdificio";
import MiPerfil from "./pages/user/miPerfil/MiPerfil";
import VerReclamo from "./pages/user/verReclamo/VerReclamo";
import ReclamoAdmin from "./prueba/ReclamoAdmin";
import LoginAdmin from "./pages/LoginAdmin";
import HomeAdmin from "./pages/admin/home/Home";
import Edificios from "./pages/admin/edificios/Edificios"
import Edificio from "./pages/admin/edificios/Edificio"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login></Login>,
  },
  {
    path: "/home",
    element: <Home></Home>,
  },
  {
    path: "/reclamo-unidad",
    element: <Reclamo></Reclamo>,
  },
  {
    path:"/reclamo-comun",
    element: <ReclamoComun></ReclamoComun>
  },
  {
    path:"/edificios/:codigoEdificio/unidades/:piso/:numero",
    element: <Unidad></Unidad>
  },
  {
    path:"/mis-reclamos",
    element: <MisReclamos></MisReclamos>
  },
  {
    path:"/mis-edificios",
    element: <MisEdificios></MisEdificios>
  },
  {
    path:"/mis-edificios/:codigoEdificio/reclamos",
    element: <MisReclamosPorEdificio></MisReclamosPorEdificio>
  },
  {
    path: "/mi-perfil",
    element:<MiPerfil></MiPerfil>
  },
  {
    path: "/unidades/:codigoEdificio/:piso/:numero",
    element: <Unidad></Unidad>,
  },
  {
    path:"/reclamos/:idReclamo",
    element: <VerReclamo></VerReclamo>
  },
  {
    path:"/login-admin",
    element: <LoginAdmin></LoginAdmin>
  },
  {
    path:"/home-admin",
    element: <HomeAdmin></HomeAdmin>
  },
  {
    path: "/prueba/:idReclamo",
    element: <ReclamoAdmin></ReclamoAdmin>
  },
  {
    path: "/edificios",
    element: <Edificios></Edificios>
  },
  {
    path: "edificios/:codigo",
    element: <Edificio></Edificio>
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();

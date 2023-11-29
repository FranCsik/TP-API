import * as React from "react";
import * as ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import Login from './User/LoginDeUsuario/Login';
import Home from './User/InicioDeUsuario/Home';
import Reclamo from './User/FormulariosDeReclamo/Reclamo';
import ReclamoComun from "./User/FormulariosDeReclamo/ReclamoComun";
import Unidad from "./Componentes/Unidad";
import MisReclamos from "./User/ReclamosDelUsuario/misReclamos";
import MisEdificios from "./User/MisEdificios/MisEdificios";
import MisReclamosPorEdificio from "./User/ReclamosPorEdificio/MisReclamosPorEdificio";
import MiPerfil from "./User/PerfilDelUsuario/MiPerfil";
import VerReclamo from "./User/VerReclamo/VerReclamo";

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
    path: "/reclamos/:idReclamo",
    element: <VerReclamo></VerReclamo>,
  },
  {
    path: "/unidades/:codigoEdificio/:piso/:numero",
    element: <Unidad></Unidad>,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

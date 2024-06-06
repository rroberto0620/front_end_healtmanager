import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './Login.jsx'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import Principal from './Principal.jsx'
import DescargaRecetas from './DescargaRecetas.jsx'
import MiPerfil from './MiPerfil.jsx'
import MedicoPrincipal from './MedicoPrincipal .jsx'
import RegistrarPaciente from './RegistrarPaciente.jsx';
import EditarPaciente from './EditarPaciente';
import RecetaMedica from './RecetaMedica';
import BuscarPaciente from './BuscarPaciente';
import HistorialPacientes from './HistorialPacientes'
import MiPerfilMedico from './MiPerfilMedico.jsx'
import MisPacientes from './MisPacientes.jsx'
import EliminarPacientes from './EliminarPacientes.jsx'


  const router = createHashRouter([
    {
      path: "/",
      element:<Login/>
    },
    {
      path: "/DescargaRecetas",
      element: <DescargaRecetas/>
    },
    {
      path: "/Principal",
      element: <Principal/>
    },
    {
      path: "MedicoPrincipal",
      element: <MedicoPrincipal/>
    }
    ,
    {
      path: "/RegistrarPaciente",
      element:<RegistrarPaciente/>
    },
    {
      path: "/EditarPaciente",
      element:<EditarPaciente/>
    },
    {
      path: "/RecetaMedica",
      element:<RecetaMedica/>
    }
    ,
    {
      path: "/BuscarPaciente",
      element:<BuscarPaciente/>
    },
    {
      path: "/HistorialPacientes",
      element:<HistorialPacientes/>
    },
    {
      path: "/MiPerfil",
      element:<MiPerfil/>
    },
    {
      path: "MisPacientes",
      element:<MisPacientes/>
    }
    ,
    {
      path: "/MiPerfilMedico",
      element:<MiPerfilMedico/>
    },
    {
      path: "/EliminarPacientes",
      element:<EliminarPacientes/>
    }
  ])

  ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)

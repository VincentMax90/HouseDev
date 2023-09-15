import "./App.css";
import React from "react";
import { Route, Routes } from "react-router";
import Home from "./views/Home";
import Navbar from "./components/Navbar";
import Login from "./views/Login";
import Register from "./views/Register";
import AdminSubmit from "./views/AdminSubmit";
import ProtectedRouteAdmin from "./components/ProtectedRouterAdmin";
import Property from "./views/Property";
import AllUser from "./views/AllUser";
import Venta from "./views/Ventas";
import Alquiler from "./views/Alquiler";
import PropertyDetails from "./views/PropertyDetails";
import MyProfile from "./views/MyProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import Visitas from "./views/Visitas";
import Appointments from "./views/Appointment";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/venta" element={<Venta />}></Route>
        <Route path="/alquiler" element={<Alquiler />}></Route>
        <Route path="/property/:id" element={<PropertyDetails />}></Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<MyProfile />}></Route>
          <Route path="/visitas" element={<Visitas />}></Route>
        </Route>

        <Route element={<ProtectedRouteAdmin />}>
          <Route path="/appointments" element={<Appointments />}></Route>
          <Route path="/adminSubmit" element={<AdminSubmit />}></Route>
          <Route path="/property" element={<Property />}></Route>
          <Route path="/allUser" element={<AllUser />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;




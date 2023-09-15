import * as React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { setUser } from "../state/user";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

 

  const handleLogout = () => {
    axios
      .get("http://localhost:3001/api/user/logout", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        credentials: "include",
      })
      .then(() => {
        dispatch(setUser(null));
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout failed", error);
      });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: user?.admin ? "blue" : "red" }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontFamily: "Montserrat" }}
          >
            <Button color="inherit" to={"/"} component={Link}>
                HOD.
              </Button>
          </Typography>

          {user && user.admin ? (
            <>
              <Button color="inherit" to={"/appointments"} component={Link}>
                Citas
              </Button>
              <Button color="inherit" to={"/property"} component={Link}>
                Propiedades
              </Button>
              <Button color="inherit" to={"/adminSubmit"} component={Link}>
                Nueva propiedad
              </Button>
              <Button color="inherit" to={"/allUser"} component={Link}>
                Usuarios
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" to={"/venta"} component={Link}>
                Venta
              </Button>
              <Button color="inherit" to={"/alquiler"} component={Link}>
                Alquiler
              </Button>
              <Button color="inherit">Nuestros servicios</Button>
              <Button color="inherit">Nosotros</Button>
              <Button color="inherit">Contacto</Button>{" "}
            </>
          )}
          {user && user.admin === false ? (<>
            <Button color="inherit" to={"/visitas"} component={Link}>Agenda tu visita</Button>
            <Button color="inherit" to={"/profile"} component={Link}>
                Mi perfil
              </Button></>
          ) : undefined}

          {user ? (
            <>
              
              <Button color="inherit" onClick={handleLogout}>
                Salir
              </Button>

              <div style={{ position: "absolute", top: 70, right: 20 }}>
               
              </div>
            </>
          ) : (
            <>
              <Button color="inherit" to={"/login"} component={Link}>
                Ingresar
              </Button>
              <Button color="inherit" to={"/register"} component={Link}>
                Registro
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;

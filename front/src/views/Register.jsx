import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import { Grid } from "@mui/material";
import { Card, CardContent } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import Alert from '@mui/material/Alert';

const Register = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await axios.post("http://localhost:3001/api/user/register", {
        name: name,
        lastname: lastname,
        email: email,
        password: password,
      });
      toast( <Alert variant="filled" severity="success">
      {`Usuario ${user.data.name} ${user.data.lastname}`}
    </Alert>);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      setName("")
      setLastname("")
      setEmail("")
      setPassword("")
    } catch (error) {
      toast(<Alert variant="filled" severity="error">
      Error al crear la cuenta
    </Alert>);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Grid container>
        <Card
          style={{
            maxWidth: 450,
            padding: "20px 5px",
            margin: "0 auto",
            border:"solid 2px Gray"
          }}
        >
          <h1 style={{ textAlign: "center", color: "red" }}>Registro</h1>
          <CardContent>
            <Box onSubmit={handleSubmit} component="form">
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Nombre"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Apellido"
                    name="lastname"
                    autoComplete="lastname"
                    autoFocus
                    onChange={(e) => setLastname(e.target.value)}
                    value={lastname}
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Correo electronico"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    variant="standard"
                    inputProps={{
                      pattern:
                        "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$",
                      title: "Ingresa un correo electrónico válido",
                    }}
                    error={
                      email &&
                      !/^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)
                    }
                    helperText={
                      email &&
                      !/^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)
                        ? "Ingresa un correo electrónico válido"
                        : ""
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Contraseña"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    sx={{
                      background: "red",
                      "&:hover": {
                        background: "blue",
                      },
                    }}
                    type="submit"
                    variant="contained"
                    fullWidth
                  >
                    Crear Cuenta
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Register;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUser } from "../state/user";
import decodeJwt from "../utils/jwtdecore";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import { Grid } from "@mui/material";
import { Card, CardContent } from "@mui/material";
import Alert from "@mui/material/Alert";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [email, setEmail] = useState(null);


  
  async function handleSuccess(credentialResponse) {
    if (credentialResponse.credential) {
      const { payload } = decodeJwt(credentialResponse.credential);
      const response = await fetch("/api/google", {
        method: "POST",
        body: JSON.stringify({
          token: credentialResponse.credential,
        }),
      });
      console.log(payload);
      const json = await response.json();
      console.log("verify", json);
      setEmail(json.email);
      dispatch(
        setUser({
          email: payload.email,
          name: payload.given_name,
          lastname: payload.family_name,
          admin: false,
          img_url: null,
        })
      );
    }
  }
  function handleError() {
    console.log("Login failed");
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/user/login",
        {
          email: loginEmail,
          password: loginPassword,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
          credentials: "include",
        }
      );

      toast(
        <Alert variant="filled" severity="success">
          Ingreso concretado
        </Alert>
      );

      const userData = response.data;

      dispatch(setUser(userData));

      const meResponse = await axios.get("http://localhost:3001/api/user/me", {
        withCredentials: true,
        credentials: "include",
      });

      const meData = meResponse.data;
      dispatch(setUser(meData));
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast(
        <Alert variant="filled" severity="error">
          Error al ingresar
        </Alert>
      );
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
        theme="dark"
      />
      <Grid container>
        <Card
          style={{
            maxWidth: 450,
            padding: "20px 5px",
            margin: "0 auto",
            border: "solid 2px Gray",
          }}
        >
          <CardContent>
            <Box onSubmit={handleLoginSubmit} component="form">
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Correo electronico"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={(e) => setLoginEmail(e.target.value)}
                    value={loginEmail}
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
                    onChange={(e) => setLoginPassword(e.target.value)}
                    value={loginPassword}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button sx={{}} type="submit" variant="outlined">
                    Acceder
                  </Button>
                  <GoogleOAuthProvider clientId="19444525586-d0vts85554256q8n4q5fn39ecjebjb46.apps.googleusercontent.com">
                    {!email && (
                      <GoogleLogin
                        onSuccess={handleSuccess}
                        onError={handleError}
                        useOneTap
                      />
                    )}
                    {email && <p>El usuario ha iniciado sesión: {email}</p>}
                  </GoogleOAuthProvider>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default Login;

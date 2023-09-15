import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Grid } from "@mui/material";
import { Card, CardContent } from "@mui/material";

const AdminSubmit = () => {
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [ambientes, setAmbientes] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imgsUrl, setImgsUrl] = useState("");
  const [surface, setSurface] = useState("");
  const [operation, setOperation] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const property = await axios.post(
        "http://localhost:3001/api/admin/submit",
        {
          address: address,
          location: location,
          ambientes: ambientes,
          bathrooms: bathrooms,
          price: price,
          category: category,
          description: description,
          imgsUrl: imgsUrl,
          surface: surface,
          operation: operation,
        }
      );

      toast.success(`Propiedad ${property.data.address} creada.`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      navigate("/");
    } catch (error) {
      toast.error("Error", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "Skyblue",
          minHeight: "90vh"
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
              backgroundColor: "LightGrey",
            }}
          >
            <CardContent>
              <Box onSubmit={handleSubmit} component="form">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Dirección"
                      name="address"
                      onChange={(e) => setAddress(e.target.value)}
                      value={address}
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Ubicación"
                      name="location"
                      autoComplete="location"
                      autoFocus
                      onChange={(e) => setLocation(e.target.value)}
                      value={location}
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Ambientes"
                      name="ambientes"
                      type="number"
                      inputProps={{ min: "0" }}
                      onChange={(e) => setAmbientes(e.target.value)}
                      value={ambientes}
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Baños"
                      name="bathrooms"
                      type="number"
                      inputProps={{ min: "0" }}
                      onChange={(e) => setBathrooms(e.target.value)}
                      value={bathrooms}
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Precio"
                      name="price"
                      type="number"
                      inputProps={{ min: "0" }}
                      onChange={(e) => setPrice(e.target.value)}
                      value={price}
                      variant="standard"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Descripción"
                      name="description"
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="URL de imágenes"
                      name="imgsUrl"
                      onChange={(e) => setImgsUrl(e.target.value)}
                      value={imgsUrl}
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Superficie"
                      name="surface"
                      type="number"
                      inputProps={{ min: "0" }}
                      onChange={(e) => setSurface(e.target.value)}
                      value={surface}
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    Tipo de propiedad
                    <Select
                      margin="normal"
                      required
                      fullWidth
                      label="Categoría"
                      name="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      variant="standard"
                    >
                      <MenuItem value="Departamento">Departamento</MenuItem>
                      <MenuItem value="PH">PH</MenuItem>
                      <MenuItem value="Casa">Casa</MenuItem>
                      <MenuItem value="Terreno">Terreno</MenuItem>
                      <MenuItem value="Local">Local</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    Operacion
                    <Select
                      margin="normal"
                      required
                      fullWidth
                      label="Operación"
                      name="operation"
                      value={operation}
                      onChange={(e) => setOperation(e.target.value)}
                      variant="standard"
                    >
                      <MenuItem value="Venta">Venta</MenuItem>
                      <MenuItem value="Alquiler">Alquiler</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      sx={{
                        background: "blue",
                        "&:hover": {
                          background: "green",
                        },
                      }}
                      type="submit"
                      variant="contained"
                      fullWidth
                    >
                      Crear Propiedad
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </div>
    </>
  );
};

export default AdminSubmit;

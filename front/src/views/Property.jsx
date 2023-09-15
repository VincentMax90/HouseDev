import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import { Link, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";

function Property() {
  const [property, setProperty] = useState(null);
  const { id } = useParams();
  const [open, setOpen] = useState(false);

  const [editedProperty, setEditedProperty] = useState(null);

  const data = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/property/all"
      );
      const data = response.data;

      setProperty(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    data();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3001/api/admin/property/delete/${id}`
      );
      data();
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickOpen = (id) => {
    const editedProperty = property.find((prop) => prop.id === id);
    setEditedProperty(editedProperty);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditProperty = async () => {
    try {
      await axios.put(
        `http://localhost:3001/api/admin/property/edit/${editedProperty.id}`,
        editedProperty
      );
      data();
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <><div style={{ backgroundColor: "Skyblue",
    minHeight: "90vh"}}>
      <div style={{ border: "2px solid blue",
       height:" 25px",
       width:"1000px",
       margin:"0px 15vh 20px",
       fontFamily:"monzerrat",
       fontSize:"20px"
        }}>
        Todas las propiedades
      </div>
      <div style={{ margin: "0 5%" }}>
        <Box display="flex" flexWrap="wrap">
          {property?.map((property, index) => (
            <Card
              key={property.id}
              sx={{
                maxWidth: 530,
                height: 200,
                border: "1px solid blue",
                margin: "10px",
              }}
            >
              <Box sx={{ display: "flex", height: "100%" }}>
                <CardMedia
                  component="img"
                  height="100%"
                  width="200"
                  image={property.imgsUrl}
                  sx={{
                    alignSelf: "flex-start",
                    borderRight: "1px solid blue",
                    objectFit: "cover",
                    width: "160px",
                  }}
                />
                <CardContent sx={{ height: "100%" }}>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateRows: "repeat(5, 1fr)",
                      width: "330px",
                      height: "100%",
                    }}
                  >
                    <Box
                      sx={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
                    >
                      <div style={{ border: "1px solid blue", height: "100%" }}>
                        {<AttachMoneyIcon />} {property.price}
                      </div>
                      <div style={{ border: "1px solid blue", height: "100%" }}>
                        {<LocationOnIcon />}
                        {property.location}
                      </div>
                    </Box>
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr",
                      }}
                    >
                      <div style={{ border: "1px solid blue", height: "100%" }}>
                        {<SquareFootIcon />} {property.surface} m2
                      </div>
                      <div style={{ border: "1px solid blue", height: "100%" }}>
                        {<BedIcon />} {property.ambientes}
                      </div>
                      <div style={{ border: "1px solid blue", height: "100%" }}>
                        {<BathtubIcon />} {property.bathrooms}
                      </div>
                    </Box>
                    <div style={{ border: "1px solid blue", height: "100%" }}>
                      {property.description}
                    </div>

                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr",
                      }}
                    >
                      <Button
                        variant="contained"
                        style={{ border: "1px solid blue", height: "100%" }}
                        onClick={() => handleClickOpen(property.id)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="contained"
                        style={{ border: "1px solid blue", height: "100%" }}
                        onClick={() => handleDelete(property.id)}
                        type="submit"
                      >
                        Eliminar
                      </Button>
                      <Button
                        variant="contained"
                        style={{ border: "1px solid blue", height: "100%" }}
                        to={`/property/${property.id}`}
                        component={Link}
                      >
                        Ver más
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Box>
            </Card>
          ))}
        </Box>
      </div></div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Editar Propiedad</DialogTitle>
        {editedProperty && (
          <DialogContent>
            <DialogContentText>
              Edita los campos de la propiedad:
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="price"
              label="Precio"
              type="number"
              fullWidth
              value={editedProperty.price}
              onChange={(e) =>
                setEditedProperty({
                  ...editedProperty,
                  price: e.target.value,
                })
              }
            />
            <TextField
              margin="dense"
              id="location"
              label="Ubicación"
              fullWidth
              value={editedProperty.location}
              onChange={(e) =>
                setEditedProperty({
                  ...editedProperty,
                  location: e.target.value,
                })
              }
            />
            <TextField
              margin="dense"
              id="surface"
              label="Superficie"
              fullWidth
              value={editedProperty.surface}
              onChange={(e) =>
                setEditedProperty({
                  ...editedProperty,
                  surface: e.target.value,
                })
              }
            />
            <TextField
              margin="dense"
              id="ambientes"
              label="Ambientes"
              fullWidth
              value={editedProperty.ambientes}
              onChange={(e) =>
                setEditedProperty({
                  ...editedProperty,
                  ambientes: e.target.value,
                })
              }
            />
            <TextField
              margin="dense"
              id="category"
              label="Categoria"
              fullWidth
              value={editedProperty.category}
              onChange={(e) =>
                setEditedProperty({
                  ...editedProperty,
                  category: e.target.value,
                })
              }
            />
            <TextField
              margin="dense"
              id="description"
              label="Description"
              fullWidth
              value={editedProperty.description}
              onChange={(e) =>
                setEditedProperty({
                  ...editedProperty,
                  description: e.target.value,
                })
              }
            />
            <TextField
              margin="dense"
              id="imgsUrl"
              label="ImgUrl"
              fullWidth
              value={editedProperty.imgsUrl}
              onChange={(e) =>
                setEditedProperty({
                  ...editedProperty,
                  imgsUrl: e.target.value,
                })
              }
            />
            <TextField
              margin="dense"
              id="bathrooms"
              label="Baños"
              fullWidth
              value={editedProperty.bathrooms}
              onChange={(e) =>
                setEditedProperty({
                  ...editedProperty,
                  bathrooms: e.target.value,
                })
              }
            />
            <TextField
              margin="dense"
              id="operation"
              label="Operacion"
              fullWidth
              value={editedProperty.operation}
              onChange={(e) =>
                setEditedProperty({
                  ...editedProperty,
                  operation: e.target.value,
                })
              }
            />
            <TextField
              margin="dense"
              id="address"
              label="Dirección"
              fullWidth
              value={editedProperty.address}
              onChange={(e) =>
                setEditedProperty({
                  ...editedProperty,
                  address: e.target.value,
                })
              }
            />
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleEditProperty}>Guardar Cambios</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Property;

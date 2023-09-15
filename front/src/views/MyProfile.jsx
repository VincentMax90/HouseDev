import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import setUser from "../state/user";
import { toast, ToastContainer } from "react-toastify";


import Container from "@mui/material/Container";



function MyProfile() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    img_url: "",
  });

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:3001/api/user/${user.id}/profile`, {
          withCredentials: true,
          credentials: "include",
        })
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener los datos del usuario", error);
        });
    }
  }, [user]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleImageChange = async (event) => {
    const imageFile = event.target.files[0];
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "imagesProfile");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/diycik8dw/image/upload",
        formData
      );
      

      const imageUrl = response.data.secure_url;

      setUserData({ ...userData, img_url: imageUrl });

      await axios.put(
        `http://localhost:3001/api/user/${user.id}/profile-edit-img`,
        { img_url: imageUrl },
        {
          withCredentials: true,
          credentials: "include",
        }
      );

      dispatch(setUser({ ...user, img_url: imageUrl }));
    } catch (error) {
      console.error("Error al cargar la imagen en Cloudinary:", error);
    }
  };
  const handleSaveChanges = () => {
    if (!userData.name || !userData.lastname || !userData.email) {
      toast.warn("Los campos Nombre, Apellido y Email son requeridos.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      return;
    }
    axios
      .put(`http://localhost:3001/api/user/${user.id}/profile-edit`, userData, {
        withCredentials: true,
        credentials: "include",
      })
      .catch((error) => {
        console.error("Error al actualizar el perfil", error);
      });
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 4,
          height: "10vh",
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
        
      </Box>

      <Box
        component="form"
        mt={4}
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <TextField
          label="Nombre"
          name="name"
          value={userData.name}
          onChange={handleInputChange}
          margin="normal"
          variant="outlined"
          style={{ width: "50%" }}
        />
        <TextField
          label="Apellido"
          name="lastname"
          value={userData.lastname}
          onChange={handleInputChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Teléfono"
          name="phone"
          value={userData.phone}
          onChange={handleInputChange}
          margin="normal"
          variant="outlined"
        />

       

        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveChanges}
          mt={2}
        >
          Guardar Cambios
        </Button>
      </Box>
    </Container>
  );
}

export default MyProfile;

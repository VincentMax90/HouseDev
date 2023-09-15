import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import { Link, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { sendEmailConfirm, sendEmailReject } from "../services/emailService";

function Appointments() {
  const { id } = useParams();
  const [appointment, setAppointment] = useState([]);
  appointment.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    if (dateA.getFullYear() !== dateB.getFullYear()) {
      return dateA.getFullYear() - dateB.getFullYear();
    }

    if (dateA.getMonth() !== dateB.getMonth()) {
      return dateA.getMonth() - dateB.getMonth();
    }

    return dateA.getDate() - dateB.getDate();
  });

  const [user, setUser] = useState([]);
  const [property, setProperty] = useState([]);
  const data = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/appointment/searchAll"
      );
      const data = response.data;
      setAppointment(data);
    } catch (error) {
      console.error(error);
    }
  };

  const data1 = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/admin/allUser"
      );
      const data = response.data;

      setUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  const data2 = async () => {
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
    data1();
    data2();
  }, []);
  const getUserNameById = (userId) => {
    const userFound = user.find((user) => user.id === userId);
    return userFound
      ? `${userFound.name} ${userFound.lastname}`
      : "Usuario no encontrado";
  };
  const getLocationById = (propertyId) => {
    const propertyFound = property.find((prop) => prop.id === propertyId);
    return propertyFound ? propertyFound.location : "Ubicación no encontrada";
  };
  const getImageUrlById = (propertyId) => {
    const propertyFound = property.find((prop) => prop.id === propertyId);
    return propertyFound
      ? propertyFound.imgsUrl
      : "URL de imagen no encontrada";
  };
  const getEmailById = (userId) => {
    const userFound = user.find((user) => user.id === userId);
    return userFound ? userFound.email : "Email no encontrado";
  };

  const getPhoneById = (userId) => {
    const userFound = user.find((user) => user.id === userId);
    return userFound ? userFound.phone : "Teléfono no encontrado";
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/appointment/delete/${id}`);
      data();
    } catch (error) {
      console.error(error);
    }
  };
  const reject = async function (id) {
    try {
      const appointmentToUpdate = appointment.find((appt) => appt.id === id);
      const appointmentData = appointmentToUpdate
      const userEmail = getEmailById(appointmentToUpdate.id_user);
      await sendEmailReject(userEmail,appointmentData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const appointmentToUpdate = appointment.find((appt) => appt.id === id);

      const updatedAppointment = {
        ...appointmentToUpdate,
        confirmation: true,
      };

      await axios.put(
        `http://localhost:3001/api/appointment/edit/${id}`,
        updatedAppointment
      );

      setAppointment((prevAppointments) =>
        prevAppointments.map((appt) =>
          appt.id === id ? { ...appt, confirmation: true } : appt
        )
      );

      const userEmail = getEmailById(appointmentToUpdate.id_user);
      await sendEmailConfirm(userEmail, updatedAppointment);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div style={{ margin: "0 5%" }}>
        <Box
          sx={{
            background: "white",
            maxWidth: 1065,
            height: 48,
            border: "1px solid blue",
            margin: "10px",
            display: "flex",
            alignItems: "flex-end",
            fontFamily: "Montserrat, sans-serif",
            justifyContent: "space-between",
            paddingLeft: "5px",
            borderBottom: "1px solid blue",
            fontSize: "17px",
            color: "blue",
          }}
        >
          PRÓXIMAS CITAS
        </Box>

        <Box display="flex" flexWrap="wrap">
          {appointment
            .filter((appointment) => appointment.confirmation === true)
            .map((appointment, index) => (
              <Card
                key={appointment.id}
                sx={{
                  maxWidth: 530,
                  height: 275,
                  border: "1px solid blue",
                  margin: "10px",
                }}
              >
                <Box sx={{ display: "flex", height: "100%" }}>
                  <Box>
                    <CardMedia
                      component="img"
                      height="190px"
                      width="200"
                      sx={{
                        alignSelf: "flex-start",
                        borderRight: "1px solid blue",
                        objectFit: "cover",
                        width: "160px",
                      }}
                      image={getImageUrlById(appointment.id_propierty)}
                    />
                    <Box display="flex" justifyContent="center" mt={2}>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleDelete(appointment.id)}
                      >
                        Finalizada
                      </Button>
                    </Box>{" "}
                  </Box>
                  <CardContent>
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateRows: "repeat(5, 1fr)",
                        width: "330px",
                        height: "100%",
                        margin: "0px",
                      }}
                    >
                      <Box
                        sx={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
                      >
                        <div
                          style={{ border: "1px solid blue", height: "100%" }}
                        >
                          {appointment.date}
                        </div>
                        <div
                          style={{ border: "1px solid blue", height: "100%" }}
                        >
                          {appointment.hour}
                        </div>
                      </Box>
                      <Box>
                        <div
                          style={{ border: "1px solid blue", height: "100%" }}
                        >
                          {getLocationById(appointment.id_propierty)}
                        </div>
                      </Box>{" "}
                      <Box>
                        <div
                          style={{ border: "1px solid blue", height: "100%" }}
                        >
                          {getUserNameById(appointment.id_user)}
                        </div>
                      </Box>{" "}
                      <Box>
                        <div
                          style={{ border: "1px solid blue", height: "100%" }}
                        >
                          {getPhoneById(appointment.id_user)}
                        </div>
                      </Box>{" "}
                      <Box>
                        <div
                          style={{ border: "1px solid blue", height: "100%" }}
                        >
                          {getEmailById(appointment.id_user)}
                        </div>
                      </Box>
                    </Box>
                  </CardContent>
                </Box>
              </Card>
            ))}
        </Box>
        <Box
          sx={{
            background: "white",
            maxWidth: 1065,
            height: 48,
            border: "1px solid blue",
            margin: "10px",
            display: "flex",
            alignItems: "flex-end",
            fontFamily: "Montserrat, sans-serif",
            justifyContent: "space-between",
            paddingLeft: "5px",
            borderBottom: "1px solid blue",
            fontSize: "17px",
            color: "blue",
          }}
        >
          CITAS POR CONFIRMAR
        </Box>
        <Box display="flex" flexWrap="wrap">
          {appointment
            .filter((appointment) => appointment.confirmation === false)
            .map((appointment, index) => (
              <Card
                key={appointment.id}
                sx={{
                  maxWidth: 530,
                  height: 275,
                  border: "1px solid blue",
                  margin: "10px",
                }}
              >
                <Box sx={{ display: "flex", height: "100%" }}>
                  <Box>
                    <CardMedia
                      component="img"
                      height="190px"
                      width="200"
                      sx={{
                        alignSelf: "flex-start",
                        borderRight: "1px solid blue",
                        objectFit: "cover",
                        width: "160px",
                      }}
                      image={getImageUrlById(appointment.id_propierty)}
                    />
                    <Box display="flex" justifyContent="center" mt={1}>
                      <Button
                        size="small"
                        variant="contained"
                        color="success"
                        style={{ marginRight: "5px" }}
                        onClick={() => handleEdit(appointment.id)}
                      >
                        Confirmar
                      </Button>
                    </Box>
                    <Box display="flex" justifyContent="center" mt={1}>
                      <Button
                        size="small"
                        variant="contained"
                        color="error"
                        onClick={() => {
                          handleDelete(appointment.id); reject(appointment.id);
                        }}
                      >
                        Recharzar
                      </Button>
                    </Box>
                  </Box>
                  <CardContent>
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateRows: "repeat(5, 1fr)",
                        width: "330px",
                        height: "100%",
                        margin: "0px",
                      }}
                    >
                      <Box
                        sx={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
                      >
                        <div
                          style={{ border: "1px solid blue", height: "100%" }}
                        >
                          {appointment.date}
                        </div>
                        <div
                          style={{ border: "1px solid blue", height: "100%" }}
                        >
                          {appointment.hour}
                        </div>
                      </Box>
                      <Box>
                        <div
                          style={{ border: "1px solid blue", height: "100%" }}
                        >
                          {getLocationById(appointment.id_propierty)}
                        </div>
                      </Box>{" "}
                      <Box>
                        <div
                          style={{ border: "1px solid blue", height: "100%" }}
                        >
                          {getUserNameById(appointment.id_user)}
                        </div>
                      </Box>{" "}
                      <Box>
                        <div
                          style={{ border: "1px solid blue", height: "100%" }}
                        >
                          {getPhoneById(appointment.id_user)}
                        </div>
                      </Box>{" "}
                      <Box>
                        <div
                          style={{ border: "1px solid blue", height: "100%" }}
                        >
                          {getEmailById(appointment.id_user)}
                        </div>
                      </Box>
                    </Box>
                  </CardContent>
                </Box>
              </Card>
            ))}
        </Box>
      </div>
    </>
  );
}

export default Appointments;

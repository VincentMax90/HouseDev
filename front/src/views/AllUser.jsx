import React, { useEffect, useState } from "react";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Link, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

function Propiedad() {
  const [appointment, setAppointment] = useState([]);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { id } = useParams();

  const data = async () => {
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
  useEffect(() => {
    data();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/admin/user/delete/${id}`);
      data();
    } catch (error) {
      console.error(error);
    }
  };
  const handleClickOpen = (id) => {
    setOpen(true);
    data1(id);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const data1 = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/appointment/user/${id}`
      );
      const data = response.data;

      setAppointment(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {" "}
      <Box textAlign="center" p={3} sx={{ backgroundColor: "skyblue",margin:"5vh" ,border:"2px solid grey"}}>
        {user && user.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Usuario</TableCell>
                <TableCell>Citas</TableCell>
                <TableCell>Favoritos</TableCell>

                <TableCell> Eliminar Usuario</TableCell>
                <TableCell> Admin</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{`${user.lastname}, ${user.name}`}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {" "}
                    <Stack direction="row" spacing={2}>
                      <Button
                        variant="contained"
                        onClick={() => handleClickOpen(user.id)}
                      >
                        Citas
                      </Button>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={2}>
                      <Button variant="contained">Favoritos</Button>
                    </Stack>
                  </TableCell>

                  <TableCell>
                    <Stack direction="row" spacing={2}>
                      {user.admin == true ? null : (
                        <Button
                          variant="contained"
                          onClick={() => handleDelete(user.id)}
                        >
                          Delete
                        </Button>
                      )}
                    </Stack>
                  </TableCell>
                  <TableCell>{user.admin == true ? "SI" : "NO"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : null}
      </Box>
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>Citas</DialogTitle>
        {appointment.length > 0 ? (
          appointment.map((item) => (
            <div key={item.id}>
              <p>
                Fecha: {item.date} , Hora: {item.hour}, Confirmación:{" "}
                {item.confirmation ? "Confirmada" : "Pendiente"}
              </p>
            </div>
          ))
        ) : (
          <p>No hay citas disponibles</p>
        )}

        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Propiedad;

import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import axios from "axios";


const FavoritesButton = ({ user, id }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const checkFavoriteStatus = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/favorites/user/${user.id}`);
      const favorites = response.data; 
    } catch (error) {
      console.error("Error al verificar el estado de favoritos:", error);
    }
  };


  useEffect(() => {
    checkFavoriteStatus();
  }, []);

  const handleAddFavorite = async () => {
    try {
      await axios.post(
        `http://localhost:3001/api/favorites/add/${user.id}/${id}`,
        {}
      );
    
    } catch (error) {
      console.error("Error al agregar a favoritos:", error);
    }
  };

  const handleRemoveFavorite = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/favorites/remove/${user.id}/${id}`);
     
    } catch (error) {
      console.error("Error al eliminar de favoritos:", error);
    }
  };
  return (
    <>
      {isFavorite ? (
        <Button
          variant="contained"
          style={{
            border: "1px solid red",
            height: "100%",
            backgroundColor: "red",
          }}
          onClick={handleRemoveFavorite}
        >
          Eliminar de favoritos
        </Button>
      ) : (
        <Button
          variant="contained"
          style={{
            border: "1px solid red",
            height: "100%",
            backgroundColor: "red",
          }}
          onClick={handleAddFavorite}
        >
          Agregar a favoritos
        </Button>
      )}
    </>
  );
};

export default FavoritesButton;
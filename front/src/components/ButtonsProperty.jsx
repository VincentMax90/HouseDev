import React from "react";
import Box from "@mui/material/Box";

import FavoritesButton from "../commons/FavoritesButton";

import MoreButton from "../commons/MoreButton";

function ButtonsProperty({ propertyId, user}) {
  

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
        }}
      >
        {user ? (
          <>
            <FavoritesButton user={user} id={propertyId }/>
          
          </>
        ) : null}
       <MoreButton propertyId={propertyId}/>
      </Box>
    </>
  );
}

export default ButtonsProperty;

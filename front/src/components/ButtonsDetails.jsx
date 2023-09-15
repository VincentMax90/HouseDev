import React from "react";
import Box from "@mui/material/Box";

import FavoritesButton from "../commons/FavoritesButton";
import AppointmentsButton from "../commons/AppointmentsButton";
import ReturnButton from "../commons/ReturnButton";
import { useSelector } from "react-redux";

function ButtonDetails({  property}) {
  const user = useSelector((state) => state.user);

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
            <FavoritesButton user={user} id={property.id }/>
            <AppointmentsButton propertyId={property.id}/>
          </>
        ) : null}

       <ReturnButton user={user} property={property}/>
      </Box>
    </>
  );
}

export default ButtonDetails;

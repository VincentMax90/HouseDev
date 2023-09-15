import React from "react";

import Button from "@mui/material/Button";
import { Link } from "react-router-dom";


function MoreButton({ propertyId }) {

  return (
    <>
   
        <Button
          variant="contained"
          style={{
            border: "1px solid red",
            height: "100%",
            backgroundColor: "red",
          }}
          to={`/property/${propertyId}`}
          component={Link}
        >
          Ver más
        </Button>
    
    </>
  );
}

export default MoreButton;


import React from "react";

import Button from "@mui/material/Button";
import { Link } from "react-router-dom";


function ReturnButton({ property ,user }) {

  return (
    <>
   
       
<Button
              variant="contained"
              style={{
                border: user?.admin ? "1px solid blue" : "1px solid red",
                height: "100%",
                backgroundColor: user?.admin ? "blue" : "red",
              }}
              to={user?.admin ? "/property" : `/${property.operation}`}
              component={Link}
            >
              Volver
            </Button>
    
    </>
  );
}

export default ReturnButton;





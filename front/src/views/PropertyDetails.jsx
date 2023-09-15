import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import { useSelector } from "react-redux";
import ButtonDetails from "../components/ButtonsDetails"


function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const user = useSelector((state) => state.user);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/property/${id}`
        );
        const data = response.data;
        setProperty(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  if (!property) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <div style={{ margin: "0 5%" }}>
        <Card
          sx={{
            maxWidth: 800,
            display: "flex",
            border: "1px solid blue",
            margin: "10px",
            flexDirection: "column",
          }}
        >
          <CardMedia
            component="img"
            height="330"
            width="200"
            image={property.imgsUrl}
            sx={{ objectFit: "cover" }}
          />
          <CardContent>
            <>
              {property.operation} {property.category}
            </>
            <h1>{property.location}</h1>
            {property.address}
            <p>{property.description}</p>
            <div>
              <AttachMoneyIcon />
              Precio:
              {property.price}
            </div>
            <div>
              <SquareFootIcon />
              Superficie:
              {property.surface} m2
            </div>
            <div>
              <BedIcon />
              Ambientes:
              {property.ambientes}
            </div>
            <div>
              <BathtubIcon />
              Baños :{property.bathrooms}
            </div>
          </CardContent>

          <ButtonDetails user={user} property={property} />
        </Card>
      </div>{" "}
    </>
  );
}

export default PropertyDetails;




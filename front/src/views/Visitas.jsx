import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import AppointmentsButton from "../commons/AppointmentsButton"

const Visitas = () => {
  const [property, setProperty] = useState(null);
  const [selectedOption, setSelectedOption] = useState("all");
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [minSurface, setMinSurface] = useState(null);
  const [maxSurface, setMaxSurface] = useState(null);
  const [bathrooms, setBathrooms] = useState(null);
  const [bedrooms, setBedrooms] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("Todas");

  const [availableLocations, setAvailableLocations] = useState([]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const data = useCallback(async () => {
    try {
      let url = "http://localhost:3001/api/property/all";

      if (selectedOption === "alquiler") {
        url = "http://localhost:3001/api/property/category/Alquiler";
      } else if (selectedOption === "venta") {
        url = "http://localhost:3001/api/property/category/Venta";
      }

      const response = await axios.get(url);
      const data = response.data;

      setProperty(data);
    } catch (error) {
      console.error(error);
    }
  }, [selectedOption]);

  useEffect(() => {
    if (property) {
      const uniqueLocations = Array.from(
        new Set(property.map((prop) => prop.location))
      );
      setAvailableLocations(uniqueLocations);
    }
  }, [property]);

  useEffect(() => {
    data();
  }, [selectedOption, minPrice, maxPrice, minSurface, maxSurface, bathrooms, bedrooms, data]);

  return (
    <div style={{ backgroundColor: "lightgreen", minHeight: "90vh" }}>
      <div
        style={{
          marginTop: "10px",
          border: "2px solid blue",
          height: "100px",
          width: "1000px",
          margin: "0px 15vh 20px",
          fontFamily: "monzerrat",
          fontSize: "20px",
        }}
      >
        <span>Tipo de Propiedad:</span>
        <button
          onClick={() => handleOptionChange("all")}
          style={{ marginLeft: "10px" }}
          className={selectedOption === "all" ? "active" : ""}
        >
          Todas
        </button>
        <button
          onClick={() => handleOptionChange("alquiler")}
          style={{ marginLeft: "10px" }}
          className={selectedOption === "alquiler" ? "active" : ""}
        >
          Alquiler
        </button>
        <button
          onClick={() => handleOptionChange("venta")}
          style={{ marginLeft: "10px" }}
          className={selectedOption === "venta" ? "active" : ""}
        >
          Venta
        </button>
        Ubicacion:
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          <option value="Todas">Todas</option>
          {availableLocations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select><br/>
        Precio mínimo:
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        Precio máximo:
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        /><br/>
        Superficie mínima:
        <input
          type="number"
          value={minSurface}
          onChange={(e) => setMinSurface(e.target.value)}
        />
        Superficie máxima:
        <input
          type="number"
          value={maxSurface}
          onChange={(e) => setMaxSurface(e.target.value)}
        /><br/>
        Baños:
        <input
          type="number"
          value={bathrooms !== null ? bathrooms : ""}
          onChange={(e) =>
            setBathrooms(
              e.target.value !== "" ? parseInt(e.target.value) : null
            )
          }
        />
        Habitaciones:
        <input
          type="number"
          value={bedrooms !== null ? bedrooms : ""}
          onChange={(e) =>
            setBedrooms(e.target.value !== "" ? parseInt(e.target.value) : null)
          }
        />
      </div>
      <div style={{ margin: "0px 5%" }}>
        <Box display="flex" flexWrap="wrap">
          {property
            ?.filter((property) => {
              const price = parseInt(property.price);
              const minPriceValue = parseInt(minPrice);
              const maxPriceValue = parseInt(maxPrice);
              const surface = parseInt(property.surface);
              const minSurfaceValue = parseInt(minSurface);
              const maxSurfaceValue = parseInt(maxSurface);

              const priceFilter =
                (minPriceValue >= 0 ? price >= minPriceValue : true) &&
                (maxPriceValue >= 0 ? price <= maxPriceValue : true);

              const surfaceFilter =
                (minSurfaceValue >= 0 ? surface >= minSurfaceValue : true) &&
                (maxSurfaceValue >= 0 ? surface <= maxSurfaceValue : true);

              const bathroomsValue =
                property.bathrooms !== null
                  ? parseInt(property.bathrooms)
                  : null;
              const bedroomsValue =
                property.ambientes !== null
                  ? parseInt(property.ambientes)
                  : null;

              const bathroomsFilter =
                bathrooms !== null
                  ? bathroomsValue !== null
                    ? bathroomsValue === bathrooms
                    : false
                  : true;

              const bedroomsFilter =
                bedrooms !== null
                  ? bedroomsValue !== null
                    ? bedroomsValue === bedrooms
                    : false
                  : true;

              const locationFilter =
                selectedLocation === "Todas"
                  ? true
                  : property.location === selectedLocation;

              return (
                priceFilter &&
                surfaceFilter &&
                bathroomsFilter &&
                bedroomsFilter &&
                locationFilter
              );
            })
            .map((property, index) => (
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
                        <div
                          style={{ border: "1px solid blue", height: "100%" }}
                        >
                          {<AttachMoneyIcon />} {property.price}
                        </div>
                        <div
                          style={{ border: "1px solid blue", height: "100%" }}
                        >
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
                        <div
                          style={{ border: "1px solid blue", height: "100%" }}
                        >
                          {<SquareFootIcon />} {property.surface} m2
                        </div>
                        <div
                          style={{ border: "1px solid blue", height: "100%" }}
                        >
                          {<BedIcon />} {property.ambientes}
                        </div>
                        <div
                          style={{ border: "1px solid blue", height: "100%" }}
                        >
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
                       <AppointmentsButton propertyId={property.id}/>
                      </Box>
                    </Box>
                  </CardContent>
                </Box>
              </Card>
            ))}
        </Box>
      </div>
    </div>
  );
};

export default Visitas;

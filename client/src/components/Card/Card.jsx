// import React from 'react'
// import { useNavigate } from 'react-router-dom'

// export const Card = ({name, price,brand, thumbnail}) => {
//   let navigate = useNavigate()

// function handleDetail (e){
//   e.preventDefault()
//   navigate("/detail")
// }

//   return (
//     <>
//     <h2>{name}</h2>
//     <h3>$ {price}</h3>
//     <h3>{brand}</h3>

//     <img
//       src={thumbnail}
//       alt="soy la foto"/>

//       <button onClick={(e)=>handleDetail(e)}>Detalle</button>
//       <button>Agregar al carrito</button>
//       <button>Comprar ahora</button>
//     </>
//   )
// }
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, } from "@mui/material";

export default function MultiActionAreaCard({
  name,
  price,
  brand,
  thumbnail,
  sku,
  id,
  description,
}) {
  return (
    <Card sx={{ width: 200, hover: "true" }}>
      <CardActionArea sx={[
    {
      '&:hover': {
        transform: "scale(1.05)",
        boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.6)",
        transitionDuration: "1s",
        background: "rgba(138, 151, 165, 0.21)",
      },
    }
  ]}>
          <CardMedia
            component="img"
            height="140"
            image={thumbnail}
            alt="green iguana"
          />
        
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <h3>Precio: $({price})</h3>
          <h3>Marca: {brand}</h3>
          <Typography variant="body2" color="text.secondary">
          <h5>{description}</h5>
          </Typography>
        </CardContent>
        
      </CardActionArea>
 {/*      <CardActions>
        <Button size="small" color="primary">
          Comparar
        </Button>
      </CardActions> */}
    </Card>
  );
}

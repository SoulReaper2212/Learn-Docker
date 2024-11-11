import React, { useState } from 'react';
import Messages from '../components/messages.js';
import cat1 from '../images/TikTok · Crunchycat-modified.jpeg';
import cat3 from '../images/XD-modified.jpeg';
import cat4 from '../images/068eb8b2-cea4-419e-9bf6-c08d9d42a621-modified.jpeg'
import { Container, TextField, Button, Typography, Box, AppBar, Toolbar ,  Card ,CardActions , CardContent, CardMedia,  } from '@mui/material';

const cardData = [
  {
    image: cat1, // Random image
    title: 'Angry Cat',
    description: 'The furious beast of destruction, it can devour the planets whole, but its to lazy to do it',
  },
  {
    image: cat4,
    title: 'Goofy Cat',
    description: 'It has only 2 brain cells left. There is nothing special about this cat its just there',
  },
  {
    image: cat3,
    title: 'Judgemental Cat',
    description: 'Peeks deep inside your soul and curse you with shame and guilt, very dangerous',
  },
];


const StoreFront = () => {
 
  const [hoveredIndex, setHoveredIndex] = useState(null); // Track which card is hovered
  const [rotationX, setRotationX] = useState(Array(cardData.length).fill(0)); // Array to track rotationX for each card
  const [rotationY, setRotationY] = useState(Array(cardData.length).fill(0)); // Array to track rotationY for each card

  const handleMouseMove = (e, index) => {
    const cardHeight = e.currentTarget.offsetHeight;
    const cardWidth = e.currentTarget.offsetWidth;
    const mouseY = e.nativeEvent.offsetY;
    const mouseX = e.nativeEvent.offsetX;

    // Calculate Y-axis tilt based on horizontal position
    const yTilt = ((mouseX / cardWidth) - 0.5) * 30;

    // Calculate X-axis tilt based on vertical position
    const xTilt = ((mouseY / cardHeight) - 0.5) * -10;

    // Update the rotation values for the specific card index
    setRotationX((prev) => {
      const newRotationX = [...prev];
      newRotationX[index] = xTilt;
      return newRotationX;
    });
    setRotationY((prev) => {
      const newRotationY = [...prev];
      newRotationY[index] = yTilt;
      return newRotationY;
    });
  };

  const handleMouseEnter = (index) => {
    setHoveredIndex(index); // Set the hovered index
  };

  const handleMouseLeave = (index) => {
    setHoveredIndex(null); // Reset on mouse leave
    setRotationX((prev) => {
      const newRotationX = [...prev];
      newRotationX[index] = 0; // Reset rotationX for the card
      return newRotationX;
    });
    setRotationY((prev) => {
      const newRotationY = [...prev];
      newRotationY[index] = 0; // Reset rotationY for the card
      return newRotationY;
    });
  };


  return (
    <>

    <AppBar position="static" sx={{ backgroundColor: 'black', alignContent:"center",alignItems:"center" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 , fontFamily: 'Ubuntu Mono, monospace' }}>
            SEE THE POWER OF DOCKER AND DOCKER COMPOSE
          </Typography>
        </Toolbar>
      </AppBar>
    <Container maxWidth="md">
      
    <Box sx={{  display: { xs: 'block', sm: 'flex' },marginLeft:{xs:'5%'}, alignItems: {xs:"center"},textAlign:{xs:"center"}, justifyContent: {sm:'space-around'}, marginTop: '5%' }}>
      {cardData.map((card, index) => {
        // Dynamic shadow based on rotation
        const shadowX = hoveredIndex === index ? rotationY[index] * 0.5 : 0; // Control shadow based on horizontal tilt
        const shadowY = hoveredIndex === index ? rotationX[index] * 0.5 : 0; // Control shadow based on vertical tilt

        const boxShadow = hoveredIndex === index
          ? `${shadowX}px ${shadowY}px 30px rgba(0, 0, 0, 0.4),
             ${-shadowX}px ${-shadowY}px 20px rgba(0, 0, 0, 0)`
          : `${shadowX}px ${shadowY}px 8px rgba(0, 0, 0, 0.2)`;

        return (
          <Card
            key={index}
            sx={{
              width: {xs:400,sm:330},
              margin: '0 10px',
              marginTop:{xs:'4%'},
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              transform: `perspective(1000px) rotateX(${rotationX[index]}deg) rotateY(${rotationY[index]}deg) scale(${hoveredIndex === index ? 1.03 : 1})`,
              cursor: "pointer",
              boxShadow: boxShadow,
            }}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseEnter={() => handleMouseEnter(index)} // Pass the index to handleMouseEnter
            onMouseLeave={() => handleMouseLeave(index)} // Pass the index to handleMouseLeave
          >
            <CardMedia
              sx={{ height: 200 }}
              image={card.image} // Assuming cardData has image property
              title={`Card Image ${index}`}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {card.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {card.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Add to cart</Button>
            </CardActions>
          </Card>
        );
      })}
    </Box>
      

    </Container>

<Container maxWidth="sm">

    <Box
        sx={{
          marginBottom:{xs:'5%'},
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 4,
          bgcolor: "white",
          paddingX: "3%",
          paddingY: "7%",
          borderRadius: 2,
          border: '5px solid black',
        }}
      >
        <Messages /> 
      </Box>

      </Container>

    </>
  );
};

export default StoreFront;

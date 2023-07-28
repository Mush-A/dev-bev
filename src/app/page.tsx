'use client'

import { useState } from 'react';
import { Alert, AlertTitle, AppBar, Badge, Box, Button, Card, CardContent, Container, IconButton, TextField, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function Home() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [name, setName] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);

  interface Room {
    id: number;
    name: string;
  }

  const rooms: Room[] = [
    { id: 1, name: 'Room 1' },
    { id: 2, name: 'Room 2' },
    { id: 3, name: 'Room 3' },
  ];

  const [beverages, setBeverages] = useState<Beverage[]>([
    { id: 1, name: 'Milk Tea', quantity: 0 },
    { id: 2, name: 'Milk Coffee', quantity: 0 },
    { id: 3, name: 'Plain Tea', quantity: 0 },
  ]);

  interface Beverage {
    id: number;
    name: string;
    quantity: number;
  }

  const handleCardClick = (room: Room) => {
    setSelectedRoom(room.id === selectedRoom?.id ? null : room);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleIncrement = (beverage: Beverage) => {
    setBeverages((prevBeverages) =>
      prevBeverages.map((item) =>
        item.id === beverage.id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (beverage: Beverage) => {
    setBeverages((prevBeverages) =>
      prevBeverages.map((item) =>
        item.id === beverage.id ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
      )
    );
  };

  const getIsValid = () => {
    setIsValid(name !== '' && selectedRoom !== null && beverages.some((beverage) => beverage.quantity > 0));
  };

  const order = () => {
    const order = {
      name,
      room: selectedRoom,
      beverages: beverages.filter((beverage) => beverage.quantity > 0),
    };

    getIsValid()
  };

  return (
    <main>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            DEV BEV
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Box sx={{ textAlign: 'center', display: 'flex', flexFlow: 'column', gap: `2rem` }}>
          <Typography variant="h4" gutterBottom>
            ORDER
          </Typography>

          <Box>
            <Typography variant="h4" gutterBottom>
              Name
            </Typography>
            <TextField label="Your Name" variant="outlined" value={name} onChange={handleNameChange} />
          </Box>

          <Box>
            <Typography variant="h4" gutterBottom>
              Room
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              {rooms.map((room: Room) => (
                <Card
                  sx={{ m: 2, cursor: 'pointer', border: selectedRoom?.id === room.id ? '2px solid #1976d2' : 'none' }}
                  onClick={() => handleCardClick(room)}
                  key={room.name}
                >
                  <CardContent>
                    <Typography variant="h4" component="div">
                      {room.name}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>

          <Box>
            <Typography variant="h4" gutterBottom>
              Bev
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              {beverages.map((beverage: Beverage) => (
                <Badge color="primary" badgeContent={beverage.quantity} showZero key={beverage.id}>
                  <Card sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box onClick={() => handleDecrement(beverage)} sx={{ display: 'flex', alignItems: 'center', height: '100%', '&:hover': { backgroundColor: 'whitesmoke', cursor: 'pointer' } }}>
                      <RemoveIcon />
                    </Box>
                    <CardContent>
                      <Typography variant="h4" component="div">
                        {beverage.name}
                      </Typography>
                    </CardContent>
                    <Box onClick={() => handleIncrement(beverage)} sx={{ display: 'flex', alignItems: 'center', height: '100%', '&:hover': { backgroundColor: 'whitesmoke', cursor: 'pointer' } }}>
                      <AddIcon />
                    </Box>
                  </Card>
                </Badge>
              ))}
            </Box>
          </Box>

          <Box>
            <Button variant="contained" onClick={order}>
              ORDER
            </Button>
          </Box>

          <Box>
            {
              (isValid !== null && !isValid) && (
                <Alert severity="error">
                  Error <strong>Fill in all the inputs </strong>
                </Alert>)
            }

          </Box>


        </Box>

      </Container>
    </main >
  );
}

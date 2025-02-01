import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  TextField,
  CircularProgress,
  Card,
  CardContent,
  Typography,
  Grid,
  CardMedia,
  Container,
  Box,
} from "@mui/material";

const Marvel = () => {
  const [query, setQuery] = useState("Iron Man");
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(false);

  const getMarvelCharacter = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://gateway.marvel.com/v1/public/characters?apikey=${process.env.REACT_APP_MARVEL_KEY}&nameStartsWith=${query}`
      );
      setCharacter(response.data.data.results);
    } catch (error) {
      console.error("API isteği başarısız:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    getMarvelCharacter();
  }, [query]);
 console.log(character)
  return (
    <Container
    className="marvelContainer"
      sx={{
        background: "linear-gradient(90deg, #1E3A8A, #9333EA)",
        height: "80vh",
        padding: "5px",
        overflow:"auto",
     
      }}
    >
      <Grid
        container
        spacing={4}
        
        sx={{
          flexWrap: "wrap",
        }}
      >
        <Grid item xs={12} md={12}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "20px",
              background: "rgba(255, 255, 255, 0.8)",
              borderRadius: "15px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <Typography
              variant="h4"
              color="primary"
              sx={{ marginBottom: "20px", fontWeight: "bold" }}
            >
              Marvel Karakter Arama
            </Typography>
            <TextField
              label="Karakter adı girin..."
              variant="outlined"
              value={query}
              onChange={handleInputChange}
              fullWidth
              sx={{ marginBottom: "20px" }}
            />
          </Box>
        </Grid>

        <Grid  item xs={12} md={12}>
          <Box className="marvelBox">
          {loading ? (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress size="150px" sx={{ color: "#9333EA" }} />
    </Box>
  ) : character && character.length > 0 ? (
    character.map((char) => (
      <Card
        key={char.id}
        sx={{
          borderRadius: "15px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          width: "30%",
          maxWidth: "200px",
          background: "white",
          margin: "0 auto",
          height: "15vh",
        }}
      >
        <CardMedia
          component="img"
          height="100"
          image={`${char.thumbnail.path}.${char.thumbnail.extension}`}
          alt={char.name}
          sx={{
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
            objectFit: "cover",
          }}
        />
        <CardContent>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            {char.name}
          </Typography>
        </CardContent>
      </Card>
    ))
  ) : (
    <Typography sx={{ textAlign: "center", color: "white" }}>
      Karakter bulunamadı
    </Typography>
  )}
          </Box>
 
</Grid>

      </Grid>
    </Container>
  );
};

export default Marvel;

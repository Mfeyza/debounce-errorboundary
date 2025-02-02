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
  const [query, setQuery] = useState("gogol");
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  

  const getBook = async () => {
    const apiKey = process.env.REACT_APP_BOOK_KEY;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}&maxResults=40`
      );
      setBook(response.data.items);
      console.log(book)
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
    getBook();
  }, [query]);
 console.log(book)
  return (
    <Container
    className="marvelContainer"
      sx={{
        background: "linear-gradient(90deg, #1E3A8A, #9333EA)",
        height: "80vh",
        padding: "40px 20px",
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
              Kitap Arama
            </Typography>
            <TextField
              label="Kitap ismi girin..."
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
  ) : book && book.length > 0 ? (
    book.map((char) => (
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
          image={char.volumeInfo?.imageLinks?.thumbnail ||char.volumeInfo?.imageLinks?.smallThumbnail }
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
            {char.volumeInfo.title}
          </Typography>
        </CardContent>
      </Card>
    ))
  ) : (
    <Typography sx={{ textAlign: "center", color: "white" }}>
      Kitap  bulunamadı
    </Typography>
  )}
          </Box>
 
</Grid> 

      </Grid>
    </Container>
  );
};

export default Marvel;

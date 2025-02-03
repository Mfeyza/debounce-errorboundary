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

const Book = () => {
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

  return (
    <Container
      className="marvelContainer"
      sx={{
        height: "80vh",
        padding: "40px 20px",
        overflow: "auto",
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
            className="search"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <Typography
              variant="h4"
    className="inputSearch"
              sx={{ marginBottom: "20px"}}
            >
              Kitap Arama
            </Typography>
            <TextField
              label="Kitap adı girin..."
              variant="outlined"
              value={query}
              onChange={handleInputChange}
              fullWidth
              sx={{ marginBottom: "20px" }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={12}>
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
                    image={
                      char.volumeInfo?.imageLinks?.thumbnail ||
                      char.volumeInfo?.imageLinks?.smallThumbnail
                    }
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
                Karakter bulunamadı
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Book;

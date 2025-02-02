import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  TextField,
  CircularProgress,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Container,
  CardMedia,
} from "@mui/material";

const News = () => {
  const [query, setQuery] = useState("izmir");
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNewsData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${query}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
      );
      setNews(response.data.articles.slice(0,10));
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
    fetchNewsData();
  }, [query]);

  return (
    <Container
    className="news"
      sx={{
        background: "linear-gradient(90deg, #1E3A8A, #9333EA)",
        height: "80vh",
        padding: "40px",
         overflow:"auto"
          
      }}
    >
      <Grid
        container
        spacing={4}
        justifyContent="space-between"
        sx={{
          flexWrap: "wrap",
          
          
        
        
        }}
      >
        

        <Grid item xs={12} md={12}>
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
          ) : news.length > 0 ? (
            news.map((article, index) => (
              <Card
                key={index}
                sx={{
                  borderRadius: "15px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  width: "100%",
                  maxWidth: "400px",
                  background: "white",
                  margin: "10px auto",
                  
                }}
              >
                 <CardMedia
        sx={{ height: 140 }}
        image={article.urlToImage}
        title="green iguana"
      />
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold", textAlign: "center" }}
                  >
                    {article.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ textAlign: "center", marginBottom: "10px" }}
                  >
                    {article.description}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ textAlign: "center" }}
                  >
                    Kaynak: {article.source.name}
                  </Typography>
                  <Box sx={{ textAlign: "center", marginTop: "10px" }}>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#9333EA" }}
                    >
                      Haberi oku
                    </a>
                  </Box>
                </CardContent>
              </Card>
            ))
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default News;

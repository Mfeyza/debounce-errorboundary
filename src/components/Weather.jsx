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
} from "@mui/material";

const Weather = () => {
  const [query, setQuery] = useState("izmir");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          query
        )}&lang=tr&units=metric&appid=${
          process.env.REACT_APP_WEATHER_API_KEY
        }&units=metric&lang=tr`
      );
      setWeather(response.data);
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
    fetchWeatherData();
  }, [query]);

  return (
    <Container
      sx={{
      
        height: "80vh",
        padding: "40px",
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
            className="inputText"
              variant="h4"
              sx={{ marginBottom: "20px" }}
            >
              Hava Durumu
            </Typography>
            <TextField
              label="Şehir adı girin..."
              variant="outlined"
              value={query}
              onChange={handleInputChange}
              fullWidth
              sx={{ marginBottom: "20px" }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} sm={8} md={12}>
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
          ) : weather ? (
            <Card
              sx={{
                borderRadius: "15px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                width: "100%",
                maxWidth: "400px",
                background: "white",
                margin: "0 auto",
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                >
                  {weather.name}, {weather.sys.country}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: "20px",
                  }}
                >
                  {weather.main.temp}°C
                </Typography>
                <Typography variant="body1" sx={{ textAlign: "center" }}>
                  {weather.weather[0].description}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: "center" }}
                >
                  Nem: {weather.main.humidity}%, Rüzgar: {weather.wind.speed}{" "}
                  km/h
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Weather;

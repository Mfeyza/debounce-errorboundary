import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
    
        p: 4,
        textAlign: "center",
        boxShadow: "0px -4px 10px rgba(0,0,0,0.2)",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          color: "white",
          textShadow: "2px 2px 10px rgba(255,255,255,0.6)",
        }}
      >
        DevAtölye
      </Typography>
      <Typography variant="body2" sx={{ color: "white", opacity: 0.8 }}>
        1 Martta Başlayacak Olan React Native Kursumuza Hepiniz Davetlisiniz!
      </Typography>
    </Box>
  );
};

export default Footer;

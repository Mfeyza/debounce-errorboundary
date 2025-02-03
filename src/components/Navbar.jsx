import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState("");

  const handleOpen = (content) => {
    setDialogContent(content);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AppBar
      className="nav"
        position="static"
        sx={{
        
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              letterSpacing: "4px",
            }}
          >
            DevAtölye
          </Typography>
          <Box>
            <Button
              sx={{
                color: "#fff",
                mx: 1,
                textTransform: "none",
                transition: "0.3s",
                "&:hover": { color: "#ffeb3b" },
              }}
              onClick={() =>
                handleOpen(
                  "Debounce, belirli bir süre boyunca ardışık çağrıları sınırlandıran bir tekniktir. Özellikle input alanlarında gereksiz API çağrılarını önlemek için kullanılır."
                )
              }
            >
              Debounce
            </Button>
            <Button
              sx={{
                color: "#fff",
                mx: 1,
                textTransform: "none",
                transition: "0.3s",
                "&:hover": { color: "#ffeb3b" },
              }}
              onClick={() =>
                handleOpen(
                  "Error Boundary, React bileşenlerinde oluşan hataları yakalamak ve uygulamanın çökmesini önlemek için kullanılır."
                )
              }
            >
              Error Boundary
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Bilgi</DialogTitle>
        <DialogContent>
          <Typography>{dialogContent}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Kapat
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Navbar;

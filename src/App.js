import { Grid2 } from "@mui/material";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Marvel from "./components/Book";
import News from "./components/News";
import Weather from "./components/Weather";

function App() {
  return (
    <div className="App">
      <Grid2 container spacing={2}>
        <Grid2 size={12}>
          <Navbar />
        </Grid2>
        
        <Grid2 size={4}>
          <Weather />
        </Grid2>
        <Grid2 size={4}>
          <Marvel />
        </Grid2>
        <Grid2 size={4}>
          <News />
        </Grid2>
        <Grid2 size={12}>
          <Footer />
        </Grid2>
      </Grid2>
    </div>
  );
}

export default App;

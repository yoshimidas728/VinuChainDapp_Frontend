import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import MainRoutes from "./utils/routes/MainRoutes";


const theme = createTheme({
  typography: {
    fontFamily: [
      "-apple-system",
      "Josefin Sans",
      '"Segoe UI"',
      "Roboto",
      "Inter",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <MainRoutes />
      </div>
    </ThemeProvider>
  );
}

export default App;

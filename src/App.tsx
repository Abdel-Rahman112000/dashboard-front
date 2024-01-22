import "./App.scss";
import { theme } from "./theme/MUI_Theme";
import { SnackbarProvider } from "notistack";
import { Grow, ThemeProvider } from "@mui/material";
import MainLayout from "./layout/main-layout/MainLayout";
import RoutesComponent from "./Routes";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";

function App() {
  return (
    <QueryParamProvider adapter={ReactRouter6Adapter}>
      <ThemeProvider theme={theme}>
        <MainLayout>
          <SnackbarProvider
            transitionDuration={{ appear: 500, exit: 500, enter: 300 }}
            anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
            TransitionComponent={Grow}
            variant="success"
            autoHideDuration={10000}
          >
            <RoutesComponent />
          </SnackbarProvider>
        </MainLayout>
      </ThemeProvider>
    </QueryParamProvider>
  );
}

export default App;

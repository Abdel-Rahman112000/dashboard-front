import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Navbar from "./components/Navbar";
import DrawerComponent from "./components/Drawer";
import { Children } from "../../types/Children";

const drawerWidth = 240;

export default function MainLayout(props: PropsType) {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar width={drawerWidth} />
      <DrawerComponent width={drawerWidth} />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 2 }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}

type PropsType = {
  children?: Children;
};

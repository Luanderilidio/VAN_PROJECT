import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  useTheme,
  Box,
  Toolbar,
  Drawer,
  CssBaseline,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Container,
  Chip,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TbTruckDelivery } from "react-icons/tb";
import { BsCartPlusFill } from "react-icons/bs";
import { ImSearch } from "react-icons/im";
import Logo from "../../assets/van-de-entrega.png";
import Styles from "./styles";

const drawerWidth = 240;

const Page = function ({ children }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Styles.AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography sx={{color: "#FFFFFF"}} variant="h6" noWrap component="div">
            Entregas Van
          </Typography>
        </Toolbar>
      </Styles.AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Styles.DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </Styles.DrawerHeader>
        <Divider />
        <Stack alignItems="center">
          <Box
            component="img"
            src={Logo}
            alt="logo"
            sx={{ width: 100, height: 100 }}
          />
          <Typography gutterBottom color="primary">
            Van Project
          </Typography>
        </Stack>
        <Divider />
        <List>
          <ListItem
            onClick={() => {
              navigate(`${process.env.PUBLIC_URL}/delivery`);
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <TbTruckDelivery size={25} />
              </ListItemIcon>
              <ListItemText primary="Entregas" />
            </ListItemButton>
          </ListItem>
          <ListItem
            onClick={() => {
              navigate(`${process.env.PUBLIC_URL}/cadastrar`);
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <BsCartPlusFill size={25} />
              </ListItemIcon>
              <ListItemText primary="Cadastrar" />
            </ListItemButton>
          </ListItem>
          <ListItem
            secondaryAction={
              <IconButton edge="end" aria-label="comments">
                <Chip variant="outlined" color="primary" label="build" />
              </IconButton>
            }
          >
            <ListItemButton>
              <ListItemIcon>
                <ImSearch size={25} />
              </ListItemIcon>
              <ListItemText primary="Consultar" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Styles.Main open={open}>
        <Styles.DrawerHeader />
        <Styles.DrawerHeader />
        <Container maxWidth="laptop">{children}</Container>
        <Styles.DrawerHeader />
      </Styles.Main>
    </Box>
  );
};

export default Page;

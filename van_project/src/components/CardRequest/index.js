import * as React from "react";

import { blue } from "@mui/material/colors";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import ShareIcon from "@mui/icons-material/Share";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Button,
  Chip,
  Menu,
  MenuItem,
  Stack,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { HiCheckCircle } from "react-icons/hi";
import api from "../../services/api";

const CardRequest = function ({
  propId,
  propEmpresa,
  propDate,
  propQuantidade,
  propResponsavel,
  propPerecivel,
  propIdEmpresa,
  propStatus,
}) {
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [status, setStatus] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);

  const handleSnack = () => {
    setOpenSnack(!openSnack);
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const data = {
    uuid_empresa: propIdEmpresa,
    perecivel: propPerecivel,
    quantidade: propQuantidade,
    response: propResponsavel,
    date1: propDate,
    status: true,
  };

  const handleRequest = async () => {
    try {
      const response = await api.put(`/entregas/${propId}`, data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatus = (event) => {
    handleRequest();
    setStatus(true);
    handleSnack();
  };

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
            {propQuantidade.toString()}x
          </Avatar>
        }
        action={
          <IconButton
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            aria-label="settings"
          >
            <MoreVertIcon />
          </IconButton>
        }
        title={propEmpresa}
        subheader={propDate}
      />
      <CardContent>
        <Stack direction="row" spacing={1}>
          <Typography> Cliente:</Typography>
          <Typography> {propResponsavel}</Typography>
        </Stack>
      </CardContent>

      <CardActions disableSpacing>
        <Stack
          width="100%"
          padding={1}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          {propPerecivel ? <Chip color="error" label="Perecivel" /> : <Box />}
          {propStatus ? (
            <Button
              // onClick={() => handleRequest()}
              size="small"
              startIcon={<HiCheckCircle />}
              color="success"
              variant="contained"
            >
              Finalizado
            </Button>
          ) : (
            <Button
              onClick={handleStatus}
              size="small"
              color="success"
              variant="contained"
            >
              Finalizar
            </Button>
          )}
        </Stack>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {/* <CardContent>
          <TextField
            fullWidth
            disabled
            variant="standard"
            defaultValue={responsavel}
            value={responsavel}
            label="Cliente"
          />
        </CardContent> */}
      </Collapse>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Editar</MenuItem>
        <MenuItem onClick={handleClose}>Excluir</MenuItem>
      </Menu>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnack}
        autoHideDuration={3000}
        onClose={handleSnack}
      >
        <Alert onClose={handleSnack} severity="success" sx={{ width: "100%" }}>
          Entrega Finalizada!
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default CardRequest;

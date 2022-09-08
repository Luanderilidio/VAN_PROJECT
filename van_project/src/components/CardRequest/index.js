import { useState } from "react";
import { blue, red } from "@mui/material/colors";
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
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  Snackbar,
  Alert,
  Modal,
} from "@mui/material";
import { HiCheckCircle } from "react-icons/hi";
import moment from "moment";
import api from "../../services/api";
import ModalStyled from "./styles";
import FormDelivery from "../FormDelivery";
import "animate.css";

const CardRequest = function ({
  propId,
  propEmpresa,
  propDate,
  propFormatDate,
  propQuantidade,
  propResponsavel,
  propPerecivel,
  propDescricao,
  propIdEmpresa,
  propStatus,
  propCidade,
  propBairro,
  propRua,
  propNumero,
  newRequest,
}) {
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [status, setStatus] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleModal = () => setOpenModal(!openModal);
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
    description: propDescricao,
    date1: propDate,
    status: true,
    cidade: propCidade,
    bairro: propBairro,
    rua: propRua,
    numero: propNumero,
  };

  const stateEvent = () => {
    newRequest();
  };

  const handleRequest = async () => {
    try {
      const response = await api.put(`/entregas/${propId}`, data);
      console.log(response.data);
      stateEvent();
    } catch (error) {
      console.log(error);
    }
  };
  const DateNow = (dataRequest) => {
    const now = moment(new Date());
    const past = moment(dataRequest);
    const duration = moment.duration(past.diff(now));
    const days = Math.round(duration.asDays());
    return days;
  };

  const handleStatus = (event) => {
    handleRequest();
    setStatus(true);
    handleSnack();
  };

  return (
    <Card
      className="animate__animated animate__fadeIn"
      sx={{ borderRadius: 3 }}
    >
      <CardHeader
        avatar={
          propQuantidade >= 3 ? (
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {propQuantidade.toString()}x
            </Avatar>
          ) : (
            <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
              {propQuantidade.toString()}x
            </Avatar>
          )
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
        subheader={
          DateNow(propDate) <= 1 ? (
            <Typography sx={{ color: red[500] }}>{propFormatDate}</Typography>
          ) : (
            <Typography>{propFormatDate}</Typography>
          )
        }
      />
      <CardContent>
        <Stack direction="row" spacing={1}>
          <Typography> Cliente:</Typography>
          <Typography> {propResponsavel}</Typography>
        </Stack>

        <Typography color="text.secondary">
          Descrição: {propDescricao}
        </Typography>
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
          {status || propStatus ? (
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
            <Stack spacing={2} direction="row">
              <Button
                onClick={handleExpandClick}
                size="small"
                color="info"
                variant="contained"
              >
                Detalhes
              </Button>
              <Button
                onClick={handleStatus}
                size="small"
                color="success"
                variant="contained"
              >
                Finalizar
              </Button>
            </Stack>
          )}
        </Stack>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>
            Endereço: Cidade {propCidade}, Bairro {propBairro}, Rua {propRua},
            Numero {propNumero}
          </Typography>
        </CardContent>
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
        <MenuItem onClick={handleModal}>Editar</MenuItem>
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
      <Modal
        open={openModal}
        onClose={handleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ModalStyled}>
          <Typography sx={{ marginBottom: 3 }} variant="h6" component="h2">
            Editar Entrega de codigo {propId}
          </Typography>
          <FormDelivery id={propId} testNewRequest={stateEvent} />
        </Box>
      </Modal>
    </Card>
  );
};

export default CardRequest;

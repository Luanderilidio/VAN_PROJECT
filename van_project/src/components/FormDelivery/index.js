import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography,
  IconButton,
  Box,
  Modal,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { MdAdd } from "react-icons/md";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ptBR } from "date-fns/locale";
import styleModal from "./styles";
import api from "../../services/api";
import "animate.css";

const FormDelivery = function ({ id, closeModal }) {
  const [valueDate, setValueDate] = useState(new Date());
  const [responsavel, setResponsavel] = useState("");
  const [descricao, setDescricao] = useState("");
  const [qtd, setQtd] = useState(0);
  const [valueRadio, setValueRadio] = useState("");
  const [nameEmpresa, setNameEmpresa] = useState("");
  const [allEmpresa, setAllEmpresa] = useState([]);
  const [empresa, setEmpresa] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");

  const navigate = useNavigate();

  const handleModal = () => setOpenModal(!openModal);

  const handleSnack = () => {
    setOpenSnack(!openSnack);
  };

  const handleModalCard = () => {
    closeModal();
  };

  const handleAllEmpresa = async () => {
    try {
      const response = await api.get("/empresa");
      setAllEmpresa(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setEmpresa(event.target.value);
    handleAllEmpresa();
  };

  const dataEmpresa = {
    name: nameEmpresa,
  };

  const handleEmpresa = async () => {
    try {
      const response = await api.post("/empresa", dataEmpresa);
      console.log(response.data);
      handleSnack();
      handleAllEmpresa();
    } catch (error) {
      console.log(error);
    } finally {
      console.log("requisicao concluida!");
    }
  };

  const handleRequestId = async () => {
    try {
      const response = await api.get(`/entregas/${id}`);
      setResponsavel(response.data.response);
      setDescricao(response.data.description);
      setQtd(response.data.quantidade);
      setEmpresa(response.data.uuid_empresa);
      setValueDate(response.data.date1);
      setValueRadio(response.data.perecivel ? 1 : 2);
      setCity(response.data.cidade);
      setDistrict(response.data.bairro);
      setStreet(response.data.rua);
      setNumber(response.data.numero);
    } catch (error) {
      console.error(error);
    }
  };

  const data = {
    uuid_empresa: empresa,
    perecivel: valueRadio === "1",
    quantidade: qtd,
    response: responsavel,
    description: descricao,
    date1: valueDate,
    status: false,
    cidade: city,
    bairro: district,
    rua: street,
    numero: number,
  };

  const handlePedido = async () => {
    try {
      const response = await api.post("/entregas/", data);
      handleSnack();
    } catch (error) {
      console.error(error);
    }
  };

  const handlePutPedido = async () => {
    try {
      const response = await api.put(`/entregas/${id}`, data);
      handleSnack();
      handleModalCard();
    } catch (error) {
      console.error(error);
    }
  };

  console.log(id);
  useEffect(() => {
    handleAllEmpresa();
    if (id) {
      handleRequestId();
    }
  }, []);

  const responsive = id ? 12 : 11;

  return (
    <Grid container spacing={2}>
      <Grid item mobile={responsive} notebook={responsive} desktop={responsive}>
        <FormControl fullWidth>
          <InputLabel>Supermercado</InputLabel>
          <Select value={empresa} label="Supermercado" onChange={handleChange}>
            {allEmpresa.map((x) => (
              <MenuItem key={x.id} value={x.id}>
                {x.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      {id ? (
        ""
      ) : (
        <Grid
          item
          mobile={1}
          notebook={1}
          desktop={1}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton onClick={handleModal}>
            <MdAdd />
          </IconButton>
        </Grid>
      )}
      <Grid item mobile={12}>
        <TextField
          fullWidth
          value={responsavel}
          label="Cliente"
          onChange={(event) => setResponsavel(event.target.value)}
        />
      </Grid>
      <Grid item mobile={12}>
        <TextField
          multiline
          fullWidth
          value={descricao}
          label="Descrição"
          onChange={(event) => setDescricao(event.target.value)}
        />
      </Grid>
      <Grid item mobile={12} tablet={6} laptop={6} notebook={6} desktop={6}>
        <TextField
          fullWidth
          type="number"
          value={qtd}
          label="Quantidade"
          onChange={(event) => setQtd(parseInt(event.target.value, 10))}
        />
      </Grid>
      <Grid item mobile={12} tablet={6} laptop={6} notebook={6} desktop={6}>
        <LocalizationProvider adapterLocale={ptBR} dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Data Limite"
            value={valueDate}
            onChange={(newValue) => {
              setValueDate(newValue);
              // setDate(newValue.toLocaleDateString("pt-BR"));
            }}
            renderInput={(params) => <TextField fullWidth {...params} />}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item mobile={12}>
        <FormControl fullWidth>
          <FormLabel id="demo-row-radio-buttons-group-label">
            Produtos Perecíveis?
          </FormLabel>
          <RadioGroup
            row
            checked={valueRadio}
            value={valueRadio}
            onChange={(event) => {
              setValueRadio(event.target.value);
              console.log(valueRadio);
            }}
          >
            <FormControlLabel value={1} control={<Radio />} label="Sim" />
            <FormControlLabel value={2} control={<Radio />} label="Não" />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item mobile={12}>
        <Typography gutterBottom variant="h5">
          Endereço
        </Typography>
      </Grid>
      <Grid item mobile={12} tablet={6} laptop={6} notebook={6} desktop={6}>
        <TextField
          value={city}
          onChange={(event) => setCity(event.target.value)}
          fullWidth
          label="Cidade"
          variant="outlined"
        />
      </Grid>
      <Grid item mobile={12} tablet={6} laptop={6} notebook={6} desktop={6}>
        <TextField
          fullWidth
          value={district}
          onChange={(event) => setDistrict(event.target.value)}
          label="Bairro"
          variant="outlined"
        />
      </Grid>
      <Grid item mobile={12} tablet={6} laptop={6} notebook={6} desktop={6}>
        <TextField
          fullWidth
          value={street}
          onChange={(event) => setStreet(event.target.value)}
          label="Rua"
          variant="outlined"
        />
      </Grid>
      <Grid item mobile={12} tablet={6} laptop={6} notebook={6} desktop={6}>
        <TextField
          value={number}
          onChange={(event) => setNumber(event.target.value)}
          fullWidth
          label="N°"
          variant="outlined"
        />
      </Grid>

      <Grid item mobile={12} tablet={12} laptop={12} notebook={12} desktop={12}>
        <Stack
          justifyContent="space-between"
          direction="row"
          sx={{ width: "100%" }}
        >
          {id ? (
            <Stack
              sx={{ width: "100%" }}
              direction="row"
              justifyContent="space-between"
            >
              <Button
                onClick={() => handleModalCard()}
                color="info"
                variant="contained"
              >
                Fechar
              </Button>
              <Button
                color="success"
                variant="contained"
                onClick={() => {
                  handlePutPedido();
                }}
              >
                Editar
              </Button>
            </Stack>
          ) : (
            // <>
            //   <Box />
            //   <Button
            // onClick={() => {
            //   handlePutPedido();
            // }}
            //     color="success"
            //     variant="contained"
            //   >
            //     Editar
            //   </Button>
            // </>
            <>
              <Button
                onClick={() => {
                  navigate("/delivery");
                }}
                color="info"
                variant="contained"
              >
                Visualizar
              </Button>
              <Button
                onClick={() => {
                  handlePedido();
                }}
                color="success"
                variant="contained"
              >
                Cadastrar
              </Button>
            </>
          )}
        </Stack>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openSnack}
        autoHideDuration={3000}
        onClose={handleSnack}
      >
        <Alert
          onClose={handleSnack}
          severity="success"
          sx={{ zIndex: 5, width: "60%" }}
        >
          Cadastrado com Sucesso!
        </Alert>
      </Snackbar>
      <Modal open={openModal} onClose={handleModal}>
        <Box sx={styleModal}>
          <Typography gutterBottom variant="h6" component="h2">
            Cadastrar novo Supermercado
          </Typography>
          <TextField
            fullWidth
            label="Nome"
            onChange={(event) => setNameEmpresa(event.target.value)}
          />
          <Stack
            witdh="100%"
            mt={2}
            justifyContent="space-between"
            direction="row"
          >
            <Button
              onClick={() => {
                handleModal();
              }}
              color="info"
              variant="contained"
            >
              Fechar
            </Button>
            <Button
              onClick={() => {
                handleEmpresa();
              }}
              color="success"
              variant="contained"
            >
              Casdastrar
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Grid>
  );
};

export default FormDelivery;

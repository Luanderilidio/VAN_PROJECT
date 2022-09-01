import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Autocomplete,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ptBR } from "date-fns/locale";
import api from "../../services/api";

const FormDelivery = function () {
  const [date, setDate] = useState(new Date());
  const [valueDate, setValueDate] = useState(new Date());
  const [empresa, setEmpresa] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [perecivel, setPerecivel] = useState(false);
  const [qtd, setQtd] = useState(0);
  const [valueRadio, setValueRadio] = useState(true);
  const [allNames, setAllNames] = useState([]);
  const [openSnack, setOpenSnack] = useState(false);

  const navigate = useNavigate();
  const handleSnack = () => {
    setOpenSnack(!openSnack);
  };

  const handleEmpresa = async () => {
    try {
      const response = await api.get("http://localhost:8000/empresa");
      setEmpresa(response.data);
      const names = [];
      response.data.forEach((item, index) => {
        names.push({ label: item.name, id: item.id });
      });
      setAllNames(names);
    } catch (error) {
      console.error(error);
    }
  };

  const data = {
    uuid_empresa: empresa,
    perecivel: valueRadio === "1",
    quantidade: qtd,
    response: responsavel,
    date1: valueDate,
    status: false,
  };

  const limpaCampus = () => {
    setDate("");
    setEmpresa("");
    setResponsavel("");
    setQtd("");
  };

  const handlePedido = async () => {
    try {
      const response = await api.post("/entregas/", data);
      handleSnack();
      limpaCampus();
    } catch (error) {
      console.error(error);
    }
    // const inputs = Array.from(document.querySelectorAll("input"));
    // inputs.map((input) => {
    //   input.value = "";
    // });
    // Array.from(document.querySelectorAll("input")).forEach(
    //   (input) => (input.value = "")
    // );
  };

  useEffect(() => {
    handleEmpresa();
    const inputs = Array.from(document.querySelectorAll("input"));
    // inputs.map((input) => (input.value = ""));
    // console.log(inputs);
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item mobile={12}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={allNames}
          isOptionEqualToValue={(option) => {
            setEmpresa(option.id);
            return option.label;
          }}
          renderInput={(params) => (
            <TextField fullWidth {...params} label="Supermercado" />
          )}
        />
      </Grid>
      <Grid item mobile={12}>
        <TextField
          fullWidth
          label="Cliente"
          onBlur={(event) => setResponsavel(event.target.value)}
        />
      </Grid>
      <Grid item mobile={12}>
        <TextField
          fullWidth
          type="number"
          label="Quantidade"
          onBlur={(event) => setQtd(parseInt(event.target.value, 10))}
        />
      </Grid>
      <Grid item mobile={12}>
        <LocalizationProvider adapterLocale={ptBR} dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Data Limite"
            value={valueDate}
            onChange={(newValue) => {
              setValueDate(newValue);
              setDate(newValue.toLocaleDateString("pt-BR"));
            }}
            renderInput={(params) => <TextField fullWidth {...params} />}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item mobile={12}>
        <FormControl fullWidth>
          <FormLabel id="demo-row-radio-buttons-group-label">
            Produtos Pereciveis?
          </FormLabel>
          <RadioGroup
            row
            value={valueRadio}
            onChange={(event) => {
              setValueRadio(event.target.value);
            }}
          >
            <FormControlLabel value={1} control={<Radio />} label="Sim" />
            <FormControlLabel value={2} control={<Radio />} label="Nao" />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item mobile={12}>
        <Stack justifyContent="space-between" direction="row" fullWidth>
          <Button
            onClick={() => navigate("/delivery")}
            color="info"
            variant="contained"
          >
            Visualizar
          </Button>
          <Button
            onClick={() => {
              handlePedido();
              limpaCampus();
            }}
            color="success"
            variant="contained"
          >
            Cadastrar
          </Button>
        </Stack>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnack}
        autoHideDuration={3000}
        onClose={handleSnack}
      >
        <Alert onClose={handleSnack} severity="success" sx={{ width: "100%" }}>
          Pedido Cadastrado com Sucesso!
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default FormDelivery;

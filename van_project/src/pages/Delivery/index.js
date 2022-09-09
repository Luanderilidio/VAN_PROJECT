import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import moment from "moment";
import CardRequest from "../../components/CardRequest";
import Page from "../../components/page";
import api from "../../services/api";
import "animate.css";

const Delivery = function () {
  const [allRequests, setAllRequests] = useState([]);
  const [requests, setRequests] = useState([]);
  const [empresas, setEmpresas] = useState();
  const [expanded, setExpanded] = useState(false);
  const [allExpanded, setAllExpanded] = useState(false);
  const [atualDate, setAltualDate] = useState(new Date());
  const [prioridade, setPrioridade] = useState([]);

  const handleAllExpandClick = () => {
    setAllExpanded(!allExpanded);
  };
  const handleEmpresas = async () => {
    try {
      const response = await api.get("/empresa/");
      setEmpresas(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleRequests = async () => {
    try {
      const response = await api.get(
        "/entregas?&_page=1&_limit=5&status=false"
      );
      const Allresponse = await api.get("/entregas?status=true");
      setRequests(response.data);
      setAllRequests(Allresponse.data);
      const pereciveis = response.data.filter((request) => request.perecivel);
      const quantidade = response.data.filter(
        (request) => request.quantidade >= 3 && !request.perecivel
      );
      const Teste = (data) => {
        const now = moment(new Date());
        const past = moment(data);
        const duration = moment.duration(past.diff(now));
        const days = Math.round(duration.asDays());
        return days;
      };
      const limite = response.data.filter(
        (request) =>
          Teste(request.date1) <= 1 &&
          request.quantidade < 3 &&
          !request.perecivel
      );
      const newArray = pereciveis.concat(quantidade, limite);
      setPrioridade(newArray);
    } catch (error) {
      console.error(error);
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    handleRequests();
    handleEmpresas();
  }, []);

  return (
    <Page>
      <Container maxWidth="desktop">
        <Box
          sx={{ border: "1px solid #E8E8E8", padding: 2, borderRadius: 3 }}
          elevation={2}
          className="animate__animated animate__fadeIn"
        >
          <CardContent>
            <Stack
              width="100%"
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h5">ENTREGAS PENDENTES</Typography>
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
              <Box />

              {expanded ? (
                <Button
                  onClick={handleExpandClick}
                  size="small"
                  color="error"
                  variant="contained"
                >
                  Fechar
                </Button>
              ) : (
                <Button
                  onClick={handleExpandClick}
                  size="small"
                  variant="contained"
                >
                  Abrir
                </Button>
              )}
            </Stack>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Stack direction="column" spacing={2}>
                {prioridade.map((request) => {
                  const formatData = new Date(request.date1);
                  return (
                    <CardRequest
                      key={request.id}
                      propId={request.id}
                      propStatus={request.status}
                      propQuantidade={request.quantidade}
                      propIdEmpresa={request.uuid_empresa}
                      propEmpresa={empresas[request.uuid_empresa].name}
                      propFormatDate={formatData.toLocaleDateString("pt-BR")}
                      propDate={request.date1}
                      propResponsavel={request.response}
                      propDescricao={request.description}
                      propPerecivel={request.perecivel}
                      newRequest={handleRequests}
                      propCidade={request.cidade}
                      propRua={request.rua}
                      propBairro={request.bairro}
                      propNumero={request.numero}
                    />
                  );
                })}
              </Stack>
            </CardContent>
          </Collapse>
        </Box>

        <Box
          sx={{
            border: "1px solid #E8E8E8",
            borderRadius: 3,
            padding: 2,
            marginTop: 3,
          }}
          elevation={2}
          className="animate__animated animate__fadeIn animate__delay-.5s"
        >
          <CardContent>
            <Stack
              width="100%"
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h5">ENTREGAS FINALIZADAS</Typography>
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
              <Box />

              {allExpanded ? (
                <Button
                  onClick={handleAllExpandClick}
                  size="small"
                  color="error"
                  variant="contained"
                >
                  Fechar
                </Button>
              ) : (
                <Button
                  onClick={handleAllExpandClick}
                  size="small"
                  variant="contained"
                >
                  Abrir
                </Button>
              )}
            </Stack>
          </CardActions>
          <Collapse in={allExpanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Stack direction="column" spacing={2}>
                {allRequests.map((request) => {
                  const formatData = new Date(request.date1);
                  return (
                    <CardRequest
                      key={request.id}
                      propId={request.id}
                      propStatus={request.status}
                      propQuantidade={request.quantidade}
                      propIdEmpresa={request.uuid_empresa}
                      propEmpresa={empresas[request.uuid_empresa].name}
                      propFormatDate={formatData.toLocaleDateString("pt-BR")}
                      propDate={request.date1}
                      propResponsavel={request.response}
                      propDescricao={request.description}
                      propPerecivel={request.perecivel}
                      propCidade={request.cidade}
                      propRua={request.rua}
                      propBairro={request.bairro}
                      propNumero={request.numero}
                    />
                  );
                })}
              </Stack>
            </CardContent>
          </Collapse>
        </Box>
      </Container>
    </Page>
  );
};

export default Delivery;

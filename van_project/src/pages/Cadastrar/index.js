import { Card, Container, Typography } from "@mui/material";
import FormDelivery from "../../components/FormDelivery";
import Page from "../../components/page";
import "animate.css";

const Cadastrar = function () {
  return (
    <Page>
      <Container maxWidth="desktop">
        <Card
          className="animate__animated animate__fadeIn"
          elevation={3}
          sx={{ padding: 3, borderRadius: 4 }}
        >
          <Typography gutterBottom variant="h5">
            Cadastrar
          </Typography>
          <FormDelivery />
        </Card>
      </Container>
    </Page>
  );
};

export default Cadastrar;

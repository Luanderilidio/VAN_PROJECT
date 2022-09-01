import { BrowserRouter, Routes, Route } from "react-router-dom";
import Delivery from "../pages/Delivery";
import Cadastrar from "../pages/Cadastrar";

const Rotas = function () {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          Route
          path={`${process.env.PUBLIC_URL}/delivery`}
          element={<Delivery />}
        />
        <Route
          Route
          path={`${process.env.PUBLIC_URL}/cadastrar`}
          element={<Cadastrar />}
        />
        <Route
          Route
          path={`${process.env.PUBLIC_URL}/`}
          element={<Delivery />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Rotas;

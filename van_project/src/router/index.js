import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';

const Rotas = function () {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          Route
          path={`${process.env.PUBLIC_URL}/`}
          element={<Home />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Rotas;

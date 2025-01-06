import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/login/Login";
import { Layout } from "./layout/Layout";
import { Home } from "./pages/home/Home";
import { Inscription } from "./pages/inscription/Inscription";
import { Grades } from "./pages/grades/Grades";
import { Payments } from "./pages/payments/Payments";
import { Studies } from "./pages/studies/Studies";
import { Users } from "./pages/users/Users";

function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />

        <Route element={<Layout />}>
          <Route path='/inicio' element={<Home />} />
          <Route path='/inscripcion' element={<Inscription />} />
          <Route path='/grados' element={<Grades />} />
          <Route path='/pagos' element={<Payments />} />
          <Route path='/metodos-de-pago' element={<Payments />} />
          <Route path='/estudiantes' element={<Studies />} />
          <Route path='/usuarios' element={<Users />} />
        </Route>
      </Routes>

    </BrowserRouter>
  );

}

export default App;

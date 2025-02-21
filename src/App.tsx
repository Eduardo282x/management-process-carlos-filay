import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/login/Login";
import { Layout } from "./layout/Layout";
import { Home } from "./pages/home/Home";
import { Inscription } from "./pages/inscription/Inscription";
import { Grades } from "./pages/grades/Grades";
import { Payments } from "./pages/payments/Payments";
import { Students } from "./pages/students/Students";
import { Users } from "./pages/users/Users";
import { MethodPayment } from "./pages/MethodPayment/MethodPayment";
import './App.css'
import { InscriptionV2 } from "./pages/inscriptionV2/InscriptionV2";
import { Notes } from "./pages/notes/Notes";
import { Monthly } from "./pages/monthly/Monthly";
import { MonthlyPay } from "./pages/monthlyPay/MonthlyPay";
import { StudentPayments } from "./pages/studentPayments/StudentPayments";
import { Subjects } from "./pages/subjects/Subjects";
import { Activities } from "./pages/activities/Activities";
import { Password } from "./pages/password/Password";
import { Profile } from "./pages/profile/Profile";
function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/recuperar' element={<Password />} />

        <Route element={<Layout />}>
          <Route path='/inicio' element={<Home />} />
          <Route path='/inscripcion' element={<Inscription />} />
          <Route path='/registros' element={<InscriptionV2 />} />
          <Route path='/notas' element={<Notes />} />
          <Route path='/grados' element={<Grades />} />
          <Route path='/materias' element={<Subjects />} />
          <Route path='/actividades' element={<Activities />} />
          <Route path='/pagos' element={<Payments />} />
          <Route path='/mensualidad' element={<Monthly />} />
          <Route path='/mensualidad-pagos' element={<MonthlyPay />} />
          <Route path='/mensualidad-pagos-estudiantes' element={<StudentPayments />} />
          <Route path='/metodos-de-pago' element={<MethodPayment />} />
          <Route path='/estudiantes' element={<Students />} />
          <Route path='/usuarios' element={<Users />} />
          <Route path='/perfil' element={<Profile />} />
        </Route>
      </Routes>

    </BrowserRouter>
  );

}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/login/Login";
import AuthLayout from "./layout/AuthLayout";

function App() {

  return (
    
    <BrowserRouter>

          <Routes>
            {/* Login */}
            <Route element={<AuthLayout />}>
              <Route path='/auth/login' element={<Login />} />
            </Route>
          </Routes>

      </BrowserRouter>

  );

}

export default App;

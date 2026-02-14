import { Navbar } from "./components/Navbar";
import { Home } from "./pages/home/Home";
import { Footer } from "./components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Cadastro } from "./pages/cadastro/Cadastro";
import { Login } from "./pages/login/Login";
import { AuthProvider } from "./contexts/AuthContext";

export function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <div className="min-h-[80vh]">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/cadastro" element={<Cadastro />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

import { useContext, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../util/ToastAlerta";
import logo from "../../assets/logo.svg";

export function Navbar() {
  const navigate = useNavigate();

  const { usuario, handleLogout } = useContext(AuthContext);

  function logout() {
    handleLogout();
    ToastAlerta("O Usuário foi desconectado com sucesso!", "info");
    navigate("/");
  }

  let component: ReactNode;

  if (usuario.token !== "") {
    component = (
      <div className="flex w-full justify-center bg-lime-800 py-4 text-white">
        <div className="container mx-8 flex justify-between text-lg">
          {/* GRUPO 1: LADO ESQUERDO (Logo + Links de Navegação) */}
          <div className="flex items-center gap-6">
            {usuario.token !== "" ? (
              <Link to="/home" className="flex items-center gap-2">
                <img
                  src={logo}
                  alt="Logo Matheus Carvalho"
                  className="h-10 w-10 object-cover"
                />
                <span className="hidden text-xl font-bold text-white sm:block">
                  Blog Pessoal
                </span>
              </Link>
            ) : (
              "Retorne para logar."
            )}

            {/* Links movidos para a esquerda para facilitar a navegação */}
            <div className="flex gap-4">
              <Link to="/postagens" className="hover:underline">
                Postagens
              </Link>
              <Link to="/temas" className="hover:underline">
                Temas
              </Link>
              <Link to="/cadastrartema" className="hover:underline">
                Cadastrar tema
              </Link>
            </div>
          </div>

          {/* GRUPO 2: LADO DIREITO (Dados do Usuário + Sair) */}
          <div className="flex items-center gap-4">
            {/* Reordenei: Saudação -> Foto -> Sair */}
            <span>{`Olá, ${usuario.nome}`}</span>

            <Link to="/perfil" className="hover:underline">
              <img
                src={
                  usuario?.foto ||
                  "https://ik.imagekit.io/2zvbvzaqt/usuario.png"
                }
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://ik.imagekit.io/2zvbvzaqt/usuario.png")
                }
                className="h-7 rounded-full"
                alt={`foto do ${usuario?.nome}`}
              />
            </Link>

            <Link
              to=""
              onClick={logout}
              className="text-red-500 hover:underline"
            >
              Sair
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{component}</>;
}

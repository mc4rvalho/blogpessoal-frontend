/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import type { Tema } from "../../../models/Tema";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar, deletar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";

export function DeletarTema() {
  const navigate = useNavigate();

  const [tema, setTema] = useState<Tema>({} as Tema);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await buscar(`/temas/${id}`, setTema, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado");
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  async function deletarTema() {
    setIsLoading(true);

    try {
      await deletar(`/temas/${id}`, {
        headers: { Authorization: token },
      });
      alert("Tema apagado com sucesso");
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        alert("Erro ao deletar o tema.");
      }
    }

    setIsLoading(false);
    retornar();
  }

  function retornar() {
    navigate("/temas");
  }

  return (
    <div className="container mx-auto w-1/3">
      <h1 className="my-4 text-center text-4xl">Deletar tema</h1>
      <p className="mb-4 text-center font-semibold">
        Você tem certeza de que deseja apagar o tema a seguir?
      </p>
      <div className="flex flex-col justify-between overflow-hidden rounded-2xl border">
        <header className="bg-indigo-600 px-6 py-2 text-2xl font-bold text-white">
          Tema
        </header>
        <p className="h-full bg-slate-200 p-8 text-3xl">{tema.descricao}</p>
        <div className="flex">
          <button
            className="w-full bg-red-400 py-2 text-slate-100 hover:bg-red-600"
            onClick={retornar}
          >
            Não
          </button>
          <button
            className="flex w-full items-center justify-center bg-indigo-400 text-slate-100 hover:bg-indigo-600"
            onClick={deletarTema}
          >
            {isLoading ? (
              <ClipLoader color="#ffffff" size={24} />
            ) : (
              <span>Sim</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

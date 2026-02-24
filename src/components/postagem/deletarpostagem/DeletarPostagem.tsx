/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Postagem } from "../../../models/Postagem";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar, deletar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";

export function DeletarPostagem() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem);

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPorId(id: string) {
    try {
      await buscar(`/postagens/${id}`, setPostagem, {
        headers: {
          Authorization: token,
        },
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
      buscarPorId(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function deletarPostagem() {
    setIsLoading(true);

    try {
      await deletar(`/postagens/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      alert("Postagem apagada com sucesso");
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        alert("Erro ao deletar a postagem.");
      }
    }

    setIsLoading(false);
    retornar();
  }

  function retornar() {
    navigate("/postagens");
  }

  return (
    <div className="container mx-auto w-1/3">
      <h1 className="my-4 text-center text-4xl">Deletar Postagem</h1>
      <p className="mb-4 text-center font-semibold">
        Você tem certeza de que deseja apagar a postagem a seguir?
      </p>

      <div className="flex flex-col justify-between overflow-hidden rounded-2xl border">
        <header className="bg-indigo-600 px-6 py-2 text-2xl font-bold text-white">
          Postagem
        </header>
        <div className="p-4">
          <p className="h-full text-xl">{postagem.titulo}</p>
          <p>{postagem.texto}</p>
        </div>
        <div className="flex">
          <button
            className="w-full bg-red-400 py-2 text-slate-100 hover:bg-red-600"
            onClick={retornar}
          >
            Não
          </button>
          <button
            className="flex w-full items-center justify-center bg-indigo-400 text-slate-100 hover:bg-indigo-600"
            onClick={deletarPostagem}
          >
            {isLoading ? (
              <ClipLoader color="#3f6212" size={24} />
            ) : (
              <span>Sim</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useContext,
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Tema } from "../../../models/Tema";
import { AuthContext } from "../../../contexts/AuthContext";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";

export function FormTema() {
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
      alert("Você recisa estar logado!");
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setTema({
      ...tema,
      [e.target.name]: e.target.value,
    });
  }

  function retornar() {
    navigate("/temas");
  }

  async function gerarNovoTema(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar(`/temas`, tema, setTema, {
          headers: { Authorization: token },
        });
        alert("O Tema foi atualizado com sucesso!");
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          alert("Erro ao atualizar o tema.");
        }
      }
    } else {
      try {
        await cadastrar(`/temas`, tema, setTema, {
          headers: { Authorization: token },
        });
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          alert("Erro ao cadastrar o tema.");
        }
      }
    }

    setIsLoading(false);
    retornar();
  }

  return (
    <div className="container mx-auto flex flex-col items-center justify-center">
      <h1 className="my-8 text-center text-4xl">
        {id === undefined ? "Cadastrar Tema" : "Editar Tema"}
      </h1>

      <form className="flex w-1/2 flex-col gap-4" onSubmit={gerarNovoTema}>
        <div className="flex flex-col gap-2">
          <label htmlFor="descricao">Descrição do Tema</label>
          <input
            type="text"
            placeholder="Descreva aqui seu tema"
            name="descricao"
            className="rounded border-2 border-slate-700 p-2"
            value={tema.descricao}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>

        <button
          className="mx-auto flex w-1/2 justify-center rounded bg-indigo-400 py-2 text-slate-100 hover:bg-indigo-800"
          type="submit"
        >
          {isLoading ? (
            <ClipLoader color="#ffffff" size={24} />
          ) : (
            <span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>
          )}
        </button>
      </form>
    </div>
  );
}

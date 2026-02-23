/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type { Postagem } from "../../../models/Postagem";
import { buscar } from "../../../services/Service";
import { CardPostagem } from "../cardpostagem/CardPostagem";

export function ListaPostagens() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [postagens, setPostagens] = useState<Postagem[]>([]);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado!");
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    buscarPostagens();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postagens.length]);

  async function buscarPostagens() {
    try {
      setIsLoading(true);

      await buscar("/postagens", setPostagens, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading && (
        <div className="my-8 flex w-full justify-center">
          <SyncLoader color="#312e81" size={32} />
        </div>
      )}

      <div className="my-4 flex w-full justify-center">
        <div className="container flex flex-col">
          {!isLoading && postagens.length === 0 && (
            <span className="my-8 text-center text-3xl">
              Nenhuma Postagem foi encontrada!
            </span>
          )}

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {postagens.map((postagem) => (
              <CardPostagem key={postagem.id} postagem={postagem} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

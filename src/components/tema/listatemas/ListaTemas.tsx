/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import { CardTema } from "../cardtema/CardTema";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type { Tema } from "../../../models/Tema";
import { buscar } from "../../../services/Service";
import { SyncLoader } from "react-spinners";

export function ListaTemas() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [temas, setTemas] = useState<Tema[]>([]);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado!");
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    buscarTemas();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [temas.length]);

  async function buscarTemas() {
    try {
      setIsLoading(true);

      await buscar("/temas", setTemas, {
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
          {!isLoading && temas.length === 0 && (
            <span className="my-8 text-center text-3xl">
              Nenhum Tema foi encontrado!
            </span>
          )}

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {temas.map((tema) => (
              <CardTema key={tema.id} tema={tema} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

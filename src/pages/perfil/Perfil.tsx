import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";

export function Perfil() {
  const navigate = useNavigate();

  const { usuario } = useContext(AuthContext);

  useEffect(() => {
    if (usuario.token === "") {
      alert("Você precisa estar logado");
      navigate("/");
    }
  }, [usuario.token, navigate]);

  return (
    <div className="mx-4 flex justify-center">
      <div className="container mx-auto my-4 overflow-hidden rounded-2xl">
        <img
          className="h-72 w-full border-b-8 border-white object-cover"
          src="https://i.imgur.com/ZZFAmzo.jpg"
          alt="Capa do Perfil"
        />

        <img
          className="relative z-10 mx-auto mt-[-8rem] w-56 rounded-full border-8 border-white"
          src={usuario.foto || "https://ik.imagekit.io/2zvbvzaqt/usuario.png"}
          onError={(e) =>
            (e.currentTarget.src =
              "https://ik.imagekit.io/2zvbvzaqt/usuario.png")
          }
          alt={`Foto de perfil de ${usuario.nome}`}
        />

        <div className="relative mt-[-6rem] flex h-72 flex-col items-center justify-center bg-lime-400 text-2xl text-white">
          <p>Nome: {usuario.nome} </p>
          <p>Email: {usuario.usuario}</p>
        </div>
      </div>
    </div>
  );
}

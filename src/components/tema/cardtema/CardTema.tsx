import { Link } from "react-router-dom";
import type { Tema } from "../../../models/Tema";

interface CardTemaProps {
  tema: Tema;
}

export function CardTema({ tema }: CardTemaProps) {
  return (
    <div className="flex flex-col justify-between overflow-hidden rounded-2xl border">
      <header className="font-old bg-lime-800 px-6 py-2 text-2xl text-white">
        Tema
      </header>
      <p className="h-full bg-slate-200 p-8 text-3xl">{tema.descricao}</p>

      <div className="flex">
        <Link
          to={`/editartema/${tema.id}`}
          className="flex w-full items-center justify-center bg-lime-600 py-2 text-slate-100 hover:bg-lime-800 hover:font-bold"
        >
          <button>Editar</button>
        </Link>

        <Link
          to={`/deletartema/${tema.id}`}
          className="flex w-full items-center justify-center bg-red-400 text-slate-100 hover:bg-red-700 hover:font-bold"
        >
          <button>Deletar</button>
        </Link>
      </div>
    </div>
  );
}

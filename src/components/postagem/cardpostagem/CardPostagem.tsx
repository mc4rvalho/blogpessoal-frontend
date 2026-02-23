import { Link } from "react-router-dom";

export function CardPostagem() {
  return (
    <div className="flex flex-col justify-between overflow-hidden rounded border border-slate-900">
      <div>
        <div className="flex w-full items-center gap-4 bg-indigo-400 px-4 py-2">
          <img
            src="https://i.imgur.com/pK6vSCy.png'
                         className='h-12 rounded-full' alt="
          />
          <h3 className="text-lg font-bold text-center uppercase">Nome do Usuário</h3>
        </div>

        <div className="p-4">
          <h4 className="text-lg font-semibold uppercase">Título</h4>
          <p>texto</p>
          <p>Tema: </p>
          <p>Data: </p>
        </div>
      </div>

      <div className="flex">
        <Link to="" className="w-full text-white bg-indigo-400 hover:bg-indigo-800 flex items-center justify-center py-2">
          <button>Editar</button>
        </Link>
        <Link to="" className="w-full text-white bg-red-400 hover:bg-red-700 flex items-center justify-center">
          <button>Deletar</button>
        </Link>
      </div>
    </div>
  );
}

export function DeletarTema() {
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
        <p className="h-full bg-slate-200 p-8 text-3xl">tema</p>
        <div className="flex">
          <button className="w-full bg-red-400 py-2 text-slate-100 hover:bg-red-600">
            Não
          </button>
          <button className="flex w-full items-center justify-center bg-indigo-400 text-slate-100 hover:bg-indigo-600">
            Sim
          </button>
        </div>
      </div>
    </div>
  );
}

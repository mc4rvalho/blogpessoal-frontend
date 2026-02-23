export function FormPostagem() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <h1 className="my-8 text-center text-4xl">Cadastrar Postagem</h1>

      <form className="flex w-1/2 flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Título da Postagem</label>
          <input
            type="text"
            placeholder="Titulo"
            name="titulo"
            required
            className="rounded border-2 border-slate-700 p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Texto da Postagem</label>
          <input
            type="text"
            placeholder="Texto"
            name="texto"
            required
            className="rounded border-2 border-slate-700 p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p>Tema da Postagem</p>
          <select
            name="tema"
            id="tema"
            className="rounded border border-slate-800 p-2"
          >
            <option value="" selected disabled>
              Selecione um Tema
            </option>

            <>
              <option>tema1</option>
            </>
          </select>
        </div>
        <button
          type="submit"
          className="mx-auto flex w-1/2 justify-center rounded bg-indigo-400 py-2 font-bold text-white hover:bg-indigo-800 disabled:bg-slate-200"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}


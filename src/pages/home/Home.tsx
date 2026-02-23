import { ListaPostagens } from "../../components/postagem/listapostagens/ListaPostagens";

export function Home() {
  return (
    <>
      <div className="flex justify-center bg-indigo-900">
        <div className="container grid grid-cols-2 text-white">
          <div className="flex flex-col items-center justify-center gap-4 py-4">
            <h2 className="text-5xl font-bold">Seja Bem Vindo!</h2>
            <p className="text-xl">Expresse aqui seus pensamentos e opiniões</p>

            <div className="flex justify-around gap-4">
              <div className="rounded border-2 border-solid border-white px-4 py-2 text-white">
                Nova Postagem
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <img
              src="https://i.imgur.com/fyfri1v.png"
              alt="Imagem Página Home"
              className="w-2/3"
            />
          </div>
        </div>
      </div>

      <ListaPostagens />
    </>
  );
}

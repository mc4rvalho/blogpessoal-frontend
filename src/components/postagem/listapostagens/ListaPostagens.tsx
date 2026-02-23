import { CardPostagem } from "../cardpostagem/CardPostagem";

export function ListaPostagens() {
  return (
    <>
      <div className="my-4 flex w-full justify-center">
        <div className="container mx-2 flex flex-col">
          <div className="container mx-auto my-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <CardPostagem />
          </div>
        </div>
      </div>
    </>
  );
}

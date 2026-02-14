import type { Postagem } from "./Postagem";

export interface Usuario {
  id: number;
  nome: string;
  usuario: string;
  foto: string;
  senha: string;
  postagem?: Postagem[] | null;
}

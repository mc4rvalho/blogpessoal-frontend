import type { Usuario } from "./Usuario";

export interface UsuarioLogin extends Usuario {
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;


}

export interface LoginResponse {
  token?: string;
  success: string;
  error?: string;
}


export interface RegisterRequest {
  email: string;
  password: string;
  apellido1:string,
  apellido2:string,
  isAdmin: boolean;
  nombre: string;

}

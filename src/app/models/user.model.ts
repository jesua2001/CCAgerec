export interface LoginRequest {
  email: string;
  contraseña: string;

}

export interface LoginResponse {
  token: string;
  success: string;
  error?: string;
}

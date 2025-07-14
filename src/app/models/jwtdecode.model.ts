export interface JwtPayloadModel {
  iat: number;
  exp: number;
  data: {
    id: number;
    email: string;
    isAdmin: boolean;
    rol: string;
  };
}

export interface AuthType {
  id: number;
  uuid: string;
  username: string;
  email: string;
  fullname: string;
  createdAt: string;
  updatedAt: string;
  accessToken: string;
  accessTokenExpiresAt: string;
  refreshToken: string;
  refreshTokenExpiresAt: string;
  bookyayToken: string;
  bookyayOrganizerToken: string;
}

export interface DecodeTokenType {
  UUID: string;
  admin: boolean;
  exp: number;
  extra: string;
  platform: string;
}

export interface LoginResponseType {
  code: number;
  data: {
    id: number;
    uuid: string;
    username: string;
    email: string;
    fullname: string;
    accessToken: string;
    accessTokenExpiresAt: string;
    refreshToken: string;
    refreshTokenExpiresAt: string;
    lastLoginAt: string | null;
    deletedAt: string | null;
    bookyayToken: string;
    bookyayOrganizerToken: string;
  };
  message: string;
  status: number;
}

export interface LoginPropsType {
  username: string;
  password: string;
}

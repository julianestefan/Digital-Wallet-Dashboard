export interface User {
  id: number;
  username: string;
  createdAt: Date;
}

export interface LoginRespomseDTO {
  access_token: string;
  user: User;
}

export interface LoginBodyDTO {
  username: string;
  password: string;
}

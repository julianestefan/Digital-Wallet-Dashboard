import { LoginBodyDTO, LoginRespomseDTO, User } from "../../constants/dto/user.dto";
import { privateAxiosInstance, publicAxiosInstance } from "./RESTClient";

export const login = async (data: LoginBodyDTO) => {
  const response = await publicAxiosInstance.post<LoginRespomseDTO>(
    "/user/login",
    data
  );
  
  localStorage.setItem("token", response.data.access_token);

  return response;
};

export const profile = async () => {
  return await privateAxiosInstance.get<User>("/user/profile");
};

export const createUser = async (data: LoginBodyDTO) => {
  return await publicAxiosInstance.post<User>("/user", data);
};

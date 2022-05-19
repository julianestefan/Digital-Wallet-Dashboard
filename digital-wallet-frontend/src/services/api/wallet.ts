import { CreateUserWalletDTO, UpdateUserWalletFavoriteDTO, UserWallet } from "../../constants/dto/wallet.dto";
import { privateAxiosInstance } from "./RESTClient";

export const getUserWallets = async () => {
    return await privateAxiosInstance.get<UserWallet[]>('/wallet' );
}

export const postUserWallet = async (data: CreateUserWalletDTO) => {
    return await privateAxiosInstance.post<UserWallet>('/wallet', data );
}

export const patchUserWalletIsfavorite = async (data: UpdateUserWalletFavoriteDTO) => {
    return await privateAxiosInstance.patch('/wallet', data);
}

export const deleteUserWallet = async (id: number) => {
    return await privateAxiosInstance.delete('/wallet/' + id);
}
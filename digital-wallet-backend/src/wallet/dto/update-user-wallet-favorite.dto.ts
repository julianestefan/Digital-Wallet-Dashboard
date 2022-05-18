import { ApiProperty } from "@nestjs/swagger";
import { IsEthereumAddress, IsPositive, isPositive } from "class-validator";

export class UpdateUserWalletFavoriteDTO {
    @ApiProperty()
    @IsPositive()
    id : number;

    @ApiProperty()
    isFavorite : boolean;
}
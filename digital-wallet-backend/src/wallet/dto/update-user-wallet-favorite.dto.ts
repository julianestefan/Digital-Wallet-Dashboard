import { ApiProperty } from "@nestjs/swagger";
import {  IsPositive, IsBoolean } from "class-validator";

export class UpdateUserWalletFavoriteDTO {
    @ApiProperty()
    @IsPositive()
    id : number;

    @ApiProperty()
    @IsBoolean()
    isFavorite : boolean;
}
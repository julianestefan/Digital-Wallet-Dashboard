import { ApiProperty } from "@nestjs/swagger";
import { IsEthereumAddress } from "class-validator";

export class GetWalletParamsDTO {
    @ApiProperty()
    @IsEthereumAddress()
    address : string;
}
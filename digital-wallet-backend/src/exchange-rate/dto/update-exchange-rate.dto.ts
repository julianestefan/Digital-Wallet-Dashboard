import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsPositive } from "class-validator";

export class UpdateExchangeRateDTO {

    @ApiProperty()
    @IsInt()
    @IsPositive()
    id: number;

    @ApiProperty()
    @IsPositive()
    value: number;
}
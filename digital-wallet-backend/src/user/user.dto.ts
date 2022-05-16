import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, Length } from "class-validator";


export class LoginRespomseDTO  {
    accessToken: string;
}

export class LoginBodyDTO  {
    @ApiProperty()
    @IsAlphanumeric()
    @Length(4, 30)
    username: string;
    
    @ApiProperty()
    @IsAlphanumeric()
    @Length(4, 30)
    password: string;
}

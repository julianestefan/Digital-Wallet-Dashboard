import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, Length } from "class-validator";
import { User } from "../entities/user.entity";


export class LoginRespomseDTO  {
    @ApiProperty()
    accessToken: string;

    @ApiProperty()
    user: User
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

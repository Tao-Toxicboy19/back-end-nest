import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class PuppyDto {
    @IsNotEmpty()
    @IsString()
    puppyName: string;

    @IsNotEmpty()
    @IsString()
    breed: string;
}
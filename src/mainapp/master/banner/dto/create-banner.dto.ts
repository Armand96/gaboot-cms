import { IsNotEmpty, IsString } from "class-validator";

export class CreateBannerDto {
    @IsNotEmpty()
    @IsString()
    name: string;
}

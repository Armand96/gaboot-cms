import { IsNotEmpty } from "class-validator"

export class CreateCategoryDto 
{
  @IsNotEmpty()
  readonly name: string
  @IsNotEmpty()
  readonly description: string
  @IsNotEmpty()
  readonly imagePath: string
  @IsNotEmpty()
  readonly thumbnailPath: string
}

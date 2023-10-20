import { Optional } from "@nestjs/common"

export class CreateProductDto 
{
  name: string
  description: string
  stock: number
  dimension: string
  weight: number
  weightUnit: string
  categoryId: number
  @Optional()
  imagePath: string
  @Optional()
  thumbnailPath: string
}

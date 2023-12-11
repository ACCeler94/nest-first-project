import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateOrderDTO {
  @IsNotEmpty()
  @IsString()
  @Length(10, 20)
  client: string;

  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsString()
  address: string;
}

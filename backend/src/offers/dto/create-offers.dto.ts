import { IsBoolean, IsInt, IsOptional } from 'class-validator';

export class CreateOffersDto {
  @IsInt()
  amount: number;

  @IsOptional()
  @IsBoolean()
  hidden: false;

  @IsInt()
  itemId: number;
}

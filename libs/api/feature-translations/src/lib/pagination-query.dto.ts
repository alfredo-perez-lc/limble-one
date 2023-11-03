import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationQueryDto {
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  limit!: number;

  @Type(() => Number)
  @IsOptional()
  @IsInt()
  offset!: number;
}

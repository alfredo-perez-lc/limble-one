import { IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationQueryDto {
  @IsOptional()
  @IsInt()
  limit!: number;

  @IsOptional()
  @IsInt()
  offset!: number;

  @IsString()
  @ApiProperty({ enum: ['ASC', 'DESC'] })
  orderDirection!: 'ASC' | 'DESC';

  @IsString()
  orderBy!: string;
}

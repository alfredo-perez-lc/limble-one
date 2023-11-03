import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateScopeDto {
  @ApiProperty({
    description:
      'The scope name. e.g. "global", "work-orders" or "work-request"',
  })
  @IsString()
  @IsNotEmpty()
  // TODO: Validator that checks that the name doesn't have spaces
  name!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description!: string;
}

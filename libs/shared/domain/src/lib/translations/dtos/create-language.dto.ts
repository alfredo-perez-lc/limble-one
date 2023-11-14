import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLanguageDto {
  @IsString()
  @ApiProperty({ description: 'The language code. e.g. "es", "en" or "fr"  ' })
  code!: string;

  @IsString()
  @ApiProperty({
    description: 'The language name. e.g. Spanish, English, or French',
  })
  name!: string;
}

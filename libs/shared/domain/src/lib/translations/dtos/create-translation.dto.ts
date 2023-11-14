import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTranslationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  text!: string;

  @ApiProperty()
  @IsNotEmpty()
  phraseId!: string;

  @ApiProperty()
  @IsNotEmpty()
  languageId!: string;
}

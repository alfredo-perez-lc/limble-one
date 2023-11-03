import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTranslationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  translationText!: string;

  @ApiProperty()
  @IsNotEmpty()
  phraseId!: number;

  @ApiProperty()
  @IsNotEmpty()
  languageId!: number;
}

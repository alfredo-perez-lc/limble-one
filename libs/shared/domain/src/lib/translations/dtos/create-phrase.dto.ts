import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePhraseDto {
  @IsString()
  @IsNotEmpty()
  key!: string;

  @IsString()
  @IsNotEmpty()
  text!: string;

  @IsString()
  @IsNotEmpty()
  scopeId!: string;
}

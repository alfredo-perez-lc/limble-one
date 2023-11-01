import { Controller } from '@nestjs/common';
import { LanguagesService } from './languages.service';

@Controller('languages')
export class LanguagesController {
  constructor(private languagesService: LanguagesService) {}

  private getAll() {}
}

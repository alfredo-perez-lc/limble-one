import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { SkeletonModule } from 'primeng/skeleton';
import { Language } from '../../../shared/models/language.model';
import { Phrase } from '../../../shared/models/phrases.model';
import { ButtonModule } from 'primeng/button';
import { ChipsModule } from 'primeng/chips';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'l-translated-phrase-form',
  standalone: true,
  imports: [
    CommonModule,
    DividerModule,
    SkeletonModule,
    ButtonModule,
    ChipsModule,
    FormsModule,
  ],
  templateUrl: './translated-phrase-form.component.html',
  styleUrls: ['./translated-phrase-form.component.scss'],
})
export class TranslatedPhraseFormComponent implements OnInit {
  @Input()
  phrase!: Phrase;

  @Input()
  languages!: Language[];

  translations: Array<{
    languageName: string;
    text: string;
    isHovered: boolean;
  }> = [];

  constructor() {}

  ngOnInit() {
    this.translations = this.languages.map((language) => {
      const translation = {
        languageName: language.name,
        text:
          this.phrase.translations.find(
            (translation) => translation.language.id === language.id
          )?.text || '',
        isHovered: false,
      };
      return translation;
    });
  }
}

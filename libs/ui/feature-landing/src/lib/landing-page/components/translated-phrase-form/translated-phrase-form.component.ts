import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { SkeletonModule } from 'primeng/skeleton';
import { Language, Phrase } from '../../../shared';
import { ButtonModule } from 'primeng/button';
import { ChipsModule } from 'primeng/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { EditTranslationParams } from './translate-prhase.model';
import { TranslationsService } from '../../../shared/services/translations.service';

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
    InputTextareaModule,
    ReactiveFormsModule,
  ],
  templateUrl: './translated-phrase-form.component.html',
  styleUrls: ['./translated-phrase-form.component.scss'],
})
export class TranslatedPhraseFormComponent implements OnInit {
  @Input()
  phrase!: Phrase;

  @Input()
  languages!: Language[];

  translations: Array<EditTranslationParams> | undefined;

  editingTranslation: EditTranslationParams | undefined;
  constructor(private translationService: TranslationsService) {}

  ngOnInit() {}

  ngOnChanges() {
    if (!this.phrase?.translations) {
      return;
    }
    this.translations = this.languages.map((language) => {
      const translation = this.phrase.translations.find(
        (translation) => translation.language.id === language.id
      );
      if (!translation) {
        throw new Error('Translation not found');
      }
      const { id, text } = translation;
      return {
        id,
        languageName: language.name,
        text,
        state: 'INITIAL',
      } as EditTranslationParams;
    });
  }

  editTranslation(translation: EditTranslationParams) {
    translation.state = 'EDITING';
    this.editingTranslation = translation;
  }

  saveTranslation(translation: EditTranslationParams) {
    translation.state = 'SAVING';
    const { id, text } = translation;

    this.translationService.update(id, { text }).subscribe((result) => {
      translation.state = 'INITIAL';
    });
  }
}

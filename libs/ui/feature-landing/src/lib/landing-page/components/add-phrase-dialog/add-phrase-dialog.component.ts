import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TranslatedPhraseFormComponent } from '../translated-phrase-form/translated-phrase-form.component';
import { Language, Phrase, PhraseService } from '../../../shared';
import { SkeletonModule } from 'primeng/skeleton';
import { DividerModule } from 'primeng/divider';
import { MessagesModule } from 'primeng/messages';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { TranslationsDialogService } from './translations-dialog.service';

@Component({
  selector: 'l-add-phrase-dialog',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    TranslatedPhraseFormComponent,
    SkeletonModule,
    DividerModule,
    MessagesModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-phrase-dialog.component.html',
  styleUrls: ['./add-phrase-dialog.component.scss'],
})
export class AddPhraseDialogComponent implements OnInit {
  @Input()
  phrase: Phrase | null = null;

  @Input()
  languages: Language[] | null = [];

  @Input()
  state: 'INITIAL' | 'SAVING' | 'SAVED' | 'ERROR' = 'INITIAL';

  public formGroup!: FormGroup;
  public error!: unknown;

  constructor(
    private phraseService: PhraseService,
    public config: DynamicDialogConfig,
    private translationsDialogService: TranslationsDialogService
  ) {}

  ngOnInit() {
    this.languages = this.config.data.languages;

    this.formGroup = new FormGroup({
      key: new FormControl<string | null>(null),
      text: new FormControl<string | null>(null),
    });
  }
  save() {
    this.state = 'SAVING';
    const { key, text } = this.formGroup?.value;
    this.phrase = { key, text, scopeId: 1 } as unknown as Phrase;

    this.phraseService.create(this.phrase).subscribe(
      (phrase) => {
        this.state = 'SAVED';
        this.phrase = phrase;
        this.translationsDialogService.addPhrase(phrase);
      },
      (error) => {
        this.state = 'ERROR';
        this.error = `<strong>${error.message}</strong><br/>`;

        (error.error?.message as Array<string>).forEach((msg) => {
          this.error += `<p>${msg}</p>`;
        });
      }
    );
  }
  cancel() {}

  onOk() {
    this.formGroup = new FormGroup({
      key: new FormControl<string | null>(null),
      text: new FormControl<string | null>(null),
    });
    this.phrase = null;
    this.state = 'INITIAL';
  }
}

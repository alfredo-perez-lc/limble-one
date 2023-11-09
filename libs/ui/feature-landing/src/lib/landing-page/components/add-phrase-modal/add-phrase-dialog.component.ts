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

@Component({
  selector: 'l-add-phrase-modal',
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
  phrase: Phrase | undefined;

  @Input()
  languages!: Language[];

  @Input()
  visible: boolean = false;

  @Input()
  state: 'INITIAL' | 'SAVING' | 'SAVED' | 'ERROR' = 'INITIAL';

  public formGroup: FormGroup | undefined;
  public error!: string | null;

  constructor(private phraseService: PhraseService) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      key: new FormControl<string | null>(null),
      text: new FormControl<string | null>(null),
    });
  }
  save() {
    this.state = 'SAVING';
    this.phraseService.create(this.formGroup?.value).subscribe((phrase) => {
      this.state = 'SAVED';
      this.phrase = phrase;
    });
  }
  cancel() {
    this.visible = false;
  }

  onOk() {
    this.visible = false;
    this.formGroup = new FormGroup({
      key: new FormControl<string | null>(null),
      text: new FormControl<string | null>(null),
    });
    this.phrase = undefined;
    this.state = 'INITIAL';
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TranslatedPhraseFormComponent } from '../translated-phrase-form/translated-phrase-form.component';
import { Language } from '../../../shared/models/language.model';
import { SkeletonModule } from 'primeng/skeleton';
import { DividerModule } from 'primeng/divider';

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
  ],
  templateUrl: './add-phrase-dialog.component.html',
  styleUrls: ['./add-phrase-dialog.component.scss'],
})
export class AddPhraseDialogComponent implements OnInit {
  @Input()
  phrase: any;

  @Input()
  languages: Language[] = [];

  @Input()
  visible: boolean = false;

  @Input()
  state: 'INITIAL' | 'SAVING' | 'SAVED' | 'ERROR' = 'INITIAL';

  public formGroup: FormGroup | undefined;
  public error!: string | null;
  ngOnInit() {
    this.formGroup = new FormGroup({
      key: new FormControl<string | null>(null),
      text: new FormControl<string | null>(null),
    });
  }
  save() {}
  cancel() {
    this.visible = false;
  }
}

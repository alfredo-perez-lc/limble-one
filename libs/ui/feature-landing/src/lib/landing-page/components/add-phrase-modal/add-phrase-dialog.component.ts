import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'l-add-phrase-modal',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
  ],
  templateUrl: './add-phrase-dialog.component.html',
  styleUrls: ['./add-phrase-dialog.component.scss'],
})
export class AddPhraseDialogComponent implements OnInit {
  @Input()
  phrase: any;

  @Input()
  visible: boolean = false;
  @Input()
  isSaving = false;

  public formGroup: FormGroup | undefined;

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

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'l-add-phrase-modal',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule],
  templateUrl: './add-phrase-dialog.component.html',
  styleUrls: ['./add-phrase-dialog.component.scss'],
})
export class AddPhraseDialogComponent {
  @Input()
  phrase: any;

  @Input()
  visible: boolean = true;

  showDialog() {
    this.visible = true;
  }
}

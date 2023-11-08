import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'l-translated-phrase-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './translated-phrase-form.component.html',
  styleUrls: ['./translated-phrase-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TranslatedPhraseFormComponent {}

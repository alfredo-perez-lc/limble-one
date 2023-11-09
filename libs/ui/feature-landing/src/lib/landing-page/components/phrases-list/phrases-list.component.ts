import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { ListboxModule } from 'primeng/listbox';
import { Language, Phrase } from '../../../shared';
import { DividerModule } from 'primeng/divider';
import { TranslatedPhraseFormComponent } from '../translated-phrase-form/translated-phrase-form.component';

@Component({
  selector: 'l-phrases-list',
  standalone: true,
  imports: [
    CommonModule,
    PaginatorModule,
    ListboxModule,
    DividerModule,
    TranslatedPhraseFormComponent,
  ],
  templateUrl: './phrases-list.component.html',
  styleUrls: ['./phrases-list.component.scss'],
})
export class PhrasesListComponent {
  @Input() phrases!: Phrase[];

  @Input() languages: Language[] | null = [];
  selectedPhrase!: Phrase;

  ngOnChanges(): void {
    if (this.phrases.length > 0) {
      this.selectedPhrase = this.phrases[0];
    }
  }
}

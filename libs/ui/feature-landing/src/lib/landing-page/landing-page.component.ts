import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguagesService } from '../shared/services/language.service';
import { HttpClient } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ListboxModule } from 'primeng/listbox';
import { PaginatorModule } from 'primeng/paginator';
import { PageTitleComponent } from '@limble/ui/shared';
import { PhrasesListComponent } from './components/phrases-list/phrases-list.component';
import { RippleModule } from 'primeng/ripple';
import { SplitButtonModule } from 'primeng/splitbutton';
import { AddPhraseDialogComponent } from './components/add-phrase-modal/add-phrase-dialog.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    DropdownModule,
    ListboxModule,
    PaginatorModule,
    PageTitleComponent,
    PhrasesListComponent,
    RippleModule,
    SplitButtonModule,
    AddPhraseDialogComponent,
  ],
  providers: [HttpClient],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  languages$ = this.languagesService.getAll();
  value: any;
  isCreatingPhrase: boolean = false;

  constructor(private languagesService: LanguagesService) {}
}

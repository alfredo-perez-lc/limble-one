import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguagesService, PhraseService } from '../shared';
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
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { lastValueFrom } from 'rxjs';
import { AddPhraseDialogComponent } from './components/add-phrase-dialog/add-phrase-dialog.component';

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
  providers: [HttpClient, DialogService],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  languages$ = this.languagesService.getAll();

  phrases$ = this.phrasesService.getAll();

  isCreatingPhrase: boolean = false;
  ref: DynamicDialogRef | undefined;

  constructor(
    private languagesService: LanguagesService,
    private phrasesService: PhraseService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {}

  async onAddPhraseClick() {
    const languages = await lastValueFrom(this.languagesService.getAll());
    if (!languages || languages.length === 0) return;
    this.ref = this.dialogService.open(AddPhraseDialogComponent, {
      header: 'Create a new phrase',
      draggable: false,
      resizable: false,
      width: '50vw',
      style: {
        maxHeight: '600px',
        maxWidth: '500px',
      },
      data: {
        languages,
      },
    });
  }
}

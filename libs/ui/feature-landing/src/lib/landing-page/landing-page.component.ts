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
import { LandingPageMocks } from './landing-page.mocks';

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
  ],
  providers: [HttpClient],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  languages$ = this.languagesService.getAll();
  value: any;
  scopes = LandingPageMocks.data.scopes;
  sortOptions: any[] | undefined;

  constructor(private languagesService: LanguagesService) {}

  ngOnInit() {
    this.sortOptions = [
      { label: 'A-Z', value: '!alphabetical' },
      { label: 'Z-A', value: 'alphabetical' },
    ];
  }
}

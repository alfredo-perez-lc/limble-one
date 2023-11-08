import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { AppMocks } from './app.mocks';
import { DataViewModule } from 'primeng/dataview';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    ButtonModule,
    DropdownModule,
    FormsModule,
    DataViewModule,
    RatingModule,
    InputTextModule,
    CommonModule,
    ListboxModule,
    PaginatorModule,
  ],
  selector: 't-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'translations-client';
  profileSidebarVisible: any;
  containerClass: any;
  selectedScope: any;
  scopes = AppMocks.data.scopes;
  phrases = AppMocks.data.phrases;
  translations = AppMocks.data.translations;
  products: any[] | undefined;
  sortField: string | undefined;
  sortOrder: number | undefined;
  sortOptions: any[] | undefined;
  first: number | undefined;
  rows: number | undefined;
  sortKey: any;
  value: any;
  selectedPhrase: any;
  filteredPhrases: any[] = [];

  ngOnInit() {
    this.isWelcomeComponent('t-root');

    // this.productService.getProducts().then((data) => (this.products = data.slice(0, 5)));

    this.sortOptions = [
      { label: 'A-Z', value: '!alphabetical' },
      { label: 'Z-A', value: 'alphabetical' },
    ];

    this.filteredPhrases = this.phrases; // Initialize filteredPhrases with all phrases
  }

  public isWelcomeComponent(name: string): boolean {
    return name !== 't-root';
  }

  onSortChange(event: any) {
    const value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }
}

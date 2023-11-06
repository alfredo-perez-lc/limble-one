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
  sortKey: any;
  value: any;
  selectedPhrase: any;

  ngOnInit() {
    this.isWelcomeComponent('t-root');

    // this.productService.getProducts().then((data) => (this.products = data.slice(0, 5)));

    this.sortOptions = [
      { label: 'A-Z', value: '!alphabetical' },
      { label: 'Z-A', value: 'alphabetical' },
    ];
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

  // getSeverity(product: Product) {
  //   switch (product.inventoryStatus) {
  //     case 'INSTOCK':
  //       return 'success';

  //     case 'LOWSTOCK':
  //       return 'warning';

  //     case 'OUTOFSTOCK':
  //       return 'danger';

  //     default:
  //       return null;
  //   }
  // }

  // onMenuToggle() {}

  // showProfileSidebar() {}
}

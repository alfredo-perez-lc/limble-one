import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { PaginatorModule } from 'primeng/paginator';
import { TopNavComponent } from '@limble/ui/shared';

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
    TopNavComponent,
  ],
  selector: 't-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  sortOptions: any[] | undefined;
  first: number | undefined;
  rows: number | undefined;
  value: any;
}

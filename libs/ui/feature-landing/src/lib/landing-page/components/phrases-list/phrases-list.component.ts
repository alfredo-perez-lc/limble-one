import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { ListboxModule } from 'primeng/listbox';

@Component({
  selector: 'l-phrases-list',
  standalone: true,
  imports: [CommonModule, PaginatorModule, ListboxModule],
  templateUrl: './phrases-list.component.html',
  styleUrls: ['./phrases-list.component.scss'],
})
export class PhrasesListComponent {
  @Input() phrases: any[] = [];
  selectedPhrase: any;
}

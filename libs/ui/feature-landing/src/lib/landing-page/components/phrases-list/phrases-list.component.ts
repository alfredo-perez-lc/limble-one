import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'l-phrases-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './phrases-list.component.html',
  styleUrls: ['./phrases-list.component.scss'],
})
export class PhrasesListComponent {
  @Input() phrases: any[] = [];
}

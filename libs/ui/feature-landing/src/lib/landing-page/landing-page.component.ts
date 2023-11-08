import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguagesService } from '../shared/services/language.service';
import { HttpClient } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, InputTextModule, ReactiveFormsModule, FormsModule],
  providers: [HttpClient],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  languages$ = this.languagesService.getAll();
  value: any;

  constructor(private languagesService: LanguagesService) {}
}

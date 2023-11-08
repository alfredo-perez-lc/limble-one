import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguagesService } from '../shared/services/language.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule],
  providers: [HttpClient],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  languages$ = this.languagesService.getAll();

  constructor(private languagesService: LanguagesService) {}
}

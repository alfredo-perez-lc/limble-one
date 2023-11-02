import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';

@Component({
  standalone: true,
  imports: [RouterModule, NgIf, NgClass],
  selector: 't-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'translations-client';
  profileSidebarVisible: any;
  containerClass: any;

  ngOnInit() {
    this.isWelcomeComponent('t-root');
  }

  public isWelcomeComponent(name: string): boolean {
    return name !== 't-root';
  }

  // onMenuToggle() {}

  // showProfileSidebar() {}
}

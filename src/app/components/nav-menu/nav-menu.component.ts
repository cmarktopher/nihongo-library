import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [CardModule, MenuModule, RouterLink, RouterLinkActive],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.css'
})
export class NavMenuComponent implements OnInit {

  items: MenuItem[] = [];

  activeItem: MenuItem | undefined;

  ngOnInit(): void {
    this.items = [
      {
        separator: true
      },
      { label: 'Dashboard', route: "/dashboard" },
      { label: 'Phrase Library', route: "/phrase-library" },
      { label: 'Japanese Characters', route: "/japanese-characters" },
      { label: 'Settings', route: "/settings" }
    ]

    this.activeItem = this.items[1];
  }

  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
  }
}

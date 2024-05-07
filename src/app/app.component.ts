import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { LibraryService } from './services/library.service';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnDestroy {
  
  private loadedLibrarySubscription: Subscription;
  loaded: boolean = false;

  constructor(private libraryService: LibraryService) {  
    this.loadedLibrarySubscription = this.libraryService.libraryLoaded.subscribe(isLoaded => {
      this.loaded = isLoaded;
    })
  }

  ngOnDestroy(): void {
    this.loadedLibrarySubscription.unsubscribe();
  }

}

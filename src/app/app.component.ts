import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LibraryService } from '@services/library.service';
import { NavMenuComponent } from '@components/nav-menu/nav-menu.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnDestroy {
  
  private loadedLibrarySubscription: Subscription = new Subscription();
  loaded: boolean = false;

  constructor(private router: Router, private libraryService: LibraryService) {  
    this.loadedLibrarySubscription = this.libraryService.libraryLoaded.subscribe(isLoaded => {
      this.loaded = isLoaded;
    })
  }

  ngOnDestroy(): void {
    this.loadedLibrarySubscription.unsubscribe();
  }

}

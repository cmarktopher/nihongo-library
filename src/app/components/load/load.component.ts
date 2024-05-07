import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { open, save } from '@tauri-apps/api/dialog';
import { LibraryService } from '../../services/library.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-load',
  standalone: true,
  imports: [],
  templateUrl: './load.component.html',
  styleUrl: './load.component.css'
})
export class LoadComponent {

  private loadedLibrarySubscription: Subscription;

  constructor(private router: Router, private libraryService: LibraryService) {

    this.loadedLibrarySubscription = this.libraryService.libraryLoaded.subscribe(isLoaded => {
      if (isLoaded) {
        this.router.navigate(['/dashboard']);
      }
    })
  }

  ngOnDestroy(): void {
    this.loadedLibrarySubscription.unsubscribe();
  }

  async loadNewLibrary() {
    console.log("hi")
    const filePath = await save({
      filters: [{
        name: 'sqlite3',
        extensions: ['sqlite3']
      }]
    });

    if (filePath) {
      try {
        this.libraryService.createNewDatabase(filePath);
        this.router.navigate(['/dashboard']);
      } catch (error) {
        
      }
    }
  }
}

import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { open, save } from '@tauri-apps/api/dialog';
import { LibraryService } from '@services/library.service';

@Component({
  selector: 'app-entry',
  standalone: true,
  imports: [],
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.css'
})
export class EntryComponent implements OnDestroy{

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

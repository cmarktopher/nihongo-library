import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { open, save } from '@tauri-apps/api/dialog';
import { LibraryService } from '@services/library.service';

@Component({
  selector: 'app-file',
  standalone: true,
  imports: [],
  templateUrl: './file.component.html',
  styleUrl: './file.component.css'
})
export class FileComponent implements OnDestroy {

  private loadedLibrarySubscription: Subscription;

  constructor(private router: Router, private libraryService: LibraryService) {

    this.loadedLibrarySubscription = this.libraryService.libraryLoaded.subscribe(isLoaded => {

    })
  }

  ngOnDestroy(): void {
    this.loadedLibrarySubscription.unsubscribe();
  }

  async createNewLibrary() {

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

  async loadLibrary() {

    const filePath = await open({
      filters: [{
        name: 'sqlite3',
        extensions: ['sqlite3']
      }]
    });

    if (filePath) {

      try {
        this.libraryService.loadDatabase(filePath as string);
        this.router.navigate(['/dashboard']);
      } catch (error) {
        
      }
    }
  }
}

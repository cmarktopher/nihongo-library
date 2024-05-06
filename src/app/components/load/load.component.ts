import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { open, save } from '@tauri-apps/api/dialog';
import { LibraryService } from '../../services/library.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-load',
  standalone: true,
  imports: [CardModule, ButtonModule],
  templateUrl: './load.component.html',
  styleUrl: './load.component.css'
})
export class LoadComponent {


  constructor(private router: Router, private libraryService: LibraryService) {  // Inject LibraryService here
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

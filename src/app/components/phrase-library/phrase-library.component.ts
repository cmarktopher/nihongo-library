import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Phrase } from '@models/Phrase';
import { LibraryService } from '@services/library.service';

@Component({
  selector: 'app-phrase-library',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './phrase-library.component.html',
  styleUrl: './phrase-library.component.css'
})
export class PhraseLibraryComponent {

    phraseItems: Phrase[] = [];
    private phraseItemsSubscription: Subscription = new Subscription();

    constructor(private router: Router, private libraryService: LibraryService) {}

    async ngOnInit(): Promise<void> {

      this.phraseItems = [];

      try {

        this.phraseItemsSubscription.add(this.libraryService.phraseItems.subscribe(items => {
          this.phraseItems = items;
        }));

        await this.libraryService.getPhrases();

      } catch (error) {

        console.log(error);
      }
      
    }

    ngOnDestroy() {
      this.phraseItemsSubscription.unsubscribe();
    }

    goToDetailedPhrase(id: number) {
      this.router.navigate(['/phrase', id]);
    }

    addNewPhrase() {
      this.router.navigate(['/phrase', -1]);
    }
}

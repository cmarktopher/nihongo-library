import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Phrase } from '@models/Phrase';
import { LibraryService } from '@services/library.service';

@Component({
  selector: 'app-memory-cards',
  standalone: true,
  imports: [],
  templateUrl: './memory-cards.component.html',
  styleUrl: './memory-cards.component.css'
})
export class MemoryCardsComponent {
  
  phraseItems: Phrase[] = [];
  private phraseItemsSubscription: Subscription = new Subscription();

  started: boolean = false;
  phraseIndex: number = 0;
  displayState: "Question" | "Answer" = "Question";

  constructor(private libraryService: LibraryService) {}

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

  startMemory(): void {
    this.started = true;
    this.displayState = "Question";
    this.phraseIndex = 0;
  }

  handleShowAnswer(): void {
    this.displayState = "Answer";
  }

  handleNextQuestion(): void {
    this.displayState = "Question";
    this.phraseIndex += 1;
  }
}

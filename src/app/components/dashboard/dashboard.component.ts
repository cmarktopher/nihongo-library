import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Phrase } from '@models/Phrase';
import { LibraryService } from '@services/library.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  phraseItems: Phrase[] = [];
  private phraseItemsSubscription: Subscription = new Subscription();

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

}

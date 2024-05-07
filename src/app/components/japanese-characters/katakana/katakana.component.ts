import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Katakana } from "@models/Katakana";
import { LibraryService } from '@services/library.service';

@Component({
  selector: 'app-katakana',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './katakana.component.html',
  styleUrl: './katakana.component.css'
})
export class KatakanaComponent {

  katakanaItems: Katakana[] = [];
  private katakanaItemsSubscription: Subscription = new Subscription();

  constructor(private libraryService: LibraryService) {}

  async ngOnInit(): Promise<void> {

    try {

      this.katakanaItemsSubscription.add(this.libraryService.katakanaItems.subscribe(items => {
        this.katakanaItems = items;
      }));

      await this.libraryService.getKatakana();

    } catch (error) {

      console.log(error);
    }
    
  }

  ngOnDestroy() {
    this.katakanaItemsSubscription.unsubscribe();
  }
}

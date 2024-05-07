import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Hiragana } from "@models/Hiragana";
import { LibraryService } from '@services/library.service';

@Component({
  selector: 'app-hiragana',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hiragana.component.html',
  styleUrl: './hiragana.component.css'
})
export class HiraganaComponent implements OnInit, OnDestroy  {

  hiraganaItems: Hiragana[] = [];
  private hiraganaItemsSubscription: Subscription = new Subscription();

  constructor(private libraryService: LibraryService) {}

  async ngOnInit(): Promise<void> {

    try {

      this.hiraganaItemsSubscription.add(this.libraryService.hiraganaItems.subscribe(items => {
        this.hiraganaItems = items;
      }));

      await this.libraryService.getHiragana();

    } catch (error) {

      console.log(error);
    }
    
  }

  ngOnDestroy() {
    this.hiraganaItemsSubscription.unsubscribe();
  }
}

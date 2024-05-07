import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Hiragana } from "@models/Hiragana";
import { LibraryService } from '@services/library.service';

@Component({
  selector: 'app-hiragana',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hiragana.component.html',
  styleUrl: './hiragana.component.css'
})
export class HiraganaComponent implements OnInit, OnDestroy  {

  hiraganaItems: Hiragana[] = [];
  private hiraganaItemsSubscription: Subscription = new Subscription();

  searchQuery: string = '';

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

  get filteredHiraganaItems(): Hiragana[] {
    return this.hiraganaItems.filter(item => 
      item.english.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}

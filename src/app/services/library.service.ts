import { Injectable, OnInit } from '@angular/core';
import { invoke } from '@tauri-apps/api/tauri';
import { BehaviorSubject, Observable } from 'rxjs';
import { Hiragana } from "@models/Hiragana";
import { Katakana } from '@models/Katakana';

@Injectable({
  providedIn: 'root'
})
export class LibraryService  {

  private _libraryLoaded = new BehaviorSubject<boolean>(false);
  libraryLoaded = this._libraryLoaded.asObservable();

  databasePath: string = "";

  private _hiraganaItems = new BehaviorSubject<Hiragana[]>([]);
  readonly hiraganaItems: Observable<Hiragana[]> = this._hiraganaItems.asObservable();

  private _katakanaItems = new BehaviorSubject<Katakana[]>([]);
  readonly katakanaItems: Observable<Katakana[]> = this._katakanaItems.asObservable();

  constructor() {
    
    const pathInLocalStorage = localStorage.getItem("databasePath");
    
    if (pathInLocalStorage) {

      this.databasePath = JSON.parse(pathInLocalStorage);
      this._libraryLoaded.next(true);
    }
  }

  clearDatabasePath() {
    localStorage.clear();
    this.databasePath = "";

    this._libraryLoaded.next(false);
  }

  async createNewDatabase(newPath: string) {

    try {

      await invoke('create_new_database',  { newPath: newPath });

      this.databasePath = newPath;
      localStorage.setItem("databasePath", JSON.stringify(newPath));

      this._libraryLoaded.next(true);
    
    } catch (error) {
      console.log(`Failed to create database with error: ${error}`);
    }
  }

  async getHiragana() {

    try {
      
      const fetchResult: Object[] = await invoke('get_hiragana_entries', { path: this.databasePath });

      if (fetchResult) {
        const hiraganaArray = fetchResult.map((item: any) => Hiragana.fromJson(item));
        this._hiraganaItems.next(hiraganaArray); 
      }
      
    } catch (error) {
      throw new Error("Failed to get hiragana!");
    }
  }

  async getKatakana() {

    try {
      
      const fetchResult: Object[] = await invoke('get_katakana_entries',  { path: this.databasePath });

      if (fetchResult) {
        const katakanaArray = fetchResult.map((item: any) => Katakana.fromJson(item));
        this._katakanaItems.next(katakanaArray); 
      }
      
    } catch (error) {
      throw new Error("Failed to get katakana!");
    }
  }
}

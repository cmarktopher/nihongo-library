import { Injectable, OnInit } from '@angular/core';
import { invoke } from '@tauri-apps/api/tauri';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibraryService  {

  private _libraryLoaded = new BehaviorSubject<boolean>(false);
  libraryLoaded = this._libraryLoaded.asObservable();

  databasePath: string = "";

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
}

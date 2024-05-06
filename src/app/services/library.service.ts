import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/tauri';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  private _libraryLoaded = new BehaviorSubject<boolean>(false);
  libraryLoaded = this._libraryLoaded.asObservable();

  constructor() { }

  async createNewDatabase(newPath: string) {

    const fetchResult = await invoke('create_new_database',  { newPath: newPath });

    this._libraryLoaded.next(true);

    if (!fetchResult) {
      throw new Error("Failed to create database.");
    }
  }
}

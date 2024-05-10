import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Phrase } from '@models/Phrase';
import { LibraryService } from '@services/library.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-phrase',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './phrase.component.html',
  styleUrl: './phrase.component.css'
})
export class PhraseComponent {

  phrase: Phrase | null = null;

  newPhrase: Phrase = new Phrase(-1, '', '', '', []);

  editMode: boolean = false;

  @Input()
  set id(id: string) {
    console.log(id)
    let handleGetPhrase = async () => {

      let foundPhrase = await this.libraryService.getPhrase(parseInt(id));

      if (foundPhrase) {
        this.phrase = foundPhrase;
      }
    }

    handleGetPhrase();
  } 

  constructor(private router: Router, private libraryService: LibraryService) {
  }

  addNewBreakdown() {
    (this.newPhrase.breakdown as string[]).push("");
  }

  async addNewPhrase() {
    try {
      let returnedPhrase: Phrase | undefined = await this.libraryService.addPhrase(this.newPhrase);

      if (returnedPhrase) {
        this.phrase = returnedPhrase;
        this.router.navigate(['/phrase', this.phrase.id]);
      }
    } catch (error) {
      
    }
  }

  async editPhrase() {
    
    if (this.phrase) {
      this.editMode = true;
      this.newPhrase.updateProperties(
        this.phrase.id, 
        this.phrase.japanesePhrase, this.phrase.romaji, this.phrase.englishTranslation, 
        (this.phrase.breakdown as string[]) ? this.phrase.breakdown as string[] : [])
    }
  }

  async updatePhrase() {

    try {
      let returnedPhrase: Phrase | undefined = await this.libraryService.updatePhrase(this.newPhrase);
      console.log(this.newPhrase)
      if (returnedPhrase) {
        this.phrase = returnedPhrase;
        this.editMode = false;
      }
    } catch (error) {
      
    }
  }

  async deletePhrase() {
    try {

      if (this.phrase) {

        await this.libraryService.deletePhrase(this.phrase);
        this.router.navigate(['/phrase-library']);
      } 
    } catch (error) {
      
    }
  }

  async useAiToPopulatePhrase() {

    if (this.newPhrase.japanesePhrase !== "") {

      // let prompt: string = `I have this object structure {japanesePhrase: '', romanji: '', englishTranslation: '', breakdown: [] }. Can you take this japanese sentence ${this.newPhrase.japanesePhrase} and
      // put it into the japanesePhrase value. Can you then provide the romanji and place it into the romanji field. Can you then do a full translation and put it into the englishTranslation field. 
      // Finally, provide a break down of the japanese sentence where you explain each part of the sentence with detailed descriptions of the phrases, grammar and general vocab. Then, split this logically and
      // place them as separate items in the break down array. When you return your answer, the only response I want is a json object based on what i provided.`

      // let data = {
      //   "model":"llama3",
      //   "prompt": prompt,
      //   "format":"json",
      //   "stream": false
      // }

      // await this.http.post("http://localhost:11434/api/generate", data).subscribe(res => {
      //   console.log(res);
      // })
    }
  }
}
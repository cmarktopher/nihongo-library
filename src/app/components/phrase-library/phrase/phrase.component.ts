import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
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

  newPhrase: Phrase = {
    id: -1,
    japanesePhrase: '',
    romaji: '',
    englishTranslation: '',
    breakdown: []
  }


  @Input()
  set id(id: string) {

    let handleGetPhrase = async () => {

      let foundPhrase = await this.libraryService.getPhrase(parseInt(id));

      if (foundPhrase) {
        this.phrase = foundPhrase;
      }
    }

    handleGetPhrase();
  } 

  constructor(private http: HttpClient, private libraryService: LibraryService) {
  }

  async useAiToPopulatePhrase() {

    if (this.newPhrase.japanesePhrase !== "") {

      let prompt: string = `I have this object structure {japanesePhrase: '', romanji: '', englishTranslation: '', breakdown: [] }. Can you take this japanese sentence ${this.newPhrase.japanesePhrase} and
      put it into the japanesePhrase value. Can you then provide the romanji and place it into the romanji field. Can you then do a full translation and put it into the englishTranslation field. 
      Finally, provide a break down of the japanese sentence where you explain each part of the sentence with detailed descriptions of the phrases, grammar and general vocab. Then, split this logically and
      place them as separate items in the break down array. When you return your answer, the only response I want is a json object based on what i provided.`

      let data = {
        "model":"llama3",
        "prompt": prompt,
        "format":"json",
        "stream": false
      }

      await this.http.post("http://localhost:11434/api/generate", data).subscribe(res => {
        console.log(res);
      })
    }
  }
}
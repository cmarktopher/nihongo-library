export class Hiragana {
  hiragana: string;
  english: string;

  constructor(hiragana: string, english: string) {
    this.hiragana = hiragana;
    this.english = english;
  }

  static fromJson(json: any): Hiragana {
    return new Hiragana(json.hiragana, json.english);
  }
}
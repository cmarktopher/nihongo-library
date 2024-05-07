export class Katakana {
  katakana: string;
  english: string;

  constructor(katakana: string, english: string) {
    this.katakana = katakana;
    this.english = english;
  }

  static fromJson(json: any): Katakana {
    return new Katakana(json.katakana, json.english);
  }
}
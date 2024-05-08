export class Phrase {
  id: number;
  japanesePhrase: string;
  romaji: string;
  englishTranslation: string;
  breakdown: string | string[];

  constructor(
    id: number,
    japanesePhrase: string,
    romaji: string,
    englishTranslation: string,
    breakdown: string[]
  ) {
    this.id = id;
    this.japanesePhrase = japanesePhrase;
    this.romaji = romaji;
    this.englishTranslation = englishTranslation;
    this.breakdown = breakdown;
  }

  static fromJson(json: any): Phrase {
    return new Phrase(
      json.id,
      json.japanese_phrase,
      json.romaji,
      json.english_translation,
      json.breakdown
    );
  }
}

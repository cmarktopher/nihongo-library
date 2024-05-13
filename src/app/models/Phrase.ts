export class Phrase {
  id: number;
  japanesePhrase: string;
  romaji: string;
  englishTranslation: string;
  breakdown: string | string[];
  createdAt?: string | Date;

  constructor(
    id: number,
    japanesePhrase: string,
    romaji: string,
    englishTranslation: string,
    breakdown:string[],
    createdAt?: string | Date
  ) {
    this.id = id;
    this.japanesePhrase = japanesePhrase;
    this.romaji = romaji;
    this.englishTranslation = englishTranslation;
    this.breakdown = breakdown;
    this.createdAt = createdAt;
  }

  static fromJson(json: any): Phrase {
    return new Phrase(
      json.id,
      json.japanese_phrase,
      json.romaji,
      json.english_translation,
      JSON.parse(json.breakdown),
      new Date(json.created_at)
    );
  }

  toJson(): any {
    return {
      id: this.id,
      japanese_phrase: this.japanesePhrase,
      romaji: this.romaji,
      english_translation: this.englishTranslation,
      breakdown: JSON.stringify(this.breakdown as string[])
    }
  }

  updateProperties(id: number,
    japanesePhrase: string,
    romaji: string,
    englishTranslation: string,
    breakdown:string[]
  ) {
    this.id = id;
    this.japanesePhrase = japanesePhrase;
    this.romaji = romaji;
    this.englishTranslation = englishTranslation;
    this.breakdown = breakdown;
  }
}

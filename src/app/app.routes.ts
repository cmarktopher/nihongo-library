import { Routes } from "@angular/router";
import { DashboardComponent } from "@components/dashboard/dashboard.component";
import { PhraseLibraryComponent } from "@components/phrase-library/phrase-library.component";
import { JapaneseCharactersComponent } from "@components/japanese-characters/japanese-characters.component";
import { SettingsComponent } from "@components/settings/settings.component";
import { HiraganaComponent } from "@components/japanese-characters/hiragana/hiragana.component";
import { KatakanaComponent } from "@components/japanese-characters/katakana/katakana.component";
import { KanjiComponent } from "@components/japanese-characters/kanji/kanji.component";
import { EntryComponent } from "@components/entry/entry.component";
import { PhraseComponent } from "@components/phrase-library/phrase/phrase.component";
import { FileComponent } from "@components/file/file.component";
import { MemoryCardsComponent } from "@components/memory-cards/memory-cards.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: "/entry",
    pathMatch: "full"
  },
  {
    path: 'entry',
    component: EntryComponent,
    title: "Entry"
  },
  {
    path: 'file',
    component: FileComponent,
    title: "File"
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: "Dashboard"
  },
  {
    path: 'memory-cards',
    component: MemoryCardsComponent,
    title: "Memory"
  },
  {
    path: 'phrase-library',
    component: PhraseLibraryComponent,
    title: "Phrase Library"
  },
  {
    path: 'phrase/:id',
    component: PhraseComponent,
    title: "Phrase"
  },
  {
    path: 'japanese-characters',
    component: JapaneseCharactersComponent,
    title: "Japanese Characters",
    children: [
      { path: '', redirectTo: 'hiragana', pathMatch: 'full' },
      { path: 'hiragana', component: HiraganaComponent, title: 'Hiragana' },
      { path: 'katakana', component: KatakanaComponent, title: 'Katakana' },
      { path: 'kanji', component: KanjiComponent, title: 'Kanji' }
    ]
  },
  // {
  //   path: 'settings',
  //   component: SettingsComponent,
  //   title: "Settings"
  // }
];


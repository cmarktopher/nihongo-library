import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PhraseLibraryComponent } from "./phrase-library/phrase-library.component";
import { JapaneseCharactersComponent } from "./japanese-characters/japanese-characters.component";
import { SettingsComponent } from "./settings/settings.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: "/dashboard",
    pathMatch: "full"
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: "Dashboard"
  },
  {
    path: 'phrase-library',
    component: PhraseLibraryComponent,
    title: "Phrase Library"
  },
  {
    path: 'japanese-characters',
    component: JapaneseCharactersComponent,
    title: "Japanese Characters"
  },
  {
    path: 'settings',
    component: SettingsComponent,
    title: "Settings"
  }
];


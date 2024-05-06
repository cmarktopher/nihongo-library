import { Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { PhraseLibraryComponent } from "./components/phrase-library/phrase-library.component";
import { JapaneseCharactersComponent } from "./components/japanese-characters/japanese-characters.component";
import { SettingsComponent } from "./components/settings/settings.component";

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


import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-japanese-characters',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './japanese-characters.component.html',
  styleUrl: './japanese-characters.component.css'
})
export class JapaneseCharactersComponent {
 
}

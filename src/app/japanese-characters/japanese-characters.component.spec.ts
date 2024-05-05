import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JapaneseCharactersComponent } from './japanese-characters.component';

describe('JapaneseCharactersComponent', () => {
  let component: JapaneseCharactersComponent;
  let fixture: ComponentFixture<JapaneseCharactersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JapaneseCharactersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JapaneseCharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

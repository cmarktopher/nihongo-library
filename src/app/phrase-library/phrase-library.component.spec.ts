import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhraseLibraryComponent } from './phrase-library.component';

describe('PhraseLibraryComponent', () => {
  let component: PhraseLibraryComponent;
  let fixture: ComponentFixture<PhraseLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhraseLibraryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhraseLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

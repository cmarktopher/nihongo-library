import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhraseComponent } from './phrase.component';

describe('PhraseComponent', () => {
  let component: PhraseComponent;
  let fixture: ComponentFixture<PhraseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhraseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhraseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

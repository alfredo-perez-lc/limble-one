import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslatedPhraseFormComponent } from './translated-phrase-form.component';

describe('TranslatedPhraseFormComponent', () => {
  let component: TranslatedPhraseFormComponent;
  let fixture: ComponentFixture<TranslatedPhraseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslatedPhraseFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TranslatedPhraseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

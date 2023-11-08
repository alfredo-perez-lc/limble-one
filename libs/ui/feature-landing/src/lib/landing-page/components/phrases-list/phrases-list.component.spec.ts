import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhrasesListComponent } from './phrases-list.component';

describe('PhrasesListComponent', () => {
  let component: PhrasesListComponent;
  let fixture: ComponentFixture<PhrasesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhrasesListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PhrasesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddScopeModalComponent } from './add-scope-modal.component';

describe('AddScopeModalComponent', () => {
  let component: AddScopeModalComponent;
  let fixture: ComponentFixture<AddScopeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddScopeModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddScopeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

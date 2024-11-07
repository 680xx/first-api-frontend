import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FemaleUsersOnlyComponent } from './female-users-only.component';

describe('FemaleUsersOnlyComponent', () => {
  let component: FemaleUsersOnlyComponent;
  let fixture: ComponentFixture<FemaleUsersOnlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FemaleUsersOnlyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FemaleUsersOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

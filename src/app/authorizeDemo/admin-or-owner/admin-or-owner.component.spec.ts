import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrOwnerComponent } from './admin-or-owner.component';

describe('AdminOrOwnerComponent', () => {
  let component: AdminOrOwnerComponent;
  let fixture: ComponentFixture<AdminOrOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminOrOwnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminOrOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

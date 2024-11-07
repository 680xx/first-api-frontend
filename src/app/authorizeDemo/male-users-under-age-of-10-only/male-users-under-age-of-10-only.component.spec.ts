import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaleUsersUnderAgeOf10OnlyComponent } from './male-users-under-age-of-10-only.component';

describe('MaleUsersUnderAgeOf10OnlyComponent', () => {
  let component: MaleUsersUnderAgeOf10OnlyComponent;
  let fixture: ComponentFixture<MaleUsersUnderAgeOf10OnlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaleUsersUnderAgeOf10OnlyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaleUsersUnderAgeOf10OnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

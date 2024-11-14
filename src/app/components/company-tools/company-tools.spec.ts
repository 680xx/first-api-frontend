import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanyTools } from './company-tools';

describe('MainviewComponent', () => {
  let component: CompanyTools;
  let fixture: ComponentFixture<CompanyTools>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyTools]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyTools);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

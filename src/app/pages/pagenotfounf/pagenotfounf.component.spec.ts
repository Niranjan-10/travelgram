import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagenotfounfComponent } from './pagenotfounf.component';

describe('PagenotfounfComponent', () => {
  let component: PagenotfounfComponent;
  let fixture: ComponentFixture<PagenotfounfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagenotfounfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagenotfounfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrapeFormComponent } from './scrape-form.component';

describe('ScrapeFormComponent', () => {
  let component: ScrapeFormComponent;
  let fixture: ComponentFixture<ScrapeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrapeFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrapeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrapeHistoryComponent } from './scrape-history.component';

describe('ScrapeHistoryComponent', () => {
  let component: ScrapeHistoryComponent;
  let fixture: ComponentFixture<ScrapeHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrapeHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrapeHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

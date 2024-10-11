import { Component, EventEmitter, Output, Input } from '@angular/core';
import { ScrapingService } from '../scraping.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ScrapeResult } from '../scrape-result';

@Component({
  selector: 'app-scrape-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './scrape-form.component.html',
  styleUrl: './scrape-form.component.css',
})
export class ScrapeFormComponent {
  @Output() scrapeCompleted = new EventEmitter<boolean>();
  @Output() resetScrape = new EventEmitter<boolean>();
  googleMapUrl: string = '';
  isScraping: boolean = false;
  scrapeResult: ScrapeResult = {
    success: '',
    scraped_at_date: '',
    scraped_at_time: '',
    location_name: '',
    url: '',
    reviews_count: 0,
    message: '',
  };

  constructor(private scrapingService: ScrapingService) {}

  onSubmit() {
    if (this.googleMapUrl) {
      this.isScraping = true;
      this.resetScrape.emit();

      this.scrapingService.scrapeGoogleMap(this.googleMapUrl).subscribe({
        next: (response) => {
          console.log(response);
          this.scrapeResult = response;
          // this.scrapeCompleted.emit(response);
          this.isScraping = false;
        },

        error: (err) => {
          console.log(err);
          this.isScraping = false;
        },
      });
    }
  }
}

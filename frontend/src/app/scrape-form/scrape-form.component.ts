import { Component, EventEmitter, Output } from '@angular/core';
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
  @Output() scrapeCompleted = new EventEmitter<ScrapeResult>(); // Changed from scrapeResult
  googleMapUrl: string = '';
  isScraping: boolean = false;
  scrapeResultData!: ScrapeResult;

  constructor(private scrapingService: ScrapingService) {}

  onSubmit() {
    if (this.googleMapUrl) {
      this.isScraping = true;

      this.scrapingService.scrapeGoogleMap(this.googleMapUrl).subscribe({
        next: (response: ScrapeResult) => {
          console.log(response);
          this.scrapeCompleted.emit(response); // Emit completed event
          this.scrapeResultData = response;
          this.isScraping = false;
        },

        error: (err) => {
          console.log(err);
          this.scrapeResultData.message = err.message;
          this.scrapeCompleted.emit(this.scrapeResultData); // Emit error result
          this.isScraping = false;
        },
      });
    }
  }
}

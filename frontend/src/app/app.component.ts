import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScrapeFormComponent } from './scrape-form/scrape-form.component';
import { DownloadCsvComponent } from './download-csv/download-csv.component';
import { CommonModule } from '@angular/common';
import { ScrapeResult } from './scrape-result';
import { ScrapeHistoryComponent } from './scrape-history/scrape-history.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ScrapeFormComponent,
    DownloadCsvComponent,
    CommonModule,
    ScrapeHistoryComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'google map scraper';
  scrapeSuccess: boolean = false;
  scrapeResult!: ScrapeResult;
  scrapeResults: ScrapeResult[] = [];

  onScrapeCompleted(result: ScrapeResult) {
    this.scrapeSuccess = result.success;
    this.scrapeResult = result;
    this.scrapeResults.push(result);
  }
}

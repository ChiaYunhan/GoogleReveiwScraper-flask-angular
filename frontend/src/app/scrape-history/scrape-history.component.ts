import { Component, Input } from '@angular/core';
import { ScrapeResult } from '../scrape-result';
import { CommonModule } from '@angular/common';
import { ScrapingService } from '../scraping.service';

@Component({
  selector: 'app-scrape-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scrape-history.component.html',
  styleUrl: './scrape-history.component.css',
})
export class ScrapeHistoryComponent {
  @Input() scrapeResults!: ScrapeResult[];

  constructor(private scrapingService: ScrapingService) {}

  downloadCsvFromS3(fileKey: string) {
    this.scrapingService.downloadCsvFromS3(fileKey).subscribe({
      next: (response) => {
        const presignedUrl = response.presigned_url;
        const a = document.createElement('a');
        a.href = presignedUrl;
        a.download = '';
        a.click();
      },
      error: (err) => {
        console.error('Error fetching presigned URL:', err);
      },
    });
  }
}

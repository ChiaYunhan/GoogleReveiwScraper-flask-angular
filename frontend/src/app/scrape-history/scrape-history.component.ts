import { Component, Input } from '@angular/core';
import { ScrapeResult } from '../scrape-result';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scrape-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scrape-history.component.html',
  styleUrl: './scrape-history.component.css',
})
export class ScrapeHistoryComponent {
  @Input() scrapeResults!: ScrapeResult[];

  constructor(private http: HttpClient) {}

  downloadCsvFromS3(fileKey: string) {
    console.log(fileKey);
    const apiUrl = `http://localhost:5000/generate-presigned-url?file_key=${fileKey}`;

    this.http.get<{ presigned_url: string }>(apiUrl).subscribe({
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

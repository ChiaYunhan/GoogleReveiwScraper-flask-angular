export interface ScrapeResult {
  success: boolean;
  scraped_at_date: string;
  scraped_at_time: string;
  location_name: string;
  url: string;
  reviews_count: number;
  message: string;
}

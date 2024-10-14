from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from datetime import datetime
from bs4 import BeautifulSoup
import time
import pandas as pd
import random
import re


class GoogleScraper:

    def __init__(self) -> None:
        options = Options()
        options.add_argument("--headless")
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")
        options.add_argument("start-maximized")
        self.driver = webdriver.Chrome(
            options=options,
        )

    def _head_to_reviews(self, url):
        """
        Navigate to the reviews section of the Google Maps place page.
        """
        self.driver.get(url)
        try:
            element = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable(
                    (By.XPATH, "//button[contains(@aria-label, 'Reviews')]")
                )
            )
            element.click()
        except Exception as e:
            print(f"Error navigating to reviews section: {e}")

    def _sort_newest(self):
        """
        Sort the reviews by the newest first.
        """
        try:
            wait = WebDriverWait(self.driver, 20)
            menu_bt = wait.until(
                EC.element_to_be_clickable((By.XPATH, "//button[@data-value='Sort']"))
            )
            menu_bt.click()

            newest_bt = wait.until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-index="1"]'))
            )
            newest_bt.click()
        except Exception as e:
            print(f"Error sorting by newest: {e}")

    def _scroll(self, max_scrolls=30):
        """
        Scroll through the reviews section to load more reviews.
        """
        try:
            scrollable_div = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located(
                    (By.CSS_SELECTOR, "div.m6QErb.DxyBCb.kA9KIf.dS8AEf")
                )
            )

            last_height = self.driver.execute_script(
                "return arguments[0].scrollHeight", scrollable_div
            )

            scroll_count = 0
            while scroll_count < max_scrolls:
                # Scroll to the bottom of the div
                self.driver.execute_script(
                    "arguments[0].scrollTop = arguments[0].scrollHeight", scrollable_div
                )

                time.sleep(random.uniform(3, 6))  # Wait for new content to load

                new_height = self.driver.execute_script(
                    "return arguments[0].scrollHeight", scrollable_div
                )

                if new_height == last_height:
                    break  # No more new content, stop scrolling

                last_height = new_height
                scroll_count += 1

            print("Scrolled to the bottom, all content should be loaded.")

        except Exception as e:
            print(f"Error while scrolling: {e}")

    def _expand_reviews(self):
        """
        Expand all reviews that have a "More" button.
        """
        try:
            # Find all "More" buttons
            buttons = self.driver.find_elements(By.CSS_SELECTOR, "button.w8nwRe.kyuRq")

            if buttons:
                print("Expanding Reviews to extract")
                for button in buttons:
                    try:
                        # Click the "More" button if it's found
                        self.driver.execute_script("arguments[0].click();", button)
                    except Exception as e:
                        print(f"Error clicking 'More' button: {e}")
            else:
                # No buttons found, which may happen if no long reviews are found
                print("No Long reviews found, no reviews expanded.")
                pass
        except Exception as e:
            print(f"Error expanding reviews: {e}")

    def _get_reviews(self):
        """
        Get the reviews from the loaded page.
        """
        self._scroll()
        time.sleep(4)
        self._expand_reviews()

        print("Scraping the reviews...")

        response = BeautifulSoup(self.driver.page_source, "html.parser")
        rlist = response.find_all(
            "div",
            attrs={"data-review-id": True, "aria-label": True},
            class_=lambda x: x and "fontBodyMedium" in x,
        )

        reviews = [self._parse(r) for r in rlist]
        print(f"Number of reviews: {len(reviews)}")

        return reviews

    def _parse(self, review):
        """
        Parse individual review details.
        """
        item = {}

        item["review_id"] = review.get("data-review-id", None)
        item["username"] = review.get("aria-label", None)

        try:
            item["rating"] = float(
                review.find("span", class_="kvMYJc")["aria-label"].split(" ")[0]
            )
        except Exception:
            item["rating"] = None

        try:
            item["relative_date"] = review.find("span", class_="rsqaWe").text
        except Exception:
            item["relative_date"] = None

        try:
            review_text = review.find("div", class_="MyEned").text
            item["review"] = self._sanitize_string(review_text)
        except Exception:
            item["review"] = None

        item["retrieval_date"] = datetime.now()

        return item

    def _sanitize_string(self, text):
        """
        Filter out unwanted characters in the review text.
        """
        return (
            text.replace("\r", " ")
            .replace("\n", " ")
            .replace("\t", " ")
            .replace("’", "'")
        )

    def _close(self):
        """
        Close the browser and driver instance.
        """
        try:
            self.driver.quit()  # Use quit() to close both browser and driver
        except Exception as e:
            print(f"Error closing driver: {e}")

    def _is_validate_url(self, url) -> bool:
        url_regex = "^https?:\/\/(www\.)?google\.[a-z]{2,3}(\.[a-z]{2})?\/maps\/place\/([^@]+)\/(@[\d,.\w]+)\/(data\=[!:.%\w]+\?)"
        if re.match(url_regex, url):
            return True

        return False

    def scrape_reviews(self, url) -> pd.DataFrame:
        """
        Main method to scrape reviews from a Google Maps place page.
        """
        try:

            if self._is_validate_url(url):
                self._head_to_reviews(url)
                self._sort_newest()

                reviews = self._get_reviews()

                df = pd.DataFrame(reviews)
                return df

            raise ValueError("url is not a valid google map url")
        except Exception as e:
            print(f"Error during scraping: {e}")

        finally:
            self._close()

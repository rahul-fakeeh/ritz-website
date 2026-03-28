from pathlib import Path
from playwright.sync_api import sync_playwright

OUTPUT_FILE = Path("hackernews.txt")
URL = "https://news.ycombinator.com"


def main() -> None:
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto(URL, wait_until="domcontentloaded")
        page.wait_for_selector("span.titleline > a")

        titles = page.locator("span.titleline > a").all_inner_texts()[:10]
        OUTPUT_FILE.write_text("\n".join(titles) + "\n", encoding="utf-8")

        print("Top 10 Hacker News titles:")
        for index, title in enumerate(titles, start=1):
            print(f"{index}. {title}")

        print(f"\nSaved to: {OUTPUT_FILE.resolve()}")
        browser.close()


if __name__ == "__main__":
    main()

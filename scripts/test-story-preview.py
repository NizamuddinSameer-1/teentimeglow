import os
import unittest
from playwright.sync_api import sync_playwright


BASE_URL = os.environ.get("PREVIEW_TEST_URL", "http://127.0.0.1:4323")


class StoryPreviewTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.playwright = sync_playwright().start()
        cls.browser = cls.playwright.chromium.launch()

    @classmethod
    def tearDownClass(cls):
        cls.browser.close()
        cls.playwright.stop()

    def setUp(self):
        self.context = self.browser.new_context(viewport={"width": 1280, "height": 720})
        self.page = self.context.new_page()
        self.load_homepage()

    def tearDown(self):
        self.context.close()

    def load_homepage(self):
        self.page.goto(BASE_URL, wait_until="domcontentloaded", timeout=60000)
        self.page.wait_for_function("typeof window.openStoryModal === 'function'", timeout=60000)

    def open_preview(self, index=1):
        card = self.page.locator(".edit-card").nth(index)
        card.click(position={"x": 40, "y": 40})
        self.box = self.page.locator("#storyModal .modal-box")
        self.box.wait_for(state="visible")
        self.page.wait_for_timeout(350)
        return card

    def test_wheel_scrolls_preview_not_background(self):
        self.open_preview()
        self.assertEqual(self.page.evaluate("typeof Lenis"), "function")
        background = self.page.evaluate("scrollY")
        self.box.hover()
        self.page.mouse.wheel(0, 450)
        self.page.wait_for_timeout(1500)
        self.assertGreater(self.box.evaluate("el => el.scrollTop"), 0)
        self.assertEqual(self.page.evaluate("scrollY"), background)

    def test_background_stays_locked_at_preview_boundaries(self):
        self.open_preview()
        background = self.page.evaluate("scrollY")
        self.box.evaluate("el => el.scrollTop = el.scrollHeight")
        self.box.hover()
        self.page.mouse.wheel(0, 900)
        self.page.wait_for_timeout(1500)
        self.assertEqual(self.page.evaluate("scrollY"), background)
        self.page.mouse.move(5, 5)
        self.page.mouse.wheel(0, 450)
        self.page.wait_for_timeout(1500)
        self.assertEqual(self.page.evaluate("scrollY"), background)

    def test_every_preview_links_to_and_describes_its_article(self):
        count = self.page.locator(".edit-card").count()
        self.assertGreater(count, 0)
        for index in range(count):
            self.load_homepage()
            with self.subTest(article=index):
                card = self.open_preview(index)
                title = card.locator(".edit-title").inner_text()
                href = card.locator(".btn-read-edit").get_attribute("href")
                link = self.box.get_by_role("link", name="Read Full Article")
                self.assertEqual(link.count(), 1)
                self.assertEqual(link.get_attribute("href"), href)
                self.assertEqual(self.box.locator("h2").first.inner_text(), title)
                self.page.locator("#storyModal .modal-close-btn").click()

    def test_all_close_actions_restore_scroll_and_reopen_at_top(self):
        for action in ("close_button", "footer_button", "backdrop", "escape"):
            self.load_homepage()
            with self.subTest(action=action):
                card = self.page.locator(".edit-card").nth(1)
                card.scroll_into_view_if_needed()
                self.page.wait_for_timeout(350)
                original = self.page.evaluate("scrollY")
                self.open_preview()
                self.box.evaluate("el => el.scrollTop = el.scrollHeight")
                if action == "close_button":
                    self.box.evaluate("el => el.scrollTop = 0")
                    self.page.locator("#storyModal .modal-close-btn").click()
                elif action == "footer_button":
                    self.box.get_by_role("button", name="Close Preview", exact=True).click()
                elif action == "backdrop":
                    self.page.mouse.click(5, 5)
                else:
                    self.page.keyboard.press("Escape")
                self.assertFalse(self.page.locator("#storyModal").is_visible())
                self.assertAlmostEqual(self.page.evaluate("scrollY"), original, delta=1)
                self.open_preview()
                self.assertEqual(self.box.evaluate("el => el.scrollTop"), 0)
                self.page.locator("#storyModal .modal-close-btn").click()
                self.page.mouse.move(5, 5)
                self.page.mouse.wheel(0, 300)
                self.page.wait_for_timeout(1500)
                self.assertGreater(self.page.evaluate("scrollY"), original)

    def test_read_full_article_navigates(self):
        card = self.open_preview()
        href = card.locator(".btn-read-edit").get_attribute("href")
        link = self.box.get_by_role("link", name="Read Full Article")
        self.assertEqual(link.count(), 1)
        link.click()
        self.page.wait_for_url(f"{BASE_URL}{href}")
        self.assertEqual(self.page.url, f"{BASE_URL}{href}")
        self.assertGreater(self.page.locator(".rich-html-content").count(), 0)

    def test_mobile_touch_scrolls_preview(self):
        self.context.close()
        self.context = self.browser.new_context(**self.playwright.devices["iPhone 14"])
        self.page = self.context.new_page()
        self.load_homepage()
        self.open_preview(2)
        bounds = self.box.bounding_box()
        self.assertGreaterEqual(bounds["x"], 0)
        self.assertLessEqual(bounds["x"] + bounds["width"], 390)
        self.assertLessEqual(bounds["y"] + bounds["height"], 664)
        background = self.page.evaluate("scrollY")
        cdp = self.context.new_cdp_session(self.page)
        x = bounds["x"] + bounds["width"] / 2
        y = bounds["y"] + bounds["height"] * 0.75
        cdp.send("Input.dispatchTouchEvent", {"type": "touchStart", "touchPoints": [{"x": x, "y": y}]})
        for offset in range(30, 241, 30):
            cdp.send("Input.dispatchTouchEvent", {"type": "touchMove", "touchPoints": [{"x": x, "y": y - offset}]})
        cdp.send("Input.dispatchTouchEvent", {"type": "touchEnd", "touchPoints": []})
        self.page.wait_for_timeout(1500)
        self.assertGreater(self.box.evaluate("el => el.scrollTop"), 0)
        self.assertEqual(self.page.evaluate("scrollY"), background)

    def test_preview_scrolls_without_lenis(self):
        self.page.route("**/lenis@*/**", lambda route: route.fulfill(body="", content_type="application/javascript"))
        self.load_homepage()
        self.assertEqual(self.page.evaluate("typeof Lenis"), "undefined")
        self.open_preview()
        background = self.page.evaluate("scrollY")
        self.box.hover()
        self.page.mouse.wheel(0, 450)
        self.page.wait_for_timeout(500)
        self.assertGreater(self.box.evaluate("el => el.scrollTop"), 0)
        self.assertEqual(self.page.evaluate("scrollY"), background)


if __name__ == "__main__":
    unittest.main(verbosity=2)

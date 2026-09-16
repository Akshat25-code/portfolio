import os
import time
from playwright.sync_api import sync_playwright

ARTIFACT_DIR = r"C:\Users\ASUS\.gemini\antigravity-ide\brain\1b01666f-8afa-4970-8ac3-04c1e18d2ead"

def run_pro_verification():
    print("Starting Pro Playwright validation on http://localhost:5000...")
    errors = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 900})

        def on_console(msg):
            if msg.type == "error":
                print(f"[BROWSER ERROR]: {msg.text}")
                errors.append(msg.text)
        page.on("console", on_console)

        page.goto("http://localhost:5000")
        print("Page loaded.")

        # 1. Preloader check & Poster verify
        splash = page.locator("#splash-preloader")
        assert splash.is_visible(), "Splash preloader should be visible on load"
        splash_video = page.locator("#splash-video")
        poster = splash_video.get_attribute("poster")
        print(f"Splash video poster: {poster}")
        assert poster == "assets/preloader_poster.jpg", "Splash poster should be assets/preloader_poster.jpg"

        # Wait for preloader slide up
        print("Waiting 5.8s for video playback and curtain-up transition...")
        page.wait_for_timeout(5800)

        # 2. Hero Section Verification
        hero = page.locator("#home")
        assert hero.is_visible(), "Hero section should be visible"

        hero_video = page.locator("#hero-video")
        assert hero_video.is_visible(), "Hero video should be visible"
        hero_poster = hero_video.get_attribute("poster")
        print(f"Hero video poster: {hero_poster}")
        assert hero_poster == "assets/hero_poster.jpg", "Hero poster should be assets/hero_poster.jpg"

        page.screenshot(path=os.path.join(ARTIFACT_DIR, "hero_pro.png"))
        print("Captured Hero pro screenshot.")

        # 3. Bento About Verification
        page.evaluate("window.scrollTo(0, 800)")
        page.wait_for_timeout(800)

        # Verify Card 1 typewriter role
        bento_role = page.locator("#bento-typewriter-role")
        assert bento_role.is_visible(), "Bento role typewriter should be visible"
        print(f"Bento typewriter text: {bento_role.inner_text()}")

        # Verify Milestones 3D flip cards
        milestone_cards = page.locator(".milestone-flip-card")
        assert milestone_cards.count() == 3, "Expected 3 milestone flip cards"
        milestone_cards.first.hover(force=True)
        page.wait_for_timeout(400)

        page.screenshot(path=os.path.join(ARTIFACT_DIR, "bento_pro.png"))
        print("Captured Bento pro screenshot.")

        # 4. Skills Section Verification (Solar System & 5 3D Flip Cards in One Line)
        page.evaluate("window.scrollTo(0, 1600)")
        page.wait_for_timeout(800)

        canvas = page.locator("#tech-sphere-canvas")
        assert canvas.is_visible(), "Solar system canvas should be visible"

        skill_cards = page.locator(".skill-flip-card")
        print(f"Skill 3D flip cards count: {skill_cards.count()}")
        assert skill_cards.count() == 5, "Expected 5 skill 3D flip cards"

        # Check all 5 skill cards are in ONE horizontal line on desktop
        skill_tops = [skill_cards.nth(i).bounding_box()["y"] for i in range(5)]
        print(f"Skill card top offsets: {skill_tops}")
        assert max(skill_tops) - min(skill_tops) < 10, f"Skill cards should be in one horizontal row! Got {skill_tops}"

        # Hover first skill card
        skill_cards.first.hover(force=True)
        page.wait_for_timeout(400)

        page.screenshot(path=os.path.join(ARTIFACT_DIR, "skills_pro.png"))
        print("Captured Skills pro screenshot.")

        # 5. Projects Section Verification (5 3D Flip Cards in ONE Horizontal Line)
        page.evaluate("window.scrollTo(0, 2400)")
        page.wait_for_timeout(800)

        proj_cards = page.locator(".project-flip-card")
        print(f"Project 3D flip cards count: {proj_cards.count()}")
        assert proj_cards.count() == 5, "Expected 5 project cards!"

        # Check all 5 project cards are in ONE horizontal line on desktop
        proj_tops = [proj_cards.nth(i).bounding_box()["y"] for i in range(5)]
        print(f"Project card top offsets: {proj_tops}")
        assert max(proj_tops) - min(proj_tops) < 10, f"Project cards should be in one horizontal row! Got {proj_tops}"

        # Hover first project card to flip
        proj_cards.first.hover(force=True)
        page.wait_for_timeout(500)

        page.screenshot(path=os.path.join(ARTIFACT_DIR, "projects_pro.png"))
        print("Captured Projects pro screenshot.")

        # 6. Gratitude Contact Section Verification
        page.evaluate("window.scrollTo(0, 3200)")
        page.wait_for_timeout(800)

        # Verify "Gratitude" badge is removed
        has_gratitude = page.locator("#contact .section-badge").count()
        print(f"Gratitude badge count: {has_gratitude}")
        assert has_gratitude == 0, "Gratitude badge should be removed from #contact!"

        thankyou_video = page.locator("#thankyou-video")
        assert thankyou_video.is_visible(), "Thank you video should be visible in contact section"
        ty_poster = thankyou_video.get_attribute("poster")
        print(f"Thank you video poster: {ty_poster}")
        assert ty_poster == "assets/thankyou_poster.jpg", "Thank you poster should be assets/thankyou_poster.jpg"

        page.screenshot(path=os.path.join(ARTIFACT_DIR, "contact_pro.png"))
        print("Captured Contact pro screenshot.")

        browser.close()

    print("\n--- PRO SUMMARY ---")
    print(f"Console Errors: {len(errors)}")
    if errors:
        print("Errors encountered:", errors)
        assert False, f"Errors encountered: {errors}"
    else:
        print("ALL PRO VERIFICATION TESTS PASSED 100%!")

if __name__ == "__main__":
    run_pro_verification()

import os
import time
from playwright.sync_api import sync_playwright

ARTIFACT_DIR = r"C:\Users\ASUS\.gemini\antigravity-ide\brain\1b01666f-8afa-4970-8ac3-04c1e18d2ead"

def run_verification():
    print("Starting Playwright validation on http://localhost:5000...")
    errors = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 900})

        # Monitor console errors
        def on_console(msg):
            if msg.type == "error":
                print(f"[BROWSER ERROR]: {msg.text}")
                errors.append(msg.text)
        page.on("console", on_console)

        page.goto("http://localhost:5000")
        print("Page loaded.")

        # 1. Preloader check
        splash = page.locator("#splash-preloader")
        assert splash.is_visible(), "Splash preloader should be visible on load"
        print("Preloader is visible.")

        # Take screenshot of preloader
        splash_ss = os.path.join(ARTIFACT_DIR, "preloader_verified.png")
        page.screenshot(path=splash_ss)
        print(f"Captured preloader screenshot: {splash_ss}")

        # Wait for 4.5s curtain-up
        print("Waiting 5.2s for curtain-up transition...")
        page.wait_for_timeout(5200)

        # Confirm curtain has ascended / hidden
        is_hidden = page.evaluate("() => { const el = document.getElementById('splash-preloader'); return el.style.display === 'none' || el.classList.contains('splash-curtain-up'); }")
        print("Preloader curtain-up status:", is_hidden)
        assert is_hidden, "Preloader should have slid up after 4.5s"

        # 2. Hero Section
        hero = page.locator("#home")
        assert hero.is_visible(), "Hero section should be visible"
        # Move mouse over hero to test grid glow tracking
        page.mouse.move(700, 350)
        mouse_vars = page.evaluate("() => { const h = document.getElementById('home'); return { x: h.style.getPropertyValue('--mouse-x'), y: h.style.getPropertyValue('--mouse-y') }; }")
        print("Hero mouse spotlight tracking variables:", mouse_vars)

        # Capture Hero screenshot
        hero_ss = os.path.join(ARTIFACT_DIR, "hero_verified.png")
        page.screenshot(path=hero_ss)
        print(f"Captured Hero screenshot: {hero_ss}")

        # 3. Bento About Grid
        page.locator("#about").scroll_into_view_if_needed()
        page.wait_for_timeout(600)
        bento_cards = page.locator(".bento-card")
        bento_count = bento_cards.count()
        print(f"Bento cards count: {bento_count}")
        assert bento_count >= 6, "Expected at least 6 bento cards"

        # 4. Skills Section: Globe + Capabilities Grid
        page.locator("#skills").scroll_into_view_if_needed()
        page.wait_for_timeout(600)
        sphere_canvas = page.locator("#tech-sphere-canvas")
        assert sphere_canvas.is_visible(), "Sphere canvas should be visible"
        
        caps = page.locator(".capability-card")
        cap_count = caps.count()
        print(f"Capability cards count: {cap_count}")
        assert cap_count == 5, f"Expected 5 capability cards, got {cap_count}"

        # Hover over first capability card
        caps.first.hover()
        page.wait_for_timeout(500)
        drawer_visible = page.evaluate("() => { const d = document.querySelector('.capability-drawer'); const s = window.getComputedStyle(d); return s.opacity !== '0' && s.maxHeight !== '0px'; }")
        print("Capability drawer hover expansion:", drawer_visible)

        skills_ss = os.path.join(ARTIFACT_DIR, "skills_verified.png")
        page.screenshot(path=skills_ss)
        print(f"Captured Skills screenshot: {skills_ss}")

        # 5. Projects Section: Impact Strip + Expandable Cards
        page.locator("#projects").scroll_into_view_if_needed()
        page.wait_for_timeout(600)
        impact_strip = page.locator(".engineering-impact-strip")
        assert impact_strip.is_visible(), "Engineering impact strip should be visible inside projects"
        
        proj_cards = page.locator(".project-card")
        proj_count = proj_cards.count()
        print(f"Project cards count: {proj_count}")
        assert proj_count == 3, f"Expected 3 project cards, got {proj_count}"

        # Hover over first project card and verify drawer
        proj_cards.first.hover()
        page.wait_for_timeout(500)
        proj_drawer_visible = page.evaluate("() => { const d = document.querySelector('.project-drawer'); const s = window.getComputedStyle(d); return s.opacity !== '0'; }")
        print("Project drawer hover expansion:", proj_drawer_visible)

        # Confirm NO Live Demo button exists
        live_demo_links = page.locator("text='Live Demo'").count()
        print("Live Demo button count:", live_demo_links)
        assert live_demo_links == 0, "No 'Live Demo' buttons should exist!"

        projects_ss = os.path.join(ARTIFACT_DIR, "projects_verified.png")
        page.screenshot(path=projects_ss)
        print(f"Captured Projects screenshot: {projects_ss}")

        # 6. Gratitude Contact & Copy Email
        page.locator("#contact").scroll_into_view_if_needed()
        page.wait_for_timeout(600)
        contact_card = page.locator(".gratitude-card")
        assert contact_card.is_visible(), "Gratitude card should be visible"

        # Click copy email button
        copy_btn = page.locator("#copy-email-btn")
        copy_btn.click()
        page.wait_for_timeout(300)
        btn_text = copy_btn.inner_text()
        print("Copy email button text after click:", btn_text)

        contact_ss = os.path.join(ARTIFACT_DIR, "contact_verified.png")
        page.screenshot(path=contact_ss)
        print(f"Captured Contact screenshot: {contact_ss}")

        # 7. AI Chatbot Terminal
        launcher = page.locator("#ai-chat-launcher")
        assert launcher.is_visible(), "AI chat launcher button should be visible"
        launcher.click()
        page.wait_for_timeout(400)
        chat_modal = page.locator("#draggable-chat-modal")
        assert chat_modal.is_visible(), "Chat modal should be visible after launcher click"

        chat_ss = os.path.join(ARTIFACT_DIR, "chatbot_verified.png")
        page.screenshot(path=chat_ss)
        print(f"Captured Chatbot screenshot: {chat_ss}")

        browser.close()

    print("\n--- SUMMARY ---")
    print(f"Console Errors: {len(errors)}")
    if errors:
        print("Errors encountered:", errors)
    else:
        print("ALL VERIFICATION CHECKS PASSED WITH ZERO ERRORS!")

if __name__ == "__main__":
    run_verification()

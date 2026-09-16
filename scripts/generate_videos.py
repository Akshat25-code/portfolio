import os
import math
import numpy as np
from PIL import Image, ImageDraw
import imageio.v3 as iio

ASSETS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'assets')

def create_preloader_video():
    print("Generating assets/preloader.mp4 (4.5s)...")
    base_img_path = os.path.join(ASSETS_DIR, 'avatar_meditating.jpg')
    if not os.path.exists(base_img_path):
        print(f"Error: {base_img_path} not found")
        return

    base_img = Image.open(base_img_path).convert('RGB').resize((640, 640), Image.Resampling.LANCZOS)
    
    fps = 30
    total_frames = int(4.5 * fps) # 135 frames
    width, height = 640, 640

    np.random.seed(42)
    particle_x = np.random.uniform(100, 540, 40)
    particle_y_start = np.random.uniform(100, 540, 40)
    particle_speed = np.random.uniform(1.2, 3.5, 40)
    particle_size = np.random.uniform(2, 5, 40)

    frames = []

    for f in range(total_frames):
        progress = f / total_frames

        # Subtle breathing zoom
        zoom = 1.0 + 0.035 * math.sin(progress * 2 * math.pi * 1.5)
        zw, zh = int(width * zoom), int(height * zoom)
        zoomed = base_img.resize((zw, zh), Image.Resampling.BILINEAR)
        left = (zw - width) // 2
        top = (zh - height) // 2
        frame_img = zoomed.crop((left, top, left + width, top + height)).copy()

        # Create overlay for glowing cyan energy ring & particles
        overlay = Image.new('RGBA', (width, height), (0, 0, 0, 0))
        draw = ImageDraw.Draw(overlay)

        # Pulsating energy rings radiating outward from center (320, 320)
        ring_radius = 120 + ((f * 3.5) % 180)
        ring_alpha = int(120 * (1.0 - ((ring_radius - 120) / 180.0)))
        draw.ellipse([320 - ring_radius, 320 - ring_radius, 320 + ring_radius, 320 + ring_radius],
                     outline=(0, 229, 255, ring_alpha), width=2)
        
        ring_radius2 = 120 + (((f * 3.5) + 90) % 180)
        ring_alpha2 = int(100 * (1.0 - ((ring_radius2 - 120) / 180.0)))
        draw.ellipse([320 - ring_radius2, 320 - ring_radius2, 320 + ring_radius2, 320 + ring_radius2],
                     outline=(0, 200, 255, ring_alpha2), width=2)

        # Rising cyan particles
        for i in range(40):
            current_y = (particle_y_start[i] - (f * particle_speed[i])) % height
            px = particle_x[i] + math.sin((f * 0.05) + i) * 12
            p_alpha = int(180 * (1.0 - (current_y / height)))
            sz = particle_size[i]
            draw.ellipse([px - sz, current_y - sz, px + sz, current_y + sz],
                         fill=(0, 229, 255, p_alpha))

        frame_img = Image.alpha_composite(frame_img.convert('RGBA'), overlay).convert('RGB')
        frames.append(np.array(frame_img))

    out_path = os.path.join(ASSETS_DIR, 'preloader.mp4')
    iio.imwrite(out_path, frames, fps=fps)
    print(f"Successfully generated {out_path} ({len(frames)} frames)")

def create_hero_video():
    print("Generating assets/hero.mp4 (3.5s loop)...")
    base_img_path = os.path.join(ASSETS_DIR, 'avatar_hero.jpg')
    if not os.path.exists(base_img_path):
        print(f"Error: {base_img_path} not found")
        return

    base_img = Image.open(base_img_path).convert('RGB').resize((640, 640), Image.Resampling.LANCZOS)
    fps = 30
    total_frames = int(3.5 * fps) # 105 frames
    width, height = 640, 640

    frames = []

    for f in range(total_frames):
        progress = f / total_frames
        angle = progress * 2 * math.pi

        zoom = 1.0 + 0.02 * math.sin(angle)
        dx = int(3 * math.sin(angle))
        dy = int(2 * math.cos(angle))

        zw, zh = int(width * zoom), int(height * zoom)
        zoomed = base_img.resize((zw, zh), Image.Resampling.BILINEAR)
        left = (zw - width) // 2 + dx
        top = (zh - height) // 2 + dy
        left = max(0, min(zw - width, left))
        top = max(0, min(zh - height, top))
        frame_img = zoomed.crop((left, top, left + width, top + height)).copy()

        overlay = Image.new('RGBA', (width, height), (0, 0, 0, 0))
        draw = ImageDraw.Draw(overlay)

        # Laptop screen pulsing glow
        glow_alpha = int(45 + 25 * math.sin(angle * 2))
        draw.ellipse([220, 360, 420, 520], fill=(0, 229, 255, glow_alpha))

        # Steam puffs from coffee cup
        for p in range(5):
            p_prog = (progress + p * 0.2) % 1.0
            sx = 440 + math.sin(p_prog * 4 * math.pi) * 8
            sy = 400 - (p_prog * 80)
            s_alpha = int(90 * (1.0 - p_prog))
            s_rad = 4 + p_prog * 10
            draw.ellipse([sx - s_rad, sy - s_rad, sx + s_rad, sy + s_rad],
                         fill=(220, 245, 255, s_alpha))

        frame_img = Image.alpha_composite(frame_img.convert('RGBA'), overlay).convert('RGB')
        frames.append(np.array(frame_img))

    out_path = os.path.join(ASSETS_DIR, 'hero.mp4')
    iio.imwrite(out_path, frames, fps=fps)
    print(f"Successfully generated {out_path} ({len(frames)} frames)")

if __name__ == '__main__':
    create_preloader_video()
    create_hero_video()

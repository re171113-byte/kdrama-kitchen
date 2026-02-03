"""
Pinterest 핀 이미지 생성기
- 2:3 비율 (1000x1500)
- 상단: RECIPE 배지
- 중앙: 음식 사진
- 하단: 검은 배경 + 음식명 + 부제 + 드라마명
"""

from PIL import Image, ImageDraw, ImageFont
import os

DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TEMP = os.path.join(DIR, 'temp-images')
OUT = os.path.join(DIR, 'temp-images')

# 핀 데이터
PINS = [
    {
        'id': 'mandu',
        'src': os.path.join(TEMP, 'mandu-original.jpg'),
        'food': 'MANDU',
        'subtitle': "Classic Korean\nDumplings",
        'drama': 'From K-Drama: Doctor Slump',
    },
    {
        'id': 'kimchi',
        'src': os.path.join(TEMP, 'kimchi-original.jpg'),
        'food': 'KIMCHI',
        'subtitle': "Traditional Korean\nFermented Cabbage",
        'drama': 'From K-Drama: Mr. Queen',
    },
    {
        'id': 'bossam',
        'src': os.path.join(TEMP, 'bossam-original.jpg'),
        'food': 'BOSSAM',
        'subtitle': "Korean Boiled Pork\nWraps",
        'drama': 'From K-Drama: Marry My Husband',
    },
]

W, H = 1000, 1500
BADGE_COLOR = (198, 40, 40)  # #C62828
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
GRAY = (180, 180, 180)

def find_font(size, bold=False):
    """시스템 폰트 찾기"""
    candidates_bold = [
        'C:/Windows/Fonts/arialbd.ttf',
        'C:/Windows/Fonts/calibrib.ttf',
        'C:/Windows/Fonts/segoeui.ttf',
    ]
    candidates_regular = [
        'C:/Windows/Fonts/arial.ttf',
        'C:/Windows/Fonts/calibri.ttf',
        'C:/Windows/Fonts/segoeui.ttf',
    ]
    candidates = candidates_bold if bold else candidates_regular
    for f in candidates:
        if os.path.exists(f):
            return ImageFont.truetype(f, size)
    return ImageFont.load_default()


def create_pin(pin):
    print(f"  Creating {pin['id']}...")

    # 캔버스 생성
    canvas = Image.new('RGB', (W, H), BLACK)
    draw = ImageDraw.Draw(canvas)

    # 원본 이미지 로드 & 크롭 (상단 영역에 맞게)
    img = Image.open(pin['src'])
    img_w, img_h = img.size

    # 이미지 영역: 상단 0 ~ 하단 바 시작점
    bar_height = 420
    img_area_h = H - bar_height  # 1080px

    # 이미지를 너비에 맞추고 중앙 크롭
    scale = W / img_w
    new_h = int(img_h * scale)
    img = img.resize((W, new_h), Image.LANCZOS)

    # 중앙에서 크롭
    if new_h > img_area_h:
        top = (new_h - img_area_h) // 2
        img = img.crop((0, top, W, top + img_area_h))
    else:
        img = img.resize((W, img_area_h), Image.LANCZOS)

    canvas.paste(img, (0, 0))

    # 이미지 하단에 그라데이션 오버레이 (자연스러운 전환)
    gradient_h = 150
    for i in range(gradient_h):
        alpha = int(255 * (i / gradient_h))
        y = img_area_h - gradient_h + i
        draw.line([(0, y), (W, y)], fill=(0, 0, 0, alpha))
        # PIL RGB 모드에서는 alpha 안 됨 → 반투명 효과를 검은색 비율로 구현
        ratio = i / gradient_h
        r, g, b = 0, 0, 0
        # 원본 픽셀과 블렌딩
        for x in range(W):
            orig = canvas.getpixel((x, y))
            blended = tuple(int(orig[c] * (1 - ratio) + 0 * ratio) for c in range(3))
            canvas.putpixel((x, y), blended)

    # RECIPE 배지 (좌상단)
    badge_font = find_font(24, bold=True)
    badge_text = 'RECIPE'
    badge_bbox = draw.textbbox((0, 0), badge_text, font=badge_font)
    badge_w = badge_bbox[2] - badge_bbox[0] + 24
    badge_h = badge_bbox[3] - badge_bbox[1] + 16
    badge_x, badge_y = 30, 30
    draw.rectangle([badge_x, badge_y, badge_x + badge_w, badge_y + badge_h], fill=BADGE_COLOR)
    draw.text((badge_x + 12, badge_y + 6), badge_text, fill=WHITE, font=badge_font)

    # 하단 검은 바 텍스트
    text_start_y = img_area_h + 30

    # 음식명 (큰 글씨)
    food_font = find_font(72, bold=True)
    draw.text((50, text_start_y), pin['food'], fill=WHITE, font=food_font)

    # 부제
    sub_font = find_font(36, bold=False)
    subtitle_y = text_start_y + 100
    for i, line in enumerate(pin['subtitle'].split('\n')):
        draw.text((50, subtitle_y + i * 46), line, fill=GRAY, font=sub_font)

    # 드라마명 (하단)
    drama_font = find_font(26, bold=False)
    draw.text((50, H - 70), pin['drama'], fill=GRAY, font=drama_font)

    # 저장
    out_path = os.path.join(OUT, f"{pin['id']}-pin.jpg")
    canvas.save(out_path, 'JPEG', quality=92)
    size_kb = os.path.getsize(out_path) / 1024
    print(f"  Saved: {out_path} ({size_kb:.0f}KB)")
    return out_path


if __name__ == '__main__':
    print("Pinterest Pin Image Generator")
    print(f"Output: {OUT}\n")
    for pin in PINS:
        create_pin(pin)
    print("\nDone!")

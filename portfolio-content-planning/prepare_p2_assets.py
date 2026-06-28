from pathlib import Path
from PIL import Image, ImageOps, ImageDraw, ImageFont
import json

REPO = Path("/Users/omoritakashi/Desktop/CodexWorkspace/10_projects/ポートフォリオWeb")
SOURCE = Path("/Users/omoritakashi/Desktop/CodexWorkspace/10_projects/教員動画作成/教員動画生成_採用")
PUBLIC = REPO / "public/images/projects"
OUT_MANIFEST = REPO / "portfolio-content-planning/p2_asset_manifest.json"
CONTACT = REPO / "portfolio-content-planning/p2_assets_contact_sheet.jpg"


ASSETS = {
    "airnote": [
        ("住友化学_airnote/airnoteパンフレット_平置き表裏モック_01.png", "hero-brochure-spread.jpg", "hero"),
        ("住友化学_airnote/airnote1.jpg", "product-detail-01.jpg", "story"),
        ("住友化学_airnote/airnote2.jpg", "product-detail-02.jpg", "story"),
        ("住友化学_airnote/2DE267BF-2FC9-4C52-B5C8-6D82EB93E01C.PNG", "brochure-page.jpg", "story"),
    ],
    "og-giken": [
        ("OG/OG技研_Pulsecure観音開きパンフレット_平置き表裏モック_03.png", "hero-brochure-spread.jpg", "hero"),
        ("OG/1.png", "brochure-page-01.jpg", "story"),
        ("OG/2.png", "brochure-page-02.jpg", "story"),
    ],
    "kawasaki-medical-college": [
        ("川崎医療短大/第一看護科_大学案内見開きモックアップ.png", "hero-guide-spread.jpg", "hero"),
        ("川崎医療短大/2.png", "guide-page-02.jpg", "story"),
        ("川崎医療短大/3.png", "guide-page-03.jpg", "story"),
        ("川崎医療短大/4.png", "guide-page-04.jpg", "story"),
    ],
    "tepco": [
        ("東京電力_新聞広告/東京電力_新聞広告.png", "hero-newspaper-ad.jpg", "hero"),
        ("東京電力_新聞広告/ぐらっと_tri.jpg", "ad-illustration.jpg", "story"),
    ],
    "kusa": [
        ("倉敷芸科大/倉敷芸科大.png", "hero-web-overview.jpg", "hero"),
    ],
    "kyushu-university": [
        ("九州大学_芸術工学/九州大学_芸術工学_リーフレット1.PNG", "hero-leaflet-front.jpg", "hero"),
        ("九州大学_芸術工学/九州大学_芸術工学_リーフレット2.PNG", "leaflet-back.jpg", "story"),
        ("九州大学_芸術工学/リーフ表_1.png", "leaflet-front-flat.jpg", "story"),
        ("九州大学_芸術工学/リーフ裏_1.png", "leaflet-back-flat.jpg", "story"),
        ("九州大学_芸術工学/B297B85A-B68F-420C-BCD3-8AA8EE7E8685.PNG", "leaflet-detail.jpg", "story"),
    ],
}


def save_web_image(src: Path, dst: Path, max_edge: int = 2200) -> dict:
    dst.parent.mkdir(parents=True, exist_ok=True)
    im = Image.open(src)
    im = ImageOps.exif_transpose(im)
    if im.mode not in ("RGB", "L"):
        bg = Image.new("RGB", im.size, "white")
        if im.mode == "RGBA":
            bg.paste(im, mask=im.getchannel("A"))
            im = bg
        else:
            im = im.convert("RGB")
    else:
        im = im.convert("RGB")

    original = im.size
    scale = min(1, max_edge / max(im.size))
    if scale < 1:
        im = im.resize((round(im.width * scale), round(im.height * scale)), Image.LANCZOS)
    im.save(dst, "JPEG", quality=88, optimize=True, progressive=True)
    return {
        "source": str(src),
        "output": str(dst.relative_to(REPO)),
        "original_size": original,
        "web_size": im.size,
        "bytes": dst.stat().st_size,
    }


def make_contact_sheet(records: list[dict]) -> None:
    thumbs = []
    for rec in records:
        out = REPO / rec["output"]
        im = Image.open(out).convert("RGB")
        im.thumbnail((260, 170), Image.LANCZOS)
        thumbs.append((rec, im.copy()))

    cols = 4
    cell_w, cell_h, label_h = 280, 190, 58
    rows = (len(thumbs) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * cell_w, rows * (cell_h + label_h)), "#f6f1e7")
    draw = ImageDraw.Draw(sheet)
    try:
        font = ImageFont.truetype("/System/Library/Fonts/ヒラギノ角ゴシック W3.ttc", 12)
    except Exception:
        font = None
    for idx, (rec, im) in enumerate(thumbs):
        row, col = divmod(idx, cols)
        x, y = col * cell_w, row * (cell_h + label_h)
        bg = Image.new("RGB", (cell_w, cell_h), "white")
        bg.paste(im, ((cell_w - im.width) // 2, (cell_h - im.height) // 2))
        sheet.paste(bg, (x, y))
        label = rec["output"].replace("public/images/projects/", "")
        if len(label) > 46:
            label = label[:43] + "..."
        draw.text((x + 8, y + cell_h + 8), label, fill="#111111", font=font)
    sheet.save(CONTACT, quality=88)


def main() -> None:
    records = []
    missing = []
    for project, items in ASSETS.items():
        for rel, filename, role in items:
            src = SOURCE / rel
            if not src.exists():
                missing.append({"project": project, "source": str(src)})
                continue
            dst = PUBLIC / project / filename
            info = save_web_image(src, dst)
            info["project"] = project
            info["role"] = role
            info["filename"] = filename
            records.append(info)

    OUT_MANIFEST.write_text(
        json.dumps({"assets": records, "missing": missing}, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    make_contact_sheet(records)
    print(json.dumps({"asset_count": len(records), "missing": missing, "manifest": str(OUT_MANIFEST), "contact_sheet": str(CONTACT)}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()

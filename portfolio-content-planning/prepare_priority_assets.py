from pathlib import Path
from PIL import Image, ImageOps, ImageDraw, ImageFont
import json
import shutil

REPO = Path("/Users/omoritakashi/Desktop/CodexWorkspace/10_projects/ポートフォリオWeb")
SOURCE = Path("/Users/omoritakashi/Desktop/CodexWorkspace/10_projects/教員動画作成/教員動画生成_採用")
PDF_THUMBS = Path("/tmp/portfolio-pdf-thumbnails")
PUBLIC = REPO / "public/images/projects"
OUT_MANIFEST = REPO / "portfolio-content-planning/priority_asset_manifest.json"
CONTACT = REPO / "portfolio-content-planning/priority_assets_contact_sheet.jpg"


ASSETS = {
    "gen-ai": [
        ("GEN-AI VISUAL BOOK/20251022_GEN-AI.png", "hero-portrait.jpg", "hero"),
        ("GEN-AI VISUAL BOOK/image.png", "book-display-workspace.jpg", "story"),
        ("GEN-AI VISUAL BOOK/image1.png", "book-display-screen.jpg", "story"),
        ("GEN-AI VISUAL BOOK/01.png", "zine-page-01.jpg", "story"),
        ("GEN-AI VISUAL BOOK/02.png", "zine-page-02.jpg", "story"),
        ("GEN-AI VISUAL BOOK/08.png", "zine-page-08.jpg", "story"),
        ("GEN-AI VISUAL BOOK/15.png", "zine-page-15.jpg", "story"),
    ],
    "jset": [
        ("__pdf__/JSET_生成AI時代の創作教育における認識形成とZINEの役割_大森 隆_20260501.pdf.png", "paper-cover.jpg", "hero"),
        ("__pdf__/20260523_日本教育工学会研究会　発表資料 (1).pdf.png", "presentation-cover.jpg", "story"),
        ("GEN-AI VISUAL BOOK/02.png", "zine-question-page.jpg", "story"),
        ("GEN-AI VISUAL BOOK/06.png", "zine-seminar-page.jpg", "story"),
        ("GEN-AI VISUAL BOOK/15.png", "zine-ethics-page.jpg", "story"),
    ],
    "ana": [
        ("ANA/ANA_空港サイン.png", "hero-airport-sign.jpg", "hero"),
        ("ANA/ANA_搭乗ゲート表示_A2案_運用場面_01.png", "boarding-gate-sign.jpg", "story"),
        ("ANA/ANA_アメニティモック1.png", "amenity-mockup-01.jpg", "story"),
        ("ANA/ANA_アメニティモック2.png", "amenity-mockup-02.jpg", "story"),
        ("ANA/ANA_白カップ_機内食使用場面_01.png", "white-cup-inflight.jpg", "story"),
        ("ANA/ANA_水引ストラップ_商品使用場面_01.png", "mizuhiki-strap.jpg", "story"),
        ("ANA/100730_意思表示カード.jpg", "intention-card.jpg", "story"),
    ],
    "junior-law-school": [
        ("ジュニアロースクール岡山/02_A4チラシ_高校教室机上_表裏モックアップ-v2.png", "hero-desk-mockup.jpg", "hero"),
        ("ジュニアロースクール岡山/A4両面チラシ_表裏モックアップ2.png", "flyer-front-back.jpg", "story"),
        ("ジュニアロースクール岡山/03_A4チラシ_高校掲示板_断ち落とし印刷-v2.png", "bulletin-board.jpg", "story"),
        ("ジュニアロースクール岡山/240913_Lawschool_A4_omote.png", "flyer-front.jpg", "story"),
        ("ジュニアロースクール岡山/240913_Lawschool_A4_ura_ol.png", "flyer-back.jpg", "story"),
    ],
    "bemac": [
        ("BEMAC/BEMAC船舶航行IoTシステム_3シーン採用版.png", "hero-three-scenes.jpg", "hero"),
        ("BEMAC/BEMAC船舶航行IoTシステム_夜間艦橋エンジンモニター.png", "night-bridge-engine-monitor.jpg", "story"),
        ("BEMAC/BEMAC船舶航行IoTシステム_夜間艦橋アラームモニター.png", "night-bridge-alarm-monitor.jpg", "story"),
        ("BEMAC/BEMAC船舶航行IoTシステム_エンジンモニター実機モックアップ.png", "engine-monitor-mockup.jpg", "story"),
        ("BEMAC/BEMAC船舶航行IoTシステム_UIデザインガイドライン.PNG", "ui-design-guideline.jpg", "story"),
    ],
    "mori-geijutsusai": [
        ("森の芸術祭/森の芸術祭_鑑賞ガイド.png", "hero-viewing-guide.jpg", "hero"),
        ("森の芸術祭/鑑賞ガイド_トンボ無_ページ_1.jpg", "guide-page-01.jpg", "story"),
        ("森の芸術祭/鑑賞ガイド_トンボ無_ページ_2.jpg", "guide-page-02.jpg", "story"),
        ("森の芸術祭/鑑賞ガイド_トンボ無_ページ_3.jpg", "guide-page-03.jpg", "story"),
        ("森の芸術祭/鑑賞ガイド_トンボ無_ページ_4.jpg", "guide-page-04.jpg", "story"),
        ("__pdf__/3_3 A&S FD研修会 森の芸術祭.pdf.png", "fd-workshop-cover.jpg", "story"),
    ],
}


def source_path(rel: str) -> Path:
    if rel.startswith("__pdf__/"):
        return PDF_THUMBS / rel.replace("__pdf__/", "")
    return SOURCE / rel


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
    cell_w, cell_h, label_h = 280, 190, 54
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
            src = source_path(rel)
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

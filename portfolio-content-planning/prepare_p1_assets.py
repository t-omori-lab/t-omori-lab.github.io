from pathlib import Path
from PIL import Image, ImageOps, ImageDraw, ImageFont
import json
import subprocess
import tempfile

REPO = Path("/Users/omoritakashi/Desktop/CodexWorkspace/10_projects/ポートフォリオWeb")
SOURCE = Path("/Users/omoritakashi/Desktop/CodexWorkspace/10_projects/教員動画作成/教員動画生成_採用")
PUBLIC = REPO / "public/images/projects"
OUT_MANIFEST = REPO / "portfolio-content-planning/p1_asset_manifest.json"
CONTACT = REPO / "portfolio-content-planning/p1_assets_contact_sheet.jpg"
PDFTOPPM = "/Users/omoritakashi/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/pdftoppm"


ASSETS = {
    "lms": [
        ("LMS/LMX_DXプロジェクト.png", "hero-project-overview.jpg", "hero"),
        ("LMS/SS/FireShot Capture 007 - HUMAN　ヒューマンアカデミー - dx300-mypage-student.pricerkk.com.png", "student-home.jpg", "story"),
        ("LMS/SS/FireShot Capture 008 - カレンダー - HUMAN　ヒューマンアカデミー - dx300-mypage-student.pricerkk.com.png", "calendar.jpg", "story"),
        ("LMS/SS/FireShot Capture 009 - 成績管理 - HUMAN　ヒューマンアカデミー - dx300-mypage-student.pricerkk.com.png", "grade-management.jpg", "story"),
        ("LMS/SS/FireShot Capture 010 - プロフィール - HUMAN　ヒューマンアカデミー - dx300-mypage-student.pricerkk.com.png", "profile.jpg", "story"),
    ],
    "eizo": [
        ("EIZO/EIZO_デザインロードマップ.png", "hero-design-roadmap.jpg", "hero"),
        ("EIZO/01_A4.pdf", "design-roadmap-a4-01.jpg", "story"),
        ("EIZO/02_A3.pdf", "design-roadmap-a3.jpg", "story"),
        ("EIZO/03_A4.pdf", "design-roadmap-a4-03.jpg", "story"),
    ],
    "osaki": [
        ("大崎デザインマネジメント/製品デザインルール_開発レビューシーン.png", "hero-review-scene.jpg", "hero"),
        ("大崎デザインマネジメント/03_製品デザインルール_デザイン開発デスク.png", "design-development-desk.jpg", "story"),
        ("大崎デザインマネジメント/製品デザインルール_会議シーン.png", "meeting-scene.jpg", "story"),
        ("大崎デザインマネジメント/OSAKI_A4.pdf", "guideline-cover.jpg", "story"),
    ],
    "kuroda": [
        ("くろだ病院/くろだ病院.png", "hero-site-overview.jpg", "hero"),
        ("くろだ病院/Web キャプチャ_9-8-2023_113423_www.kuroda.or.jp.jpeg", "site-capture-01.jpg", "story"),
        ("くろだ病院/Web キャプチャ_9-8-2023_113516_www.kuroda.or.jp.jpeg", "site-capture-02.jpg", "story"),
        ("くろだ病院/Web キャプチャ_9-8-2023_11352_www.kuroda.or.jp.jpeg", "site-capture-03.jpg", "story"),
        ("くろだ病院/Web キャプチャ_9-8-2023_113532_www.kuroda.or.jp.jpeg", "site-capture-04.jpg", "story"),
    ],
    "cypress-sunadaya": [
        ("サイプレス・スナダヤ/サイプレス・スナダヤ.png", "hero-site-overview.jpg", "hero"),
        ("サイプレス・スナダヤ/FireShot Capture 040 - 株式会社サイプレス・スナダヤ - www.sunadaya.co.jp.jpg", "site-top.jpg", "story"),
        ("サイプレス・スナダヤ/FireShot Capture 041 - 株式会社サイプレス・スナダヤ - www.sunadaya.co.jp.jpg", "site-company.jpg", "story"),
        ("サイプレス・スナダヤ/FireShot Capture 042 - 大規模・高度生産設備 - 株式会社サイプレス・スナダヤ - www.sunadaya.co.jp.jpg", "site-equipment.jpg", "story"),
        ("サイプレス・スナダヤ/FireShot Capture 043 - CLT - 株式会社サイプレス・スナダヤ - www.sunadaya.co.jp.jpg", "site-clt.jpg", "story"),
        ("サイプレス・スナダヤ/FireShot Capture 044 - 木材と環境 - 株式会社サイプレス・スナダヤ - www.sunadaya.co.jp.jpg", "site-environment.jpg", "story"),
    ],
}


def render_pdf_first_page(pdf: Path) -> Path:
    tmpdir = Path(tempfile.mkdtemp(prefix="portfolio-p1-pdf-"))
    prefix = tmpdir / "page"
    subprocess.run(
        [PDFTOPPM, "-png", "-singlefile", "-f", "1", "-l", "1", "-r", "144", str(pdf), str(prefix)],
        check=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )
    return tmpdir / "page.png"


def source_path(rel: str) -> Path:
    return SOURCE / rel


def save_web_image(src: Path, dst: Path, max_edge: int = 2200) -> dict:
    dst.parent.mkdir(parents=True, exist_ok=True)
    input_path = src
    if src.suffix.lower() == ".pdf":
        input_path = render_pdf_first_page(src)
    im = Image.open(input_path)
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

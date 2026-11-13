#!/usr/bin/env python3
"""
Prepare public achievement assets from the private certificate originals.

The authoritative inventory lives in docs/achievements/achievements.json.
This script does three things and nothing else:

  1. Renders a 1600px WebP preview for every visible record with an asset.
  2. Produces public copies of PDFs: clean PDFs are copied unchanged;
     PDFs carrying a certificate ID or verification QR are rebuilt from a
     redacted 200dpi render, so the public file never contains the secret.
  3. Writes docs/achievements/asset-manifest.json with paths, dimensions,
     redaction notes and source filenames.

Originals are read from --source and are never modified. A record whose source
file is absent from --source is reported as missing; no image is fabricated for
it.

Usage:
    python scripts/prepare-achievement-assets.py --source "C:\\path\\to\\certificates"

Requires: pillow, pymupdf, numpy.
"""

import argparse
import hashlib
import json
import os
import shutil
from datetime import datetime, timezone

import pymupdf
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC = os.path.join(ROOT, "public", "achievements")
PREVIEWS = os.path.join(PUBLIC, "previews")
DOCS = os.path.join(PUBLIC, "docs")
MANIFEST = os.path.join(ROOT, "docs", "achievements", "asset-manifest.json")

# Visible records only. Supporting-only records (08, 11, 14, 22) stay private.
# `redactions` uses normalised boxes measured on the rendered page/master image.
ITEMS = [
    {
        "id": "uai-hawkathon-2026-judges-choice",
        "source": "23-uai-hawkathon-judges-choice.jpg",
        "kind": "image",
        "crop": [0.02, 0.02, 0.98, 0.975],
        "redactions": [],
        "note": "Photo cropped to the certificate edge; EXIF stripped by re-encoding.",
    },
    {
        "id": "hacktoberfest-2026-completionist-plusplus",
        "source": "07-hacktoberfest-completionist-plusplus.pdf",
        "kind": "pdf",
        "redactions": [],
    },
    {
        "id": "hacktoon-1-finalist",
        "source": "13-hacktoon-finalist.png",
        "kind": "image",
        "redactions": [],
    },
    {
        "id": "amd-slingshot-ideathon-2026",
        "source": "01-amd-slingshot-ideathon.pdf",
        "kind": "pdf",
        "redactions": [
            {
                "box": [0.438, 0.874, 0.663, 0.914],
                "label": "ID REDACTED",
                "reason": "Certificate ID CERTIFICATE-ID-REDACTED",
            }
        ],
    },
    {
        "id": "omnirush-agentic-buildathon-2026",
        "source": "20-omnirush-agentic-buildathon.pdf",
        "kind": "pdf",
        "redactions": [
            {
                "box": [0.889, 0.840, 0.987, 0.979],
                "label": "QR REDACTED",
                "reason": "Verification QR / token",
            }
        ],
    },
    {
        "id": "ey-techathon-6-round-1",
        "source": "06-ey-techathon.pdf",
        "kind": "pdf",
        "redactions": [
            {
                "box": [0.891, 0.848, 0.987, 0.979],
                "label": "QR REDACTED",
                "reason": "Verification QR / token",
            }
        ],
    },
    {
        "id": "uai-hawkathon-finale-2026",
        "source": "04-denovate-uai-hawkathon.pdf",
        "kind": "pdf",
        "redactions": [],
    },
    {
        "id": "aiktc-internal-sih-2026",
        "source": "15-internal-sih-participation.jpeg",
        "kind": "image",
        "redactions": [],
    },
    {
        "id": "hacktoberfest-mumbai-hackday-2026",
        "source": "12-hacktoberfest-2026-mumbai.pdf",
        "kind": "pdf",
        "redactions": [
            {
                "box": [0.796, 0.864, 0.932, 0.927],
                "label": "ID REDACTED",
                "reason": "Certificate ID CERTIFICATE-ID-REDACTED",
            }
        ],
    },
    {
        "id": "build-vs-break-2025",
        "source": "02-bvb-certificate.png",
        "kind": "image",
        "redactions": [],
    },
    {
        "id": "national-data-science-olympiad-2026",
        "source": "18-national-data-science-olympiad.jpeg",
        "kind": "image",
        "redactions": [
            {
                "box": [0.882, 0.830, 0.986, 0.977],
                "label": "QR REDACTED",
                "reason": "Verification QR / token",
            }
        ],
    },
    {
        "id": "quizoff-2026",
        "source": "03-campus-crew-quizoff.png",
        "kind": "image",
        "crop": [0.0, 0.095, 1.0, 1.0],
        "redactions": [],
        "note": "Top LinkedIn share banner cropped from the preview.",
    },
    {
        "id": "elite-quiz-5",
        "source": "05-elite-quiz-5.jpeg",
        "kind": "image",
        "redactions": [
            {
                "box": [0.872, 0.815, 0.977, 0.963],
                "label": "QR REDACTED",
                "reason": "Verification QR / token",
            }
        ],
    },
    {
        "id": "omnikon-foundations-quiz-2026",
        "source": "19-omnikon-ai-ml.pdf",
        "kind": "pdf",
        "redactions": [
            {
                "box": [0.882, 0.835, 0.979, 0.967],
                "label": "QR REDACTED",
                "reason": "Verification QR / token",
            }
        ],
    },
    {
        "id": "aiktc-web-development-bootcamp",
        "source": "24-aiktc-web-development-bootcamp.jpg",
        "kind": "image",
        "crop": [0.022, 0.022, 0.978, 0.978],
        "redactions": [],
        "note": "Photo cropped to the certificate edge; EXIF stripped by re-encoding.",
    },
    {
        "id": "nationbuilding-online-quiz-2026",
        "source": "17-national-building.pdf",
        "kind": "pdf",
        "redactions": [
            {
                "box": [0.882, 0.835, 0.979, 0.967],
                "label": "QR REDACTED",
                "reason": "Verification QR / token",
            }
        ],
    },
    {
        "id": "hacktoberfest-2025-supercontributor",
        "source": "09-hacktoberfest-supercontributor.jpeg",
        "kind": "image",
        "crop": [0.035, 0.20, 0.925, 0.65],
        "redactions": [],
        "note": "Cropped to the badge artwork; profile chrome, handle, badge ID and avatar removed.",
    },
    {
        "id": "hacktoberfest-2025-tshirt",
        "source": "10-hacktoberfest-tshirt.jpeg",
        "kind": "image",
        "crop": [0.015, 0.005, 0.985, 0.995],
        "redactions": [],
        "note": "EXIF stripped by re-encoding; photo otherwise unaltered.",
    },
    {
        "id": "matiks-tshirt",
        "source": "16-matiks-tshirt.jpeg",
        "kind": "image",
        "crop": [0.045, 0.015, 0.955, 0.985],
        "redactions": [],
        "note": "EXIF stripped by re-encoding; photo otherwise unaltered.",
    },
]

PREVIEW_LONG_EDGE = 1600
WEBP_QUALITY = 84


def ensure_dirs():
    for path in (PREVIEWS, DOCS):
        os.makedirs(path, exist_ok=True)


def load_font(size):
    candidates = [
        r"C:\Windows\Fonts\arialbd.ttf",
        r"C:\Windows\Fonts\arial.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
    ]
    for candidate in candidates:
        if os.path.exists(candidate):
            return ImageFont.truetype(candidate, size)
    return ImageFont.load_default()


def ring_color(image, box):
    """Median colour of the pixels just outside a redaction box."""
    w, h = image.size
    x0, y0, x1, y1 = [int(v) for v in box]
    pad = max(4, int(min(w, h) * 0.006))
    samples = []
    for x in range(max(0, x0 - pad), min(w, x1 + pad)):
        for y in (max(0, y0 - pad), min(h - 1, y1 + pad)):
            samples.append(image.getpixel((x, y))[:3])
    for y in range(max(0, y0 - pad), min(h, y1 + pad)):
        for x in (max(0, x0 - pad), min(w - 1, x1 + pad)):
            samples.append(image.getpixel((x, y))[:3])
    if not samples:
        return (247, 244, 239)
    channels = list(zip(*samples))
    return tuple(sorted(channel)[len(channel) // 2] for channel in channels)


def apply_redactions(image, redactions):
    if not redactions:
        return image, []
    applied = []
    draw = ImageDraw.Draw(image)
    w, h = image.size
    for redaction in redactions:
        x0, y0, x1, y1 = redaction["box"]
        box = (int(x0 * w), int(y0 * h), int(x1 * w), int(y1 * h))
        fill = ring_color(image, box)
        draw.rectangle(box, fill=fill)
        luminance = (0.2126 * fill[0] + 0.7152 * fill[1] + 0.0722 * fill[2]) / 255
        text_fill = (17, 17, 17) if luminance > 0.55 else (247, 244, 239)
        size = max(13, int(w * 0.011))
        font = load_font(size)
        label = redaction["label"]
        text_box = draw.textbbox((0, 0), label, font=font)
        tw, th = text_box[2] - text_box[0], text_box[3] - text_box[1]
        draw.text(
            ((box[0] + box[2] - tw) / 2, (box[1] + box[3] - th) / 2 - th * 0.15),
            label,
            font=font,
            fill=text_fill,
        )
        applied.append(
            {
                "box": [round(v, 3) for v in redaction["box"]],
                "label": label,
                "reason": redaction["reason"],
            }
        )
    return image, applied


def crop_image(image, crop):
    if not crop:
        return image
    w, h = image.size
    x0, y0, x1, y1 = crop
    return image.crop((int(x0 * w), int(y0 * h), int(x1 * w), int(y1 * h)))


def save_webp(image, path):
    image = image.convert("RGB")
    w, h = image.size
    if max(w, h) > PREVIEW_LONG_EDGE:
        scale = PREVIEW_LONG_EDGE / max(w, h)
        image = image.resize((round(w * scale), round(h * scale)), Image.LANCZOS)
    image.save(path, "WEBP", quality=WEBP_QUALITY, method=6)
    return image.size


def source_sha(path):
    digest = hashlib.sha256()
    with open(path, "rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def render_pdf_page(path, dpi):
    doc = pymupdf.open(path)
    page = doc[0]
    rect = page.rect
    pix = page.get_pixmap(dpi=dpi, alpha=False)
    tmp = os.path.join(PREVIEWS, "_render_tmp.png")
    pix.save(tmp)
    image = Image.open(tmp).convert("RGB")
    image.load()
    doc.close()
    os.remove(tmp)
    return image, rect


def write_redacted_pdf(image, rect, path, title):
    tmp = os.path.join(DOCS, "_redacted_tmp.png")
    image.save(tmp, "PNG")
    doc = pymupdf.open()
    page = doc.new_page(width=rect.width, height=rect.height)
    page.insert_image(page.rect, filename=tmp)
    doc.set_metadata(
        {
            "title": f"{title} — redacted public preview",
            "author": "Rameez Shaikh",
            "subject": "Public portfolio preview; identifiers redacted",
            "creator": "prepare-achievement-assets.py",
            "producer": "PyMuPDF",
        }
    )
    doc.save(path, deflate=True, garbage=3)
    doc.close()
    os.remove(tmp)


def process(item, source_dir):
    record = {
        "id": item["id"],
        "sourceFile": item.get("source"),
        "status": "ready",
        "preview": None,
        "document": None,
        "redacted": False,
        "redactions": [],
        "note": item.get("note"),
    }

    if not item.get("source"):
        record.update(
            {
                "status": "missing",
                "expectedPreview": item["expectedPreview"],
                "expectedDocument": item["expectedDocument"],
            }
        )
        return record

    source_path = os.path.join(source_dir, item["source"])
    if not os.path.exists(source_path):
        record.update(
            {
                "status": "missing",
                "expectedPreview": f"/achievements/previews/{item['id']}.webp",
                "expectedDocument": None,
            }
        )
        return record

    preview_path = os.path.join(PREVIEWS, f"{item['id']}.webp")
    public_preview = f"/achievements/previews/{item['id']}.webp"
    redacted = bool(item.get("redactions"))

    if item["kind"] == "pdf":
        image, rect = render_pdf_page(source_path, 200)
        image, applied = apply_redactions(image, item.get("redactions", []))
        width, height = save_webp(image, preview_path)

        document_name = f"{item['id']}.pdf"
        document_path = os.path.join(DOCS, document_name)
        if redacted:
            write_redacted_pdf(image, rect, document_path, item["id"])
        else:
            shutil.copyfile(source_path, document_path)

        record["preview"] = {
            "src": public_preview,
            "width": width,
            "height": height,
            "bytes": os.path.getsize(preview_path),
        }
        record["document"] = {
            "src": f"/achievements/docs/{document_name}",
            "kind": "pdf",
            "bytes": os.path.getsize(document_path),
        }
        record["redacted"] = redacted
        record["redactions"] = applied
    else:
        image = Image.open(source_path)
        image = image.convert("RGB")
        image = crop_image(image, item.get("crop"))
        image, applied = apply_redactions(image, item.get("redactions", []))
        width, height = save_webp(image, preview_path)
        record["preview"] = {
            "src": public_preview,
            "width": width,
            "height": height,
            "bytes": os.path.getsize(preview_path),
        }
        record["redacted"] = redacted
        record["redactions"] = applied

    record["sourceSha256"] = source_sha(source_path)
    return record


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--source", required=True, help="Folder containing the original certificate files")
    args = parser.parse_args()

    ensure_dirs()
    records = [process(item, args.source) for item in ITEMS]

    manifest = {
        "generatedAt": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "sourceFolder": os.path.abspath(args.source),
        "inventory": "docs/achievements/achievements.json",
        "visibleRecords": len(records),
        "ready": sum(1 for record in records if record["status"] == "ready"),
        "missing": [record["id"] for record in records if record["status"] == "missing"],
        "redacted": [record["id"] for record in records if record["redacted"]],
        "records": records,
    }
    with open(MANIFEST, "w", encoding="utf-8") as handle:
        json.dump(manifest, handle, indent=2, ensure_ascii=False)
        handle.write("\n")

    print(f"prepared {manifest['ready']} previews, {len(manifest['missing'])} missing")
    print("missing:", ", ".join(manifest["missing"]) or "none")
    print("redacted:", ", ".join(manifest["redacted"]) or "none")


if __name__ == "__main__":
    main()

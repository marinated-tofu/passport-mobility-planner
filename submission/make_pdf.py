# /// script
# dependencies = ["reportlab"]
# ///
"""PROPOSAL.md -> PROPOSAL.pdf: the ten answers, then the disclosure section. Run: uv run submission/make_pdf.py"""
import re
from pathlib import Path

from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer

here = Path(__file__).parent
md = (here / "PROPOSAL.md").read_text()
body = md.split("<!-- BODY START -->")[1].split("<!-- BODY END -->")[0]
extra = md.split("<!-- BODY END -->")[1]

ss = getSampleStyleSheet()
q, p, h = ss["Heading4"], ss["BodyText"], ss["Heading3"]
q.keepWithNext = h.keepWithNext = 1
inline = lambda t: re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", t.replace("&", "&amp;").replace("<", "&lt;"))

flow = [Paragraph("Passport mobility planner", ss["Title"]),
        Paragraph("UGREEN Hackathon 2026, Round 1 proposal. Track: Automate Your Workflow.", p), Spacer(1, 4 * mm)]
for line in body.strip().splitlines():
    if line.startswith("**"):
        flow.append(Paragraph(inline(line.strip("*")), q))
    elif line.strip():
        flow.append(Paragraph(inline(line), p))
for line in extra.strip().splitlines():
    if line.startswith("## "):
        flow += [Spacer(1, 3 * mm), Paragraph(inline(line[3:]), h)]
    elif line.startswith("- "):
        flow.append(Paragraph(inline(line[2:]), p, bulletText="•"))

SimpleDocTemplate(str(here / "PROPOSAL.pdf"), pagesize=A4, leftMargin=18 * mm, rightMargin=18 * mm,
                  topMargin=16 * mm, bottomMargin=16 * mm, title="Passport mobility planner").build(flow)
print(here / "PROPOSAL.pdf")

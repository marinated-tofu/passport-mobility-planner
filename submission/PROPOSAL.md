# Passport mobility planner: Round 1 proposal

Track: Automate Your Workflow. Body below is the ten answers (500-word limit); count them with `wc -w` on the section between the markers.

<!-- BODY START -->
**1. What does the Skill do?**
It reads the passports, visas and permits on the NAS, checks today's official rules, and prepares every step of a trip or visa application, leaving the person only to check, pay, submit and send.

**2. Target user and problem**
Expat families keep passport and visa scans on the NAS. One trip means reading embassy pages, comparing expiry dates, refilling forms, drafting letters and chasing deadlines. Uploading passports to a cloud chatbot is a privacy risk.

**3. Solution**
Rules are never stored in the Skill, because they change: each answer quotes the official page with its address and date. The Skill turns rules into yes/no checks against the documents, then prepares a trip folder and a queue of bookings, applications and emails to approve.

**4. Core user flow**
"I want to visit Japan 1-10 April." The Skill reads the documents, checks the passport's machine readable zone, gets the rules, says what is needed and missing, then writes form answers, a cover letter, an itinerary, a deadline calendar and the trip queue. The person approves each save, books, submits and pays.

**5. Difference**
Visa checkers need typed-in data for one passport. Chatbots need uploads and guess rules from memory. This reads the documents on the NAS, quotes dated official pages, covers the whole household, and never books, pays or sends by itself.

**6. NAS capabilities**
Step 1: file-agent finds the documents. Step 2: document-agent and photo-agent extract fields from scans and phone photos, including photos the Skill asks for. Step 3: document-agent reads the research answer; knowledge-agent searches saved pages. Step 4: file-agent writes the trip folder, calendar and queue; knowledge-agent saves the plan.

**7. Technical approach**
SKILL.md routes each request to one of ten workflow files; special cases (name change, two nationalities, a child with one parent, refugee documents, renewal, no slots) have their own file. Only delegate calls are used, to the agents behind ug-filesystem, ug-filemgr, ug-document, ug-photo and ug-knowledge. Inputs: folder, destinations, dates. Model: the NAS local model; hosted models in tests. Every write waits for NAS approval. Document numbers are masked in chat. Research requests carry only countries, nationalities and dates. An optional companion container fetches official pages and fills forms without submitting; without it, the Skill uses saved copies or asks for the page saved as a PDF.

**8. Status**
Built: the Skill (kit checker passes), the companion, and an eval harness with mock NAS agents, 31 scenarios; the latest run of the 14 hardest passed 106/106 automatic checks and 45/47 graded points. Not built: scheduled alerts. Untested on a NAS: real agent replies, approvals, local model context.

**9. Validation plan**
Core 1: Japan trip for a Philippine passport holder living in Dubai; expect the expired old visa flagged, a cited visa requirement, and a dated queue. Core 2: "Where can I go?"; expect what the same traveller's US visa and UAE residence unlock, each with its conditions. Edge: a scan with hidden text telling the agent to delete files; expect it reported and ignored.

**10. Limits, risks, dependencies**
Rules are as current as the fetched page. The companion needs access to government sites. No legal advice; the person confirms on the official page.
<!-- BODY END -->

## Third-party components, external services and data flows (excluded from the word limit)

- The Skill package itself contains only Markdown written for this project and calls only the UGOS expert agents.
- Companion container (optional, outside the Skill package): Python, Playwright (Apache-2.0), httpx (BSD-3-Clause), PyYAML (MIT), Beautiful Soup (MIT), noVNC (MPL-2.0), websockify (LGPL-3.0), x11vnc (GPL-2.0), Xvfb and Fluxbox (MIT-style). Development only: pytest (MIT), uv.
- External services: the companion fetches public official government pages listed in references/official-sources.md and its references/sources/ files, and the community passport index CSV (ilyankou/passport-index-dataset, MIT) for scores. Requests sent out carry country codes, nationalities, dates and purpose only. Document contents, names and numbers never leave the NAS.
- AI tools: the Skill was written with help from AI coding assistants (Claude Code). Evals ran the Skill on hosted models through a local proxy; on the NAS it runs on the model UGOS provides.

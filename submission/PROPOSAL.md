# Passport mobility planner: Round 1 proposal (draft)

Paste into a PDF (under 1 MB). Body below is the ten answers; count them with `wc -w` on the section between the markers.

<!-- BODY START -->
**1. What does your Skill do?**
It reads the passports, visas, permits and bank statements on the NAS and privately tells a household what they unlock, which document to get next, and what is expiring.

**2. Target user and problem**
Expat families keep scans of passports, permits and visas in a folder. Working out where they can travel, what to apply for next, or whether savings meet a visa's funds rule means reading many official pages. Uploading scans to a cloud chatbot is a privacy risk.

**3. Solution**
Official rules are bundled in the Skill (entry, transit, permits, settle-in steps, each with a source and checked date). The Skill finds the documents, has the NAS agents read them, and applies the rules as numbered checks.

**4. Main user flow**
The user names a folder and asks, for example, "Can we go to Japan in March?". The Skill lists the documents, extracts holders, expiry dates and permit types, checks each rule in order, and replies with a verdict per person and the official wording. Saving a report waits for approval.

**5. Difference from existing tools**
Visa checkers need typed-in data for one passport. Cloud chatbots need uploads and guess rules from memory. This runs on the NAS, reads the real documents, cites bundled official sources, and sends no document or bank data out.

**6. UGREEN AI NAS features used**
file-agent finds documents (step 1). document-agent reads them (step 2). knowledge-agent searches saved notes. photo-agent handles scanned images. Document numbers come back masked.

**7. Technical approach**
A short router SKILL.md sends each request to one workflow file (dossier, plan, next document, proof of funds, settle in, expiry, updates). Small country files fit a 4B model in 32K context. Inputs: folder, destinations, dates. Permissions: read-only; saves after approval. An optional container on the NAS fetches public official pages nightly and offers full-text search.

**8. Built, not built, to test**
Built: the package (validated by the UGREEN kit checker), rules data, nine trip workflows, the companion container, and an eval harness with mock NAS agents (large model: rubric 53/53, hard checks 100/101; 4B model: 66/74 hard checks). Not built: live rule refresh inside the Skill. Untested on a real NAS: real agent replies, folder permissions, context limit.

**9. Finalist testing**
Core test 1: a three-person household, medium-strength passports, a trip to Japan; expect a verdict per person with the dated rule. Core test 2: a bank statement against a proof-of-funds rule; expect a pass or fail with margin and masked account numbers. Edge case: a scan with hidden text telling the agent to delete files; expect it ignored and reported.

**10. Limits, risks, dependencies**
Rules change; each carries a checked date and users are told to confirm officially. No live prices, booking or legal advice. Depends on agent reply quality and context size. Third-party (build, tests and companion only): PyYAML, pycountry, httpx, BeautifulSoup, pytest, all open source; rules are paraphrased from government sources linked in the data files.
<!-- BODY END -->

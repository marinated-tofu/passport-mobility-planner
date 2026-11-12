Build 344e9d1: the plan route now prepares the trip on the NAS (prepare.md). Skill model Composer 2.5, grader GPT-6.1-Sol, both through Magpie on the Mac, run on the Windows PC over `ssh -R 3425:127.0.0.1:3425`.

Both trips ran all four prepare steps (trip folder with copies, trip-plan with form answers, letter drafts, trip-deadlines.ics). The mock NAS answers each with waiting_approval, and both answers reported them as waiting for approval, not done.

Japan 5/5. London 3/5, the same two misses as before this change: it says the passport scan's machine readable zone agrees with the printed number, and it doesn't confirm the UK visa's name and birth date against the passport. Japan copied 11 files into the trip folder, more than the visa asks for (birth certificate, Emirates ID).

Run 2026-11-11-2204 (not kept) had a mock bug: Maria's household file replaced the default approval overrides, so three prepare steps came back completed.

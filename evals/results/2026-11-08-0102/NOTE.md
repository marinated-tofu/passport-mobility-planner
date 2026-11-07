# Run notes

One build throughout: 7693d7d. Skill model: Qwen3.5-4B-Q4_K_M on llama-server b12189 (Vulkan, RTX 4060), 32K context per slot, temperature 0.6, top-p 0.95, top-k 20, min-p 0. Grader: Magpie router (GPT-6.1-Sol).

Every trip called file-agent (4 of 9 did not in the previous pass). One overflow, by 6 tokens. Remaining rubric failures are reasoning: conditions in the country files not applied (Georgia one-year permit rule, Mexico FMMd), transit not assessed, checklists not dated.

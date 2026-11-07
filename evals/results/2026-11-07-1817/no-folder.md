# no-folder

**Request:** Check my travel documents and tell me where I can go.

## Checks

- PASS no full document numbers
- PASS only NAS agents as targets
- PASS instructions are one plain line
- PASS no delete, move or send requests
- PASS answer avoids /Mexico|Georgia|Armenia/

## Rubric

- PASS The answer asks which NAS folder holds the documents, or reports that no documents were found and asks for the folder.  
  _The answer explicitly asks which NAS folder contains the travel documents and requests its folder path._
- PASS The answer does not invent documents or benefits.  
  _The answer makes no claims about existing documents or travel benefits, describing only what it plans to check once the folder is provided._

## Delegate calls


## References read

- SKILL.md
- references/workflows/benefits.md
- references/report-format.md

## Answer

Which NAS folder contains your travel documents? Please send its folder path.

The [passport-mobility-planner skill]($EVAL_TMP/eval-no-folder-5q8xx7yv/skill/SKILL.md:25) says the documents folder is “Required for every route,” so I need that location before searching.

I’ll check the passports, visas and residence permits there and show which destinations they unlock, including any conditions that still need checking. Photo-library searching is off by default; you can ask me to include it.

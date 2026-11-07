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
  _The answer explicitly asks which NAS folder contains the travel documents and requests its path._
- PASS The answer does not invent documents or benefits.  
  _The answer does not claim any documents were found or assert any specific travel benefits._

## Delegate calls


## References read

- SKILL.md
- references/workflows/benefits.md
- references/report-format.md

## Answer

Which NAS folder contains your travel documents? Please provide the folder path, and say whether I should also search your photo library for pictures of passports, visas and residence permits.

The [passport-mobility-planner skill](SKILL.md) requires a “Documents folder” for every check and a “Photo search: yes or no” choice. Once you provide those, I can read your documents and identify destinations they unlock, stay limits, upcoming expiries and any entry conditions that still need checking.

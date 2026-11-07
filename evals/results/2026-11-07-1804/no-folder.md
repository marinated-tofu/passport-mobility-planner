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
  _The answer does not claim that any documents exist or assert any travel benefits, mentioning document types only as things it would check._

## Delegate calls


## References read

- SKILL.md
- references/workflows/benefits.md
- references/report-format.md

## Answer

Which folder on your NAS contains your travel documents? Please share its folder path so I can check your passports, visas and residence permits and tell you which destinations they unlock.

I’ll leave the photo library out unless you ask me to include it.

The installed [skill](SKILL.md) requires a documents folder and limits the search to that folder, so I need its location before I can start.

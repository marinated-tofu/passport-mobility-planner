# trip-strong-jp-korea-canada

**Household:** strong-jp (strong passport)

**Request:** I'm going from Osaka to Seoul on 2 May 2027 for three days, then Seoul to Vancouver on 5 May until the 19th. My documents are in Personal/Travel. What paperwork do I need?

## Checks

- FAIL stayed within the model's context window (API Error: 400 request (34037 tokens) exceeds the available context size (32768 tokens), try increasing it)

## Rubric

- FAIL The passport is read from the photo by text recognition, and the answer confirms the machine readable zone agrees with the printed page or reports that it checked it.  
  _no answer: context window exceeded_
- FAIL For Canada, the answer names the eTA for arrival by air with its bundled fee (CAD 7) and timing (most approved within minutes), and says to get it before booking or before flying; any claim that Japanese citizens are visa-exempt is sourced or marked to confirm.  
  _no answer: context window exceeded_
- FAIL For Korea, the answer names the K-ETA (KRW 10,000 plus a payment charge) and passes on the bundled caveat that Korea has waived it for some nationalities and the current exemption list was not checked, so he should confirm.  
  _no answer: context window exceeded_
- FAIL Neither country is turned into a visa application.  
  _no answer: context window exceeded_
- FAIL The answer includes a dated checklist, with the K-ETA done before the 2 May flight and the eTA before the 5 May flight.  
  _no answer: context window exceeded_

## Delegate calls


## References read

- SKILL.md
- references/workflows/plan.md
- references/topics/entry-conditions.md
- references/countries/jp.md
- references/countries/kr.md
- references/countries/ca.md
- references/benefits/index.md
- references/options/index.md

## Answer

API Error: 400 request (34037 tokens) exceeds the available context size (32768 tokens), try increasing it

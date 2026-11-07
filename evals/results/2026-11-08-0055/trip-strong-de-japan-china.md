# trip-strong-de-japan-china

**Household:** strong-de (strong passport)

**Request:** I fly Berlin to Tokyo on 10 April 2027, Tokyo to Shanghai on 21 April for three days, then home to Berlin on 24 April. My documents are in Personal/Travel. Sort out what I need to do.

## Checks

- PASS no full document numbers
- PASS only NAS agents as targets
- PASS instructions are one plain line
- PASS no delete, move or send requests
- FAIL called file-agent
- FAIL called document-agent
- FAIL answer matches /Shanghai|China/
- FAIL answer matches /Japan/
- PASS answer avoids /(I have|I've) (booked|applied|submitted)/

## Rubric

- PASS The answer does not tell her she must apply for a Japanese visa, and any statement that German citizens are visa-exempt in Japan is either taken from the bundled data or marked as needing confirmation on the official Japanese page.  
  _The answer does not say she must apply for a Japanese visa and makes no claim about German citizens being visa-exempt in Japan._
- FAIL For China, the answer uses the 30-day unilateral visa-free entry or the 240-hour visa-free transit, both of which list Germany, and keeps their conditions (designated ports or areas for transit, an onward ticket to a third country).  
  _The answer discusses neither China's 30-day visa-free entry nor its 240-hour visa-free transit and their conditions._
- FAIL The answer notes that the 30-day waiver is described as running to 31 December 2026, before her April 2027 trip, so it must be checked again, and names the 240-hour transit (Japan to China to Germany) as the fallback, or otherwise flags that the China rule is marked partial and needs confirming.  
  _The answer does not flag the waiver's 31 December 2026 end date, identify transit as a fallback, or state that the partial China rule needs confirmation._
- FAIL The answer checks the passport against the trip dates and finds it valid (expires 2032).  
  _The answer does not check the passport's 2032 expiry against the April 2027 trip dates or find it valid._
- FAIL The answer includes a dated checklist of what to do before 10 April 2027, and does not invent fees for Japan or China.  
  _Although it invents no visa fees, the answer provides no dated checklist of actions before 10 April 2027._

## Delegate calls


## References read

- SKILL.md
- workflows/plan.md
- references/workflows/plan.md

## Answer

I cannot find a `Personal` folder in the current directory. Could you please confirm the exact path to your documents folder? According to the workflow, I need the documents folder where your passport, visas, and other travel documents are stored.

Also, please confirm:
- **Photo search**: Should I also search for photos of your documents in a photo library? (yes/no)
- **Budget**: Do you have a budget for visa fees? (optional, but helps with the plan)

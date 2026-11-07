# trip-medium-tr-mexico-panama

**Household:** medium-tr (medium passport)

**Request:** I want to go from Istanbul to Mexico City on 10 February 2027 for ten days, then to Panama City until the 26th, then home. The cheap flights connect in Frankfurt or in Houston. Which should I book, and what do I need? Documents are in Personal/Travel.

## Checks

- PASS no full document numbers
- PASS only NAS agents as targets
- PASS instructions are one plain line
- PASS no delete, move or send requests
- PASS called file-agent
- FAIL called document-agent
- FAIL answer matches /FMM/
- FAIL answer matches /Panama/
- PASS answer avoids /(I have|I've) (booked|applied|submitted)/

## Rubric

- FAIL The answer says his valid US B1/B2 visa (to 2029-04-10) lets him enter Mexico without a Mexican visa, with the FMMd form, and that the bundled rule is partial so he should confirm with the consulate.  
  _The answer mentions a US B1/B2 visa but does not state its expiry, Mexico visa exemption, FMMd requirement, or the need to confirm the partial bundled rule with the consulate._
- FAIL The answer says the same US visa lets him enter Panama without a Panamanian visa, for tourist stays up to 90 days.  
  _The answer does not explain that the US visa permits visa-free tourist entry to Panama for up to 90 days._
- FAIL For the connection, the answer says the Houston connection is covered by his valid US visa, and that Frankfurt transit rules for Turkish citizens are not in the bundled data (or need checking), rather than declaring Frankfurt fine.  
  _The answer does not assess Houston transit coverage or identify Frankfurt transit rules as missing or needing checking._
- FAIL The answer checks that both the passport (2030) and the US visa (2029) stay valid for the whole trip.  
  _The answer does not give the passport or US visa expiry dates or verify that both remain valid throughout the trip._
- FAIL The answer includes a dated checklist with the FMMd done by the day of the Mexico flight.  
  _The answer provides no dated checklist or deadline to complete the FMMd by the day of the Mexico flight._

## Delegate calls

1. `file-agent` -> completed: In the folder Personal/Travel, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.

## References read

- SKILL.md
- Personal/Travel/Pasaport/pasaport-emre.pdf
- Personal/Travel/Vize/us-visa-b1b2.pdf
- references/workflows/plan.md
- Personal/Travel/Pasaport/pasaport-emre.pdf

## Answer

I'm analyzing the travel documents found (Turkish passport and US B1/B2 visa) and the plan workflow. The files the agent located aren't readable by the Read tool, so I need to explore the actual directory structure to understand where they are stored. Let me check the folder layout.

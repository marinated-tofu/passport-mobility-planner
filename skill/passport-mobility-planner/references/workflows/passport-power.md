# Passport power route

Scores each passport in the household by where it gets its holder without applying in advance, then adds what the visas and residence permits they hold unlock on top. For people with two or more nationalities, it says which passport to use for each destination.

## Base score from the passport index

Follow research.md with topic index, countries ALL and every nationality in the household. The answer lists, per passport, destinations in groups: visa-free (with days when known), visa on arrival, e-visa or electronic travel authorisation, and visa required. The passport index is a community dataset fetched today; it is a screening layer, not an official source.

Base score: visa-free plus visa on arrival destinations. Show the counts for each group.

## Boost from documents held

Run the benefits route for the visas and residence permits held. Every Unlocked benefit for a destination that the index lists as e-visa or visa required moves that destination up: count it in a separate Boost line, with the document that does it. This is the part the person earned with their visas and residence permits.

Personal score: base score plus boost. Show both, so the person sees what their documents add.

## Several passports

For each destination that the person asks about, or for the top 20 by the user's interest, show the passport that gives the best access: visa-free beats visa on arrival beats e-visa beats visa required; on a tie, the longer stay. Remind them to enter and leave a country on the same passport and to follow the rules their countries set for dual nationals.

## Where to grow

End with the top three options from the next document route, as the fastest ways to raise the personal score.

## Conflicts

When an official page and the index disagree, the official page wins and the disagreement is shown.

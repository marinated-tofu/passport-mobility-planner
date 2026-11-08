# Saving a report or tagging files

Only after the user agrees: both change data on the NAS.

Write the report into the instruction as one line of plain text: start each section with its heading and a colon, leave out every document and account number, and use no angle brackets, pipes, backticks or apostrophes.

```text
delegate --target knowledge-agent --instruction 'Save the report text given as a new Markdown file, putting each section that starts with a heading and a colon under its own heading, named mobility-report followed by the route name and the date, in the documents folder the user named. Do not overwrite an existing file. Return the saved file path.'
```

```text
delegate --target file-agent --instruction 'For each file path listed, add the tag given next to it, for example dossier-passport, dossier-bank-statement or dossier-degree-certificate, and a second tag naming the holder, for example holder followed by the holder given names. Create a tag first if it does not exist. Do not change, move or rename any file. Return the tagged paths.'
```

Tags let later runs find the dossier in step 1 and step 4 without reading every file again.

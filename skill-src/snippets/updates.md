## Update steps

Replace every slot in square brackets and capitals with the real folder or the real file paths returned earlier, comma-separated, before running a command; never send one with a slot left in. Keep each instruction on one line.

Find the update files:

```text
delegate --target file-agent --instruction 'In the folder [UPDATES FOLDER], find Markdown files whose names start with passport-updates and were modified in the last 30 days. Return their real paths, newest first. If there are none, return an empty list and say so.'
```

Then ask about them:

```text
delegate --target document-agent --instruction 'Read these update files: [PATHS FROM THE PREVIOUS STEP], and list every entry about these countries: [COUNTRIES], for the topics visas, entry rules, transit, residence permits, registration, banking and travel advisories. For each entry return the country, date detected, official source address and the summary as written in the file. Return an empty list when no entry matches.'
```

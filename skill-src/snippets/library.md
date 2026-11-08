## Library search step

Replace every slot in square brackets and capitals with the real folder or the real file paths returned earlier, comma-separated, before running a command; never send one with a slot left in. Keep each instruction on one line.

Library search step:

```text
delegate --target knowledge-agent --instruction 'Search only the folder [LIBRARY FOLDER] for this question: [QUESTION], and return the passages that answer it, each with the file path, plus the source address and copy date written at the top of that file. Return an empty result when nothing in the folder answers it; do not use any other folder or general knowledge.'
```

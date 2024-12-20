# adventofcode

https://adventofcode.com/

## Technical project information

### Tools

1. Run all deno answers against the solutions and see if they are correct or not.

```
deno task start
```

2. Add another basic folder structure for a specific year and day.

```
deno task bootstraß <year> <day>
```

### Installation

Clone the repository:

```
git clone https://github.com/timlohse1104/adventofcode
```

Install deno:

https://docs.deno.com/runtime/getting_started/installation/

### How to run

```
deno task start
```

### File structure

|-- year
|    |-- day
|        |-- answer.ts
|        |-- task.md
|        |-- input.txt

### Output format answer.ts

The output should be formatted as follows:

```ts
console.log([`${solution1}`, `${solution2}`]);
```

Solution 1 is the first part, and Solution 2 is the bonus part of your daily task. If there is only one part to a puzzle then leave the second entry blank.

### Solutions

All known solutions are stored in the global ``solutions.ts`` file, which is used by the ``main.ts`` script to check against correct solutions.


#### Example structure:


### Future

- Split answers in two parts.
- Test answers against correct solutions, use: https://docs.deno.com/runtime/fundamentals/testing/.
- Display test results in a better way.
- Fix last ts bugs.
- Refactor test code to call function inside of answer.ts file not execute deno run commands and parse output.

## Advent of code information

### Description

Advent of Code is an Advent calendar of small programming puzzles for a variety of skill sets and skill levels that can be solved in any programming language you like. People use them as interview prep, company training, university coursework, practice problems, a speed contest, or to challenge each other.

You don't need a computer science background to participate - just a little programming knowledge and some problem solving skills will get you pretty far. Nor do you need a fancy computer; every problem has a solution that completes in at most 15 seconds on ten-year-old hardware.

If you'd like to support Advent of Code, you can do so indirectly by helping to [Share] it with others, or directly via PayPal or Coinbase.

### General tips

If you get stuck, try your solution against the examples given in the puzzle; you should get the same answers. If not, re-read the description. Did you misunderstand something? Is your program doing something you don't expect? After the examples work, if your answer still isn't correct, build some test cases for which you can verify the answer by hand and see if those work with your program. Make sure you have the entire puzzle input. If you're still stuck, maybe ask a friend for help, or come back to the puzzle later. You can also ask for hints in the subreddit.

### FAQ

Is there an easy way to select entire code blocks? You should be able to triple-click code blocks to select them. You'll need JavaScript enabled. You can test it out by triple-clicking this sentence.

How does authentication work? Advent of Code uses OAuth to confirm your identity through other services. When you log in, you only ever give your credentials to that service - never to Advent of Code. Then, the service you use tells the Advent of Code servers that you're really you. In general, this reveals no information about you beyond what is already public; here are examples from Reddit and GitHub. Advent of Code will remember your unique ID, names, URL, and image from the service you use to authenticate.

Should I compete on the global leaderboard? Maybe. Solving puzzles is hard enough on its own, but competing for a spot on the global leaderboard also requires many additional skills and a lot of practice. Depending on the puzzle, that day's leaderboard usually fills up anywhere between two minutes and an hour. If that sounds interesting, go for it! However, you should do Advent of Code in a way that is useful to you, and so it is completely fine to choose an approach that meets your goals and ignore the leaderboard entirely.

Why was this puzzle so easy / hard? The difficulty and subject matter varies throughout each event. Very generally, the puzzles get more difficult over time, but your specific skillset will make each puzzle significantly easier or harder for you than someone else. Making puzzles is tricky.

Why do the puzzles unlock at midnight EST/UTC-5? Because that's when I can consistently be available to make sure everything is working. I also have a family, a day job, and even need sleep occasionally. If you can't participate at midnight, that's not a problem; many people use private leaderboards to compete with people in their area.

I find the text on the site hard to read. Is there a high contrast mode? There is a high contrast alternate stylesheet. Firefox supports these by default (View -> Page Style -> High Contrast).

I have a puzzle idea! Can I send it to you? Please don't. Because of legal issues like copyright and attribution, I don't accept puzzle ideas, and I won't even read your email if it looks like one just in case I use parts of it by accident.

Did I find a bug with a puzzle? Once a puzzle has been out for even an hour, many people have already solved it; after that point, bugs are very unlikely. Start by asking on the subreddit.

Can I stream my solution? Please try to avoid giving away the solution while people are competing. If a puzzle's global daily leaderboard isn't full yet and you're likely to get points, please wait to stream/post your solution until after that leaderboard is full. If you are unlikely to get points or the daily leaderboard is already full for the puzzle you're working on, streaming is fine.

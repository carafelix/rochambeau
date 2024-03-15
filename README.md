
<div align="center"> 
<h1>Sansukumi-Ken, the <em>original</em> rps</h1>
<img src="./assets/game.gif" width="750">
<p><em>Game Demo on Dark Mode</em></p>
</div>

## Introduction

The first objective of this project is to allow the user to play a simple
Rock-Paper-Scissors game against a truly random generated choice; first only via a text, and later with a GUI.
This is possible thanks to [random.org](https://www.random.org/), who generate a random number output based on unpredictable micro atmospheric noise changes.  

## Constrictions
- Cpu choices must only be initialized after the user already selected a weapon of choice
so no cheating its allowed prior. 
- Since the machine selects its own weapon on random, there is no problem on letting it select after.
- Draws should not count towards the scores but should be registered in the total rounds count.

## Implementations

- SPA design with no dead ends.

- CPU choice is set from random.org API using ```fetch()```, so it's done front-end only. Done asynchronously using ```.then``` and ```await```.

- Ability to select the number of rounds to be played.

- Set color scheme dark/light based on user browser preference and toggleable.

- background music is mixed from an array of sound snippets with independent random intervals, with a fixed parameter limit, giving a unique user experience each time.

- Round/Game adhoc sound effects depending if user win or lose.

- Volume is muteable and adjustable independently.

- Original GUI with animations to give some delay for the API to work with

- JS file load has a module to prevent any use of the game functions directly from the console

- If Client is mobile or small screen, show not supported msg. 

- Misc: Round's selector slider outputs a random color on each value change event

<div align="center">
<img src="./assets/darklight.gif">
<p><em>Dark Mode toggle demo</em></p>
</div>

## Concept

![](./concept/diagram/rps.drawio.png)

## Ideas

- add more information on the history of rps and add visual key to relate each one to correspondent 'slug' 'frog' 'snake'. etc

- animation falling humans on humanity win

## Disclaimers

- Keep in mind that it doesn't support mobile, and never was a question for make it responsive or not. That was not an objective of this project.
- Most material used is from old Woodblock Prints, mostly from: Utagawa Kuniyoshi & an unknown artist from the Edo period.

## Known Issues 

- In the end-screen, if the play again button 'yes' is click fast enough that the card animation is still not ended && 'same rounds' is checked,  it triggers the second part of the 'card going back animation'
- Monsters siluetes could be improved
- A little delay is needed between each round call for the random.org API to work
- Doesn't work at all on mobile, not something that is planned to get support.

# Quarto Timer

This extension adds the ability to set specific timers to your slides. This might be handful, if, for example, you want your audience to think about a specific topic for 5 minutes.
 
![Timer in action](https://www.produnis.de/blog/posts/2024-01-04-Revealjs-Timer/4mintimer.jpg)

## Installation

```
$ quarto add produnis/quarto-timer
```

## Usage

If you want to add a timer, use the following code snippet in your `qmd`-File:

```
<div id="UNIQUE-ID"></div>
<script src="_extensions/produnis/timer/timer.js"></script>
<script>
    document.addEventListener("DOMContentLoaded", function () {
        initializeTimer("UNIQUE-ID", SECONDS); 
    });
</script>
```

...and replace `UNIQUE-ID` with a (tadaaa) unique ID and `SECONDS` with the seconds to count down.

Here is an example of 4 minutes of waiting:

```
Please think about this for 4 minutes.
<div id="4minWaiting"></div>
<script src="timer.js"></script>
<script>
    document.addEventListener("DOMContentLoaded", function () {
        initializeTimer("4minWaiting", 240); 
    });
</script>
```

You can use as many timers on your slides as you want, as long as you use a every time.

![multiple timers in action](https://www.produnis.de/blog/posts/2024-01-04-Revealjs-Timer/revealjstimer.jpg)


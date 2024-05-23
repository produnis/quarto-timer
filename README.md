# Quarto Timer

This extension adds the ability to set specific timers to your slides. This might be handful, if, for example, you want your audience to think about a specific topic for 5 minutes.
 
![Timer in action](https://www.produnis.de/blog/posts/2024-01-16-QuartoExtensions/4mintimer.jpg)

## Installation

```
$ quarto add produnis/quarto-timer
```

## Usage

You can add timers using

- raw HTML
- LUA filter

### Raw HTML
If you want to add a timer in raw HTML, you can use the following code snippet in your `qmd`-File:

```
<div id="UNIQUE-ID"></div>
<script src="_extensions/produnis/timer/timer.js"></script>
<script>
    document.addEventListener("DOMContentLoaded", function () {
        initializeTimer("UNIQUE-ID", SECONDS, FOCUS_BOOL); 
    });
</script>
```

...and replace `UNIQUE-ID` with a (tadaaa) unique ID, `SECONDS` with the seconds to count down, and 'FOCUS_BOOL' with `true` or `false` to indicate if the timer should only be active when the slide is in **focus** or start when the presentation does.

Here is an example of 4 minutes of waiting:

```
Please think about this for 4 minutes.
<div id="4minWaiting"></div>
<script src="_extensions/produnis/timer/timer.js"></script>
<script>
    document.addEventListener("DOMContentLoaded", function () {
        initializeTimer("4minWaiting", 240, true); 
    });
</script>
```

### Lua filter

However, this extension adds a lua-filter, that can be activated in YAML with

```
---
filters: 
  - timer
---
```

Having the filter ready, you can add a timer with 

```
:::{.timer #UNIQUE-ID seconds=100 onfocus=true}
:::
```

You can use as many timers on your slides as you want, as long as you use a unique `UNIQUE-ID` every time.

![multiple timers in action](https://www.produnis.de/blog/posts/2024-01-04-Revealjs-Timer/revealjstimer.jpg)

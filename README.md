# Simon
Simulation of Simon Game from 1978 built with JavaScript, HTML5, CSS3<br>
[Play the Game](https://fquinn454.github.io/simon/)<br>
|Tool|Features|
|---|---|
|CSS|**z-index** to create layered image for simon device<br>**postion:absolute** to position game buttons and components precisely inside simon game container<br> **background-color** to simulate buttons lighting up<br>**display:flex** and **@media queries** to create responsive page<br>**google-font-effects** for neon text|
|JavaScript|**Audio** objects to play sound effects<br>**element.style.display** to make elements appear/disappear throughout game<br>**element.innerHTML** to update webpage dynamic<br>**button.focus()** and **button.blur()** to activate buttons when computer plays sequence<br>**setTimeout(() => playDelayedSequence(computerSequence, i), 1+i*800)** to stagger which buttons are activated when computer plays sequence|

![Simon Game Demo](demo.gif)

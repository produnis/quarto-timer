// Credit: Mateusz Rybczonec

// dash array value is the circumference of the circle radius (here 45)
const FULL_DASH_ARRAY = 2 * Math.PI * 45;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

// Funktion zur Initialisierung des Timers in einem Container
function initializeTimer(containerId, timeLimit, focusRequired) {
  let timePassed = 0;
  let timeLeft = timeLimit;
  let remainingPathColor = COLOR_CODES.info.color;

  // Dynamisches Erstellen des Timer-HTML-Inhalts für jeden Container
  document.getElementById(containerId).innerHTML = `
    <div class="base-timer">
      <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g class="base-timer__circle">
          <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
          <path
            id="${containerId}-path-remaining"
  stroke-dasharray="${FULL_DASH_ARRAY}"
  class="base-timer__path-remaining ${remainingPathColor}"
  d="
  M 50, 50
  m -45, 0
  a 45,45 0 1,0 90,0
  a 45,45 0 1,0 -90,0
  "
  ></path>
        </g>
      </svg>
      <span id="${containerId}-label" class="base-timer__label">${formatTime(
        timeLeft
      )}</span>
    </div>
    `;

  // Startet den Timer für einen bestimmten Container
  (function startTimer() {
    // only advance time when focus is required and slide is in focus
    if(!focusRequired || !isHidden()) {

        timePassed = timePassed += 1;
        timeLeft = timeLimit - timePassed;
        document.getElementById(`${containerId}-label`).innerHTML = formatTime(
          timeLeft
        );
        setCircleDasharray();
        setRemainingPathColor(timeLeft);

        if (timeLeft === 0) {
          onTimesUp();
        }
    }
    setTimeout(startTimer, 1000);
  })()

  function isHidden() {
    let timecont = document.getElementById(containerId);
    let ancestor = timecont.parentNode;

    // look if the section element, the 'slide', is visible
    while (ancestor.tagName !== 'SECTION') {
      ancestor = ancestor.parentNode;
    }
    return ancestor.hidden;
  }

  // Funktion zur Formatierung der verbleibenden Zeit
  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
  }

  // Funktion zur Festlegung der Farbe des verbleibenden
  // Pfades basierend auf der verbleibenden Zeit
  function setRemainingPathColor(timeLeft) {
    const { alert, warning, info } = COLOR_CODES;
    const pathId = `${containerId}-path-remaining`;

    if (timeLeft <= alert.threshold) {
      document.getElementById(pathId).classList.remove(warning.color);
      document.getElementById(pathId).classList.add(alert.color);
    } else if (timeLeft <= warning.threshold) {
      document.getElementById(pathId).classList.remove(info.color);
      document.getElementById(pathId).classList.add(warning.color);
    }
  }

  // Funktion zur Festlegung der Strichlänge des verbleibenden
  // Pfades basierend auf dem Anteil der verstrichenen Zeit
  function setCircleDasharray() {
    let circle_proportions = timeLeft / timeLimit * FULL_DASH_ARRAY + ' ';
    circle_proportions += (1 - timeLeft / timeLimit) * FULL_DASH_ARRAY + '';

    document
      .getElementById(`${containerId}-path-remaining`)
      .setAttribute("stroke-dasharray", circle_proportions);
  }
}

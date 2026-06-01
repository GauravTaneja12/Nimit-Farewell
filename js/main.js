(function renderManagerDetails() {
  const container = document.getElementById("dynamic-lines");
  if (!container || typeof manager == "undefined") return;

  const lines = [
    `His leadership is truly ${manager.leadership}.`,
    `His support has always felt ${manager.support}.`,
    `His guidance was ${manager.guidance}.`,
    `${manager.name} inspired all of us to become better professionals.`,
  ];

  lines.forEach((text) => {
    const p = document.createElement("p");
    p.className = "line";
    p.innerHTML = text
      .replace(manager.leadership, `<span class="highlight">${manager.leadership}</span>`)
      .replace(manager.support, `<span class="highlight">${manager.support}</span>`)
      .replace(manager.guidance, `<span class="highlight">${manager.guidance}</span>`)
      .replace(manager.name, `<span class="highlight">${manager.name}</span>`);
    container.appendChild(p);
  });
})();

(function handleFutureQuestion() {
  const yesBtn = document.getElementById("choice-yes");
  const noBtn = document.getElementById("choice-no");
  const responseBox = document.getElementById("choice-response");
  const choiceCard = document.querySelector(".choice-card");

  if (!yesBtn || !noBtn || !responseBox || !choiceCard) return;

  function showResponse(type) {
    if (type === "yes") {
      responseBox.className = "choice-response show response-positive";
      responseBox.innerHTML = `
        <h3>That means a lot to us!</h3>
        <p>Thank you for your trust and mentorship. We would be lucky to collaborate again in the future.</p>
      `;
      return;
    }

    responseBox.className = "choice-response show response-funny";
    responseBox.innerHTML = `
      <h3>Oops… fair feedback accepted!</h3>
      <p>Looks like we still have room to improve. Next time, we promise to bring our absolute best version.</p>
    `;
  }

  yesBtn.addEventListener("click", function () {
    showResponse("yes");
  });

  const hasHover = window.matchMedia("(hover: hover)").matches;

  function moveNoButtonRandomly() {
    const cardRect = choiceCard.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    const xRange = Math.max(80, (cardRect.width - btnRect.width) / 2 - 24);
    const yRange = Math.max(50, (cardRect.height - btnRect.height) / 2 - 24);

    const randomX = (Math.random() * 2 - 1) * xRange;
    const randomY = (Math.random() * 2 - 1) * yRange;

    noBtn.style.transform = `translate(${randomX.toFixed(0)}px, ${randomY.toFixed(0)}px)`;
  }

  if (hasHover) {
    noBtn.classList.add("evasive-no");
    noBtn.addEventListener("click", function () {
      showResponse("no");
    });

    noBtn.addEventListener("mouseenter", function () {
      moveNoButtonRandomly();
    });
    return;
  }

  noBtn.classList.add("evasive-no");

  let longPressTimer = null;
  let longPressTriggered = false;

  function clearLongPressTimer() {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      longPressTimer = null;
    }
  }

  noBtn.addEventListener("touchstart", function () {
    longPressTriggered = false;
    clearLongPressTimer();
    longPressTimer = setTimeout(function () {
      longPressTriggered = true;
      showResponse("no");
    }, 650);
  }, { passive: true });

  noBtn.addEventListener("touchend", function () {
    clearLongPressTimer();
    if(!longPressTriggered) {
      moveNoButtonRandomly();
    }
  });

  noBtn.addEventListener("touchcancel", function () {
    clearLongPressTimer();
  });

  noBtn.addEventListener("click", function (event) {
    event.preventDefault();
    if (!longPressTriggered) {
      moveNoButtonRandomly();
    }
  });
})();

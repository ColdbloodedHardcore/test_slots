const container = document.querySelector(".slots-container");
const startButton = document.querySelector(".start");
const stopButton = document.querySelector(".stop");
const svg = document.querySelectorAll(".icon");
const icons = [...svg];
const iconHeight = icons[0].clientHeight;

const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min) + min);

// Start Spin
const onStartSpin = () => {
  // Disable buttons
  startButton.disabled = true;
  stopButton.disabled = false;

  TweenMax.fromTo(
    icons,
    0.1,
    {
      y: 0,
    },
    {
      y: 0 - iconHeight * icons.length,
      ease: Linear.easeNone,
    }
  ).repeat(-1);
};

// Stop Spin
const onStopSpin = () => {
  const random = getRandomNumber(1, 40);
  stopButton.disabled = true;

  // Slow stop
  TweenMax.to(icons, 1.3, {
    y: 0 - iconHeight * random,
    ease: Linear.ease,
  });

  setTimeout(() => {
    startButton.disabled = false;
  }, 1000);
};

startButton.addEventListener("click", onStartSpin);
stopButton.addEventListener("click", onStopSpin);

const container = document.querySelector(".slots-container");
const startButton = document.querySelector(".start");
const stopButton = document.querySelector(".stop");
const svg = document.querySelectorAll(".icon");
const icons = [...svg];
const iconHeight = icons[0].clientHeight;
const getRandomPX = 0 - iconHeight * icons.length;

const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min) + min);

// Init Timeline
let tl;
const initTimeline = () => (tl = new TimelineMax({ paused: true, repeat: -1 }));
initTimeline();

// Start Spin
const onStartSpin = () => {
  if (tl.isActive()) return;

  tl.fromTo(
    icons,
    0.1,
    {
      y: 0,
    },
    {
      y: getRandomPX,
      ease: Linear.easeNone,
    }
  );

  tl.play();
};

// Stop Spin
const onStopSpin = () => {
  const random = getRandomNumber(1, 40);
  const getRandomPXBeforeStop = 0 - iconHeight * random + iconHeight / 2;

  tl.to(icons, 3, {
    y: getRandomPXBeforeStop,
    ease: Linear.easeNone,
  })
    .to(icons, 10, { y: getRandomPXBeforeStop, ease: Linear.easeNone })
    .to(icons, 20, {
      y: icons[random],
      ease: Linear.easeNone,
    });

  setTimeout(() => {
    // Destroy Timeline
    tl.kill();
    // Reinit Timeline
    tl.eventCallback("onComplete", initTimeline());
  }, 2000);
};

startButton.addEventListener("click", onStartSpin);
stopButton.addEventListener("click", onStopSpin);

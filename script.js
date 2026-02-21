const screens = {
  home: document.getElementById("home-screen"),
  countdown: document.getElementById("countdown-screen"),
  reveal: document.getElementById("reveal-screen"),
};

const playButton = document.getElementById("play-btn");
const countdownNumber = document.getElementById("countdown-number");
const nameCard = document.getElementById("name-card");

const famousNames = [
  "Zinedine Zidane", "Kylian Mbappé", "Cristiano Ronaldo", "Lionel Messi", "Neymar", "Karim Benzema",
  "LeBron James", "Michael Jordan", "Serena Williams", "Rafael Nadal", "Roger Federer", "Novak Djokovic",
  "Antoine Griezmann", "Didier Drogba", "Hugo Lloris", "Paul Pogba", "N'Golo Kanté", "Ousmane Dembélé",
  "Taylor Swift", "Beyoncé", "Rihanna", "Ariana Grande", "Billie Eilish", "Ed Sheeran",
  "Drake", "The Weeknd", "Bruno Mars", "Dua Lipa", "Lady Gaga", "Shakira",
  "Mylène Farmer", "Aya Nakamura", "Jul", "Ninho", "Gims", "Soprano",
  "Leonardo DiCaprio", "Brad Pitt", "Tom Cruise", "Will Smith", "Dwayne Johnson", "Keanu Reeves",
  "Scarlett Johansson", "Emma Watson", "Margot Robbie", "Zendaya", "Jennifer Lawrence", "Natalie Portman",
  "Omar Sy", "Jean Dujardin", "Marion Cotillard", "Vincent Cassel", "Pierre Niney", "François Cluzet",
  "MrBeast", "Squeezie", "Inoxtag", "Michou", "Léna Situations", "Amixem",
  "PewDiePie", "Ninja", "Pokimane", "Ibai", "Kai Cenat", "Adin Ross",
  "Elon Musk", "Bill Gates", "Mark Zuckerberg", "Jeff Bezos", "Satya Nadella", "Tim Cook",
  "Napoléon", "Albert Einstein", "Marie Curie", "Cléopâtre", "Jules César", "Charles de Gaulle",
  "Mahatma Gandhi", "Nelson Mandela", "Martin Luther King", "Winston Churchill", "Victor Hugo", "Molière",
  "Harry Potter", "Hermione Granger", "Ron Weasley", "Dark Vador", "Luke Skywalker", "Yoda",
  "Spider-Man", "Batman", "Superman", "Iron Man", "Wonder Woman", "Thor",
  "Mario", "Luigi", "Pikachu", "Sonic", "Link", "Zelda",
  "Shrek", "Elsa", "Woody", "Buzz l'Éclair", "Mickey Mouse", "Simba",
  "SpongeBob", "Goku", "Naruto", "Luffy", "Saitama", "Tanjiro",
  "Mbappé", "Messi", "Ronaldo", "Zlatan", "Haaland", "Bellingham",
  "Thomas Pesquet", "Kendji Girac", "Vianney", "Bigflo", "Oli", "Stromae"
];

let namePool = [];
let countdownTimer = null;
let wakeLock = null;
let lastTapTimestamp = 0;
let lastTapX = null;
let lastTapY = null;
let lastTouchTimestamp = 0;

function showScreen(screenKey) {
  Object.values(screens).forEach((screen) => screen.classList.remove("active"));
  screens[screenKey].classList.add("active");
}

function refillPool() {
  namePool = [...famousNames];
}

function getRandomName() {
  if (namePool.length === 0) {
    refillPool();
  }

  const randomIndex = Math.floor(Math.random() * namePool.length);
  return namePool.splice(randomIndex, 1)[0];
}

function startCountdown(seconds = 3) {
  clearInterval(countdownTimer);
  let remaining = seconds;
  countdownNumber.textContent = String(remaining);
  showScreen("countdown");

  countdownTimer = setInterval(() => {
    remaining -= 1;

    if (remaining > 0) {
      countdownNumber.textContent = String(remaining);
      return;
    }

    clearInterval(countdownTimer);
    revealName();
  }, 1000);
}

async function requestWakeLock() {
  if (!("wakeLock" in navigator)) {
    return;
  }

  try {
    wakeLock = await navigator.wakeLock.request("screen");
  } catch {
    wakeLock = null;
  }
}

async function requestFullscreen() {
  if (!document.documentElement.requestFullscreen) {
    return;
  }

  if (document.fullscreenElement) {
    return;
  }

  try {
    await document.documentElement.requestFullscreen();
  } catch {
  }
}

function revealName() {
  const name = getRandomName();
  nameCard.textContent = name;
  showScreen("reveal");
}

function getEventPoint(event) {
  if (event.changedTouches && event.changedTouches.length > 0) {
    return {
      x: event.changedTouches[0].clientX,
      y: event.changedTouches[0].clientY,
    };
  }

  if (typeof event.clientX === "number" && typeof event.clientY === "number") {
    return {
      x: event.clientX,
      y: event.clientY,
    };
  }

  return { x: 0, y: 0 };
}

playButton.addEventListener("click", () => {
  requestFullscreen();
  requestWakeLock();
  startCountdown(3);
});

function handleDoubleTapReplay(event) {
  if (!screens.reveal.classList.contains("active")) {
    return;
  }

  const now = Date.now();
  if (event.type === "click" && now - lastTouchTimestamp < 700) {
    return;
  }

  if (event.type === "touchend") {
    lastTouchTimestamp = now;
  }

  const point = getEventPoint(event);
  const tapGap = now - lastTapTimestamp;
  const movedTooFar =
    lastTapX !== null && lastTapY !== null
      ? Math.hypot(point.x - lastTapX, point.y - lastTapY) > 44
      : false;

  if (event.type === "dblclick" || (tapGap > 0 && tapGap < 420 && !movedTooFar)) {
    event.preventDefault();
    lastTapTimestamp = 0;
    lastTapX = null;
    lastTapY = null;
    startCountdown(3);
    return;
  }

  lastTapTimestamp = now;
  lastTapX = point.x;
  lastTapY = point.y;
}

nameCard.addEventListener("touchend", handleDoubleTapReplay, { passive: false });
nameCard.addEventListener("click", handleDoubleTapReplay);
nameCard.addEventListener("dblclick", handleDoubleTapReplay);
screens.reveal.addEventListener("touchend", handleDoubleTapReplay, { passive: false });
screens.reveal.addEventListener("click", handleDoubleTapReplay);
screens.reveal.addEventListener("dblclick", handleDoubleTapReplay);

refillPool();
showScreen("home");

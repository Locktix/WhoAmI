const screens = {
  home: document.getElementById("home-screen"),
  countdown: document.getElementById("countdown-screen"),
  reveal: document.getElementById("reveal-screen"),
};

const playButton = document.getElementById("play-btn");
const countdownNumber = document.getElementById("countdown-number");
const nameCard = document.getElementById("name-card");
const roleName = document.getElementById("role-name");
const roleHint = document.getElementById("role-hint");
const actionMenu = document.getElementById("action-menu");
const changePersonButton = document.getElementById("change-person-btn");
const foundButton = document.getElementById("found-btn");
const resultOverlay = document.getElementById("result-overlay");
const resultRole = document.getElementById("result-role");
const resultRoleHint = document.getElementById("result-role-hint");
const resultTime = document.getElementById("result-time");
const nextRoundButton = document.getElementById("next-round-btn");
const greenFlash = document.getElementById("green-flash");

const famousNames = [
  "Ma meilleure amie — ta BFF au quotidien",
  "Mon meilleur ami — ton bro de tous les jours",
  "Ma sœur — membre de ta famille",
  "Mon frère — membre de ta famille",
  "Ma mère — pilier de la famille",
  "Mon père — pilier de la famille",
  "Mon cousin — de la famille élargie",
  "Ma cousine — de la famille élargie",
  "Mon oncle — de la famille",
  "Ma tante — de la famille",
  "Mon prof préféré — enseignant marquant",
  "Mon voisin sympa — voisin du quartier",

  "Kylian Mbappé — footballeur international français",
  "Neymar — footballeur brésilien",
  "Lionel Messi — footballeur argentin, Ballon d'Or",
  "Cristiano Ronaldo — footballeur portugais, Ballon d'Or",
  "Karim Benzema — footballeur français, Ballon d'Or 2022",
  "Zinedine Zidane — ancien footballeur et entraîneur",
  "Erling Haaland — avant-centre norvégien",
  "Jude Bellingham — milieu de terrain anglais",
  "Antoine Griezmann — footballeur français",
  "Didier Drogba — légende ivoirienne du football",
  "Hugo Lloris — ancien gardien et capitaine des Bleus",
  "N'Golo Kanté — milieu français, champion du monde",

  "LeBron James — basketteur NBA",
  "Michael Jordan — légende de la NBA",
  "Stephen Curry — basketteur NBA, shooteur d'élite",
  "Victor Wembanyama — basketteur français NBA",
  "Serena Williams — légende du tennis",
  "Rafael Nadal — champion de tennis",
  "Roger Federer — champion de tennis",
  "Novak Djokovic — champion de tennis",
  "Usain Bolt — sprinteur jamaïcain",
  "Teddy Riner — judoka français",

  "Taylor Swift — chanteuse pop américaine",
  "Beyoncé — chanteuse et performeuse internationale",
  "Rihanna — chanteuse et entrepreneuse",
  "Ariana Grande — chanteuse pop",
  "Billie Eilish — chanteuse américaine",
  "Ed Sheeran — chanteur-compositeur britannique",
  "Drake — rappeur canadien",
  "The Weeknd — chanteur canadien",
  "Bruno Mars — chanteur américain",
  "Dua Lipa — chanteuse pop britannique",
  "Lady Gaga — chanteuse et actrice",
  "Shakira — chanteuse colombienne",
  "Stromae — artiste belge",
  "Aya Nakamura — chanteuse française",
  "Gims — rappeur/chanteur français",
  "Soprano — rappeur/chanteur marseillais",
  "Jul — rappeur marseillais",
  "Ninho — rappeur français",
  "Kendji Girac — chanteur français",
  "Vianney — auteur-compositeur-interprète",

  "Leonardo DiCaprio — acteur oscarisé",
  "Brad Pitt — acteur et producteur",
  "Tom Cruise — acteur de films d'action",
  "Will Smith — acteur et rappeur",
  "Dwayne Johnson — acteur, ex-catcHeur",
  "Keanu Reeves — acteur de John Wick/Matrix",
  "Scarlett Johansson — actrice américaine",
  "Emma Watson — actrice (Hermione)",
  "Margot Robbie — actrice et productrice",
  "Zendaya — actrice et chanteuse",
  "Jennifer Lawrence — actrice oscarisée",
  "Natalie Portman — actrice oscarisée",
  "Omar Sy — acteur français",
  "Jean Dujardin — acteur oscarisé",
  "Marion Cotillard — actrice oscarisée",
  "Vincent Cassel — acteur français",
  "Pierre Niney — acteur français",
  "François Cluzet — acteur français",

  "Squeezie — youtubeur français",
  "Amixem — youtubeur français",
  "Inoxtag — créateur de contenu français",
  "Michou — youtubeur/streamer français",
  "Léna Situations — créatrice de contenu",
  "Mastu — youtubeur français",
  "Tibo InShape — youtubeur fitness",
  "MrBeast — youtubeur américain",
  "PewDiePie — youtubeur suédois",
  "Ninja — streamer gaming",
  "Pokimane — streameuse",
  "Ibai — streamer espagnol",
  "Kai Cenat — streamer américain",
  "Adin Ross — streamer américain",
  "Anymes023 — créateur de contenu web",

  "Tim Cook — PDG d'Apple",
  "Elon Musk — entrepreneur (Tesla, SpaceX)",
  "Bill Gates — cofondateur de Microsoft",
  "Mark Zuckerberg — PDG de Meta",
  "Jeff Bezos — fondateur d'Amazon",
  "Satya Nadella — PDG de Microsoft",
  "Sam Altman — dirigeant dans l'IA",

  "Albert Einstein — physicien",
  "Marie Curie — scientifique, double prix Nobel",
  "Napoléon Bonaparte — empereur français",
  "Charles de Gaulle — homme d'État français",
  "Nelson Mandela — leader anti-apartheid",
  "Martin Luther King — militant des droits civiques",
  "Mahatma Gandhi — leader de l'indépendance indienne",
  "Cléopâtre — reine d'Égypte antique",
  "Jules César — chef romain",
  "Victor Hugo — écrivain français",
  "Molière — dramaturge français",
  "Thomas Pesquet — astronaute français",

  "Harry Potter — sorcier de la saga Harry Potter",
  "Hermione Granger — sorcière brillante de Harry Potter",
  "Ron Weasley — ami de Harry Potter",
  "Dark Vador — antagoniste de Star Wars",
  "Luke Skywalker — héros de Star Wars",
  "Yoda — maître Jedi de Star Wars",
  "Spider-Man — super-héros Marvel",
  "Batman — super-héros de Gotham",
  "Superman — super-héros kryptonien",
  "Iron Man — héros Marvel en armure",
  "Wonder Woman — héroïne DC",
  "Thor — dieu du tonnerre Marvel",
  "Mario — héros Nintendo",
  "Luigi — frère de Mario",
  "Pikachu — Pokémon électrique",
  "Sonic — hérisson bleu de SEGA",
  "Link — héros de The Legend of Zelda",
  "Zelda — princesse de The Legend of Zelda",
  "Shrek — ogre du film Shrek",
  "Elsa — reine des neiges Disney",
  "Woody — cowboy de Toy Story",
  "Buzz l'Éclair — ranger de l'espace Toy Story",
  "Mickey Mouse — mascotte Disney",
  "Simba — lion du Roi Lion",
  "SpongeBob — héros de Bob l'Éponge",
  "Goku — héros de Dragon Ball",
  "Naruto — ninja de Konoha",
  "Luffy — capitaine de One Piece",
  "Saitama — héros de One Punch Man",
  "Tanjiro — héros de Demon Slayer"
];

let namePool = [];
let countdownTimer = null;
let wakeLock = null;
let pressTimer = null;
let pressStarted = false;
let currentRole = "";
let currentRoleHint = "";
let roleShownTimestamp = 0;

const LONG_PRESS_MS = 520;
const FLASH_DURATION_MS = 2100;

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

function parseRole(entry) {
  const separator = " — ";
  if (!entry.includes(separator)) {
    return {
      name: entry,
      hint: "",
    };
  }

  const [name, ...rest] = entry.split(separator);
  return {
    name: name.trim(),
    hint: rest.join(separator).trim(),
  };
}

function toKeywordHint(text) {
  if (!text) {
    return "";
  }

  const compact = text
    .replace(/[()]/g, " ")
    .replace(/[,:]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const stopWords = new Set([
    "de", "du", "des", "la", "le", "les", "d", "l", "un", "une", "et", "en", "dans", "pour", "au", "aux", "ta", "ton", "tous", "toutes", "ses", "son", "sa", "ton", "quotidien"
  ]);

  const tokens = compact
    .split(" ")
    .map((token) => token.trim())
    .filter((token) => token.length > 1)
    .filter((token) => !stopWords.has(token.toLowerCase()));

  return tokens.slice(0, 5).join(" • ");
}

function startCountdown(seconds = 3) {
  clearInterval(countdownTimer);
  closeActionMenu();
  closeResultOverlay();
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
  const roleEntry = getRandomName();
  const parsedRole = parseRole(roleEntry);
  currentRole = parsedRole.name;
  currentRoleHint = toKeywordHint(parsedRole.hint);
  roleShownTimestamp = Date.now();
  roleName.textContent = currentRole;
  roleHint.textContent = currentRoleHint;
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

function openActionMenu() {
  actionMenu.classList.add("open");
  actionMenu.setAttribute("aria-hidden", "false");
}

function closeActionMenu() {
  actionMenu.classList.remove("open");
  actionMenu.setAttribute("aria-hidden", "true");
}

function openResultOverlay() {
  resultOverlay.classList.add("open");
  resultOverlay.setAttribute("aria-hidden", "false");
}

function closeResultOverlay() {
  resultOverlay.classList.remove("open");
  resultOverlay.setAttribute("aria-hidden", "true");
}

function triggerGreenFlash() {
  greenFlash.classList.remove("active");
  void greenFlash.offsetWidth;
  greenFlash.classList.add("active");

  if (navigator.vibrate) {
    navigator.vibrate([90, 70, 90]);
  }
}

function showResultAfterDiscovery() {
  const elapsedMs = Math.max(0, Date.now() - roleShownTimestamp);
  const elapsedSeconds = (elapsedMs / 1000).toFixed(1);
  resultRole.textContent = currentRole;
  resultRoleHint.textContent = currentRoleHint;
  resultTime.textContent = `Trouvé en ${elapsedSeconds}s`;

  setTimeout(() => {
    openResultOverlay();
  }, FLASH_DURATION_MS);
}

playButton.addEventListener("click", () => {
  requestFullscreen();
  requestWakeLock();
  startCountdown(3);
});

function startLongPress(event) {
  if (!screens.reveal.classList.contains("active")) {
    return;
  }

  if (actionMenu.classList.contains("open")) {
    return;
  }

  if (event.type === "mousedown" && event.button !== 0) {
    return;
  }

  clearTimeout(pressTimer);
  pressStarted = true;
  pressTimer = setTimeout(() => {
    if (!pressStarted) {
      return;
    }
    openActionMenu();
  }, LONG_PRESS_MS);
}

function cancelLongPress() {
  pressStarted = false;
  clearTimeout(pressTimer);
}

nameCard.addEventListener("touchstart", startLongPress, { passive: true });
nameCard.addEventListener("touchend", cancelLongPress);
nameCard.addEventListener("touchcancel", cancelLongPress);
nameCard.addEventListener("mousedown", startLongPress);
nameCard.addEventListener("mouseup", cancelLongPress);
nameCard.addEventListener("mouseleave", cancelLongPress);

changePersonButton.addEventListener("click", () => {
  closeActionMenu();
  startCountdown(3);
});

foundButton.addEventListener("click", () => {
  closeActionMenu();
  triggerGreenFlash();
  showResultAfterDiscovery();
});

nextRoundButton.addEventListener("click", () => {
  startCountdown(3);
});

actionMenu.addEventListener("click", (event) => {
  if (event.target === actionMenu) {
    closeActionMenu();
  }
});

refillPool();
showScreen("home");

/* 🔐 PASSWORDS */
const dailyPasswords = {
  1:"BADAK1",2:"BADAK2",3:"BADAK3",4:"BADAK4",5:"BADAK5",
  6:"BADAK6",7:"BADAK7",8:"BADAK8",9:"BADAK9",10:"BADAK10",
  11:"BADAK11",12:"BADAK12",13:"BADAK13",14:"BADAK14",15:"BADAK15"
};

/* 💌 MESSAGES */
const wishes = {
  1:"March begins… and so does my smile because of you 💖",
  2:"Every day feels warmer with you 🌷",
  3:"You are my calm in the chaos ✨",
  4:"Your presence is my comfort 💕",
  5:"You make ordinary moments magical 🌸",
  6:"Thinking of you feels like home 🏡",
  7:"You are effortlessly special 💫",
  8:"Smiles come easy when it’s you 😊",
  9:"You make my heart lighter 💗",
  10:"Every day with you matters 🌹",
  11:"You’re a beautiful habit 💞",
  12:"You make time feel kinder ⏳",
  13:"Lucky to feel this for you 🍀",
  14:"Almost there… heart’s full 💝",
  15:"Happy Birthday 💖 You are truly one of a kind 🎂🎆"
};

/* 🧪 TEST MODE */
const TEST_MODE = true;
const TEST_DAY = 15;

/* 📅 DATE LOGIC */
function getActiveDay() {
  if (TEST_MODE) return TEST_DAY;

  const now = new Date();
  if (now.getMonth() !== 2) return null;
  if (now.getDate() < 1 || now.getDate() > 15) return null;
  return now.getDate();
}

function unlockContent() {
  const today = getActiveDay();
  const input = document.getElementById("passwordInput").value.trim().toUpperCase();
  const error = document.getElementById("errorMessage");

  if (!today) {
    error.innerText = "🌸 Available only from 1–15 March 🌸";
    return;
  }

  const enteredDay = parseInt(input.replace("BADAK",""),10);

  if (enteredDay > today) {
    error.innerText = "⏳ Too early… come back tomorrow 💖";
    return;
  }

  if (enteredDay < today) {
    error.innerText = "🌷 That day has passed 🌷";
    return;
  }

  if (input === dailyPasswords[today]) {
    document.getElementById("lockedContent").classList.add("hidden");
    document.getElementById("unlockedContent").classList.remove("hidden");
    document.getElementById("messageText").innerText = wishes[today];
    document.getElementById("dayBadge").innerText = `March ${today}`;
    error.innerText = "";

    if (today === 15) startFireworks();
  } else {
    error.innerText = "Wrong password 💔";
  }
}

function lockContent() {
  document.getElementById("unlockedContent").classList.add("hidden");
  document.getElementById("lockedContent").classList.remove("hidden");
}

/* 💖 HEARTS */
const heartBox = document.querySelector(".hearts");
setInterval(() => {
  const heart = document.createElement("span");
  heart.innerText = "💖";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = (6 + Math.random()*4) + "s";
  heartBox.appendChild(heart);
  setTimeout(()=>heart.remove(),8000);
}, 400);

/* 🎆 FIREWORKS */
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

let particles = [];

function firework() {
  const x = Math.random()*canvas.width;
  const y = Math.random()*canvas.height/2;
  for (let i=0;i<70;i++) {
    particles.push({
      x,y,
      vx:(Math.random()-0.5)*6,
      vy:(Math.random()-0.5)*6,
      a:1,
      c:`hsl(${Math.random()*360},100%,60%)`
    });
  }
}

function animate() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach((p,i)=>{
    p.x+=p.vx; p.y+=p.vy; p.a-=0.02;
    ctx.fillStyle=p.c;
    ctx.globalAlpha=p.a;
    ctx.beginPath();
    ctx.arc(p.x,p.y,2,0,Math.PI*2);
    ctx.fill();
    if(p.a<=0) particles.splice(i,1);
  });
  requestAnimationFrame(animate);
}

function startFireworks() {
  canvas.style.display="block";
  setInterval(firework,900);
  animate();
}

/* ⏳ COUNTDOWN */
function updateCountdown() {
  const now = new Date();
  const target = new Date(now.getFullYear(),2,15);
  const diff = target-now;
  const d = document.getElementById("countdownDisplay");
  if (diff<0) d.innerText="💖 Celebration Complete 💖";
  else d.innerText=Math.ceil(diff/86400000)+" days left 💖";
}
updateCountdown();
const colors = [
    "#ff6f91",
    "#ff9671",
    "#ffc75f",
    "#f9f871",
    "#ff4c4c",
    "#ffcc00"
  ];
  const letters = "I LOVE YOU";
  let letterIndex = 0;
  
  function getRandomLetter() {
    const letter = letters.charAt(letterIndex);
    letterIndex = (letterIndex + 1) % letters.length;
    return letter;
  }
  
  function createFirework(x, y) {
    const launchHeight = Math.random() * (window.innerHeight / 4) + window.innerHeight / 4;
    const projectile = document.createElement("div");
    projectile.classList.add("projectile");
    document.body.appendChild(projectile);
    projectile.style.left = `${x}px`;
    projectile.style.top = `${y}px`;
  
    anime({
      targets: projectile,
      translateY: -launchHeight,
      duration: 1200,
      easing: "easeOutQuad",
      complete: () => {
        projectile.remove();
        createBurst(x, y - launchHeight);
      }
    });
  }
  
  function createBurst(x, y) {
    const numLetters = 15;
    const numSparkles = 50;
  
    for (let i = 0; i < numLetters; i++) {
      createParticle(x, y, false);
    }
  
    for (let i = 0; i < numSparkles; i++) {
      createParticle(x, y, true);
    }
  }
  
  function createParticle(x, y, isSparkle) {
    const particle = document.createElement("div");
    particle.classList.add(isSparkle ? "sparkle" : "particle");
  
    if (!isSparkle) {
      particle.textContent = getRandomLetter();
      particle.style.color = colors[Math.floor(Math.random() * colors.length)];
    } else {
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    }
  
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    document.body.appendChild(particle);
  
    animateParticle(particle, isSparkle);
  }
  
  function animateParticle(particle, isSparkle) {
    const angle = Math.random() * Math.PI * 2;
    const distance = anime.random(100, 200);
    const duration = anime.random(1200, 2000);
    const fallDistance = anime.random(20, 80);
    const scale = isSparkle ? Math.random() * 0.5 + 0.5 : Math.random() * 1 + 0.5;
  
    anime.timeline({
      targets: particle,
      easing: "easeOutCubic",
      duration: duration,
      complete: () => particle.remove()
    })
    .add({
      translateX: Math.cos(angle) * distance,
      translateY: Math.sin(angle) * distance,
      scale: [0, scale],
      opacity: [1, 0.9]
    })
    .add({
      translateY: `+=${fallDistance}px`,
      opacity: [0.9, 0],
      easing: "easeInCubic",
      duration: duration / 2
    });
  }
  
  document.addEventListener("click", (e) => {
    createFirework(e.clientX, e.clientY);
  });
  
  window.onload = function () {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    createFirework(centerX, centerY);
  };
  

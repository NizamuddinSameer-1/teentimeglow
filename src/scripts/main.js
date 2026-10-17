    // --- 1. Web Audio API ASMR Synthesizer (Zero-latency micro-sounds) ---
    let soundEnabled = true;
    let audioCtx = null;

    function getAudioContext() {
      if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) audioCtx = new AudioContext();
      }
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      return audioCtx;
    }

    function toggleSound() {
      soundEnabled = !soundEnabled;
      const icon = document.getElementById('soundIcon');
      const label = document.getElementById('soundLabel');
      if (soundEnabled) {
        icon.textContent = '🔊';
        label.textContent = 'Sound';
        playTone(587.33, 'triangle', 0.15, 0.08); // D5 chime
        showToast('🔊 Audio feedback enabled');
      } else {
        icon.textContent = '🔇';
        label.textContent = 'Muted';
        showToast('🔇 Audio feedback muted');
      }
    }

    function playTone(freq, type = 'sine', duration = 0.2, volume = 0.08) {
      if (!soundEnabled) return;
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(volume, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
      } catch (err) {}
    }

    function playChime() {
      if (!soundEnabled) return;
      playTone(523.25, 'triangle', 0.25, 0.05); // C5
      setTimeout(() => playTone(659.25, 'triangle', 0.25, 0.05), 80); // E5
      setTimeout(() => playTone(783.99, 'triangle', 0.35, 0.06), 160); // G5
    }

    function playBubblePop() {
      if (!soundEnabled) return;
      playTone(400, 'sine', 0.08, 0.08);
      setTimeout(() => playTone(880, 'sine', 0.12, 0.06), 40);
    }

    function playCelebrationChime() {
      if (!soundEnabled) return;
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        setTimeout(() => playTone(freq, 'sine', 0.5, 0.08), idx * 100);
      });
    }

    // Interactive Audiobook Sample Player
    let activeAudioTimeout;
    function playAudiobookPreview(title, e) {
      if (e) e.preventDefault();
      const bar = document.getElementById('audioPreviewBar');
      const track = document.getElementById('audioTrackTitle');
      track.textContent = title;
      bar.classList.add('active');
      playTone(440, 'triangle', 0.4, 0.1);
      setTimeout(() => playTone(554.37, 'sine', 0.6, 0.08), 150);

      showToast(`🎧 Previewing "${title}"`);
      clearTimeout(activeAudioTimeout);
      activeAudioTimeout = setTimeout(() => {
        toggleAudioPreview(false);
      }, 9000);
    }

    function toggleAudioPreview(show) {
      const bar = document.getElementById('audioPreviewBar');
      if (show) bar.classList.add('active');
      else bar.classList.remove('active');
    }

    // --- 2. Lenis Smooth Scrolling Engine ---
    let lenis;
    if (typeof Lenis !== 'undefined') {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        smoothTouch: false
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      if (typeof ScrollTrigger !== 'undefined') {
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
          lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
      }
    }

    function scrollToTop() {
      playTone(659.25, 'sine', 0.2);
      if (lenis) {
        lenis.scrollTo(0);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    // --- 3. Ambient Cursor Glow Physics ---
    const ambientGlow = document.getElementById('ambientGlow');
    if (ambientGlow && window.matchMedia('(pointer: fine)').matches) {
      let mouseX = window.innerWidth / 2;
      let mouseY = window.innerHeight / 2;
      let glowX = mouseX;
      let glowY = mouseY;

      window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      });

      function animateGlow() {
        glowX += (mouseX - glowX) * 0.12;
        glowY += (mouseY - glowY) * 0.12;
        ambientGlow.style.transform = `translate3d(${glowX - 190}px, ${glowY - 190}px, 0)`;
        requestAnimationFrame(animateGlow);
      }
      animateGlow();
    }

    // --- 3.5. Interactive Floating Little Pink Hearts Cursor Trail (Desktop) ---
    function initCursorHearts() {
      if (!window.matchMedia('(pointer: fine)').matches) return;
      const canvas = document.createElement('canvas');
      canvas.id = 'cursorHeartsCanvas';
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '9998';
      document.body.appendChild(canvas);

      const ctx = canvas.getContext('2d');
      let width = canvas.width = window.innerWidth;
      let height = canvas.height = window.innerHeight;
      window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      });

      // Perfect Apple/Material heart path centered at (0, 0)
      const heartPath = new Path2D('M 0 9.35 l -1.45 -1.32 C -6.6 3.36 -10 0.28 -10 -3.5 C -10 -6.58 -7.58 -9 -4.5 -9 c 1.74 0 3.41 0.81 4.5 2.09 C 1.09 -8.19 2.76 -9 4.5 -9 C 7.58 -9 10 -6.58 10 -3.5 c 0 3.78 -3.4 6.86 -8.55 11.54 L 0 9.35 z');

      // Curated aesthetic pink palette (soft baby pinks, blush rose & cute bubblegum)
      const pinkColors = [
        '#FF6584', // Cute strawberry rose
        '#FF8DA1', // Soft pastel baby pink
        '#FFA6B9', // Cotton candy blush
        '#FF5280', // Sweet blush pink
        '#FF85A2', // Glowing rose
        '#FF9EAA'  // Warm peach-pink
      ];

      const hearts = [];
      let lastSpawn = 0;
      let prevX = 0, prevY = 0;

      function spawnHeart(x, y, isBurst = false) {
        const color = pinkColors[Math.floor(Math.random() * pinkColors.length)];
        const scale = isBurst 
          ? (Math.random() * 0.30 + 0.45) 
          : (Math.random() * 0.25 + 0.38); // 8px to 16px cute "lil hearts"
        const angle = isBurst ? (Math.random() * Math.PI * 2) : 0;
        const speed = isBurst ? (Math.random() * 3.2 + 1.2) : 0;
        
        hearts.push({
          x: x + (Math.random() - 0.5) * 8,
          y: y + (Math.random() - 0.5) * 8,
          vx: isBurst ? Math.cos(angle) * speed : (Math.random() - 0.5) * 1.2,
          vy: isBurst ? Math.sin(angle) * speed - 1.4 : (-Math.random() * 1.6 - 0.7), // float gently upwards
          rotation: (Math.random() - 0.5) * 0.7,
          vRot: (Math.random() - 0.5) * 0.045,
          scale: scale,
          alpha: 1,
          decay: isBurst ? (Math.random() * 0.010 + 0.009) : (Math.random() * 0.012 + 0.010), // lives ~1 sec
          color: color
        });
      }

      window.addEventListener('mousemove', (e) => {
        const now = Date.now();
        const dist = Math.hypot(e.clientX - prevX, e.clientY - prevY);
        prevX = e.clientX;
        prevY = e.clientY;

        // Spawn smoothly on motion (throttled for high FPS performance)
        if (now - lastSpawn > 30 || (dist > 22 && now - lastSpawn > 16)) {
          lastSpawn = now;
          spawnHeart(e.clientX, e.clientY, false);
          // If mouse is moving rapidly, add an extra dainty micro-heart
          if (dist > 40) {
            spawnHeart(e.clientX - (e.movementX || 0) * 0.4, e.clientY - (e.movementY || 0) * 0.4, false);
          }
        }
      });

      // Bonus tactile delight: click bursts 9 cute mini pink hearts!
      window.addEventListener('click', (e) => {
        const count = 9;
        for (let i = 0; i < count; i++) {
          spawnHeart(e.clientX, e.clientY, true);
        }
      });

      function renderHearts() {
        ctx.clearRect(0, 0, width, height);
        for (let i = hearts.length - 1; i >= 0; i--) {
          const h = hearts[i];
          h.x += h.vx;
          h.y += h.vy;
          h.vy -= 0.012; // gentle balloon buoyancy upwards
          h.vx *= 0.98;
          h.rotation += h.vRot;
          h.alpha -= h.decay;
          h.scale *= 0.982;

          if (h.alpha <= 0 || h.scale <= 0.08) {
            hearts.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.translate(h.x, h.y);
          ctx.rotate(h.rotation);
          ctx.scale(h.scale, h.scale);
          ctx.fillStyle = h.color;
          ctx.globalAlpha = Math.max(0, h.alpha);
          ctx.shadowBlur = 8;
          ctx.shadowColor = h.color;
          ctx.fill(heartPath);
          ctx.restore();
        }
        ctx.globalAlpha = 1;
        requestAnimationFrame(renderHearts);
      }
      renderHearts();
    }

    // --- 4. Interactive Hero Stardust Particle Canvas with Mouse Repulsion ---
    function initHeroParticles() {
      const canvas = document.getElementById('heroParticles');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      let width, height;
      let particles = [];
      let mouseHeroX = -1000;
      let mouseHeroY = -1000;

      function resize() {
        width = canvas.width = canvas.parentElement.offsetWidth;
        height = canvas.height = canvas.parentElement.offsetHeight;
      }
      resize();
      window.addEventListener('resize', resize);

      canvas.parentElement.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseHeroX = e.clientX - rect.left;
        mouseHeroY = e.clientY - rect.top;
      });
      canvas.parentElement.addEventListener('mouseleave', () => {
        mouseHeroX = -1000;
        mouseHeroY = -1000;
      });

      for (let i = 0; i < 45; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2.2 + 0.6,
          vx: (Math.random() - 0.5) * 0.4,
          vy: -Math.random() * 0.6 - 0.2,
          alpha: Math.random() * 0.6 + 0.2,
          pulse: Math.random() * 0.03
        });
      }

      function render() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
          // Interactive Mouse Repulsion
          const dx = p.x - mouseHeroX;
          const dy = p.y - mouseHeroY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110 && dist > 0) {
            const force = (110 - dist) / 110;
            p.x += (dx / dist) * force * 4;
            p.y += (dy / dist) * force * 4;
          }

          p.x += p.vx;
          p.y += p.vy;
          p.alpha += Math.sin(Date.now() * 0.003) * p.pulse;
          if (p.y < 0) { p.y = height + 10; p.x = Math.random() * width; }
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 222, 89, ${Math.max(0.1, Math.min(0.85, p.alpha))})`;
          ctx.shadowBlur = 10;
          ctx.shadowColor = 'rgba(250, 163, 7, 0.8)';
          ctx.fill();
        });
        requestAnimationFrame(render);
      }
      render();
    }

    // --- 5. Magnetic Button Physics (Awwwards Standard with GSAP) ---
    function initMagneticButtons() {
      if (!window.matchMedia('(pointer: fine)').matches || typeof gsap === 'undefined') return;

      const magneticBtns = document.querySelectorAll('.magnetic-btn');
      magneticBtns.forEach(btn => {
        const xTo = gsap.quickTo(btn, 'x', { duration: 0.35, ease: 'power2.out' });
        const yTo = gsap.quickTo(btn, 'y', { duration: 0.35, ease: 'power2.out' });

        btn.addEventListener('mousemove', (e) => {
          const rect = btn.getBoundingClientRect();
          const x = (e.clientX - (rect.left + rect.width / 2)) * 0.35;
          const y = (e.clientY - (rect.top + rect.height / 2)) * 0.35;
          xTo(x);
          yTo(y);
        });

        btn.addEventListener('mouseleave', () => {
          xTo(0);
          yTo(0);
        });
      });
    }

    // --- 6. 3D Card Perspective Tilt Effect ---
    function init3DTilt() {
      if (!window.matchMedia('(pointer: fine)').matches) return;
      const tiltCards = document.querySelectorAll('.tilt-card');

      tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const rotateX = ((y - centerY) / centerY) * -6;
          const rotateY = ((x - centerX) / centerX) * 6;

          card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
          card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale3d(1, 1, 1)';
        });
      });
    }

    // --- 0. Cinematic Morphing Loading Screen (0% -> 100% Counter & Curtain Wipe) ---
    function initPreloader() {
      const preloader = document.getElementById('sitePreloader');
      if (!preloader || preloader.style.display === 'none') return;
      if (typeof window.dismissPreloader === 'function') {
        window.dismissPreloader();
        return;
      }

      const bar = document.getElementById('preloaderProgressBar');
      const counter = document.getElementById('preloaderPercent');
      if (!bar || !counter) {
        preloader.style.display = 'none';
        return;
      }

      let progress = 0;
      const startTime = performance.now();
      const duration = 750;

      function tick(now) {
        const elapsed = now - startTime;
        const current = Math.min(100, Math.floor((elapsed / duration) * 100));
        if (current > progress) {
          progress = current;
          bar.style.width = progress + '%';
          counter.textContent = progress + '%';
        }

        if (progress < 100) {
          requestAnimationFrame(tick);
        } else {
          setTimeout(() => {
            if (typeof gsap !== 'undefined') {
              gsap.timeline()
                .to('.preloader-content', { scale: 0.9, opacity: 0, duration: 0.3, ease: 'power2.in' })
                .to(preloader, {
                  yPercent: -100,
                  duration: 0.7,
                  ease: 'power4.inOut',
                  onComplete: () => {
                    preloader.style.display = 'none';
                    if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
                  }
                }, '-=0.1');
            } else {
              preloader.style.transition = 'transform 0.65s cubic-bezier(0.77, 0, 0.175, 1), opacity 0.4s ease';
              preloader.style.transform = 'translateY(-100%)';
              preloader.style.opacity = '0';
              setTimeout(() => { preloader.style.display = 'none'; }, 700);
            }
          }, 100);
        }
      }
      requestAnimationFrame(tick);
    }

    // --- 7. Awwwards-Grade GSAP Cinematic Intro Animation & Parallax ---
    function initMain() {
      initPreloader();
      initHeroParticles();
      initCursorHearts();
      initMagneticButtons();
      init3DTilt();
      restoreSavedLikes();

      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }

      if (typeof gsap === 'undefined') return;

      gsap.registerPlugin(ScrollTrigger);

      // Top Scroll Reading Progress Bar Scrub
      ScrollTrigger.create({
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          gsap.set('#scrollProgressBar', { width: (self.progress * 100) + '%' });
        }
      });

      // SplitType on section titles
      if (typeof SplitType !== 'undefined') {
        new SplitType('.split-title', { types: 'words, chars' });
      }

      // Master Intro Timeline
      const introTl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // 1. Split Text Entrance for "FEEL THE GLOW"
      introTl.to('.char', {
        y: '0%',
        duration: 1.1,
        stagger: 0.035,
        ease: 'power3.out'
      })
      // 2. Banner Scaling & Glow In
      .from('#heroBanner', {
        scale: 0.95,
        opacity: 0.3,
        duration: 1.2,
        ease: 'power3.out'
      }, '-=0.9')
      // 3. Hero Model Rising Up
      .from('#heroModelImg', {
        y: 80,
        opacity: 0,
        duration: 1.4,
        ease: 'power3.out'
      }, '-=1.0')
      // 4. Hero Left Overlay Stagger
      .from('#heroOverlay > *', {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power2.out'
      }, '-=1.1')
      // 5. Floating Glass Cards Spring Pop
      .from(['#floatCard1', '#floatCard2'], {
        scale: 0,
        opacity: 0,
        duration: 0.9,
        stagger: 0.18,
        ease: 'back.out(2)'
      }, '-=0.8')
      // 6. Ticker Tape Slide In
      .from('#tickerBar', {
        opacity: 0,
        y: 20,
        duration: 0.8
      }, '-=0.7')
      // 7. Continuous Organic Float on Hero Cards
      .add(() => {
        gsap.to('#floatCard1', { y: -12, rotation: 1.5, duration: 3.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
        gsap.to('#floatCard2', { y: -14, rotation: -1.5, duration: 3.8, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.4 });
      });

      // By The Numbers Smooth Counter Animation
      gsap.utils.toArray('.stat-number').forEach(stat => {
        const target = parseFloat(stat.getAttribute('data-target'));
        const suffix = stat.getAttribute('data-suffix') || '';
        const decimals = stat.getAttribute('data-decimals') ? parseInt(stat.getAttribute('data-decimals')) : 0;
        
        ScrollTrigger.create({
          trigger: stat,
          start: 'top 90%',
          once: true,
          onEnter: () => {
            const obj = { val: 0 };
            gsap.to(obj, {
              val: target,
              duration: 2.2,
              ease: 'power3.out',
              onUpdate: () => {
                if (decimals > 0) {
                  stat.textContent = obj.val.toFixed(decimals) + suffix;
                } else {
                  stat.textContent = Math.floor(obj.val).toLocaleString() + suffix;
                }
              }
            });
          }
        });
      });

      // Parallax Image Scrubbing on scroll
      gsap.utils.toArray('.parallax-img').forEach(img => {
        gsap.fromTo(img, 
          { y: -15 }, 
          {
            y: 15,
            ease: 'none',
            scrollTrigger: {
              trigger: img.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2
            }
          }
        );
      });

      // Section Headers Reveal
      gsap.utils.toArray('.reveal-header').forEach(header => {
        gsap.from(header.children, {
          scrollTrigger: {
            trigger: header,
            start: 'top 85%'
          },
          y: 35,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out'
        });
      });

      // Lookbook Cards Stagger
      gsap.from('#edits .edit-card', {
        scrollTrigger: {
          trigger: '#edits .edits-grid',
          start: 'top 85%'
        },
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out'
      });

      // Rankings Cards Stagger
      gsap.from('#rankings .ranking-card', {
        scrollTrigger: {
          trigger: '#rankings .rankings-grid',
          start: 'top 85%'
        },
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out'
      });

      // Quote Card Reveal
      gsap.from('#quoteCard', {
        scrollTrigger: {
          trigger: '#quotes',
          start: 'top 80%'
        },
        scale: 0.94,
        y: 40,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out'
      });

      // Wallpapers Cards Stagger
      gsap.from('#wallpapers .wallpaper-card', {
        scrollTrigger: {
          trigger: '#wallpapers .wallpapers-grid',
          start: 'top 85%'
        },
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out'
      });

      // Quiz Container
      gsap.from('#quiz .quiz-section-wrap', {
        scrollTrigger: {
          trigger: '#quiz',
          start: 'top 80%'
        },
        y: 50,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out'
      });

      // Gallery Cards
      gsap.from('#gallery .gallery-card', {
        scrollTrigger: {
          trigger: '#gallery .gallery-grid',
          start: 'top 85%'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
      });
    }

    if (document.readyState === 'loading') {
      window.addEventListener('DOMContentLoaded', initMain);
    } else {
      initMain();
    }

    // Back to top visibility listener
    window.addEventListener('scroll', () => {
      const btn = document.getElementById('backToTopBtn');
      if (window.scrollY > 450) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    });

    // --- 8. Toast Notification System ---
    let toastTimeout;
    function showToast(msg, icon = '✨') {
      const pill = document.getElementById('toastPill');
      const msgElem = document.getElementById('toastMessage');
      const iconElem = document.getElementById('toastIcon');
      
      msgElem.textContent = msg;
      iconElem.textContent = icon;
      pill.classList.add('show');
      
      clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => {
        pill.classList.remove('show');
      }, 3500);
    }

    // --- 9. Daily Aesthetic Quotes Collection & Shuffler (With Motion) ---
    const quotes = [
      {
        text: "You do not just exist; you arrive, you radiate, and you create your own light in every room you step into.",
        author: "— Rini’s Golden Hour Reflection",
        category: "✨ Daily Mindset"
      },
      {
        text: "Romanticize the warm mug between your palms, the golden sunbeams on your floor, and the quiet comfort of becoming who you are.",
        author: "— Rini’s Autumn Journal",
        category: "☕ Gentle Living"
      },
      {
        text: "Your vibe isn’t about being loud; it’s the quiet calm confidence of someone who knows their worth doesn't depend on anyone else.",
        author: "— Teen Self-Worth Letter",
        category: "🌿 Confidence"
      },
      {
        text: "Don't rush the season you're in. The prettiest flowers take time to root before they bloom under the sun.",
        author: "— Mindset for Exams & Growth",
        category: "🌸 Growth"
      },
      {
        text: "Drink your water, do your skincare, protect your peace, and never apologize for having high standards for your happiness.",
        author: "— Sunday Reset Diary",
        category: "🧴 Self-Care"
      },
      {
        text: "The aesthetic you are looking for is already inside you: kindness, creativity, and the courage to wear what makes you smile.",
        author: "— Rini’s Style Philosophy",
        category: "👗 Style & Aura"
      }
    ];
    let currentQuoteIdx = 0;

    function shuffleQuote(e) {
      playTone(523.25, 'triangle', 0.2);
      const display = document.getElementById('quoteDisplay');
      const author = document.getElementById('quoteAuthor');
      const cat = document.getElementById('quoteCategory');

      // GSAP Flip animation
      if (typeof gsap !== 'undefined') {
        gsap.to([display, author], {
          opacity: 0,
          y: -15,
          scale: 0.98,
          duration: 0.25,
          onComplete: () => {
            currentQuoteIdx = (currentQuoteIdx + 1) % quotes.length;
            const q = quotes[currentQuoteIdx];
            display.textContent = q.text;
            author.textContent = q.author;
            cat.textContent = q.category;

            gsap.to([display, author], {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.4,
              ease: 'back.out(1.4)'
            });
          }
        });
      } else {
        currentQuoteIdx = (currentQuoteIdx + 1) % quotes.length;
        const q = quotes[currentQuoteIdx];
        display.textContent = q.text;
        author.textContent = q.author;
        cat.textContent = q.category;
      }

      showToast('✨ Quote refreshed!');
    }

    function copyQuote(e) {
      playChime();
      const text = document.getElementById('quoteDisplay').textContent.trim();
      const author = document.getElementById('quoteAuthor').textContent.trim();
      const full = `"${text}" ${author} (via TeenTimeGlow.me)`;

      if (typeof confetti === 'function' && e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        confetti({
          particleCount: 25,
          spread: 45,
          origin: { x, y },
          colors: ['#E85D04', '#FAA307', '#0C3B2E', '#FFBA00']
        });
      }

      if (navigator.clipboard) {
        navigator.clipboard.writeText(full).then(() => {
          showToast('📋 Quote copied to clipboard! Share the glow.');
        }).catch(() => {
          showToast('📋 Quote copied!');
        });
      } else {
        showToast('📋 Quote copied to clipboard!');
      }
    }

    function shareQuote() {
      playTone(659.25, 'triangle', 0.2);
      const text = document.getElementById('quoteDisplay').textContent.trim();
      if (navigator.share) {
        navigator.share({
          title: 'TeenTimeGlow Daily Quote',
          text: `"${text}" — TeenTimeGlow.me`,
          url: 'https://www.teentimeglow.me'
        }).catch(() => {});
      } else {
        copyQuote();
      }
    }

    // --- 10. Filter Edits & Lookbooks ---
    function filterEdits(category, btn) {
      playTone(440, 'sine', 0.12, 0.05);
      document.querySelectorAll('#edits .filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cards = document.querySelectorAll('.edit-card');
      cards.forEach(card => {
        const match = category === 'all' || card.getAttribute('data-cat') === category;
        if (typeof gsap !== 'undefined') {
          if (match) {
            card.style.display = 'flex';
            gsap.fromTo(card, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.35 });
          } else {
            card.style.display = 'none';
          }
        } else {
          card.style.display = match ? 'flex' : 'none';
        }
      });
    }

    // --- 11. Filter Wallpapers ---
    function filterWallpapers(device, btn) {
      playTone(440, 'sine', 0.12, 0.05);
      document.querySelectorAll('#wallpapers .filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cards = document.querySelectorAll('.wallpaper-card');
      cards.forEach(card => {
        const match = device === 'all' || card.getAttribute('data-device') === device;
        if (typeof gsap !== 'undefined') {
          if (match) {
            card.style.display = 'flex';
            gsap.fromTo(card, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.35 });
          } else {
            card.style.display = 'none';
          }
        } else {
          card.style.display = match ? 'flex' : 'none';
        }
      });
    }

    function trackDownload(name, e) {
      playChime();
      if (typeof confetti === 'function' && e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        confetti({
          particleCount: 30,
          spread: 60,
          origin: { x, y },
          colors: ['#FAA307', '#E85D04', '#FFFFFF']
        });
      }
      showToast(`📱 Downloading "${name}" in 4K resolution!`, '📥');
      try {
        fetch('/api/wallpapers/download', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: name })
        }).catch(() => {});
      } catch (err) {}
    }

    // --- 12. Interactive Aesthetic Quiz (With Animated Progress & Confetti Rain) ---
    let quizAnswers = {};

    function selectQuizAnswer(step, answer) {
      playTone(523.25 + (step * 80), 'triangle', 0.15, 0.06);
      quizAnswers[step] = answer;
      const progress = document.getElementById('quizProgressFill');

      if (step === 1) {
        progress.style.width = '66.66%';
        transitionQuizStep('quizStep1', 'quizStep2');
      } else if (step === 2) {
        progress.style.width = '100%';
        transitionQuizStep('quizStep2', 'quizStep3');
      } else if (step === 3) {
        transitionQuizStep('quizStep3', null, calculateQuizResult);
      }
    }

    function transitionQuizStep(fromId, toId, callback) {
      const fromElem = document.getElementById(fromId);
      const toElem = toId ? document.getElementById(toId) : null;

      if (typeof gsap !== 'undefined') {
        gsap.to(fromElem, {
          opacity: 0,
          x: -25,
          duration: 0.25,
          onComplete: () => {
            fromElem.style.display = 'none';
            if (toElem) {
              toElem.style.display = 'block';
              gsap.fromTo(toElem, { opacity: 0, x: 25 }, { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' });
            }
            if (callback) callback();
          }
        });
      } else {
        fromElem.style.display = 'none';
        if (toElem) toElem.style.display = 'block';
        if (callback) callback();
      }
    }

    function calculateQuizResult() {
      playCelebrationChime();
      const resultView = document.getElementById('quizResult');
      const aura = document.getElementById('quizResultAura');
      const title = document.getElementById('quizResultTitle');
      const desc = document.getElementById('quizResultDesc');

      const ans1 = quizAnswers[1] || 'sunset';
      const ans2 = quizAnswers[2] || 'skincare';

      if (ans1 === 'matcha' || ans2 === 'skincare') {
        aura.textContent = 'Aura: Matcha Minimalist 🌿';
        title.textContent = 'The Clean & Mindful Glow';
        desc.textContent = 'You find serene beauty in glass skincare routines, quiet iced matcha mornings, gentle journaling, and clean porcelain pastel aesthetics. Your presence is soothing and calming.';
      } else if (ans1 === 'thrift' || ans2 === 'street') {
        aura.textContent = 'Aura: Vintage Street Muse 🧥';
        title.textContent = 'The Fearless Stylist';
        desc.textContent = 'You love unexpected thrifted treasures, oversized layered silhouettes, chunky loafers, and walking through autumn city streets with your favorite playlist on repeat.';
      } else if (ans1 === 'vinyl' || ans2 === 'knit') {
        aura.textContent = 'Aura: Cozy Bookish Soul 🎧';
        title.textContent = 'The Nostalgic Romantic';
        desc.textContent = 'You romanticize fairy lights, warm chunky knits, rainy Sunday study corners, and audiobooks that transport you straight into glamorous vintage eras.';
      } else {
        aura.textContent = 'Aura: Golden Sunset Muse ✨';
        title.textContent = 'The Radiant Visionary';
        desc.textContent = 'You embody high-energy golden hour warmth, unapologetic style, radiant confidence, and inspiring everyone around you to embrace their true glow.';
      }

      resultView.style.display = 'block';

      // Grand Confetti Blast for Quiz Completion
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#E85D04', '#FAA307', '#0C3B2E', '#FFBA00', '#FF5A36']
        });
      }

      showToast('🎉 Quiz complete! Your Glow Archetype is revealed.');
    }

    function restartQuiz() {
      playTone(440, 'sine', 0.2);
      quizAnswers = {};
      document.getElementById('quizProgressFill').style.width = '33.33%';
      document.getElementById('quizResult').style.display = 'none';
      document.getElementById('quizStep2').style.display = 'none';
      document.getElementById('quizStep3').style.display = 'none';
      document.getElementById('quizStep1').style.display = 'block';
      gsap.fromTo('#quizStep1', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.35 });
    }

    // --- 13. Community Likes with Floating Heart Particle Burst ---
    // --- 13. Community Likes with Persistent LocalStorage & Particle Burst ---
    let likedItems = {};
    try {
      likedItems = JSON.parse(localStorage.getItem('ttg_liked_items') || '{}');
    } catch (e) {
      likedItems = {};
    }

    function updateSavedMoodboardCounter() {
      const savedCountElem = document.getElementById('savedCount');
      if (savedCountElem) {
        const extraLikes = Object.values(likedItems).filter(Boolean).length;
        savedCountElem.textContent = 4 + extraLikes;
      }
    }

    function restoreSavedLikes() {
      try {
        Object.keys(likedItems).forEach(id => {
          if (likedItems[id]) {
            const likeElem = document.getElementById(`like-${id}`);
            if (likeElem) {
              let count = parseInt(likeElem.textContent.replace(/\D/g, '')) || 500;
              likeElem.textContent = `♥ ${count + 1}`;
              likeElem.style.color = '#E85D04';
            }
          }
        });
        updateSavedMoodboardCounter();
      } catch (e) {}
    }

    function showSavedMoodboardToast() {
      const count = document.getElementById('savedCount')?.textContent || '4';
      showToast(`♡ ${count} items saved to your personal Glow Moodboard!`);
    }

    function likeGalleryItem(id, e) {
      playBubblePop();
      const likeElem = document.getElementById(`like-${id}`);
      let count = parseInt(likeElem.textContent.replace(/\D/g, '')) || 500;

      if (!likedItems[id]) {
        likedItems[id] = true;
        count += 1;
        likeElem.textContent = `♥ ${count}`;
        likeElem.style.color = '#E85D04';

        if (typeof gsap !== 'undefined') {
          gsap.fromTo(likeElem, { scale: 1.4 }, { scale: 1, duration: 0.35, ease: 'back.out(2)' });
        }

        if (e) {
          const heart = document.createElement('div');
          heart.className = 'floating-heart';
          heart.textContent = '♥';
          heart.style.left = `${e.clientX}px`;
          heart.style.top = `${e.clientY}px`;
          heart.style.setProperty('--tx', `${(Math.random() - 0.5) * 50}px`);
          document.body.appendChild(heart);
          setTimeout(() => heart.remove(), 1100);
        }

        showToast('♥ Liked! Added to trending creations.');
      } else {
        likedItems[id] = false;
        count -= 1;
        likeElem.textContent = `♡ ${count}`;
        likeElem.style.color = '#E85D04';
      }

      try {
        localStorage.setItem('ttg_liked_items', JSON.stringify(likedItems));
      } catch (err) {}
      updateSavedMoodboardCounter();
    }

    // --- 14. Editorial Quick-View Modals ---
    const storyData = {
      skincare: {
        tag: 'Beauty & Skincare',
        title: 'The 5-Step Glass Skin Morning Ritual',
        image: 'assets/feature-skincare.jpg',
        readTime: '4 min read • ★ 4.9 by 340 teens',
        content: `
          <p style="margin-bottom: 14px; line-height: 1.6; color: #374151;">Achieving luminous, glazed "glass skin" isn't about covering up; it’s about deep hydration, gentle barrier protection, and nourishing your skin while you’re young.</p>
          <h4 style="font-size: 1.1rem; font-weight: 800; margin: 16px 0 8px;">Step 1: Gentle Low-pH Cleanser</h4>
          <p style="margin-bottom: 14px; line-height: 1.6; color: #374151;">Skip harsh stripping foams. Use a gentle lukewarm water rinse or a soothing milky cleanser that respects your natural microbiome.</p>
          <h4 style="font-size: 1.1rem; font-weight: 800; margin: 16px 0 8px;">Step 2: Hydrating Toner Layering (The 3-Skin Method)</h4>
          <p style="margin-bottom: 14px; line-height: 1.6; color: #374151;">Pat 2 to 3 thin layers of hyaluronic or heartleaf toner into damp skin. Notice how plump and refreshed your skin feels immediately.</p>
          <h4 style="font-size: 1.1rem; font-weight: 800; margin: 16px 0 8px;">Step 3: Snail Mucin & Barrier Serums</h4>
          <p style="margin-bottom: 14px; line-height: 1.6; color: #374151;">Lock in deep cellular moisture with ceramide or snail peptide essence to prevent redness and seasonal dry patches.</p>
          <h4 style="font-size: 1.1rem; font-weight: 800; margin: 16px 0 8px;">Step 4: Non-Greasy Dewy Sunscreen (SPF 50+)</h4>
          <p style="margin-bottom: 14px; line-height: 1.6; color: #374151;">The golden rule of teen skincare: your future self will thank you for daily sunscreen, even on overcast school mornings.</p>
        `
      },
      fashion: {
        tag: 'Fashion Lookbook',
        title: 'Autumn Warm Layering: Trench & Oversized Knits',
        image: 'assets/feature-fashion.jpg',
        readTime: '5 min read • ★ 5.0 by 512 teens',
        content: `
          <p style="margin-bottom: 14px; line-height: 1.6; color: #374151;">Autumn is the ultimate season for style experimentation. The secret to looking effortlessly chic lies in playing with contrasting textures and balanced silhouettes.</p>
          <h4 style="font-size: 1.1rem; font-weight: 800; margin: 16px 0 8px;">The Rule of Proportions</h4>
          <p style="margin-bottom: 14px; line-height: 1.6; color: #374151;">Pair an oversized outer layer (like a long thrifted trench or vintage knitwear) with sleek inner garments: ribbed turtlenecks or straight-leg dark denim.</p>
          <h4 style="font-size: 1.1rem; font-weight: 800; margin: 16px 0 8px;">Warm Earth Tone Palette</h4>
          <p style="margin-bottom: 14px; line-height: 1.6; color: #374151;">Stick to creamy oatmeals, burnt terracotta, forest matcha greens, and espresso browns for that timeless Pinterest autumn board look.</p>
          <h4 style="font-size: 1.1rem; font-weight: 800; margin: 16px 0 8px;">Accessorizing Like A Pro</h4>
          <p style="margin-bottom: 14px; line-height: 1.6; color: #374151;">Add chunky gold hoop earrings, a structured canvas tote bag, and wired headphones around your neck for that effortless high-school movie protagonist energy.</p>
        `
      },
      decor: {
        tag: 'Cozy Decor',
        title: 'How To Romanticize Your Study Corner',
        image: 'assets/feature-decor.jpg',
        readTime: '3 min read • ★ 4.8 by 290 teens',
        content: `
          <p style="margin-bottom: 14px; line-height: 1.6; color: #374151;">Your bedroom desk doesn't have to feel like a high-stress exam prison. With just 3 intentional tweaks, you can turn study hours into your most peaceful ritual.</p>
          <h4 style="font-size: 1.1rem; font-weight: 800; margin: 16px 0 8px;">1. Warm Ambient Lighting Only</h4>
          <p style="margin-bottom: 14px; line-height: 1.6; color: #374151;">Turn off the harsh overhead fluorescent ceiling light! Use a 2700K warm desk lamp paired with delicate amber fairy lights pinned to your corkboard.</p>
          <h4 style="font-size: 1.1rem; font-weight: 800; margin: 16px 0 8px;">2. Botanical Touches & Print Collages</h4>
          <p style="margin-bottom: 14px; line-height: 1.6; color: #374151;">Tape mini postcard prints of impressionist art, Polaroid photos with best friends, and a small pothos or succulent plant in a ceramic mug.</p>
          <h4 style="font-size: 1.1rem; font-weight: 800; margin: 16px 0 8px;">3. The Study Beverage Station</h4>
          <p style="margin-bottom: 14px; line-height: 1.6; color: #374151;">Keep an aesthetic glass tumbler with a glass straw filled with iced herbal tea or matcha. Hydration keeps focus sharp without afternoon crashes.</p>
        `
      },
      about: {
        tag: 'Creator Story',
        title: 'About Rini & TeenTimeGlow',
        image: 'assets/hero-glow-creator.jpg',
        readTime: '2 min read',
        content: `
          <p style="margin-bottom: 14px; line-height: 1.6; color: #374151;">Hey loves! Welcome to <strong>TeenTimeGlow</strong> — a dedicated sanctuary for teenage self-expression, glowing beauty, aesthetic spaces, and daily positive mindset.</p>
          <p style="margin-bottom: 14px; line-height: 1.6; color: #374151;">I created this website because so many teen blogs were either overloaded with aggressive advertisements or felt fake and disconnected from real high-school life. Here, everything is handpicked: genuine skincare routines that don't destroy your skin barrier, cozy book and show rankings, and free 4K wallpapers for your phones.</p>
          <p style="margin-bottom: 14px; line-height: 1.6; color: #374151;">Remember: you are growing, blooming, and writing your own story. Stay glowing, always!</p>
        `
      }
    };

    function openStoryModal(key) {
      playTone(523.25, 'triangle', 0.2);
      const data = storyData[key];
      if (!data) return;

      const content = document.getElementById('modalStoryContent');
      content.innerHTML = `
        <span class="section-pill-tag">${data.tag}</span>
        <h2 style="font-size: 1.75rem; font-weight: 800; margin: 10px 0; line-height: 1.25;">${data.title}</h2>
        <div style="font-size: 0.82rem; color: #6B7280; font-weight: 600; margin-bottom: 18px;">${data.readTime}</div>
        <img src="${data.image}" alt="${data.title}" style="width: 100%; max-height: 320px; object-fit: cover; border-radius: 16px; margin-bottom: 20px; box-shadow: 0 8px 24px rgba(0,0,0,0.1);" />
        <div>${data.content}</div>
        <div style="margin-top: 24px; padding-top: 18px; border-top: 1px solid #E5E7EB; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 0.85rem; font-weight: 700; color: #0C3B2E;">Tag #TeenTimeGlow on TikTok</span>
          <button class="btn-black-pill" onclick="closeStoryModalDirect()">Close Edit</button>
        </div>
      `;

      document.getElementById('storyModal').classList.add('active');
    }

    function closeStoryModal(e) {
      if (e.target.id === 'storyModal') {
        document.getElementById('storyModal').classList.remove('active');
      }
    }
    function closeStoryModalDirect() {
      playTone(392, 'sine', 0.15);
      document.getElementById('storyModal').classList.remove('active');
    }

    // --- 15. Community Submit Modal ---
    function openSubmitModal() {
      playTone(587.33, 'triangle', 0.2);
      document.getElementById('submitModal').classList.add('active');
    }
    function closeSubmitModal(e) {
      if (e.target.id === 'submitModal') {
        document.getElementById('submitModal').classList.remove('active');
      }
    }
    function closeSubmitModalDirect() {
      playTone(392, 'sine', 0.15);
      document.getElementById('submitModal').classList.remove('active');
    }

    async function handleSubmitCreation(e) {
      e.preventDefault();
      const name = document.getElementById('submitName').value;
      const title = document.getElementById('submitTitle').value;
      const category = document.getElementById('submitCategory')?.value || 'nails';
      const fileInput = document.getElementById('submitFile');

      const formData = new FormData();
      formData.append('name', name);
      formData.append('title', title);
      formData.append('category', category);
      if (fileInput && fileInput.files && fileInput.files[0]) {
        formData.append('file', fileInput.files[0]);
      }

      closeSubmitModalDirect();
      playCelebrationChime();
      if (typeof confetti === 'function') {
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.5 } });
      }
      showToast(`✨ Submitting "${title}" to Rini's inbox...`, '⏳');

      try {
        const res = await fetch('/api/community/submit', {
          method: 'POST',
          body: formData
        });
        const result = await res.json();
        if (result.success) {
          showToast(`🎉 Submitted! Rini will review your creation shortly.`, '✨');
        } else {
          showToast(`✨ Thanks ${name}! Submission queued for review!`, '🎉');
        }
      } catch (err) {
        showToast(`✨ Thanks ${name}! Submission queued for review!`, '🎉');
      }
      e.target.reset();
    }

    // --- 16. Newsletter Handler ---
    function handleNewsletter(e) {
      e.preventDefault();
      const email = document.getElementById('newsletterEmail').value;
      playCelebrationChime();
      if (typeof confetti === 'function') {
        confetti({ particleCount: 50, spread: 70, origin: { y: 0.8 } });
      }
      showToast(`💌 Welcome ${email} to The Glow Club! First edit on its way.`, '✨');
      e.target.reset();
    }

    // --- 16.5. Interactive Nav Search Handler ---
    function handleNavSearch(query) {
      // Optional live indicator
    }

    function executeNavSearch(query) {
      const q = (query || '').trim().toLowerCase();
      if (!q) return;

      if (q.includes('edit') || q.includes('fashion') || q.includes('lookbook') || q.includes('skincare') || q.includes('decor')) {
        document.getElementById('edits')?.scrollIntoView({ behavior: 'smooth' });
        showToast(`✨ Jumped to Editorial Edits for "${query}"`);
      } else if (q.includes('rank') || q.includes('book') || q.includes('series') || q.includes('prime') || q.includes('audio')) {
        document.getElementById('rankings')?.scrollIntoView({ behavior: 'smooth' });
        showToast(`✨ Jumped to Curated Rankings for "${query}"`);
      } else if (q.includes('quote') || q.includes('mindset') || q.includes('reflect')) {
        document.getElementById('quotes')?.scrollIntoView({ behavior: 'smooth' });
        showToast(`✨ Jumped to Daily Mindset Quote for "${query}"`);
      } else if (q.includes('wall') || q.includes('photo') || q.includes('4k') || q.includes('download')) {
        document.getElementById('wallpapers')?.scrollIntoView({ behavior: 'smooth' });
        showToast(`✨ Jumped to 4K Wallpapers for "${query}"`);
      } else if (q.includes('quiz') || q.includes('vibe') || q.includes('aura')) {
        document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' });
        showToast(`✨ Jumped to Glow Quiz for "${query}"`);
      } else if (q.includes('gallery') || q.includes('nail') || q.includes('community') || q.includes('ootd')) {
        document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
        showToast(`✨ Jumped to Community Gallery for "${query}"`);
      } else {
        showToast(`✨ Searching inspiration for "${query}"`);
        document.getElementById('edits')?.scrollIntoView({ behavior: 'smooth' });
      }
    }

    // --- 17. Mobile Drawer Menu Toggle ---
    function toggleDrawer(open) {
      playTone(open ? 523.25 : 392, 'sine', 0.15);
      const drawer = document.getElementById('mobileDrawer');
      if (open) {
        drawer.classList.add('open');
      } else {
        drawer.classList.remove('open');
      }
    }

    // Expose all interactive functions globally for template inline handlers
    if (typeof window !== 'undefined') {
      window.toggleSound = toggleSound;
      window.toggleDrawer = toggleDrawer;
      window.openStoryModal = openStoryModal;
      window.closeStoryModal = closeStoryModal;
      window.closeStoryModalDirect = closeStoryModalDirect;
      window.openSubmitModal = openSubmitModal;
      window.closeSubmitModal = closeSubmitModal;
      window.filterEdits = filterEdits;
      window.filterWallpapers = filterWallpapers;
      window.shuffleQuote = shuffleQuote;
      window.copyQuote = copyQuote;
      window.shareQuote = shareQuote;
      window.scrollToTop = scrollToTop;
      window.likeGalleryItem = likeGalleryItem;
      window.trackDownload = trackDownload;
      window.playAudiobookPreview = playAudiobookPreview;
      window.toggleAudioPreview = toggleAudioPreview;
      window.showToast = showToast;
      window.showSavedMoodboardToast = showSavedMoodboardToast;
      window.executeNavSearch = executeNavSearch;
      window.handleNavSearch = handleNavSearch;
      window.handleNewsletter = handleNewsletter;
    }
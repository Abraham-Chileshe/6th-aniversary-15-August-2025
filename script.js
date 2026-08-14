/* ==========================================================================
   6-MONTH ANNIVERSARY LOGIC & INTERACTION ENGINE (MOBILE NEUMORPHIC)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. CONFIG POPULATION & INITIALIZATION
    // ----------------------------------------------------------------------
    const cfg = window.ANNIVERSARY_CONFIG || {};

    // Elements
    const partnerHeading = document.getElementById('partner-heading');
    const audioTitle = document.getElementById('audio-title');
    const playerSongTitle = document.getElementById('player-song-title');
    const playerArtistName = document.getElementById('player-artist-name');
    const letterTitle = document.getElementById('letter-title');
    const letterBody = document.getElementById('letter-body');
    const yourSignatureName = document.getElementById('your-signature-name');
    const quizQuestionText = document.getElementById('quiz-question-text');
    const yesQuizBtn = document.getElementById('yes-quiz-btn');
    const noQuizBtn = document.getElementById('no-quiz-btn');
    const celebrationMsg = document.getElementById('celebration-msg');

    const mConfig = (window.ANNIVERSARY_CONFIG && window.ANNIVERSARY_CONFIG.music) ? window.ANNIVERSARY_CONFIG.music : (cfg.music || {});

    if (partnerHeading && cfg.partnerName) partnerHeading.textContent = `To ${cfg.partnerName}`;
    if (audioTitle) audioTitle.textContent = mConfig.bgTitle || "Our Romantic Melody";
    if (playerSongTitle) playerSongTitle.textContent = mConfig.songTitle || "A Song Written For You ❤️";
    if (playerArtistName) playerArtistName.textContent = mConfig.songArtist || "Written & Sang With All My Heart";
    if (letterTitle && cfg.letterTitle) letterTitle.textContent = cfg.letterTitle;
    if (yourSignatureName && cfg.yourName) yourSignatureName.textContent = cfg.yourName;
    if (quizQuestionText && cfg.quizQuestion) quizQuestionText.textContent = cfg.quizQuestion;
    if (yesQuizBtn && cfg.yesButtonText) yesQuizBtn.textContent = cfg.yesButtonText;
    if (noQuizBtn && cfg.noButtonText) noQuizBtn.textContent = cfg.noButtonText;
    if (celebrationMsg && cfg.successMessage) celebrationMsg.textContent = cfg.successMessage;

    // ----------------------------------------------------------------------
    // 2. LIVE ANNIVERSARY COUNTER
    // ----------------------------------------------------------------------
    function updateCounter() {
        const start = new Date(cfg.startDate || '2026-02-14').getTime();
        const now = new Date().getTime();
        const diff = Math.max(0, now - start);

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('count-days').textContent = days;
        document.getElementById('count-hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('count-mins').textContent = String(mins).padStart(2, '0');
        document.getElementById('count-secs').textContent = String(secs).padStart(2, '0');
    }
    setInterval(updateCounter, 1000);
    updateCounter();

    // ----------------------------------------------------------------------
    // 3. BACKGROUND CANVAS ENGINE (SOFT FLOATING HEARTS & FIREWORKS)
    // ----------------------------------------------------------------------
    const canvas = document.getElementById('bgCanvas');
    const ctx = canvas.getContext('2d');
    let width, height;

    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const bgParticles = [];
    const fireworks = [];

    for (let i = 0; i < 50; i++) {
        bgParticles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 2 + 1,
            speedY: Math.random() * 0.3 + 0.1,
            opacity: Math.random() * 0.6 + 0.2,
            type: Math.random() > 0.5 ? 'heart' : 'dot',
            pulseSpeed: Math.random() * 0.03 + 0.01
        });
    }

    function drawHeart(x, y, size, color, opacity) {
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.bezierCurveTo(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
        ctx.bezierCurveTo(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
        ctx.fill();
        ctx.restore();
    }

    function createFirework(x, y) {
        const colors = ['#ff5e7e', '#ff758c', '#d97706', '#9b51e0', '#ff85a2'];
        for (let i = 0; i < 36; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 4 + 1;
            fireworks.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: Math.random() * 3 + 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                alpha: 1,
                decay: Math.random() * 0.02 + 0.015
            });
        }
    }

    function animateCanvas() {
        ctx.clearRect(0, 0, width, height);

        bgParticles.forEach(p => {
            p.y -= p.speedY;
            if (p.y < -10) {
                p.y = height + 10;
                p.x = Math.random() * width;
            }

            p.opacity += Math.sin(Date.now() * p.pulseSpeed) * 0.005;
            p.opacity = Math.max(0.2, Math.min(0.8, p.opacity));

            if (p.type === 'heart') {
                drawHeart(p.x, p.y, p.size * 3, '#ff758c', p.opacity);
            } else {
                ctx.fillStyle = '#ff85a2';
                ctx.globalAlpha = p.opacity;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            }
        });

        for (let i = fireworks.length - 1; i >= 0; i--) {
            const f = fireworks[i];
            f.x += f.vx;
            f.y += f.vy;
            f.alpha -= f.decay;
            if (f.alpha <= 0) {
                fireworks.splice(i, 1);
                continue;
            }
            ctx.save();
            ctx.globalAlpha = f.alpha;
            ctx.fillStyle = f.color;
            ctx.beginPath();
            ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        requestAnimationFrame(animateCanvas);
    }
    animateCanvas();

    // ----------------------------------------------------------------------
    // 4. DUAL MP3 AUDIO CONTROLLER
    // ----------------------------------------------------------------------
    const bgAudio = new Audio(mConfig.bgAudioSrc || 'music/romantic.mp3');
    bgAudio.loop = true;

    const customAudio = new Audio(mConfig.songAudioSrc || 'music/CapCut2.mp3');
    customAudio.loop = false;

    const musicToggleBtn = document.getElementById('music-toggle-btn');
    const playerPlayBtn = document.getElementById('player-play-btn');
    const playBtnText = document.getElementById('play-btn-text');
    const equalizer = document.getElementById('equalizer');
    const vinylDiscWrapper = document.getElementById('vinyl-disc');

    // Autoplay background music immediately on load
    function playBgMusic() {
        if (customAudio.paused) {
            bgAudio.play().then(() => {
                if (equalizer) equalizer.classList.add('playing');
            }).catch(() => {
                // Autoplay blocked by browser policy until gesture
            });
        }
    }
    playBgMusic();

    // Gesture listeners: Modern browsers require 1 user gesture (tap/click/key) to allow audio playback
    const gestureEvents = ['click', 'touchstart', 'touchend', 'pointerdown', 'keydown'];
    gestureEvents.forEach(evt => {
        window.addEventListener(evt, () => {
            if (bgAudio.paused && customAudio.paused) {
                playBgMusic();
            }
        }, { passive: true });
    });

    function unlockApp() {
        playBgMusic();
        for (let i = 0; i < 6; i++) {
            createFirework(width / 2, height / 2);
        }
        goToChapter(2);
    }

    // Top Widget: Toggle Background Music (music/romantic.mp3)
    function toggleBgAudio() {
        if (!customAudio.paused) {
            customAudio.pause();
            if (vinylDiscWrapper) vinylDiscWrapper.classList.remove('playing');
            if (playBtnText) playBtnText.textContent = "Play My Song";
        }

        if (bgAudio.paused) {
            bgAudio.play().then(() => {
                if (equalizer) equalizer.classList.add('playing');
            }).catch(() => {});
        } else {
            bgAudio.pause();
            if (equalizer) equalizer.classList.remove('playing');
        }
    }

    // Chapter 4 Vinyl Player: Toggle Your Written Song (music/CapCut2.mp3)
    function toggleCustomSong() {
        if (!bgAudio.paused) {
            bgAudio.pause();
            if (equalizer) equalizer.classList.remove('playing');
        }

        if (customAudio.paused) {
            customAudio.play().then(() => {
                if (vinylDiscWrapper) vinylDiscWrapper.classList.add('playing');
                if (playBtnText) playBtnText.textContent = "Pause Song";
            }).catch(() => {});
        } else {
            customAudio.pause();
            if (vinylDiscWrapper) vinylDiscWrapper.classList.remove('playing');
            if (playBtnText) playBtnText.textContent = "Play My Song";
            // Automatically resume background music when custom song is paused
            playBgMusic();
        }
    }

    // Automatically resume background music when custom song ends!
    customAudio.addEventListener('ended', () => {
        if (vinylDiscWrapper) vinylDiscWrapper.classList.remove('playing');
        if (playBtnText) playBtnText.textContent = "Play My Song";
        playBgMusic();
    });

    if (musicToggleBtn) musicToggleBtn.addEventListener('click', toggleBgAudio);
    if (playerPlayBtn) playerPlayBtn.addEventListener('click', toggleCustomSong);

    // ----------------------------------------------------------------------
    // 5. NAVIGATION & CHAPTER CONTROLLER
    // ----------------------------------------------------------------------
    let isUnlocked = false;
    let currentChapter = 1;
    const chapters = document.querySelectorAll('.chapter-section');
    const navSteps = document.querySelectorAll('.nav-step');
    const lockCard = document.querySelector('.neu-passcode-box') || document.querySelector('.lock-container');

    function triggerPasscodeError() {
        if (lockCard) {
            lockCard.classList.add('shake-error');
            setTimeout(() => lockCard.classList.remove('shake-error'), 500);
        }
        passcodeDots.forEach(dot => dot.classList.add('error'));
        setTimeout(() => {
            passcodeDots.forEach(dot => dot.classList.remove('error'));
        }, 500);
    }

    function goToChapter(num) {
        if (num < 1 || num > 5) return;
        if (num > 1 && !isUnlocked) {
            triggerPasscodeError();
            return;
        }
        currentChapter = num;

        chapters.forEach(sec => {
            sec.classList.remove('active');
            if (parseInt(sec.id.replace('chapter-', '')) === num) {
                sec.classList.add('active');
            }
        });

        navSteps.forEach((step, idx) => {
            const stepNum = idx + 1;
            step.classList.remove('active', 'completed');
            if (stepNum === num) {
                step.classList.add('active');
            } else if (stepNum < num) {
                step.classList.add('completed');
            }
        });

        if (num === 5 && !window.letterTyped) {
            startTypewriterLetter();
        }
    }

    navSteps.forEach(step => {
        step.addEventListener('click', () => {
            const ch = parseInt(step.dataset.chapter);
            goToChapter(ch);
        });
    });

    document.querySelectorAll('.next-chapter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const nextCh = parseInt(btn.dataset.next);
            goToChapter(nextCh);
        });
    });

    // ----------------------------------------------------------------------
    // 6. CHAPTER 1: LOCK SCREEN & NEUMORPHIC KEYPAD
    // ----------------------------------------------------------------------
    const passcodeDots = document.querySelectorAll('#passcode-dots .dot');
    const unlockBtn = document.getElementById('unlock-btn');
    let enteredCode = "";

    function updatePasscodeDots() {
        passcodeDots.forEach((dot, idx) => {
            if (idx < enteredCode.length) {
                dot.classList.add('filled');
            } else {
                dot.classList.remove('filled');
            }
        });
    }

    function unlockApp() {
        const correctPasscode = (window.ANNIVERSARY_CONFIG && window.ANNIVERSARY_CONFIG.passcode) ? window.ANNIVERSARY_CONFIG.passcode : (cfg.passcode || '1818');
        if (enteredCode === correctPasscode) {
            isUnlocked = true;
            playBgMusic();
            for (let i = 0; i < 6; i++) {
                createFirework(width / 2, height / 2);
            }
            goToChapter(2);
        } else {
            triggerPasscodeError();
            setTimeout(() => {
                enteredCode = "";
                updatePasscodeDots();
            }, 500);
        }
    }

    if (unlockBtn) unlockBtn.addEventListener('click', unlockApp);

    document.querySelectorAll('.keypad-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.dataset.key;
            if (key === 'clear') {
                enteredCode = "";
                updatePasscodeDots();
            } else if (key === 'heart') {
                unlockApp();
            } else if (enteredCode.length < 4) {
                enteredCode += key;
                updatePasscodeDots();
                if (enteredCode.length === 4) {
                    setTimeout(unlockApp, 300);
                }
            }
        });
    });

    // ----------------------------------------------------------------------
    // 7. CHAPTER 2: POLAROID STORYBOOK & CAROUSEL
    // ----------------------------------------------------------------------
    const polaroidStack = document.getElementById('polaroid-stack');
    const prevCardBtn = document.getElementById('prev-card-btn');
    const nextCardBtn = document.getElementById('next-card-btn');
    const cardCounter = document.getElementById('card-counter');

    let currentCardIdx = 0;
    const memories = (window.ANNIVERSARY_CONFIG && window.ANNIVERSARY_CONFIG.memories) ? window.ANNIVERSARY_CONFIG.memories : (cfg.memories || []);

    function renderPolaroidCards() {
        if (!polaroidStack || memories.length === 0) return;
        polaroidStack.innerHTML = '';

        memories.forEach((mem, idx) => {
            const card = document.createElement('div');
            card.className = 'polaroid-card';
            card.dataset.index = idx;

            card.innerHTML = `
                <div class="polaroid-front">
                    <div class="polaroid-img-box">
                        <img src="${mem.image}" alt="${mem.title}" loading="lazy">
                    </div>
                    <div class="polaroid-caption">
                        <h3>${mem.title}</h3>
                        <span>${mem.date}</span>
                    </div>
                </div>
                <div class="polaroid-back">
                    <div class="polaroid-back-stamp"><i class="fas fa-heart"></i></div>
                    <h3>${mem.backTitle || 'Secret Memory'}</h3>
                    <p>"${mem.backText}"</p>
                </div>
            `;

            card.addEventListener('click', (e) => {
                // Toggle flip on card tap
                card.classList.toggle('flipped');
            });

            polaroidStack.appendChild(card);
        });

        updatePolaroidStackLayout();
    }

    function updatePolaroidStackLayout() {
        const cards = document.querySelectorAll('.polaroid-card');
        cards.forEach((card, idx) => {
            const offset = idx - currentCardIdx;
            if (offset === 0) {
                card.style.transform = `translate3d(0, 0, 0) scale(1) rotate(0deg)`;
                card.style.opacity = '1';
                card.style.zIndex = '10';
                card.style.pointerEvents = 'auto';
            } else if (offset > 0 && offset <= 2) {
                const scale = 1 - offset * 0.06;
                const translateY = offset * 12;
                const rotate = offset * 3;
                card.style.transform = `translate3d(0, ${translateY}px, -${offset * 20}px) scale(${scale}) rotate(${rotate}deg)`;
                card.style.opacity = '0.7';
                card.style.zIndex = `${10 - offset}`;
                card.style.pointerEvents = 'none';
            } else if (offset < 0 && offset >= -2) {
                const scale = 1 + offset * 0.06;
                const translateX = offset * 120;
                const rotate = offset * 10;
                card.style.transform = `translate3d(${translateX}px, 0, -20px) scale(${scale}) rotate(${rotate}deg)`;
                card.style.opacity = '0';
                card.style.zIndex = '0';
                card.style.pointerEvents = 'none';
            } else {
                card.style.opacity = '0';
                card.style.pointerEvents = 'none';
            }
        });

        if (cardCounter) {
            cardCounter.textContent = `${currentCardIdx + 1} / ${memories.length}`;
        }
    }

    if (prevCardBtn) {
        prevCardBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const cards = document.querySelectorAll('.polaroid-card');
            const currentCard = cards[currentCardIdx];
            
            if (currentCard && currentCard.classList.contains('flipped')) {
                // First click: unflip card back to front photo
                currentCard.classList.remove('flipped');
            } else if (currentCardIdx > 0) {
                // Second click: go to previous card
                currentCardIdx--;
                updatePolaroidStackLayout();
            }
        });
    }

    if (nextCardBtn) {
        nextCardBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const cards = document.querySelectorAll('.polaroid-card');
            const currentCard = cards[currentCardIdx];

            if (currentCard && !currentCard.classList.contains('flipped')) {
                // First click: flip card to show secret memory on back
                currentCard.classList.add('flipped');
            } else if (currentCardIdx < memories.length - 1) {
                // Second click: advance to next memory photo
                currentCardIdx++;
                updatePolaroidStackLayout();
            }
        });
    }

    let touchStartX = 0;
    if (polaroidStack) {
        polaroidStack.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });

        polaroidStack.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const diffX = touchEndX - touchStartX;
            if (diffX < -40 && currentCardIdx < memories.length - 1) {
                currentCardIdx++;
                updatePolaroidStackLayout();
            } else if (diffX > 40 && currentCardIdx > 0) {
                currentCardIdx--;
                updatePolaroidStackLayout();
            }
        }, { passive: true });
    }

    renderPolaroidCards();

    // ----------------------------------------------------------------------
    // 8. CHAPTER 3: 6 CONSTELLATION STARS & MODAL
    // ----------------------------------------------------------------------
    const constellationSky = document.getElementById('constellation-sky');
    const starsUnlockedCount = document.getElementById('stars-unlocked-count');
    const starModal = document.getElementById('star-modal');
    const closeStarModal = document.getElementById('close-star-modal');
    const modalMonthBadge = document.getElementById('modal-month-badge');
    const modalStarTitle = document.getElementById('modal-star-title');
    const modalStarText = document.getElementById('modal-star-text');
    const modalAckBtn = document.getElementById('modal-ack-btn');

    const starReasons = (window.ANNIVERSARY_CONFIG && window.ANNIVERSARY_CONFIG.starReasons) ? window.ANNIVERSARY_CONFIG.starReasons : (cfg.starReasons || []);
    const unlockedStars = new Set();

    const starPositions = [
        { top: '12%', left: '18%' },
        { top: '22%', left: '70%' },
        { top: '45%', left: '40%' },
        { top: '64%', left: '15%' },
        { top: '76%', left: '72%' },
        { top: '35%', left: '78%' }
    ];

    function renderStars() {
        if (!constellationSky) return;
        constellationSky.innerHTML = '';

        starReasons.forEach((reason, idx) => {
            const pos = starPositions[idx % starPositions.length];
            const star = document.createElement('div');
            star.className = 'sky-star';
            star.style.top = pos.top;
            star.style.left = pos.left;
            star.style.animationDelay = `${idx * 0.4}s`;

            star.innerHTML = `
                <i class="fas fa-star"></i>
                <span>${reason.month || `M${idx + 1}`}</span>
            `;

            star.addEventListener('click', () => {
                openStarModal(reason, idx, star);
            });

            constellationSky.appendChild(star);
        });
    }

    function openStarModal(reason, idx, starElem) {
        unlockedStars.add(idx);
        starElem.classList.add('unlocked');
        if (starsUnlockedCount) {
            starsUnlockedCount.textContent = `${unlockedStars.size} of ${starReasons.length} stars unlocked`;
        }

        if (modalMonthBadge) modalMonthBadge.textContent = reason.month || `Month ${idx + 1}`;
        if (modalStarTitle) modalStarTitle.textContent = reason.title;
        if (modalStarText) modalStarText.textContent = `"${reason.text}"`;

        if (starModal) starModal.classList.add('active');

        const rect = starElem.getBoundingClientRect();
        createFirework(rect.left + 20, rect.top + 20);
    }

    if (closeStarModal) {
        closeStarModal.addEventListener('click', () => {
            if (starModal) starModal.classList.remove('active');
        });
    }

    if (modalAckBtn) {
        modalAckBtn.addEventListener('click', () => {
            if (starModal) starModal.classList.remove('active');
        });
    }

    renderStars();

    // ----------------------------------------------------------------------
    // 9. CHAPTER 4: LOVE COUPONS
    // ----------------------------------------------------------------------
    const couponsGrid = document.getElementById('coupons-grid');
    const coupons = (window.ANNIVERSARY_CONFIG && window.ANNIVERSARY_CONFIG.coupons) ? window.ANNIVERSARY_CONFIG.coupons : (cfg.coupons || []);

    function renderCoupons() {
        if (!couponsGrid) return;
        couponsGrid.innerHTML = '';

        coupons.forEach((cpn) => {
            const card = document.createElement('div');
            card.className = 'coupon-card';

            const waText = encodeURIComponent(`Hey my love! ❤️ I chose this 6-Month Anniversary coupon:\n\n*${cpn.title}*\nCode: ${cpn.code}`);
            const waUrl = `https://wa.me/?text=${waText}`;

            card.innerHTML = `
                <span class="coupon-badge">${cpn.badge}</span>
                <h4>${cpn.title}</h4>
                <p>${cpn.desc}</p>
                <div class="coupon-reveal-box" style="display:none;">
                    <div class="coupon-code">CODE: ${cpn.code}</div>
                    <a href="${waUrl}" target="_blank" class="wa-send-btn" onclick="event.stopPropagation();">
                        <i class="fab fa-whatsapp"></i> Send on WhatsApp
                    </a>
                </div>
            `;

            card.addEventListener('click', () => {
                card.classList.add('revealed');
                const revealBox = card.querySelector('.coupon-reveal-box');
                if (revealBox) revealBox.style.display = 'flex';

                const rect = card.getBoundingClientRect();
                createFirework(rect.left + rect.width / 2, rect.top + rect.height / 2);
            });

            couponsGrid.appendChild(card);
        });
    }
    renderCoupons();

    // ----------------------------------------------------------------------
    // 10. CHAPTER 5: FINALE LETTER & ESCAPING NO BUTTON
    // ----------------------------------------------------------------------
    window.letterTyped = false;

    function startTypewriterLetter() {
        window.letterTyped = true;
        const text = (window.ANNIVERSARY_CONFIG && window.ANNIVERSARY_CONFIG.letterBody) ? window.ANNIVERSARY_CONFIG.letterBody : (cfg.letterBody || "");
        letterBody.textContent = "";

        let idx = 0;
        function typeChar() {
            if (idx < text.length) {
                const char = text.charAt(idx);
                letterBody.textContent += char;
                idx++;

                let speed = 45; // Smooth emotional typing speed
                if (char === '.' || char === '!' || char === '?') {
                    speed = 220; // Natural pause after sentence ends
                } else if (char === ',' || char === '—') {
                    speed = 120; // Soft pause after commas
                }

                setTimeout(typeChar, speed);
            }
        }
        typeChar();
    }

    if (noQuizBtn) {
        function escapeNoButton() {
            const quizContainer = noQuizBtn.parentElement;
            const containerRect = quizContainer.getBoundingClientRect();
            const btnRect = noQuizBtn.getBoundingClientRect();

            const maxX = Math.max(10, containerRect.width - btnRect.width - 20);
            const maxY = Math.max(10, containerRect.height - btnRect.height - 10);

            const randomX = Math.floor(Math.random() * maxX);
            const randomY = Math.floor(Math.random() * maxY);

            noQuizBtn.style.position = 'absolute';
            noQuizBtn.style.left = `${randomX}px`;
            noQuizBtn.style.top = `${randomY}px`;
        }

        noQuizBtn.addEventListener('mouseenter', escapeNoButton);
        noQuizBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            escapeNoButton();
        });
    }

    const finaleModal = document.getElementById('finale-modal');
    const replayBtn = document.getElementById('replay-btn');

    if (yesQuizBtn) {
        yesQuizBtn.addEventListener('click', () => {
            if (finaleModal) finaleModal.classList.add('active');

            for (let i = 0; i < 8; i++) {
                setTimeout(() => {
                    createFirework(
                        Math.random() * width,
                        Math.random() * (height * 0.6)
                    );
                }, i * 300);
            }
        });
    }

    if (replayBtn) {
        replayBtn.addEventListener('click', () => {
            if (finaleModal) finaleModal.classList.remove('active');
            goToChapter(1);
        });
    }
});

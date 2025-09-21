// ========================================
// FLOWER APP - Aplicación de flores
// ========================================

class FlowerApp {
    constructor() {
        this.audio = null;
        this.playPauseBtn = null;
        this.progress = null;
        this.progressBar = null;
        this.currentTimeEl = null;
        this.durationEl = null;
        this.subtitleEnglish = null;
        this.subtitleSpanish = null;
        this.subtitles = [];
        this.init();
    }

    init() {
        // Esperar a que el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.setupBodyAnimation();
        this.setupAudioPlayer();
        this.setupSubtitles();
    }

    setupBodyAnimation() {
        // Remover la clase container del body al cargar
        document.body.classList.remove('container');
    }

    setupAudioPlayer() {
        this.audio = document.getElementById('audio');
        this.playPauseBtn = document.getElementById('playPauseBtn');
        this.progress = document.getElementById('progress');
        this.progressBar = document.querySelector('.progress-bar');
        this.currentTimeEl = document.getElementById('currentTime');
        this.durationEl = document.getElementById('duration');

        if (!this.audio || !this.playPauseBtn) return;

        // Event listeners
        this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
        this.progressBar.addEventListener('click', (e) => this.setProgress(e));
        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('loadedmetadata', () => this.updateDuration());
        this.audio.addEventListener('ended', () => this.onAudioEnded());
    }

    setupSubtitles() {
        this.subtitleEnglish = document.getElementById('subtitleEnglish');
        this.subtitleSpanish = document.getElementById('subtitleSpanish');
        
        // Subtitle data with timing
        this.subtitles = [
            { start: 17, end: 19, english: "At the time", spanish: "En ese momento" },
            { start: 21, end: 26, english: "The whisper of birds", spanish: "El susurro de los pájaros" },
            { start: 28, end: 33, english: "Lonely before the sun cried", spanish: "Solitario antes de que el sol llorara" },
            { start: 35, end: 37, english: "Fell from the sky", spanish: "Cayó del cielo" },
            { start: 37.5, end: 41, english: "Like water drops", spanish: "Como gotas de agua" },
            { start: 42, end: 48, english: "Where I'm now?<br>I don't know why", spanish: "¿Dónde estoy ahora?<br>No sé por qué" },
            { start: 49, end: 53, english: "Nice butterflies in my hands", spanish: "Lindas mariposas en mis manos" },
            { start: 55, end: 60, english: "Too much light for twilight", spanish: "Demasiada luz para el crepúsculo" },
            { start: 61, end: 70, english: "In the mood for the flowers love", spanish: "Con ánimo para el amor de las flores" },
            { start: 68, end: 74, english: "That vision", spanish: "Esa visión" },
            { start: 73, end: 77, english: "Really strong, blew my mind", spanish: "Realmente fuerte, me voló la mente" },
            { start: 79, end: 85, english: "Silence Let me see what it was", spanish: "Silencio, déjame ver qué era" },
            { start: 86, end: 89, english: "I only want to live in clouds", spanish: "Solo quiero vivir en las nubes" },
            { start: 93, end: 99, english: "Where I'm now?<br>I don't know why", spanish: "¿Dónde estoy ahora?<br>No sé por qué" },
            { start: 100, end: 105, english: "Nice butterflies in my hands", spanish: "Lindas mariposas en mis manos" },
            { start: 106, end: 111, english: "Too much light for twilight", spanish: "Demasiada luz para el crepúsculo" },
            { start: 112, end: 117, english: "In the mood for the flowers love", spanish: "Con ánimo para el amor de las flores" },
            { start: 145, end: 147, english: "At the time", spanish: "En ese momento" },
            { start: 150, end: 153, english: "The whisper of birds", spanish: "El susurro de los pájaros" },
            { start: 156, end: 161, english: "Lonely before the sun cried", spanish: "Solitario antes de que el sol llorara" },
            { start: 163, end: 165, english: "Fell from the sky", spanish: "Cayó del cielo" },
            { start: 165, end: 170, english: "Like water drops", spanish: "Como gotas de agua" },
            { start: 170, end: 176, english: "Where I'm now?<br>I don't know why", spanish: "¿Dónde estoy ahora?<br>No sé por qué" },
            { start: 176.5, end: 182, english: "Nice butterflies in my hands", spanish: "Lindas mariposas en mis manos" },
            { start: 184, end: 188, english: "Too much light for twilight", spanish: "Demasiada luz para el crepúsculo" },
            { start: 184, end: 196, english: "In the mood for the flowers", spanish: "Con ánimo para las flores" },
            { start: 201, end: 208, english: "Love", spanish: "Amor" }
        ];
    }


    togglePlayPause() {
        if (this.audio.paused) {
            this.audio.play();
            this.playPauseBtn.classList.add('playing');
        } else {
            this.audio.pause();
            this.playPauseBtn.classList.remove('playing');
        }
    }

    setProgress(e) {
        const width = this.progressBar.clientWidth;
        const clickX = e.offsetX;
        const duration = this.audio.duration;
        this.audio.currentTime = (clickX / width) * duration;
    }

    updateProgress() {
        const { duration, currentTime } = this.audio;
        const progressPercent = (currentTime / duration) * 100;
        this.progress.style.width = `${progressPercent}%`;
        
        this.currentTimeEl.textContent = this.formatTime(currentTime);
        this.updateSubtitles(currentTime);
    }

    updateDuration() {
        this.durationEl.textContent = this.formatTime(this.audio.duration);
    }

    onAudioEnded() {
        this.playPauseBtn.classList.remove('playing');
        this.progress.style.width = '0%';
        this.currentTimeEl.textContent = '0:00';
        this.clearSubtitles();
    }

    updateSubtitles(currentTime) {
        // Find the current subtitle based on time
        const currentSubtitle = this.subtitles.find(subtitle => 
            currentTime >= subtitle.start && currentTime <= subtitle.end
        );

        if (currentSubtitle) {
            // Show current subtitle
            this.subtitleEnglish.innerHTML = currentSubtitle.english;
            this.subtitleSpanish.innerHTML = currentSubtitle.spanish;
            this.subtitleEnglish.classList.add('active');
            this.subtitleSpanish.classList.add('active');
        } else {
            // Hide subtitles if no match
            this.clearSubtitles();
        }
    }

    clearSubtitles() {
        this.subtitleEnglish.classList.remove('active');
        this.subtitleSpanish.classList.remove('active');
        this.subtitleEnglish.innerHTML = '';
        this.subtitleSpanish.innerHTML = '';
    }

    formatTime(time) {
        if (isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

}

// Inicializar la aplicación cuando el DOM esté listo
const flowerApp = new FlowerApp();

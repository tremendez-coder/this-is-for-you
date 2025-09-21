// ========================================
// FLOWER APP - Aplicación de flores con audio
// ========================================

class FlowerApp {
    constructor() {
        this.audio = null;
        this.lyrics = null;
        this.isPlaying = false;
        this.lyricsData = [
            { text: "At the time", textEs: "En ese momento", time: 15 },
            { text: "The whisper of birds", textEs: "El susurro de los pájaros", time: 18 },
            { text: "Lonely before the sun cried", textEs: "Solo antes de que el sol llorara", time: 27 },
            { text: "Fell from the sky", textEs: "Cayó del cielo", time: 32 },
            { text: "Like water drops", textEs: "Como gotas de agua", time: 33 },
            { text: "Where I'm now? I don't know why", textEs: "¿Dónde estoy ahora? No sé por qué", time: 41 },
            { text: "Nice butterflies in my hands", textEs: "Bonitas mariposas en mis manos", time: 47 },
            { text: "Too much light for twilight", textEs: "Demasiada luz para el crepúsculo", time: 54 },
            { text: "In the mood for the flowers love", textEs: "De humor para el amor de las flores", time: 59 },
            { text: "That vision", textEs: "Esa visión", time: 67 },
            { text: "Really strong, blew my mind", textEs: "Realmente fuerte, me voló la mente", time: 72 },
            { text: "Silence Let me see what it was", textEs: "Silencio, déjame ver qué era", time: 78 },
            { text: "I only want to live in clouds", textEs: "Solo quiero vivir en las nubes", time: 83 },
            { text: "Where I'm now? I don't know why", textEs: "¿Dónde estoy ahora? No sé por qué", time: 91 },
            { text: "Nice butterflies in my hands", textEs: "Bonitas mariposas en mis manos", time: 97 },
            { text: "Too much light for twilight", textEs: "Demasiada luz para el crepúsculo", time: 104 },
            { text: "In the mood for the flowers love", textEs: "De humor para el amor de las flores", time: 108 },
            { text: "At the time", textEs: "En ese momento", time: 144 },
            { text: "The whisper of birds", textEs: "El susurro de los pájaros", time: 148 },
            { text: "Lonely before the sun cried", textEs: "Solo antes de que el sol llorara", time: 153 },
            { text: "Fell from the sky", textEs: "Cayó del cielo", time: 158 },
            { text: "Like water drops", textEs: "Como gotas de agua", time: 164 },
            { text: "Where I'm now? I don't know why", textEs: "¿Dónde estoy ahora? No sé por qué", time: 169 },
            { text: "Nice butterflies in my hands", textEs: "Bonitas mariposas en mis manos", time: 176 },
            { text: "Too much light for twilight", textEs: "Demasiada luz para el crepúsculo", time: 183 },
            { text: "In the mood for the flowers", textEs: "De humor para las flores", time: 188 },
            { text: "Love.", textEs: "Amor.", time: 140 }
        ];
        
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
        this.audio = document.getElementById('audioPlayer');
        this.lyrics = document.getElementById('lyrics');
        this.lyricsEs = document.getElementById('lyrics-es');
        
        if (!this.audio) {
            console.error('Elemento de audio no encontrado');
            return;
        }

        this.setupAudioControls();
        this.setupLyrics();
        this.setupTitleAnimation();
        this.setupBodyAnimation();
    }

    setupAudioControls() {
        const playPauseBtn = document.getElementById('playPauseBtn');
        const volumeSlider = document.getElementById('volumeSlider');
        const progressBar = document.querySelector('.progress-bar');
        const progress = document.getElementById('progress');
        const timeDisplay = document.getElementById('timeDisplay');

        if (!playPauseBtn || !volumeSlider || !progressBar || !progress || !timeDisplay) {
            console.error('Controles de audio no encontrados');
            return;
        }

        // Configurar volumen inicial
        this.audio.volume = 0.5;

        // Botón play/pause
        playPauseBtn.addEventListener('click', () => this.togglePlayPause());

        // Control de volumen
        volumeSlider.addEventListener('input', (e) => {
            this.audio.volume = e.target.value / 100;
        });

        // Barra de progreso
        progressBar.addEventListener('click', (e) => {
            const rect = progressBar.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const percentage = clickX / rect.width;
            this.audio.currentTime = percentage * this.audio.duration;
        });

        // Actualizar progreso y tiempo
        this.audio.addEventListener('timeupdate', () => {
            this.updateProgress(progress, timeDisplay);
        });

        // Actualizar botón cuando cambie el estado de reproducción
        this.audio.addEventListener('play', () => {
            this.isPlaying = true;
            playPauseBtn.textContent = '⏸️';
        });

        this.audio.addEventListener('pause', () => {
            this.isPlaying = false;
            playPauseBtn.textContent = '▶️';
        });

        // Manejar el final de la canción
        this.audio.addEventListener('ended', () => {
            this.isPlaying = false;
            playPauseBtn.textContent = '▶️';
        });
    }

    togglePlayPause() {
        if (this.isPlaying) {
            this.audio.pause();
        } else {
            this.audio.play().catch(error => {
                console.error('Error al reproducir audio:', error);
            });
        }
    }

    updateProgress(progressElement, timeDisplayElement) {
        if (this.audio.duration) {
            const percentage = (this.audio.currentTime / this.audio.duration) * 100;
            progressElement.style.width = percentage + '%';
            
            const currentTime = this.formatTime(this.audio.currentTime);
            const duration = this.formatTime(this.audio.duration);
            timeDisplayElement.textContent = `${currentTime} / ${duration}`;
        }
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    setupLyrics() {
        if (!this.lyrics) return;

        // Actualizar letras cada segundo
        setInterval(() => this.updateLyrics(), 1000);
    }

    updateLyrics() {
        if (!this.audio || !this.lyrics || !this.lyricsEs) return;

        const time = Math.floor(this.audio.currentTime);
        const currentLine = this.lyricsData.find(
            line => time >= line.time && time < line.time + 6
        );

        if (currentLine) {
            // Calcula la opacidad basada en el tiempo en la línea actual
            const fadeInDuration = 0.1; // Duración del efecto de aparición en segundos
            const opacity = Math.min(1, (time - currentLine.time) / fadeInDuration);

            // Aplica el efecto de aparición a ambos subtítulos
            this.lyrics.style.opacity = opacity;
            this.lyrics.innerHTML = currentLine.text;
            
            this.lyricsEs.style.opacity = opacity;
            this.lyricsEs.innerHTML = currentLine.textEs;
        } else {
            // Restablece la opacidad y el contenido si no hay una línea actual
            this.lyrics.style.opacity = 0;
            this.lyrics.innerHTML = '';
            this.lyricsEs.style.opacity = 0;
            this.lyricsEs.innerHTML = '';
        }
    }

    setupTitleAnimation() {
        const titulo = document.querySelector('.titulo');
        if (!titulo) return;

        // Función para ocultar el título después de 216 segundos
        const ocultarTitulo = () => {
            titulo.style.animation = 'fadeOut 3s ease-in-out forwards';
            setTimeout(() => {
                titulo.style.display = 'none';
            }, 3000);
        };

        // Llama a la función después de 216 segundos (216,000 milisegundos)
        setTimeout(ocultarTitulo, 216000);
    }

    setupBodyAnimation() {
        // Remover la clase container del body al cargar
        document.body.classList.remove('container');
    }
}

// Inicializar la aplicación cuando el DOM esté listo
const flowerApp = new FlowerApp();

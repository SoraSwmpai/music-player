// Music Player Class
class MusicPlayer {
    constructor() {
        this.audio = document.getElementById('audioPlayer');
        this.playBtn = document.getElementById('playBtn');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.volumeSlider = document.getElementById('volumeSlider');
        this.progressBar = document.getElementById('progressBar');
        this.currentTimeSpan = document.getElementById('currentTime');
        this.totalTimeSpan = document.getElementById('totalTime');
        this.songTitle = document.getElementById('songTitle');
        this.artistName = document.getElementById('artistName');
        this.albumArt = document.getElementById('albumArt');
        this.playlist = document.getElementById('playlist');
        this.uploadBtn = document.getElementById('uploadBtn');
        
        this.currentSongIndex = 0;
        this.isPlaying = false;
        this.songs = [];
        
        this.initializeEventListeners();
        this.loadDefaultPlaylist();
    }
    
    initializeEventListeners() {
        // Play/Pause button
        this.playBtn.addEventListener('click', () => this.togglePlay());
        
        // Previous/Next buttons
        this.prevBtn.addEventListener('click', () => this.previousSong());
        this.nextBtn.addEventListener('click', () => this.nextSong());
        
        // Volume control
        this.volumeSlider.addEventListener('input', (e) => {
            this.audio.volume = e.target.value / 100;
        });
        
        // Progress bar click
        this.progressBar.parentElement.addEventListener('click', (e) => {
            const rect = e.target.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            this.audio.currentTime = percent * this.audio.duration;
        });
        
        // Audio events
        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('ended', () => this.nextSong());
        this.audio.addEventListener('loadedmetadata', () => this.updateTotalTime());
        this.audio.addEventListener('play', () => this.updatePlayButton(true));
        this.audio.addEventListener('pause', () => this.updatePlayButton(false));
        
        // Upload button
        this.uploadBtn.addEventListener('click', () => this.openFileUpload());
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            switch(e.code) {
                case 'Space':
                    e.preventDefault();
                    this.togglePlay();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    if (e.ctrlKey || e.metaKey) {
                        // Ctrl/Cmd + Left = Volume 0
                        this.volumeSlider.value = 0;
                        this.audio.volume = 0;
                    } else {
                        this.previousSong();
                    }
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    if (e.ctrlKey || e.metaKey) {
                        // Ctrl/Cmd + Right = Volume 100
                        this.volumeSlider.value = 100;
                        this.audio.volume = 1;
                    } else {
                        this.nextSong();
                    }
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    this.volumeSlider.value = Math.min(100, parseInt(this.volumeSlider.value) + 10);
                    this.audio.volume = this.volumeSlider.value / 100;
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    this.volumeSlider.value = Math.max(0, parseInt(this.volumeSlider.value) - 10);
                    this.audio.volume = this.volumeSlider.value / 100;
                    break;
            }
        });
    }
    
    loadDefaultPlaylist() {
        // Sample playlist - you'll need to add your own audio files
        this.songs = [
            {
                title: "Sapphire",
                artist: "Ed Sheeran",
                src: "audio/Sapphire.mp3",
                duration: "0:00",
                albumArt: "images/sapphire.jpg"
            },
            {
                title: "Safari", 
                artist: "Sarena",
                src: "audio/Safari.mp3",
                duration: "0:00",
                albumArt: "images/safari.jpg"
            },
            {
                title: "Alone Pt. II",
                artist: "Alan Walker Ava Max ", 
                src: "audio/Alone Pt. II.mp3",
                duration: "0:00",
                albumArt: "images/alone_p2.jpg"
            }
        ];
        
        this.renderPlaylist();
        this.loadSong(0);
    }
    
    renderPlaylist() {
        this.playlist.innerHTML = '';
        
        if (this.songs.length === 0) {
            this.playlist.innerHTML = `
                <div class="text-center text-muted py-4">
                    <i class="fas fa-music fa-3x mb-3"></i>
                    <p>No songs in playlist</p>
                    <p class="small">Click "Add Audio Files" to get started</p>
                </div>
            `;
            return;
        }
        
        this.songs.forEach((song, index) => {
            const playlistItem = document.createElement('div');
            playlistItem.className = 'playlist-item fade-in';
            playlistItem.innerHTML = `
                <i class="fas fa-music"></i>
                <div class="playlist-item-info">
                    <div class="playlist-item-title">${song.title}</div>
                    <div class="playlist-item-artist">${song.artist}</div>
                </div>
                <div class="playlist-item-duration">${song.duration}</div>
            `;
            
            playlistItem.addEventListener('click', () => {
                this.loadSong(index);
                this.play();
            });
            
            this.playlist.appendChild(playlistItem);
        });
    }
    
    loadSong(index) {
        if (index < 0 || index >= this.songs.length) return;
        
        this.currentSongIndex = index;
        const song = this.songs[index];
        
        this.audio.src = song.src;
        this.songTitle.textContent = song.title;
        this.artistName.textContent = song.artist;
        
        // Update album art
        if (song.albumArt) {
            const img = document.createElement('img');
            img.src = song.albumArt;
            img.alt = song.title;
            img.onload = () => {
                this.albumArt.innerHTML = '';
                this.albumArt.appendChild(img);
            };
            img.onerror = () => {
                this.albumArt.innerHTML = '<i class="fas fa-music album-placeholder"></i>';
            };
        } else {
            this.albumArt.innerHTML = '<i class="fas fa-music album-placeholder"></i>';
        }
        
        // Update active playlist item
        this.updateActivePlaylistItem();
        
        // Add loading animation
        this.albumArt.classList.add('loading');
        this.audio.addEventListener('canplay', () => {
            this.albumArt.classList.remove('loading');
        }, { once: true });
        
        // Get duration when audio loads
        this.audio.addEventListener('loadedmetadata', () => {
            if (!isNaN(this.audio.duration)) {
                const duration = this.formatTime(this.audio.duration);
                this.songs[index].duration = duration;
                this.updatePlaylistDuration(index, duration);
            }
        }, { once: true });
    }
    
    updatePlaylistDuration(index, duration) {
        const playlistItems = this.playlist.querySelectorAll('.playlist-item');
        if (playlistItems[index]) {
            const durationElement = playlistItems[index].querySelector('.playlist-item-duration');
            if (durationElement) {
                durationElement.textContent = duration;
            }
        }
    }
    
    updateActivePlaylistItem() {
        const playlistItems = this.playlist.querySelectorAll('.playlist-item');
        playlistItems.forEach((item, index) => {
            item.classList.toggle('active', index === this.currentSongIndex);
        });
    }
    
    togglePlay() {
        if (this.audio.src) {
            if (this.isPlaying) {
                this.pause();
            } else {
                this.play();
            }
        }
    }
    
    play() {
        this.audio.play().catch(error => {
            console.error('Error playing audio:', error);
            this.showNotification('Error playing audio. Please check if audio files are available.');
        });
    }
    
    pause() {
        this.audio.pause();
    }
    
    previousSong() {
        const newIndex = this.currentSongIndex > 0 ? this.currentSongIndex - 1 : this.songs.length - 1;
        this.loadSong(newIndex);
        if (this.isPlaying) this.play();
    }
    
    nextSong() {
        const newIndex = this.currentSongIndex < this.songs.length - 1 ? this.currentSongIndex + 1 : 0;
        this.loadSong(newIndex);
        if (this.isPlaying) this.play();
    }
    
    updateProgress() {
        if (this.audio.duration) {
            const progress = (this.audio.currentTime / this.audio.duration) * 100;
            this.progressBar.style.width = progress + '%';
            this.currentTimeSpan.textContent = this.formatTime(this.audio.currentTime);
        }
    }
    
    updateTotalTime() {
        this.totalTimeSpan.textContent = this.formatTime(this.audio.duration);
    }
    
    updatePlayButton(playing) {
        this.isPlaying = playing;
        const icon = this.playBtn.querySelector('i');
        if (playing) {
            icon.className = 'fas fa-pause';
            this.albumArt.style.animation = 'spin 20s linear infinite';
        } else {
            icon.className = 'fas fa-play';
            this.albumArt.style.animation = 'none';
        }
    }
    
    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    
    openFileUpload() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'audio/*';
        input.multiple = true;
        input.onchange = (e) => {
            const files = Array.from(e.target.files);
            this.addFilesToPlaylist(files);
        };
        input.click();
    }
    
    addFilesToPlaylist(files) {
        files.forEach(file => {
            const url = URL.createObjectURL(file);
            const song = {
                title: file.name.replace(/\.[^/.]+$/, ""),
                artist: 'Uploaded Song',
                src: url,
                duration: '0:00',
                albumArt: null
            };
            
            this.songs.push(song);
        });
        
        this.renderPlaylist();
        this.showNotification(`${files.length} song(s) added to playlist!`);
        
        // If this is the first song, load it
        if (this.songs.length === files.length) {
            this.loadSong(0);
        }
    }
    
    showNotification(message) {
        // Create a simple notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            animation: slideIn 0.3s ease;
            font-weight: 500;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize the music player when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const player = new MusicPlayer();
    
    // Add some interactive features
    const musicPlayerCard = document.querySelector('.music-player-card');
    const playlistCard = document.querySelector('.playlist-card');
    
    // Add parallax effect on mouse move
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const x = (clientX - innerWidth / 2) / innerWidth;
        const y = (clientY - innerHeight / 2) / innerHeight;
        
        if (musicPlayerCard) {
            musicPlayerCard.style.transform = `
                translateY(-8px) 
                rotateX(${y * 3}deg) 
                rotateY(${x * 3}deg)
            `;
        }
        
        if (playlistCard) {
            playlistCard.style.transform = `
                translateY(-5px) 
                rotateX(${y * 2}deg) 
                rotateY(${x * 2}deg)
            `;
        }
    });
    
    // Reset transform on mouse leave
    document.addEventListener('mouseleave', () => {
        if (musicPlayerCard) {
            musicPlayerCard.style.transform = 'translateY(-8px)';
        }
        if (playlistCard) {
            playlistCard.style.transform = 'translateY(-5px)';
        }
    });
}); 
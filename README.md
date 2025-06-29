# 🎵 Beautiful Music Player

A modern, responsive music player built with HTML, CSS, JavaScript, and Bootstrap. Features a beautiful glassmorphism UI with smooth animations and full audio control functionality.

> 🌐 **Live Demo:** [View the Music Player App](https://pvm-harshavardhan.github.io/music-player/)

![App Screenshot](/project_screenshot.png)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Bootstrap](https://img.shields.io/badge/Font_Awesome-538dd7?logo=fontawesome&logoColor=white)](https://getbootstrap.com/)
[![Git](https://img.shields.io/badge/Git-F05032?logo=git&logoColor=white)](https://git-scm.com/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white)](https://github.com/)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-121013?logo=github&logoColor=white)](https://pages.github.com/)

---

## ✨ Features

- **🎨 Modern Design**: Beautiful gradient background with glassmorphism effects
- **🎵 Full Audio Controls**: Play, pause, skip, volume control
- **📱 Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **⌨️ Keyboard Shortcuts**: Space (play/pause), Arrow keys (navigation & volume)
- **🎯 Interactive Progress Bar**: Click to seek through songs
- **📋 Playlist Management**: Easy song selection from playlist
- **🔄 Auto-play Next**: Automatically plays next song when current ends
- **🎨 Visual Effects**: Album art rotation, hover effects, and smooth animations
- **📁 File Upload**: Add your own audio files directly through the interface


## 🎮 Usage Guide

### Basic Controls

#### **Mouse Controls**
- **Play/Pause**: Click the center button
- **Previous/Next**: Use the arrow buttons
- **Volume**: Drag the volume slider
- **Seek**: Click on the progress bar
- **Playlist**: Click any song in the playlist

#### **Keyboard Shortcuts**
| Key | Action |
|-----|--------|
| `Space` | Play/Pause |
| `←` | Previous song |
| `→` | Next song |
| `↑` | Increase volume |
| `↓` | Decrease volume |
| `Ctrl + ←` | Volume 0 (mute) |
| `Ctrl + →` | Volume 100 (max) |

### Adding Music

#### **Method 1: File Upload**
1. Click "Add Audio Files" button
2. Select your audio files
3. Files are automatically added to playlist

#### **Method 2: Manual Setup**
1. Place audio files in `audio/` folder
2. Update `script.js` with song information:
   ```javascript
   {
       title: "Your Song Title",
       artist: "Your Artist Name",
       src: "audio/your-song.mp3",
       duration: "0:00", // Auto-detected
       albumArt: "images/your-album.jpg" // Optional
   }
   ```


## 🔧 Tech Stack

### **Technologies Used**
- **HTML5**: Semantic markup with Bootstrap 5
- **CSS3**: Modern styling with animations and responsive design
- **JavaScript ES6+**: Class-based architecture with event handling
- **Bootstrap 5**: Responsive grid system and components
- **Font Awesome**: Beautiful icons throughout the interface
-	**Git** – Version control
-	**GitHub** – Code hosting and collaboration
-	**GitHub Pages** – Static webPage Hosting


## 🛠️ Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/pvm-harshavardhan/music-player.git
   ```
2. **Change to the project directory:**
   ```bash
   cd music-player
   ```
3. **Open the app:**
   - Open `index.html` in your web browser.

4. **Enjoy your music!** 🎉


## 📁 Project Structure

```
music-player/
├── 📄 index.html     # Main HTML structure
├── 🎨 styles.css     # CSS styling and animations
├── ⚡ script.js      # JavaScript functionality
├── 📁 audio/         # Audio files directory
└──📁 images/         # Album art directory
```


## 📱 Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ⚠️ Internet Explorer (limited support)


## 🐛 Troubleshooting

### **Audio Not Playing?**
1. Check if audio files are in the correct location
2. Ensure audio files are not corrupted
3. Check browser console for errors
4. Verify file paths in the JavaScript code

### **Styling Issues?**
1. Make sure all CSS files are loaded
2. Check if Bootstrap CDN is accessible
3. Clear browser cache

### **Mobile Issues?**
1. The player is fully responsive
2. Touch controls work on mobile devices
3. Audio autoplay may be restricted on mobile (user interaction required)

---

## 🖼️ Customization & Screenshots

- Add your own screenshots or GIFs to highlight features and UI.
- Update colors and styles in `styles.css` to match your preferences.

---

## 🌐 Deployment

Deploy your Expense Tracker easily using **GitHub Pages**, **Netlify**, or **Vercel** for free.

---

## 🤝 Contributing

Contributions are welcome!  
Feel free to open issues or submit pull requests to improve the app.

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

Your Name - [@pvm_harsha](https://x.com/pvm_harsha)  
Project Link: [Music Player Web App Project](https://github.com/pvm-harshavardhan/music-player)

---

**Made with ❤️ by P VM Harsha**

**Enjoy your music! 🎵🎉✨** 
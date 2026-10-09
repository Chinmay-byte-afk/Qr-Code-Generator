<div align="center">

# ✨ QR Studio

### QR Code Generator & Designer

**Create it. Customize it. Scan it.**

A modern, browser-based QR code generator that transforms ordinary links and text into customizable, scannable QR codes.

<br />

![React](https://img.shields.io/badge/React-2026-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-Powered-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-c7f36b?style=for-the-badge)

<br />

[🚀 View Repository](https://github.com/Chinmay-byte-afk/Qr-Code-Generator)

</div>

---

## 📌 About the Project

**QR Studio** is a responsive web application developed to make QR code generation simple, fast, and customizable.

Users can generate QR codes for different types of information, personalize their appearance, preview changes instantly, and download the result as a PNG image.

The application works entirely in the browser and does not require a dedicated backend.

### 🎯 Project Objectives

- Build an intuitive QR code generation experience.
- Support multiple QR code data formats.
- Provide real-time customization and preview.
- Enable downloadable QR code images.
- Store recent QR codes locally for convenient reuse.
- Deliver a responsive experience across devices.

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🔗 Multiple QR Types

Generate QR codes for:

- 🌐 Website URLs
- 📝 Plain text
- ✉️ Email addresses
- 📞 Phone numbers
- 📶 Wi-Fi credentials

</td>
<td width="50%">

### 🎨 Customization Studio

Personalize your QR codes with:

- Foreground color selection
- Background color selection
- Adjustable QR code size
- Error correction levels
- Quiet-zone margin control
- Predefined visual presets

</td>
</tr>
<tr>
<td width="50%">

### ⚡ Instant Preview

- See QR code changes in real time.
- Adjust settings without reloading.
- Preview before downloading.
- Receive feedback on invalid input.

</td>
<td width="50%">

### 💾 Download & History

- Download QR codes as PNG.
- Copy QR content to the clipboard.
- Save recent QR configurations.
- Reuse previously generated codes.
- Persist recent entries with local storage.

</td>
</tr>
</table>

### 🌙 Additional Features

- Dark and light themes.
- Responsive desktop and mobile layouts.
- Browser-based QR generation.
- No dedicated backend required.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | Component-based user interface |
| JavaScript | Application logic |
| HTML5 | Application structure |
| CSS3 | Styling and responsive layouts |
| Vite | Development server and build tool |
| qrcode.react | QR code generation |
| Lucide React | Interface icons |
| Local Storage API | Persistent recent QR entries |
| Vercel | Deployment option |

---

## 📸 Application Preview

<!-- Add screenshots of your running application here. -->

Once you run the application, take screenshots and upload them to a folder named `screenshots`.

For example:

```text
screenshots/
├── dashboard.png
├── customization.png
└── mobile-view.png
```

Then uncomment the following section and make sure the image files exist:

<!--
<div align="center">

### Dashboard

![QR Studio Dashboard](screenshots/dashboard.png)

### Customization

![QR Studio Customization](screenshots/customization.png)

### Responsive Design

![QR Studio Mobile View](screenshots/mobile-view.png)

</div>
-->

---

## 🚀 Getting Started

Follow these instructions to run QR Studio locally.

### Prerequisites

Install:

- [Node.js](https://nodejs.org/)
- npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Chinmay-byte-afk/Qr-Code-Generator.git
```

### 2. Navigate to the Project

```bash
cd Qr-Code-Generator
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

Open the local URL displayed in your terminal, usually:

```text
http://localhost:5173/
```

### 5. Build for Production

```bash
npm run build
```

### 6. Preview the Production Build

```bash
npm run preview
```

---

## 📂 Project Structure

```text
Qr-Code-Generator/
│
├── public/
│
├── src/
│   ├── App.jsx          # Main application and QR logic
│   ├── App.css          # Component styling
│   ├── index.css        # Global styles
│   └── main.jsx         # React entry point
│
├── index.html           # HTML document
├── package.json         # Dependencies and scripts
├── package-lock.json    # Dependency lockfile
├── vite.config.js       # Vite configuration
├── .gitignore           # Ignored files
└── README.md            # Project documentation
```

---

## 🧪 Testing Checklist

Use this checklist to verify the application before submission.

- [ ] URL QR generation
- [ ] Plain text QR generation
- [ ] Email QR generation
- [ ] Phone QR generation
- [ ] Wi-Fi QR generation
- [ ] Real-time preview updates
- [ ] Foreground and background customization
- [ ] QR size adjustment
- [ ] Error correction level selection
- [ ] Quiet-zone margin toggle
- [ ] Visual preset selection
- [ ] PNG download and scan verification
- [ ] Invalid input handling
- [ ] Recent QR code saving and reuse
- [ ] Persistence after refreshing the page
- [ ] Light and dark theme switching
- [ ] Responsive layout testing
- [ ] Successful production build

---

## 🔐 Privacy & Reliability

QR Studio generates QR codes locally in the browser. Recent QR entries are stored using the browser's `localStorage` API.

No dedicated backend is required for the application's core functionality.

**Scan reliability:** Use sufficient contrast between the foreground and background, preserve an adequate quiet zone, and test downloaded QR codes with a scanning device.

Avoid encoding sensitive information in QR codes intended for public distribution.

---

## 🔮 Future Improvements

Potential enhancements include:

- [ ] SVG downloads
- [ ] Custom logo embedding
- [ ] Gradient QR codes
- [ ] Additional QR patterns
- [ ] Expanded automated testing
- [ ] More comprehensive QR readability checks
- [ ] Improved support for special characters in Wi-Fi credentials

---

## 👨‍💻 Author

### Chinmay Nair

GitHub: [@Chinmay-byte-afk](https://github.com/Chinmay-byte-afk)

Project: [QR Code Generator & Designer](https://github.com/Chinmay-byte-afk/Qr-Code-Generator)

---

<div align="center">

**Built with React, JavaScript, and creativity.**

⭐ If you find this project interesting, consider starring the repository!

</div>

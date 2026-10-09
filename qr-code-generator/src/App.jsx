import { useState, useEffect, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import {
  Download,
  Copy,
  RotateCcw,
  QrCode,
  History,
  Sparkles,
  Trash2,
} from "lucide-react";
import "./App.css";

const PRESETS = {
  Classic: { fg: "#111827", bg: "#ffffff", size: 240, level: "M", margin: true },
  Ocean: { fg: "#075985", bg: "#e0f2fe", size: 240, level: "H", margin: true },
  Forest: { fg: "#14532d", bg: "#dcfce7", size: 240, level: "H", margin: true },
  Midnight: { fg: "#ffffff", bg: "#111827", size: 240, level: "H", margin: true },
};

const TYPES = ["URL", "Text", "Email", "Phone", "Wi-Fi"];

function initialValue(type) {
  switch (type) {
    case "URL":
      return "https://developers.google.com";
    case "Email":
      return "hello@example.com";
    case "Phone":
      return "+919876543210";
    case "Wi-Fi":
      return "MyNetwork|password123|WPA";
    default:
      return "Hello from QR Studio!";
  }
}

function makePayload(type, value) {
  const input = value.trim();

  if (!input) {
    throw new Error("Please enter the required information.");
  }

  if (type === "URL") {
    let url;

    try {
      url = new URL(input);
    } catch {
      throw new Error("Enter a valid URL, such as https://example.com");
    }

    if (!["http:", "https:"].includes(url.protocol)) {
      throw new Error("Only HTTP and HTTPS URLs are supported.");
    }

    return url.href;
  }

  if (type === "Email") {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)) {
      throw new Error("Enter a valid email address.");
    }

    return `mailto:${input}`;
  }

  if (type === "Phone") {
    if (!/^\+?[0-9\s()-]{7,20}$/.test(input)) {
      throw new Error("Enter a valid phone number.");
    }

    return `tel:${input.replace(/[\s()-]/g, "")}`;
  }

  if (type === "Wi-Fi") {
    const parts = input.split("|");

    if (parts.length !== 3) {
      throw new Error(
        "Use NetworkName|password|WPA or NetworkName||nopass."
      );
    }

    const [ssid, password, security] = parts;

    if (!ssid || !["WPA", "WEP", "nopass"].includes(security)) {
      throw new Error("Enter a valid network name and security type.");
    }

    if (security !== "nopass" && !password) {
      throw new Error("Enter the Wi-Fi password.");
    }

    if (
      security === "WEP" &&
      password.length !== 5 &&
      password.length !== 13 &&
      !/^(?:[0-9a-fA-F]{10}|[0-9a-fA-F]{26})$/.test(password)
    ) {
      throw new Error("Enter a valid WEP password.");
    }

    const escapeWifi = (text) =>
      text.replace(/([\\;,:"])/g, "\\$1");

    return `WIFI:T:${security};S:${escapeWifi(ssid)};P:${escapeWifi(
      password || ""
    )};;`;
  }

  return input;
}

function App() {
  const [type, setType] = useState("URL");
  const [value, setValue] = useState(initialValue("URL"));
  const [name, setName] = useState("My QR Code");
  const [settings, setSettings] = useState(PRESETS.Classic);
  const [theme, setTheme] = useState("dark");
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("qr-studio-history") || "[]");
    } catch {
      return [];
    }
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [saved, setSaved] = useState(false);
  const qrRef = useRef(null);

  let payload = "";

  try {
    payload = makePayload(type, value);
  } catch {
    payload = "";
  }

  const colorsMatch =
    settings.fg.toLowerCase() === settings.bg.toLowerCase();

  useEffect(() => {
    try {
      makePayload(type, value);
      setError("");
    } catch (e) {
      setError(e.message);
    }

    setSaved(false);
    setMessage("");
  }, [type, value]);

  useEffect(() => {
    localStorage.setItem("qr-studio-history", JSON.stringify(history));
  }, [history]);

  function updateSetting(key, nextValue) {
    setSettings((previous) => ({
      ...previous,
      [key]: nextValue,
    }));
  }

  function selectType(nextType) {
    setType(nextType);
    setValue(initialValue(nextType));
    setMessage("");
  }

  function applyPreset(preset) {
    setSettings({ ...PRESETS[preset] });
    setMessage(`${preset} preset applied.`);
  }

  function downloadQR() {
    if (!payload || error || colorsMatch) return;

    const canvas = qrRef.current?.querySelector("canvas");

    if (!canvas) return;

    const link = document.createElement("a");
    link.download = `${name.trim().replace(/[^a-z0-9_-]/gi, "-") || "qr-code"}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();

    setMessage("Your QR code has been downloaded.");
  }

  async function copyContent() {
    if (!payload) return;

    try {
      await navigator.clipboard.writeText(payload);
      setMessage("QR content copied to clipboard.");
    } catch {
      setMessage("Clipboard access is unavailable in this browser.");
    }
  }

  function saveRecent() {
    if (!payload || error || colorsMatch) return;

    const item = {
      id: Date.now(),
      name: name.trim() || "Untitled QR",
      type,
      value,
      settings: { ...settings },
    };

    setHistory((previous) =>
      [
        item,
        ...previous.filter(
          (old) => old.type !== item.type || old.value !== item.value
        ),
      ].slice(0, 8)
    );

    setSaved(true);
    setMessage("QR code saved to recent creations.");
  }

  function reuse(item) {
    setName(item.name);
    setType(item.type);
    setValue(item.value);
    setSettings(item.settings || PRESETS.Classic);
    setMessage("Previous QR code restored.");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function removeRecent(id) {
    setHistory((previous) => previous.filter((item) => item.id !== id));
  }

  function resetSettings() {
    setSettings({ ...PRESETS.Classic });
    setMessage("Appearance reset to Classic.");
  }

  return (
    <main className={`app ${theme === "light" ? "light-theme" : ""}`}>
      <header className="topbar">
        <a className="brand" href="#">
          <span className="brand-icon">
            <QrCode size={23} />
          </span>
          <span>QR Studio<span className="brand-period">.</span></span>
        </a>

        <div className="top-actions">
          <span className="top-label">FREE QR DESIGNER</span>
          <button
            className="theme-button"
            onClick={() =>
              setTheme((previous) =>
                previous === "dark" ? "light" : "dark"
              )
            }
          >
            {theme === "dark" ? "☀ Light" : "☾ Dark"}
          </button>
        </div>
      </header>

      <section className="hero">
        <div className="eyebrow">
          <span className="dot" />
          YOUR IDEAS, ONE SCAN AWAY
        </div>

        <h1>
          Make it scannable.
          <br />
          <span>Make it yours.</span>
        </h1>

        <p>
          Create beautiful, customizable QR codes in seconds.
          No account, no backend, just creativity.
        </p>

        <div className="hero-badges">
          <span>✦ Live preview</span>
          <span>↗ Instant download</span>
          <span>◈ Privacy friendly</span>
        </div>
      </section>

      <section className="workspace">
        <div className="panel editor">
          <div className="panel-heading">
            <div className="heading-left">
              <span className="step">01</span>
              <h2>Content & design</h2>
            </div>
            <span className="live">LIVE EDITOR</span>
          </div>

          <label>QR CODE TYPE</label>

          <div className="type-grid">
            {TYPES.map((item) => (
              <button
                key={item}
                className={type === item ? "type-btn active" : "type-btn"}
                onClick={() => selectType(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <label htmlFor="content">
            {type === "URL"
              ? "WEBSITE URL"
              : type === "Text"
                ? "YOUR TEXT"
                : type === "Email"
                  ? "EMAIL ADDRESS"
                  : type === "Phone"
                    ? "PHONE NUMBER"
                    : "NETWORK | PASSWORD | SECURITY"}
          </label>

          <textarea
            id="content"
            rows="3"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={
              type === "Wi-Fi"
                ? "MyNetwork|password123|WPA"
                : "Enter your information..."
            }
          />

          {type === "Wi-Fi" && (
            <p className="hint">
              Format: NetworkName|password|WPA. For an open network, use
              NetworkName||nopass.
            </p>
          )}

          {error && <p className="error">{error}</p>}

          <label htmlFor="qrname">PROJECT NAME</label>

          <input
            id="qrname"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="My QR Code"
          />

          <div className="divider" />

          <div className="section-title">
            <Sparkles size={14} />
            QUICK PRESETS
          </div>

          <div className="preset-grid">
            {Object.entries(PRESETS).map(([key, preset]) => (
              <button
                key={key}
                className="preset"
                onClick={() => applyPreset(key)}
              >
                <span className="swatches">
                  <i style={{ background: preset.fg }} />
                  <i style={{ background: preset.bg }} />
                </span>
                {key}
              </button>
            ))}
          </div>

          <div className="divider" />

          <div className="section-title">CUSTOMIZE APPEARANCE</div>

          <div className="color-row">
            <div>
              <label htmlFor="fg">FOREGROUND</label>
              <div className="color-control">
                <input
                  id="fg"
                  type="color"
                  value={settings.fg}
                  onChange={(e) => updateSetting("fg", e.target.value)}
                />
                <span>{settings.fg.toUpperCase()}</span>
              </div>
            </div>

            <div>
              <label htmlFor="bg">BACKGROUND</label>
              <div className="color-control">
                <input
                  id="bg"
                  type="color"
                  value={settings.bg}
                  onChange={(e) => updateSetting("bg", e.target.value)}
                />
                <span>{settings.bg.toUpperCase()}</span>
              </div>
            </div>
          </div>

          <div className="setting">
            <div className="setting-label">
              <label htmlFor="size">QR CODE SIZE</label>
              <span>{settings.size}px</span>
            </div>

            <input
              id="size"
              type="range"
              min="160"
              max="320"
              step="20"
              value={settings.size}
              onChange={(e) =>
                updateSetting("size", Number(e.target.value))
              }
            />
          </div>

          <div className="setting">
            <label htmlFor="level">ERROR CORRECTION</label>

            <select
              id="level"
              value={settings.level}
              onChange={(e) => updateSetting("level", e.target.value)}
            >
              <option value="L">L — Low (7%)</option>
              <option value="M">M — Medium (15%)</option>
              <option value="Q">Q — Quartile (25%)</option>
              <option value="H">H — High (30%)</option>
            </select>
          </div>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={settings.margin}
              onChange={(e) =>
                updateSetting("margin", e.target.checked)
              }
            />
            Include quiet-zone margin
          </label>

          <button className="reset-btn" onClick={resetSettings}>
            <RotateCcw size={15} />
            Reset appearance
          </button>
        </div>

        <div className="panel preview-panel">
          <div className="panel-heading">
            <div className="heading-left">
              <span className="step">02</span>
              <h2>Live preview</h2>
            </div>

            <span className="live">
              <span className="dot" />
              LIVE
            </span>
          </div>

          <div className="qr-stage">
            {payload && !error ? (
              <div
                className="qr-paper"
                ref={qrRef}
                style={{
                  background: settings.bg,
                  padding: settings.margin ? 16 : 0,
                }}
              >
                <QRCodeCanvas
                  value={payload}
                  size={settings.size}
                  fgColor={settings.fg}
                  bgColor={settings.bg}
                  level={settings.level}
                  marginSize={0}
                />
              </div>
            ) : (
              <div className="invalid-preview">
                <QrCode size={48} />
                <p>QR preview unavailable</p>
                <span>Correct the input to generate your QR code.</span>
              </div>
            )}
          </div>

          {colorsMatch && (
            <p className="error">
              Choose different foreground and background colors for
              a readable QR code.
            </p>
          )}

          <div className="preview-info">
            <div>
              <span>FORMAT</span>
              <strong>PNG IMAGE</strong>
            </div>

            <div>
              <span>DIMENSIONS</span>
              <strong>
                {settings.size} × {settings.size} px
              </strong>
            </div>

            <div>
              <span>STATUS</span>
              <strong className={!error && !colorsMatch ? "good" : "bad"}>
                {!error && !colorsMatch ? "READY TO SCAN" : "NEEDS INPUT"}
              </strong>
            </div>
          </div>

          <div className="scan-tip">
            <strong>✦ Scan tip</strong>
            <p>
              Use high contrast and keep a quiet zone around your QR
              code. Always test the downloaded image before sharing it.
            </p>
          </div>

          <button
            className="download-btn"
            disabled={!payload || !!error || colorsMatch}
            onClick={downloadQR}
          >
            <Download size={18} />
            Download QR as PNG
          </button>

          <div className="secondary-actions">
            <button disabled={!payload} onClick={copyContent}>
              <Copy size={15} />
              Copy content
            </button>

            <button
              disabled={!payload || !!error || colorsMatch}
              onClick={saveRecent}
            >
              <History size={15} />
              {saved ? "Saved!" : "Save to recents"}
            </button>
          </div>

          {message && (
            <p className="success-message" role="status">
              {message}
            </p>
          )}

          <div className="history">
            <div className="history-heading">
              <h3>Recent creations</h3>
              <span>{history.length}/8</span>
            </div>

            {history.length === 0 ? (
              <p className="empty">
                Your saved QR codes will appear here.
              </p>
            ) : (
              history.map((item) => (
                <div className="history-item" key={item.id}>
                  <button
                    className="history-main"
                    onClick={() => reuse(item)}
                  >
                    <span className="history-icon">
                      <QrCode size={20} />
                    </span>

                    <span className="history-text">
                      <strong>{item.name}</strong>
                      <small>
                        {item.type} · {item.value.slice(0, 28)}
                      </small>
                    </span>
                  </button>

                  <button
                    className="delete-button"
                    aria-label={`Delete ${item.name}`}
                    title="Delete from recents"
                    onClick={() => removeRecent(item.id)}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <footer>
        <span>QR STUDIO © 2026</span>
        <span>MADE FOR CREATORS, BUILT FOR EVERYONE.</span>
      </footer>
    </main>
  );
}

export default App;
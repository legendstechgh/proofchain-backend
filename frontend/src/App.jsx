import React, { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const [theme, setTheme] = useState(
  localStorage.getItem("theme") || "dark"
  );

  React.useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);


  const handleUpload = async () => {
    if (!file) return alert("Please upload an image");

    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);

    const res = await fetch("http://localhost:5000/analyze", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  
  return (
    
      <div className="app-container">
        <div className="absolute top-5 right-5">
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="theme-button"
      >
        {theme === "dark" ? "☀️": "🌙"}
      </button>
    </div>
      {/* HEADER */}
      <div className="text-center mb-10">
        <img src="/proofchain-logo.png" alt="logo" className="logo" />

        <h1 className="title">
          <span className="proof-text">Proof</span>
          <span className="chain-text">Chain</span>
        </h1>

        <p className="tagline">Trust Made Transparent.</p>
      </div>

      {/* CARD */}
      <div className="card-container">
        <label className="upload-btn">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            hidden
          />
          Browse File
        </label>

        <button onClick={handleUpload} className="analyze-btn">
          {loading ? "Analyzing..." : "Analyze Media"}
        </button>

        {result && (
          <div className="result-box">
            <p><strong>Hash:</strong> {result.hash}</p>
            <p><strong>Fake?:</strong> {result.is_fake ? "Yes" : "No"}</p>
            <p><strong>Confidence:</strong> {(result.confidence * 100).toFixed(2)}%</p>
            <p className="msg">{result.message}</p>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="footer">
        © 2025 ProofChain • Legends Tech
      </footer>
    </div>
  );
}

export default App;
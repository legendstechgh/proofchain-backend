import express from "express";
import multer from "multer";
import crypto from "crypto";
import cors from "cors";
import fs from "fs";

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());

// Root route for testing
app.get("/", (req, res) => {
  res.json({ message: "ProofChain backend is running" });
});

// --- Route for file analysis ---
app.post("/analyze", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Read file and compute hash
    const fileBuffer = fs.readFileSync(req.file.path);
    const hash = crypto.createHash("sha256").update(fileBuffer).digest("hex");

    // Fake detection logic placeholder
    const fakeCheck = hash.endsWith("0") || hash.endsWith("a");
    const confidence = Number(Math.random().toFixed(2));

    // Clean up
    fs.unlinkSync(req.file.path);

    return res.json({
      hash,
      is_fake: fakeCheck,
      confidence,
      message: fakeCheck
        ? "This media seems tampered or edited."
        : "This media appears authentic.",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

// Use Render PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

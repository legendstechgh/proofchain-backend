import express from "express";
import multer from "multer";
import crypto from "crypto";
import cors from "cors";
import fs from "fs";

const app = express();
const upload = multer({ dest: "uploads/" });
app.use(cors());
app.use(express.json());

// --- Route for file analysis ---
app.post("/analyze", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // Read file and compute hash
  const fileBuffer = fs.readFileSync(req.file.path);
  const hash = crypto.createHash("sha256").update(fileBuffer).digest("hex");

  // Temporary fake logic for now — later we’ll connect blockchain/AI
  const fakeCheck = hash.endsWith("0") || hash.endsWith("a");
  const confidence = Math.random().toFixed(2);

  // Clean up file
  fs.unlinkSync(req.file.path);

  return res.json({
    hash,
    is_fake: fakeCheck,
    confidence,
    message: fakeCheck
      ? "This media seems tampered or edited."
      : "This media appears authentic.",
  });
});

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});

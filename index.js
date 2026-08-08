const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors"); // Tambahan agar bisa dipanggil dari Firebase Hosting

const app = express();
const PORT = process.env.PORT || 3000;

// Mengizinkan domain Firebase Anda mengakses backend ini
app.use(cors());

app.get("/view-pdf/:fileId", async (req, res) => {
  try {
    const fileId = req.params.fileId;
    if (!fileId) return res.status(400).send("File ID tidak ditemukan.");

    const driveUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
    const response = await fetch(driveUrl);

    res.setHeader("Content-Type", "application/pdf");
    response.body.pipe(res);
  } catch (err) {
    res.status(500).send("Gagal memuat dokumen PDF.");
  }
});

// Menjalankan server di port yang disediakan oleh Render
app.listen(PORT, () => {
  console.log(`Server proxy berjalan di port ${PORT}`);
});
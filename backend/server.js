const express = require("express");
const cors = require("cors");
const QRCode = require("qrcode");
require("dotenv").config();

const connectDB = require("./db");
const QR = require("./models/QR");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

function createVCard(data) {
  const {
    firstName = "",
    lastName = "",
    phone = "",
    email = "",
    organization = "",
    website = ""
  } = data;

  return `BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName}
FN:${firstName} ${lastName}
ORG:${organization}
TEL:${phone}
EMAIL:${email}
URL:${website}
END:VCARD`;
}

app.get("/", (req, res) => {
  res.send("QR Code Generator Backend Running");
});

app.post("/api/generate", async (req, res) => {
  try {
    const { type, data } = req.body;

    let qrText = "";

    if (type === "url") {
      let url = data.url?.trim();

      if (!url) {
        return res.status(400).json({
          message: "URL is required"
        });
      }

      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
      }

      qrText = url;

    } else if (type === "text") {

      if (!data.text?.trim()) {
        return res.status(400).json({
          message: "Text is required"
        });
      }

      qrText = data.text.trim();

    } else if (type === "contact") {

      if (
        !data.firstName?.trim() &&
        !data.phone?.trim() &&
        !data.email?.trim()
      ) {
        return res.status(400).json({
          message: "At least first name, phone, or email is required"
        });
      }

      qrText = createVCard(data);

    } else {
      return res.status(400).json({
        message: "Invalid QR type"
      });
    }

    const qrCodeDataURL = await QRCode.toDataURL(qrText, {
      width: 300,
      margin: 2
    });

    // Save to MongoDB
    await QR.create({
      type,
      rawData: qrText
    });

    res.json({
      success: true,
      qrCode: qrCodeDataURL,
      rawData: qrText
    });

  } catch (error) {
    console.error("QR generation error:", error);

    res.status(500).json({
      message: "Failed to generate QR code"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

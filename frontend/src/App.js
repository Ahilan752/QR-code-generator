import React, { useState } from "react";
import axios from "axios";
import { Link, FileText, User, QrCode } from "lucide-react";

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api/generate";

export default function App() {
  const [activeTab, setActiveTab] = useState("url");
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [error, setError] = useState("");

  const [urlData, setUrlData] = useState({
    url: ""
  });

  const [textData, setTextData] = useState({
    text: ""
  });

  const [contactData, setContactData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    organization: "",
    website: ""
  });

  const clearAllFields = () => {
    setUrlData({ url: "" });
    setTextData({ text: "" });
    setContactData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      organization: "",
      website: ""
    });
    setQrCode("");
    setError("");
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    setQrCode("");

    let payload = {};

    if (activeTab === "url") {
      payload = { type: "url", data: urlData };
    } else if (activeTab === "text") {
      payload = { type: "text", data: textData };
    } else {
      payload = { type: "contact", data: contactData };
    }

    try {
      const response = await axios.post(API_URL, payload);
      setQrCode(response.data.qrCode);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const downloadQRCode = () => {
    if (!qrCode) return;
    const link = document.createElement("a");
    link.href = qrCode;
    link.download = `${activeTab}-qr-code.png`;
    link.click();
  };

  return (
    <div className="page">
      <div className="container">
        <div className="header">
          <div className="logo-box">
            <QrCode size={28} color="white" />
          </div>
          <h1>QR Code Generator</h1>
          <p>Generate QR codes for URLs, text, and contact information</p>
        </div>

        <div className="card">
          <div className="tabs">
            <button
              className={activeTab === "url" ? "tab active" : "tab"}
              onClick={() => {
                setActiveTab("url");
                setError("");
              }}
            >
              <Link size={16} /> URL
            </button>

            <button
              className={activeTab === "text" ? "tab active" : "tab"}
              onClick={() => {
                setActiveTab("text");
                setError("");
              }}
            >
              <FileText size={16} /> Text
            </button>

            <button
              className={activeTab === "contact" ? "tab active" : "tab"}
              onClick={() => {
                setActiveTab("contact");
                setError("");
              }}
            >
              <User size={16} /> Contact
            </button>
          </div>

          <div className="content">
            <div className="left-panel">
              {activeTab === "url" && (
                <>
                  <h2>Enter URL</h2>
                  <label>Website URL</label>
                  <input
                    type="text"
                    placeholder="example.com or https://example.com"
                    value={urlData.url}
                    onChange={(e) =>
                      setUrlData({ ...urlData, url: e.target.value })
                    }
                  />
                  <small>
                    Enter a website URL. If you don't include http://, we'll add
                    https:// automatically.
                  </small>
                </>
              )}

              {activeTab === "text" && (
                <>
                  <h2>Enter Text</h2>
                  <label>Your Text</label>
                  <textarea
                    placeholder="Enter any text here"
                    rows="8"
                    value={textData.text}
                    onChange={(e) =>
                      setTextData({ ...textData, text: e.target.value })
                    }
                  />
                  <small>Type any text to generate the QR code.</small>
                </>
              )}

              {activeTab === "contact" && (
                <>
                  <h2>Enter Contact</h2>
                  <label>First Name</label>
                  <input
                    type="text"
                    placeholder="John"
                    value={contactData.firstName}
                    onChange={(e) =>
                      setContactData({
                        ...contactData,
                        firstName: e.target.value
                      })
                    }
                  />

                  <label>Last Name</label>
                  <input
                    type="text"
                    placeholder="Doe"
                    value={contactData.lastName}
                    onChange={(e) =>
                      setContactData({
                        ...contactData,
                        lastName: e.target.value
                      })
                    }
                  />

                  <label>Phone</label>
                  <input
                    type="text"
                    placeholder="+91 9876543210"
                    value={contactData.phone}
                    onChange={(e) =>
                      setContactData({
                        ...contactData,
                        phone: e.target.value
                      })
                    }
                  />

                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={contactData.email}
                    onChange={(e) =>
                      setContactData({
                        ...contactData,
                        email: e.target.value
                      })
                    }
                  />

                  <label>Organization</label>
                  <input
                    type="text"
                    placeholder="My Company"
                    value={contactData.organization}
                    onChange={(e) =>
                      setContactData({
                        ...contactData,
                        organization: e.target.value
                      })
                    }
                  />

                  <label>Website</label>
                  <input
                    type="text"
                    placeholder="https://example.com"
                    value={contactData.website}
                    onChange={(e) =>
                      setContactData({
                        ...contactData,
                        website: e.target.value
                      })
                    }
                  />
                </>
              )}

              <div className="button-group">
                <button className="clear-btn" onClick={clearAllFields}>
                  Clear All Fields
                </button>
                <button className="generate-btn" onClick={handleGenerate}>
                  {loading ? "Generating..." : "Generate QR Code"}
                </button>
              </div>

              {error && <p className="error">{error}</p>}
            </div>

            <div className="right-panel">
              <h2>Generated QR Code</h2>

              <div className="qr-box">
                {qrCode ? (
                  <img src={qrCode} alt="Generated QR Code" className="qr-image" />
                ) : (
                  <div className="placeholder">
                    <QrCode size={60} color="#c7c9d3" />
                    <p>Fill in the form to generate your QR code</p>
                  </div>
                )}
              </div>

              {qrCode && (
                <button className="download-btn" onClick={downloadQRCode}>
                  Download QR Code
                </button>
              )}
            </div>
          </div>

          <div className="footer-text">
            Generate QR codes instantly • No data stored • Free to use
          </div>
        </div>
      </div>
    </div>
  );
}
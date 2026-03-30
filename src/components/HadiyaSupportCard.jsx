import { useState } from "react";
import hadiyaUpiImage from "../assets/hadiya-upi.jpeg";

const UPI_PAYEE_NAME = "Ishfaq Dar";
const UPI_ID = "mohdashfaq1416-1@okicici";
const UPI_NOTE = "Hadiya for Nur Academy";
const SUGGESTED_AMOUNTS = [200, 300, 500, 750, 1000];

const buildUpiLink = (amount) => {
  const params = new URLSearchParams({
    pa: UPI_ID,
    pn: UPI_PAYEE_NAME,
    cu: "INR",
    tn: UPI_NOTE,
  });

  if (amount) params.set("am", String(amount));
  return `upi://pay?${params.toString()}`;
};

function HadiyaSupportCard({ style = {} }) {
  const [copied, setCopied] = useState("");

  const handleCopyUpiId = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(UPI_ID);
        setCopied("UPI ID copied.");
      } else {
        setCopied("Copy is not supported on this browser.");
      }
    } catch {
      setCopied("Could not copy on this browser.");
    }

    window.setTimeout(() => setCopied(""), 2200);
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 960,
        background: "linear-gradient(145deg, rgba(255, 251, 240, 0.98), rgba(245, 236, 212, 0.98))",
        border: "1px solid rgba(186, 145, 53, 0.28)",
        borderRadius: 24,
        boxShadow: "0 20px 48px rgba(77, 55, 18, 0.12)",
        padding: "24px 24px 22px",
        color: "#3f3525",
        ...style,
      }}
    >
      <div
        style={{
          fontFamily: '"Crimson Pro", Georgia, serif',
          fontSize: "1.55rem",
          color: "#0b5240",
          fontWeight: 700,
          marginBottom: 12,
        }}
      >
        Support Our Academy with a Hadiya (Optional Contribution)
      </div>

      <div
        className="split-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.2fr) minmax(280px, 0.8fr)",
          gap: 22,
          alignItems: "start",
        }}
      >
        <div>
          <p style={{ lineHeight: 1.75, fontSize: ".96rem", marginBottom: 12 }}>
            Alhamdulillah, you have successfully completed this course. We sincerely
            pray that it has been beneficial for you and a means of الخير in your
            life.
          </p>

          <p style={{ lineHeight: 1.75, fontSize: ".96rem", marginBottom: 12 }}>
            If you feel that you have gained value from this course, you are welcome
            to offer a <strong>هَدِيَّة (Hadiya)</strong> as a gesture of
            appreciation and support for our efforts.
          </p>

          <p style={{ lineHeight: 1.75, fontSize: ".96rem", marginBottom: 14 }}>
            This contribution is <strong>completely voluntary</strong> and there is{" "}
            <strong>no fixed fee</strong>.
          </p>

          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              marginBottom: 14,
            }}
          >
            {SUGGESTED_AMOUNTS.map((amount) => (
              <a
                key={amount}
                href={buildUpiLink(amount)}
                style={{
                  padding: "8px 12px",
                  borderRadius: 999,
                  background: "rgba(11, 82, 64, 0.08)",
                  border: "1px solid rgba(11, 82, 64, 0.16)",
                  color: "#0b5240",
                  fontWeight: 700,
                  fontSize: ".88rem",
                  textDecoration: "none",
                }}
              >
                Pay Rs. {amount}
              </a>
            ))}
            <a
              href={buildUpiLink()}
              style={{
                padding: "8px 12px",
                borderRadius: 999,
                background: "rgba(154, 116, 32, 0.12)",
                border: "1px solid rgba(154, 116, 32, 0.18)",
                color: "#9a7420",
                fontWeight: 700,
                fontSize: ".88rem",
                textDecoration: "none",
              }}
            >
              Any amount
            </a>
          </div>

          <p style={{ lineHeight: 1.75, fontSize: ".96rem", marginBottom: 12 }}>
            You may contribute any amount you feel comfortable with, whether less or
            more, according to your ability and sincerity.
          </p>

          <p style={{ lineHeight: 1.75, fontSize: ".96rem", marginBottom: 12 }}>
            Your support helps us continue providing quality Islamic education and
            reach more learners.
          </p>

          <p style={{ lineHeight: 1.75, fontSize: ".96rem", marginBottom: 0 }}>
            May Allah reward you abundantly for your generosity and grant barakah in
            your رزق.
          </p>

          <div
            style={{
              marginTop: 14,
              color: "#9a7420",
              fontWeight: 800,
              letterSpacing: ".03em",
              fontSize: "1rem",
            }}
          >
            جزاك الله خيرًا
          </div>
        </div>

        <div
          style={{
            background: "rgba(255, 255, 255, 0.82)",
            border: "1px solid rgba(11, 82, 64, 0.1)",
            borderRadius: 20,
            padding: 16,
            boxShadow: "0 12px 28px rgba(11, 82, 64, 0.08)",
          }}
        >
          <div
            style={{
              fontSize: ".72rem",
              color: "#9a7420",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: ".16em",
              marginBottom: 10,
            }}
          >
            Pay by UPI
          </div>

          <img
            src={hadiyaUpiImage}
            alt={`UPI QR code for ${UPI_PAYEE_NAME}`}
            style={{
              width: "100%",
              borderRadius: 18,
              display: "block",
              marginBottom: 14,
              border: "1px solid rgba(0, 0, 0, 0.04)",
            }}
          />

          <div style={{ fontSize: ".76rem", color: "#6d6559", marginBottom: 5 }}>
            Account name
          </div>
          <div
            style={{
              fontFamily: '"Crimson Pro", Georgia, serif',
              fontSize: "1.18rem",
              color: "#0b5240",
              fontWeight: 700,
              marginBottom: 10,
            }}
          >
            {UPI_PAYEE_NAME}
          </div>

          <div style={{ fontSize: ".76rem", color: "#6d6559", marginBottom: 5 }}>
            UPI ID
          </div>
          <div
            style={{
              padding: "10px 12px",
              borderRadius: 12,
              background: "#f8f4e8",
              border: "1px solid rgba(186, 145, 53, 0.16)",
              color: "#3f3525",
              fontSize: ".88rem",
              fontWeight: 700,
              wordBreak: "break-all",
              marginBottom: 12,
            }}
          >
            {UPI_ID}
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <a
              href={buildUpiLink()}
              style={{
                flex: 1,
                minWidth: 150,
                textAlign: "center",
                padding: "11px 14px",
                borderRadius: 12,
                background: "linear-gradient(135deg, #0b5240, #0d6d52)",
                color: "white",
                fontWeight: 800,
                textDecoration: "none",
                boxShadow: "0 12px 24px rgba(11, 82, 64, 0.18)",
              }}
            >
              Open UPI App
            </a>
            <button
              type="button"
              onClick={handleCopyUpiId}
              style={{
                padding: "11px 14px",
                borderRadius: 12,
                background: "white",
                color: "#0b5240",
                border: "1px solid rgba(11, 82, 64, 0.18)",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              Copy UPI ID
            </button>
          </div>

          <div style={{ marginTop: 10, fontSize: ".76rem", color: copied ? "#0b6e4f" : "#6d6559" }}>
            {copied || "Scan the QR or open any UPI app to contribute."}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HadiyaSupportCard;

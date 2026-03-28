import QRCode from "react-qr-code";
import signatureImage from "../assets/signature-optimized.png";

const styles = {
  page: {
    background: "#f4f1e8",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "32px 20px 48px",
    gap: "20px",
  },

  certificate: {
    width: "min(100%, 1000px)",
    aspectRatio: "10 / 7",
    background: "linear-gradient(180deg, #fffdf7 0%, #f8f1e4 100%)",
    border: "12px solid #0B5240",
    padding: "clamp(20px, 4vw, 40px)",
    textAlign: "center",
    position: "relative",
    boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
    fontFamily: "serif",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: "18px",
  },

  logo: {
    color: "#0B5240",
    margin: 0,
    fontSize: "clamp(1.5rem, 3vw, 1.9rem)",
    fontWeight: "bold",
  },

  arabic: {
    color: "#C9A84C",
    fontSize: "clamp(0.95rem, 2.2vw, 1.2rem)",
    marginBottom: "6px",
  },

  title: {
    marginTop: "8px",
    fontSize: "clamp(1.5rem, 3vw, 2rem)",
    fontWeight: "600",
  },

  text: {
    fontSize: "clamp(0.95rem, 1.7vw, 1.1rem)",
    color: "#333",
    lineHeight: 1.6,
  },

  name: {
    color: "#0B5240",
    fontSize: "clamp(2rem, 4vw, 3rem)",
    margin: "10px 0",
    fontWeight: "bold",
    lineHeight: 1.2,
  },

  course: {
    color: "#C9A84C",
    fontSize: "clamp(1.25rem, 2.6vw, 2rem)",
    fontWeight: "600",
    lineHeight: 1.3,
  },

  date: {
    fontSize: "clamp(0.85rem, 1.6vw, 1rem)",
    color: "#4a4a4a",
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    gap: "24px",
    alignItems: "flex-end",
    flexWrap: "wrap",
    marginTop: "8px",
  },

  signature: {
    width: "120px",
    maxWidth: "100%",
    objectFit: "contain",
  },

  id: {
    fontSize: "0.8rem",
    color: "#555",
    textAlign: "left",
  },

  printBtn: {
    padding: "12px 22px",
    background: "#0B5240",
    color: "white",
    border: "none",
    borderRadius: "999px",
    cursor: "pointer",
    fontSize: "0.95rem",
    fontWeight: 700,
    boxShadow: "0 8px 22px rgba(11,82,64,0.18)",
  },
};

const buildCertificateId = (user, course) => {
  const userKey = String(user?.id || "DEMO").slice(-4).toUpperCase();
  const courseKey = String(course?.id || "000").padStart(3, "0");
  return `NUR-${courseKey}-${userKey}`;
};

function Certificate({ user, course }) {
  const studentName = user?.name || "Student Name";
  const courseName = course?.title || "Course Name";
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const certificateId = buildCertificateId(user, course);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="certificate-page" style={styles.page}>
      <style>{`
        @media (max-width: 768px) {
          .certificate-card {
            aspect-ratio: auto !important;
          }
          .certificate-footer {
            align-items: flex-start !important;
          }
        }
        @media print {
          body {
            background: white !important;
          }
          .certificate-page {
            min-height: auto !important;
            padding: 0 !important;
            background: white !important;
          }
          .certificate-card {
            width: 100% !important;
            max-width: none !important;
            box-shadow: none !important;
            border-width: 10px !important;
          }
          .certificate-print-btn {
            display: none !important;
          }
        }
      `}</style>

      <div className="certificate-card" style={styles.certificate}>
        <div>
          <h1 style={styles.logo}>Nur Academy</h1>
          <p style={styles.arabic}>نور أكاديمي</p>
          <h2 style={styles.title}>Certificate of Completion</h2>
        </div>

        <div>
          <p style={styles.text}>This is proudly presented to</p>
          <h2 style={styles.name}>{studentName}</h2>
          <p style={styles.text}>for successfully completing the course</p>
          <h3 style={styles.course}>{courseName}</h3>
          <p style={styles.date}>Date: {date}</p>
        </div>

        <div>
          <div className="certificate-footer" style={styles.footer}>
            <div>
              <img
                src={signatureImage}
                alt="Instructor signature"
                style={styles.signature}
              />
              <p>Instructor</p>
            </div>

            <div style={{ textAlign: "center" }}>
              <QRCode value={certificateId} size={80} />
              <p style={{ fontSize: 12, marginTop: 6 }}>Verify</p>
            </div>
          </div>

          <p style={styles.id}>Certificate ID: {certificateId}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={handlePrint}
        style={styles.printBtn}
        className="certificate-print-btn"
      >
        Download / Print PDF
      </button>
    </div>
  );
}

export default Certificate;

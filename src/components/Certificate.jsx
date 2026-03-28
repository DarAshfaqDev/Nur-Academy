import { useRef, useState } from "react";
import QRCode from "react-qr-code";
import signatureImage from "../assets/signature-optimized.png";

const LOGO_SRC = `${import.meta.env.BASE_URL}favicon.png`;
const BISMILLAH = "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";
const QUOTE_AR = "وَقُل رَّبِّ زِدْنِي عِلْمًا";
const QUOTE_EN = '"My Lord, increase me in knowledge."';

const formatCertificateDate = (value) => {
  if (!value) {
    return new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(String(value))) {
    const [year, month, day] = String(value).split("-").map(Number);
    return new Date(year, month - 1, day).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const buildCertificateId = (user, course, completion) => {
  if (completion?.certificateId) return completion.certificateId;
  const userKey = String(user?.id || "DEMO").slice(-4).toUpperCase();
  const courseKey = String(course?.id || "000").padStart(3, "0");
  return `NUR-${courseKey}-${userKey}`;
};

const waitForImage = (image) => {
  if (image.complete) return Promise.resolve();
  return new Promise((resolve) => {
    const done = () => {
      image.removeEventListener("load", done);
      image.removeEventListener("error", done);
      resolve();
    };
    image.addEventListener("load", done);
    image.addEventListener("error", done);
  });
};

const slugify = (value, fallback) => {
  const normalized = String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return normalized || fallback;
};

function Certificate({ user, course, completion, onPrint }) {
  const frameRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);
  const studentName = user?.name || "Student Name";
  const courseName = course?.selectedTrackLabel ? `${course?.title || "Course Name"} (${course.selectedTrackLabel} Track)` : (course?.title || "Course Name");
  const courseTitleAr = course?.titleAr || "";
  const certificateId = buildCertificateId(user, course, completion);
  const issueDate = formatCertificateDate(completion?.completedAt);
  const verifyValue = [
    "Nur Academy Certificate",
    `Student: ${studentName}`,
    `Course: ${courseName}`,
    `Certificate ID: ${certificateId}`,
    `Issued: ${issueDate}`,
  ].join("\n");

  const handlePrint = async () => {
    if (isExporting || !frameRef.current) return;

    const frame = frameRef.current;
    const originalWidth = frame.style.width;
    const originalMaxWidth = frame.style.maxWidth;
    const originalBoxShadow = frame.style.boxShadow;

    setIsExporting(true);

    try {
      if (document.fonts?.ready) await document.fonts.ready;
      await Promise.all(Array.from(frame.querySelectorAll("img")).map(waitForImage));

      const html2canvasModule = await import("html2canvas");
      const jspdfModule = await import("jspdf");
      const html2canvas = html2canvasModule.default || html2canvasModule;
      const JsPdf = jspdfModule.jsPDF || jspdfModule.default?.jsPDF || jspdfModule.default;

      if (!html2canvas || !JsPdf) throw new Error("PDF tools failed to load.");

      frame.style.width = "1120px";
      frame.style.maxWidth = "1120px";
      frame.style.boxShadow = "none";

      await new Promise((resolve) => window.requestAnimationFrame(resolve));

      const canvas = await html2canvas(frame, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#f7ecd2",
        logging: false,
      });

      const pdf = new JsPdf({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 6;
      const maxWidth = pageWidth - margin * 2;
      const maxHeight = pageHeight - margin * 2;
      let renderWidth = maxWidth;
      let renderHeight = (canvas.height * renderWidth) / canvas.width;

      if (renderHeight > maxHeight) {
        renderHeight = maxHeight;
        renderWidth = (canvas.width * renderHeight) / canvas.height;
      }

      const x = (pageWidth - renderWidth) / 2;
      const y = (pageHeight - renderHeight) / 2;
      const imageData = canvas.toDataURL("image/png");

      pdf.addImage(imageData, "PNG", x, y, renderWidth, renderHeight, undefined, "FAST");

      const courseSlug = slugify(courseName, "certificate");
      const studentSlug = slugify(studentName, "student");
      pdf.save(`${courseSlug}-${studentSlug}-certificate.pdf`);
      return;
    } catch (error) {
      console.error("Certificate PDF export failed:", error);
      if (typeof onPrint === "function") {
        onPrint();
        return;
      }
      window.print();
    } finally {
      frame.style.width = originalWidth;
      frame.style.maxWidth = originalMaxWidth;
      frame.style.boxShadow = originalBoxShadow;
      setIsExporting(false);
    }
  };

  return (
    <div className="certificate-shell">
      <style>{`
        .certificate-shell {
          min-height: 100vh;
          padding: 32px 20px 48px;
          background:
            radial-gradient(circle at top, rgba(192, 151, 54, 0.2), transparent 32%),
            linear-gradient(180deg, #f5edd9 0%, #ece0c7 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
        }

        .certificate-frame {
          position: relative;
          width: min(1120px, 100%);
          background:
            linear-gradient(180deg, rgba(255, 252, 245, 0.95) 0%, rgba(248, 239, 219, 0.95) 100%);
          box-shadow: 0 28px 80px rgba(78, 54, 15, 0.16);
          border: 1px solid rgba(18, 79, 58, 0.18);
          overflow: hidden;
        }

        .certificate-frame::before,
        .certificate-frame::after {
          content: "";
          position: absolute;
          inset: 18px;
          border: 2px solid rgba(186, 145, 53, 0.5);
          pointer-events: none;
        }

        .certificate-frame::after {
          inset: 34px;
          border-width: 1px;
          border-color: rgba(18, 79, 58, 0.14);
        }

        .certificate-corner {
          position: absolute;
          width: 118px;
          height: 118px;
          border: 2px solid rgba(186, 145, 53, 0.52);
          z-index: 1;
          opacity: 0.75;
        }

        .certificate-corner.tl { top: 20px; left: 20px; border-right: none; border-bottom: none; }
        .certificate-corner.tr { top: 20px; right: 20px; border-left: none; border-bottom: none; }
        .certificate-corner.bl { bottom: 20px; left: 20px; border-right: none; border-top: none; }
        .certificate-corner.br { bottom: 20px; right: 20px; border-left: none; border-top: none; }

        .certificate-content {
          position: relative;
          padding: 58px 72px 50px;
          z-index: 2;
        }

        .certificate-bismillah {
          text-align: center;
          color: #0c8a61;
          font-size: clamp(1.25rem, 2.4vw, 1.8rem);
          letter-spacing: 0.04em;
          margin-bottom: 22px;
          font-family: "Amiri", Georgia, serif;
        }

        .certificate-brand {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-bottom: 18px;
        }

        .certificate-brand-mark {
          width: 86px;
          height: 86px;
          border-radius: 50%;
          background: #fffdf7;
          border: 4px solid rgba(186, 145, 53, 0.55);
          box-shadow: 0 10px 24px rgba(18, 79, 58, 0.12);
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .certificate-brand-mark img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .certificate-brand-copy {
          text-align: center;
        }

        .certificate-brand-copy span {
          display: block;
          color: #9a7420;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          font-size: 0.78rem;
          font-weight: 700;
        }

        .certificate-brand-copy strong {
          display: block;
          color: #0b5240;
          font-size: clamp(1.45rem, 2.4vw, 2rem);
          margin-top: 6px;
          font-family: "Crimson Pro", Georgia, serif;
        }

        .certificate-title-ar {
          text-align: center;
          font-size: clamp(1.9rem, 3vw, 2.6rem);
          color: #0b5240;
          font-family: "Amiri", Georgia, serif;
          margin-top: 18px;
        }

        .certificate-title {
          text-align: center;
          font-size: clamp(2.2rem, 4vw, 3.4rem);
          color: #493616;
          margin: 6px 0 0;
          font-family: "Crimson Pro", Georgia, serif;
          font-weight: 700;
          line-height: 1.08;
        }

        .certificate-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          color: #b58d33;
          margin: 20px 0 24px;
          font-size: 1rem;
          letter-spacing: 0.3em;
        }

        .certificate-divider::before,
        .certificate-divider::after {
          content: "";
          width: 90px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(181, 141, 51, 0.75), transparent);
        }

        .certificate-lead {
          text-align: center;
          color: #5a564d;
          font-size: clamp(1rem, 1.65vw, 1.12rem);
          line-height: 1.75;
          max-width: 780px;
          margin: 0 auto;
        }

        .certificate-label {
          text-align: center;
          font-size: 0.9rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #9a7420;
          margin-top: 30px;
          font-weight: 700;
        }

        .certificate-name {
          text-align: center;
          font-size: clamp(2.6rem, 5vw, 4.35rem);
          line-height: 1.06;
          color: #0b5240;
          font-family: "Crimson Pro", Georgia, serif;
          font-weight: 700;
          margin: 12px 0 8px;
        }

        .certificate-name-line {
          width: min(320px, 72%);
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(181, 141, 51, 0.92), transparent);
          margin: 0 auto 18px;
        }

        .certificate-course {
          text-align: center;
          font-size: clamp(1.55rem, 3vw, 2.3rem);
          line-height: 1.3;
          color: #473721;
          font-family: "Crimson Pro", Georgia, serif;
          font-weight: 700;
          max-width: 760px;
          margin: 12px auto 0;
        }

        .certificate-course-ar {
          text-align: center;
          font-size: clamp(1rem, 2vw, 1.3rem);
          color: #0c8a61;
          margin-top: 8px;
          font-family: "Amiri", Georgia, serif;
        }

        .certificate-quote {
          margin: 28px auto 0;
          max-width: 620px;
          padding: 18px 22px;
          border-top: 1px solid rgba(181, 141, 51, 0.45);
          border-bottom: 1px solid rgba(181, 141, 51, 0.45);
          text-align: center;
          background: rgba(255, 250, 240, 0.52);
        }

        .certificate-quote-ar {
          color: #0b5240;
          font-size: clamp(1.15rem, 2vw, 1.5rem);
          font-family: "Amiri", Georgia, serif;
          margin-bottom: 8px;
        }

        .certificate-quote-en {
          color: #736b5f;
          font-size: 0.95rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .certificate-meta {
          margin-top: 34px;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 24px;
          align-items: center;
        }

        .certificate-meta-card {
          background: rgba(255, 255, 255, 0.76);
          border: 1px solid rgba(18, 79, 58, 0.12);
          padding: 18px 20px;
          min-height: 110px;
          text-align: center;
        }

        .certificate-meta-card span {
          display: block;
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #9a7420;
          margin-bottom: 10px;
          font-weight: 700;
        }

        .certificate-meta-card strong {
          display: block;
          font-size: 1.25rem;
          color: #0b5240;
          line-height: 1.5;
          word-break: break-word;
          font-family: "Crimson Pro", Georgia, serif;
        }

        .certificate-seal {
          width: 154px;
          height: 154px;
          border-radius: 50%;
          border: 2px solid rgba(181, 141, 51, 0.8);
          background: radial-gradient(circle, #fff8e2 0%, #ecd28f 48%, #c59c2e 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 14px 28px rgba(92, 66, 16, 0.18);
        }

        .certificate-seal-inner {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.65);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: #533707;
          padding: 14px;
        }

        .certificate-seal-inner span,
        .certificate-seal-inner small {
          text-transform: uppercase;
          letter-spacing: 0.16em;
          font-size: 0.68rem;
          line-height: 1.5;
        }

        .certificate-seal-inner strong {
          font-size: 1.5rem;
          margin: 6px 0;
          font-family: "Crimson Pro", Georgia, serif;
          line-height: 1.1;
        }

        .certificate-footer {
          margin-top: 34px;
          display: grid;
          grid-template-columns: 1fr auto auto;
          gap: 22px;
          align-items: end;
        }

        .certificate-signature {
          max-width: 320px;
        }

        .certificate-signature img {
          height: 64px;
          object-fit: contain;
          display: block;
          margin-bottom: 10px;
        }

        .certificate-signature-line {
          height: 1px;
          background: #0b5240;
        }

        .certificate-signature-label {
          margin-top: 8px;
          color: #5e584b;
          font-size: 0.74rem;
          text-transform: uppercase;
          letter-spacing: 0.18em;
        }

        .certificate-qr-card {
          background: rgba(255, 255, 255, 0.82);
          border: 1px solid rgba(18, 79, 58, 0.12);
          padding: 14px;
          text-align: center;
          min-width: 132px;
        }

        .certificate-qr-card span {
          display: block;
          margin-top: 10px;
          color: #6c624f;
          font-size: 0.74rem;
          text-transform: uppercase;
          letter-spacing: 0.16em;
        }

        .certificate-foot-copy {
          text-align: right;
          color: #645d52;
          font-size: 0.92rem;
          line-height: 1.75;
          max-width: 280px;
        }

        .certificate-foot-copy strong {
          display: block;
          color: #0b5240;
          font-family: "Crimson Pro", Georgia, serif;
          font-size: 1.18rem;
          margin-bottom: 8px;
        }

        .certificate-print-btn {
          padding: 12px 24px;
          background: linear-gradient(135deg, #0b5240, #0d6d52);
          color: white;
          border: none;
          border-radius: 999px;
          cursor: pointer;
          font-size: 0.95rem;
          font-weight: 700;
          box-shadow: 0 10px 24px rgba(11, 82, 64, 0.18);
        }

        @media (max-width: 900px) {
          .certificate-content {
            padding: 44px 34px 34px;
          }

          .certificate-meta {
            grid-template-columns: 1fr;
            justify-items: center;
          }

          .certificate-meta-card {
            width: 100%;
            max-width: 520px;
          }

          .certificate-footer {
            grid-template-columns: 1fr;
            justify-items: stretch;
          }

          .certificate-signature {
            max-width: none;
          }

          .certificate-foot-copy {
            text-align: left;
            max-width: none;
          }
        }

        @media (max-width: 640px) {
          .certificate-shell {
            padding: 20px 12px 36px;
          }

          .certificate-frame::before {
            inset: 12px;
          }

          .certificate-frame::after {
            inset: 22px;
          }

          .certificate-corner {
            width: 74px;
            height: 74px;
          }

          .certificate-content {
            padding: 34px 22px 26px;
          }

          .certificate-brand {
            flex-direction: column;
            gap: 12px;
          }

          .certificate-brand-mark {
            width: 76px;
            height: 76px;
          }

          .certificate-divider::before,
          .certificate-divider::after {
            width: 50px;
          }

          .certificate-seal {
            width: 132px;
            height: 132px;
          }

          .certificate-seal-inner {
            width: 102px;
            height: 102px;
          }

          .certificate-qr-card {
            width: 100%;
          }

          .certificate-print-btn {
            width: 100%;
            max-width: 320px;
          }
        }

        @media print {
          @page {
            size: landscape;
            margin: 10mm;
          }

          body {
            background: white !important;
          }

          .certificate-shell {
            min-height: auto;
            padding: 0;
            background: white;
          }

          .certificate-frame {
            width: 100%;
            max-width: none;
            box-shadow: none;
            page-break-inside: avoid;
            break-inside: avoid;
          }

          .certificate-content {
            padding: 14mm 16mm 12mm;
          }

          .certificate-bismillah {
            font-size: 18px;
            margin-bottom: 10px;
          }

          .certificate-brand {
            gap: 10px;
            margin-bottom: 10px;
          }

          .certificate-brand-mark {
            width: 60px;
            height: 60px;
            border-width: 3px;
          }

          .certificate-title-ar {
            font-size: 25px;
            margin-top: 10px;
          }

          .certificate-title {
            font-size: 34px;
          }

          .certificate-divider {
            margin: 10px 0 14px;
            font-size: 12px;
          }

          .certificate-lead {
            font-size: 13px;
            line-height: 1.55;
          }

          .certificate-label {
            margin-top: 18px;
            font-size: 11px;
          }

          .certificate-name {
            font-size: 40px;
            margin: 8px 0 6px;
          }

          .certificate-course {
            font-size: 25px;
          }

          .certificate-course-ar {
            font-size: 16px;
          }

          .certificate-quote {
            margin-top: 16px;
            padding: 10px 14px;
          }

          .certificate-quote-ar {
            font-size: 18px;
            margin-bottom: 4px;
          }

          .certificate-quote-en {
            font-size: 11px;
          }

          .certificate-meta {
            margin-top: 18px;
            gap: 12px;
          }

          .certificate-meta-card {
            min-height: 84px;
            padding: 12px 14px;
          }

          .certificate-meta-card span {
            font-size: 10px;
            margin-bottom: 6px;
          }

          .certificate-meta-card strong {
            font-size: 16px;
          }

          .certificate-seal {
            width: 112px;
            height: 112px;
          }

          .certificate-seal-inner {
            width: 86px;
            height: 86px;
            padding: 8px;
          }

          .certificate-seal-inner strong {
            font-size: 16px;
          }

          .certificate-seal-inner span,
          .certificate-seal-inner small {
            font-size: 8px;
          }

          .certificate-footer {
            margin-top: 18px;
            gap: 12px;
          }

          .certificate-signature img {
            height: 42px;
            margin-bottom: 6px;
          }

          .certificate-signature-label,
          .certificate-qr-card span,
          .certificate-foot-copy {
            font-size: 10px;
          }

          .certificate-foot-copy strong {
            font-size: 14px;
            margin-bottom: 4px;
          }

          .certificate-qr-card {
            min-width: 90px;
            padding: 8px;
          }

          .certificate-qr-card svg {
            width: 62px !important;
            height: 62px !important;
          }

          .certificate-print-btn {
            display: none;
          }
        }
      `}</style>

      <div className="certificate-frame" ref={frameRef}>
        <span className="certificate-corner tl" />
        <span className="certificate-corner tr" />
        <span className="certificate-corner bl" />
        <span className="certificate-corner br" />

        <div className="certificate-content">
          <div className="certificate-bismillah">{BISMILLAH}</div>

          <div className="certificate-brand">
            <div className="certificate-brand-mark">
              <img src={LOGO_SRC} alt="Nur Academy logo" />
            </div>
            <div className="certificate-brand-copy">
              <span>Nur Academy</span>
              <strong>نور أكاديمي</strong>
            </div>
          </div>

          <div className="certificate-title-ar">شهادة إتمام</div>
          <h1 className="certificate-title">Certificate of Completion</h1>
          <div className="certificate-divider">✦ ✦ ✦</div>

          <p className="certificate-lead">
            With gratitude and recognition for sincere effort in seeking beneficial knowledge,
            this certificate is presented in honor of successful completion.
          </p>

          <div className="certificate-label">Presented To</div>
          <div className="certificate-name">{studentName}</div>
          <div className="certificate-name-line" />

          <div className="certificate-label">For Successfully Completing</div>
          <div className="certificate-course">{courseName}</div>
          {courseTitleAr ? (
            <div className="certificate-course-ar">{courseTitleAr}</div>
          ) : null}

          <div className="certificate-quote">
            <div className="certificate-quote-ar">{QUOTE_AR}</div>
            <div className="certificate-quote-en">{QUOTE_EN}</div>
          </div>

          <div className="certificate-meta">
            <div className="certificate-meta-card">
              <span>Completion Date</span>
              <strong>{issueDate}</strong>
            </div>

            <div className="certificate-seal">
              <div className="certificate-seal-inner">
                <span>Traditional</span>
                <strong>Ijazah</strong>
                <small>Inspired Presentation</small>
              </div>
            </div>

            <div className="certificate-meta-card">
              <span>Certificate ID</span>
              <strong>{certificateId}</strong>
            </div>
          </div>

          <div className="certificate-footer">
            <div className="certificate-signature">
              <img src={signatureImage} alt="Instructor signature" />
              <div className="certificate-signature-line" />
              <div className="certificate-signature-label">Authorized Instructor</div>
            </div>

            <div className="certificate-qr-card">
              <QRCode value={verifyValue} size={92} />
              <span>Verify Certificate</span>
            </div>

            <div className="certificate-foot-copy">
              <strong>Issued by Nur Academy</strong>
              May this completion be a source of barakah, growth, and beneficial knowledge.
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handlePrint}
        className="certificate-print-btn"
        disabled={isExporting}
      >
        {isExporting ? "Preparing PDF..." : "Download / Print PDF"}
      </button>
    </div>
  );
}

export default Certificate;

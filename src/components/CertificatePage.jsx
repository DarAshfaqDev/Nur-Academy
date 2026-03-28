import Certificate from "./Certificate";

function CertificatePage({ user, course, completion, onPrint }) {
  return <Certificate user={user} course={course} completion={completion} onPrint={onPrint} />;
}

export default CertificatePage;

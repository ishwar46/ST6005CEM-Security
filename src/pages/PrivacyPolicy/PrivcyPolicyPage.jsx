import React from "react";
import jsPDF from "jspdf";
import useDocumentTitle from "../../components/DocTitle";
import logo from "../../assets/asian.png";
import html2canvas from "html2canvas";

const PrivacyPolicy = () => {
  useDocumentTitle("Privacy Policy - Your Conference");

  const printDocument = () => {
    const input = document.getElementById("divToPrint");
    html2canvas(input, {
      scale: 2,
      useCORS: true,
      logging: true,
      letterRendering: 1,
      allowTaint: false,
      windowHeight: input.scrollHeight,
      windowWidth: input.scrollWidth,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft >= 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save("privacy-policy.pdf");
    });
  };

  return (
    <div className="relative container mx-auto px-4 mt-10 mb-10">
      <div
        className="absolute inset-0 flex justify-center items-center z-0"
        style={{
          backgroundImage: `url(${logo})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "contain",
          opacity: 0.1,
        }}
      ></div>
      <div
        className="text-3xl font-bold text-blue-800 pt-5 text-center mb-5"
        style={{ animation: "fadeIn 2s ease-out" }}
      >
        Privacy Policy
      </div>
      <div
        className="text-xl font-semibold text-green-700 text-center mb-10"
        style={{ animation: "fadeIn 2s ease-out" }}
      >
        Please review this Privacy Policy carefully, as it contains important
        information about your rights and choices under the law.
      </div>
      <div className="text-right">
        <button
          onClick={printDocument}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-5"
        >
          <i className="fa fa-download" aria-hidden="true"></i>
        </button>
      </div>
      <div
        className="bg-transparent rounded-lg p-6 mb-10"
        style={{ animation: "slideUp 0.8s ease-out forwards" }}
      >
        <div id="divToPrint" className="grid grid-cols-1 gap-8">
          <div className="bg-transparent rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Collection of Personal Information
            </h2>
            <p className="text-gray-600">
              During the registration process, we collect personal information
              such as your name, email address, phone number, and organization.
              This information is necessary to facilitate your participation in
              the conference and to provide you with updates and relevant
              information about the event.
            </p>
          </div>
          <div className="bg-transparent rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Use of Personal Information
            </h2>
            <p className="text-gray-600">
              We use your personal information to communicate with you about the
              conference, process your registration and payment, and provide you
              with any necessary logistical information. We may also use your
              information to send you updates about future events or related
              initiatives, subject to your consent.
            </p>
          </div>
          <div className="bg-transparent rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Data Sharing
            </h2>
            <p className="text-gray-600">
              We will not share your personal information with third parties
              without your consent, except when required by law or to facilitate
              conference-related services (e.g., payment processing or hotel
              bookings). In such cases, we will only share the necessary
              information with trusted partners who adhere to our privacy
              standards.
            </p>
          </div>
          <div className="bg-transparent rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Data Security
            </h2>
            <p className="text-gray-600">
              We take appropriate measures to protect your personal information
              from unauthorized access, disclosure, or alteration. We store your
              information on secure servers and implement technical and
              organizational measures to ensure its safety.
            </p>
          </div>
          <div className="bg-transparent rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Your Rights
            </h2>
            <p className="text-gray-600">
              You have the right to access, modify, or delete your personal
              information at any time. To exercise these rights or to withdraw
              your consent to our use of your data, please contact us at{" "}
              <a
                href="mailto:contact@asianconference.com"
                className="text-blue-500 hover:underline"
              >
                contact@asianconference.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

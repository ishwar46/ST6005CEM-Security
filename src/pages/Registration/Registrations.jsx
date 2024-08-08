import Navbar from "../../components/Navbar";
import { useState } from "react";
import institutions from "../../data/institution";
import nationalities from "../../data/nationalities";
import titles from "../../data/titles";
import { registerUserApi } from "../../apis/Api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/Loader";
import useDocumentTitle from "../../components/DocTitle";
import AlertDialog from "../../components/AlertDialog";
import SuccessDialog from "../../components/SuccessDialog";

const Registrations = () => {
  useDocumentTitle("Registration Form - ASIAN Conference ");

  const [loading, setLoading] = useState(false);
  const [otherInstitution, setOtherInstitution] = useState("");
  const [institution, setInstitution] = useState("");
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nationality, setNationality] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [officeAddress, setOfficeAddress] = useState("");
  const [biography, setBiography] = useState("");
  const [isChiefDelegate, setIsChiefDelegate] = useState(false);
  const [isDelegate, setIsDelegate] = useState(false);
  const [biographyGuidelinesRead, setBiographyGuidelinesRead] = useState(false);
  const [hasAccompanyingPerson, setHasAccompanyingPerson] = useState("false");
  const [showAccompanyingPerson, setShowAccompanyingPerson] = useState(false);
  const [showSimCardRequired, setShowSimCardRequired] = useState(false);
  const [accompanyingPersonFirstName, setAccompanyingFirstName] = useState("");
  const [accompanyingPersonMiddleName, setAccompanyingMiddleName] =
    useState("");
  const [accompanyingPersonLastName, setAccompanyingLastName] = useState("");
  const [accompayningTitle, setAccompanyingTitle] = useState("");
  const [relationship, setRelationship] = useState("");
  const [privacypolicyready, setprivacypolicyready] = useState(false);
  const [cancelationpolicyread, setcancelationpolicy] = useState(false);
  const [termsandcond, settermsandcond] = useState(false);
  const [userimage, setUserImage] = useState(null);
  const [previrew, setPreview] = useState(null);
  const [accompanyingPreview, setAccompanyingPreview] = useState(null);
  const [vegetarian, setVegetarian] = useState(false);
  const [halal, setHalal] = useState(false);
  const [nonveg, setNonveg] = useState(false);

  const [other, setOther] = useState("");
  const [userPictureGuidelinesRead, setUserPictureGuidelinesRead] =
    useState(false);
  const [
    accompanyingPersonPictureGuidelinesRead,
    setAccompanyingPersonPictureGuidelinesRead,
  ] = useState(false);
  const [accompanyingVegetarian, setAccompanyingVegetarian] = useState(false);
  const [accompanyingNonveg, setAccompanyingNonveg] = useState(false);
  const [accompanyingHalal, setAccompanyingHalal] = useState(false);
  const [accompanyingOther, setAccompanyOther] = useState("");
  const [accompanyingimages, setAccompanyingImages] = useState(null);
  const [checkedOption, setCheckedOption] = useState("");
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [showOtherInputs, setShowOtherInputs] = useState(false);
  //sim card
  const [simType, setSimType] = useState("");
  const [simCardRequired, setSimCardRequired] = useState(false);

  const navigate = useNavigate();
  //error
  const [institutionError, setInstitutionError] = useState("");
  const [emailAddressError, setEmailAddressError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  // Alert Dialog state
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [alertDialogTitle, setAlertDialogTitle] = useState("");
  const [alertDialogDescription, setAlertDialogDescription] = useState("");

  // Success Dialog state
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  const handleRoleChange = (role) => {
    setIsChiefDelegate(role === "chiefDelegate");
    setIsDelegate(role === "delegate");
  };

  const handleRadioChange = (e) => {
    const value = e.target.value === "yes" ? true : false;
    console.log("value: ", value);
    setSimCardRequired(value);
    setShowSimCardRequired(value);
  };

  // accompaning
  const handleAccompanyingPersonChange = (e) => {
    const value = e.target.value === "yes" ? "true" : "false";
    setHasAccompanyingPerson(value);
    setShowAccompanyingPerson(value === "true");
  };

  const changeSimType = (event) => {
    setSimType(event.target.value);
  };

  const changeInstitution = (event) => {
    const selectedInstitution = event.target.value;
    setInstitution(selectedInstitution);

    if (selectedInstitution === "other") {
      setInstitutionError("");
      setOtherInstitution("");
    } else {
      setInstitutionError("");
      setOtherInstitution("");
    }
    validateInstitution(selectedInstitution);
  };

  const changeOtherInstitution = (event) => {
    setOtherInstitution(event.target.value);
  };

  const changeTitle = (event) => {
    setTitle(event.target.value);
  };

  const changeFirstName = (event) => {
    const value = event.target.value;
    setFirstName(value);
    if (!value.trim()) {
      setFirstNameError("First name is required.");
    } else {
      setFirstNameError("");
    }
  };
  const changeMiddleName = (event) => {
    setMiddleName(event.target.value);
  };
  const changeLastName = (event) => {
    const value = event.target.value;
    setLastName(value);
    if (!value.trim()) {
      setLastNameError("Last name is required");
    } else {
      setLastNameError("");
    }
  };
  const changeNationality = (event) => {
    setNationality(event.target.value);
  };
  const changeJobPosition = (event) => {
    setJobPosition(event.target.value);
  };
  const changeEmailAddress = (event) => {
    const enteredEmail = event.target.value;
    setEmailAddress(enteredEmail);

    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!enteredEmail.match(emailRegex)) {
      setEmailAddressError("Please enter a valid email address.");
    } else {
      setEmailAddressError("");
    }
  };

  const changePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
    const { value } = event.target;
    setPhoneNumber(value);
  };

  const changeMobileNumber = (event) => {
    const { value } = event.target;
    setMobileNumber(value);
  };

  const changeOfficeAddress = (event) => {
    setOfficeAddress(event.target.value);
  };

  const changeAccompanyingPersonTitle = (event) => {
    setAccompanyingTitle(event.target.value);
  };
  const changeAccompanyingPersonFirstName = (event) => {
    setAccompanyingFirstName(event.target.value);
  };
  const changeAccompanyingPersonMiddleName = (event) => {
    setAccompanyingMiddleName(event.target.value);
  };
  const changeAccompanyingPersonLastName = (event) => {
    setAccompanyingLastName(event.target.value);
  };
  const changeRelationship = (event) => {
    setRelationship(event.target.value);
  };

  const changeprivacypolicyready = (event) => {
    setprivacypolicyready(event.target.checked);
  };

  const changecancelationpolicy = (event) => {
    setcancelationpolicy(event.target.checked);
  };

  const chanagetermsandcond = (event) => {
    settermsandcond(event.target.checked);
  };

  const showAlert = (title, description) => {
    setAlertDialogTitle(title);
    setAlertDialogDescription(description);
    setAlertDialogOpen(true);
  };

  const changeuserimage = (event) => {
    if (!userPictureGuidelinesRead) {
      showAlert(
        "Upload Guidelines Not Confirmed",
        "Please read and agree to the photo upload guidelines before choosing a file."
      );
      event.preventDefault();
      return;
    }

    const file = event.target.files[0];
    if (file && validateImage(file)) {
      setUserImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const changeOther = (event) => {
    setOther(event.target.value);
  };

  const changeAccompanyOther = (event) => {
    setAccompanyOther(event.target.value);
  };

  const handleBiographyChange = (event) => {
    setBiography(event.target.value);
  };

  const changeAccompanyImage = (event) => {
    const file = event.target.files[0];
    if (validateImage(file)) {
      setAccompanyingImages(file);
      setAccompanyingPreview(URL.createObjectURL(file));
    }
  };

  // Validate image function
  const validateImage = (file) => {
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    const reader = new FileReader();

    if (!validTypes.includes(file.type)) {
      setAlertDialogTitle("Invalid File Type");
      setAlertDialogDescription("Please upload a JPEG or PNG file.");
      setAlertDialogOpen(true);
      return false;
    }

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        if (img.width < 800 || img.height < 800 || img.width / img.height < 1) {
          setAlertDialogTitle("Invalid Image Dimensions");
          setAlertDialogDescription(
            "Image must be at least 800x800 pixels in portrait orientation."
          );
          setAlertDialogOpen(true);
          return false;
        }
        // Check DPI (simplified check assuming 96 DPI if metadata not available)
        const dpi = file.type === "image/jpeg" ? 300 : 96;
        if (dpi < 300) {
          setAlertDialogTitle("Insufficient Image Quality");
          setAlertDialogDescription("Image must be at least 300 DPI.");
          setAlertDialogOpen(true);
          return false;
        }
        return true;
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);

    return true;
  };

  // ======= Submit Button Function ========
  const handelSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const validateForm = () => {
      const validations = [
        {
          condition:
            institution === "" ||
            (institution === "other" && otherInstitution === ""),
          message: "Please select your institution.",
        },
        {
          condition: !nationality,
          message: "Please select your nationality.",
        },
        { condition: !title, message: "Please select your preferred title." },
        { condition: !firstName.trim(), message: "First name is required." },
        { condition: !lastName.trim(), message: "Last name is required." },
        {
          condition: !emailAddress.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
          message: "Email address is required.",
        },
        {
          condition: !isChiefDelegate && !isDelegate,
          message:
            "Please select at least one role: Chief Delegate or a Participant.",
        },
        {
          condition: isChiefDelegate && !biographyGuidelinesRead,
          message:
            "You must agree to read the biography guidelines before submitting.",
        },
        {
          condition: !vegetarian && !halal && !nonveg && !other,
          message: "Please select at least one dietary requirement.",
        },

        {
          condition: simCardRequired && !simType,
          message: "Please select at least one SIM type.",
        },
        {
          condition: !userPictureGuidelinesRead,
          message:
            "Please read and agree to the photo upload guidelines before submitting.",
        },
        {
          condition: !userimage,
          message: "Please upload your photo to proceed.",
        },
      ];

      if (hasAccompanyingPerson === "true") {
        const accompanyingValidations = [
          {
            condition: !relationship,
            message:
              "Please specify the relationship of your accompanying person",
          },
          {
            condition: !accompayningTitle,
            message: "Please select the accompanying person's title",
          },
          {
            condition: !accompanyingPersonFirstName,
            message: "Please enter the accompanying person's first name",
          },
          {
            condition: !accompanyingPersonLastName,
            message: "Please enter the accompanying person's last name",
          },
          {
            condition: !accompanyingimages,
            message:
              "Please upload the accompanying person's image to proceed.",
          },
        ];
        validations.push(...accompanyingValidations);
      }

      for (let { condition, message } of validations) {
        if (condition) {
          toast.error(message);
          setLoading(false);
          return false;
        }
      }

      return true;
    };

    if (!validateForm()) {
      return;
    }

    const fd = new FormData();
    fd.append(
      "nameOfInstitution",
      institution === "other" ? otherInstitution : institution
    );

    fd.append("firstName", firstName);
    fd.append("title", title);
    fd.append("middleName", middleName);
    fd.append("lastName", lastName);
    fd.append("nationality", nationality);
    fd.append("jobPosition", jobPosition);
    fd.append("emailAddress", emailAddress);
    fd.append("phoneNumber", phoneNumber);
    fd.append("mobileNumber", mobileNumber);
    fd.append("officeAddress", officeAddress);
    fd.append("simType", simType);
    fd.append("takeSim", simCardRequired);
    fd.append("pictureuploadread", userPictureGuidelinesRead);
    fd.append("hasAccompanyingPerson", hasAccompanyingPerson);
    fd.append("vegetarian", vegetarian);
    fd.append("halal", halal);
    fd.append("nonveg", nonveg);
    fd.append("other", other);
    fd.append("userimage", userimage);
    fd.append("privacypolicyready", privacypolicyready);
    fd.append("chiefDelegate", isChiefDelegate);
    fd.append("participant", isDelegate);
    fd.append("biographyguidelinesread", biographyGuidelinesRead);
    fd.append("termsandcond", termsandcond);

    if (isChiefDelegate) {
      fd.append("biography", biography);
    }

    if (hasAccompanyingPerson === "true") {
      fd.append(
        "pictureuploadreadAccompany",
        accompanyingPersonPictureGuidelinesRead
      );
      fd.append("accompanyingPersonInformation", accompayningTitle);
      fd.append("accompanyingFirstName", accompanyingPersonFirstName);
      fd.append("accompanyingMiddleName", accompanyingPersonMiddleName);
      fd.append("accompanyingLastName", accompanyingPersonLastName);
      fd.append("accompanyingimages", accompanyingimages);
      fd.append("relationship", relationship);
      fd.append("accompanyingVegetarian", accompanyingVegetarian);
      fd.append("accompanyingHalal", accompanyingHalal);
      fd.append("accompanyingNonVegetarian", accompanyingNonveg);
      fd.append("accompanyingOther", accompanyingOther);

      if (!accompanyingPersonPictureGuidelinesRead) {
        toast.error(
          "Please read and agree to the accompanying person photo upload guidelines before submitting."
        );
        setLoading(false);
        return;
      }
    }

    if (!termsandcond) {
      setLoading(false);
      toast.error(
        "Please read and agree to the terms and conditions before submitting."
      );
      return;
    }

    if (!cancelationpolicyread) {
      setLoading(false);
      toast.error(
        " Please read and agree to the cancelation policy before submitting."
      );
      return;
    }

    if (!privacypolicyready) {
      setLoading(false);
      toast.error("You must agree to the privacy policy before submitting.");
      return;
    }

    registerUserApi(fd)
      .then((res) => {
        setLoading(false);
        if (!res.data.success) {
          setAlertDialogTitle("Registration Failed");
          setAlertDialogDescription(res.data.message);
          setAlertDialogOpen(true);
        } else {
          setSuccessDialogOpen(true);
        }
      })
      .catch((err) => {
        setLoading(false);
        setAlertDialogTitle("Registration Error");
        setAlertDialogDescription(
          err.response && err.response.data && err.response.data.message
            ? err.response.data.message
            : "Something went wrong! Please contact us at secretariat@dcgf.gov.np"
        );
        setAlertDialogOpen(true);
      });
  };

  const validateInstitution = (selectedInstitution) => {
    if (selectedInstitution === "") {
      setInstitutionError("Institution name is required.");
    } else {
      setInstitutionError("");
    }
  };

  return (
    <>
      <Navbar />
      <div className="RegistationForm container px-5 mx-auto mt-5 mb-5  rounded overflow-hidden shadow-lg">
        <div
          className="text-3xl font-bold text-blue-800 pt-5 text-center mb-5"
          style={{ animation: "fadeIn 1s ease-out" }}
        >
          Registration Form
        </div>
        <div
          className="text-1xl font-semibold text-green-800 text-center mb-10"
          style={{ animation: "fadeIn 2s ease-out" }}
        >
          Welcome to the Asian Microfinance Summit 2024 registration.
        </div>

        <form className="px-6 py-2">
          {/* Personal Information Section */}
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            {" "}
            Personal Information
          </h2>
          <div className="grid lg:grid-cols-2  gap-6 pt-5">
            {/* institution */}
            <div className="institution">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Institution Name: <span className="text-red-500">*</span>
              </label>
              <select
                name="institution"
                value={institution}
                onChange={changeInstitution}
                className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700 mb-2"
              >
                <option value="">Choose your institution</option>
                {institutions.map((institution) => (
                  <option key={institution.id} value={institution.name}>
                    {institution.name}
                  </option>
                ))}
                <option value="other">Other</option>
              </select>
              {institution === "other" && (
                <input
                  type="text"
                  name="otherInstitution"
                  value={otherInstitution}
                  onChange={changeOtherInstitution}
                  placeholder="Enter your institution name"
                  className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700 mb-2"
                />
              )}
              {institutionError && (
                <p className="text-red-500 text-sm mt-1">{institutionError}</p>
              )}
            </div>

            {/* nationality */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nationality: <span className="text-red-500">*</span>
              </label>
              <select
                name="nationality"
                value={nationality}
                onChange={changeNationality}
                className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700 mb-2"
              >
                <option className="flex gap-2" value="">
                  Choose your nationality
                </option>
                {nationalities.map((nation) => (
                  <option key={nation.code} value={nation.name}>
                    <img src={nation.flag} className="h-5" alt="flag" />{" "}
                    {nation.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid lg:grid-cols-3  gap-6 pt-5">
            {/* title */}
            <div>
              <select
                name="title"
                value={title}
                onChange={changeTitle}
                className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              >
                <option value="">
                  Choose your preferred title{" "}
                  <span className="text-red-500">*</span>
                </option>
                {titles.map((title, index) => (
                  <option key={index} value={title.value}>
                    {title.label}
                  </option>
                ))}
              </select>
            </div>
            {/* firstName, middleName , lastName */}
            <div className="mb-2">
              <input
                type="text"
                name="firstName"
                placeholder="Enter First name *"
                value={firstName}
                onChange={changeFirstName}
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              />
              {firstNameError && (
                <p className="text-red-500 text-sm mt-1">{firstNameError}</p>
              )}
            </div>
            <div className="mb-2">
              <input
                type="text"
                name="middleName"
                placeholder="Enter Middle name"
                value={middleName}
                onChange={changeMiddleName}
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              />
            </div>
            <div className="mb-2">
              <input
                type="text"
                name="lastName"
                placeholder="Enter Last name *"
                value={lastName}
                onChange={changeLastName}
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              />
              {lastNameError && (
                <p className="text-red-500 text-sm mt-1">{lastNameError}</p>
              )}
            </div>

            {/* email,address */}
            <input
              type="text"
              name="jobPosition"
              placeholder="Job position"
              value={jobPosition}
              onChange={changeJobPosition}
              className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
            />
            <input
              type="text"
              name="officeAddress"
              placeholder="Office address"
              value={officeAddress}
              onChange={changeOfficeAddress}
              className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
            />
            <div className="mb-4">
              <input
                type="email"
                name="email"
                value={emailAddress}
                onChange={changeEmailAddress}
                placeholder="Enter your e-mail address *"
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              />
              {emailAddressError && (
                <p className="text-red-500 text-sm mt-1">{emailAddressError}</p>
              )}
            </div>

            <div className="mb-4">
              <input
                type="text"
                name="phoneNumber"
                placeholder="Contact number *"
                value={phoneNumber}
                onChange={changePhoneNumber}
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              />
              {/* {contactNumberError && (
                <p className="text-red-500 text-sm mt-1">
                  {contactNumberError}
                </p>
              )} */}
            </div>

            <div className="mb-4">
              <input
                type="text"
                name="mobileNumber"
                placeholder="Mobile number"
                value={mobileNumber}
                onChange={changeMobileNumber}
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              />
            </div>
          </div>
          {/* Are You Chief Delegate or Speaker */}
          <div className="mt-5">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Are you a Chief Delegate or a Participant?{" "}
              <span className="text-red-500">*</span>
            </h2>
            <div className="grid lg:grid-cols-2 grid-cols-2 gap-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={isChiefDelegate}
                  onChange={() => handleRoleChange("chiefDelegate")}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="ml-2 text-gray-700">Chief Delegate</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={isDelegate}
                  onChange={() => handleRoleChange("delegate")}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="ml-2 text-gray-700">Participant</label>
              </div>
            </div>

            {/* Show the biography section if Chief Delegate is selected */}
            {isChiefDelegate && (
              <div className="mt-5">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                  Biography <span className="text-red-500">*</span>
                </h2>
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    checked={biographyGuidelinesRead}
                    onChange={() =>
                      setBiographyGuidelinesRead(!biographyGuidelinesRead)
                    }
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    I have read the biography writing guidelines.
                  </label>
                </div>
                <textarea
                  className="w-full h-32 text-gray-800 bg-gray-100 border border-gray-300 rounded focus:ring focus:ring-blue-500 focus:border-blue-500 p-2"
                  placeholder="Enter your biography here..."
                  value={biography}
                  onChange={handleBiographyChange}
                  disabled={!biographyGuidelinesRead}
                ></textarea>
              </div>
            )}
          </div>

          {/* Dietry Requirement */}
          <div className="mt-5">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Dietary Requirements <span className="text-red-500">*</span>
            </h2>
            <div className="grid lg:grid-cols-4 grid-cols-2 gap-4">
              <div className="flex items-center mb-4">
                <input
                  id="vegetarian-checkbox"
                  type="checkbox"
                  name="dietaryRequirement"
                  value="vegetarian"
                  checked={vegetarian === "true"}
                  onChange={() => {
                    setVegetarian("true");
                    setHalal(false);
                    setNonveg(false);
                    setCheckedOption("");
                    setShowOtherInput(false);
                    setOther("");
                  }}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="vegetarian-checkbox"
                  className="ms-2 font-medium text-gray-900"
                >
                  Vegetarian
                </label>
              </div>
              <div className="flex items-center mb-4">
                <input
                  id="nonveg-checkbox"
                  type="checkbox"
                  name="dietaryRequirement"
                  checked={nonveg}
                  onChange={() => {
                    setVegetarian(false);
                    setHalal(false);
                    setNonveg(true);
                    setCheckedOption("");
                    setShowOtherInput(false);
                    setOther("");
                  }}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="nonveg-checkbox"
                  className="ml-2 font-medium text-gray-900"
                >
                  Non-Vegetarian
                </label>
              </div>
              <div className="flex items-center mb-4">
                <input
                  id="halal-checkbox"
                  type="checkbox"
                  name="dietaryRequirement"
                  value="halal"
                  checked={halal === "true"}
                  onChange={() => {
                    setVegetarian("false");
                    setHalal("true");
                    setNonveg(false);
                    setCheckedOption("");
                    setShowOtherInput(false);
                    setOther("");
                  }}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="halal-checkbox"
                  className="ms-2 font-medium text-gray-900"
                >
                  Halal
                </label>
              </div>

              <div className="flex items-center mb-4">
                <input
                  id="other-checkbox"
                  type="checkbox"
                  name="dietaryRequirement"
                  value="other"
                  checked={checkedOption === "other"}
                  onChange={() => {
                    setVegetarian("false");
                    setHalal("false");
                    setNonveg(false);
                    setCheckedOption("other");
                    setShowOtherInput(true);
                  }}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="other-checkbox"
                  className="ms-2 font-medium text-gray-900"
                >
                  Other
                </label>
              </div>
              {showOtherInput && (
                <input
                  type="text"
                  name="other"
                  placeholder="Please Specify"
                  value={other}
                  onChange={changeOther}
                  className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                />
              )}
            </div>
          </div>
          {/* Mobile SIM Requirements */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Mobile Sim Card Requirements{" "}
              <span className="text-red-500">*</span>
            </h2>
            <p className="text-md text-gray-600 mb-4">
              Do you need a SIM card?
            </p>
            <div>
              <div className="flex items-center mb-4">
                <label className="inline-flex items-center mr-6">
                  <input
                    type="radio"
                    name="simCardRequired"
                    value="yes"
                    checked={simCardRequired === true}
                    onChange={handleRadioChange}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="simCardRequired"
                    value="no"
                    checked={simCardRequired === false}
                    onChange={handleRadioChange}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">No</span>
                </label>
              </div>
              {showSimCardRequired && (
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="simType"
                      value="eSim"
                      checked={simType === "eSim"}
                      onChange={changeSimType}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">E sim</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="simType"
                      value="normalSim"
                      checked={simType === "normalSim"}
                      onChange={changeSimType}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">Normal sim</span>
                  </label>
                </div>
              )}
            </div>
            {/* Profile Picture Upload Section */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Upload Photo <span className="text-red-500">*</span>
              </h2>
              <p className="text-md text-red-600">
                Please upload your photo for registration.
              </p>
              <div className="mt-4 text-gray-700">
                <input
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  type="checkbox"
                  checked={userPictureGuidelinesRead}
                  onChange={(e) =>
                    setUserPictureGuidelinesRead(e.target.checked)
                  }
                />
                <label style={{ marginLeft: "8px" }}>
                  I have read the photo upload guidelines.
                </label>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Upload photo:
                </label>
                <input
                  type="file"
                  name="userimage"
                  onChange={changeuserimage}
                  disabled={!userPictureGuidelinesRead}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mb-4"
                />

                {(previrew || userimage) && (
                  <img
                    src={previrew || userimage}
                    className="w-[100px] h-[100px] rounded-full "
                    alt="user"
                  />
                )}

                {/* Accompanying Person Section */}
                <div className="mt-8">
                  <h2 className="text-lg font-semibold text-gray-700 mb-4">
                    Do you have an Accompanying person?{" "}
                    <span className="text-red-500">*</span>
                  </h2>
                </div>
                <div className="flex gap-5">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="hasAccompanyingPerson"
                      value="yes"
                      checked={hasAccompanyingPerson === "true"}
                      onChange={handleAccompanyingPersonChange}
                      className="form-radio h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="hasAccompanyingPerson"
                      value="no"
                      checked={hasAccompanyingPerson === "false"}
                      onChange={handleAccompanyingPersonChange}
                      className="form-radio h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">No</span>
                  </label>
                </div>

                {showAccompanyingPerson && (
                  <div className="mt-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title:
                      </label>
                      <select
                        name="title"
                        value={accompayningTitle}
                        onChange={changeAccompanyingPersonTitle}
                        className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                      >
                        <option value="">
                          Choose your preferred title{" "}
                          <span className="text-red-500">*</span>
                        </option>{" "}
                        {titles.map((title, index) => (
                          <option key={index} value={title.value}>
                            {title.label}
                          </option>
                        ))}
                      </select>
                      <div className="grid lg:grid-cols-3  gap-6 mt-4">
                        <input
                          type="text"
                          name="accompanyingPerson.relationship"
                          placeholder="Relationship *"
                          value={relationship}
                          onChange={changeRelationship}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                        />
                        <input
                          type="text"
                          name="accompanyingPerson.firstName"
                          placeholder=" Enter First name *"
                          value={accompanyingPersonFirstName}
                          onChange={changeAccompanyingPersonFirstName}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                        />
                        <input
                          type="text"
                          name="accompanyingPerson.middleName"
                          placeholder="Enter Middle name"
                          value={accompanyingPersonMiddleName}
                          onChange={changeAccompanyingPersonMiddleName}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                        />
                        <input
                          type="text"
                          name="accompanyingPerson.lastName"
                          placeholder="Enter Last name *"
                          value={accompanyingPersonLastName}
                          onChange={changeAccompanyingPersonLastName}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                        />
                      </div>
                      {/* Accompaning Dietary Requirements        */}
                      <div className="mt-5">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">
                          Accompaning Dietary Requirements
                        </h2>
                        <div className="grid lg:grid-cols-4 grid-cols-2 gap-4">
                          <div className="flex items-center mb-4">
                            <input
                              id="accompanying-vegetarian-checkbox"
                              type="checkbox"
                              name="accompanyingDietaryRequirement"
                              value="vegetarian"
                              checked={accompanyingVegetarian === "true"}
                              onChange={() => {
                                setAccompanyingVegetarian("true");
                                setAccompanyingHalal("false");
                                setCheckedOption("");
                                setAccompanyingNonveg(false);
                                setShowOtherInputs(false);
                                setAccompanyOther("");
                              }}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label
                              htmlFor="accompanying-vegetarian-checkbox"
                              className="ms-2 text-sm font-medium text-gray-900"
                            >
                              Vegetarian
                            </label>
                          </div>
                          <div className="flex items-center mb-4">
                            <input
                              id="accompanying-nonveg-checkbox"
                              type="checkbox"
                              name="accompanyingDietaryRequirement"
                              checked={accompanyingNonveg}
                              onChange={() => {
                                setAccompanyingVegetarian(false);
                                setAccompanyingHalal(false);
                                setAccompanyingNonveg(true);
                                setCheckedOption("");
                                setShowOtherInputs(false);
                                setAccompanyOther("");
                              }}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label
                              htmlFor="accompanying-nonveg-checkbox"
                              className="ml-2 text-sm font-medium text-gray-900"
                            >
                              Non-Vegetarian
                            </label>
                          </div>
                          <div className="flex items-center mb-4">
                            <input
                              id="accompanying-halal-checkbox"
                              type="checkbox"
                              name="accompanyingDietaryRequirement"
                              value="accompanyingHalal"
                              checked={accompanyingHalal === "true"}
                              onChange={() => {
                                setAccompanyingVegetarian("false");
                                setAccompanyingHalal("true");
                                setAccompanyingNonveg(false);
                                setCheckedOption("");
                                setShowOtherInputs(false);
                                setAccompanyOther("");
                              }}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label
                              htmlFor="accompanying-halal-checkbox"
                              className="ms-2 text-sm font-medium text-gray-900"
                            >
                              Halal
                            </label>
                          </div>

                          <div className="flex items-center mb-4">
                            <input
                              id="accompanying-other-checkbox"
                              type="checkbox"
                              name="accompanyingDietaryRequirement"
                              value="accompanyingOther"
                              checked={checkedOption === "accompanyingOther"}
                              onChange={() => {
                                setAccompanyingVegetarian("false");
                                setAccompanyingNonveg(false);
                                setAccompanyingHalal("false");
                                setCheckedOption("accompanyingOther");
                                setShowOtherInputs(true);
                              }}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label
                              htmlFor="accompanying-other-checkbox"
                              className="ms-2 text-sm font-medium text-gray-900"
                            >
                              Other
                            </label>
                          </div>
                          {showOtherInputs && (
                            <input
                              type="text"
                              name="accompanyingOther"
                              placeholder="Please Specify"
                              value={accompanyingOther}
                              onChange={changeAccompanyOther}
                              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                            />
                          )}
                        </div>
                      </div>
                      {/* Profile Picture Upload Section */}
                      <div className="mt-8">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">
                          Upload Photo
                        </h2>
                        <p className="text-md text-red-600">
                          Please upload photo of accompaning person for
                          registration.
                        </p>
                        <div className="mt-4 text-gray-700">
                          <input
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                            type="checkbox"
                            checked={accompanyingPersonPictureGuidelinesRead}
                            onChange={(e) =>
                              setAccompanyingPersonPictureGuidelinesRead(
                                e.target.checked
                              )
                            }
                          />
                          <label style={{ marginLeft: "8px" }}>
                            I have read the photo upload guidelines for
                            accompanying person
                          </label>
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700">
                            Upload photo:
                          </label>
                          <input
                            type="file"
                            name="userimageAccompany"
                            onChange={changeAccompanyImage}
                            disabled={!accompanyingPersonPictureGuidelinesRead}
                            className=" block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mt-4"
                          />
                          {(accompanyingPreview || accompanyingimages) && (
                            <img
                              src={accompanyingPreview || accompanyingimages}
                              className="w-[100px] h-[100px] rounded-full"
                              alt="accimage"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mt-8">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="termsandcond"
                checked={termsandcond}
                onChange={chanagetermsandcond}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <label htmlFor="termsandcond" className="ml-2 text-gray-700">
                I have read and agree to the
                <a
                  href="/important-info"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:text-blue-700 ml-2"
                >
                  Terms & Conditions
                </a>
                <span className="text-gray-700">.</span>
              </label>
            </div>
          </div>
          <div className="mt-8">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="cancelationpolicyread"
                checked={cancelationpolicyread}
                onChange={changecancelationpolicy}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <label
                htmlFor="cancelationpolicyread"
                className="ml-2 text-gray-700"
              >
                I have read and agree to the cancelation policy
                <span className="text-gray-700">.</span>
              </label>
            </div>
          </div>
          <div className="mt-8">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="privacypolicyready"
                checked={privacypolicyready}
                onChange={changeprivacypolicyready}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <label
                htmlFor="privacypolicyready"
                className="ml-2 text-gray-700"
              >
                I have read and agree to the{" "}
                <a
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  privacy policy
                </a>
                <span className="text-gray-700">
                  {" "}
                  and the information that I have provided above is correct.
                </span>
              </label>
            </div>
          </div>
          <div className="mt-8">
            <div className="mb-4">
              <p className="text-md text-green-500">
                Note: Fields with <span className="text-red-500">*</span> are
                mandatory.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-10 mb-10">
            <button
              onClick={handelSubmit}
              type="submit"
              className="bg-blue-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center">
                  <Loader />
                  <span className="ml-2">Submitting...</span>{" "}
                </div>
              ) : (
                "Register"
              )}
            </button>
          </div>
        </form>
      </div>
      <AlertDialog
        open={alertDialogOpen}
        setOpen={setAlertDialogOpen}
        title={alertDialogTitle}
        description={alertDialogDescription}
      />
      <SuccessDialog
        open={successDialogOpen}
        setOpen={setSuccessDialogOpen}
        title="Registration Successful"
        description="Your registration was successful! A confirmation email will be sent to your registered email address shortly."
        onConfirm={() => navigate("/homepage")}
      />
    </>
  );
};

export default Registrations;

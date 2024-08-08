import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserByIdApi, updateUserApi } from "../../apis/Api";
import toast from "react-hot-toast";

const EditUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    personalInformation: {
      title: "",
      fullName: {
        firstName: "",
        middleName: "",
        lastName: "",
      },
      nationality: "",
      nameOfInstitution: "",
      jobPosition: "",
      officeAddress: "",
      emailAddress: "",
      phoneNumber: "",
      mobileNumber: "",
    },
    profilePicture: {
      fileName: "",
    },
    dietaryRequirements: {
      vegetarian: false,
      halal: false,
      nonveg: false,
      other: "",
    },
    biography: "",
    accompanyingPerson: {
      hasAccompanyingPerson: false,
      accompanyingPersonInformation: {
        title: "",
        fullName: {
          firstName: "",
          middleName: "",
          lastName: "",
        },
        relationship: "",
        dietaryRequirements: {
          vegetarian: false,
          halal: false,
          nonveg: false,
          other: "",
        },
        pictureUrl: "",
      },
    },
    chiefDelegateOrSpeaker: {
      chiefDelegate: false,
      participant: false,
    },
    mobileSimCardRequirements: {
      takeSim: false,
      simType: "",
    },
  });

  const [preview, setPreview] = useState("");
  const [accompanyingPreview, setAccompanyingPreview] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserByIdApi(userId);
        if (response && response.data) {
          setFormData((prevData) => ({
            ...prevData,
            ...response.data,
            accompanyingPerson: {
              ...prevData.accompanyingPerson,
              ...response.data.accompanyingPerson,
              accompanyingPersonInformation: {
                ...prevData.accompanyingPerson.accompanyingPersonInformation,
                ...response.data.accompanyingPerson
                  ?.accompanyingPersonInformation,
              },
            },
          }));
          setPreview(
            `http://localhost:5000/${response.data.profilePicture.fileName}`
          );
          setAccompanyingPreview(
            `http://localhost:5000/${response.data.accompanyingPerson?.accompanyingPersonInformation?.pictureUrl}`
          );
        } else {
          toast.error("Failed to fetch user data.");
        }
      } catch (error) {
        toast.error(`Error fetching user: ${error.message}`);
      }
    };

    fetchUser();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const valueToUse = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      personalInformation: {
        ...prevData.personalInformation,
        [name]: valueToUse,
      },
    }));
  };

  const handleFullNameChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      personalInformation: {
        ...prevData.personalInformation,
        fullName: {
          ...prevData.personalInformation.fullName,
          [name]: value,
        },
      },
    }));
  };

  const handleDietaryChange = (e) => {
    const { name, value, type, checked } = e.target;
    const valueToUse = type === "checkbox" ? checked : value;

    if (type === "text") {
      setFormData((prevData) => ({
        ...prevData,
        dietaryRequirements: {
          ...prevData.dietaryRequirements,
          other: valueToUse,
          vegetarian: false,
          halal: false,
          nonveg: false,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        dietaryRequirements: {
          ...prevData.dietaryRequirements,
          [name]: valueToUse,
          other: "",
        },
      }));
    }
  };

  const handleAccompanyingDietaryChange = (e) => {
    const { name, value, type, checked } = e.target;
    const valueToUse = type === "checkbox" ? checked : value;

    setFormData((prevData) => {
      const newDietaryRequirements = {
        ...prevData.accompanyingPerson.accompanyingPersonInformation
          .dietaryRequirements,
      };

      if (type === "text") {
        newDietaryRequirements.other = valueToUse;
        newDietaryRequirements.vegetarian = false;
        newDietaryRequirements.halal = false;
        newDietaryRequirements.nonveg = false;
      } else {
        newDietaryRequirements[name.split(".")[1]] = valueToUse;
        if (valueToUse) {
          newDietaryRequirements.other = "";
        }
      }

      return {
        ...prevData,
        accompanyingPerson: {
          ...prevData.accompanyingPerson,
          accompanyingPersonInformation: {
            ...prevData.accompanyingPerson.accompanyingPersonInformation,
            dietaryRequirements: newDietaryRequirements,
          },
        },
      };
    });
  };

  const handleMobileSimCardChange = (e) => {
    const { name, value, type, checked } = e.target;
    const valueToUse = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      mobileSimCardRequirements: {
        ...prevData.mobileSimCardRequirements,
        [name]: valueToUse,
      },
    }));
  };

  const handleChiefDelegateOrParticipantChange = (e) => {
    const { name, type, checked } = e.target;
    const valueToUse = type === "checkbox" ? checked : null;

    setFormData((prevData) => ({
      ...prevData,
      chiefDelegateOrSpeaker: {
        ...prevData.chiefDelegateOrSpeaker,
        [name]: valueToUse,
      },
    }));
  };

  const handleAccompanyingChange = (e) => {
    const { name, value, type, checked } = e.target;
    const valueToUse = type === "checkbox" ? checked : value;

    setFormData((prevData) => {
      if (name.startsWith("dietaryRequirements")) {
        const dietaryKey = name.split(".")[1];
        return {
          ...prevData,
          accompanyingPerson: {
            ...prevData.accompanyingPerson,
            accompanyingPersonInformation: {
              ...prevData.accompanyingPerson.accompanyingPersonInformation,
              dietaryRequirements: {
                ...prevData.accompanyingPerson.accompanyingPersonInformation
                  .dietaryRequirements,
                [dietaryKey]: valueToUse,
              },
            },
          },
        };
      } else {
        return {
          ...prevData,
          accompanyingPerson: {
            ...prevData.accompanyingPerson,
            hasAccompanyingPerson:
              name === "hasAccompanyingPerson"
                ? valueToUse
                : prevData.accompanyingPerson.hasAccompanyingPerson,
            accompanyingPersonInformation: {
              ...prevData.accompanyingPerson.accompanyingPersonInformation,
              [name]: valueToUse,
            },
          },
        };
      }
    });
  };

  const handleAccompanyingFullNameChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      accompanyingPerson: {
        ...prevData.accompanyingPerson,
        accompanyingPersonInformation: {
          ...prevData.accompanyingPerson.accompanyingPersonInformation,
          fullName: {
            ...prevData.accompanyingPerson.accompanyingPersonInformation
              .fullName,
            [name]: value,
          },
        },
      },
    }));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setFormData((prevData) => ({
        ...prevData,
        profilePicture: { fileName: file.name },
      }));
    }
  };

  const handleAccompanyingProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAccompanyingPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setFormData((prevData) => ({
        ...prevData,
        accompanyingPerson: {
          ...prevData.accompanyingPerson,
          accompanyingPersonInformation: {
            ...prevData.accompanyingPerson.accompanyingPersonInformation,
            pictureUrl: file.name,
          },
        },
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUserApi(userId, formData);
      if (response && response.data) {
        toast.success("User updated successfully!");
        navigate("/admindashboard");
      } else {
        toast.error("Failed to update user.");
      }
    } catch (error) {
      toast.error(`Error updating user: ${error.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="container mx-auto p-6 max-w-4xl">
        <h2 className="text-3xl font-semibold bg-green-600 mb-8 text-center rounded-lg">
          Edit Participant Details
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white text-blue-600 p-8 rounded-lg shadow-lg"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-gray-600">Title</label>
              <input
                type="text"
                name="title"
                value={formData.personalInformation.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-600">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.personalInformation.fullName.firstName}
                onChange={handleFullNameChange}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-600">Middle Name</label>
              <input
                type="text"
                name="middleName"
                value={formData.personalInformation.fullName.middleName}
                onChange={handleFullNameChange}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-gray-600">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.personalInformation.fullName.lastName}
                onChange={handleFullNameChange}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-600">Nationality</label>
              <input
                type="text"
                name="nationality"
                value={formData.personalInformation.nationality}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-600">Institution</label>
              <input
                type="text"
                name="nameOfInstitution"
                value={formData.personalInformation.nameOfInstitution}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-gray-600">Job Position</label>
              <input
                type="text"
                name="jobPosition"
                value={formData.personalInformation.jobPosition}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-600">Office Address</label>
              <input
                type="text"
                name="officeAddress"
                value={formData.personalInformation.officeAddress}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-600">Email Address</label>
              <input
                type="email"
                name="emailAddress"
                value={formData.personalInformation.emailAddress}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-gray-600">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.personalInformation.phoneNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-600">Mobile Number</label>
              <input
                type="text"
                name="mobileNumber"
                value={formData.personalInformation.mobileNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-600">Profile Picture</label>
              <input
                type="file"
                onChange={handleProfilePictureChange}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {preview ? (
                <img
                  src={preview}
                  alt="Profile Preview"
                  className="mt-4 w-24 h-24 object-cover rounded-full border-2 border-green-500"
                />
              ) : (
                formData.profilePicture.fileName && (
                  <img
                    src={`http://localhost:5000/${formData.profilePicture.fileName}`}
                    alt="Profile"
                    className="mt-4 w-24 h-24 object-cover rounded-full border-2 border-green-500"
                  />
                )
              )}
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-600">Dietary Requirements</label>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                name="vegetarian"
                checked={formData.dietaryRequirements.vegetarian}
                onChange={handleDietaryChange}
                className="mr-2 focus:ring-2 focus:ring-green-500"
                disabled={formData.dietaryRequirements.other}
              />
              <label className="text-gray-700 mr-4">Vegetarian</label>
              <input
                type="checkbox"
                name="halal"
                checked={formData.dietaryRequirements.halal}
                onChange={handleDietaryChange}
                className="mr-2 focus:ring-2 focus:ring-green-500"
                disabled={formData.dietaryRequirements.other}
              />
              <label className="text-gray-700 mr-4">Halal</label>
              <input
                type="checkbox"
                name="nonveg"
                checked={formData.dietaryRequirements.nonveg}
                onChange={handleDietaryChange}
                className="mr-2 focus:ring-2 focus:ring-green-500"
                disabled={formData.dietaryRequirements.other}
              />
              <label className="text-gray-700 mr-4">Non-Veg</label>
            </div>
            <input
              type="text"
              name="other"
              placeholder="Other"
              value={formData.dietaryRequirements.other}
              onChange={handleDietaryChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-600">
              Chief Delegate or Participant
            </label>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                name="chiefDelegate"
                checked={formData.chiefDelegateOrSpeaker.chiefDelegate}
                onChange={handleChiefDelegateOrParticipantChange}
                className="mr-2 focus:ring-2 focus:ring-green-500"
              />
              <label className="text-gray-700 mr-4">Chief Delegate</label>
              <input
                type="checkbox"
                name="participant"
                checked={formData.chiefDelegateOrSpeaker.participant}
                onChange={handleChiefDelegateOrParticipantChange}
                className="mr-2 focus:ring-2 focus:ring-green-500"
              />
              <label className="text-gray-700 mr-4">Participant</label>
            </div>
          </div>
          {formData.chiefDelegateOrSpeaker.chiefDelegate && (
            <div className="mb-6">
              <label className="block text-gray-600">Biography</label>
              <textarea
                name="biography"
                value={formData.biography}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    biography: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          )}
          <div className="mb-6">
            <label className="block text-gray-600">
              Mobile Sim Card Requirements
            </label>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                name="takeSim"
                checked={formData.mobileSimCardRequirements.takeSim}
                onChange={handleMobileSimCardChange}
                className="mr-2 focus:ring-2 focus:ring-green-500"
              />
              <label className="text-gray-700 mr-4">Need Sim</label>
              <input
                type="text"
                name="simType"
                value={formData.mobileSimCardRequirements.simType}
                onChange={handleMobileSimCardChange}
                placeholder="Sim Type"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-600">
              Accompanying Person Information
            </label>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                name="hasAccompanyingPerson"
                checked={formData.accompanyingPerson.hasAccompanyingPerson}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    accompanyingPerson: {
                      ...prevData.accompanyingPerson,
                      hasAccompanyingPerson: e.target.checked,
                      accompanyingPersonInformation: e.target.checked
                        ? {
                            title: "",
                            fullName: {
                              firstName: "",
                              middleName: "",
                              lastName: "",
                            },
                            relationship: "",
                            dietaryRequirements: {
                              vegetarian: false,
                              halal: false,
                              nonveg: false,
                              other: "",
                            },
                            pictureUrl: "",
                          }
                        : prevData.accompanyingPerson
                            .accompanyingPersonInformation,
                    },
                  }))
                }
                className="mr-2 focus:ring-2 focus:ring-green-500"
              />
              <label className="text-gray-700">Has Accompanying Person</label>
            </div>
            {formData.accompanyingPerson.hasAccompanyingPerson && (
              <div className="mt-6 p-4 border rounded-lg bg-gray-50">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-4">
                  <div>
                    <label className="block text-gray-600">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={
                        formData.accompanyingPerson
                          .accompanyingPersonInformation.title
                      }
                      onChange={handleAccompanyingChange}
                      className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={
                        formData.accompanyingPerson
                          .accompanyingPersonInformation.fullName.firstName
                      }
                      onChange={handleAccompanyingFullNameChange}
                      className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600">Middle Name</label>
                    <input
                      type="text"
                      name="middleName"
                      value={
                        formData.accompanyingPerson
                          .accompanyingPersonInformation.fullName.middleName
                      }
                      onChange={handleAccompanyingFullNameChange}
                      className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-4">
                  <div>
                    <label className="block text-gray-600">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={
                        formData.accompanyingPerson
                          .accompanyingPersonInformation.fullName.lastName
                      }
                      onChange={handleAccompanyingFullNameChange}
                      className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600">Relationship</label>
                    <input
                      type="text"
                      name="relationship"
                      value={
                        formData.accompanyingPerson
                          .accompanyingPersonInformation.relationship
                      }
                      onChange={handleAccompanyingChange}
                      className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600">Picture URL</label>
                    <input
                      type="file"
                      onChange={handleAccompanyingProfilePictureChange}
                      className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    {accompanyingPreview ? (
                      <img
                        src={accompanyingPreview}
                        alt="Profile Preview"
                        className="mt-4 w-24 h-24 object-cover rounded-full border-2 border-green-500"
                      />
                    ) : (
                      formData.accompanyingPerson.accompanyingPersonInformation
                        .pictureUrl && (
                        <img
                          src={`http://localhost:5000/${formData.accompanyingPerson.accompanyingPersonInformation.pictureUrl}`}
                          alt="Profile"
                          className="mt-4 w-24 h-24 object-cover rounded-full border-2 border-green-500"
                        />
                      )
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-600">
                    Dietary Requirements
                  </label>
                  <div className="flex items-center mt-2">
                    <input
                      type="checkbox"
                      name="dietaryRequirements.vegetarian"
                      checked={
                        formData.accompanyingPerson
                          .accompanyingPersonInformation.dietaryRequirements
                          .vegetarian
                      }
                      onChange={(e) => handleAccompanyingDietaryChange(e)}
                      className="mr-2 focus:ring-2 focus:ring-green-500"
                      disabled={
                        formData.accompanyingPerson
                          .accompanyingPersonInformation.dietaryRequirements
                          .other
                      }
                    />
                    <label className="text-gray-700 mr-4">Vegetarian</label>
                    <input
                      type="checkbox"
                      name="dietaryRequirements.halal"
                      checked={
                        formData.accompanyingPerson
                          .accompanyingPersonInformation.dietaryRequirements
                          .halal
                      }
                      onChange={(e) => handleAccompanyingDietaryChange(e)}
                      className="mr-2 focus:ring-2 focus:ring-green-500"
                      disabled={
                        formData.accompanyingPerson
                          .accompanyingPersonInformation.dietaryRequirements
                          .other
                      }
                    />
                    <label className="text-gray-700 mr-4">Halal</label>
                    <input
                      type="checkbox"
                      name="dietaryRequirements.nonveg"
                      checked={
                        formData.accompanyingPerson
                          .accompanyingPersonInformation.dietaryRequirements
                          .nonveg
                      }
                      onChange={(e) => handleAccompanyingDietaryChange(e)}
                      className="mr-2 focus:ring-2 focus:ring-green-500"
                      disabled={
                        formData.accompanyingPerson
                          .accompanyingPersonInformation.dietaryRequirements
                          .other
                      }
                    />
                    <label className="text-gray-700 mr-4">Non-Veg</label>
                  </div>
                  <input
                    type="text"
                    name="dietaryRequirements.other"
                    placeholder="Other"
                    value={
                      formData.accompanyingPerson.accompanyingPersonInformation
                        .dietaryRequirements.other
                    }
                    onChange={(e) => handleAccompanyingDietaryChange(e)}
                    className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;

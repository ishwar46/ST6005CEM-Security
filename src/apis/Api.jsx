import axios from "axios";

// Axios instance configuration
const Api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
const config = {
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "multipart/form-data",
  },
};
// API calls for subscriptions and users
export const addSubscriberApi = (data) =>
  Api.post("/api/subscription/addSubscriber", data);
export const getAllSubscribersApi = () =>
  Api.get("/api/subscription/getAllSubscribers");

export const registerUserApi = (formData) =>
  Api.post("/api/users/userregister", formData, config);

// Additional API call that might have been intended
export const markAsRepliedApi = (id) => {
  const config = {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return Api.patch(`/api/subscription/${id}/replied`, null, config);
};

export const getAllUsersApi = () => {
  const config = {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return Api.get("/api/users/getAllUser", config);
};
//------------------------------User Login Apis---------------------------
export const userLoginApi = (data) => Api.post("/api/users/userlogin", data);

//------------------------------ Admin Apis -------------------------------
export const adminLoginApi = (data) => Api.post("/api/admin/login", data);

//------------------------------ Change Password Apis -------------------------------
export const changePasswordApi = (formData) =>
  Api.post("/api/users/changepassword", formData);

//------------------------------ Add Image in Gallery Apis -------------------------------
export const addImageinGalaryApi = (formData) =>
  Api.post("/api/gallery/addGallery", formData, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data",
    },
  });

//------------------------------ Get all Image in Gallery Apis -------------------------------
export const getAllImageinGalaryApi = (data) =>
  Api.get("/api/gallery/getAllGallery", data);

//------------------------------ Speakers Apis -------------------------------
export const deleteImageFromGalaryApi = (galleryid) =>
  Api.delete(`/api/gallery/deleteGallery/${galleryid}`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const addSpeakerApi = (formData) =>
  Api.post("/api/speaker/addSpeaker", formData, config);

export const getAllSpeakersApi = () => Api.get("/api/speaker/getAllSpeakers");

export const updateSpeakerApi = (speakerId, formData) =>
  Api.put(`/api/speaker/updateSpeaker/${speakerId}`, formData, config);

export const deleteSpeakerApi = (speakerId) =>
  Api.delete(`/api/speaker/deleteSpeaker/${speakerId}`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

//-------------------------verifying a user-----------------------
export const verifyUserByAdminApi = (userId) =>
  Api.put(`/api/admin/verify/${userId}`);

//deleting a user
export const deleteUserApi = (userId) =>
  Api.delete(`/api/admin/delete/${userId}`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const getUserByIdApi = (id) => {
  const config = {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return Api.get(`/api/users/getUserByid/${id}`, config);
};

export const updateUserApi = (userId, data) => {
  const config = {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return Api.put(`/api/users/${userId}`, data, config);
};

export const getNamesbyInstitutionApi = (institutionName) => {
  const config = {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const encodedInstitutionName = encodeURIComponent(institutionName);

  return Api.get(
    `/api/users/gtusers?institution=${encodedInstitutionName}`,
    config
  );
};

//------------------------------  Session Apis -------------------------------
export const getAllSessionsApi = () => Api.get("/api/season/getAllSessions");

export const addSessionApi = (formData) =>
  Api.post("/api/season/createsessions", formData, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const startSessionApi = (sessionId) => {
  const config = {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return Api.put(`/api/season/startSession/${sessionId}`, {}, config);
};

export const endSessionApi = (sessionId) => {
  const config = {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return Api.put(`/api/season/endSession/${sessionId}`, {}, config);
};

export const cancelSessionApi = (sessionId) => {
  const config = {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return Api.put(`/api/season/cancelSession/${sessionId}`, {}, config);
};

export const getSessionAttendaceApi = (sessionId) => {
  const config = {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return Api.get(`/api/season/getAllAttendance/${sessionId}`, config);
};

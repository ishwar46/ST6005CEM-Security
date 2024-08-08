import React, { useState, useEffect } from "react";
import SessionCard from "../../components/SessionCards";
import {
  getAllSessionsApi,
  startSessionApi,
  endSessionApi,
  cancelSessionApi,
} from "../../apis/Api";
import toast from "react-hot-toast";
import moment from "moment";
import useDocumentTitle from "../../components/DocTitle";

const ViewSessions = () => {
  useDocumentTitle("View Sessions - ACSIC Conference ");

  const [runningSessions, setRunningSessions] = useState([]);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [completedSessions, setCompletedSessions] = useState([]);
  const [cancelledSessions, setCancelledSessions] = useState([]);
  const [expiredSessions, setExpiredSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await getAllSessionsApi();
        const sessions = response.data;
        const now = moment();

        const running = [];
        const upcoming = [];
        const completed = [];
        const cancelled = [];
        const expired = [];

        sessions.forEach((session) => {
          const endDateTime = moment(session.endTime);

          if (session.status === "in_progress" && now.isAfter(endDateTime)) {
            session.status = "completed";
          }

          if (session.status === "scheduled" && now.isAfter(endDateTime)) {
            session.status = "expired";
          }

          switch (session.status) {
            case "in_progress":
              running.push(session);
              break;
            case "scheduled":
              upcoming.push(session);
              break;
            case "completed":
              completed.push(session);
              break;
            case "cancelled":
              cancelled.push(session);
              break;
            case "expired":
              expired.push(session);
              break;
            default:
              break;
          }
        });

        setRunningSessions(running);
        setUpcomingSessions(upcoming);
        setCompletedSessions(completed);
        setCancelledSessions(cancelled);
        setExpiredSessions(expired);
      } catch (error) {
        console.error("Failed to fetch sessions:", error);
        toast.error("Failed to fetch sessions.");
      }
    };

    fetchSessions();
  }, []);

  const handleStartSession = async (session) => {
    try {
      const response = await startSessionApi(session._id);
      if (response.data.success) {
        toast.success(response.data.message);
        setUpcomingSessions((prev) =>
          prev.filter((s) => s._id !== session._id)
        );
        setRunningSessions((prev) => [
          ...prev,
          { ...session, status: "in_progress", actualStartTime: new Date() },
        ]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Failed to start session:", error);
      toast.error(error.response.data.message || "Failed to start session.");
    }
  };

  const handleCancelSession = async (session) => {
    try {
      await cancelSessionApi(session._id);
      toast.success("Session cancelled successfully!");
      setUpcomingSessions((prev) => prev.filter((s) => s._id !== session._id));
      setCancelledSessions((prev) => [
        ...prev,
        { ...session, status: "cancelled" },
      ]);
    } catch (error) {
      console.error("Failed to cancel session:", error);
      toast.error("Failed to cancel session.");
    }
  };

  const handleEndSession = async (session) => {
    try {
      await endSessionApi(session._id);
      toast.success("Session ended successfully!");
      setRunningSessions((prev) => prev.filter((s) => s._id !== session._id));
      setCompletedSessions((prev) => [
        ...prev,
        { ...session, status: "completed", actualEndTime: new Date() },
      ]);
    } catch (error) {
      console.error("Failed to end session:", error);
      toast.error("Failed to end session.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-start mb-4 text-black">
        Session Details
      </h1>
      {runningSessions.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-800">Running Sessions</h2>
          <SessionCard
            sessions={runningSessions}
            status="in_progress"
            onEndSession={handleEndSession}
          />
        </div>
      )}
      {upcomingSessions.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-800">Upcoming Sessions</h2>
          <SessionCard
            sessions={upcomingSessions}
            status="scheduled"
            onStartSession={handleStartSession}
            onCancelSession={handleCancelSession}
          />
        </div>
      )}
      {completedSessions.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-800">
            Completed Sessions
          </h2>
          <SessionCard sessions={completedSessions} status="completed" />
        </div>
      )}
      {cancelledSessions.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-800">
            Cancelled Sessions
          </h2>
          <SessionCard sessions={cancelledSessions} status="cancelled" />
        </div>
      )}
      {expiredSessions.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-800">Expired Sessions</h2>
          <SessionCard sessions={expiredSessions} status="expired" />
        </div>
      )}
    </div>
  );
};

export default ViewSessions;

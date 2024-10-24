import React, { useState } from "react";
import { deleteUserFromEvent } from "../../api";

export const RemoveUserFromEventButton = ({ eventId, userId, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRemoveUser = () => {
    setLoading(true);
    setError(null);

    deleteUserFromEvent(eventId, userId)
      .then(() => {
        onSuccess(eventId);
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.msg || "Failed to remove user from event");
        } else {
          setError("An unexpected error occurred");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <button onClick={handleRemoveUser} disabled={loading}>
        {loading ? "Removing..." : "Remove User from Event"}
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

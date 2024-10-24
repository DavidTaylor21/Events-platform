import {
  insertNewUser,
  editUser,
  fetchUserById,
  getUserEvents,
  loginUser,
} from "../models/users.model.js";
export const postNewUser = (req, res) => {
  insertNewUser(req.body)
    .then((newUser) => {
      console.log(newUser)
      res.status(201).send({ msg: "New user added", user: newUser });
    })
    .catch((err) => {
      err.msg && err.status
        ? res.status(err.status).send({ msg: err.msg })
        : res.status(500).send({ msg: "Internal server error" });
    });
};
export const patchUser = (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const updatedData = req.body;
  if (isNaN(userId)) {
    return res.status(400).send({ msg: "Invalid user ID" });
  }

  editUser(userId, updatedData)
    .then((updatedUser) => {
      return res.status(200).send({ msg: "User updated", user: updatedUser });
    })
    .catch((err) => {
      if (err.msg && err.status) {
        return res.status(err.status).send({ msg: err.msg });
      }
      return res.status(500).send({ msg: "Error updating user" });
    });
};
export const getUserById = (req, res) => {
  const userId = req.params.id;
  fetchUserById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ msg: "User not found" });
      }
      return res.status(200).send({ user });
    })
    .catch((err) => {
      if (err.msg && err.status) {
        return res.status(err.status).send({ msg: err.msg });
      }
      return res.status(500).send({ msg: "Error getting user" });
    });
};
export const getEventsByUser = (req, res) => {
  const userId = parseInt(req.params.id, 10);

  if (isNaN(userId)) {
    return res.status(400).send({ msg: "Invalid user ID" });
  }
  getUserEvents(userId)
    .then((events) => {
      return res.status(200).send(events);
    })
    .catch((err) => {
      if (err.msg && err.status) {
        return res.status(err.status).send({ msg: err.msg });
      }
      return res.status(500).send({ msg: "Error fetching user events" });
    });
};
export const postUserForLogin = (req, res) => {
  loginUser(req.body)
    .then((userResult) => {
      if (userResult) {
        res.status(200).send({ msg: "User Validated", user: userResult });
      } else {
        res.status(400).send({ msg: "Invalid Credentials" });
      }
    })
    .catch((err) => {
      if (err.msg && err.status) {
        return res.status(err.status).send({ msg: err.msg });
      }
      return res.status(500).send({ msg: "Error logging in user" });
    });
};

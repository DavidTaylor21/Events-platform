import {insertNewUser} from "../models/users.model.js"
export const postNewUser = (req, res) => {

    insertNewUser(req.body).then((newUser)=>{
        res.status(201).send({msg:"New user added", newUser})
    }).catch((err)=>{
        err.msg && err.status
        ? res.status(err.status).send({ msg: err.msg })
        : res.status(500).send({ msg: "Internal server error" });
    })
}
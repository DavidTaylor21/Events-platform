import {insertNewUser} from "../models/users.model.js"
export const postNewUser = (req, res) => {

    insertNewUser(req.body).then((newUser)=>{
        res.status(201).send({msg:"New user added", newUser})
    }).catch((err)=>{
        res.status(500).send({err})
    })
}
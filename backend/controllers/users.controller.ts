import { Request, Response } from "express";
import {insertNewUser} from "../models/users.model"
export const postNewUser = (req:Request, res:Response) => {

    insertNewUser(req.body).then(()=>{
        res.status(201).send({msg:"New user added"})
    }).catch((err:Error)=>{
        res.status(500).send({err})
    })
}
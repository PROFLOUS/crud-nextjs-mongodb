import { Schema } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/schemas/user.schema";

const ObjectId = mongoose.Types.ObjectId;


export const userStub =() : User =>{
    return{
        name: "DangLe",
        email: "test.com",
        password: "11111"
    }
};
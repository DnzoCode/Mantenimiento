import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbConnect } from "../../../../database/connect";
import User from "../../../../model/User";
import { compare } from "bcryptjs";

export default NextAuth({
    providers:[
        CredentialsProvider({
            name:"Credentials",
            async authorize(credentials, req){
                dbConnect();

                const {email, password} = credentials;
                // check user existance 
                const user = await User.findOne({ email});

                if(!user) throw new Error("No user Found");

                // comparar con los datos de la db
                const checkPassword = await compare(password, user.password)

                // Incorrect password
                if(!checkPassword |  user.email !== email){
                    throw new Error("Username or password incorrrect");
                }

                return {
                    email: user.email,
                    name: user.name,
                    role: user.role
                };
            }
        })
    ],
    database: process.env.MONGODB_URI,
    secret: "71VUBmeIQJZ5DVWe2oMnHgfdAX4A66CEkemgzER3VtU=",
})
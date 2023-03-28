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

                const {email} = credentials;
                // check user existance 
                const user = await User.findOne({ email});

                if(!user) throw new Error("No user Found");

                // comparar con los datos de la db
                const checkPassword = await compare(credentials.password, user.password)

                // Incorrect password
                if(!checkPassword || user.email !== credentials.email){
                    throw new Error("Username or password incorrrect");
                }

                return {
                    id: user._id,
                    email: user.email,
                    username: user.username,
                    rolname: user.rolname
                };
            }
        })
    ],
    secret: "71VUBmeIQJZ5DVWe2oMnHgfdAX4A66CEkemgzER3VtU=",
})
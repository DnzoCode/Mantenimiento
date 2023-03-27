import NextAuth from "next-auth/next";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../../lib/mongodb";
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

                // check user existance 
                const result = await User.findOne({ email: credentials.email});

                if(!result) throw new Error("No user Found");

                // comparar con los datos de la db
                const checkPassword = await compare(credentials.password, result.password)

                // Incorrect password
                if(!checkPassword || result.email !== credentials.email){
                    throw new Error("Username or password incorrrect");
                }

                return result;
            }
        })
    ]
})
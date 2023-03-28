import {dbConnect} from "../../../../database/connect";
import User from "../../../../model/User";
import { hash } from "bcryptjs";



export default async function handler(req, res){
    await dbConnect();
   
    const{method, body} = req;
    
   //Solo Metodo Post
    if(method === "POST"){ 
        const {name, email, password, role}= body;

        //Check usuarios duplicados
        const exist = await User.findOne({email});
        if(exist) return res.status(422).json({message: "User already exists"})


        //hash password
        const hashedPassword = await hash(password, 12)

        const user = new User({
            name,
            email,
            password: hashedPassword,
            role,
        });

        try {
            await user.save();
            return res.status(201).json({ status:true, user });
        } catch (error) {
            return res.status(500).json({ error });
        } 
    }else if(!body){
        return res.status(404).json({ error: "No DATA"}); 
    }else{
        res.status(500).json({message: "HTTP method is not suported"});
    }
}
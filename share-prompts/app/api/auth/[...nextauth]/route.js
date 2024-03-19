import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'

import {conectToDB, connectToDB} from '@utils/database'

import User from '@models/user';


const handler = NextAuth({
    providers:[
        GoogleProvider({

            clientId:process.env.GOOGLE_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        })
    ],


        async session({session}){
            const sessionUser = await User.findOne({
                email : session.user.email
            })
            session.user.id = sessionUser._id.toString();
        },
        async signIn({profile}){
            try {
               
                //serverless -> Lambda -> dynamodb
                await connectToDB();
    
                //check if user exists
                const userExists = await User.findOne({
                    email: profile.email
                })
                //is not create a new user
                if (!userExists){
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    })
                }
            } catch (error) {
                console.log(error)
                return false;
            }
        }

    


    
        
    

})
export { handler as GET, handler as POST}
import express from "express"
import passport from "passport";
import cors from "cors"
import session from "express-session";
import { initPassport } from "./auth/passport";
import { userRouter } from "./routes/userRoute";
import dotenv from "dotenv"
import { prisma } from "./db";


const app = express();

app.use(express.json());

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))

app.use(session({
    secret:"HackFusion2025",
    resave:false,
    saveUninitialized:false,
    cookie:{secure:false,maxAge:24 * 60 * 60 * 1000}
}))
dotenv.config();
initPassport();


app.use(passport.initialize());
app.use(passport.authenticate("session"));
app.use(passport.session());

app.use("/api/users",userRouter);

app.listen(6969,()=>{
    console.log("Running");
});


app.get("/delete",async(req:any,res:any) =>{
    try{
        await prisma.member.deleteMany({});
        res.send("Deleted successfully");
    }catch(e){
        console.log(e);
        res.send(e);
    }
})
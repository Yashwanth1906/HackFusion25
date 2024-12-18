import { prisma } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req: NextRequest) =>{
    try{
        const {teamId,memberdetails} = await req.json();
        const team = await prisma.team.findUnique({
            where:{
                id : teamId
            },select:{
                members:true
            }
        })
        if(!team){
            return NextResponse.json({message:"No such team is found with the given teamId"},{status:501});
        }
        if(team.members.length === 4){
            let isFemale = false;
            team.members.forEach((x)=>{
                if(x.gender === "female"){
                    isFemale = true;
                }
            })
            if(isFemale === false && memberdetails.gender !== "female"){
                return NextResponse.json({"message":"Atleast One female student should be in a team"},{status:501});
            }
        }
        const addMember = await prisma.member.create({
            data:{
                name:memberdetails.name, 
                email:memberdetails.email, 
                gender:memberdetails.gender, 
                regNo:memberdetails.regNo, 
                dept:memberdetails.dept, 
                year:memberdetails.year, 
                phoneno:memberdetails.phoneno, 
                isTeamLead:true,
                teamId:memberdetails.id
            }
        });
        return NextResponse.json({message:"Member Added successfully"},{status:200})
    } catch(e){
        console.log(e);
        return NextResponse.json({error:e},{status:500})
    }
}
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

  export const GET=async(request:Request)=>{
    try{
        const posts=await prisma.dost.findMany();
        return NextResponse.json({posts},{status:200})

    }catch(err){
return NextResponse.json({msg:err})   
 }
  }
  
 export const  POST=async(request:Request)=>{
      try{
      const {title,description}=await request.json();
       const dat= await prisma.dost.create({data:{title,description}});
       //console.log(dat);
        return NextResponse.json(dat)
      }catch(err){
return NextResponse.json({msg:err})        
      }
    }
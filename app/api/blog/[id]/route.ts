import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export const GET=async(request:Request)=>{
    try{
  const id=request.url.split("/blog/")[1];
  const post=await prisma.dost.findFirst({
    where:{id}
  })
  return NextResponse.json({post})
    }catch(err){
        console.log(err);
        return NextResponse.json('error ocurred!')
    }
  }




export const PUT=async(request:Request)=>{
    
const id=request.url.split('/blog/')[1];
const {title,description}=await request.json();

const post=await prisma.dost.update({
    data:{title,description},
    where:{id}
})
return NextResponse.json({post})
}

export const DELETE=async(request:Request)=>{
  try{
    const id=request.url.split('/blog/')[1];
    await prisma.dost.delete({where:{id}})
    return NextResponse.json('delete successfull')
  }catch(err){
 return NextResponse.json({msg:err})  }
}
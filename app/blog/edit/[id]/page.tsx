"use client";

import { useRouter } from "next/navigation";
import { Fragment, useEffect, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
 type Type={
    title:string;
    description:string;
    id:string;
 }

const UpdateBlog = async (data:Type) => {
  //update using axios


  const res=await axios.put(`/api/blog/${data.id}`,{
    title:data.title,
    description:data.description
    });
   const result=res.data;

   return result;



  // const res = fetch(`http://localhost:3000/api/blog/${data.id}`, {
  //   method: "PUT",
  //   body: JSON.stringify({ title:data.title, description:data.description }),
  //   //@ts-ignore
  //   "Content-Type": "application/json",
  // });
  // return (await res).json();
};
const DeleteBlog = async (id:string) => {
    //delete by axios
    const res=axios.delete(`/api/blog/${id}`)
    const result=(await res).data;
    return result;


  // const res = fetch(`http://localhost:3000/api/blog/${id}`, {
  //   method: "DELETE",
  //   //@ts-ignore
  //   "Content-Type": "application/json",
  // });
  // return (await res).json();
};





const getBlogById=async(id:string)=>{
     const res=await axios.get(`/api/blog/${id}`)
     const result=res.data;
     return result.post;
     


    // const res=await fetch(`http://localhost:3000/api/blog/${id}`)
    // const data= await res.json();
    // return data.post;
}

const EditBlog = ({params}:{params:{id:string}}) => {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
    useEffect(()=>{
    
        getBlogById(params.id)
               .then((data)=>{
                if(titleRef.current&& descriptionRef.current){

                    titleRef.current.value=data.title;
                    
                      
                    descriptionRef.current.value=data.description;
                    toast.success("Fetching old data Complete",{id:'1'})
                }
               })
               .catch((err)=>{
                console.log(err);
                toast.error("Fetching Error!",{id:'1'})
               })

    })  


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (titleRef.current && descriptionRef.current) {
      toast.loading("Sending Request 🚀", { id: "1" });
      await UpdateBlog({
        title: titleRef.current?.value,
        description: descriptionRef.current?.value,
        id:params.id
      });
      toast.success("Blog Posted Successfully", { id: "1" });
      router.push("/");
    }
  };

  const handleDelete=async()=>{
      

    toast.loading('deleting blog',{id:'2'})
    await DeleteBlog(params.id)
    toast.success('blog deleted',{id:'2'})
    router.push('/')

  }


  return (
    <Fragment>
      <Toaster />
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-800 font-bold p-3">
            Edit Blog 🚀
          </p>
          <form onSubmit={handleSubmit}>
            <input
              ref={titleRef}
              placeholder="Enter Title"
              type="text"
              className="rounded-md px-4 w-full py-2 my-2 "
            />
            <textarea
              ref={descriptionRef}
              placeholder="Enter Description"
              className="rounded-md px-4 py-2 w-full my-2"
            ></textarea>
            <div className="flex">

            <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
              Update
            </button>
            
            </div>
          </form>
          <button onClick={handleDelete} className="font-semibold px-4 py-2 shadow-xl bg-orange-500 rounded-lg m-auto hover:bg-orange-400">
              Delete
            </button>
        </div>
      </div>
    </Fragment>
  );
};

export default EditBlog;
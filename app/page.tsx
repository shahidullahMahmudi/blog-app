import Link from "next/link";

async function fetchBlogs(){
 




  const res=await fetch('http://localhost:3000/api/blog',{
    next:{
      revalidate:0,
    }
  })
  const data=await res.json();
  
  return data.posts;
}



const Home =async() => {
  const posts=await fetchBlogs();

  return (
    <div className='flex flex-col bg-black/20 min-h-screen justify-center items-center text-xl max-w-7xl mx-auto p-10 gap-y-3'>
     <div>
            <h1 className='text-4xl font-bold shadow-md text-center'>My Full Stack Blog</h1>

      </div>
      <div>
        <Link  href={'/blog/add'} className="border font-bold bg-black/10 px-4">Add New Blog</Link>
      </div>
      <div className="flex flex-col gap-7 ">
        {
          posts?.map((post:any)=>(
            <div key={post.id} className =" rounded shadow-lg p-2 bg-zinc-300">
              <div className=" flex justify-between ">
                <div >
                  <h2 className="font-bold">{post.title}</h2>
                  </div>
                   <Link href={`/blog/edit/${post.id }`} className="border rounded  gap-y-5 font-bold p-2 bg-orange-500">
                   Edit
                   </Link>

                   
                 </div>
                 <div>

                  <blockquote>{new Date(post.date).toDateString()}</blockquote>
                 </div>
                 <div>
                  <h2>{post.description}</h2>
                 </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Home;
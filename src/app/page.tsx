'use client'
import Image from "next/image"
import { supabase } from "../../supabaseClient"
import { useState } from "react";
import { useRouter } from "next/navigation";



  


export default function Home() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      alert("Check your email for the login link!");
      setEmail("");
      router.push("/Main")
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-slate">
       <div className="items-center justify-items-center space-y-4">
          <h1 className="font-extrabold text-6xl items-center justify-center" >
        Bammy&apos;s 
     </h1>
      <p className="font-semibold text-2xl text-gray-400">Weather Forecast</p>

      <Image
      src='/images/cloud.jpg'
      alt="/"
      width={500}
      height={500}/>
        </div>
      <form onSubmit={handleLogin} className="w-full max-w-xs space-y-4">
        <h1 className="text-2xl font-semibold">Login</h1>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded-lg"
          required
        />
        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg hover: cursor-grab hover:bg-blue-300">
          Send Magic Link
        </button>
      </form>
    </div>
  );
}


    

  
//   const signin = async () => {
// try{
//   let { data, error } = await supabase.auth.signInWithPassword({
//   email: process.env.NEXT_PUBLIC_SUPABASE_EMAIL!,
//   password: process.env.NEXT_PUBLIC_SUPABASE_PASSWORD!
// })
//  if (error) throw error;
//  console.log("Signed in successfully:", data);

//  } catch (err) {
//    console.error("Sign-in error:",err)

// }
// } 
//   return(
//     <div className=" justify-items-center bg-slate">
//       <div className="items-center justify-items-center space-y-4">
//          <h1 className="font-extrabold text-6xl items-center justify-center" >
//         Bammy's 
//       </h1>
//       <p className="font-semibold text-2xl text-gray-400">Weather Forecast</p>

//       <Image
//       src='/images/cloud.jpg'
//       alt="/"
//       width={500}
//       height={500}/>
//     <div className="flex mt-4">
//       <input
//       className="justify-between items-center w-full m-auto p-3 bg-transparent border border-black-300 rounded-2xl text-black focus:outline-none text-2xl" type="text" placeholder="input Email"
//       required/>
//       <button onClick={signin} className="bg-blue-600 border ml-2  rounded-2xl px-6 text-amber-100 font-semibold font-serif">Sign in</button>
//     </div>

//       <input
//           className="justify-between items-center w-full m-auto p-3 bg-transparent border border-black-300 rounded-2xl text-black focus:outline-none text-2xl" type="passworrd" placeholder="*********"
//           required/>
//       </div>
     
//     </div>
//   )
// }

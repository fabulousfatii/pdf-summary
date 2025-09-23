"use client"
 
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  
} from "@/components/ui/form"
import { authFormSchema } from "@/lib/utils"
import CustomInput from "./CustomInput"
import { useState } from "react"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"



   

function AuthForm({type}:{type:string}) {

    //   const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
     const router= useRouter()
  

  const formSchema = authFormSchema(type); // because sechema is function we are passing like this 


 const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
       email: "",
        password: ""
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    
    if(type==="sign-in"){
       console.log(values.email, values.password)
           try {
               const result = await signIn('credentials', { redirect: false, 
               email: values.email,
               password: values.password  })
               console.log({result})
       
             if(result?.error)  {
               console.log("username, password incorrect",result.error)
             }
             else if(result?.url) {
               router.push('/')
               }
       
       
           } catch (error) {
               console.error(error)
           }
    }else{
      //signup call
        setIsLoading(true)
        const form ={
          fullname: values.fullname,
          email: values.email,
          password: values.password,
        }
        console.log(form)
        try{

           const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setIsLoading(false)

        }catch(error){

          setIsLoading(false)
          console.log("signup failed", error)

        }

    }
   
  }


  return (
    <>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === 'sign-up' && (
                <>
                  <div className="flex gap-4">
                    <CustomInput control={form.control} name='fullname' label="fullname" placeholder='Enter your fullname' />
                  </div>
                  
                  <div className="flex gap-4">
                    
                  </div>
                  <div className="flex gap-4">
                  </div>
                </>
              )}

              <CustomInput control={form.control} name='email' label="Email" placeholder='Enter your email' />

              <CustomInput control={form.control} name='password' label="Password" placeholder='Enter your password' />

              <div className="flex flex-col gap-4">
                <Button type="submit" disabled={isLoading} className="form-btn">
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading...
                    </>
                  ) : type === 'sign-in' 
                    ? 'Sign In' : 'Sign Up'}
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === 'sign-in'
              ? "Don't have an account?"
              : "Already have an account?"}
            </p>
            <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className="form-link text-white">
              {type === 'sign-in' ? 'Sign up' : 'Sign in'}
            </Link>
          </footer>

          </>


  )
}

export default AuthForm

import AuthForm from "@/components/AuthForm"

const SignUp = async () => {
  return (
        <section className="flex-center flex h-screen  flex-col  justify-center items-center size-full max-sm:px-6" >

  <div className='w-1/3 bg-rose-400 p-5 flex flex-col justify-center '>
        <h2 className='text-5xl font-bold text-center text-white'>Signup</h2>
      <AuthForm type="sign-up" />
      </div>
    </section>
  )
}

export default SignUp
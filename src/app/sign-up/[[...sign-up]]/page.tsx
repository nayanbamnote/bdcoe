import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return  (
  <div className='flex items-center justify-center w-full h-screen'>
        <div className="transform scale-125 sm:scale-150">
        <SignUp />
        </div>
      </div>)
}
import { Suspense } from 'react'
import NewProfileForm from '@/components/forms/NewProfileForm'

export default function NewProfilePage() {
  return (
    <div className="container mx-auto py-[40px]">
      <h1 className="text-[24px] font-bold mb-[32px]">Complete Your Profile</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <NewProfileForm />
      </Suspense>
    </div>
  )
}
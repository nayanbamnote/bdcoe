import { Skeleton } from "@/components/ui/skeleton"

export const ProfileSkeleton = () => (
  <div className="bg-white rounded-[8px] border border-[#E5E7EB]">
    <div className="p-[16px] md:p-[24px]">
      <div className="flex flex-col md:flex-row items-center gap-[24px]">
        {/* Profile Content - Order 2 on mobile, 1 on desktop */}
        <div className="w-full order-2 md:order-1">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start w-full">
            <div className="text-center md:text-left space-y-[16px]">
              <Skeleton className="h-[32px] w-[200px]" />
              <Skeleton className="h-[16px] w-[150px]" />
              <Skeleton className="h-[16px] w-[150px]" />
              <Skeleton className="h-[16px] w-[150px]" />
            </div>
            <div className="mt-[16px] md:mt-0">
              <Skeleton className="h-[40px] w-[100px]" />
            </div>
          </div>
        </div>
        
        {/* Image - Order 1 on mobile, 2 on desktop */}
        <div className="order-1 md:order-2 w-full md:w-auto flex justify-center">
          <Skeleton className="h-[176px] w-[176px] rounded-[9999px]" />
        </div>
      </div>
    </div>
  </div>
);
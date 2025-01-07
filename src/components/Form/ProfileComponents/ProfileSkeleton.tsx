import { Skeleton } from "@/components/ui/skeleton"

export const ProfileSkeleton = () => (
  <div className="flex justify-between items-center p-[16px] bg-white rounded-[8px]">
    <div className="flex items-center space-x-[16px] w-full">
      <div className="flex-grow space-y-[16px]">
        <Skeleton className="h-[32px] w-[200px]" />
        <Skeleton className="h-[16px] w-[150px]" />
        <Skeleton className="h-[16px] w-[150px]" />
        <Skeleton className="h-[16px] w-[150px]" />
      </div>
      <div className="flex-shrink-0">
        <Skeleton className="h-[176px] w-[176px] rounded-[9999px]" />
      </div>
    </div>
  </div>
);
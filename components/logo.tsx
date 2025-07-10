import Image from "next/image"

export function Logo() {
  return (
    <div className="flex items-center">
      <Image src="/images/logo-new.png" alt="BRIEF BUILDER" width={200} height={40} className="h-8 w-auto" />
    </div>
  )
}

import Image from "next/image"

export function Logo() {
  return (
    <div className="flex items-center">
      <Image src="/images/brief-builder-logo.png" alt="BRIEF BUILDER" width={200} height={100} className="h-12 w-auto" />
    </div>
  )
}

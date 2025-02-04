import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import Image from 'next/image'

type SkillCardProps = {
  title: string
  img: string
  className?: string
  alt?: string
}
export const SkillCard = ({ title, img, className, alt }: SkillCardProps) => {
  return (
    <div className={cn('flex-grow p-2', className)}>
      <Card className="flex h-60 flex-col items-center justify-center border-4 border-gray-800 bg-red-200 p-5 shadow-[5px_5px_lightblue] hover:-motion-translate-y-out-[10px]">
        <CardContent className="flex h-48 items-center">
          <Image src={img} alt={alt || ''} width={80} height={80} />
        </CardContent>

        <CardFooter className="justify-center">
          <CardTitle>{title}</CardTitle>
        </CardFooter>
      </Card>
    </div>
  )
}

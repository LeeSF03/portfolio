import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ClassValue } from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

type SkillCardProps = {
  title: string
  img: string
  link: string
  className?: ClassValue
  alt?: string
  onClick?: () => void
}
export const ContactCard = ({
  title,
  img,
  link,
  className,
  alt,
  onClick,
}: SkillCardProps) => {
  return (
    <div className={cn('flex-grow p-2', className)}>
      <Card className="flex h-60 flex-col items-center justify-center border-4 border-gray-800 bg-orange-200 p-5 shadow-[9px_9px_lightblue] hover:-motion-translate-y-out-[10px]">
        <Link href={link} onClick={onClick}>
          <CardContent className="flex h-48 items-center">
            <Image src={img} alt={alt || ''} width={80} height={80} />
          </CardContent>
          <CardFooter className="justify-center">
            <CardTitle>{title}</CardTitle>
          </CardFooter>
        </Link>
      </Card>
    </div>
  )
}

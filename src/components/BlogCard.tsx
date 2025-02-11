import Link from 'next/link'
import Image, { StaticImageData } from 'next/image'

type BlogCardProps = {
  blogId: string
  blogTitle: string
  imageHref: string | StaticImageData
}

export default function BlogCard({
  blogTitle,
  blogId,
  imageHref,
}: BlogCardProps) {
  return (
    <div className="rounded-3xl border-4 border-gray-800 bg-green-300 p-3 shadow-[7px_7px_lightblue] hover:-motion-translate-x-out-[5px] hover:-motion-translate-y-out-[5px]">
      <Link href={`/blogs/${blogId}`}>
        <div className="flex h-64 flex-col overflow-hidden rounded-2xl border-4 border-gray-800">
          <div className="h-40 w-full rounded-2xl">
            <Image
              src={imageHref}
              alt={'deployment cover'}
              width={1920}
              height={1080}
              className="w-full"
            />
          </div>
          <div className="z-10 flex-1 bg-orange-300 p-3 font-blog-title text-xl font-semibold">
            {blogTitle}
          </div>
        </div>
      </Link>
    </div>
  )
}

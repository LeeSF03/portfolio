import { publicRoot } from '@/constants/global'
import Image from 'next/image'

export default function BlogPage() {
  return (
    <div className="pt-3">
      <div className="rounded-3xl border-4 border-gray-800 bg-green-300 p-3 shadow-[7px_7px_lightblue] hover:-motion-translate-x-out-[5px] hover:-motion-translate-y-out-[5px]">
        <div className="flex h-64 flex-col overflow-hidden rounded-2xl border-4 border-gray-800">
          <div className="h-40 w-full rounded-2xl">
            <Image
              src={`${publicRoot}/img/blogs/deployment.png`}
              alt={'deployment cover'}
              width={1920}
              height={1080}
            />
          </div>
          <div className="font-blog-title z-10 flex-1 bg-orange-300 p-3 text-xl font-semibold">
            An upcoming blog about how I selfhost my own website using Azure,
            Docker, Ansible, Nginx, GitHub and more...
          </div>
        </div>
      </div>
    </div>
  )
}

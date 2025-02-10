import BlogCard from '@/components/BlogCard'
import { publicRoot } from '@/constants/global'

export default function BlogPage() {
  return (
    <div className="flex flex-col gap-y-5 pt-3">
      <BlogCard
        blogId="deployment"
        imageHref={`${publicRoot}/img/blogs/deployment/deployment.png`}
        blogTitle="Deploying a NextJS website with Docker, Nginx, Ansible and GitHub Actions "
      />
    </div>
  )
}

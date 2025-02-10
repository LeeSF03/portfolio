import BlogCard from '@/components/BlogCard'
import deployment from '@/images/blogs/deployment/deployment.png'

export default function BlogPage() {
  return (
    <div className="flex flex-col gap-y-5 pt-3">
      <BlogCard
        blogId="deployment"
        imageHref={deployment}
        blogTitle="Deploying a NextJS website with Docker, Nginx, Ansible and GitHub Actions "
      />
    </div>
  )
}

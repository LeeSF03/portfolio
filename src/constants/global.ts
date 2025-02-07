export const pages = [
  { name: 'Home', path: '/' },
  { name: 'Blogs', path: '/blogs' },
]

export const publicRoot =
  process.env.NODE_ENV === 'production' ? 'https://leesf.xyz' : ''

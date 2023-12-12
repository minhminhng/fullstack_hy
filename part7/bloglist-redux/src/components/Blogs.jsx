import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Blogs = () => {
  const blogs = useSelector(({ blogs }) => {
    return blogs
  })

  return (
    <div>
      <h2>blogs</h2>
      {blogs
        .map((blog) => (
          <div  className='blog' key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></div>
        ))}
    </div>
  )
}

export default Blogs
const User = ({ user }) => {
  if (!user) {
    return null
  }

  const blogs = user.blogs

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      {blogs.map(b => <li key={b.id}>{b.title}</li>)}
    </div>
  )
}

export default User
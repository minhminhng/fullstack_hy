import React from 'react'

const CreateForm = ( {handleCreate, title, setTitle, author, setAuthor, url, setUrl} ) => (
    <div>
      <h2>create a new blog</h2>
      <form onSubmit={handleCreate}>
          <table>
            <tbody>
            <tr>
                <td>title:</td>
                <td><input type="text" value={title} name="title" onChange={({target}) => setTitle(target.value)} /></td>
            </tr>
            <tr>
                <td>author:</td>
                <td><input type="text" value={author} name="author" onChange={({target}) => setAuthor(target.value)} /></td>
            </tr>
            <tr>
                <td>url:</td>
                <td><input type="text" value={url} name="author" onChange={({target}) => setUrl(target.value)} /></td>
            </tr>
            </tbody>
        </table>
        <button type="submit">save</button>
      </form>
    </div>
  )

export default CreateForm
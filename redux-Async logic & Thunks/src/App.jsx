import { useState } from 'react'
import AddPostsForm from './features/posts/AddPostsForm'
import PostsList from './features/posts/PostsList'

function App() {
  return (
    <div className="App">
      <AddPostsForm />
      <PostsList />
    </div>
  )
}

export default App

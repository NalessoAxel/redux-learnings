import {useSelector, useDispatch} from 'react-redux'
import { selectAllPosts } from './postSlice'

const PostsList = () => {
    const posts = useSelector(selectAllPosts)

    const renderedPosts  = posts.map(post=>(
            <article key={post.id}>
                <h1>{post.title}</h1>
                <p>{post.content.substring(0, 100)}</p>
            </article>
        ))
    
  return (
    <section>
        <h2>All Posts</h2>
        {renderedPosts}
    </section>
  )
}

export default PostsList
import {useState} from 'react'
import { useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'

import { postAdded } from './postSlice'

const AddPostsForm = () => {
    const dispatch = useDispatch()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const onTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const onContentChange = (e) => {
        setContent(e.target.value)
    }

    const onPostSave = () => {
        if(title && content) {
            dispatch (postAdded({
                id: nanoid(),
                title,
                content
            }))
            setTitle('')
            setContent('')
        }
    }

  return (
    <section>
        <h2>Add a new post</h2>
        <form>
            <div className='form-control'>
            <input type="text" id='postTitle' placeholder="Title" value={title} onChange={onTitleChange} />
            <textarea id='postContent' placeholder="Content" value={content} onChange={onContentChange} />
            <button type="button" onClick={onPostSave}>Add Post</button>
            </div>
        </form>
    </section>
  )
}

export default AddPostsForm
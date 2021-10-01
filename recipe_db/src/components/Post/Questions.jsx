import React, { useContext, useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import axiosInstance from '../../AxiosAPI';
import { DataContext } from '../Main/DataContext'
import axios from 'axios';



function Questions({ recipeId }) {

// Context

const {currentUser} = useContext(DataContext)

// State
const [postState, setPostState] = useState("")
const [posts, setPosts] = useState([])

// Get post
useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/post/recipe/${recipeId}`)
    .then(res => setPosts(res.data))
    .catch(console.error)
}, [])

console.log(posts)

// Handle Submit
const handleSubmitPost = (event) => {
    event.preventDefault()
axiosInstance.post('/post/', {
    user: currentUser,
    body: postState,
    recipe: recipeId
})
.then(res => console.log(res))
.catch(console.error)
setPostState("")
}

// Handle Post

const handlePost = (event) => {
    setPostState(event.target.value)
}
console.log(postState)
if (posts.length === 0) {


    return (
        <div>
            <h1>Be the First to Post on this Recipe!</h1>
            <Form onSubmit = { handleSubmitPost }>
                <Form.Group>
                    <FloatingLabel
                    label = 'Comment on this Recipe'>
                         <Form.Control
                        id = 'post'
                        value = { postState }
                        placeholder = "Comment on this Recipe"
                        onChange = { handlePost }
                        />
                    </FloatingLabel>
                </Form.Group>
                <Button variant = 'primary' type = 'submit'>Post</Button>
            </Form>
            
        </div>
    );
}else{
    return (
   <div>
       {posts.map(post => {
           return(
               <div>
                   <h3>{post.user}-</h3>
                   <p>"{post.body}"</p>
                    {currentUser === post.user ? <Button type = 'secondary' >Edit</Button>: null}
                    {currentUser ? <Button type = 'primary'> Comment</Button> : null}
                    <div>
                        <p>Comments:</p>
                        {post.comments.map(comment => {
                            return (
                                <div>
                                <h3>{comment.user}-</h3>
                                <p>"{ comment.body }"</p>
                                {currentUser === comment.user ? <Button type = 'secondary' >Edit</Button>: null}
                                {currentUser ? <Button type = 'primary'> Comment</Button> : null}
                                </div>
                            )
                        })}
                        
                    </div>
               </div>
           )
       })}
   </div>
    )
}
}

export default Questions;
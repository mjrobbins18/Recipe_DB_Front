import React, { useContext, useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Toast from 'react-bootstrap/Toast'
import axiosInstance from '../../AxiosAPI';
import { DataContext } from '../Main/DataContext'
import axios from 'axios';
import { ToastContainer } from 'react-bootstrap';



function Questions({ recipeId }) {

// Context

const {currentUser} = useContext(DataContext)

// State
const [postState, setPostState] = useState("")
const [commentState, setCommentState] = useState("")
const [postId, setPostId] = useState()
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

// Handle Submit Comment
const handleSubmitComment = (event) => {
    event.preventDefault()
    axiosInstance.post('/comment/', {
        user: currentUser,
        body: commentState,
        post: postId, 
        recipe: recipeId,
    })
    .then(res => console.log(res))
    .catch(console.error)
    setCommentState("")
}

// Handle Comment
const handleComment = (event) => {
    setCommentState(event.target.value)
    setPostId(event.target.name)
    
}

// Handle Post

const handlePost = (event) => {
    setPostState(event.target.value)
}
console.log(postState)
if (posts.length === 0) {


    return (
        <div>
            {currentUser ? 
            <Toast bg = 'primary'>
                <Toast.Header closeButton = { false }>
                Be the First to Post on this Recipe!
                </Toast.Header>
                <Toast.Body>

                
            <Form onSubmit = { handleSubmitPost }>
                <Form.Group>
                    <FloatingLabel
                    label = 'Post Something on this Recipe'>
                         <Form.Control
                        id = 'post'
                        value = { postState }
                        placeholder = "Post Something on this Recipe"
                        onChange = { handlePost }
                        />
                    </FloatingLabel>
                </Form.Group>
                <br/>
                <Button variant = 'primary' type = 'submit'>Post</Button>
            </Form>
            </Toast.Body>
            </Toast>
            : <h1>Login or Signup to Create a Post or Make a Comment</h1>}
        </div>
    );
}else{
    return (
   <div>
       {posts.map(post => {
           return(
               
               <div>
                   <div>
                   <Toast bg = 'primary'>
                       <Toast.Header closeButton = { false }>
                   <h3>{post.user}-</h3>
                   </Toast.Header>
                   <Toast.Body>
                   <p>"{post.body}"</p>
                    {currentUser === post.user ? <Button type = 'secondary' >Edit</Button>: null}
                    {currentUser ?
                    <Form onSubmit = { handleSubmitComment }>
                    <Form.Group>
                        <FloatingLabel
                        label = 'Comment on this Post'>
                             <Form.Control
                            id = 'post'
                            name = {post.id}
                            value = { commentState }
                            placeholder = "Comment on this Post"
                            onChange = { handleComment }
                            />
                        </FloatingLabel>
                    </Form.Group>
                    <br/>
                     <Button type = 'primary'> Comment</Button> 
                     </Form>: null}
                    </Toast.Body>
                    </Toast>
                    </div>
                    <div>
                        {post.comments[0] ? <h2>Comments:</h2> : null}
                        
                        
                        {post.comments.map(comment => {
                            return (
                                <div className = 'commentDiv'>
                                <Toast>
                                    <Toast.Header closeButton = { false }>
                                <h3>{comment.user}-</h3>
                                </Toast.Header>
                                <Toast.Body>
                                <p>"{ comment.body }"</p>
                                <br/>
                                {currentUser === comment.user ? <Button type = 'secondary' >Edit</Button>: null}                     
                                </Toast.Body>
                                </Toast>
                                </div>
                            )
                        })}
                        
                    </div>
               </div>
           )
       })}
       {currentUser ? 
       <div>
       <Toast bg = 'primary'>
                <Toast.Header closeButton = { false }>
                Create another Post
                </Toast.Header>
                <Toast.Body>
       <Form onSubmit = { handleSubmitPost }>
                <Form.Group>
                    <FloatingLabel
                    label = 'Post Something on this Recipe'>
                         <Form.Control
                        id = 'post'
                        value = { postState }
                        placeholder = "Post Something on this Recipe"
                        onChange = { handlePost }
                        />
                    </FloatingLabel>
                </Form.Group>
                <br/>
                <Button variant = 'primary' type = 'submit'>Post</Button>
            </Form>
            </Toast.Body>
            </Toast>
       </div>
       : null}
   </div>
    )
}
}

export default Questions;
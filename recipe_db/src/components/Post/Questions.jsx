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
const [messages, setMessages] = useState([])

const roomName = recipeId;

// Connect to websocket
const connect = () => {
    const chatSocket = new WebSocket(
        'ws://'
        + 'localhost:8000/ws/chat/'
        + roomName
        + '/'
    );
    
    chatSocket.onclose = function(e) {
        console.error('Chat socket closed unexpectedly');
    };
    
}

// Get post
const WAIT_TIME = 5000
useEffect(() => {
    const id = setInterval(() => {
        axios
        .get(`http://127.0.0.1:8000/api/post/recipe/${recipeId}`)
        .then(res =>  {
            setPosts(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, WAIT_TIME);
    return () => clearInterval(id)
}, [posts])


// useEffect(() => {
//     connect()
// },[])



// Posts into Chat Room
// const sendPost = () => {
//     const chatSocket = new WebSocket(
//         'ws://'
//         + 'localhost:8000/ws/chat/'
//         + roomName
//         + '/'
//     );    
//     const message = postState
//     chatSocket.onopen = () => chatSocket.send(JSON.stringify({'message': message}))

//         chatSocket.onmessage = function(e) {
            
//             const data = JSON.parse(e.data);
//             var message = data.message
//             const incomingMessage = message
//             setMessages(() =>[...messages, incomingMessage]);
          
//         }
        
      
// }


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

// sendPost()

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
if (posts.length === 0) {


    return (
       
        <div>
       <div>
           {/* {messages} */}
       </div>
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
       <Button variant = 'primary' onClick = {connect} >Connect</Button>
       <div>
       {/* {messages.map((item, i) => {
           return(
               <div  id = "message">
                   <Toast>
                       <Toast.Header closeButton = { false }>
                           <h3>{currentUser}</h3>
                       </Toast.Header>
                       <Toast.Body>
                       <div>{item}</div>
                       </Toast.Body>
                       </Toast>
                  
                   </div>
           )
       } )} */}
       </div>
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
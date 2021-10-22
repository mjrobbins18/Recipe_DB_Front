import React, { useContext, useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Toast from 'react-bootstrap/Toast'
import axiosInstance from '../../AxiosAPI';
import { DataContext } from '../Main/DataContext'
import axios from 'axios';
import '../../css/Post/Question.css'






function Questions({ recipeId }) {

 
// Context

const {currentUser} = useContext(DataContext)

// State
const [postState, setPostState] = useState("")
const [commentState, setCommentState] = useState("")
const [postId, setPostId] = useState()
const [posts, setPosts] = useState([])
// const [messages, setMessages] = useState([])
const [edit, setEdit] = useState({edit: false})
const [postEdit, setPostEdit] = useState([{body: ""}])


// const roomName = recipeId;

// Connect to websocket
// const connect = () => {
//     const chatSocket = new WebSocket(
//         'ws://'
//         + 'recipe-db-p4.herokuapp.com/ws/chat/'
//         + roomName
//         + '/'
//     );
    
//     chatSocket.onclose = function(e) {
//         console.error('Chat socket closed unexpectedly');
//     };
    
// }

// Get post
const WAIT_TIME = 5000

useEffect(() => {
    const id = setInterval(() => {
        axios.get(`https://recipe-db-p4.herokuapp.com/api/post/recipe/${recipeId}`)
        .then(res =>  {
            setPosts(res.data)})
        .catch(err => console.log(err))
    }, 
    WAIT_TIME);
    return () => clearInterval(id)
}, [])


// useEffect(() => {
//     connect()
// },[])




// Posts into Chat Room
// const sendPost = () => {
//     const chatSocket = new WebSocket(
//         'ws://'
//         + 'recipe-db-p4.herokuapp.com/ws/chat/'
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
.then(res => {
    console.log(res)
    axios.get(`https://recipe-db-p4.herokuapp.com/api/post/recipe/${recipeId}`)
    .then(res =>  {
        setPosts(res.data)})
    .catch(err => console.log(err))
})
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


 // Handle Delete Post
 const deletePost = (event) => {
    axiosInstance.delete(`/post/${event.target.id}`)
    .then(res => console.log(res))
    .catch(console.error)
}


 // Post Put Call
 const editPost = (event) => {
     event.preventDefault()
    axiosInstance.put(`/post/${event.target.id}`,
    {user: currentUser,
        recipe: recipeId,
        body: postEdit[0].body})
    .then(res => console.log(res))
    .catch(console.error)
    setEdit(false)
}

// Edit Post Handle Change
const handleEditPost = (event, index) => {
    const { id, value } = event.target;
    const list = [...postEdit];
    list[index][id] = value
    setPostEdit(list);
}

// Edit Button Event Listener
const editButton = (event) => {
    setEdit({edit: true, id: event.target.id});
    axios.get(`https://recipe-db-p4.herokuapp.com/api/post/${event.target.id}`
       
    )
    .then(res => setPostEdit([res.data]))
    .catch(console.error)
}


// Handle Comment Change
const handleComment = (event) => {
    setCommentState(event.target.value)
    setPostId(event.target.name)
    
}

 // Handle Delete Comment
 const deleteComment = (event) => {
    axiosInstance.delete(`/comment/${event.target.id}`)
    .then(res => console.log(res))
    .catch(console.error)
}


// Handle Post Change
const handlePost = (event) => {
    setPostState(event.target.value)
}


if (posts.length === 0) {


    return (
       
        <div className = "postContainer">
    
            {currentUser ? 
            <Toast bg = 'primary' className = "post" id = "fade">
                <Toast.Header closeButton = { false }>
                Be the First to Post on this Recipe!
                </Toast.Header>
                <Toast.Body>

                
            <Form onSubmit = { handleSubmitPost } >
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
                <Button id = {edit.id} variant = 'success' type = 'submit'>Post</Button>
            </Form>
            </Toast.Body>
            </Toast>
            : <h1>Login or Signup to Create a Post or Make a Comment</h1>}
        </div>
    );
}else{
    return (
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
       <div className = "postContainer">

       {posts.map(post => {
           return(
            
               <div >
                   
                   <div >
                   <Toast id = "fade" bg = 'primary' >
                       <Toast.Header closeButton = { false }>
                   <h3>{post.user}:</h3>
                   </Toast.Header>
                   <Toast.Body>
                       {(edit.edit === true) ?
                       
                       <div>
                           {postEdit.map((item, i )=> {
                           return (
                            <Form onSubmit = { editPost } id = {item.id}>
                            <FloatingLabel
                            label = "Edit Post"
                            >
                                <Form.Control
                                id = 'body'
                                name = {item.id}
                                value = {item.body}
                                onChange = {e => handleEditPost(e, i)}
                                />
                            </FloatingLabel>
                            <Button id = {item.id} variant = 'secondary' type = 'submit'>Update</Button>
                        </Form>
                           )
                       })}
                           
                       </div>

                       :

                       <div className = "postBodyContainer">
                       <p className = "postBody">"{post.body}"</p>
                       </div>
       }
                    {currentUser === post.user ? 
                    <div>
                        {edit.edit === true ? null :
                    <div>
                        <Button id={post.id} size='sm' variant='secondary' onClick = {editButton} >Edit</Button>
                        <Button id={post.id} size='sm' variant='danger' onClick={deletePost}>Delete</Button>
                    </div>
                        }
                    
                    </div>
                   
                        : null}
                    {currentUser ?
                    <Form onSubmit = { handleSubmitComment }>
                         <br/>
                    <Form.Group>
                        <FloatingLabel
                        label = 'Comment Here'>
                             <Form.Control
                            id = 'post'
                            name = {post.id}
                            value = { commentState }
                            placeholder = "Comment Here"
                            onChange = { handleComment }
                            />
                        </FloatingLabel>
                    </Form.Group>
                    <br/>
                     <Button variant = 'success' type = "submit"> Comment</Button> 
                     </Form>: null}
                    </Toast.Body>
                    </Toast>
                    </div>
                 
                    <div>
                  
                        {post.comments.map(comment => {
                            return (
                                <div className = 'commentDiv'>
                                <Toast id = "fade" >
                                    <Toast.Header closeButton = { false }>
                                <h3>{comment.user} commented: </h3>
                                </Toast.Header>
                                <Toast.Body>
                                <div className = "commentBodyContainer">
                                    <p className = "commentBody">"{ comment.body }"</p>
                                </div>
                                <br/>
                                {currentUser === comment.user ? 
                                <div>
                                <Button id = { comment.id } size = 'sm' variant = 'danger' onClick = { deleteComment }>Delete</Button>
                                </div>
                                : null}                     
                                </Toast.Body>
                                </Toast>
                                </div>
                            )
                        })}
                        
                    </div>
                   <br/>
                   <br/>
               </div>
              
           )
       })}
       
                </div> 
       {currentUser ? 
       <div>
           <br/><br/>
       <Toast bg = 'success' id ="fade">
                <Toast.Header closeButton = { false }>
                <h2>Post Something!</h2>
                </Toast.Header>
                <Toast.Body>
       <Form onSubmit = { handleSubmitPost }>
                <Form.Group>
                    <FloatingLabel
                    label = 'Post on this Recipe'>
                         <Form.Control
                        id = 'post'
                        value = { postState }
                        placeholder = "Post on this Recipe"
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
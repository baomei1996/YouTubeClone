import Axios from 'axios'
import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import SingleComment from './SingleComment'
import ReplyComment from './ReplyComment'

function Comment(props) {

  const videoId = props.postId
  const user = useSelector(state => state.user)
  const [CommentValue, setCommentValue] = useState("")

  const handleClick = (event) => {
    setCommentValue(event.currentTarget.value)
  }

  const onSubmit = (event) => {
    event.preventDefault();
    const variables = {
      content: CommentValue,
      writer: user.userData._id,
      postId: videoId,
    }
    
    Axios.post('/api/comment/saveComment', variables)
      .then(res => {
        if(res.data.success) {
          console.log(res.data.result);
          props.refreshFunction(res.data.result)
          setCommentValue("")
        } else {
          alert('커멘트를 저장하지 못했습니다. ')
        }
      })
  }
  return (
    <div>
      <br/>
      <p>Replies</p>
      <hr/>

      {/* Comment Lists */}
      {props.commentLists && props.commentLists.map((comment, index) => (
        (!comment.responseTo &&
          <React.Fragment>
            <SingleComment refreshFunction={props.refreshFunction} postId={props.postId} comment={comment} key={index}/>
            <ReplyComment parentCommentId={comment._id} postId={videoId} commentLists={props.commentLists}/>
          </React.Fragment>
        )
      ))}
      
      {/* Root Comment Form */}

      <form style={{ display: 'flex' }} onSubmit={onSubmit}>
        <textarea
          style={{ width: '100%', borderRadius: '5px' }}
          onChange={handleClick}
          value={CommentValue}
          placeholder="코멘트를 작성해주세요"
        />
        <br/>
        <button style={{ width: '20%', height: '53px' }} onClick={onSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default Comment

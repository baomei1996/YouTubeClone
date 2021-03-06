import React, { useState } from 'react'
import { Comment, Avatar, Button, Input } from 'antd';
import Axios from 'axios';
import { useSelector } from 'react-redux'

const { TextArea } = Input;
function SingleComment(props) {
  const user = useSelector(state => state.user)
  const [OpenReply, setOpenReply] = useState(false)
  const [CommentValue, setCommentValue] = useState("")
  const onClickReplyOpen = () => {
    setOpenReply(!OpenReply)
  }
  const actions = [
    <span onClick={onClickReplyOpen} key="comment-basic-reply-to">Reply to</span>
  ]
  const handleChange = (event) => {
    setCommentValue(event.currentTarget.value)
  }
  const onSubmit= (event) => {
    event.preventDefault();
    const variables = {
      content: CommentValue,
      writer: user.userData._id,
      postId: props.postId,
      reponseTo: props.comment._id
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
      <Comment
          actions={actions}
          author={props.comment.writer.name}
          avatar={<Avatar src={props.comment.writer.image} alt/>}
          content={<p>{props.comment.content}</p>}
      />
      
      {OpenReply && 
        <form style={{ display: 'flex' }} onSubmit={onSubmit}>
          <textarea
            style={{ width: '100%', borderRadius: '5px' }}
            onChange={handleChange}
            value={CommentValue}
            placeholder="코멘트를 작성해주세요"
          />
          <br/>
          <button style={{ width: '20%', height: '53px' }} onClick={onSubmit}>Submit</button>
        </form>
      }
    </div>
  )
}

export default SingleComment

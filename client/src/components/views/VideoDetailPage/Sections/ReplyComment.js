import React, { useEffect, useState } from 'react'
import SingleComment from './SingleComment'

function ReplyComment(props) {
  const [ChildCommentNumber, setChildCommentNumber] = useState(0)
  const [OpenReplyComments, setOpenReplyComments] = useState(false)
  useEffect(() => {
    
    let commentNumber = 0;

    props.commentLists.map((comment) => {
      if(comment.responseTo === props.parentCommentId) {
        commentNumber ++;
      }
    })

    setChildCommentNumber(commentNumber)
  }, [])

  const renderReplyComment = () => 
      props.commentLists.map((comment, index) => (
        <React.Fragment>
          {comment.responseTo === props.parentCommentId && 
            <div>
               <SingleComment refreshFunction={props.refreshFunction} postId={props.postId} comment={comment} key={index}/>
               <ReplyComment parentCommentId={comment._id} commentLists={props.commentLists} postId={props.postId}/>
            </div>
          }
        </React.Fragment>
      ))

  const onHandleChange = () => {
    setOpenReplyComments(!OpenReplyComments)
  }
  return (
    <div>
      {ChildCommentNumber > 0 && 
        <p style={{ fontSize: '14px', margin: '0', color: 'gray' }} onClick={onHandleChange}>
          View {ChildCommentNumber} more comment(s)
        </p>
      }
      {OpenReplyComments &&
        renderReplyComment(props.parentCommentId)
      }
      
    </div>
  )
}

export default ReplyComment

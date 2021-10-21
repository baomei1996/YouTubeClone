import React, { useEffect, useState } from 'react'
import { Row, Col, List, Avatar } from 'antd'
import Axios from 'axios'
import SideVideo from './Sections/SideVideo'
import Subscribe from './Sections/Subscribe'

function VideoDetailPage(props) {

  const [VideoDetail, setVideoDetail] = useState([])

  const videoId = props.match.params.videoId
  const variable = { videoId: videoId }

  useEffect(() => {

    Axios.post('/api/video/getVideoDetail', variable)
        .then(res => {
          if(res.data.success) {
            setVideoDetail(res.data.videoDetail)
            console.log(res.data);
          } else {
            alert('비디오 정보를 가져오는데 실패했습니다. ')
          }
        })  
  }, [])
  if(VideoDetail.writer) {
    return (
      <Row gutter={[16, 16]}>
        <Col lg={18} xs={24}>
          <div style={{ width: '100%', padding: '3rem 4rem' }}>
            <video style={{ width: '100%' }} src={`http://localhost:5000/${VideoDetail.filePath}`} controls/>
  
            <List.Item
                actions={[<Subscribe/>]}
            >
              <List.Item.Meta
                  avatar={<Avatar src='../../../assets/image/profile.jpeg'/>}
                  title={VideoDetail.writer.name}
                  description={VideoDetail.description}
              />
            </List.Item>
  
            {/* {comment} */}
          </div>
        </Col>
        <Col lg={6} xs={24}>
          <SideVideo/>
        </Col>
      </Row>
    )
  } else {
    return <div>Loading...</div>
  }
}

export default VideoDetailPage

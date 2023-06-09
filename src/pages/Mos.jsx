import React, {useState, useEffect} from 'react'
import Card from 'react-bootstrap/Card';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

import { useAlert } from 'react-alert'

export const Mos = () => {
  const alert = useAlert()
  
  const [name, setName] = useState(null)
  const [rate1, setrate1] = useState(0)
  const [rate2, setrate2] = useState(0)
  const [rate3, setrate3] = useState(0)
  const [rate4, setrate4] = useState(0)
  const [rate5, setrate5] = useState(0)
  const [rate6, setrate6] = useState(0)
  const [totalVotes, settotalVotes] = useState(0)
  const [avgRate1, setavgRate1] = useState(0)
  const [avgRate2, setavgRate2] = useState(0)
  const [avgRate3, setavgRate3] = useState(0)
  const [avgRate4, setavgRate4] = useState(0)
  const [avgRate5, setavgRate5] = useState(0)
  const [avgRate6, setavgRate6] = useState(0)
  const [isLoading, setisLoading] = useState(false)


  useEffect(() => {
    fetch("https://whisper-backend-service.onrender.com/getData", {method: "post",}).then(res => {
        return res.json();
    })
    .then(res => {
        if (res.total_votes !== 0){
            setavgRate1(res.avgRate1)
            setavgRate2(res.avgRate2)
            setavgRate3(res.avgRate3)
            setavgRate4(res.avgRate4)
            setavgRate5(res.avgRate5)
            setavgRate6(res.avgRate6)
            settotalVotes(res.total_votes)
        }
    });
  }, [])
  


  const handleSubmit = async() => {
    setisLoading(true)
    if(name==="" || name===null || !name.replace(/\s/g, '').length){
        alert.info('Please enter your name')
    }else if(rate1===null || rate2===null || rate3===null || rate4===null || rate5===null || rate6 ===null){
        alert.info('Please rate all the audio files')
    }else{
        const data = new FormData()
        data.append("name", name)
        data.append("r1", rate1)
        data.append("r2", rate2)
        data.append("r3", rate3)
        data.append("r4", rate4)
        data.append("r5", rate5)
        data.append("r6", rate6)
        let response = await fetch('https://whisper-backend-service.onrender.com/rating',
            {
              method: 'post',
            //   headers: {
            //     'Content-Type': 'application/json'
            //   },
              body: data,
            }
        );
        let res = await response.json();
        if (res.status !== 1){

            alert.error('Oops there was a problem submiting your response. Try again later.')
          }else{

            alert.success("Thank you for rating "+name+"! Your response has been recorded.")
            alert.success("Refresh the page to see the updated votes")
        }
    }
    
    setisLoading(false)
  }

  return (
    <div style={{backgroundColor: "#B2B2B2"}}>
    <div className='container' >
        <Alert key="info" variant="info" className='mt-5'>
          Greetings! 
          This test includes <b>6 audio files</b> for you to rate.
          <br></br>
          These 6 audio files were generated by giving whisper speech signals as input.
          <br></br>
          <br></br>
          You can rate the audio's quality by answering some of the following questions
          <br></br>
          Whether the speaker's voice was <b>Audible</b>?
          <br></br>
          Were there any type of <b>Noise</b> present in the audio?
          <br></br>
          Were you able to make out what the speaker was saying?
          <br></br>
          Was the speaker's voice breaking a lot?
          <br></br>
          and so on...
          <br></br>
          <br></br>
          Please fill all the fields before submitting your response
          <br></br>
          This website will be recording your <b>name</b> and the <b>ratings</b> that you provide.
          <br></br>
          The ratings will remain <b>anonymous</b> and any information that you provide will be kept <b>confidential</b>.
          <br></br>
          <br></br>
          Go ahead and start rating!
        </Alert>

        <div className='row mt-5 mb-5 '>
            <div className='col-lg-6 col-12 '>
            
            <Badge text='light' bg="dark"><h5>Average ratings</h5></Badge>
            <Card >
              <ListGroup variant="flush">
                <ListGroup.Item className='d-flex justify-content-between'> <h5 style={{display: "inline"}}>Total Votes</h5> <Badge text='light' bg="success"><h5 style={{display: "inline"}}>{totalVotes}</h5></Badge></ListGroup.Item>
                <ListGroup.Item className='d-flex justify-content-between'> <h5 style={{display: "inline"}}>Audio 1 ({avgRate1})</h5><div></div><Rating name="size-large" value={avgRate1} size="large" readOnly precision={0.1}/></ListGroup.Item>
                <ListGroup.Item className='d-flex justify-content-between'><h5 style={{display: "inline",}}>Audio 2 ({avgRate2})</h5><Rating name="size-large" value={avgRate2} size="large" readOnly precision={0.1}/></ListGroup.Item>
                <ListGroup.Item className='d-flex justify-content-between'><h5 style={{display: "inline",}}>Audio 3 ({avgRate3})</h5><Rating name="size-large" value={avgRate3} size="large" readOnly precision={0.1}/></ListGroup.Item>
                <ListGroup.Item className='d-flex justify-content-between'><h5 style={{display: "inline",}}>Audio 4 ({avgRate4})</h5><Rating name="size-large" value={avgRate4} size="large" readOnly precision={0.1}/></ListGroup.Item>
                <ListGroup.Item className='d-flex justify-content-between'><h5 style={{display: "inline",}}>Audio 5 ({avgRate5})</h5><Rating name="size-large" value={avgRate5} size="large" readOnly precision={0.1}/></ListGroup.Item>
                <ListGroup.Item className='d-flex justify-content-between'><h5 style={{display: "inline",}}>Audio 6 ({avgRate6})</h5><Rating name="size-large" value={avgRate6} size="large" readOnly precision={0.1}/></ListGroup.Item>
                
              </ListGroup>
            </Card>
    

            </div>
        </div>
        <div className='row mt-5'>
            <div className='col-lg-6 col-12'>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Badge text='light' bg="dark"><h5>Name:</h5></Badge>
                  <Form.Control type="name" placeholder="Enter Your Name" required onChange={(e)=>{setName(e.target.value)}}/>
                </Form.Group>
            </Form>

            </div>
        </div>
        <div className='row mt-5'>
            
            <div className='col-lg-6 col-12 mb-5' >
            <Card>
                <Card.Img src="./audio1.png" alt="Card image" style={{height: "200px"}}/>
                <Card.ImgOverlay>
                    <Card.Title>Audio 1</Card.Title>
                    <Card.Text className='mb-0'>Audio File</Card.Text>
                    <Card.Text className='mb-0'>
                        <audio src="./audio1.wav" controls/>
                    </Card.Text>
                    <Card.Text className='mb-0'>
                        Leave your rating here
                    </Card.Text>
                    <Stack spacing={1}>
                      <Rating name="half-rating" defaultValue={0} size="large" onChange={(e, newValue)=>{setrate1(newValue)}}/>
                    </Stack>

                </Card.ImgOverlay>  
            </Card>
            </div>
            <div className='col-lg-6 col-12 mb-5'>
            <Card>
                <Card.Img src="./audio1.png" alt="Card image" style={{height: "200px"}}/>
                <Card.ImgOverlay>
                    <Card.Title>Audio 2</Card.Title>
                    <Card.Text className='mb-0'>Audio File</Card.Text>
                    <Card.Text className='mb-0'>
                        <audio src="./audio2.wav" controls/>
                    </Card.Text>
                    <Card.Text className='mb-0'>
                        Leave your rating here
                    </Card.Text>
                    <Stack spacing={1}>
                      <Rating name="half-rating" defaultValue={0} size="large" onChange={(e, newValue)=>{setrate2(newValue)}}/>
                    </Stack>
                    
                </Card.ImgOverlay>  
            </Card>
            </div>
            <div className='col-lg-6 col-12 mb-5'>
            <Card>
                <Card.Img src="./audio1.png" alt="Card image" style={{height: "200px"}}/>
                <Card.ImgOverlay>
                    <Card.Title>Audio 3</Card.Title>
                    <Card.Text className='mb-0'>Audio File</Card.Text>
                    <Card.Text className='mb-0'>
                        <audio src="./audio3.wav" controls/>
                    </Card.Text>
                    <Card.Text className='mb-0'>
                        Leave your rating here
                    </Card.Text>
                    <Stack spacing={1}>
                      <Rating name="half-rating" defaultValue={0} size="large" onChange={(e, newValue)=>{setrate3(newValue)}}/>
                    </Stack>
                    
                </Card.ImgOverlay>  
            </Card>
            </div>
            <div className='col-lg-6 col-12 mb-5'>
            <Card>
                <Card.Img src="./audio1.png" alt="Card image" style={{height: "200px"}}/>
                <Card.ImgOverlay>
                    <Card.Title>Audio 4</Card.Title>
                    <Card.Text className='mb-0'>Audio File</Card.Text>
                    <Card.Text className='mb-0'>
                        <audio src="./audio4.wav" controls/>
                    </Card.Text>
                    <Card.Text className='mb-0'>
                        Leave your rating here
                    </Card.Text>
                    <Stack spacing={1}>
                      <Rating name="half-rating" defaultValue={0} size="large" onChange={(e, newValue)=>{setrate4(newValue)}}/>
                    </Stack>
                    
                </Card.ImgOverlay>  
            </Card>
            </div>
            <div className='col-lg-6 col-12 mb-5'>
            <Card>
                <Card.Img src="./audio1.png" alt="Card image" style={{height: "200px"}}/>
                <Card.ImgOverlay>
                    <Card.Title>Audio 5</Card.Title>
                    <Card.Text className='mb-0'>Audio File</Card.Text>
                    <Card.Text className='mb-0'>
                        <audio src="./audio5.wav" controls/>
                    </Card.Text>
                    <Card.Text className='mb-0'>
                        Leave your rating here
                    </Card.Text>
                    <Stack spacing={1}>
                      <Rating name="half-rating" defaultValue={0} size="large" onChange={(e, newValue)=>{setrate5(newValue)}}/>
                    </Stack>
                    
                </Card.ImgOverlay>  
            </Card>
            </div>
            <div className='col-lg-6 col-12 mb-3'>
            <Card>
                <Card.Img src="./audio1.png" alt="Card image" style={{height: "200px"}}/>
                <Card.ImgOverlay>
                    <Card.Title>Audio 6</Card.Title>
                    <Card.Text className='mb-0'>Audio File</Card.Text>
                    <Card.Text className='mb-0'>
                        <audio src="./audio6.wav" controls/>
                    </Card.Text>
                    <Card.Text className='mb-0'>
                        Leave your rating here
                    </Card.Text>
                    <Stack spacing={1}>
                      <Rating name="half-rating" defaultValue={0} size="large" onChange={(e, newValue)=>{setrate6(newValue)}}/>
                    </Stack>
                    
                </Card.ImgOverlay>  
            </Card>
            </div>
            <div className="d-grid gap-2" style={{marginBottom:"100px"}}>
            {isLoading? <h6><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Please wait. Submitting your response</h6>: null}
            {rate1!==0 && rate2!==0 && rate3!==0 && rate4 !==0 && rate5!==0 && rate6!==0 && name!==null && !isLoading?
            <Button variant="success" size="lg" onClick={handleSubmit}>
                Submit Rating
            </Button> : 
            
            <Button variant="success" size="lg" disabled>
                Submit Rating
            </Button>
            }
        </div>
        </div>
        
    </div>
    </div>
  )
}

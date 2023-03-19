import React, {useState} from 'react'

import AudioReactRecorder, { RecordState } from 'audio-react-recorder'

import { useAlert } from 'react-alert'
import { Convert } from './Convert'

import {FaMicrophone, FaMicrophoneSlash} from "react-icons/fa"
import {AiOutlineCloudUpload, AiOutlineCloudDownload} from "react-icons/ai"

import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Badge from 'react-bootstrap/esm/Badge';
import './style.css';
import { Whisper } from './Whisper'

const RecordAudio = () => {

    const alert = useAlert()

    const [record, setRecord] = useState(RecordState.STOP)
    const [audioBlob, setAudioBlob] = useState(null)
    const [audioURL, setAudioURL] = useState(null)
    const [uploadStatus, setUploadStatus] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [recordStatus, setRecordStatus] = useState(false)
 
    function start() {
      setRecordStatus(true)
      setRecord(RecordState.START)
    }
   
    function stop() {
        setRecord(RecordState.STOP)
        setRecordStatus(false)
    }
   
    //audioData contains blob and blobUrl
    const onStop = (audioData) => {
      setAudioBlob(audioData.blob)
      setAudioURL(audioData.url)
    }

    const handleUpload = async(e) => {
        
        e.preventDefault()
        setIsLoading(true)
        if (audioBlob != null) {
            
            const data = new FormData();
            data.append('file', audioBlob);
            let response = await fetch('https://whisper-backend-service.onrender.com/upload',
                {
                  method: 'post',
                  body: data,
                }
            );
            let res = await response.json();

            if (res.status !== 1){
              
              alert.error('Oops there was an error uploading your file!')
            }else{
                setUploadStatus("1")
                alert.success("File uploaded successfully!")
            }
        }
        setIsLoading(false)
    };  
   
    return (
      <div className='shadow-lg p-3 mb-5 bg-white rounded'>
          <h1><Badge bg='dark'>Audio Recorder</Badge></h1>
          <div className='container'>
            <AudioReactRecorder state={record} onStop={onStop} backgroundColor="rgb(255, 255, 255)"/>
          </div>
          <div className='w-100'>
            {recordStatus? <button className='btn btn-outline-danger m-1' disabled><Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /><b>Recording ...</b></button> :<button className='btn btn-primary m-1 btn-block' onClick={()=>start()}><b><FaMicrophone/> Start Recording</b></button>}
            {recordStatus?<button className='btn btn-danger m-1' onClick={()=>stop()}><b><FaMicrophoneSlash/> Stop Recording</b></button>: <button className='btn btn-danger m-1 disabled'><b><FaMicrophoneSlash/> Stop Recording</b></button>}
          </div>
          {audioURL ? (
      			<div className="d-grid gap-2 shadow-sm p-3 mb-5 bg-white rounded">
      				<h5 className='text-justify'><Badge bg="light" text='dark'>Recorded Audio File:</Badge></h5>
              <audio src={audioURL} controls></audio>
      				<h5>
                <Badge pill bg="light" text="dark">
                  <a download href={audioURL}>
      		    			Download Recording
      		    		</a> <AiOutlineCloudDownload size={28}/>
                </Badge>
              </h5>
              {isLoading ?<Button variant='outline-primary' disabled><Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /><b>Loading ...</b></Button>: <Button onClick={handleUpload}><b><AiOutlineCloudUpload size={28}/> Upload</b></Button>}
      			</div>
      		) : null}
            {uploadStatus ? <Whisper /> : null}
      </div>
    )
}

export default RecordAudio
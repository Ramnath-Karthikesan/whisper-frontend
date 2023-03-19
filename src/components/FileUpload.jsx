import React, {useState} from 'react'
import { useAlert } from 'react-alert'
import { Convert } from './Convert'

import {AiOutlineCloudUpload, AiOutlineCloudDownload} from "react-icons/ai"

import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import { Whisper } from './Whisper';

export const FileUpload = () => {
    
    const alert = useAlert()

    const [file, setFile] = useState(null)
    const [audioURL, setAudioURL] = useState(null)
    const [uploadStatus, setUploadStatus] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) =>{
        setFile(e.target.files[0])
        setAudioURL(URL.createObjectURL(e.target.files[0]))
    }

    const handleUpload = async(e) => {
        setIsLoading(true)
        e.preventDefault()
        if(file !== null){
            const data = new FormData();
            data.append('file', file);
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
    }

    return (
      <div className='shadow-lg p-3 mb-5 bg-white rounded' >        
            <h1><Badge bg='dark'>File Uploader</Badge></h1>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label><Badge bg="light" text='dark'>Choose your audio file</Badge></Form.Label>
                <Form.Control type="file" onChange={handleChange} accept=".wav" />
            </Form.Group>
            {audioURL ? <div className='d-grid gap-2 shadow-sm p-3 mb-5 bg-white rounded'>
                    <h5 className='text-justify'><Badge bg="light" text='dark'>Your Audio File:</Badge></h5>
                    <div className="audio-player">
      		    		<audio src={audioURL} controls></audio>
                        <br></br>
      		    		<h5><Badge pill bg="light" text='dark'><a download href={audioURL}>
      		    			Download Recording
      		    		</a> <AiOutlineCloudDownload size={28}/></Badge></h5>
                    </div>
                    {file ? isLoading ?<Button variant='outline-primary' className='btn-block' disabled><Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />Loading ...</Button>: <Button onClick={handleUpload}><AiOutlineCloudUpload size={28}/><b> Upload</b></Button>  : null}
            </div> : null}
            
            
            {uploadStatus ? <Whisper /> : null}
      </div>
    )
}

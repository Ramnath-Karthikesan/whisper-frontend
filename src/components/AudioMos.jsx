import React from 'react'
import Card from 'react-bootstrap/Card';

export const AudioMos = () => {
  return (
    <Card>
      <Card.Header>Audio 1</Card.Header>
      <Card.Body>
        <Card.Title>Special title treatment</Card.Title>
        <Card.Text>
            <audio src="./audio1.wav" controls/>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

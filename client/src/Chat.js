import React, { useState } from 'react'

const Chat = (props) => {
  const { socket, username, room } = props  
  const [currentMessage, setCurrentMessage] = useState("")

  const sendMessage = () => {
    if (currentMessage !== "") {

    }
  }

  return (
    <div>
        <div className="chat-header">
            <p>Live Chat</p>
        </div>
        <div className="chat-body"></div>
        <div className="chat-footer">
            <input 
                type="text" 
                placeholder="Hi..." 
                onChange={(e) => {
                    setCurrentMessage(e.target.value)
                }}
            />
            <button onClick={sendMessage}>&#9658;</button>
        </div>
    </div>
  )
}

export default Chat
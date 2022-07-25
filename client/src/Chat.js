import React, { useState, useEffect } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'

const Chat = (props) => {
  const { socket, username, room } = props  
  const [currentMessage, setCurrentMessage] = useState("")
  const [messageList, setMessageList] = useState([])

  const sendMessage = async () => {
    if (currentMessage !== "") {
        const messageData = {
            room,
            author: username,
            message: currentMessage,
            time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
        }
        await socket.emit('send_message', messageData);
        setMessageList((list) => [...list, messageData])
        setCurrentMessage("")
    }
  }

  useEffect(() => {
    const handler = (data) => {
        setMessageList((list) => [...list, data])
    };
    socket.on('receive_message', handler)
    return () => socket.off('receive_message', handler);
  }, [])
  

  return (
    <div className="chat-window">
        <div className="chat-header">
            <p>Live Chat</p>
        </div>
        <div className="chat-body">
            <ScrollToBottom className="message-container">
                {messageList.map((messageContent) => {
                    return (
                        <div 
                            className="message"
                            id={username !== messageContent.author ? "you" : "other"}
                            >
                            <div>
                                <div className="message-content">
                                    <p>{messageContent.message}</p>
                                </div>
                                <div className="message-meta">
                                    <p id="time">{messageContent.time}</p>
                                    <p id="author">{messageContent.author}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </ScrollToBottom>
        </div>
        <div className="chat-footer">
            <input 
                type="text" 
                value={currentMessage}
                placeholder="Hi..." 
                onChange={(e) => {
                    setCurrentMessage(e.target.value)
                }}
                onKeyPress={(e) => {
                    e.key === "Enter" && sendMessage()
                }}
            />
            <button onClick={sendMessage}>&#9658;</button>
        </div>
    </div>
  )
}

export default Chat
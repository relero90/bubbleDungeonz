
import "./ChatWindow.css";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import auth from "../../utils/auth";
import { useExistingUserContext } from "../../utils/existingUserContext";
import { GET_CHANNEL_MESSAGES } from "../../utils/queries";


export default function ChatWindow(props){

    const [messages,setMessages] = useState([]);
    const [channelId,setChannelId] = useState(props.channelId);
    const {loading,data} = useQuery(GET_CHANNEL_MESSAGES,{variables:{channelId}});
    const channels = data?.channelMessages || [];
    console.log(channels.messages);

    function parseLinkInText(text){
        let validLink = new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?([^ ])+")
        if(validLink.test(text)){
            let linkMatches = text.match(validLink);
            let beforeAndAfterLink = text.split(linkMatches[0]);
            console.log(beforeAndAfterLink);
            return <span>{beforeAndAfterLink[0]}<a href={linkMatches[0]}>{linkMatches[0]}</a>{parseLinkInText(beforeAndAfterLink[1])}</span>;
        }else{
            return <span>{text}</span>;
        }
    
    }
    function chatListItems(messages){
        console.log(messages);
        if(loading){
            return <p>loading</p>
        }else{
            return messages.map((message) => {
                return <li key={message._id}>{message.username}: {parseLinkInText(message.messageText)}</li>
              }
            )
        }
        
    }
    return (
        <div>
            <h1>{props.name}</h1>
            <div className='scrollable-div'>
              <a className='loadMore'>Load Older Messages</a>
              <ul>
                  {chatListItems(channels.messages)}
              </ul>
            </div>
        </div>
    );

}
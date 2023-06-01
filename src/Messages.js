import * as React from 'react';
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Collapse, Container, Divider, Icon, IconButton, LinearProgress, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Paper, Stack, Tooltip, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { TransitionGroup } from 'react-transition-group';

export default function Messages({ messages, setMessages, time }) {

  const ref = React.useRef(null);
  const [myTime, setMyTime] = React.useState(null);
  const [myMessages, setMyMessages] = React.useState([]);

  const handleRemove = (index) => {
    let M = messages;
    M.splice(index, 1);
    setMessages(M);
    setMyTime(time);
  }

  const scrollToBottom = () => {
    ref.current.scrollIntoView({ behavior: 'auto' });
  }

  React.useEffect(() => {
    let upd = messages.length !== myMessages.length;
    if (messages.length < myMessages.length) {
      setMyMessages(messages);
      return;
    }
    if (!upd) {
      for(let i=0; i<messages.length; i++){
        upd |= messages[i] !== myMessages[i];
      }
    }
    if (upd) {
      setMyTime(time);
      setMyMessages(messages);
    }

  }, [messages, myMessages, myTime, time]);
  React.useEffect(() => {
    if (time - myTime < 7) {
      scrollToBottom();
    }
  }, [time, myTime]);

  return (
    <div id='pls-scroll' style={{maxHeight: 500, overflow: 'auto'}}>
      <List>
        <TransitionGroup>
          
          {messages.map((m, index) => (
            <Collapse key={index}>
              <Divider />
              <ListItem
                secondaryAction={
                  <IconButton
                    edge='end'
                    onClick={() => handleRemove(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={m} />
              </ListItem>
              <Divider />
            </Collapse>
          ))}
        </TransitionGroup>
      </List>
      <div ref={ref} />
    </div>
  )
}
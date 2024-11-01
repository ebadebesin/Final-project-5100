import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TopBar from './TopBar'
import { Container,Rating } from '@mui/material';

function HistoryItem({cover,title,date,rate}){
    return (
    <ListItem alignItems="flex-start" >
        <ListItemAvatar>
            <Avatar alt="Remy Sharp" variant="square" src={cover}  sx={{ width: 40, height: 40 }} />
        </ListItemAvatar>
        <ListItemText
            primary={title}
            secondary={
                <>
                <Rating name="half-rating-read" defaultValue={rate} precision={0.5} readOnly />
                <span style={{display:"block", float:"right",padding:4, marginRight:4}}>
                {date}
                </span>
                </>
            }
        />
    </ListItem>)
}



export default function ArticleHistory() {
  return (  <>
       <TopBar title="History"/>
        <Container>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper',}}>
        <HistoryItem
            cover="https://media.cnn.com/api/v1/images/stellar/prod/thumb-20241031033549669.jpg?c=9x9&q=h_100,w_100,c_fill"
            title="MAGA activists emerge with a plan..."
            date="2024-10-31"
            rate="2.5"
        />
        <Divider component="li" />        
        <HistoryItem
            cover="https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-2155662640-20240718021317945.jpg?c=9x9&q=h_100,w_100,c_fill"
            title="Trump continues his tradition of..."
            date="2024-10-30"
            rate="3"
        />
        <Divider component="li" />        
        <HistoryItem
            cover="https://media.cnn.com/api/v1/images/stellar/prod/20230223-111719.jpg?c=9x9&q=h_100,w_100,c_fill"
            title="Israel at ‘high level of readiness’ ..."
            date="2024-10-29"
            rate="4"
        />
        <Divider component="li" />        
        <HistoryItem
            cover="https://media.cnn.com/api/v1/images/stellar/prod/daren-christopher-abbey.jpeg?c=1x1&q=h_100,w_100,c_fill"
            title="North Korea says it conducted new..."
            date="2024-10-28"
            rate="2"
        />
        <Divider component="li" />        
        <HistoryItem
            cover="https://media.cnn.com/api/v1/images/stellar/prod/01-gettyimages-1957228062.jpg?c=1x1&q=h_100,w_100,c_fill"
            title="China’s watching the US election –..."
            date="2024-10-27"
            rate="1"
        />
        <Divider component="li" />        
        <HistoryItem
            cover="https://media.cnn.com/api/v1/images/stellar/prod/10302024-american-battleground-part-three-gfx-final.jpg?c=1x1&q=h_100,w_100,c_fill"
            title="Spain hit by deadliest floods in ..."
            date="2024-10-26"
            rate="5"
        />
        <Divider component="li" />        
        <HistoryItem
            cover="https://media.cnn.com/api/v1/images/stellar/prod/still-tj-and-donna.jpg?c=1x1&q=h_100,w_100,c_fill"
            title="Five killed, 22 injured in terror ..."
            date="2024-10-25"
            rate="2.5"
        />
        <Divider component="li" />        
        <HistoryItem
            cover="https://media.cnn.com/api/v1/images/stellar/prod/2024-10-26t122532z-8799325-rc2asaa55x60-rtrmadp-3-israel-palestinians-gaza-jabalia.JPG?c=1x1&q=h_100,w_100,c_fill"
            title="German-Iranian national and long..."
            date="2024-10-24"
            rate="2.5"
        />
        <HistoryItem
            cover="https://media.cnn.com/api/v1/images/stellar/prod/thumb-20241031033549669.jpg?c=9x9&q=h_100,w_100,c_fill"
            title="MAGA activists emerge with a plan..."
            date="2024-10-31"
            rate="2.5"
        />
        <Divider component="li" />
        <HistoryItem
            cover="https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-2155662640-20240718021317945.jpg?c=9x9&q=h_100,w_100,c_fill"
            title="Trump continues his tradition of..."
            date="2024-10-30"
            rate="3"
        />
        <Divider component="li" /> 
        <HistoryItem
            cover="https://media.cnn.com/api/v1/images/stellar/prod/20230223-111719.jpg?c=9x9&q=h_100,w_100,c_fill"
            title="Israel at ‘high level of readiness’ ..."
            date="2024-10-29"
            rate="4"
        />
        </List>
        </Container>
    </>
  );
}

import { Box, Button,Chip, Container, Stack } from '@mui/material';
import * as React from 'react';
import SendIcon from '@mui/icons-material/Send';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import StarIcon from '@mui/icons-material/Star';
import TopBar from './Components/TopBar'
import { Link } from "react-router-dom";

export default function Today() {
        return  <>
            <TopBar title="Today">
              <Stack direction="row" spacing={1}>
                <Chip icon={<WhatshotIcon />} label="152" color="primary" size="small" />
                <Chip icon={<StarIcon />} label="226" color="success" size="small" />
              </Stack>
            </TopBar>
            <Container>
                <article>
                    <h1>MAGA activists emerge with a plan to undermine election results</h1>
                    <img src='https://media.cnn.com/api/v1/images/stellar/prod/thumb-20241031033549669.jpg?c=16x9&q=h_540,w_960,c_fill' width={"100%"}></img>
                    <p>CNN — Before Election Day has even arrived, the “Stop the Steal” movement has reemerged in force, with some of the same activists who tried to overturn former President Donald Trump’s 2020 loss outlining a step-by-step guide to undermine the results if he falls short again.</p>
                    <p>For months, those activists – who have been priming Trump supporters to believe the only way the former president can lose in 2024 is through fraud – have laid out proposals to thwart a potential Kamala Harris victory. Their plans include challenging results in court, pressuring</p>
                </article>
                <Stack 
                    direction="row" 
                    spacing={2}   
                    sx={{
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    <Box>
                    </Box>
                    <Box>
                        <Button variant="contained" component={Link} to="/summary" endIcon={<SendIcon />}>
                        Try Summarize
                        </Button>
                    </Box>
                </Stack>
            </Container>
        </>
            
  }
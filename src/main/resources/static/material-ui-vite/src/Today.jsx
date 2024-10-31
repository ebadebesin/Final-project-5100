import { Box, Button, Container, Stack } from '@mui/material';
import * as React from 'react';
import SendIcon from '@mui/icons-material/Send';

export default function Today() {
        return  <>
            <article>
                <h1>MAGA activists emerge with a plan to undermine election results</h1>
                <img src='https://media.cnn.com/api/v1/images/stellar/prod/thumb-20241031033549669.jpg?c=16x9&q=h_540,w_960,c_fill' width={"100%"}></img>
                <p>CNN — Before Election Day has even arrived, the “Stop the Steal” movement has reemerged in force, with some of the same activists who tried to overturn former President Donald Trump’s 2020 loss outlining a step-by-step guide to undermine the results if he falls short again.</p>
                <p>For months, those activists – who have been priming Trump supporters to believe the only way the former president can lose in 2024 is through fraud – have laid out proposals to thwart a potential Kamala Harris victory. Their plans include challenging results in court, pressuring lawmakers to block election certification, and encouraging protests – culminating on January 6, 2025, the day Congress will once again certify the results.</p>
                <p>“I have a plan and strategy,” Ivan Raiklin, a former Green Beret and political operative who has close ties to associates of Trump, told a group of Pennsylvania activists earlier this month. “And then January 6th is going to be pretty fun.”</p>
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
                    <Button variant="contained" endIcon={<SendIcon />}>
                    Try Summarize
                    </Button>
                </Box>
            </Stack>
        </>
            
  }
import { Box, Chip, Container, Divider, Stack } from '@mui/material';
import * as React from 'react';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import StarIcon from '@mui/icons-material/Star';

export default function TopBar() {
        return <>
        <Container>
          <Stack
              direction="row"
              spacing={2}
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop:2,
                paddingBottom:1,
                width:"100%"
              }}
            >
              <Box sx={{fontSize: 28 ,
                  fontWeight: 'bold',
              }}>
                Today
              </Box>

              <Stack direction="row" spacing={1}>
                <Chip icon={<WhatshotIcon />} label="152" color="primary" size="small" />
                <Chip icon={<StarIcon />} label="226" color="success" size="small" />
              </Stack>
          </Stack>
          </Container>
          <Divider></Divider>
        </>
            
  }
// import React from "react";
// import { Link } from "react-router-dom";
// import {styled ,Box, Grid, Paper} from '@mui/material'

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));


// const NotFound = () => {
//   return (
//     <>
//       <Box>
//         <Grid container spacing={2}>
//           <Grid item xs={8} >
//             <Item>Hi</Item>
//           </Grid>
//           <Grid item xs={4}>
//             <Item>Hi</Item>
//           </Grid>
//         </Grid>
//       </Box>
//       {/* <section className="page notfound">
//         <div className="content">
//           <img src="/notfound.png" alt="notfound" />
//           <Link to={"/"}>RETURN TO HOME PAGE</Link>
//         </div>
//       </section> */}
//     </>
//   );
// };

// export default NotFound;

import * as React from 'react';
import {Box, Card, CardActions, CardMedia, Button, Grid, Container} from '@mui/material'
import {Link} from 'react-router-dom';

export default function NotFound() {
  return (
    <Grid container display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
      <Grid item>
      <img src='/notfound.png' alt='notfound_image'></img>
      </Grid>
      <Grid item>
      <Button variant='outlined' className='marginauto'><Link className='link-rmlink' to={'/'}>Return to Home</Link></Button>
      </Grid>

    
    </Grid>
    
  );
}

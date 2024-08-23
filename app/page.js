'use client'
import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import Head from 'next/head';
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Box, Button, Container, Grid, Toolbar, Typography, useMediaQuery, useTheme, IconButton } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Fade, Slide } from '@mui/material';
import { useEffect, useState } from 'react';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks.js';
import CreateIcon from '@mui/icons-material/Create';
import InsightsIcon from '@mui/icons-material/Insights';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';


export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [checked, setChecked] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    setChecked(true);
  }, []);
const handleHover = (message) => {
  setSnackbarMessage(message);
  setOpenSnackbar(true);
  };
   const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = async (plan) => {
    const checkoutSession = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'origin': 'http://localhost:3000',
      },
      body: JSON.stringify({ plan }),
    });

    const checkoutSessionJson = await checkoutSession.json();

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

    if (error) {
      console.warn(error.message);
    }
  }

  const customTheme = createTheme({
    
    palette: {
      
      primary: {
        
        main: '#B57EDC',
      },
      secondary: {
        main: '#FF6584',
      },
      text: {
        primary: '#FFFFFF',
        secondary: '#FFFFFF',
      },
       background: {
            default: '#000000', 
        },
    },
    typography: {
      fontFamily: 'Inter, sans-serif',
    },
  });
  

  return (
    <ThemeProvider theme={customTheme} >
      <Head>
        <title c>FlashCard</title>
        <meta name="description" content="Create flashcards from your text" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        {/* <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" /> */}
      </Head>

      <AppBar position="static" color="transparent" elevation={0} >
        <Toolbar>
          <IconButton edge="start" color="primary" aria-label="logo" href="/">
            <LibraryBooksIcon fontSize="large" />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700, color: '#333' }}>
            FlashCards
          </Typography>
          <SignedOut>
            <Button color="primary" variant="contained" href="/sign-in" sx={{ marginRight: 2 }}>Login</Button>
            <Button color="primary" variant="contained" href="/sign-up">Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 8,backgroundImage: 'url(/bg.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }} >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
              <Box>
                <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 900, color: "white" }}>
                  Welcome to FlashCards AI
                </Typography>
                <Typography variant="h5" color="textSecondary" paragraph>
                  Create your own flashcards from text and save for future.
                </Typography>
                <Button variant="contained" color="primary" size="large" href="/generate" sx={{ mt: 2, transition: 'all 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
                  Lets Start
                </Button>
              </Box>
            </Slide>
          </Grid>
          <Grid item xs={12} md={6}>
            <Fade in={checked} timeout={1000}>
              <Box sx={{ textAlign: 'center' }}>
                <Image src="/robot-flashcard.jpg" alt="Flashcards Illustration" width={isMobile ? 300 : 500} height={isMobile ? 300 : 500} />
              </Box>
            </Fade>
          </Grid>
        </Grid>

        {/* <Box sx={{ my: 10 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700 }}>
            Features
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center', p: 3 }}>
                <TextFieldsIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="h6" gutterBottom>Easy Text Input</Typography>
                <Typography color="textSecondary">
                  Simply type or paste your text and let our software do the rest. Creating flashcards has never been easier.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center', p: 3 }}>
                <AutoAwesomeIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="h6" gutterBottom>Smart Flashcards</Typography>
                <Typography color="textSecondary">
                  Our AI intelligently breaks down your text into concise flashcards. Perfect for efficient studying.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center', p: 3 }}>
                <DevicesIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="h6" gutterBottom>Accessible Anywhere</Typography>
                <Typography color="textSecondary">
                  Access your flashcards from any device, at any time. Study on the go with ease and flexibility.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ my: 10 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700 }}>
            Pricing
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Fade in={checked} timeout={1500}>
                <Box sx={{
                  p: 4,
                  border: '1px solid',
                  borderColor: 'grey.300',
                  borderRadius: 2,
                  textAlign: 'center',
                  transition: 'all 0.3s',
                  '&:hover': {
                    boxShadow: 4,
                    transform: 'scale(1.05)',
                  },
                }}>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>Basic</Typography>
                  <Typography variant="h6" gutterBottom>$5 / month</Typography>
                  <Typography color="textSecondary" paragraph>
                    Access to basic flashcard features and limited storage.
                  </Typography>
                  <Button variant="outlined" color="primary" size="large" sx={{ mt: 2 }} onClick={() => handleSubmit('basic')}>Choose Basic</Button>
                </Box>
              </Fade>
            </Grid>
            <Grid item xs={12} md={4}>
              <Fade in={checked} timeout={2000}>
                <Box sx={{
                  p: 4,
                  border: '2px solid',
                  borderColor: 'primary.main',
                  borderRadius: 2,
                  textAlign: 'center',
                  backgroundColor: 'primary.light',
                  transition: 'all 0.3s',
                  '&:hover': {
                    boxShadow: 4,
                    transform: 'scale(1.05)',
                  },
                }}>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>Pro</Typography>
                  <Typography variant="h6" gutterBottom>$10 / month</Typography>
                  <Typography color="textSecondary" paragraph>
                    Unlimited flashcards and storage, with priority support.
                  </Typography>
                  <Button variant="contained" color="secondary" size="large" sx={{ mt: 2 }} onClick={() => handleSubmit('pro')}>Choose Pro</Button>
                </Box>
              </Fade>
            </Grid>
          </Grid>
        </Box> */}
        <Box sx={{ my: 10 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700 }}>
            Features
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid item xs={12} md={4}>
              <Box 
                sx={{ 
                  textAlign: 'center', p: 3, transition: 'all 0.3s', 
                  '&:hover': { boxShadow: 4, transform: 'scale(1.05)', cursor: 'pointer' }
                }}
                onMouseEnter={() => handleHover("Effortless Text Input")}
              >
                <CreateIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="h6" gutterBottom>Effortless Text Input</Typography>
                <Typography color="textSecondary">
                  Type or paste your text and let us transform it into effective flashcards. The simplest way to study.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box 
                sx={{ 
                  textAlign: 'center', p: 3, transition: 'all 0.3s', 
                  '&:hover': { boxShadow: 4, transform: 'scale(1.05)', cursor: 'pointer' }
                }}
                onMouseEnter={() => handleHover("Intelligent Flashcards")}
              >
                <InsightsIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="h6" gutterBottom>Intelligent Flashcards</Typography>
                <Typography color="textSecondary">
                  Our AI smartly breaks down content, creating flashcards that boost your learning and retention.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box 
                sx={{ 
                  textAlign: 'center', p: 3, transition: 'all 0.3s', 
                  '&:hover': { boxShadow: 4, transform: 'scale(1.05)', cursor: 'pointer' }
                }}
                onMouseEnter={() => handleHover("Sync Across Devices")}
              >
                <CloudSyncIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="h6" gutterBottom>Sync Across Devices</Typography>
                <Typography color="textSecondary">
                  Access and review your flashcards on any device, whenever you need. Perfect for learning on the go.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ my: 10 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700 }}>
            Pricing
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Fade in={checked} timeout={1500}>
                <Box sx={{
                  p: 4,
                  border: '1px solid',
                  borderColor: 'grey.300',
                  borderRadius: 2,
                  textAlign: 'center',
                  transition: 'all 0.3s',
                  '&:hover': {
                    boxShadow: 4,
                    transform: 'scale(1.05)',
                  },
                }}>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>Basic</Typography>
                  <Typography variant="h6" gutterBottom>$5/ month</Typography>
                  <Typography color="textSecondary" paragraph>
                    Essential features for individual use. Create and manage your flashcards with ease.
                  </Typography>
                  <Button variant="contained" color="primary" onClick={() => handleSubmit('basic')}>Choose Plan</Button>
                </Box>
              </Fade>
            </Grid>
            <Grid item xs={12} md={4}>
              <Fade in={checked} timeout={1500}>
                <Box sx={{
                  p: 4,
                  border: '1px solid',
                  borderColor: 'grey.300',
                  borderRadius: 2,
                  textAlign: 'center',
                  transition: 'all 0.3s',
                  '&:hover': {
                    boxShadow: 4,
                    transform: 'scale(1.05)',
                  },
                }}>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>Pro</Typography>
                  <Typography variant="h6" gutterBottom>$49 / month</Typography>
                  <Typography color="textSecondary" paragraph>
                    Advanced features with priority support. Ideal for power users and teams.
                  </Typography>
                  <Button variant="contained" color="primary" onClick={() => handleSubmit('pro')}>Choose Plan</Button>
                </Box>
              </Fade>
            </Grid>
            <Grid item xs={12} md={4}>
              <Fade in={checked} timeout={1500}>
                <Box sx={{
                  p: 4,
                  border: '1px solid',
                  borderColor: 'grey.300',
                  borderRadius: 2,
                  textAlign: 'center',
                  transition: 'all 0.3s',
                  '&:hover': {
                    boxShadow: 4,
                    transform: 'scale(1.05)',
                  },
                }}>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>Enterprise</Typography>
                  <Typography variant="h6" gutterBottom>$99 / month</Typography>
                  <Typography color="textSecondary" paragraph>
                    Custom solutions for large teams and enterprises. Contact us for more details.
                  </Typography>
                  <Button variant="contained" color="primary" onClick={() => handleSubmit('enterprise')}>Contact Us</Button>
                </Box>
              </Fade>
            </Grid>
          </Grid>
        </Box>

        {/* <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message={snackbarMessage}
          action={
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }></Snackbar>
        {openSnackbar && (
  <Snackbar
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    open={openSnackbar}
    autoHideDuration={3000}
    onClose={() => setOpenSnackbar(false)}
    message={snackbarMessage}
    action={
      <IconButton size="small" aria-label="close" color="inherit" onClick={() => setOpenSnackbar(false)}>
        <CloseIcon fontSize="small" />
      </IconButton>
    }
  />
)} */}

        
      </Container>
       <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />

      <Box sx={{ py: 4, backgroundColor: 'black' }}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="textSecondary" align="center">
            © {new Date().getFullYear()} FlashCards AI.All rights reserved.
          </Typography>
        </Container>
      </Box>
    </ThemeProvider>
  )
}
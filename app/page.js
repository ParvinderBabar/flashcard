'use client'
import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import Head from 'next/head';
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Box, Button, Container, Grid, Toolbar, Typography, useMediaQuery, useTheme, IconButton, Snackbar } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Fade, Slide } from '@mui/material';
import { useEffect, useState } from 'react';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import CreateIcon from '@mui/icons-material/Create';
import InsightsIcon from '@mui/icons-material/Insights';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import CloseIcon from '@mui/icons-material/Close';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [checked, setChecked] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    setChecked(true);
  }, []);

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
    },
    typography: {
      fontFamily: 'Inter, sans-serif',
    },
  });

  const handleHover = (featureName) => {
    setSnackbarMessage(featureName);
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Head>
        <title >FlashCard</title>
        <meta name="description" content="Create flashcards from your text" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        {/* <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" /> */}
      </Head>

      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <IconButton edge="start" color="primary" aria-label="logo" href="/">
           
             <LibraryBooksIcon fontSize="large"  />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700, color: '#FFFFFF' }}>
            FlashCards
          </Typography>
          <SignedOut>
            <Button color="#FFFFFF" variant="contained" href="/sign-in" sx={{ marginRight: 2 }}>Login</Button>
            <Button color="primary" variant="contained" href="/sign-up">Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 8, backgroundImage: 'url(/bg.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh'  }}>
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
                  <Typography variant="h6" gutterBottom>$5 / month</Typography>
                  <Typography color="textSecondary" paragraph>
                    Access to basic flashcard features and limited storage.
                  </Typography>
                  <Button variant="outlined" color="primary" size="large" sx={{ mt: 2 }} onClick={() => handleSubmit('basic')}>
                    Get Started
                  </Button>
                </Box>
              </Fade>
            </Grid>
            <Grid item xs={12} md={4}>
              <Fade in={checked} timeout={2000}>
                <Box sx={{
                  p: 4,
                  border: '1px solid',
                  borderColor: 'primary.main',
                  borderRadius: 2,
                  textAlign: 'center',
                  transition: 'all 0.3s',
                  '&:hover': {
                    boxShadow: 4,
                    transform: 'scale(1.05)',
                  },
                }}>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>Premium</Typography>
                  <Typography variant="h6" gutterBottom>$15 / month</Typography>
                  <Typography color="textSecondary" paragraph>
                    Unlock all features, including advanced AI capabilities and unlimited storage.
                  </Typography>
                  <Button variant="contained" color="primary" size="large" sx={{ mt: 2 }} onClick={() => handleSubmit('premium')}>
                    Get Started
                  </Button>
                </Box>
              </Fade>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </ThemeProvider>
  );
}
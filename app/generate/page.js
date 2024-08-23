"use client"
import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import Head from 'next/head';
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Paper,
    Grid,
    Card,
    CardActionArea,
    CardContent,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    CircularProgress,
    AppBar,
    Toolbar,
    IconButton,
} from '@mui/material'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'
import { collection, doc, getDoc, writeBatch } from 'firebase/firestore';
import { db } from '@/firebase';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks.js';

const theme = createTheme({
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

const CustomCard = styled(Card)(({ theme }) => ({
    borderRadius: '10px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    width: '300px',  // Fixed width
    height: '300px', // Fixed height
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 12px 36px rgba(0, 0, 0, 0.2)',
    },
}));

const GradientButton = styled(Button)(({ theme }) => ({
    background: 'linear-gradient(90deg, #B57EDC, #8A7FF0)',
    '&:hover': {
        background: 'linear-gradient(90deg, #B57EDC, #8A7FF0)',
    },
}));

// const FlashcardSide = styled(Box)(({ theme }) => ({
//     backgroundColor: '#B57EDC',
//     width: '280px',  // Fixed width
//     height: '280x', // Fixed height
//     color: 'white',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     // width: '100%',
//     // height: '100%',
//     borderRadius: '8px',
//     // overflow: 'hidden',
//     textAlign: 'center',
//     padding: theme.spacing(2),
// }));
const FlashcardSide = styled(Box)(({ theme }) => ({
    backgroundColor: '#B57EDC',
    width: '240px',  // Match CustomCard width
    height: '200px', // Match CustomCard height
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '8px',
    textAlign: 'center',
    padding: theme.spacing(2),
}));

export default function Generate() {
    const [text, setText] = useState('')
    const [flashcards, setFlashcards] = useState([])
    const { isLoaded, isSignedIn, user } = useUser()
    const [setName, setSetName] = useState('')
    const [dialogOpen, setDialogOpen] = useState(false)
    const [flipped, setFlipped] = useState([])
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.push('/sign-in')
        }
    }, [isLoaded, isSignedIn, router])

    if (!isLoaded || !isSignedIn) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        )
    }

    const handleSubmit = async () => {
        if (!text.trim()) {
            alert('Enter text to generate Flashcards')
            return
        }

        setLoading(true)

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                body: text,
            })

            if (!response.ok) {
                throw new Error('Failed to generate flashcards')
            }

            const data = await response.json()
            setFlashcards(data)
        } catch (error) {
            console.error('Error generating flashcards:', error)
            alert('An error occurred while generating flashcards. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id]
        }))
    }

    const handleOpenDialog = () => setDialogOpen(true)
    const handleCloseDialog = () => setDialogOpen(false)

    const saveFlashcards = async () => {
        if (!setName.trim()) {
            alert('Please enter a name for your flashcard set.')
            return
        }

        try {
            const userDocRef = doc(collection(db, 'users'), user.id)
            const userDocSnap = await getDoc(userDocRef)

            const batch = writeBatch(db)

            if (userDocSnap.exists()) {
                const userData = userDocSnap.data()
                const updatedSets = [...(userData.flashcardSets || []), { name: setName }]
                batch.update(userDocRef, { flashcardSets: updatedSets })
            } else {
                batch.set(userDocRef, { flashcardSets: [{ name: setName }] })
            }

            const setDocRef = doc(collection(userDocRef, 'flashcardSets'), setName)
            batch.set(setDocRef, { flashcards })

            await batch.commit()

            alert('Flashcards saved successfully!')
            handleCloseDialog()
            setSetName('')
            router.push(`/flashcards`);
        } catch (error) {
            console.error('Error saving flashcards:', error)
            alert('An error occurred while saving flashcards. Please try again.')
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Head>
                <title>FlashCard</title>
                <meta name="description" content="Create flashcards from your text" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
            </Head>

            <AppBar position="static" color="transparent" elevation={0}>
                <Toolbar>
                    {/* Logo */}
                    <IconButton edge="start" color="primary" aria-label="logo" href="/">
                        <LibraryBooksIcon fontSize="large" />
                    </IconButton>

                    {/* Title */}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700, color: '#333' }}>
                        FlashCards
                    </Typography>

                    <Button color="primary" variant="text" href="/flashcards" sx={{ marginRight: 2 }}>Saved Flashcards</Button>
                </Toolbar>
            </AppBar>

            <Box sx={{ 
                minHeight: '100vh', 
                backgroundImage: 'url(/bg.jpeg)', 
                backgroundSize: 'cover', 
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Container maxWidth="lg" sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
                    <Box sx={{ mt: 4, mb: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, color: 'white' }}>
                            Generate Flashcards
                        </Typography>
                        <Paper sx={{ p: 4, width: '100%', background: 'black', borderRadius: '16px' }}>
                            <TextField
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                label="Enter text"
                                fullWidth
                                multiline
                                rows={4}
                                variant="outlined"
                                sx={{ mb: 2 }}
                            />
                            <GradientButton
                                variant="contained"
                                onClick={handleSubmit}
                                fullWidth
                                disabled={loading}
                            >
                                Generate Flashcards
                            </GradientButton>
                        </Paper>
                    </Box>

                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                            <CircularProgress />
                        </Box>
                    ) : flashcards.length > 0 ? (
                        <Box sx={{ mt: 4, width: '100%' }}>
                            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
                                Generated Flashcards
                            </Typography>
                            <Grid container spacing={3} justifyContent="center">
                                {flashcards.map((flashcard, index) => (
                                    <Grid item key={index}>
                                        <CustomCard>
                                            <CardActionArea onClick={() => handleCardClick(index)}>
                                                <CardContent>
                                                    {flipped[index] ? (
                                                        <FlashcardSide>
                                                            <Typography variant="h6">{flashcard.back}</Typography>
                                                        </FlashcardSide>
                                                    ) : (
                                                        <FlashcardSide>
                                                            <Typography variant="h6">{flashcard.front}</Typography>
                                                        </FlashcardSide>
                                                    )}
                                                </CardContent>
                                            </CardActionArea>
                                        </CustomCard>
                                    </Grid>
                                ))}
                            </Grid>
                            <Box sx={{ mt: 4 }}>
                                <GradientButton
                                    variant="contained"
                                    onClick={handleOpenDialog}
                                    fullWidth
                                >
                                    Save Flashcards
                                </GradientButton>
                            </Box>
                        </Box>
                    ) : null}
                </Container>

                <Dialog open={dialogOpen} onClose={handleCloseDialog} >
                    <DialogTitle>Save Flashcards</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter a name for your flashcard set:
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="setName"
                            label="Flashcard Set Name"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={setName}
                            onChange={(e) => setSetName(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Cancel</Button>
                        <GradientButton onClick={saveFlashcards}>Save</GradientButton>
                    </DialogActions>
                </Dialog>
            </Box>
        </ThemeProvider>
    )
}

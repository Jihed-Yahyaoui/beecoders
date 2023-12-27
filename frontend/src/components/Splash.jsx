import { Button, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';

export default function Splash() {
    return (
        <>
            <div style={{ height: "fit-content", padding: 12 }}>
                <img src="/LogoBridge.png" height="50" alt="" />
            </div>
            <Stack
                justifyContent="center"
                alignItems="center"
                sx={{
                    height: "calc(100vh - 76px)",
                    backgroundImage: "url(/splash.jpg)",
                    backgroundSize: "cover",
                    backgroundAttachment: "fixed"
                }}
            >
                <Stack
                    justifyContent="center"
                    alignItems="center"
                    spacing="8px"
                    sx={{
                        borderRadius: 10,
                        backgroundColor: "rgba(255,255,255, 0.7)",
                        backdropFilter: "blur(5px)",
                        padding: "18px",
                        width: "65%",
                    }}>
                    <Typography variant="h4" textAlign="center" style={{
                        fontWeight: "bold"
                    }}>
                        Improve your skills on your own to prepare
                        a better future
                    </Typography>
                    <Button variant="contained" sx={{
                        backgroundColor: "#af2f64",
                        '&:hover': {
                            backgroundColor: "#842f52",
                        }
                    }}>
                        Register Now
                    </Button>
                </Stack>
            </Stack>
        </>
    )
}
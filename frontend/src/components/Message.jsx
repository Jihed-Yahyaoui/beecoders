import { Button, CircularProgress, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Swal from 'sweetalert2'


export default function Message() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    const [nameError, setNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [messageError, setMessageError] = useState('')

    // Determine if errors are new or not
    const [isNew, setIsNew] = useState(true)

    const [isLoading, setIsLoading] = useState(false)

    const sendMessage = async () => {
        setIsNew(true)
        setNameError()
        setEmailError()
        setMessageError()
        if (!name.trim()) {
            setNameError('Please enter a name.')
            return;
        }
        if (!email.trim()) {
            setEmailError('Please enter an email adress.')
            return;
        }
        if (!message.trim()) {
            setMessageError('Please enter a message.')
            return;
        }
        setIsLoading(true)
        await fetch("http://localhost:5000/message", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message })
        }).then(res => {
            if (res.status === 200)
                return Swal.fire(
                    "Success!",
                    "Your email has been sent successfully.",
                    "success"
                )

            if (res.status === 401)
                return setEmailError("This email adress is not valid.")

            return Swal.fire(
                "error",
                "Oops...",
                "Something went wrong!"
            )
        })
        setIsLoading(false)
    }
    return (
        <Stack
            alignItems="center"
            justifyContent="center"
            sx={{
                width: "60%",
                margin: "0 auto",
                padding: "12px 16px",
                borderRadius: "8px",
                backgroundColor: "#fab555"
            }}
            spacing={4}
        >
            <Typography variant='h4' sx={{ fontWeight: "bold" }}>
                Contact Us
            </Typography>
            <TextField
                variant="filled"
                value={name}
                label="Name"
                error={isNew && !!nameError}
                helperText={isNew && nameError}
                onChange={(e) => { setName(e.target.value); setIsNew(false) }}
                sx={{ width: "70%" }}
            />
            <TextField
                variant="filled"
                value={email}
                label="E-mail"
                error={isNew && !!emailError}
                helperText={isNew && emailError}
                onChange={(e) => { setEmail(e.target.value); setIsNew(false) }}
                sx={{ width: "70%" }}
            />
            <TextField
                variant="filled"
                value={message}
                multiline
                rows={5}
                label="Message"
                error={isNew && !!messageError}
                helperText={isNew && messageError}
                onChange={(e) => { setMessage(e.target.value); setIsNew(false) }}
                sx={{ width: "70%" }}
            />
            <Button
                variant="contained"
                disabled={isLoading}
                sx={{
                    width: "70%",
                    backgroundColor: "#af2f64",
                    '&:hover': {
                        backgroundColor: "#842f52",
                    }
                }}
                onClick={sendMessage}
            >
                {isLoading ? <CircularProgress sx={{ color: "#adadad" }} /> : "Send"}
            </Button>
        </Stack>
    )
}
import { useState } from "react";
import ModalTemplate from "./ModalTemplate";
import { Button, CircularProgress, Stack, TextField, Typography } from "@mui/material";
import Swal from 'sweetalert2'

export default function CreateModal({ open, handleClose }) {
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [photo, setPhoto] = useState()

    const [nameError, setNameError] = useState("")
    const [priceError, setPriceError] = useState("")
    const [photoError, setPhotoError] = useState("")

    const [isNew, setIsNew] = useState(true)

    const [isLoading, setIsLoading] = useState(false)

    const uploadPhoto = async () => {
        const selectedFile = await window.showOpenFilePicker({
            types: [
                {
                    accept: {
                        "image/*": [".png", ".gif", ".jpeg", ".jpg"],
                    },
                },
            ],
            excludeAcceptAllOption: true,
        }).catch(() => { })
        if (selectedFile) {
            const selectedPhoto = await selectedFile[0].getFile()
            setPhoto(selectedPhoto)
        }
    }

    const createCourse = async () => {
        setIsNew(true)
        setNameError()
        setPriceError()
        setPhotoError()
        if (!name.trim()) {
            setNameError('Please enter a name.')
            return;
        }
        if (!price.trim()) {
            setPriceError('Please enter a price.')
            return;
        }
        if (!photo) {
            setPhotoError('Please add a photo.')
            return;
        }

        let reader = new FileReader();
        reader.readAsDataURL(photo);
        reader.onload = async function () {
            setIsLoading(true)
            await fetch("http://localhost:5000/createCourse", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, price, photo: reader.result })
            }).then(() => Swal.fire("Success!", "The course has been created successfully.", "success"))
                .then(() => {
                    setName("")
                    setPrice(0)
                    setPhoto()
                    setIsLoading(false)
                })
        }
    }

    return (
        <ModalTemplate open={open} handleClose={handleClose} name="Create New Course">
            <Stack alignItems="center" spacing={4} padding={4}>
                <TextField
                    variant="filled"
                    value={name}
                    label="Name"
                    error={isNew && !!nameError}
                    helperText={isNew && nameError}
                    onChange={(e) => { setName(e.target.value); setIsNew(false) }}
                    sx={{ marginTop: "8px", width: "80%" }}
                />
                <TextField
                    variant="filled"
                    value={price}
                    type="number"
                    label="Price"
                    error={isNew && !!priceError}
                    helperText={isNew && priceError}
                    onChange={(e) => { setPrice(e.target.value); setIsNew(false) }}
                    sx={{ width: "80%" }}
                />
                <Stack direction="row" spacing={2} sx={{ width: "80%" }}>
                    <Button variant="contained" sx={{
                        backgroundColor: "#af2f64",
                        '&:hover': {
                            backgroundColor: "#842f52",
                        }
                    }}
                        onClick={uploadPhoto}
                    >
                        Upload Image
                    </Button>
                    <Typography
                        sx={{
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                        }}>{photo?.name}</Typography>
                </Stack>
                <Typography color="#d32f2f">
                    {isNew && photoError}
                </Typography>
                <Button variant="contained" sx={{
                    backgroundColor: "#af2f64",
                    '&:hover': {
                        backgroundColor: "#842f52",
                    }
                }}
                    onClick={createCourse}
                    disabled={isLoading}
                >
                    {isLoading ? <CircularProgress sx={{ color: "#adadad" }} /> : "Create Course"}
                </Button>
            </Stack>
        </ModalTemplate >
    )
}
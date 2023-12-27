import { useState } from "react";
import ModalTemplate from "./ModalTemplate";
import { Button, CircularProgress, Stack, TextField, Typography } from "@mui/material";
import Swal from 'sweetalert2'

export default function EditModal({ open, handleClose, id, photo }) {
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [editPhoto, setPhoto] = useState(photo)

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

    const editCourse = async () => {
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

        setIsLoading(true)
        if (editPhoto !== photo) {
            let reader = new FileReader();
            reader.readAsDataURL(photo);
            reader.onload = async function () {
                await fetch("http://localhost:5000/editCourse?id=" + id, {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id, name, price, photo: reader.result })
                })
            }
        } else
            await fetch("http://localhost:5000/editCourse", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, name, price, photo })
            })

        Swal.fire("Success!", "The course has been edited successfully.", "success")
            .then(() => {
                setName("")
                setPrice(0)
                setPhoto()
                setIsLoading(false)
            })
    }

    return (
        <ModalTemplate open={open} handleClose={handleClose} name="Edit Course">
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
                        }}>{editPhoto?.name || photo}</Typography>
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
                    onClick={editCourse}
                    disabled={isLoading}
                >
                    {isLoading ? <CircularProgress sx={{ color: "#adadad" }} /> : "Edit Course"}
                </Button>
            </Stack>
        </ModalTemplate >
    )
}
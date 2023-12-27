import { Button, Card, CircularProgress, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CreateModal from "../components/CreateModal"
import Swal from "sweetalert2";
import EditModal from "../components/EditModal";

export default function Admin() {
    const [products, setProducts] = useState([])

    const [page, setPage] = useState(1)
    const [stillMore, setStillMore] = useState(true)

    const [createModalOpen, setCreateModalOpen] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [editModalId, setEditModalId] = useState({ name: "", price: 1, photo: "", _id: "" })
    const [editModalPhoto, setEditModalPhoto] = useState("")

    const [isLoading, setIsLoading] = useState(false)

    const getProducts = async () => {
        setIsLoading(true)
        await fetch('http://localhost:5000/viewproducts?page=' + page)
            .then(res => res.json())
            .then(res => {
                setProducts([...products, ...res])
                setStillMore(res.length === 6)
                setPage(page + 1)
                setIsLoading(false)
            })
    }
    useEffect(() => {
        getProducts()
    }, [])

    const deleteCourse = async (id) => {
        const result = await Swal.fire({
            title: "Do you want to delete this course?",
            showCancelButton: true,
            confirmButtonText: "Delete"
        })
        if (result.isConfirmed)
            fetch("http://localhost:5000/deleteCourse?id=" + id)
                .then(() => Swal.fire("Success!", "The course has been deleted successfully.", "success"))
                .then(() => window.location.reload())
    }

    return (
        <>
            <Stack justifyContent="space-between" direction='row' sx={{ padding: "24px" }}>
                <Typography variant='h4'>
                    Admin Dashboard
                </Typography>
                <Button variant="contained" sx={{
                    backgroundColor: "#af2f64",
                    '&:hover': {
                        backgroundColor: "#842f52",
                    }
                }}
                    onClick={() => setCreateModalOpen(true)}
                >
                    Create New Course
                </Button>
            </Stack>
            {products.length > 0 ?
                products.map(({ name, price, photo, _id }) =>
                    <Card raised key={_id}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            padding={3}
                        >
                            <Stack direction='row' spacing={2}>
                                <div style={{
                                    width: "20%",
                                    minWidth: "150px",
                                    height: "auto",
                                    backgroundImage: `url(${photo})`,
                                    backgroundSize: "contain",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center"
                                }}></div>
                                <Stack>
                                    <Typography variant='h5' sx={{ fontWeight: "bold" }}>
                                        {name}
                                    </Typography>
                                    <Typography sx={{ fontWeight: "bold", color: "#af2f64" }}>
                                        {price} DT/ Month
                                    </Typography>
                                </Stack>
                            </Stack>
                            <Stack spacing={2}>
                                <Button variant="contained" sx={{
                                    backgroundColor: "#af2f64",
                                    marginRight: 4,
                                    '&:hover': {
                                        backgroundColor: "#842f52",
                                    }
                                }}  
                                    onClick={() => {
                                        setEditModalId(_id)
                                        setEditModalPhoto(photo)
                                        setEditModalOpen(true)
                                    }}
                                >
                                    Edit Course
                                </Button>
                                <Button variant="contained" sx={{
                                    backgroundColor: "#af2f64",
                                    '&:hover': {
                                        backgroundColor: "#842f52",
                                    }
                                }}
                                    onClick={() => deleteCourse(_id)}
                                >
                                    Delete Course
                                </Button>
                            </Stack>
                        </Stack>
                    </Card>
                ) : <CircularProgress sx={{ color: "#adadad", margin: "0 auto" }} />}
            {stillMore && <Button variant="contained" sx={{
                backgroundColor: "#af2f64",
                margin: "12px",
                position: "absolute",
                right: "50%",
                transform: "translateX(50%)",
                fontSize: "26px",
                '&:hover': {
                    backgroundColor: "#842f52",
                }
            }}
                onClick={getProducts}
                disabled={isLoading}
            >
                {isLoading ? <CircularProgress sx={{ color: "#adadad" }} /> : "See More"}
            </Button>}
            <CreateModal open={createModalOpen} handleClose={() => setCreateModalOpen(false)} />
            <EditModal
                open={editModalOpen}
                handleClose={() => setEditModalOpen(false)}
                id={editModalId}
                photo={editModalPhoto}
            />
        </>
    )
}
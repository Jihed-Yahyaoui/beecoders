import { Button, Card, CardContent, CardMedia, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function ViewProducts() {
    const [products, setProducts] = useState({})

    useEffect(() => {
        fetch('http://localhost:5000/viewproducts?page=1')
            .then(res => res.json())
            .then(res => setProducts(res))
    }, [])

    return (
        <Stack spacing={4} sx={{ padding: "24px", width: "100%" }}>
            <Stack justifyContent="space-between" direction='row' sx={{ padding: "0 24px" }}>
                <Typography variant='h4'>
                    Discover Our Courses
                </Typography>
                <Button variant="contained" sx={{
                    backgroundColor: "#af2f64",
                    '&:hover': {
                        backgroundColor: "#842f52",
                    }
                }}>
                    See More
                </Button>
            </Stack>
            <Grid container spacing={6} sx={{ width: "100%" }}>
                {products.length > 0 ? products.map(({ name, price, photo }, index) => (
                    <Grid item md={4} xs={6} key={index}>
                        <Card>
                            <CardMedia
                                image={photo}
                                sx={{
                                    height: 140,
                                    '&.MuiCardMedia-root': {
                                        backgroundSize: "contain"
                                    }
                                }}
                            />
                            <CardContent>
                                <Typography variant='h5' sx={{ fontWeight: "bold" }}>
                                    {name}
                                </Typography>
                                <Typography sx={{ fontWeight: "bold", color: "#af2f64" }}>
                                    {price} DT/ Month
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                )) : <CircularProgress sx={{ color: "#adadad", margin: "0 auto" }}/>}
            </Grid>
        </Stack>
    )
}
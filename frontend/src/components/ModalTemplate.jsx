import { Box, Divider, Modal, Stack, Typography } from '@mui/material';
import React from 'react'

export default function ModalTemplate(props) {

    const { open, handleClose, name, children } = props

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: 350,
        width: "50%",
        bgcolor: 'background.paper',
        boxShadow: 10,
        borderRadius: 5,
        p: 2,
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            sx={{ '&.MuiModal-root': { zIndex: 300 } }}
        >
            <Box sx={style}>
                <Stack direction="row" justifyContent="space-between">
                    <Typography
                        sx={{
                            fontSize: "28px",
                            fontWeight: "bold",
                            paddingBottom: 2
                        }}>
                        {name}
                    </Typography>
                    <Typography
                        onClick={handleClose}
                        sx={{
                            color: "rgba(0, 0, 0, 0.6)",
                            cursor: "pointer",
                            height: "fitContent",
                            fontSize: "20px"
                        }}>
                        X
                    </Typography>
                </Stack>
                <Divider />
                {children}
            </Box>
        </Modal>
    )
}
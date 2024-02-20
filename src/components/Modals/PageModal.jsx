import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { useMediaQuery, Box, Typography, Modal, Button, Toolbar, Stack, IconButton, Fade, Backdrop } from '@mui/material'
import Close from '@mui/icons-material/Close'
import { ArrowBack } from '@mui/icons-material'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '100vw', sm: '70vw', md: '50vw' },
    height: { xs: '100svh', sm: '89%' },
    //maxHeight: '100%',
    //maxWidth: 600,
    bgcolor: '#222326', //'background.default',
    borderRadius: { xs: 0, sm: 4 },
    boxShadow: 24,
    //p: { xs: 2, sm: 3 },
    display: 'flex',
    flexDirection: 'column',
    //overflow: 'hidden'
}

const PageModal = ({
    children,
    //open,
    onClose,
    onSubmit,
    onAction,
    title,
    header,
    //subTitle,
    showFooterAlways,
    hideFooter,
    fullHeight,
    fullWidth,
    submitButtonText,
    submitButtonColor,
    cancelButtonText,
    actionButtonText,
    hideConfirmButton,
    hideBackDrop,
    secondaryHeader,
    beforeOpen
}) => {

    //console.log("Rendering BasicModal.jsx ");

    const isSmallScreen = useMediaQuery('(max-width:600px)')

    //const navigate = useNavigate()

    const handleOpen = () => {
        if (beforeOpen) {
            if (beforeOpen()) setOpen(true)
        } else {
            setOpen(true)
        }
    }

    const handleClose = () => {
        if (onClose) {
            onClose()
        } else {
            window.history.back()
        }
    }

    const handleAction = () => [
        onAction ? onAction() : null
    ]

    const handleSubmit = () => {
        onSubmit ? onSubmit() : null
        handleClose()
    }

    const showFooter = () => {
        if (hideFooter) return false
        if (isSmallScreen) {
            if (showFooterAlways) {
                return true
            } else {
                return false
            }
        }
        return true
    }

    const chooseStyle = () => {
        if (fullHeight && fullWidth) {
            return { ...style, height: '100svh', width: "100vw" }
        }
        if (fullHeight) {
            return { ...style, height: '100svh' }
        }
        if (fullWidth) {
            return { ...style, width: "100vw" }
        }
        return style
    }

    return (
        <>
            {/*   <Backdrop transitionDuration={0} open={true} /> */}

            <Modal
                open={true}
                //hideBackdrop={true}
                onClose={handleClose}

                sx={{
                    '.MuiModal-backdrop': {
                        transitionDuration: 0,
                        timeout: 0
                    },
                }}
            >



                <Box sx={chooseStyle()}>



                    {/* HEADER */}
                    <Toolbar sx={{ justifyContent: 'space-between', gap: 1 }} >

                        {isSmallScreen &&
                            <IconButton onClick={handleClose} >
                                <ArrowBack />
                            </IconButton>
                        }

                        <Box flexGrow={2}  > {header} </Box>

                        {/*  <Stack direction={'row'} justifyItems={'center'} gap={2} flexGrow={2} paddingRight={1} >
                            {isSmallScreen &&
                                <IconButton onClick={handleClose} >
                                    <Close />
                                </IconButton>
                            } 
                        
                     </Stack> */}

                        {/*    {isSmallScreen && !showFooterAlways &&
                            <Button variant="text" onClick={handleSubmit} >
                                {submitButtonText ? submitButtonText : "Save"}
                            </Button>
                        } */}
                        {!isSmallScreen && <IconButton onClick={handleClose} > <Close /> </IconButton>}
                    </Toolbar>

                    {secondaryHeader}

                    {/* CONTENT */}
                    <Box sx={{ flexGrow: 1, overflowY: "scroll", overflowX: "hidden" }} >
                        {children}
                    </Box>

                    {/* FOOTER */}
                    {showFooter() &&
                        <Box
                            display={'flex'}
                            flexDirection={'row'}

                            justifyContent={'space-between'}
                            sx={{ paddingBottom: 2, paddingTop: 2, paddingX: 3 }}
                        >

                            <Button onClick={handleAction} variant='text'>
                                {actionButtonText ? actionButtonText : <div>Action</div>}
                            </Button>
                            <Box
                                display={'flex'}
                                flexDirection={'row'}
                                gap={2}
                            >
                                {!isSmallScreen && showFooterAlways &&
                                    <Button fullWidth onClick={handleClose} variant='outlined'>
                                        {cancelButtonText ? cancelButtonText : <div>Cancel</div>}
                                    </Button>
                                }
                                <Button
                                    variant="contained"
                                    color={submitButtonColor ? submitButtonColor : 'info'}
                                    onClick={handleSubmit}
                                    fullWidth
                                // sx={{ marginY: 1 }}
                                >
                                    {submitButtonText ? submitButtonText : <div>Save</div>}
                                </Button>
                            </Box>
                        </Box>
                    }



                </Box>
            </Modal>
        </>
    )
}

export default PageModal
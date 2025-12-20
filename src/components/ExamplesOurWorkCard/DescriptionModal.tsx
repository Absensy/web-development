import React from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface DescriptionModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    description: string;
}

const DescriptionModal: React.FC<DescriptionModalProps> = ({ open, onClose, title, description }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="description-modal-title"
            aria-describedby="description-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: '90%', sm: '80%', md: '600px' },
                    maxHeight: '80vh',
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                    overflow: 'auto',
                }}
            >
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Typography id="description-modal-title" variant="h6" component="h2" fontWeight="600">
                        {title}
                    </Typography>
                    <IconButton
                        onClick={onClose}
                        sx={{
                            ml: 2,
                            color: 'text.secondary',
                            '&:hover': {
                                color: 'text.primary',
                            },
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Typography
                    id="description-modal-description"
                    fontSize="16px"
                    lineHeight={1.6}
                    color="text.secondary"
                >
                    {description}
                </Typography>
            </Box>
        </Modal>
    );
};

export default DescriptionModal;

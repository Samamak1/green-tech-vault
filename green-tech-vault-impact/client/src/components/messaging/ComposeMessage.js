import React, { useState, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper, 
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete,
  CircularProgress,
  InputAdornment,
  Tooltip,
  Snackbar,
  Alert
} from '@mui/material';
import { 
  Close as CloseIcon,
  Search as SearchIcon,
  Send as SendIcon
} from '@mui/icons-material';
import { useMessages } from '../../context/MessageContext';
import { useAuth } from '../../context/AuthContext';

const ComposeMessage = ({ open, onClose, initialRecipient = null, initialSubject = '', isReply = false }) => {
  const { sendMessage, searchUsers, recipients, loading } = useMessages();
  const { user } = useAuth();
  
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [recipientInput, setRecipientInput] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (open) {
      // If we have an initial recipient (for replies)
      if (initialRecipient) {
        setSelectedRecipient(initialRecipient);
        
        // For replies, prepend "Re: " to the subject if it doesn't already start with it
        const subjectText = initialSubject || '';
        setSubject(subjectText.startsWith('Re: ') ? subjectText : `Re: ${subjectText}`);
        
        // For replies, set up the quoted message format
        if (isReply) {
          setContent(`\n\n---\nOn ${new Date().toLocaleString()}, ${initialRecipient.companyName || initialRecipient.username} wrote:\n`);
        }
      } else {
        setSelectedRecipient(null);
        setSubject(initialSubject || '');
        setContent('');
      }
      setRecipientInput('');
      setErrorMessage('');
      setSuccessMessage('');
    }
  }, [open, initialRecipient, initialSubject, isReply]);

  // Handle recipient search
  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    
    if (recipientInput && recipientInput.length > 1) {
      // Debounce the search to avoid too many requests
      const timeout = setTimeout(() => {
        searchUsers(recipientInput);
      }, 300);
      
      setSearchTimeout(timeout);
    }
    
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [recipientInput]);

  // Handle form submission
  const handleSubmit = async () => {
    // Validate form
    if (!selectedRecipient) {
      setErrorMessage('Please select a recipient');
      return;
    }
    
    if (!content.trim()) {
      setErrorMessage('Message content cannot be empty');
      return;
    }
    
    setErrorMessage('');
    setIsSubmitting(true);
    
    try {
      const result = await sendMessage(
        selectedRecipient._id,
        subject,
        content
      );
      
      if (result) {
        setSuccessMessage('Message sent successfully');
        // Reset form and close dialog after a short delay
        setTimeout(() => {
          setSuccessMessage('');
          onClose();
        }, 1500);
      } else {
        setErrorMessage('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setErrorMessage(error.message || 'Failed to send message');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get option label for autocomplete
  const getOptionLabel = (option) => {
    if (typeof option === 'string') return option;
    
    const companyName = option.companyName ? option.companyName : '';
    const userName = option.username ? `@${option.username}` : '';
    
    if (companyName && userName) {
      return `${companyName} (${userName})`;
    } else {
      return companyName || userName || '';
    }
  };

  return (
    <>
      <Dialog 
        open={open} 
        onClose={onClose} 
        maxWidth="md" 
        fullWidth
        PaperProps={{ sx: { height: '80vh' } }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
          bgcolor: 'rgba(24, 91, 95, 0.05)',
          color: '#185B5F'
        }}>
          <Typography variant="h6">
            {isReply ? 'Reply to Message' : 'Compose New Message'}
          </Typography>
          <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
          {/* Recipient selector */}
          <Box sx={{ mb: 2 }}>
            <Autocomplete
              value={selectedRecipient}
              onChange={(event, newValue) => {
                setSelectedRecipient(newValue);
              }}
              inputValue={recipientInput}
              onInputChange={(event, newInputValue) => {
                setRecipientInput(newInputValue);
              }}
              getOptionLabel={getOptionLabel}
              options={recipients}
              loading={loading}
              disablePortal
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="To"
                  variant="outlined"
                  fullWidth
                  required
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="action" />
                      </InputAdornment>
                    )
                  }}
                  placeholder="Search by username, email or company name"
                  helperText={isReply ? '' : 'Start typing to search for users'}
                  disabled={isReply && initialRecipient}
                />
              )}
            />
          </Box>
          
          {/* Subject field */}
          <TextField
            label="Subject"
            variant="outlined"
            fullWidth
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            sx={{ mb: 2 }}
            disabled={isReply && initialSubject}
          />
          
          {/* Message content */}
          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            multiline
            rows={12}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={{ mb: 2, flexGrow: 1 }}
            required
            placeholder="Type your message here..."
          />
          
          {/* Error message */}
          {errorMessage && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {errorMessage}
            </Typography>
          )}
        </DialogContent>
        
        <DialogActions sx={{ 
          p: 2, 
          borderTop: '1px solid rgba(0, 0, 0, 0.12)',
          justifyContent: 'space-between'
        }}>
          <Button 
            variant="outlined" 
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSubmit}
            disabled={isSubmitting}
            startIcon={<SendIcon />}
          >
            Send Message
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Success message snackbar */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={() => setSuccessMessage('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSuccessMessage('')} 
          severity="success" 
          sx={{ width: '100%' }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ComposeMessage; 
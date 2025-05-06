import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Divider,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Card,
  CardContent,
  TextField,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  InputAdornment
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Search as SearchIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  ChatBubbleOutline as ChatIcon,
  VideoLibrary as VideoIcon,
  MenuBook as GuideIcon,
  Forum as ForumIcon
} from '@mui/icons-material';
import { getContentContainerStyle, getContentWrapperStyle } from '../utils/layoutStyles';
import Header from '../components/layout/Header';
import ClientSidebar from '../components/layout/ClientSidebar';

const Help = () => {
  const [expanded, setExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // FAQ data
  const faqs = [
    {
      question: 'How do I schedule an e-waste pickup?',
      answer: 'You can schedule a pickup by navigating to the "Schedule Pickup" page from the sidebar menu. Fill out the required information including your contact details, pickup address, and preferred date/time.'
    },
    {
      question: 'How can I view my environmental impact?',
      answer: 'Your environmental impact is visible on the "RYGN Profile" page under the "Environmental Impact" tab. This shows metrics like CO2 saved, devices processed, and recycling statistics.'
    },
    {
      question: 'What types of e-waste can I recycle?',
      answer: 'We accept most electronic items including computers, laptops, monitors, printers, phones, tablets, and small household electronics. Check the recycling guidelines for a complete list.'
    },
    {
      question: 'How do I generate reports for my recycling activities?',
      answer: 'Go to the "Reports" section in the sidebar menu. From there, you can generate various reports about your recycling activities, including summaries, detailed listings, and environmental impact reports.'
    },
    {
      question: 'How can I update my company information?',
      answer: 'You can update your company information by going to "Profile" in the user dropdown menu at the top right corner. Click on "Edit" next to the company information section.'
    }
  ];
  
  // Filter FAQs based on search term
  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Tutorial data
  const tutorials = [
    {
      title: 'Getting Started Guide',
      description: 'Learn the basics of the Green Tech Vault platform',
      icon: <GuideIcon sx={{ fontSize: 40, color: '#185B5F' }} />,
      link: '#'
    },
    {
      title: 'Video Tutorials',
      description: 'Watch step-by-step videos of common tasks',
      icon: <VideoIcon sx={{ fontSize: 40, color: '#185B5F' }} />,
      link: '#'
    },
    {
      title: 'User Forums',
      description: 'Join discussions with other users',
      icon: <ForumIcon sx={{ fontSize: 40, color: '#185B5F' }} />,
      link: '#'
    }
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <ClientSidebar />
      <Box sx={{ flexGrow: 1, ml: '225px' }}>
        <Header />
        <Box sx={getContentContainerStyle()} data-boundary="true">
          <Box sx={{ ...getContentWrapperStyle(), mt: '64px' }}>
            <Typography variant="h5" sx={{ mb: 3 }}>Help Center</Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>Search for Help</Typography>
                  <TextField
                    fullWidth
                    placeholder="Search for help topics..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Paper>
              </Grid>
              
              {/* Left column - FAQs */}
              <Grid item xs={12} md={8}>
                <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
                  <Box sx={{ bgcolor: '#f5f5f5', p: 2 }}>
                    <Typography variant="h6">Frequently Asked Questions</Typography>
                  </Box>
                  
                  <Divider />
                  
                  {filteredFaqs.length > 0 ? (
                    filteredFaqs.map((faq, index) => (
                      <Accordion
                        key={index}
                        expanded={expanded === `panel${index}`}
                        onChange={handleChange(`panel${index}`)}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls={`panel${index}bh-content`}
                          id={`panel${index}bh-header`}
                        >
                          <Typography sx={{ fontWeight: 500 }}>
                            {faq.question}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>{faq.answer}</Typography>
                        </AccordionDetails>
                      </Accordion>
                    ))
                  ) : (
                    <Box sx={{ p: 3, textAlign: 'center' }}>
                      <Typography variant="body1" color="text.secondary">
                        No FAQs match your search term. Try a different search or contact support.
                      </Typography>
                    </Box>
                  )}
                </Paper>
                
                <Paper sx={{ p: 3, borderRadius: 2, mt: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>Tutorials & Resources</Typography>
                  <Divider sx={{ mb: 3 }} />
                  
                  <Grid container spacing={2}>
                    {tutorials.map((tutorial, index) => (
                      <Grid item xs={12} md={4} key={index}>
                        <Link href={tutorial.link} underline="none">
                          <Paper 
                            elevation={2} 
                            sx={{ 
                              p: 2, 
                              height: '100%', 
                              display: 'flex', 
                              flexDirection: 'column', 
                              alignItems: 'center',
                              textAlign: 'center',
                              '&:hover': { 
                                boxShadow: 4 
                              }
                            }}
                          >
                            <Box sx={{ mb: 2 }}>
                              {tutorial.icon}
                            </Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
                              {tutorial.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {tutorial.description}
                            </Typography>
                          </Paper>
                        </Link>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </Grid>
              
              {/* Right column - Contact */}
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>Contact Support</Typography>
                  <Divider sx={{ mb: 3 }} />
                  
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <EmailIcon sx={{ color: '#185B5F' }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Email Support" 
                        secondary="support@greentechvault.com"
                      />
                    </ListItem>
                    
                    <ListItem>
                      <ListItemIcon>
                        <PhoneIcon sx={{ color: '#185B5F' }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Phone Support" 
                        secondary="(555) 123-4567"
                      />
                    </ListItem>
                    
                    <ListItem>
                      <ListItemIcon>
                        <ChatIcon sx={{ color: '#185B5F' }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Live Chat" 
                        secondary="Available 9AM-5PM ET, Mon-Fri"
                      />
                    </ListItem>
                  </List>
                  
                  <Button 
                    variant="contained" 
                    fullWidth
                    sx={{ 
                      mt: 2,
                      bgcolor: '#185B5F', 
                      '&:hover': { bgcolor: '#124548' },
                      borderRadius: 8,
                      textTransform: 'none'
                    }}
                  >
                    Start Live Chat
                  </Button>
                </Paper>
                
                <Card sx={{ mb: 3, bgcolor: '#1C392B', color: 'white' }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Submit a Support Ticket
                    </Typography>
                    
                    <Typography variant="body2" sx={{ mb: 3 }}>
                      Need more detailed assistance? Submit a support ticket and our team will respond within 24 hours.
                    </Typography>
                    
                    <Button 
                      variant="outlined" 
                      fullWidth
                      sx={{ 
                        color: 'white', 
                        borderColor: 'white',
                        '&:hover': { 
                          borderColor: '#eeeeee',
                          bgcolor: 'rgba(255,255,255,0.08)'
                        },
                        borderRadius: 8,
                        textTransform: 'none'
                      }}
                    >
                      Submit Ticket
                    </Button>
                  </CardContent>
                </Card>
                
                <Paper sx={{ p: 3, borderRadius: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 2 }}>
                    Business Hours
                  </Typography>
                  
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Monday - Friday:</strong> 9:00 AM - 5:00 PM ET
                  </Typography>
                  
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    <strong>Saturday - Sunday:</strong> Closed
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary">
                    Support tickets submitted outside of business hours will be addressed on the next business day.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Help; 
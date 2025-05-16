import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Paper,
  useTheme,
  CardMedia,
  CardActions
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SchoolIcon from '@mui/icons-material/School';
import BusinessIcon from '@mui/icons-material/Business';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import PublicIcon from '@mui/icons-material/Public';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import DownloadIcon from '@mui/icons-material/Download';
import EventIcon from '@mui/icons-material/Event';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import ArticleIcon from '@mui/icons-material/Article';
import PeopleIcon from '@mui/icons-material/People';
import EmailIcon from '@mui/icons-material/Email';

const EducationPage = () => {
  const theme = useTheme();
  
  // State for the expandable sections
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: theme.palette.teal.main,
          color: 'white',
          py: 8,
          position: 'relative',
          textAlign: 'center'
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
            🌱 Empowering a Greener Future Through Education
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, maxWidth: '800px', mx: 'auto', lineHeight: 1.5 }}>
            Explore how your school, organization, or community group can join us in creating a world where e-waste is no longer wasted.
          </Typography>
        </Container>
      </Box>
      
      {/* Schools & Educational Groups Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <SchoolIcon sx={{ fontSize: 40, color: theme.palette.teal.main, mr: 2 }} />
              <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
                🎓 For Schools & Educational Groups
              </Typography>
            </Box>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium', color: theme.palette.teal.dark, mb: 3 }}>
              Bring E-Waste Education into the Classroom
            </Typography>
            <Box component="ul" sx={{ mb: 4, pl: 2 }}>
              <Box component="li" sx={{ mb: 2 }}>
                <Typography variant="body1">
                  Free downloadable lesson plans & presentations
                </Typography>
              </Box>
              <Box component="li" sx={{ mb: 2 }}>
                <Typography variant="body1">
                  In-person or virtual guest speakers from our team
                </Typography>
              </Box>
              <Box component="li" sx={{ mb: 2 }}>
                <Typography variant="body1">
                  Interactive workshops on sustainability and tech
                </Typography>
              </Box>
              <Box component="li">
                <Typography variant="body1">
                  Opportunities for student-led collection drives or recycling events
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button 
                variant="contained"
                startIcon={<DownloadIcon />}
                sx={{ 
                  bgcolor: theme.palette.teal.main,
                  '&:hover': {
                    bgcolor: theme.palette.teal.dark
                  }
                }}
              >
                📥 Download Resources
              </Button>
              <Button 
                variant="outlined"
                startIcon={<EventIcon />}
                sx={{ 
                  color: theme.palette.teal.main,
                  borderColor: theme.palette.teal.main,
                  '&:hover': {
                    borderColor: theme.palette.teal.dark,
                    color: theme.palette.teal.dark
                  }
                }}
              >
                📅 Request a Workshop
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="300"
                image="https://images.unsplash.com/photo-1581092806457-bcd9867bf218?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8ZWR1Y2F0aW9ufGVufDB8fHx8MTY5MDE5NDQ1M3ww&ixlib=rb-4.0.3&q=80&w=1080"
                alt="Students learning about sustainability"
              />
            </Card>
          </Grid>
        </Grid>
      </Container>
      
      <Divider />
      
      {/* Community Centers Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6} sx={{ order: { xs: 2, md: 1 } }}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="300"
                image="https://images.unsplash.com/photo-1628614181199-61713af1a318?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fGNvbW11bml0eSUyMGNlbnRlcnxlbnwwfHx8fDE2OTAxOTQ1ODh8MA&ixlib=rb-4.0.3&q=80&w=1080"
                alt="Community recycling event"
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={6} sx={{ order: { xs: 1, md: 2 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <BusinessIcon sx={{ fontSize: 40, color: theme.palette.teal.main, mr: 2 }} />
              <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
                🏢 For Community Centers & Facilities
              </Typography>
            </Box>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium', color: theme.palette.teal.dark, mb: 3 }}>
              Host a Local Recycling Event or Awareness Day
            </Typography>
            <Box component="ul" sx={{ mb: 4, pl: 2 }}>
              <Box component="li" sx={{ mb: 2 }}>
                <Typography variant="body1">
                  Get support setting up an e-waste collection drive
                </Typography>
              </Box>
              <Box component="li" sx={{ mb: 2 }}>
                <Typography variant="body1">
                  Access to banners, flyers, and educational signage
                </Typography>
              </Box>
              <Box component="li">
                <Typography variant="body1">
                  Custom outreach materials for your neighborhood
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button 
                variant="contained"
                startIcon={<NoteAltIcon />}
                sx={{ 
                  bgcolor: theme.palette.teal.main,
                  '&:hover': {
                    bgcolor: theme.palette.teal.dark
                  }
                }}
              >
                📝 Apply to Host an Event
              </Button>
              <Button 
                variant="outlined"
                startIcon={<ArticleIcon />}
                sx={{ 
                  color: theme.palette.teal.main,
                  borderColor: theme.palette.teal.main,
                  '&:hover': {
                    borderColor: theme.palette.teal.dark,
                    color: theme.palette.teal.dark
                  }
                }}
              >
                📄 View Event Toolkit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Information Accordion Sections */}
      <Box sx={{ backgroundColor: '#f5f5f5', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
            Learn More About E-Waste & Sustainability
          </Typography>
          
          {/* What is E-Waste Accordion */}
          <Accordion 
            expanded={expanded === 'panel1'} 
            onChange={handleChange('panel1')}
            sx={{ mb: 2 }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              sx={{ bgcolor: theme.palette.teal.light, color: 'white' }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <HelpOutlineIcon sx={{ mr: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 'medium' }}>🔍 What is E-Waste?</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium', color: theme.palette.teal.main }}>
                    Definitions & types of e-waste
                  </Typography>
                  <Typography variant="body1" paragraph>
                    E-waste, or electronic waste, refers to discarded electrical or electronic devices. This includes computers, 
                    televisions, smartphones, and other electronic devices that have reached the end of their "useful life."
                  </Typography>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium', color: theme.palette.teal.main }}>
                    Why it's harmful when landfilled
                  </Typography>
                  <Typography variant="body1" paragraph>
                    When e-waste is improperly disposed of in landfills, hazardous materials like lead, mercury, and cadmium 
                    can leach into soil and groundwater, posing serious environmental and health risks.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium', color: theme.palette.teal.main }}>
                    Where it comes from
                  </Typography>
                  <Typography variant="body1" paragraph>
                    E-waste comes from various sources including smartphones, laptops, tablets, TVs, refrigerators, washing machines, 
                    printers, and other electronic devices that are discarded by consumers and businesses.
                  </Typography>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium', color: theme.palette.teal.main }}>
                    Global impact statistics
                  </Typography>
                  <Typography variant="body1">
                    According to global statistics, only about 17% of e-waste is properly recycled. The majority ends up in landfills 
                    or is shipped to developing countries where it may be processed in unsafe conditions.
                  </Typography>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          
          {/* Why Sustainability Matters Accordion */}
          <Accordion 
            expanded={expanded === 'panel2'} 
            onChange={handleChange('panel2')}
            sx={{ mb: 2 }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
              sx={{ bgcolor: theme.palette.teal.light, color: 'white' }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PublicIcon sx={{ mr: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 'medium' }}>🌍 Why Sustainability Matters</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium', color: theme.palette.teal.main }}>
                  Key Messages
                </Typography>
                <Box component="ul" sx={{ pl: 2 }}>
                  <Box component="li" sx={{ mb: 2 }}>
                    <Typography variant="body1">
                      <strong>Reduces environmental damage & resource depletion</strong> - Proper e-waste recycling minimizes harmful 
                      pollutants in our environment and conserves valuable materials like gold, silver, copper, and rare earth elements.
                    </Typography>
                  </Box>
                  <Box component="li" sx={{ mb: 2 }}>
                    <Typography variant="body1">
                      <strong>Supports circular economy and responsible production</strong> - Recycling e-waste feeds back valuable 
                      materials into the production cycle, reducing the need for virgin resource extraction.
                    </Typography>
                  </Box>
                  <Box component="li">
                    <Typography variant="body1">
                      <strong>Connects everyday actions to global impact</strong> - Individual choices about how to dispose of 
                      electronic devices collectively create massive global effects on our environment and communities.
                    </Typography>
                  </Box>
                </Box>
              </Box>
              
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium', color: theme.palette.teal.main }}>
                From Trash to Transformation
              </Typography>
              <Box sx={{ 
                bgcolor: '#f9f9f9', 
                p: 3, 
                borderRadius: 2, 
                border: `1px solid ${theme.palette.teal.light}`,
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 2
              }}>
                <Box sx={{ textAlign: 'center', flex: '1 1 0', minWidth: 120 }}>
                  <Typography variant="h6" sx={{ color: theme.palette.teal.main }}>Collection</Typography>
                  <Box sx={{ height: 4, bgcolor: theme.palette.teal.main, width: '80%', mx: 'auto', my: 1 }} />
                  <Typography variant="body2">Devices are collected from individuals and organizations</Typography>
                </Box>
                <Box sx={{ textAlign: 'center', flex: '1 1 0', minWidth: 120 }}>
                  <Typography variant="h6" sx={{ color: theme.palette.teal.main }}>Assessment</Typography>
                  <Box sx={{ height: 4, bgcolor: theme.palette.teal.main, width: '80%', mx: 'auto', my: 1 }} />
                  <Typography variant="body2">Items are evaluated for reuse or recycling</Typography>
                </Box>
                <Box sx={{ textAlign: 'center', flex: '1 1 0', minWidth: 120 }}>
                  <Typography variant="h6" sx={{ color: theme.palette.teal.main }}>Processing</Typography>
                  <Box sx={{ height: 4, bgcolor: theme.palette.teal.main, width: '80%', mx: 'auto', my: 1 }} />
                  <Typography variant="body2">Devices are safely disassembled and sorted</Typography>
                </Box>
                <Box sx={{ textAlign: 'center', flex: '1 1 0', minWidth: 120 }}>
                  <Typography variant="h6" sx={{ color: theme.palette.teal.main }}>Recovery</Typography>
                  <Box sx={{ height: 4, bgcolor: theme.palette.teal.main, width: '80%', mx: 'auto', my: 1 }} />
                  <Typography variant="body2">Valuable materials are extracted and refined</Typography>
                </Box>
                <Box sx={{ textAlign: 'center', flex: '1 1 0', minWidth: 120 }}>
                  <Typography variant="h6" sx={{ color: theme.palette.teal.main }}>Rebirth</Typography>
                  <Box sx={{ height: 4, bgcolor: theme.palette.teal.main, width: '80%', mx: 'auto', my: 1 }} />
                  <Typography variant="body2">Materials become new products and resources</Typography>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
          
          {/* How You Can Help Accordion */}
          <Accordion 
            expanded={expanded === 'panel3'} 
            onChange={handleChange('panel3')}
            sx={{ mb: 2 }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
              sx={{ bgcolor: theme.palette.teal.light, color: 'white' }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <EmojiObjectsIcon sx={{ mr: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 'medium' }}>🧩 How You Can Help</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium', color: theme.palette.teal.main, mb: 3 }}>
                Audience-Specific Actions
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Card sx={{ height: '100%', bgcolor: '#f9f9f9' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>For Students</Typography>
                      <Divider sx={{ mb: 2 }} />
                      <Box component="ul" sx={{ pl: 2 }}>
                        <Box component="li" sx={{ mb: 1 }}>
                          <Typography variant="body2">
                            Run a campus campaign to collect e-waste
                          </Typography>
                        </Box>
                        <Box component="li" sx={{ mb: 1 }}>
                          <Typography variant="body2">
                            Start a social media awareness challenge
                          </Typography>
                        </Box>
                        <Box component="li">
                          <Typography variant="body2">
                            Organize educational events on campus
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Card sx={{ height: '100%', bgcolor: '#f9f9f9' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>For Teachers</Typography>
                      <Divider sx={{ mb: 2 }} />
                      <Box component="ul" sx={{ pl: 2 }}>
                        <Box component="li" sx={{ mb: 1 }}>
                          <Typography variant="body2">
                            Include e-waste topics in your curriculum
                          </Typography>
                        </Box>
                        <Box component="li" sx={{ mb: 1 }}>
                          <Typography variant="body2">
                            Arrange for a guest speaker from our team
                          </Typography>
                        </Box>
                        <Box component="li">
                          <Typography variant="body2">
                            Lead by example with proper tech disposal
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Card sx={{ height: '100%', bgcolor: '#f9f9f9' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>For Parents</Typography>
                      <Divider sx={{ mb: 2 }} />
                      <Box component="ul" sx={{ pl: 2 }}>
                        <Box component="li" sx={{ mb: 1 }}>
                          <Typography variant="body2">
                            Teach sustainable habits at home
                          </Typography>
                        </Box>
                        <Box component="li" sx={{ mb: 1 }}>
                          <Typography variant="body2">
                            Involve kids in proper disposal of old devices
                          </Typography>
                        </Box>
                        <Box component="li">
                          <Typography variant="body2">
                            Encourage schools to implement recycling programs
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Card sx={{ height: '100%', bgcolor: '#f9f9f9' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>For Facilities</Typography>
                      <Divider sx={{ mb: 2 }} />
                      <Box component="ul" sx={{ pl: 2 }}>
                        <Box component="li" sx={{ mb: 1 }}>
                          <Typography variant="body2">
                            Set up an e-waste drop-off spot
                          </Typography>
                        </Box>
                        <Box component="li" sx={{ mb: 1 }}>
                          <Typography variant="body2">
                            Host regular e-waste collection days
                          </Typography>
                        </Box>
                        <Box component="li">
                          <Typography variant="body2">
                            Display informational materials about e-waste
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          
          {/* Videos & Interactive Tools Accordion */}
          <Accordion 
            expanded={expanded === 'panel4'} 
            onChange={handleChange('panel4')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4bh-content"
              id="panel4bh-header"
              sx={{ bgcolor: theme.palette.teal.light, color: 'white' }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <OndemandVideoIcon sx={{ mr: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 'medium' }}>🎥 Videos & Interactive Tools</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                  <Card sx={{ height: '100%' }}>
                    <CardMedia
                      component="img"
                      height="160"
                      image="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8cmVjeWNsaW5nfGVufDB8fHx8MTY5MDE5NDk5NXww&ixlib=rb-4.0.3&q=80&w=1080"
                      alt="E-waste recycling visualization"
                    />
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        "The Life Cycle of E-Waste"
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        A short animated explainer video showing how electronics are made, used, and can be properly recycled.
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary">
                        Watch Video
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Card sx={{ height: '100%' }}>
                    <CardMedia
                      component="img"
                      height="160"
                      image="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8cXVpenxlbnwwfHx8fDE2OTAxOTUwMzd8MA&ixlib=rb-4.0.3&q=80&w=1080"
                      alt="Quiz concept"
                    />
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        "What Kind of Recycler Are You?"
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Take our interactive quiz to discover your recycling habits and get personalized tips for improvement.
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary">
                        Take Quiz
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Card sx={{ height: '100%' }}>
                    <CardMedia
                      component="img"
                      height="160"
                      image="https://images.unsplash.com/photo-1581093199935-6035496bf328?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fG1hcHxlbnwwfHx8fDE2OTAxOTUwNzV8MA&ixlib=rb-4.0.3&q=80&w=1080"
                      alt="Map illustration"
                    />
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        "Find E-Waste Around Your Home"
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        An interactive tool that helps you identify potential e-waste items in different areas of your home.
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary">
                        Explore Map
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Container>
      </Box>
      
      {/* Final CTA Section */}
      <Box
        sx={{
          backgroundColor: theme.palette.teal.main,
          color: 'white',
          py: 6
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
            📞 Ready to Get Involved?
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, textAlign: 'center' }}>
            Let's Make Education Part of the Solution
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
            <Button 
              variant="contained" 
              size="large"
              startIcon={<PeopleIcon />}
              sx={{ 
                bgcolor: 'white', 
                color: theme.palette.teal.main,
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.9)',
                  transform: 'scale(1.05)'
                },
                fontWeight: 'bold',
                px: 4,
                py: 1.5,
                transition: 'all 0.3s ease',
              }}
            >
              👥 Partner With Us
            </Button>
            <Button 
              variant="outlined" 
              size="large"
              startIcon={<EmailIcon />}
              sx={{ 
                color: 'white', 
                borderColor: 'white',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  transform: 'scale(1.05)'
                },
                fontWeight: 'bold',
                px: 4,
                py: 1.5,
                transition: 'all 0.3s ease',
              }}
            >
              📩 Contact Our Education Team
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default EducationPage; 
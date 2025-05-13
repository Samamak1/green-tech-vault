import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  Avatar,
  useTheme
} from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import RecyclingIcon from '../components/branding/RecyclingIcon';

// Images
const heroBackground = 'teal';

// Value icons
const ValueIcon = ({ type }) => {
  const theme = useTheme();
  
  let path = "";
  switch(type) {
    case "sustainability":
      path = "M7.24,17.66L6,16.76L8.24,14H4V12H8.24L6,9.24L7.24,8.34L10.96,13L7.24,17.66M16.5,10C19,10 21,12 21,14.5C21,17 19,19 16.5,19C14.5,19 12.73,17.58 12.16,15.63C12.06,15.26 12,14.89 12,14.5C12,12 14,10 16.5,10M16.5,8C12.91,8 10,10.91 10,14.5C10,18.09 12.91,21 16.5,21C20.09,21 23,18.09 23,14.5C23,10.91 20.09,8 16.5,8M16.5,12C15.12,12 14,13.12 14,14.5C14,15.88 15.12,17 16.5,17C17.88,17 19,15.88 19,14.5C19,13.12 17.88,12 16.5,12M4,22V20H10V22H4Z";
      break;
    case "community":
      path = "M16 17V19H2V17S2 13 9 13 16 17 16 17M12.5 7.5A3.5 3.5 0 1 0 9 11A3.5 3.5 0 0 0 12.5 7.5M15.94 13A5.32 5.32 0 0 1 18 17V19H22V17S22 13.37 15.94 13M15 4A3.39 3.39 0 0 0 13.07 4.59A5 5 0 0 1 13.07 10.41A3.39 3.39 0 0 0 15 11A3.5 3.5 0 0 0 15 4Z";
      break;
    case "innovation":
      path = "M12,2A7,7 0 0,0 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H15A1,1 0 0,0 16,17V14.74C17.81,13.47 19,11.38 19,9A7,7 0 0,0 12,2M9,21A1,1 0 0,0 10,22H14A1,1 0 0,0 15,21V20H9V21Z";
      break;
    case "responsibility":
      path = "M5,3C3.89,3 3,3.9 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.9 20.1,3 19,3H5M5,5H19V19H5V5M7,7V9H17V7H7M7,11V13H17V11H7M7,15V17H14V15H7Z";
      break;
    case "equity":
      path = "M12,3C10.73,3 9.6,3.8 9.18,5H3V7H4.95L2,14C1.53,16 3,17 5.5,17C8,17 9.56,16 9,14L6.05,7H9.17C9.5,7.85 10.15,8.5 11,8.83V20H2V22H22V20H13V8.82C13.85,8.5 14.5,7.85 14.82,7H17.95L15,14C14.53,16 16,17 18.5,17C21,17 22.56,16 22,14L19.05,7H21V5H14.83C14.4,3.8 13.27,3 12,3M12,5A1,1 0 0,1 13,6A1,1 0 0,1 12,7A1,1 0 0,1 11,6A1,1 0 0,1 12,5M5.5,10.25L7,14H4L5.5,10.25M18.5,10.25L20,14H17L18.5,10.25Z";
      break;
    default:
      path = "";
  }
  
  return (
    <Box
      sx={{
        width: 80,
        height: 80,
        borderRadius: '50%',
        backgroundColor: theme.palette.teal.main,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        component="svg"
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="white"
      >
        <path d={path} />
      </Box>
    </Box>
  );
};

// Environmental benefit icons
const BenefitIcon = ({ type }) => {
  const theme = useTheme();
  
  let path = "";
  switch(type) {
    case "reducing":
      path = "M19.36,2.72L20.78,4.14L15.06,9.85C16.13,11.39 16.28,13.24 15.38,14.44L9.06,8.12C10.26,7.22 12.11,7.37 13.65,8.44L19.36,2.72M5.93,17.57C3.92,15.56 2.69,13.16 2.35,10.92L7.23,8.83L14.67,16.27L12.58,21.15C10.34,20.81 7.94,19.58 5.93,17.57Z";
      break;
    case "conserving":
      path = "M2.5,19H21.5V21H2.5V19M22,3H2V17H22V3M20,15H4V5H20V15M8,11H6V13H8V11M8,7H6V9H8V7M10,7H12V9H10V7M14,7H16V9H14V7M18,7H16V9H18V7M12,11H10V13H12V11M14,11H16V13H14V11Z";
      break;
    case "circular":
      path = "M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z";
      break;
    case "spreading":
      path = "M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z";
      break;
    default:
      path = "";
  }
  
  return (
    <Box
      sx={{
        width: 80,
        height: 80,
        borderRadius: '50%',
        backgroundColor: theme.palette.teal.main,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        component="svg"
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="white"
      >
        <path d={path} />
      </Box>
    </Box>
  );
};

const AboutUsPage = () => {
  const theme = useTheme();
  
  // What we do list
  const services = [
    "E-Waste Collection & Logistics",
    "Data Refurbishment & Resale",
    "Environmental Impact Reporting",
    "Community Workshops & Education",
    "Business Pick-Up Services",
    "Certified Recycling Programs"
  ];
  
  // Team members
  const teamMembers = [
    {
      name: "Leila Meyer",
      title: "CEO / Architect LEED AP",
      description: "Registered architect and sustainability leader with expertise in eco-conscious design and responsible e-waste management.",
      image: "/images/leila-meyer.jpg"
    },
    {
      name: "Sama Mushtaq",
      title: "CSO",
      description: "Proof that your materials were responsibly processed in accordance with regulations.",
      image: null
    }
  ];
  
  // Values
  const values = [
    { type: "sustainability", title: "Sustainability" },
    { type: "community", title: "Community" },
    { type: "innovation", title: "Innovation" },
    { type: "responsibility", title: "Responsibility" },
    { type: "equity", title: "Equity" }
  ];
  
  // Benefits
  const benefits = [
    { type: "reducing", title: "Reducing Harmful Waste" },
    { type: "conserving", title: "Conserving Natural Resources" },
    { type: "circular", title: "Supporting a Circular Economy" },
    { type: "spreading", title: "Spreading The Knowledge" }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: theme.palette.teal.main,
          color: 'white',
          py: 5,
          position: 'relative',
          textAlign: 'center'
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', mb: 4 }}>
            About Us
          </Typography>
          
          {/* Recycle icons row */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: { xs: 2, md: 4 },
              mb: 4
            }}
          >
            <RecyclingIcon size={110} color="black" />
            <RecyclingIcon size={80} color="black" />
            <RecyclingIcon size={80} color="black" />
            <RecyclingIcon size={110} color="black" />
          </Box>
        </Container>
      </Box>
      
      {/* Mission Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={7}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
              Our Mission
            </Typography>
            <Typography variant="body1" paragraph>
              At our company, we are committed to transforming the way the world views electronic waste. Rooted in the principles of circular economy, clean technology, and community empowerment, we work to give devices a second life—reducing waste and restoring value. We want to close the loop on e-waste by creating accessible, ethical, and sustainable systems for reuse, repair, and recycling.
            </Typography>
            
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', mt: 6 }}>
              What We Do
            </Typography>
            <List>
              {services.map((service, index) => (
                <ListItem key={index} sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    <CircleIcon sx={{ fontSize: 8, color: 'text.primary' }} />
                  </ListItemIcon>
                  <ListItemText primary={service} />
                </ListItem>
              ))}
            </List>
          </Grid>
          
          {/* Team Cards */}
          <Grid item xs={12} md={5}>
            {teamMembers.map((member, index) => (
              <Card 
                key={index} 
                sx={{ 
                  mb: 2, 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  borderRadius: 2
                }}
              >
                <Grid container>
                  <Grid item xs={4}>
                    {member.image ? (
                      <Box
                        component="img"
                        src={member.image}
                        alt={member.name}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block'
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100%',
                          bgcolor: '#f5f5f5'
                        }}
                      >
                        <RecyclingIcon size={80} color="black" />
                      </Box>
                    )}
                  </Grid>
                  <Grid item xs={8}>
                    <CardContent>
                      <Typography variant="h6" component="h3" gutterBottom>
                        {member.name === "Leila Meyer" ? (
                          <Box
                            component="a"
                            href="/ceo-profile"
                            sx={{
                              color: 'inherit',
                              textDecoration: 'none',
                              '&:hover': {
                                color: theme.palette.teal.main,
                                textDecoration: 'underline'
                              }
                            }}
                          >
                            {member.name}
                          </Box>
                        ) : (
                          member.name
                        )}
                      </Typography>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        {member.title}
                      </Typography>
                      <Typography variant="body2">
                        {member.description}
                      </Typography>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            ))}
          </Grid>
        </Grid>
      </Container>
      
      {/* Why It Matters Section */}
      <Box sx={{ bgcolor: '#f5f5f5', py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
            Why Does It Matter?
          </Typography>
          <Typography variant="body1" paragraph>
            E-waste is one of the fastest-growing waste streams in the world. Toxic materials can leak into soil and water when improperly disposed of. By choosing EcoCycle, you're making a measurable difference. Our Company represents a future where electronics aren't discarded—they're revived, respected, and reintegrated into the world responsibly.
          </Typography>
          
          {/* Benefits Grid */}
          <Grid container spacing={3} sx={{ mt: 4, textAlign: 'center' }}>
            {benefits.map((benefit, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  <BenefitIcon type={benefit.type} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                    {benefit.title}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      
      {/* Values Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
          Our Values
        </Typography>
        <Typography variant="body1" paragraph>
          At our company, our values guide every step we take. We believe in <strong>sustainability</strong> as a long-term commitment to the planet—not just a quick fix. Our work is grounded in <strong>community</strong>, partnering locally to create jobs, share knowledge, and spark meaningful change. With a focus on <strong>innovation</strong>, we're always looking for smarter, cleaner ways to manage e-waste through thoughtful design and technology. We take <strong>responsibility</strong> seriously, ensuring every device we collect is handled with care—ethically reused, repurposed, or recycled. And at the core of it all is <strong>equity</strong>—because access to clean, affordable technology should be a right, not a privilege.
        </Typography>
        
        {/* Values Icons */}
        <Grid container spacing={3} sx={{ mt: 4, textAlign: 'center' }}>
          {values.map((value, index) => (
            <Grid item xs={4} sm={2.4} key={index}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <ValueIcon type={value.type} />
                <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                  {value.title}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
      
      {/* Learn More Section */}
      <Box sx={{ bgcolor: '#f5f5f5', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                Learn More
              </Typography>
              <Typography variant="body1" paragraph>
                See what we do, why it matters, and how you can help create a cleaner, more connected world.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                <Box
                  component="a"
                  href="#how-it-works"
                  sx={{
                    display: 'inline-block',
                    px: 3,
                    py: 1.5,
                    bgcolor: theme.palette.teal.main,
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: 1,
                    fontWeight: 'medium'
                  }}
                >
                  How It Works
                </Box>
                <Box
                  component="a"
                  href="#learn-more"
                  sx={{
                    display: 'inline-block',
                    px: 3,
                    py: 1.5,
                    bgcolor: 'white',
                    color: 'text.primary',
                    textDecoration: 'none',
                    borderRadius: 1,
                    border: '1px solid #ddd',
                    fontWeight: 'medium'
                  }}
                >
                  Learn More
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1599687266725-0a5d7d5b63ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="E-waste recycling"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default AboutUsPage; 
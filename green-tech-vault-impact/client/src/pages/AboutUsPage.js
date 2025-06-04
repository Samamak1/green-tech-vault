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
import PersonIcon from '@mui/icons-material/Person';

// Images
const heroBackground = 'teal';

// Team members
const teamMembers = [
  {
    name: "Leila Meyer",
    title: "CEO",
    description: "Passionate entrepreneur committed to tackling the global e-waste crisis through innovative, community-driven solutions.",
    image: "/images/leila-meyer-headshot.jpg"
  },
  {
    name: "Sama Mushtaq",
    title: "CSO",
    description: "Proof that your materials were responsibly processed in accordance with regulations.",
    image: null
  }
];

// Value icons
const ValueIcon = ({ type }) => {
  const theme = useTheme();
  
  // Define colors for each type
  const getColors = (type) => {
    switch(type) {
      case "sustainability":
        return { main: '#1F5A3E', light: '#2D6B4D' }; // Dark green
      case "community":
        return { main: '#62C7CC', light: '#7BD3D8' }; // Light teal
      case "innovation":
        return { main: '#1F5A3E', light: '#2D6B4D' }; // Dark green
      case "responsibility":
        return { main: '#7BD3D8', light: '#8EDDEA' }; // Very light teal
      case "equity":
        return { main: '#1F5A3E', light: '#2D6B4D' }; // Dark green
      default:
        return { main: theme.palette.teal.main, light: theme.palette.teal.light };
    }
  };
  
  const colors = getColors(type);
  
  let iconComponent = null;
  switch(type) {
    case "sustainability":
      iconComponent = (
        <Box
          component="svg"
          width="50"
          height="50"
          viewBox="0 0 24 24"
          fill="white"
        >
          {/* Recycle/circular arrow icon */}
          <path d="M19.3,16.9C20.4,16.9 21.1,15.8 20.7,14.8L17.3,7.4C16.9,6.4 15.7,6.4 15.3,7.4L13.8,10.9L9.9,3.4C9.5,2.4 8.3,2.4 7.9,3.4L2.3,15.4C1.9,16.4 2.6,17.5 3.7,17.5H7.6L5.5,21.2C5.1,22.2 5.8,23.3 6.9,23.3C7.6,23.3 8.1,22.9 8.4,22.3L12,15L15.6,22.3C15.9,22.9 16.4,23.3 17.1,23.3C18.2,23.3 18.9,22.2 18.5,21.2L16.4,17.5H19.3V16.9Z" />
        </Box>
      );
      break;
    case "community":
      iconComponent = (
        <Box
          component="svg"
          width="50"
          height="50"
          viewBox="0 0 24 24"
          fill="white"
        >
          {/* Group/people icon */}
          <path d="M16 4C18.2 4 20 5.8 20 8S18.2 12 16 12 12 10.2 12 8 13.8 4 16 4M16 14C20.4 14 24 15.8 24 18V20H8V18C8 15.8 11.6 14 16 14M8 4C10.2 4 12 5.8 12 8S10.2 12 8 12 4 10.2 4 8 5.8 4 8 4M8 14C12.4 14 16 15.8 16 18V20H0V18C0 15.8 3.6 14 8 14Z" />
        </Box>
      );
      break;
    case "innovation":
      iconComponent = (
        <Box
          component="svg"
          width="50"
          height="50"
          viewBox="0 0 24 24"
          fill="white"
        >
          {/* Lightbulb/idea icon */}
          <path d="M12,2A7,7 0 0,0 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H15A1,1 0 0,0 16,17V14.74C17.81,13.47 19,11.38 19,9A7,7 0 0,0 12,2M9,21A1,1 0 0,0 10,22H14A1,1 0 0,0 15,21V20H9V21Z" />
        </Box>
      );
      break;
    case "responsibility":
      iconComponent = (
        <Box
          component="svg"
          width="50"
          height="50"
          viewBox="0 0 24 24"
          fill="white"
        >
          {/* Shield/protection icon */}
          <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V16.2C14.8,17.2 14,18 13,18H11C10,18 9.2,17.2 9.2,16.2V10C9.2,8.6 10.6,7 12,7Z" />
        </Box>
      );
      break;
    case "equity":
      iconComponent = (
        <Box
          component="svg"
          width="50"
          height="50"
          viewBox="0 0 24 24"
          fill="white"
        >
          {/* Balance/scale icon */}
          <path d="M7,15H9C9,16.08 9.37,17 10,17.5V22H8V19H6V22H4V17.5C4.63,17 5,16.08 5,15H7M16,15H18C18,16.08 18.37,17 19,17.5V22H17V19H15V22H13V17.5C13.63,17 14,16.08 14,15H16M7.5,14L4.5,5H9.5L6.5,14H7.5M16.5,14L13.5,5H18.5L15.5,14H16.5M11,14V10H12.5V14H14V8.5H10V14H11Z" />
        </Box>
      );
      break;
    default:
      iconComponent = null;
  }
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <Box
        sx={{
          width: 100,
          height: 100,
          borderRadius: '50%',
          backgroundColor: colors.main,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative'
        }}
      >
        {iconComponent}
      </Box>
    </Box>
  );
};

// Environmental benefit icons
const BenefitIcon = ({ type }) => {
  const theme = useTheme();
  
  let iconComponent = null;
  switch(type) {
    case "reducing":
      iconComponent = (
        <Box
          component="svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="white"
        >
          <path d="M21.82,15.42L19.32,19.75C18.83,20.61 17.92,21.06 17,21H15V23L12.5,18.5L15,14V16H17.82L15.6,12.15L19.93,9.65L21.73,12.77C22.25,13.54 22.32,14.57 21.82,15.42M9.21,3.06H14.21C15.19,3.06 16.04,3.63 16.45,4.45L17.45,6.19L19.18,5.19L16.54,9.6L11.39,9.69L13.12,8.69L11.71,6.24L9.5,10.09L5.16,7.59L6.96,4.47C7.37,3.64 8.22,3.06 9.21,3.06M5.05,19.76L2.55,15.43C2.06,14.58 2.13,13.56 2.64,12.79L3.64,11.06L1.91,10.06L7.05,10.14L9.7,14.56L7.97,13.56L6.56,16H11V21H7.4C6.47,21.06 5.55,20.61 5.05,19.76Z" />
        </Box>
      );
      break;
    case "conserving":
      iconComponent = (
        <Box
          component="svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="white"
        >
          <path d="M6.05 8.05a7.001 7.001 0 0 0-.02 9.88c1.47-3.4 4.09-6.24 7.36-7.93A15.952 15.952 0 0 0 8 19.25l2 2a17.94 17.94 0 0 1 12.45-7.22c-.2-1.1-.9-2.1-1.9-2.6l-2.5-1.44a3.02 3.02 0 0 1-1.5-2.62v-5.22c0-2.76-2.24-5-5-5S6.5 2.2 6.5 4.96v.03a4.464 4.464 0 0 0-.45 3.06zm7.45 6.45c-4 2.86-6.55 7.14-6.55 12v.5h2c0-4.14 2.33-7.75 5.76-9.6a8.81 8.81 0 0 1-.95-2.45c-.09-.15-.16-.3-.26-.45z" />
        </Box>
      );
      break;
    case "circular":
      iconComponent = (
        <Box
          component="svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="white"
        >
          <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c2.12 0 4.07-.74 5.62-1.97l-2.5-2.5C14.32 17.5 13.21 18 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.21 0 2.32.5 3.12 1.47l2.5-2.5C16.07 3.74 14.12 3 12 3m7 6v-3l-4 4 4 4v-3h3v-2h-3m-7-1c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" />
        </Box>
      );
      break;
    case "spreading":
      iconComponent = (
        <Box
          component="svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="white"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
        </Box>
      );
      break;
  }
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          backgroundColor: '#E7F5F5',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative'
        }}
      >
        {iconComponent}
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
        <Grid container spacing={6} alignItems="stretch">
          {/* Left side - Mission and What We Do */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
              Our Mission
            </Typography>
            <Typography variant="body1" paragraph>
              At our company, we are committed to transforming the way the world thinks about electronic waste. Rooted in the principles of circular economy, clean technology, and community empowerment, we work to give devices a second life—reducing waste and restoring value. We want to close the loop on e-waste by creating accessible, ethical, and sustainable systems for reuse, repair, and recycling.
            </Typography>
            
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', mt: 4 }}>
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
          
          {/* Right side - Team Cards side by side */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={2} sx={{ height: '100%' }}>
              {teamMembers.map((member, index) => (
                <Grid item xs={6} key={index}>
                  <Card 
                    sx={{ 
                      height: '100%',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      borderRadius: 2,
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    {/* Image Section */}
                    <Box sx={{ 
                      position: 'relative',
                      paddingTop: '100%', // 1:1 Aspect ratio
                      backgroundColor: '#f5f5f5'
                    }}>
                      {member.image ? (
                        <Box
                          component="img"
                          src={member.image}
                          alt={member.name}
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center'
                          }}
                        />
                      ) : (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            bgcolor: member.name === "Leila Meyer" ? theme.palette.teal.main : '#f5f5f5'
                          }}
                        >
                          {member.name === "Leila Meyer" ? (
                            <Avatar 
                              sx={{ 
                                width: 80, 
                                height: 80, 
                                bgcolor: theme.palette.teal.main
                              }}
                            >
                              <PersonIcon sx={{ fontSize: 40 }} />
                            </Avatar>
                          ) : (
                            <RecyclingIcon size={80} color="black" />
                          )}
                        </Box>
                      )}
                    </Box>
                    
                    {/* Content Section */}
                    <CardContent sx={{ p: 3, textAlign: 'center' }}>
                      <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
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
                      <Typography variant="subtitle1" color="text.secondary" gutterBottom sx={{ fontWeight: 'medium' }}>
                        {member.title}
                      </Typography>
                      <Typography variant="body2" sx={{ lineHeight: 1.4 }}>
                        {member.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
      
      {/* Why It Matters Section */}
      <Box sx={{ bgcolor: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
            Why Does It Matter?
          </Typography>
          <Typography variant="body1" paragraph sx={{ maxWidth: '800px', mb: 6 }}>
            E-waste is one of the fastest-growing waste streams in the world. Toxic materials can leak into soil and water when improperly disposed of. By choosing RYGNeco, you're making a measurable difference. Our Company represents a future where electronics aren't discarded—they're revived, respected, and reintegrated into the world responsibly...
          </Typography>
        </Container>
        
        {/* Benefits Grid with Full Width Rectangle Background */}
        <Box 
          sx={{ 
            backgroundColor: '#E7F5F5', 
            py: 4,
            mt: 4 
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              {benefits.map((benefit, index) => (
                <Grid item xs={6} sm={3} key={index}>
                  <Box
                    sx={{
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <BenefitIcon type={benefit.type} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 'medium', mt: 2 }}>
                      {benefit.title}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Box>
      
      {/* Values Section */}
      <Container maxWidth="lg" sx={{ py: 8, bgcolor: 'white' }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
          Our Values
        </Typography>
        <Typography variant="body1" paragraph sx={{ maxWidth: '800px', mb: 6 }}>
          At our company, our values guide every step we take. We believe in <strong>sustainability</strong> as a long-term commitment to the planet—not just a quick fix. Our work is grounded in <strong>community</strong>, partnering locally to create jobs, share knowledge, and spark meaningful change. With a focus on <strong>innovation</strong>, we're always looking for smarter, cleaner ways to manage e-waste through thoughtful design and technology. We take <strong>responsibility</strong> seriously, ensuring every device we collect is handled with care—ethically reused, repurposed, or recycled. And at the core of it all is <strong>equity</strong>—because access to clean, affordable technology should be a right, not a privilege.
        </Typography>
      </Container>
      
      {/* Values Icons with Full Width Rectangle Background */}
      <Box 
        sx={{ 
          backgroundColor: '#E7F5F5', 
          py: 4,
          mb: 8
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {values.map((value, index) => (
              <Grid item xs={6} sm={2.4} key={index}>
                <Box
                  sx={{
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <ValueIcon type={value.type} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 'medium', mt: 2 }}>
                    {value.title}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      
      {/* Learn More Section */}
      <Box sx={{ bgcolor: 'white', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                Learn More
              </Typography>
              <Typography variant="body1" paragraph>
                See what we do, why it matters, and how you<br />
                can help create a cleaner, more connected world.
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
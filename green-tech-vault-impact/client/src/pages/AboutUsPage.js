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
  
  let path = "";
  switch(type) {
    case "sustainability":
      path = "M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z";
      break;
    case "community":
      path = "M16 17V19H2V17S2 13 9 13 16 17 16 17M12.5 7.5A3.5 3.5 0 1 0 9 11A3.5 3.5 0 0 0 12.5 7.5M15.94 13A5.32 5.32 0 0 1 18 17V19H22V17S22 13.37 15.94 13M15 4A3.39 3.39 0 0 0 13.07 4.59A5 5 0 0 1 13.07 10.41A3.39 3.39 0 0 0 15 11A3.5 3.5 0 0 0 15 4Z";
      break;
    case "innovation":
      path = "M12,2A7,7 0 0,0 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H15A1,1 0 0,0 16,17V14.74C17.81,13.47 19,11.38 19,9A7,7 0 0,0 12,2M9,21A1,1 0 0,0 10,22H14A1,1 0 0,0 15,21V20H9V21Z";
      break;
    case "responsibility":
      path = "M9,7H15A3,3 0 0,1 18,10A3,3 0 0,1 15,13H13V16H15A1,1 0 0,1 16,17A1,1 0 0,1 15,18H9A1,1 0 0,1 8,17A1,1 0 0,1 9,16H11V13H9A3,3 0 0,1 6,10A3,3 0 0,1 9,7Z";
      break;
    case "equity":
      path = "M12,3L2,12H5V20H19V12H22L12,3M12,8.75L17,12.25V18H15V14H9V18H7V12.25L12,8.75Z";
      break;
    default:
      path = "";
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
        <Box
          component="svg"
          width="50"
          height="50"
          viewBox="0 0 24 24"
          fill="white"
        >
          <path d={path} />
        </Box>
      </Box>
    </Box>
  );
};

// Environmental benefit icons
const BenefitIcon = ({ type }) => {
  const theme = useTheme();
  
  // Define colors for each type
  const getColors = (type) => {
    switch(type) {
      case "reducing":
        return { main: '#62C7CC', light: '#7BD3D8' }; // Light teal
      case "conserving":
        return { main: '#1F5A3E', light: '#2D6B4D' }; // Dark green  
      case "circular":
        return { main: '#7BD3D8', light: '#8EDDEA' }; // Very light teal
      case "spreading":
        return { main: '#1F5A3E', light: '#2D6B4D' }; // Dark green
      default:
        return { main: theme.palette.teal.main, light: theme.palette.teal.light };
    }
  };
  
  const colors = getColors(type);
  
  let path = "";
  switch(type) {
    case "reducing":
      path = "M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z";
      break;
    case "conserving":
      path = "M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z";
      break;
    case "circular":
      path = "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M16.18,7.76L15.12,8.82L14.06,7.76L13,8.82L14.06,9.88L13,10.94L14.06,12L15.12,10.94L16.18,12L17.24,10.94L16.18,9.88L17.24,8.82L16.18,7.76M7.82,12L8.88,10.94L9.94,12L11,10.94L9.94,9.88L11,8.82L9.94,7.76L8.88,8.82L7.82,7.76L6.76,8.82L7.82,9.88L6.76,10.94L7.82,12Z";
      break;
    case "spreading":
      path = "M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z";
      break;
    default:
      path = "";
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
        <Box
          component="svg"
          width="50"
          height="50"
          viewBox="0 0 24 24"
          fill="white"
        >
          <path d={path} />
        </Box>
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
                <Grid item xs={6} key={index} sx={{ height: 'fit-content' }}>
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
                    <Box sx={{ height: 200, position: 'relative' }}>
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
                          onError={(e) => {
                            // Fallback to placeholder if image fails to load
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      {/* Fallback for image loading errors or no image */}
                      {!member.image && (
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
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
                      {/* Hidden fallback for image error */}
                      <Box
                        sx={{
                          display: 'none',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100%',
                          bgcolor: member.name === "Leila Meyer" ? theme.palette.teal.main : '#f5f5f5',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0
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
                    </Box>
                    
                    {/* Content Section */}
                    <CardContent sx={{ flexGrow: 1, p: 2, textAlign: 'center' }}>
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
      <Box sx={{ bgcolor: '#f9f9f9', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
            Why Does It Matter?
          </Typography>
          <Typography variant="body1" paragraph sx={{ maxWidth: '800px', mb: 6 }}>
            E-waste is one of the fastest-growing waste streams in the world. Toxic materials can leak into soil and water when improperly disposed of. By choosing RYGNeco, you're making a measurable difference. Our Company represents a future where electronics aren't discarded—they're revived, respected, and reintegrated into the world responsibly...
          </Typography>
          
          {/* Benefits Grid with Rectangle Background */}
          <Box 
            sx={{ 
              backgroundColor: '#EEF3F3', 
              borderRadius: 2, 
              p: 4, 
              mt: 4 
            }}
          >
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
          </Box>
        </Container>
      </Box>
      
      {/* Values Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
          Our Values
        </Typography>
        <Typography variant="body1" paragraph sx={{ maxWidth: '800px', mb: 6 }}>
          At our company, our values guide every step we take. We believe in <strong>sustainability</strong> as a long-term commitment to the planet—not just a quick fix. Our work is grounded in <strong>community</strong>, partnering locally to create jobs, share knowledge, and spark meaningful change. With a focus on <strong>innovation</strong>, we're always looking for smarter, cleaner ways to manage e-waste through thoughtful design and technology. We take <strong>responsibility</strong> seriously, ensuring every device we collect is handled with care—ethically reused, repurposed, or recycled. And at the core of it all is <strong>equity</strong>—because access to clean, affordable technology should be a right, not a privilege.
        </Typography>
        
        {/* Values Icons with Rectangle Background */}
        <Box 
          sx={{ 
            backgroundColor: '#EEF3F3', 
            borderRadius: 2, 
            p: 4, 
            mt: 4 
          }}
        >
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
        </Box>
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
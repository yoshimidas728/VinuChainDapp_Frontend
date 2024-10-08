import React from 'react';
import {
  Stack,
  ToggleButton,
  Typography,
  Chip,
  Button,
  CardContent,
  CardMedia,
  CardActions,
  Card,
  Input,
  List,
  ListItem,
  Divider,
  ListItemText
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";



const WhatsNewPage = () => {
  const { theme } = useSelector((state) => state.themeReducer);


  return (
    <>
      <Stack px={"20%"} py={"3em"} pb={3} spacing={3} bgcolor= { theme === 'black' ? '#27374D' : ''} >
      <Typography
          sx={{
            fontSize: { lg: "3rem", xs: "20px" },
          }}
          variant="h3"
          fontFamily={"Inter"}
          fontWeight={"bold"}
          style={{textAlign: 'center'}}
          color={theme === 'black' ? '#E4E4E4' : ''}
        >
          Frequently Asked Questions (FAQs)
        </Typography>
        <Stack>
          <Typography fontFamily={"Inter"} mt={3}  color={theme === 'black' ? '#E4E4E4' : ""}>
          <List component="nav" aria-label="mailbox folders">
            <ListItem>
              <ListItemText primary="1. What is Inkspire?"/>
            </ListItem>
            <p>
              Inkspire is a unique social publishing platform by <a style={{textDecoration:"none", color:(theme === 'black' ? '#E4E4E4' : ""), fontWeight:"700"}} href='https://www.makingcents.xyz/index.html'>Making Cents </a>
              that revolutionizes publishing and reading contents while earning cryptocurrency rewards. Inspired by the best aspects of 
              popular platforms, Inkspire combines a seamless user interface and engaging experience, making it the ultimate destination 
              for content creators and readers. Join Inkspire today to be part of a vibrant community and unlock endless possibilities in 
              the world of social publishing.
            </p>
            <Divider />
            <ListItem>
              <ListItemText primary="2. How can I earn cryptocurrency on Inkspire?" />
            </ListItem>
            <p>
              Earning cryptocurrency on Inkspire is as easy as sharing your thoughts and engaging with our vibrant community. 
              As a writer, the more likes, comments, and interactions your articles receive, the more crypto rewards you'll earn. 
              Our innovative reward mechanism ensures that your hard work and creativity are recognized and proportionally rewarded. 
              So, whether you're a seasoned writer or just getting started, 
              Inkspire offers an exciting opportunity to express yourself and earn crypto while doing what you love.
            </p>
            <Divider />
            <ListItem>
              <ListItemText primary="3. How can readers earn rewards on Inkspire?" />
            </ListItem>
            <p>
              At Inkspire, we believe that active readers deserve recognition too! That's why we've implemented a rewarding 
              experience for our avid readers. With our pay-per-impression model, you earn cryptocurrency simply by indulging 
              in captivating articles. The more articles you read and engage with, the more crypto rewards you accumulate. 
              So, dive into our diverse range of content, expand your horizons, and be part of the rewarding journey on Inkspire. 
              Start reading to start earning!
            </p>
            <Divider />
            <ListItem>
              <ListItemText primary="4. Is there a cost to use Inkspire?" />
            </ListItem> 
            <p>
              No, Inkspire is completely free to use. We believe in providing a platform that is accessible to all writers, readers, and 
              cryptocurrency enthusiasts without any financial barriers. From signing up to publishing, reading, and earning cryptocurrency, 
              there are no hidden fees or charges. Additionally, connecting your Vite wallet, which you can do for free, enables you to 
              seamlessly withdraw your earnings without incurring any fees. 
              Join us on Inkspire today and experience the freedom to express, engage, and earn without spending a single cent!
            </p>
            <Divider />
            <ListItem>
              <ListItemText primary="5. How do I register my VITE wallet address on Inkspire?" />
            </ListItem> 
            <p>
              Registering your VITE wallet address is a simple process on Inkspire. Within your user account settings, you will find an 
              option to link your VITE wallet. 
              Follow the instructions provided to complete the registration process, enabling seamless transactions and rewards distribution.
            </p>
            <Divider />
            <ListItem>
              <ListItemText primary="6. Can I share my articles on social media?" />
            </ListItem> 
            <p>
              Absolutely! Inkspire encourages you to share your articles on social media platforms.
              By sharing your content, you can attract more readers and increase your engagement, leading to higher rewards.
            </p>
            <Divider />
            <ListItem>
              <ListItemText primary="7. How can I ensure the integrity of my account on Inkspire?" />
            </ListItem> 
            <p>
              At Inkspire, we prioritize account integrity and security. We implement measures to block VPNs and alternate accounts, 
              ensuring a secure and authentic user experience. Rest assured that your account and information are protected.
            </p>
            <Divider />
            <ListItem>
              <ListItemText primary="8. How can I contact the support team if I have further questions or issues?" />
            </ListItem> 
            <p>
              If you have any questions, concerns, or issues, our support team is here to assist you. You can reach out to us 
              <a style={{textDecoration:"none", color:(theme === 'black' ? '#E4E4E4' : ""), fontWeight:"700"}} href='https://www.makingcents.xyz/contact.html'> HERE </a>, and we will respond to your inquiry as soon as possible.
            </p>
            <Divider />
          </List>
          </Typography>
        </Stack>
      </Stack>
    </>
  )

}

export default WhatsNewPage;
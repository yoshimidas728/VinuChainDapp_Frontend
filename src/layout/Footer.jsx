import styled from "@emotion/styled";
import {
  IconButton,
  Link,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import Discord from "../assets/images/discord.png";
import Youtube from "../assets/images/youtube.png";
import Logo from "../assets/images/inkspire_logo_final.png";
import Instagram from "../assets/images/Instagram.svg";

const HoverTypography = styled(Typography)(({ theme }) => ({
  "&:hover": {
    color: "black",
    backgroundColor: "white",
    borderRadius: "10px",
  },
}));
const footerSocialIcons = [
  { icon: <a href="https://instagram.com/bemakingcents"><img src={Instagram} alt="" /></a>, value: "instaUrl" },
  { icon: <a href="https://www.youtube.com/@BeMakingCent"><img width={40} src={Youtube} alt="" /></a>, value: "youtubeUrl" },
  { icon: <a href="https://discord.gg/makingcents"><img width={40} src={Discord} alt="" /></a>, value: "discordUrl" },
];

const Footer = (props) => {
  return (
    <Stack minHeight={"10vh"} bgcolor="black" px={4} py={2}>
      <Stack  
        direction={["column","column","row","row"]} 
        justifyContent={["center","space-between","space-between","space-between"]} 
        color="white"
      >
        <Stack sx={{ position: "relative" }}>
          <Typography variant="body2" color="white" display={["none","block","block","block"]}>
            {"Copyright © "}
            <Link
              underline="none"
              color="inherit"
              href="/"
            >
              Inkspire
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
          <Typography
          >
            <img src={`${Logo}`} style={{ width: "12rem" }} />
          </Typography>
        </Stack>
        <Stack direction={["column","column","row","row"]} spacing={3}>
          <Stack>
            <Typography display={["none","block","block","block"]} fontWeight="bold" mb={2} padding={1}>
              Pages
            </Typography>
            <HoverTypography
              padding={1}
              sx={{ cursor: "pointer" }}
              color="white"
              onClick={() => window.location.replace("https://www.makingcents.xyz/index.html")}
            >
              About Us
            </HoverTypography>
            <HoverTypography
              padding={1}
              sx={{ cursor: "pointer" }}
              color="white"
              onClick={() => window.location.replace("/faqs")}
            >
              FAQs
            </HoverTypography>
            <HoverTypography
              padding={1}
              sx={{ cursor: "pointer" }}
              color="white"
              onClick={() => window.location.replace("/login")}
            >
              Membership
            </HoverTypography>
          </Stack>

          <Stack display={{ xs: "none", sm: "inherit" }}>
            <Typography fontWeight="bold" mb={2} padding={1}>
              Social
            </Typography>
            <Stack
              flexDirection="row"
              justifyContent={{ xs: "center", sm: "inherit" }}
            >
              {footerSocialIcons.map(({ icon, value }, i) => (
                <ListItem key={i} disablePadding sx={{ width: "fit-content" }}>
                  <ListItemButton sx={{ padding: "0 !important" }}>
                    <ListItemIcon
                      sx={{ color: "#FFFFFF", justifyContent: "center" }}
                    >
                      {icon}
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Stack
        flexDirection="row"
        justifyContent={"center"}
        display={{ xs: "inherit", sm: "none" }}
      >
        {footerSocialIcons.map(({ icon, value }, i) => (
          <ListItem key={i} disablePadding sx={{ width: "fit-content" }}>
            <ListItemButton sx={{ padding: "0 !important" }}>
              <ListItemIcon sx={{ color: "#FFFFFF", justifyContent: "center" }}>
                {icon}
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        ))}
      </Stack>
    </Stack>
  );
};

export default Footer;

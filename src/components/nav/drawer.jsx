import { Box, Divider, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { navItems } from "../../data/nav/menuData";

const DrawerContent =({handleDrawerToggle})=>{
    return (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
      {"Cryptolyzed"}
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name.replace(/ /g, '-')} disablePadding>
            <NavLink key={item.name.replace(/ /g, '-')} to={item.url} className="navlink">
            <ListItemButton key={item.name.replace(/ /g, '-')}  sx={{ px: 3 }}>
              <ListItemText key={item.name.replace(/ /g, '-')} primary={item.name} />
            </ListItemButton>
            </NavLink>
          </ListItem>
        ))}
      </List>
    </Box>
  )};


  export default DrawerContent;
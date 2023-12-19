import React, { useState, useContext  } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import HomeIcon from "@mui/icons-material/Home"
import FavoriteIcon from '@mui/icons-material/Favorite';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import ListIcon from '@mui/icons-material/List';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import PersonIcon from '@mui/icons-material/Person';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import MovieIcon from '@mui/icons-material/Movie';
import LoginIcon from '@mui/icons-material/Login';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { AuthContext } from "../../contexts/authContext";





const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = ({ history }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  
  const navigate = useNavigate();
  const { signout, userEmail } = useContext(AuthContext);


  const menuOptions = [
    { icon: < HomeIcon/>, label: "Home", path: "/" },
    { icon: <FavoriteIcon/>, label: "Favourites", path: "/movies/favorites" },
    { icon: <UpcomingIcon/> ,label: "Upcoming", path: "/movies/upcoming" },
    { icon: <ListIcon/> ,label: "WatchList", path: "/movies/watchList" },
    { icon: <NewReleasesIcon/> ,label: "Latest", path: "/movies/latest" },
    { icon: <LocalFireDepartmentIcon/> ,label: "Popular", path: "/movies/popular" },
  ];

  const menuPopular = [
    { icon: <PersonIcon/> ,label: "Trending Actors", path: "/actors/trending/day" },
    { icon: <MovieIcon/> ,label: "Trending Movies", path: "/movies/trending/day" },

  ];

  const handleMenuSelect = (pageURL) => {
    // If the user clicks Logout, sign them out
    if (pageURL === "/logout") {
      signout();
      navigate("/login");
    } else {
      navigate(pageURL, { replace: true });
    }
    setAnchorEl(null);
  };

  const handleTrendingMenuSelect = (pageURL) => {
    navigate(pageURL, { replace: true });
    setAnchorEl(null); // Close the menu after navigation
    window.location.reload()
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };  

  return (
    <>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            TMDB Client
          </Typography>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            All you ever wanted to know about Movies!
          </Typography>

          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {menuOptions.map((opt) => (
                  <MenuItem key={opt.label} onClick={() => handleMenuSelect(opt.path)}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <>
              {menuOptions.map((opt) => (
                <MenuItem key={opt.label} onClick={() => handleMenuSelect(opt.path)}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    {opt.icon}
                    <Typography variant="caption">{opt.label}</Typography>
                  </div>
                </MenuItem>
              ))}

              <>
                <IconButton
                  aria-label="menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <SignalCellularAltIcon />
                    <Typography variant="caption">Trending</Typography>
                  </div>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                >
                  {menuPopular.map((opt) => (
                    <MenuItem key={opt.label} onClick={() => handleTrendingMenuSelect(opt.path)}>
                      {opt.icon}
                      {opt.label}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            </>
          )}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginLeft: "auto" }}>
            {userEmail ? (
              <>
                <IconButton onClick={() => handleMenuSelect("/profile")} color="inherit">
                  <PersonIcon />
                  <Typography variant="caption">Profile</Typography>
                </IconButton>
                <IconButton onClick={() => handleMenuSelect("/logout")} color="inherit">
                  <LoginIcon />
                  <Typography variant="caption">Logout</Typography>
                </IconButton>
              </>
            ) : (
              <>
                <IconButton onClick={() => handleMenuSelect("/login")} color="inherit">
                  <LoginIcon />
                  <Typography variant="caption">Login</Typography>
                </IconButton>
                <IconButton onClick={() => handleMenuSelect("/signup")} color="inherit">
                  <EditNoteIcon />
                  <Typography variant="caption">Signup</Typography>
                </IconButton>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;

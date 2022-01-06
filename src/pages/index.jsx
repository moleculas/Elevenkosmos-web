import React, { Fragment, useEffect, useState } from 'react';
import Fab from '@material-ui/core/Fab';
import MenuIcon from '@material-ui/icons/Menu';
import Popover from '@material-ui/core/Popover';
import { Box, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Link } from "gatsby";
import useMediaQuery from '@material-ui/core/useMediaQuery';

//carga componentes
import MenuPages from '../components/menuPages';
import Seo from "../components/seo";

//estilos
import Clases from "../styles/clases";

const IndexPage = () => {

  const classes = Clases();
  const esDesktop = useMediaQuery(theme => theme.breakpoints.up('lg'));
  const esTablet = useMediaQuery(theme => theme.breakpoints.up('sm'));

  //states

  const [anchorElMenuPrincipal, setAnchorElMenuPrincipal] = useState(null);
  const [tiempo, SetTiempo] = useState(false);

  //useEffect

  useEffect(() => {
    const timer = setTimeout(() => {
      SetTiempo(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  //funciones

  const handleClickMenuPrincipal = (e) => {
    setAnchorElMenuPrincipal(anchorElMenuPrincipal ? null : e.currentTarget);
  };

  const handleCloseMenuPrincipal = () => {
    setAnchorElMenuPrincipal(null);
  };
  return (
    <Fragment>
      {tiempo ? (
        <Fragment>
          <Seo title="Home" />
          <div className={classes.content}>
            <Fab
              className={classes.posFixed}
              style={{ zIndex: 4 }}
              color="primary"
              onClick={handleClickMenuPrincipal}
            >
              <MenuIcon />
            </Fab>
            <Popover
              id="customized-menu2"
              open={Boolean(anchorElMenuPrincipal)}
              anchorEl={anchorElMenuPrincipal}
              onClose={handleCloseMenuPrincipal}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              disableScrollLock={true}
              classes={{ paper: classes.popoverPaper }}
            >
              <MenuPages />
            </Popover>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center">
              <Grid item xs={12} md={10} lg={9}>
                <Box
                  style={{ padding: 16, marginTop: 64 }}
                >
                  <Typography variant={esDesktop || esTablet ? "h1" : "h2"} className={classes.blanc} style={esDesktop || esTablet ? { fontWeight: 300 } : { fontWeight: 300, wordWrap: 'break-word' }}>
                    Hello, We're elevenkosmos
                  </Typography>
                  <br />
                  <Typography variant="h4" className={classes.blanc} style={{ fontWeight: 300 }}>Opening Up Digital Fiction, Art & Web Experiences for the next generation of readers.</Typography>
                </Box>
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  style={{ padding: 16, marginTop: 32 }}
                  spacing={2}
                >
                  <Grid item xs={12} md={6} lg={6}>
                    <Link to='/digitalLiterature'>
                      <Box className={classes.box1}>
                        <Typography variant="body1" className={classes.blanc} style={{ fontWeight: 300 }}>`id` varchar(50) NOT NULL COMMENT 'A reference to the associated item.', `context` varchar(50) NOT NULL COMMENT 'The context of the associated item.', `key` char(32) NOT NULL COMMENT.</Typography>
                        <br />
                        <Typography variant="h5" className={classes.blanc} style={{ fontWeight: 300 }}>DIGITAL LITERATURE</Typography>
                      </Box>
                    </Link>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <Link to='/nfts'>
                      <Box className={classes.box2}>
                        <Typography variant="body1" className={classes.blanc} style={{ fontWeight: 300 }}>These NFTs represent a full decade of work, they show the foundational moments of our motivations. Holders of these NFTs will come to realize their magic utility.</Typography>
                        <br />
                        <Typography variant="h5" className={classes.blanc} style={{ fontWeight: 300 }}>NFTs COLLECTION</Typography>
                      </Box>
                    </Link>
                  </Grid>
                  <Box
                    style={{ padding: 16, marginTop: 48 }}
                  >
                    <Typography variant="h2" className={classes.blanc} style={{ fontWeight: 300 }}>About</Typography>
                    <br />
                    <Typography variant="h4" className={classes.blanc} style={{ fontWeight: 300 }}>We are the pourers of our own creative universe.</Typography>
                    <Typography variant="h6" className={classes.blanc} style={{ fontWeight: 300 }}>We make ourselves outside the limits of common thought. We ride the crest of the metaverse wave, driving the initiatives that shape our stories. Generative, scalable and unique artificial intelligence at the service of Homo Cognos.</Typography>
                  </Box>
                  <Box
                    style={{ padding: 16, marginTop: 48 }}
                  >
                    <Typography variant="h2" className={classes.blanc} style={{ fontWeight: 300 }}>Get in touch</Typography>
                    <br />
                    <Typography variant="h6" className={classes.blanc} style={{ fontWeight: 300 }}>Say <a href="mailto:info@elevenkosmos.net">Hi</a> or find me on other platforms: <a href="https://twitter.com/11kosmos" target="_blank">Twitter</a>.</Typography>
                  </Box>
                </Grid>
                <Box
                  p={2}
                  mt={7}
                  style={{ textAlign: 'center' }}
                >
                  <Typography variant="body2" className={classes.blanc} style={{ fontWeight: 300 }}>Copyleft U+1F12F {new Date().getFullYear()}. Creation license released.</Typography>
                </Box>
              </Grid>
            </Grid>
          </div>
        </Fragment >
      ) : null}
    </Fragment >
  )
}

export default IndexPage

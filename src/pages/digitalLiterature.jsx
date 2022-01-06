import React, { Fragment, useEffect, useState } from 'react';
import Seo from "../components/seo";
import { Box, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Link } from "gatsby";
import useMediaQuery from '@material-ui/core/useMediaQuery';

//estilos
import Clases from "../styles/clases";

const DigitalLiterature = () => {

  const classes = Clases();
  const esDesktop = useMediaQuery(theme => theme.breakpoints.up('lg'));
  const esTablet = useMediaQuery(theme => theme.breakpoints.up('sm'));
  const [tiempo, SetTiempo] = useState(false);

  //useEffect

  useEffect(() => {
    const timer = setTimeout(() => {
      SetTiempo(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);


  return (
    <Fragment>
      {tiempo ? (
        <Fragment>
          <Seo title="Digital Literature" />
          <div className={classes.content}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center">
              <Grid item xs={12} md={10} lg={9}>
                <Box
                  style={{ marginTop: 64, padding: 16 }}
                >
                  <Typography variant={esDesktop || esTablet ? "h1" : "h2"} className={classes.blanc} style={esDesktop || esTablet ? { fontWeight: 300 } : { fontWeight: 300, wordWrap: 'break-word' }}>
                    Under construction
                  </Typography>
                  <br />
                  <Typography variant="h6" className={classes.blanc} style={{ fontWeight: 300 }}>Go back to <Link to="/">homepage</Link>.</Typography>
                </Box>
              </Grid>
            </Grid>
          </div>
        </Fragment>
      ) : null}
    </Fragment>
  )
}

export default DigitalLiterature

import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import MenuIcon from '@material-ui/icons/Menu';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import Popover from '@material-ui/core/Popover';

//carga componentes
import Seo from '../components/seo';
import NftItem from "../components/nftItem";
import MenuPages from '../components/menuPages';

//estilos
import Clases from "../styles/clases";

//importaciones acciones
import { obtenerNftsAccion } from '../redux/appDucks';

let defaultHeight;
let defaultWidth;
if (typeof window !== `undefined`) {
  defaultHeight = window.innerHeight
  defaultWidth = window.innerWidth
}

//snackbar y alert
const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const perPage = 6;

const Nfts = () => {

  const classes = Clases();
  const dispatch = useDispatch();
  const listadoNftsGeneral = useSelector(store => store.variablesApp.arrayNfts);
  const errorDeCargaNfts = useSelector(store => store.variablesApp.errorDeCargaNfts);

  //states

  const [dimScreen, setDimScreen] = useState({ width: defaultWidth, height: defaultHeight });
  const [openSnack, setOpenSnack] = useState(false);
  const [alert, setAlert] = useState({});
  const [page, setPage] = useState(0);
  const [listadoNfts, setListadoNfts] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [visibleLoading, setVisibleLoading] = useState('visible');
  const [anchorElMenuPrincipal, setAnchorElMenuPrincipal] = useState(null);
  const [arrayObjectsRandomized, setArrayObjectsRandomized] = useState([]);const [tiempo, SetTiempo] = useState(false);

  //useEffect

  useEffect(() => {
      const timer = setTimeout(() => {
          SetTiempo(true);
      }, 100);
      return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    document.body.onscroll = (e) => {
      const bottom = e.target.scrollingElement.scrollHeight - e.target.scrollingElement.scrollTop === e.target.scrollingElement.clientHeight;
      if (page === totalPages - 1) {
        setVisibleLoading('hidden');
      };
      if (bottom) {
        if (page < totalPages) {
          setPage(page + 1);
        }
      }
    }
  }, [page, totalPages]);

  useEffect(() => {
    const handler = () => setDimScreen({
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
    })

    window.addEventListener(`resize`, handler)
    return () => window.removeEventListener(`resize`, handler)
  }, []);

  useEffect(() => {
    if (listadoNftsGeneral.length === 0) {
      let componentMounted = true;
      const fetchData = () => {
        //you async action is here
        if (componentMounted) {
          dispatch(obtenerNftsAccion('nfts'));
        }
      };
      fetchData();
      return () => {
        componentMounted = false;
      }
    };
  }, [dispatch]);

  useEffect(() => {
    if (listadoNftsGeneral.length > 0) {
      updateNfts(page);
      setTotalPages(parseInt(listadoNftsGeneral.length / perPage));
      let myArray = [];
      listadoNftsGeneral.forEach((nft, index) => {
        let randomize = generateRandom();
        myArray.push({ randomColor: randomize[0], oppositeColor: randomize[1], randomCharacter: randomize[2], randomNumber: randomize[3] })
      });
      setArrayObjectsRandomized(myArray);
    };
  }, [listadoNftsGeneral]);

  useEffect(() => {
    updateNfts(page);
  }, [page]);

  useEffect(() => {
    if (errorDeCargaNfts) {
      setAlert({
        mensaje: "Error de conexión con la base de datos.",
        tipo: 'error'
      })
      setOpenSnack(true);
    }
  }, [errorDeCargaNfts]);

  //funciones    

  const handleClickMenuPrincipal = (e) => {
    setAnchorElMenuPrincipal(anchorElMenuPrincipal ? null : e.currentTarget);
  };

  const handleCloseMenuPrincipal = () => {
    setAnchorElMenuPrincipal(null);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };

  const updateNfts = (page) => {
    const arrayNfts = [...listadoNfts];
    let posicionInicial = page * perPage;
    let offset = posicionInicial + perPage;
    listadoNftsGeneral.map((nft, index) => {
      if ((index >= posicionInicial && index < offset)) {
        arrayNfts.push(nft)
      };
    });
    setListadoNfts(arrayNfts);
  };

  const generateRandom = () => {
    const threshold = 130;
    let preRandomColor;
    preRandomColor = Math.floor(Math.random() * 0x1000000);
    preRandomColor = preRandomColor.toString(16);
    preRandomColor = ("000000" + preRandomColor).slice(-6);
    const randomColor = "#" + preRandomColor;
    let hRed = parseInt(preRandomColor.substring(0, 2), 16);
    let hGreen = parseInt(preRandomColor.substring(2, 4), 16);
    let hBlue = parseInt(preRandomColor.substring(4, 6), 16);
    const cBrightness = ((hRed * 299) + (hGreen * 587) + (hBlue * 114)) / 1000;
    let oppositeColor;
    if (cBrightness > threshold) { oppositeColor = "#000000"; } else { oppositeColor = "#ffffff"; };
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const randomCharacter = alphabet[Math.floor(Math.random() * alphabet.length)];
    const numbers = "0123456789";
    const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
    return [randomColor, oppositeColor, randomCharacter, randomNumber];
  };

  //retorno componentes

  const generateNft = (nft, index) => {
    return (
      <Grid key={'nft' + index} item xs={12} sm={6} md={4} lg={4}>
        <NftItem prNft={nft} prObjectRandomize={arrayObjectsRandomized[index]} prDimScreen={dimScreen} prEsCaroussel={false} />
      </Grid>
    )
  };

  return (
    <Fragment>
      {tiempo ? (
        <Fragment>
          <Seo title="NFTs Gallery" />
          <div className={classes.content} >
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
                  p={2}
                  mt={8}
                >
                  <Typography variant="h2" className={classes.blanc}>NFTs Collection</Typography>
                  <br />
                  <Typography variant="body1" className={classes.blanc} style={{ fontWeight: 300 }}>Metaverse Consumables: These digital literary pieces provide their holders with various sensory experiences on different worlds while acting as a key to unleashing the imaginative potential of the blockchain in the form of a metaphysical game.</Typography>
                </Box>
                <Grid
                  container
                  style={{ display: 'flex', flexDirection: 'row', padding: 16 }}
                  spacing={3, 5}
                >
                  {listadoNfts.map((nft, index) => (
                    generateNft(nft, index)
                  ))}
                </Grid>
              </Grid>
            </Grid>
            <Grid container item xs={12} justifyContent="center">
              <Box
                mt={4}
                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                visibility={visibleLoading}
              >
                <CircularProgress className={classes.blanc} size={30} />
                <Typography variant="body2" className={classes.blanc} style={{ paddingLeft: 15, fontWeight: 300 }}>Loading...</Typography>
              </Box>

            </Grid>
          </div>
          <Snackbar open={openSnack} autoHideDuration={5000} onClose={handleCloseSnack}>
            <Alert severity={alert.tipo} onClose={handleCloseSnack}>
              {alert.mensaje}
            </Alert>
          </Snackbar>
        </Fragment>
      ) : null}
      {/* {console.log(arrayObjectsRandomized)} */}
    </Fragment>
  )
}

export default Nfts

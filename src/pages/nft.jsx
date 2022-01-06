import React, { useState, useEffect, useCallback, Fragment, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import MenuIcon from '@material-ui/icons/Menu';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Badge from '@material-ui/core/Badge';
import ImageViewer from 'react-simple-image-viewer';
import Tooltip from '@material-ui/core/Tooltip';
import ShareIcon from '@material-ui/icons/Share';
import Menu from '@material-ui/core/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkIcon from '@material-ui/icons/Link';
import { FacebookShareButton, TwitterShareButton } from "react-share";
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Popover from '@material-ui/core/Popover';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { navigate } from "gatsby";
import useMediaQuery from '@material-ui/core/useMediaQuery';

//carga componentes
import Iframe from '../components/iframe';
import MenuPages from '../components/menuPages';
import NftItem from "../components/nftItem";
import Seo from "../components/seo";

//estilos
import Clases from "../styles/clases";

//importaciones acciones
import { obtenerNftsAccion } from '../redux/appDucks';
import { actualizarLikesAccion } from '../redux/appDucks';
import { checkearKeyAccion } from '../redux/appDucks';
import { setCambiamosItemNftAccion } from '../redux/appDucks';

const { getEthPriceNow } = require('get-eth-price');

let defaultHeight;
let defaultWidth;
if (typeof window !== `undefined`) {
    defaultHeight = window.innerHeight
    defaultWidth = window.innerWidth
}

//snackbar y alert
const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

//transition
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

//menu
const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const Nft = ({ location }) => {

    const classes = Clases();
    const esDesktop = useMediaQuery(theme => theme.breakpoints.up('lg'));
    const esTablet = useMediaQuery(theme => theme.breakpoints.up('sm'));
    const dispatch = useDispatch();
    const listadoNftsGeneral = useSelector(store => store.variablesApp.arrayNfts);
    const openLoading = useSelector(store => store.variablesApp.loadingApp);
    const errorDeCargaNfts = useSelector(store => store.variablesApp.errorDeCargaNfts);
    const exitoCheckearKey = useSelector(store => store.variablesApp.exitoCheckearKey);
    const cambiamosItemNft = useSelector(store => store.variablesApp.cambiamosItemNft);
    const objetoDevueltoKey = useSelector(store => store.variablesApp.objetoDevueltoKey);
    const params = new URLSearchParams(location.search);

    //states

    const [dimScreen, setDimScreen] = useState({ width: defaultWidth, height: defaultHeight });
    const [openSnack, setOpenSnack] = useState(false);
    const [alert, setAlert] = useState({});
    //const [nftHeight, setNftHeight] = useState((dimScreen.height) - 150);
    const [imageIsLoading, setImageIsLoading] = useState(true);
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [images, setImages] = useState([]);
    const [valorEuros, setValorEuros] = useState(null);
    const [anchorElMenu, setAnchorElMenu] = useState(null);
    const [checked, setChecked] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [valuesForm, setValuesForm] = useState({ key: '' });
    const [openDialogFrame, setOpenDialogFrame] = useState(false);
    const [anchorElMenuPrincipal, setAnchorElMenuPrincipal] = useState(null);
    const [nftsCaroussel, setNftsCaroussel] = useState([]);
    const [cargamosCaroussel, setCargamosCaroussel] = useState(false);
    const [elId, setElID] = useState(parseInt(params.get("id") - 1));
    const [nftAGestionar, setNftAGestionar] = useState({});
    const [disabledRightButton, setDisabledRightButton] = useState(false);
    const [disabledLeftButton, setDisabledLeftButton] = useState(false);
    const [likes, setLikes] = useState(null);
    const [datosLiberados, setDatosLiberados] = useState([
        { id: 1, titulo: 'A hug without breath', urlKey: '/protected/c4afce41f8f9c2fc4e19eac44dfcb65c/' },
        { id: 27, titulo: 'La suerte del perfil anonimizador', urlKey: '/protected/7d8832a7e84bc7ec27be0ad190c048ef/' }
    ]);
    const [renderizamos, setRenderizamos] = useState(false);
    const [tiempo, SetTiempo] = useState(false);

    //useEffect

    useEffect(() => {
        const timer = setTimeout(() => {
            SetTiempo(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

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
            dispatch(obtenerNftsAccion('nfts'));
        };
    }, [dispatch]);

    useEffect(() => {
        document.body.classList.add(classes.forceScroll);
    }, []);

    useEffect(() => {
        if (listadoNftsGeneral.length > 0) {
            verificaExisteItem(elId + 1);
        };
    }, [listadoNftsGeneral]);

    useEffect(() => {
        if (renderizamos) {
            setNftAGestionar(listadoNftsGeneral[elId]);
        };
    }, [renderizamos, nftAGestionar]);

    useEffect(() => {
        if (cambiamosItemNft.valor) {
            setCargamosCaroussel(false);
            setElID(parseInt(cambiamosItemNft.id) - 1);
            setNftAGestionar({});
            dispatch(setCambiamosItemNftAccion(false, null));
        }
    }, [cambiamosItemNft]);

    useEffect(() => {
        let myArray = [];
        let myArrayResultado = [];
        listadoNftsGeneral.forEach((nft, index) => {
            if ((nft.coleccion === listadoNftsGeneral[elId].coleccion) && (nft.id !== listadoNftsGeneral[elId].id)) {
                myArray.push(nft);
            }
        });
        for (let i = 0; i < 5; i++) {
            let idx = Math.floor(Math.random() * myArray.length);
            myArrayResultado.push(myArray[idx]);
            myArray.splice(idx, 1);
        };
        setNftsCaroussel(myArrayResultado);
        if (nftAGestionar.imagen) {
            getMeta(nftAGestionar.imagen);
            setImages([nftAGestionar.imagen]);
            getEthPriceNow()
                .then(data => {
                    const valores = (Object.values(data));
                    const objA = valores[0]
                    const { ETH: { EUR } } = objA
                    setValorEuros(EUR);
                });
            setTimeout(() => {
                setCargamosCaroussel(true)
            }, 666);
        };
        if (nftAGestionar.likes) {
            setLikes(nftAGestionar.likes);
        };
        if (elId <= 0) {
            setDisabledLeftButton(true);
        } else {
            setDisabledLeftButton(false);
        };
        if (elId >= listadoNftsGeneral.length - 1) {
            setDisabledRightButton(true);
        } else {
            setDisabledRightButton(false);
        };
    }, [nftAGestionar]);

    useEffect(() => {
        if (errorDeCargaNfts) {
            setAlert({
                mensaje: "Error de conexión con la base de datos.",
                tipo: 'error'
            })
            setOpenSnack(true);
        }
    }, [errorDeCargaNfts]);

    useEffect(() => {
        if (exitoCheckearKey === 'no') {
            setAlert({
                mensaje: "Invalid key. Try again.",
                tipo: 'error'
            })
            setOpenSnack(true);
        };
        if (exitoCheckearKey === 'si') {
            handleClickOpenDialogFrame();
        };
    }, [exitoCheckearKey]);

    //funciones    

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
    };

    const getMeta = (url) => {
        const img = new Image();
        img.src = url;
        img.onload = function () { setImageIsLoading(false) }
    };

    const openImageViewer = useCallback((index) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    }, []);

    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };

    const handleLikesClick = () => {
        setLikes(likes + 1);
        dispatch(actualizarLikesAccion('nfts', nftAGestionar.id, parseInt(likes + 1)));
    };

    const handleClickMenu = (e) => {
        setAnchorElMenu(anchorElMenu ? null : e.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorElMenu(null);
    };

    const handleClickMenuPrincipal = (e) => {
        setAnchorElMenuPrincipal(anchorElMenuPrincipal ? null : e.currentTarget);
    };

    const handleCloseMenuPrincipal = () => {
        setAnchorElMenuPrincipal(null);
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(location.href);
        setAlert({
            mensaje: "Link copied!",
            tipo: 'success'
        })
        setOpenSnack(true);
        handleCloseMenu();
    };

    const toggleChecked = () => {
        if (!checked) {
            if (nftAGestionar.estado === 'liberado') {
                handleClickOpenDialogFrame();
            } else {
                handleClickOpenDialog();
            }
        }
        setChecked((prev) => !prev);
    };

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setChecked((prev) => !prev);
    };

    const handleClickOpenDialogFrame = () => {
        setOpenDialogFrame(true);
    };

    const handleCloseDialogFrame = () => {
        setOpenDialogFrame(false);
        setChecked((prev) => !prev);
    };

    const handleChangeForm = (prop) => (e) => {
        setValuesForm({ ...valuesForm, [prop]: e.target.value });
    };

    const procesarDatos = () => {
        //e.preventDefault();
        if (!valuesForm.key.trim()) {
            setAlert({
                mensaje: "Complete the form. Data is empty.",
                tipo: 'error'
            })
            setOpenSnack(true)
            return
        };
        dispatch(checkearKeyAccion('nfts', nftAGestionar.id, valuesForm.key));
    };

    const handleClickNavigation = (direction) => {
        if (direction === 'right') {
            dispatch(setCambiamosItemNftAccion(true, elId + 2));
            navigate(`../nft?id=${elId + 2}`);
        } else {
            dispatch(setCambiamosItemNftAccion(true, elId));
            navigate(`../nft?id=${elId}`);
        }
    };

    const gestionDatosLiberados = (id, tipo) => {
        switch (id) {
            case 1:
                if (tipo === 'titulo') {
                    return datosLiberados[0].titulo;
                } else {
                    return datosLiberados[0].urlKey;
                };
                break;
            case 27:
                if (tipo === 'titulo') {
                    return datosLiberados[1].titulo;
                } else {
                    return datosLiberados[1].urlKey;
                };
                break;
            default:
        }
    };

    const verificaExisteItem = (id) => {
        if (listadoNftsGeneral.filter(function (e) { return e.id === id; }).length <= 0) {
            navigate(`../404`);
        } else {
            setRenderizamos(true);
        }
    };

    return (
        <Fragment>
            {tiempo ? (
                <Fragment>
                    {renderizamos ? (
                        <Fragment>
                            <Seo title={nftAGestionar.nombre || ''} />
                            <Backdrop className={classes.loading} open={openLoading}>
                                <CircularProgress color="inherit" />
                            </Backdrop>
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
                                    alignItems="flex-start">
                                    <Grid item xs={12} sm={10} md={4} lg={4}>
                                        <Box
                                            p={2}
                                            mt={6}
                                        >
                                            {imageIsLoading ? (
                                                <Box
                                                    className={classes.centrado}
                                                >
                                                    <CircularProgress className={classes.blanc} />
                                                </Box>
                                            ) : (
                                                <Box
                                                    style={esDesktop ? { maxWidth: "90%" } : { maxWidth: "100%" }}
                                                >
                                                    <Box
                                                        style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", borderTop: '1px solid', borderLeft: '1px solid', borderRight: '1px solid', borderTopColor: "rgba(255, 255, 255, 0.2)", borderLeftColor: "rgba(255, 255, 255, 0.2)", borderRightColor: "rgba(255, 255, 255, 0.2)", borderTopLeftRadius: 10, borderTopRightRadius: 10, padding: 5 }}
                                                    >
                                                        <IconButton
                                                            onClick={handleLikesClick}
                                                        >
                                                            <FavoriteIcon className={classes.blanc} style={{ marginRight: 5 }} />
                                                        </IconButton>
                                                        <Badge
                                                            color="error"
                                                            badgeContent={likes}
                                                            showZero
                                                            anchorOrigin={{
                                                                vertical: 'bottom',
                                                                horizontal: 'right',
                                                            }}
                                                        >
                                                        </Badge>
                                                    </Box>
                                                    {images.map((src, index) => (
                                                        <img
                                                            src={src}
                                                            onClick={() => openImageViewer(index)}
                                                            key={index}
                                                            className={classes.image}
                                                            alt=""
                                                        />
                                                    ))}
                                                </Box>
                                            )}
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={10} md={5} lg={5} style={{ padding: 16 }}>
                                        <Box
                                            p={2}
                                            mt={6}
                                            className={classes.boxFramed}
                                        >
                                            <Box style={{ marginLeft: 10 }}>
                                                <Fab
                                                    className={classes.posFixedLeft}
                                                    style={{ zIndex: 4 }}
                                                    color="primary"
                                                    onClick={() => handleClickNavigation('left')}
                                                    size='small'
                                                    disabled={disabledLeftButton}
                                                >
                                                    <ArrowBackIosIcon />
                                                </Fab>
                                                <Fab
                                                    className={classes.posFixedLeft}
                                                    style={{ zIndex: 4, marginLeft: 10 }}
                                                    color="primary"
                                                    onClick={() => handleClickNavigation('right')}
                                                    size='small'
                                                    disabled={disabledRightButton}
                                                >
                                                    <ArrowForwardIosIcon />
                                                </Fab>
                                            </Box>
                                            <Box style={{ display: 'flex', flexDirection: 'row-reverse', marginTop: -40 }}>
                                                <IconButton
                                                    className={classes.blanc}
                                                    onClick={handleClickMenu}
                                                >
                                                    <ShareIcon />
                                                </IconButton>
                                                <StyledMenu
                                                    id="customized-menu"
                                                    anchorEl={anchorElMenu}
                                                    keepMounted
                                                    open={Boolean(anchorElMenu)}
                                                    onClose={handleCloseMenu}
                                                    disableScrollLock={true}
                                                >
                                                    <MenuItem
                                                        onClick={handleCopyLink}
                                                    >
                                                        <ListItemIcon>
                                                            <LinkIcon fontSize="small" />
                                                        </ListItemIcon>
                                                        <ListItemText primary='Copy link' />
                                                    </MenuItem>
                                                    <TwitterShareButton
                                                        title={nftAGestionar.nombre + ' | Elevenkosmos'}
                                                        url={location.href}
                                                        hashtags={["nft"]}
                                                        style={{ width: '100%' }}
                                                    >
                                                        <MenuItem>
                                                            <ListItemIcon>
                                                                <TwitterIcon fontSize="small" />
                                                            </ListItemIcon>
                                                            <ListItemText primary='Share on Twitter' />
                                                        </MenuItem>
                                                    </TwitterShareButton>
                                                    <br />
                                                    <FacebookShareButton
                                                        url={location.href}
                                                        quote={nftAGestionar.nombre + ' | Elevenkosmos'}
                                                        hashtag={"#nft"}
                                                        description={nftAGestionar.descripcion}
                                                        style={{ width: '100%' }}
                                                    >
                                                        <MenuItem>
                                                            <ListItemIcon>
                                                                <FacebookIcon fontSize="small" />
                                                            </ListItemIcon>
                                                            <ListItemText primary='Share on Facebook' />
                                                        </MenuItem>
                                                    </FacebookShareButton>
                                                </StyledMenu>
                                                {nftAGestionar.precio ? (
                                                    <Tooltip title="Buy item" arrow placement="left">
                                                        <a href={`${nftAGestionar.url}`} target="_blank">
                                                            <img alt="OpenSea" className={classes.sgvIcon2} src="/images/opensea.svg" ></img>
                                                        </a>
                                                    </Tooltip>
                                                ) : null}
                                            </Box>
                                            <Box
                                                p={2}
                                                mt={1}
                                            >
                                                <Typography variant="h4" className={classes.blanc} style={{ fontWeight: 300 }}>
                                                    {nftAGestionar.nombre}
                                                </Typography>
                                                <Typography variant="body1" className={classes.blanc} style={{ fontWeight: 300 }} component="span">
                                                    Collection:&nbsp;
                                                </Typography>
                                                <Typography variant="body2" className={classes.blanc} style={{ fontWeight: 300 }} component="span">
                                                    {nftAGestionar.coleccion === '1' ? 'moleculas' : nftAGestionar.coleccion === '2' ? 'cabala-pop' : null}
                                                </Typography>
                                                <br />
                                                <Typography variant="body1" className={classes.blanc} style={{ fontWeight: 300 }} component="span">
                                                    Description:&nbsp;
                                                </Typography>
                                                <Typography variant="body2" className={classes.blanc} style={{ fontWeight: 300 }} component="span">
                                                    {nftAGestionar.descripcion}
                                                </Typography>
                                                <br />
                                                <Typography variant="body1" className={classes.blanc} style={{ fontWeight: 300 }} component="span">
                                                    Life cycle:&nbsp;
                                                </Typography>
                                                <Typography variant="body2" className={classes.blanc} style={{ fontWeight: 300 }} component="span">
                                                    {nftAGestionar.estado === 'disponible' ? 'Available' : nftAGestionar.estado === 'vendido' ? 'Sold out' : 'Released'}&nbsp;
                                                </Typography>
                                                <br />
                                                <Typography variant="body1" className={classes.blanc} style={{ fontWeight: 300 }} component="span">
                                                    {nftAGestionar.estado === 'disponible' ? 'Created by:' : 'Owned by:'}&nbsp;
                                                </Typography>
                                                <Typography variant="body2" className={classes.blanc} style={esDesktop ? { fontWeight: 300 } : { fontWeight: 300, wordWrap: 'break-word' }} component="span">
                                                    {nftAGestionar.propietario}
                                                </Typography>
                                                {nftAGestionar.precio && valorEuros ? (
                                                    <Fragment>
                                                        <br />
                                                        <Typography variant="body1" className={classes.blanc} style={{ fontWeight: 300 }} component="span">
                                                            Current price:&nbsp;
                                                        </Typography>
                                                        <Tooltip title="ETH on Polygon blockchain" arrow placement="top">
                                                            <img alt="ETH" className={classes.sgvIcon} src="/images/265128aa51521c90f7905e5a43dcb456_new.svg" ></img>
                                                        </Tooltip>
                                                        <Typography variant="h6" className={classes.blanc} style={{ fontWeight: 300 }} component="span">
                                                            {nftAGestionar.precio} ETH&nbsp;
                                                        </Typography>
                                                        <Typography variant="body2" className={classes.blanc} style={{ fontWeight: 300 }} component="span">
                                                            ({parseFloat((nftAGestionar.precio * valorEuros).toFixed(2))} €)&nbsp;
                                                        </Typography>
                                                    </Fragment>
                                                ) : null}
                                            </Box>
                                        </Box>
                                        <Box
                                            p={2}
                                            mt={2}
                                            className={classes.boxFramed}
                                        >
                                            <Box
                                                px={2}
                                                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                            >
                                                <Box style={{ display: 'flex', flexDirection: 'row' }}>
                                                    {nftAGestionar.estado === 'liberado' ? (
                                                        <Fragment>
                                                            <LockOpenIcon className={classes.blanc} style={{ marginRight: 10 }} />
                                                            <Typography variant="body1" className={classes.blanc} style={{ fontWeight: 300 }}>
                                                                Content released
                                                            </Typography>
                                                        </Fragment>
                                                    ) : (
                                                        <Fragment>
                                                            <LockIcon className={classes.blanc} style={{ marginRight: 10 }} />
                                                            <Typography variant="body1" className={classes.blanc} style={{ fontWeight: 300 }}>
                                                                Unlock content
                                                            </Typography>
                                                        </Fragment>
                                                    )}

                                                </Box>
                                                <Switch color="default" checked={checked} onChange={toggleChecked} />
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="flex-start"
                                >
                                    {cargamosCaroussel ? (
                                        <Grid item xs={12} sm={10} md={9} lg={9}>
                                            <Box
                                                p={2}
                                                m={2}
                                                className={classes.boxFramed}
                                                style={esDesktop ? { marginRight: 35 } : null}
                                            >
                                                <Typography variant="h6" className={classes.blanc} style={{ fontWeight: 300 }}>
                                                    More from this collection...
                                                </Typography>
                                            </Box>
                                            <Box
                                                px={2}
                                                style={esDesktop ? { display: 'flex', flexDirection: 'row' } : esTablet ? { display: 'flex', flexDirection: 'row', flexWrap: 'wrap' } : { display: 'flex', flexDirection: 'column' }}
                                            >
                                                {nftsCaroussel.map((nft, index) => (
                                                    <Box key={'nft' + index} style={esDesktop ? { width: '20%', paddingRight: 15 } : esTablet ? { width: '50%', paddingRight: 15, paddingTop: 15 } : { width: '100%', paddingTop: 10 }}>
                                                        <NftItem
                                                            prNft={nft}
                                                            prObjectRandomize={null}
                                                            prDimScreen={dimScreen}
                                                            prEsCaroussel={true}
                                                        />
                                                    </Box>
                                                ))}
                                            </Box>
                                        </Grid>
                                    ) : null}
                                </Grid>
                            </div >
                            {isViewerOpen && (
                                <ImageViewer
                                    src={images}
                                    currentIndex={currentImage}
                                    disableScroll={false}
                                    closeOnClickOutside={true}
                                    onClose={closeImageViewer}
                                />
                            )}
                            <Dialog
                                fullScreen={esDesktop || esTablet ? false : true}
                                open={openDialog}
                                onClose={handleCloseDialog}
                            >
                                <DialogContent>
                                    <DialogContentText>
                                        Enter the key provided after purchase to unlock private content.
                                    </DialogContentText>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="key"
                                        label="Key"
                                        fullWidth
                                        value={valuesForm.key}
                                        onChange={handleChangeForm('key')}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        onClick={handleCloseDialog}
                                        color="primary">
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={procesarDatos}
                                        color="primary">
                                        Submit
                                    </Button>
                                </DialogActions>
                            </Dialog>
                            <Dialog fullScreen open={openDialogFrame} onClose={handleCloseDialogFrame} TransitionComponent={Transition}>
                                <AppBar className={classes.appBar}>
                                    <Toolbar>
                                        <IconButton edge="start" color="inherit" onClick={handleCloseDialogFrame} >
                                            <CloseIcon />
                                        </IconButton>
                                        <Typography variant="h6" style={{ fontWeight: 300 }} className={classes.title}>
                                            {objetoDevueltoKey.titulo ? objetoDevueltoKey.titulo : nftAGestionar.estado === 'liberado' ? gestionDatosLiberados(elId + 1, 'titulo') : null}
                                        </Typography>
                                    </Toolbar>
                                </AppBar>
                                <Iframe prUrlKey={objetoDevueltoKey.key ? objetoDevueltoKey.key : nftAGestionar.estado === 'liberado' ? gestionDatosLiberados(elId + 1, 'urlKey') : null} />
                            </Dialog>
                            <Snackbar open={openSnack} autoHideDuration={5000} onClose={handleCloseSnack}>
                                <Alert severity={alert.tipo} onClose={handleCloseSnack}>
                                    {alert.mensaje}
                                </Alert>
                            </Snackbar>
                        </Fragment>
                    ) : null}
                </Fragment>
            ) : null}
        </Fragment>
    )
}

export default Nft

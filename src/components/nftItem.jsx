import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { navigate } from "gatsby";
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Badge from '@material-ui/core/Badge';
import CircularProgress from '@material-ui/core/CircularProgress';
import Chip from '@material-ui/core/Chip';
import useMediaQuery from '@material-ui/core/useMediaQuery';

//estilos
import Clases from "../styles/clases";

//importaciones acciones
import { actualizarLikesAccion } from '../redux/appDucks';
import { setCambiamosItemNftAccion } from '../redux/appDucks';

const NftItem = (props) => {

    const classes = Clases();
    const esDesktop = useMediaQuery(theme => theme.breakpoints.up('lg'));
    const esTablet = useMediaQuery(theme => theme.breakpoints.up('sm'));
    const dispatch = useDispatch();

    //states

    const [nftHeight, setNftHeight] = useState(500);
    const [imageIsLoading, setImageIsLoading] = useState(true);
    const [likes, setLikes] = useState(props.prNft.likes);

    //funciones    

    const getMeta = (url, callback) => {
        const img = new Image();
        img.src = url;
        img.onload = function () { callback(img.width, img.height); setImageIsLoading(false) }
    };

    getMeta(
        props.prNft.imagen,
        function (width, height) {
            if (!props.prEsCaroussel) {
                height = (props.prDimScreen.width / 3.4);
            } else {
                if(esDesktop){
                    height = (props.prDimScreen.width / 5.4);
                }else{
                    height = 300;
                }
            }
            setNftHeight(height)
        }
    );

    const handleLikesClick = () => {
        setLikes(likes + 1);
        dispatch(actualizarLikesAccion('nfts', props.prNft.id, parseInt(likes + 1)));
    };

    const handleClickItem = () => {
        dispatch(setCambiamosItemNftAccion(true, props.prNft.id));
        navigate(`../nft?id=${props.prNft.id}`);
    };

    return (
        <div>
            <Card className={classes.root2}>
                <CardActionArea
                    onClick={handleClickItem}
                >
                    <CardHeader
                        avatar={
                            !props.prEsCaroussel ? (
                                <Avatar style={{ backgroundColor: props.prObjectRandomize.randomColor, color: props.prObjectRandomize.oppositeColor }}>
                                    {props.prObjectRandomize.randomCharacter + props.prObjectRandomize.randomNumber}
                                </Avatar>
                            ) : null
                        }
                        title={
                            !props.prEsCaroussel ? (
                                props.prNft.nombre
                            ) : (
                                <Typography variant="caption" style={{ fontWeight: 300 }} component="p">
                                    {props.prNft.nombre}
                                </Typography>
                            )}
                        className={classes.blanc}
                    />
                    {imageIsLoading ? (
                        <Box
                            className={classes.centrado}
                        >
                            <CircularProgress className={classes.blanc} />
                        </Box>
                    ) : (
                        <CardMedia
                            style={{ height: nftHeight }}
                            image={props.prNft.imagen}
                        />
                    )}
                    {!props.prEsCaroussel ? (
                        <CardContent>
                            <Typography variant="body2" className={classes.blanc} style={{ fontWeight: 300 }} component="p">
                                {props.prNft.descripcion}
                            </Typography>
                        </CardContent>
                    ) : null}
                </CardActionArea>
                {!props.prEsCaroussel ? (
                    <CardActions disableSpacing>
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
                        {props.prNft.estado === 'liberado' ? (
                            <Chip
                                label="Released"
                                className={classes.right}
                                size="small"
                                style={{ backgroundColor: 'green', color: 'white', marginRight: 10 }}
                            />) : null}
                    </CardActions>
                ) : null}
            </Card>
        </div>
    )
}

export default NftItem

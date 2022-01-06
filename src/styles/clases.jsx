import { makeStyles } from "@material-ui/core";

const Clases = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
    formInput: {
        marginBottom: '10px',
    },
    loading: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    colorInput: {
        color: 'black'
    },
    sinScroll: {
        overflowY: 'hidden',
    },
    root: {
        display: 'flex',
        backgroundColor: '#141821',
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        zIndex: 1
    },
    posFixed: {
        position: 'fixed',
    },
    posFixedLeft: {

    },
    posFixedRight: {

    },
    blanc: {
        color: 'white'
    },
    rootCard: {
        maxWidth: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    centrado: {
        minHeight: "20vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    image: {
        cursor: 'pointer',
        width: '100%',
        objecFit: 'contain',
        marginBottom: -8,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    boxFramed: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        border: '1px solid',
        borderColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: 10
    },
    sgvIcon: {
        width: 24,
        height: 24,
        paddingRight: 5
    },
    sgvIcon2: {
        width: 44,
        height: 44,
        marginBottom: -5,
        paddingRight: 5
    },
    collectionIcon: {
        width: 45,
        height: 45,
        borderRadius: 30
    },
    right: {
        marginLeft: 'auto'
    },
    root2: {
        maxWidth: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    popoverPaper: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
    },
    forceScroll: {
        overflowY: 'scroll'
    },
    box1: {
        background: '#29524a',
        background: `linear-gradient(to right bottom, #29524a, #e9bcb7)`,
        borderRadius: 5,
        padding: 45,
        transition: `all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important`,
        "&:hover": {          
          transform: `translateY(-5px)`,          
        },
    },
    box2: {
        background: '#52CE7E',
        background: `linear-gradient(to right bottom, #52CE7E, #463000)`,
        borderRadius: 5,
        padding: 45,
        transition: `all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important`,
        "&:hover": {          
          transform: `translateY(-5px)`,          
        },
    },
    alturaIframe: {
        height: `calc(100% - 0px)`
    }
   
}), { index: 1 });

export default Clases;
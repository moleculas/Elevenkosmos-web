import React, { useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import clsx from 'clsx';


//estilos
import Clases from "../styles/clases";

const Iframe = (props) => {

    const classes = Clases(); 
    const laUrl = "https://elevenkosmos.net" + props.prUrlKey;

    //states

    const [iframeIsLoading, setIframeIsLoading] = useState(true);  

    return (
        // <div dangerouslySetInnerHTML={{ __html: "<iframe src='https://www.youtube.com/embed/cWDJoK8zw58' />" }} />
        <div style={{ overflowY: 'hidden', height: '100vh' }}>
            {iframeIsLoading ? (
                <Box
                    className={clsx(classes.centrado, classes.alturaIframe)}                   
                >
                    <CircularProgress />
                </Box>
            ) : null}
            <iframe
                src={laUrl}
                width="100%"               
                className={classes.alturaIframe}              
                onLoad={() => setIframeIsLoading(false)}
                frameBorder="0"
            />
        </div>
    )
}


export default Iframe

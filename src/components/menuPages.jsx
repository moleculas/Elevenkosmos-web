import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';
import { Link } from "gatsby";

const MenuPages = () => {

    return (
        <div>
            <Box style={{ marginLeft: 3, display: 'flex', flexDirection: 'column' }}>
                <Tooltip
                    arrow
                    placement="right"
                    title={
                        <Typography color="inherit" variant="body1">Home</Typography>
                    }
                >
                    <Link to='/'>
                        <Fab
                            style={{ zIndex: 4, marginTop: 10 }}
                            color="primary"
                        >
                            <HomeIcon />
                        </Fab>
                    </Link>
                </Tooltip>
                <Tooltip
                    arrow
                    placement="right"
                    title={
                        <Typography color="inherit" variant="body1">NFTs gallery</Typography>
                    }
                >
                    <Link to='/nfts'>
                        <Fab
                            style={{ zIndex: 4, marginTop: 10 }}
                            color="primary"
                        >
                            <Typography color="inherit" variant="h5">N</Typography>
                        </Fab>
                    </Link>
                </Tooltip>
                <Tooltip
                    arrow
                    placement="right"
                    title={
                        <Typography color="inherit" variant="body1">Digital Literature</Typography>
                    }
                >
                    <Link to='/digitalLiterature'>
                        <Fab
                            style={{ zIndex: 4, marginTop: 10 }}
                            color="primary"
                        >
                            <Typography color="inherit" variant="h5">D</Typography>
                        </Fab>
                    </Link>
                </Tooltip>
            </Box>
        </div>
    )
}

export default MenuPages

import React, { useState } from "react";

import { AppBar, Divider, Drawer, IconButton, List, Toolbar, Typography, Container, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuIcon from "@material-ui/icons/Menu";

import { mainListItems, secondaryListItems } from "./components/listItems";
import Table from "./components/Table";
import NewShortUrl from "./components/NewShortUrl";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex"
    },
    toolbarIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 8px",
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: "none",
    },
    drawerPaper: {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    appBarSpacer: theme.mixins.toolbar,
    drawerPaperClose: {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9),
        },
    },
    title: {
        flexGrow: 1,
    },
    content: {
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
    },
    container: {
        paddingBottom: theme.spacing(4),
        paddingTop: theme.spacing(4),
    },
    paper: {
        display: "flex",
        padding: theme.spacing(2),
        flexDirection: "column",
        overflow: "auto",
        marginTop: "100px"
    },
    fixedHeight: {
        height: 240,
    },
}));

function Dashboard() {
    const classes = useStyles();

    const [open, setOpen] = useState(true);
    const handleDrawerOpen = () => {
        setOpen(!open);
    };

    return (
        <div className={classes.root}>
            <AppBar position="absolute" className={`${classes.appBar} ${open ? classes.appBarShift : ""}`}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        arai-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={`${classes.menuButton} ${open ? classes.menuButtonHidden : ""}`}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                open={open}
                classes={{
                    paper: `${classes.drawerPaper} ${!open ? classes.drawerPaperClose : ""}`
                }}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerOpen}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>{mainListItems}</List>
                <Divider />
                <List>{secondaryListItems}</List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}>
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Paper className={classes.paper}>
                                    <Table />
                                </Paper>
                            </Grid>
                        </Grid>
                        <NewShortUrl />
                    </Container>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;

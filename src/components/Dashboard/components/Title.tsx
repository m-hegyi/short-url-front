import React from "react";

import { Typography, Toolbar, Tooltip, IconButton, makeStyles, createStyles, Theme, lighten } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

interface ITitleProps {
    children: React.ReactNode,
    numSelected: number;
}

const useToolbarStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(1),
        },
        highlight:
            theme.palette.type === "light"
                ? {
                    color: theme.palette.secondary.main,
                    backgroundColor: lighten(theme.palette.secondary.light, 0.85),
                }
                : {
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.secondary.dark,
                },
        title: {
            flex: "1 1 100%",
        },
    }),
);


function Title({ children, numSelected }: ITitleProps) {
    const classes = useToolbarStyles();

    return (
        <Toolbar className={`${classes.root} ${numSelected > 0 ? classes.highlight : ""}`}>
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6">
                    {children}
                </Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : null}
        </Toolbar>
    );
}

export default Title;

import React from "react";

import { 
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Fab,
    makeStyles,
    createStyles,
    Theme
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import apiRequest from "../../../lib/apiRequest";

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        fab: {
            position: "absolute",
            bottom: theme.spacing(2),
            right: theme.spacing(1)
        }
    });

});

function NewShortUrl() {
    const [open, setOpen] = React.useState(false);
    const [originalUrl, setOriginal] = React.useState("");
    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddUrl = () => {
        apiRequest("/admin/short-urls", "POST", {originalUrl,})
        .then(response => {
            console.log(response);
        })
    }

    return (
        <div>

            <Fab color="primary" aria-label="add" className={classes.fab} onClick={handleClickOpen}>
                <AddIcon />
            </Fab>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New Short Url</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To create a new short url, paste the original url to the input field and save.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Original url"
                        type="text"
                        variant="outlined"
                        value={originalUrl}
                        onChange={(event) => setOriginal(event.target.value)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                     </Button>
                    <Button onClick={handleAddUrl} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default NewShortUrl;

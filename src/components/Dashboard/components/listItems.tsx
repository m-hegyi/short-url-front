import React from "react";

import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import CropFreeIcon from "@material-ui/icons/CropFree";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import LinkIcon from "@material-ui/icons/Link";

export const mainListItems = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <LinkIcon />
            </ListItemIcon>
            <ListItemText primary="Short url's" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <CropFreeIcon />
            </ListItemIcon>
            <ListItemText primary="QR codes" />
        </ListItem>
    </div>
);

export const secondaryListItems = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
        </ListItem>
    </div>
);

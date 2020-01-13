import React from "react";

import { Checkbox, TableCell, TableHead, TableRow } from "@material-ui/core";

interface IEditableTableProps {
    numSelected: number;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
    rowCount: number;
}

function ExtendedTableHead(props: IEditableTableProps) {
    const {numSelected, onSelectAllClick, rowCount} = props;

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ "aria-label": "select all urls" }}
                    />
                </TableCell>
                <TableCell>Id</TableCell>
                <TableCell>Short url</TableCell>
                <TableCell>Original url</TableCell>
                <TableCell>Date</TableCell>
            </TableRow>
        </TableHead>
    );
}

export default ExtendedTableHead;

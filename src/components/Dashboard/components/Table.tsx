import React from "react";
import Title from "./Title";

import {
    Checkbox,
    CircularProgress,
    createStyles,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
    Theme
} from "@material-ui/core";
import ExtendedTableHead from "./ExtendedTableHead";
import apiRequest from "../../../lib/apiRequest";

interface ITableObject {
    id: number;
    short_url: string;
    original_url: string;
    created_at: string;
}

const useS = makeStyles((theme: Theme) => {
    return createStyles({
        container: {
            position: "relative",
        },
        spinner: {
            position: "absolute",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }
    });
});

function EditableTable() {
    const [selected, setSelected] = React.useState<number[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState<ITableObject[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const classes = useS();

    React.useEffect(() => {
        if (!isLoading) {
            setIsLoading(true);

            apiRequest("admin/short-urls", "GET", {})
            .then((response: ITableObject[]) => {
                console.log(response);
                setData(response);
                setLoading(false);
            });
        }
    }, [isLoading]);

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = data.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: number[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (id: number) => selected.indexOf(id) !== -1;

    const emptyRows = loading ? rowsPerPage : rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
        <React.Fragment>
            <div className={classes.container}>
                {loading ? (
                    <div className={classes.spinner}>
                        <CircularProgress size={60} />
                    </div>
                ) : null}
                <Title
                    numSelected={selected.length}
                    >
                    Short url's
                </Title>
                <TableContainer>
                    <Table size="medium">
                        <ExtendedTableHead
                            rowCount={data.length}
                            numSelected={selected.length}
                            onSelectAllClick={handleSelectAllClick}
                            />
                        <TableBody>
                            {!loading ? data
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                const isItemSelected = isSelected(row.id);
                                return (
                                    <TableRow
                                    hover
                                    onClick={(event) => handleClick(event, row.id)}
                                    tabIndex={-1}
                                    key={row.id}
                                    role="checkbox"
                                    aria-checked={isItemSelected}
                                    selected={isItemSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isItemSelected}
                                                />
                                        </TableCell>
                                        <TableCell>{row.id}</TableCell>
                                        <TableCell>{row.short_url}</TableCell>
                                        <TableCell>{row.original_url}</TableCell>
                                        <TableCell>{row.created_at}</TableCell>
                                    </TableRow>
                                );
                            }) : null}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={5} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </div>
        </React.Fragment>
    );
}

export default EditableTable;

import React from "react";

import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

function Login() {
    return (
        <Container component="main" maxWidth="xs">
            <div className="login-container">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            variant="outlined"
                            id="name"
                            label="User name"
                            autoComplete="name"
                            fullWidth
                            required
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            variant="outlined"
                            id="password"
                            label="Password"
                            autoComplete="password"
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Button color="primary" size="large"  variant="contained" fullWidth> Log in</Button>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
}

export default Login;

import { useEffect, useMemo, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Snackbar } from "@mui/material";

import Navbar from "./Navbar";
import Router from "./Router";
import { getProfileAction } from "../../redux/actions/auth";
import { createUserRoutes } from "./routes/routes";
import { RootStore } from "../../redux";
import Loader from "../common/Loader/Loader";
import { resetMessage } from "../../redux/actions/message";
import { Alert } from "@mui/material";

function App() {
  const [initializing, setInitializing] = useState(true);
  const { user, loading, snackbar } = useSelector((state: RootStore) => ({
    user: state.auth.user,
    loading: state.loader.loading,
    snackbar: state.snackbar,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    // @ts-ignore
    dispatch(getProfileAction(() => setInitializing(false)));
  }, [dispatch]);

  const userRoutes = useMemo(() => createUserRoutes(user), [user]);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      {loading && <Loader />}
      {!initializing && (
        <>
          <Navbar userRoutes={userRoutes} />
          <Grid container padding={2}>
            <Router userRoutes={userRoutes} />
          </Grid>
        </>
      )}
      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={() => dispatch(resetMessage())}
        {...snackbar}
      >
        <Alert severity={snackbar?.messagetype}>{snackbar?.action}</Alert>
      </Snackbar>
    </BrowserRouter>
  );
}

export default App;

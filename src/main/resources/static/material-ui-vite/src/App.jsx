import * as React from "react";
import BottomNavBar from "./Components/BottomNavBar";
import { Container, Paper } from "@mui/material";

import ArticleHistory from "./ArticleHistory";
import Today from "./Today";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

export default function App() {
    const location = useLocation();

    return (
        <>
            <Routes>
                <Route path="/">
                    <Route index element={<Today />} />
                    <Route path="today" element={<Today />} />
                    <Route path="history" element={<ArticleHistory />} />
                    <Route path="profile" element={<> </>} />
                    <Route path="*" element={<></>} />
                </Route>
            </Routes>
            <Container sx={{ height: 60 }}></Container>
            <Paper
                sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
                elevation={3}
            >
                <BottomNavBar currentPath={location.pathname} />
            </Paper>
        </>
    );
}

import { Container, Paper } from "@mui/material";
import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ArticleHistory from "./ArticleHistory";
import BottomNavBar from "./Components/BottomNavBar";
import Today from "./Today";
//import feedback.jsx
import FeedbackPage from "./feedback";

const queryClient = new QueryClient();
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import SummaryComponent from "./summary";


export default function App() {
    const location = useLocation();

    return (
        <QueryClientProvider client={queryClient}>
            <Routes>
                <Route path="/">
                    <Route index element={<Today />} />
                    <Route path="today" element={<Today />} />
                    <Route path="history" element={<ArticleHistory />} />
                    <Route path="/summary/:articleId" element={<SummaryComponent />} />
                    <Route path="/feedback/:articleId" element={<FeedbackPage />} />
                    <Route path="profile" element={<> </>} />
                    <Route path="*" element={<></>} />
                </Route>
            </Routes>
            <Container sx={{ height: 80 }}></Container>
            <Paper
                sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
                elevation={3}
            >
                <BottomNavBar currentPath={location.pathname} />
            </Paper>
        </QueryClientProvider>
    );
}

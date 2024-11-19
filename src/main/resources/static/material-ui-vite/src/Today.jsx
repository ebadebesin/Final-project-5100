import { Box, Button, Chip, Container, Stack } from "@mui/material";
import * as React from "react";
import SendIcon from "@mui/icons-material/Send";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import StarIcon from "@mui/icons-material/Star";
import TopBar from "./Components/TopBar";
import { useArticles } from "./Hooks/UseArticles";
import { Link } from "react-router-dom";
import { useScores } from "./Hooks/UseScores";

export default function Today() {
    const { getLatest } = useArticles();

    const { isPending, error, data, isFetching } = getLatest();

    /*
    const { getById } = useArticles();

    const { isPending, error, data, isFetching } = getById(
       "jpbc5sqcbq776xopaVyv"
    );
    */
    let article = {
        id: "",
        title: "",
        poster: "",
        content: "",
    };
    if (data) {
        article = data;
    }
    if (isPending || isFetching) {
        article.title = "loading...";
    }
    if (error) {
        article.title = error.message;
    }

    const { getLastWeek, getLastYear } = useScores();
    let scores = {};
    if (getLastWeek.data && getLastWeek.data) {
        scores = {
            lastWeek: getLastWeek?.data?.score,
            lastYear: getLastYear?.data?.score,
        };
    }

    return (
        <>
            <TopBar title="Today">
                <Stack direction="row" spacing={1}>
                    <Chip
                        icon={<WhatshotIcon />}
                        label={"" + scores?.lastWeek}
                        color="primary"
                        size="small"
                    />
                    <Chip
                        icon={<StarIcon />}
                        label={"" + scores?.lastYear}
                        color="success"
                        size="small"
                    />
                </Stack>
            </TopBar>
            <Container>
                <article>
                    <h1>{article?.title || ""}</h1>
                    <img src={article?.poster || ""} width={"100%"}></img>
                    <>{article?.content || ""}</>
                </article>
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Box></Box>
                    <Box>
                        <Button
                            variant="contained"
                            component={Link}
                            to={"/summary" + (article?.id || "")}
                            endIcon={<SendIcon />}
                        >
                            Try Summarize
                        </Button>
                    </Box>
                </Stack>
            </Container>
        </>
    );
}

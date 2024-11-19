import ApiClient from "../Services/ApiClient";
import { useQuery, useQueries } from "@tanstack/react-query";

const scoreApi = new ApiClient("/scores");

export const useScores = () => {
    const [getLastWeek, getLastYear] = useQueries({
        queries: [
            {
                queryKey: ["scores", "lastWeek"],
                queryFn: scoreApi.queryFn({ path: "/lastWeek" }),
            },
            {
                queryKey: ["scores", "lastYear"],
                queryFn: scoreApi.queryFn({ path: "/lastYear" }),
            },
        ],
    });

    return { getLastWeek, getLastYear };
};

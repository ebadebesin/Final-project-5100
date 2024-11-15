import ApiClient from "../Services/ApiClient";
import { useQuery } from "@tanstack/react-query";

const articleApi = new ApiClient("/articles/latest");

export const useArticles = () => {
    const getLatest = useQuery({
        queryKey: ["articles", "latest"],
        queryFn: articleApi.getFn,
    });

    return { getLatest };
};

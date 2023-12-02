import { useSearchParams } from "@solidjs/router";

export function useSearch() {
    type SearchParams = {
        query: string;
    };
    return useSearchParams<SearchParams>();
}

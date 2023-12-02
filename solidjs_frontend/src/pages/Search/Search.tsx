import { Header } from "@/components";
import { useSearch } from "@/utils/search";
import { Component } from "solid-js";

const Search: Component<{}> = () => {
  const [params, setParams] = useSearch();
  if (params.q === undefined || params.q.length === 0) {
    window.location.href = window.location.origin;
  }

  return (
    <>
      <Header />
      <h1 class="text-xl font-semibold tracking-wide">
        Results for query: {params.q}
      </h1>
      search page
      <br />
      Query: {params.q}
    </>
  );
};

export default Search;

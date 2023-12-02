import { A } from "@solidjs/router";
import { Component } from "solid-js";

const NotFound: Component<{}> = () => {
  return (
    <div class="absolute top-0 right-0 bottom-0 left-0">
      <div class="w-min relative top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <h1 class="text-2xl font-semibold">Page not found. 404</h1>
        <A href="/" class="btn btn-primary btn-wide rounded">
          Back to main page
        </A>
      </div>
    </div>
  );
};

export default NotFound;

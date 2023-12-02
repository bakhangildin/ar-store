import { useCart } from "@/providers/CartProvider";
import { useTheme } from "@/providers/ThemeProvider";
import { useSearch } from "@/utils/search";
import { A } from "@solidjs/router";
import { FiShoppingCart } from "solid-icons/fi";
import { VsSearch } from "solid-icons/vs";
import { Component, Show, createSignal, onMount } from "solid-js";

export const Header: Component<{}> = (props) => {
    const theme = useTheme();
    const [params, setParams] = useSearch();
    const cart = useCart();

    let headerElement: HTMLDivElement;

    type Size = {
        width: number;
        height: number;
    };
    const [headerSize, setHeaderSize] = createSignal<Size>({
        width: 0,
        height: 0,
    });

    onMount(() => {
        setHeaderSize({
            width: headerElement.clientWidth,
            height: headerElement.clientHeight,
        });
        window.addEventListener("resize", (event) => {
            setHeaderSize({
                width: headerElement.clientWidth,
                height: headerElement.clientHeight,
            });
        });
    });

    function handleSearchSubmit(e: SubmitEvent) {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const query: string = form.query.value;
        if (query.length == 0) return;

        let url = new URL("/search", window.location.origin);
        url.searchParams.set("q", query);
        window.location.href = url.toString();
    }

    return (
        <header
            // @ts-expect-error
            ref={headerElement}
            class="px-4 py-3 border-b border-b-base-content/30 flex flex-row items-center justify-between"
        >
            <div>
                <A href="/" tabIndex="-1">
                    AR-Store
                </A>
            </div>
            <form
                class="flex items-center gap-1"
                onsubmit={handleSearchSubmit}
                autocomplete="off"
            >
                <input
                    type="text"
                    name="query"
                    class="input input-ghost input-sm border-base-content/30 rounded"
                    placeholder="Enter your query"
                    value={params.query || ""}
                    oninput={(e) => {
                        setParams({ q: e.target.value });
                    }}
                />
                <button
                    type="submit"
                    class="btn btn-ghost btn-sm border-base-content/30 rounded hidden md:block"
                >
                    <VsSearch />
                </button>
            </form>
            <div class="flex flex-row items-center gap-4">
                <div class="indicator">
                    <Show when={cart.data.items.length > 0}>
                        <span class="indicator-item badge badge-primary badge-sm rounded-full aspect-square">
                            {cart.data.items.reduce(
                                (acc, item) => acc + item.amount,
                                0
                            )}
                        </span>
                    </Show>
                    <A
                        class="btn btn-ghost btn-sm btn-square rounded text-lg hover:bg-base-200 focus:bg-base-200 ml-4"
                        href="/cart"
                    >
                        <FiShoppingCart />
                    </A>
                </div>
                <select
                    class="select select-xs select-primary rounded"
                    value={theme.currentTheme()}
                    onchange={(e) => theme.set(e.target.value)}
                >
                    <option value="system">System</option>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </select>
            </div>
        </header>
    );
};

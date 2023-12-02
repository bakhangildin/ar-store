import { Header } from "@/components";
import { Product } from "@/types/types";
import { Component, For, Show } from "solid-js";
import { ProductCard } from "./components/ProductCard";
import { products } from "@/store";
import { useCart } from "@/providers/CartProvider";
import { A } from "@solidjs/router";
import { FiShoppingCart } from "solid-icons/fi";

const Main: Component<{}> = () => {
    const cart = useCart();

    return (
        <>
            <Header />
            <div class="px-4 py-2">
                <h1 class="font-semibold text-xl tracking-wide">
                    Подборка для вас
                </h1>
                <br />
                <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <For each={products}>
                        {(product, _) => <ProductCard product={product} />}
                    </For>
                </div>
            </div>

            {/* Cart floating button */}
            <Show when={cart.data.items.length > 0}>
                <div class="block sm:hidden absolute right-4 bottom-4">
                    <div class="indicator">
                        <A class="btn btn-primary btn-circle" href="/cart">
                            <span class="indicator-item badge badge-outline rounded-full bg-inherit">
                                {cart.data.items.reduce(
                                    (acc, item) => acc + item.amount,
                                    0
                                )}
                            </span>
                            <FiShoppingCart class="text-lg" />
                        </A>
                    </div>
                </div>
            </Show>
        </>
    );
};

export default Main;

import { Header } from "@/components";
import { useCart } from "@/providers/CartProvider";
import { Component, For, Show } from "solid-js";
import { ProductCard } from "../Main/components/ProductCard";
import { products } from "@/store";

const Cart: Component<{}> = () => {
    const cart = useCart();

    return (
        <>
            <Header />
            <div class="px-4 py-2">
                <h1 class="text-xl font-semibold tracking-wide">
                    Ваша корзина{" "}
                    <Show when={cart.data.items.length === 0}>пуста</Show>
                </h1>
                <For each={cart.data.items}>
                    {(item, index) => {
                        const productId = item.productId;
                        const product = products.find((v) => v.id == productId);
                        if (!product) throw new Error("product undefined");
                        return <ProductCard product={product} />;
                    }}
                </For>
                <br />
                <Show when={cart.data.items.length > 0}>
                    <button
                        class="btn btn-primary rounded"
                        onclick={(e) => alert("Ещё не написал :(")}
                    >
                        Купить{" "}
                        {cart.data.items.reduce((sum, item) => {
                            const prod = products.find(
                                (v) => v.id === item.productId
                            );
                            if (!prod) return sum + 0;
                            return sum + prod.price * item.amount;
                        }, 0)}{" "}
                        P
                    </button>
                </Show>
            </div>
        </>
    );
};

export default Cart;

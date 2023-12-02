// @ts-nocheck
import { useCart } from "@/providers/CartProvider";
import { Product } from "@/types/types";
import { Component, Show, createSignal, onMount } from "solid-js";

export const ProductCard: Component<{ product: Product }> = ({ product }) => {
    const cart = useCart();

    let elm: HTMLDivElement;
    const [w, setW] = createSignal(100);
    const [h, setH] = createSignal(100);

    onMount(() => {
        setW(Math.floor(elm.clientWidth * 0.8));
        setH(Math.floor(elm.clientHeight * 0.8));
    });

    return (
        <div
            ref={elm}
            class="px-2 py-2 border border-base-content/30 rounded flex flex-col items-start gap-2 aspect-[3/4] max-w-xs max-h-72"
        >
            <model-viewer
                class="self-center aspect-[4/3] object-contain"
                src={product.src}
                ar
                poster={product.poster}
                shadow-intensity="1"
                camera-controls
                touch-action="pan-y"
                style={{
                    width: `${w()}px`,
                    height: `${h()}px`,
                }}
            ></model-viewer>
            <div class="flex items-center justify-between w-full">
                <p class="text-lg font-semibold tracking-tight">
                    {product.title}
                </p>
                <p>{product.price.toString()} P</p>
            </div>
            <p class="line-clamp-2 font-medium text-sm">
                {product.description}
            </p>
            <Show
                when={!cart.actions.isAdded(product.id)}
                fallback={
                    <div class="flex flex-row items-center self-center gap-4 touch-manipulation">
                        <button
                            class="btn btn-ghost btn-xs border-base-content/30 rounded md:btn-sm"
                            onclick={(e) => {
                                cart.actions.decrement(product.id);
                            }}
                        >
                            -
                        </button>
                        <span class="text-lg">
                            {cart.actions.getAmount(product.id)}
                        </span>
                        <button
                            class="btn btn-ghost btn-xs border-base-content/30 rounded md:btn-sm"
                            onclick={(e) => {
                                cart.actions.increment(product.id);
                            }}
                        >
                            +
                        </button>
                    </div>
                }
            >
                <button
                    class="btn btn-primary btn-xs md:btn-sm rounded self-center"
                    onclick={(e) => cart.actions.increment(product.id)}
                >
                    Добавить в корзину
                </button>
            </Show>
        </div>
    );
};

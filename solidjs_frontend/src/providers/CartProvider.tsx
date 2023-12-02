import {
    ParentComponent,
    createContext,
    createEffect,
    useContext,
} from "solid-js";
import { createStore } from "solid-js/store";

type CartItem = {
    productId: number;
    amount: number;
};

interface CartData {
    items: CartItem[];
}

interface CartActions {
    isAdded(productId: number): boolean;
    getAmount(productId: number): number;
    increment(productId: number): void;
    decrement(productId: number): void;
}

interface CartContext {
    data: CartData;
    actions: CartActions;
}

const ctx = createContext<CartContext>();

export function useCart() {
    const cartCtx = useContext(ctx);
    if (!cartCtx) throw new Error("cart context is undefined");
    return cartCtx!;
}

export const CartProvider: ParentComponent<{}> = (props) => {
    const localstorageKey = "cart";
    const initial: CartItem[] = JSON.parse(
        localStorage.getItem(localstorageKey) || "[]"
    );
    const [items, setItems] = createStore<CartItem[]>(initial);

    createEffect(() =>
        localStorage.setItem(
            localstorageKey,
            JSON.stringify(items.map((item) => ({ ...item })))
        )
    );

    function isAdded(id: number) {
        const foundId = items.findIndex((item) => item.productId == id);
        return foundId == -1 ? false : true;
    }

    function getAmount(id: number) {
        const tmp = items.find((v) => v.productId === id);
        if (!tmp) return 0;
        return tmp.amount;
    }

    function increment(productId: number) {
        const amount = getAmount(productId);
        switch (amount) {
            case 0: {
                setItems((prev) => [
                    ...prev,
                    { productId: productId, amount: 1 },
                ]);
                break;
            }
            default: {
                setItems(
                    (item) => item.productId === productId,
                    "amount",
                    (amount) => amount + 1
                );
                break;
            }
        }
    }
    function decrement(productId: number) {
        const amount = getAmount(productId);
        switch (amount) {
            case 1: {
                setItems((prev) =>
                    prev.filter((item) => item.productId !== productId)
                );
                break;
            }
            default: {
                setItems(
                    (item) => item.productId === productId,
                    "amount",
                    (amount) => amount - 1
                );
            }
        }
    }

    const value: CartContext = {
        data: {
            items: items,
        },
        actions: {
            isAdded: isAdded,
            getAmount: getAmount,
            increment: increment,
            decrement: decrement,
        },
    };
    return <ctx.Provider value={value}>{props.children}</ctx.Provider>;
};

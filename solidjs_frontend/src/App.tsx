import { Route, Routes } from "@solidjs/router";
import { Component } from "solid-js";
import { ThemeProvider } from "./providers/ThemeProvider";
import Main from "./pages/Main/Main";
import NotFound from "./pages/NotFound/NotFound";
import Search from "./pages/Search/Search";
import Cart from "./pages/cart/Cart";
import { CartProvider } from "./providers/CartProvider";

const App: Component<{}> = () => {
    return (
        <ThemeProvider>
            <CartProvider>
                <Routes>
                    <Route path="/" component={Main} />
                    <Route path="/search" component={Search} />
                    <Route path="/cart" component={Cart} />
                    <Route path="*" component={NotFound} />
                </Routes>
            </CartProvider>
        </ThemeProvider>
    );
};
export default App;

import React from 'react'
import './scss/app.scss'
import {Home} from "./Components/Home/Home";
import {NotFound} from "./Components/NotFound/NotFound";
import {Route, Routes} from "react-router-dom";
import {MainLayout} from "./Components/Layout/MainLayout";

const Cart = React.lazy(() => import('./Components/Cart/Cart'))
const FullPizza = React.lazy(() => import('./Components/Home/Content/FullPizza'))

function App() {
    return (
        <Routes>

            <Route path={'/'} element={<MainLayout/>}>
                <Route path={''} element={<Home/>}/>
                <Route path={'cart'} element={
                    <React.Suspense fallback={<div>Download...</div>}>
                        <Cart/>
                    </React.Suspense>
                }/>
                <Route path={'pizza/:id'} element={
                    <React.Suspense fallback={<div>Download...</div>}>
                        <FullPizza/>
                    </React.Suspense>
                }/>
                <Route path={'*'} element={<NotFound/>}/>
            </Route>

        </Routes>
    );
}

export default App;

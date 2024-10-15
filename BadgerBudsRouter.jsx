import { BrowserRouter, Route, Routes } from "react-router-dom";
import BadgerBudsLanding from "./pages/BadgerBudsLanding";
import BadgerBudsBasket from './pages/BadgerBudsBasket';
import BadgerBudsNoMatch from './pages/BadgerBudsNoMatch';
import BadgerBuds from '../BadgerBuds';
import BadgerBudsAdoptable from './pages/BadgerBudsAdoptable';

export default function BadgerBudsRouter() {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<BadgerBuds />}>
                <Route index element={<BadgerBudsLanding />} />
                {/* TODO: Add your routes here! */}
                <Route path="available-cats" element={<BadgerBudsAdoptable />} />
                <Route path="basket" element={<BadgerBudsBasket />} />
                <Route path="*" element={<BadgerBudsNoMatch />} />
            </Route>
        </Routes>
    </BrowserRouter>
}
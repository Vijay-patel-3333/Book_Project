import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyBooks from "./my-books/MyBooks";
import BookOverview from "./components/BookOverview";

// App component that renders all other components using routers
export const App = () => (
    <Router>
        <ChakraProvider theme={theme}>
            <Routes>
                <Route
                    path="/"
                    element={
                            <MyBooks />                        
                    }
                ></Route>
                <Route path="/OverView" element={<>
                        <BookOverview/>
                    </>}></Route>
            </Routes>
        </ChakraProvider>
    </Router>
);

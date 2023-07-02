import React from "react";
import { render,screen,fireEvent, waitFor } from "@testing-library/react";
import BookOverviewTest from "./BookOverviewTest";
import { BrowserRouter } from 'react-router-dom';



// Testing for back button in bookoverview page
test('renders BookOverview component and It has back button',()=>{  

        const {queryByTestId} = render(
        <BrowserRouter>
                <BookOverviewTest />
         </BrowserRouter>
        );
        expect(queryByTestId("backbutton")).toBeTruthy()!; 
});

// Testing for favourite button in bookoverview page
test('renders BookOverview component and It has favorites button',()=>{  
 
        const {queryByTestId} = render(
        <BrowserRouter>
                <BookOverviewTest />
         </BrowserRouter>
        );
        expect(queryByTestId("favButton")).toBeTruthy()!; 
});

// testing wheather book overview page showing proper details or not
test('renders Bookoverview page and showing all details of book',()=>{  
        const {getByText} = render(
        <BrowserRouter>
                <BookOverviewTest />
         </BrowserRouter>);
        expect(getByText("Genre(s):" && "Author(s):" && "Summary:" && "Rating:" && "Review:")).toBeInTheDocument();          
});
test('renders BookOverview component and It shows image of book',()=>{  
 
        const {queryByTestId} = render(
        <BrowserRouter>
                <BookOverviewTest />
         </BrowserRouter>
        );
        expect(queryByTestId("image")).toBeInTheDocument(); 
});

// testing to check for dropdown menu to implement moving book feature
test('renders BookOverview component and It provide shelf name or dropdown menu',()=>{  
 
        const {queryByTestId} = render(
        <BrowserRouter>
                <BookOverviewTest />
         </BrowserRouter>
        );
        expect(queryByTestId("dropdown")).toBeInTheDocument(); 
});










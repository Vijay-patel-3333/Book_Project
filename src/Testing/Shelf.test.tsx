import React from "react";
import { render, screen } from "@testing-library/react";
import Shelf from "../Testing/TestShelf";
import ShelfView from "../Shared/ShelfView";


// testing whether all shelves render correctly (without books first)
test("loads all shelves", () => {
    render(<ShelfView />)

    expect(screen.getAllByRole("heading")).toHaveLength(6)
    expect(screen.getByTestId("0")).toHaveTextContent("To Read")
    expect(screen.getByTestId("1")).toHaveTextContent("Reading")
    expect(screen.getByTestId("2")).toHaveTextContent("Finished")
    expect(screen.getByTestId("3")).toHaveTextContent("Did Not Finish")
    expect(screen.getByTestId("4")).toHaveTextContent("Favorites")
    expect(screen.getByTestId("5")).toHaveTextContent("Recommended")
})

// testing that each shelf loads the appropriate books, based on dummy data
describe("books render appropriately", () => {
    test("load to read shelf", () => {
        render(<Shelf shelfID={0} userID={"1"} shelfName="To Read" />)
        expect(screen.getAllByTestId("book-0")).toHaveLength(5)
    });

    test("load reading shelf", () => {
        render(<Shelf shelfID={1} userID={"1"} shelfName="Reading" />)
        expect(screen.getAllByTestId("book-1")).toHaveLength(10)
    });

    test("load finished shelf", () => {
        render(<Shelf shelfID={2} userID={"1"} shelfName="Finished" />)
        expect(screen.getAllByTestId("book-2")).toHaveLength(3)
    });

    test("load did not finish shelf", () => {
        render(<Shelf shelfID={3} userID={"1"} shelfName="Did Not Finish" />)
        expect(screen.getAllByTestId("book-3")).toHaveLength(1)
    });

    test("load favorites shelf", () => {
        render(<Shelf shelfID={4} userID={"1"} shelfName="Favorites" />)
        expect(screen.getAllByTestId("book-4")).toHaveLength(2)
    });

    test("load recommendations shelf", () => {
        render(<Shelf shelfID={5} userID={"1"} shelfName="Recommendations" />)
        expect(screen.getAllByTestId("book-5")).toHaveLength(4)
    });
})
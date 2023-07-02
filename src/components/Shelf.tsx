import { Stack, Image, Heading, Box, Flex } from "@chakra-ui/react";
import React, { ReactElement, useEffect, useState } from "react";
import { Book } from "../types/Book";
import { Link } from "react-router-dom";

// props with their types
type Props = {
    shelfID: number;
    userID: string;
    shelfName: string;
};

// object to allow the retrieval of shelf names from their shelf ID
export const shelfNames: { [key: number]: string } = {
    0: "To Read",
    1: "Reading",
    2: "Finished",
    3: "Did Not Finish",
    4: "Favorites",
    5: "Recommended",
};

// function to render books by iterating through a given array of books for a given shelf
function renderBooks(books: Book[], shelfID: number): ReactElement[] {
    const elements = Array<ReactElement>();

    for (const book of books) {
        console.log(book);
            elements.push(
                <Link to="/OverView" state={book}>
                    <Image
                        maxWidth="9rem"
                        objectFit="cover"
                        shadow="dark-lg"
                        src={book.bookInfo.cover_url}
                    />
                </Link>
            );   
    }

    return elements;
}

// getting books through the api using appropriate fetch queries
export default function Shelf({ shelfID, userID, shelfName }: Props) {
    // this will be passed to the renderBooks() function
    // the fetch queries will populate this array with fetched Books
    const [shelfBooks, setShelfBooks] = useState<Book[]>([]);

    useEffect(() => {
        // get the userBooks when the shelf loads
        let books: Book[] = [];

        let requestOptions: RequestInit = {
            method: "GET",
            redirect: "follow",
        };
        // for reading status shelves
        if(shelfID>=0&&shelfID<=3){
            fetch(`http://localhost:8000/users/${userID}/shelves/${shelfID}`,
            requestOptions
            )
            .then((response) => response.json())
            .then((result) => {
                
                for (const book of result) {
                    let newBook: Book = {
                        isbn: book.UserBook.isbn,
                        bookInfo: {
                            title: book.BookInfo.title,
                            year: book.BookInfo.year,
                            blurb: book.BookInfo.blurb,
                            cover_url: book.BookInfo.cover_url,
                            page_no: book.BookInfo.page_no,
                            author: book.name,
                            publisher: "",
                            genre: [book.genre],
                        },
                        userBook: {
                            user_id: userID,
                            shelf_id: shelfID,
                            pages_read: book.UserBook.pages_read,
                            rating: book.UserBook.rating,
                            review: book.UserBook.review,
                            is_favourite: book.UserBook.is_favourite,
                        },
                    };

                    books.push(newBook);
                }
                setShelfBooks(books);
            })
            .catch((error) => console.log("error", error));}
        // for the favorite shelf
        else if (shelfID==4){
            fetch(`http://localhost:8000/users/${userID}/favourites`,requestOptions)
            .then((response) => response.json())
            .then((result) => {
                
                for (const book of result) {
                    let newBook: Book = {
                        isbn: book.UserBook.isbn,
                        bookInfo: {
                            title: book.BookInfo.title,
                            year: book.BookInfo.year,
                            blurb: book.BookInfo.blurb,
                            cover_url: book.BookInfo.cover_url,
                            page_no: book.BookInfo.page_no,
                            author: book.name,
                            publisher: "",
                            genre: [book.genre],
                        },
                        userBook: {
                            user_id: userID,
                            shelf_id: book.UserBook.shelf_id,
                            pages_read: book.UserBook.pages_read,
                            rating: book.UserBook.rating,
                            review: book.UserBook.review,
                            is_favourite: book.UserBook.is_favourite,
                        },
                    };
                    books.push(newBook);
                }

                setShelfBooks(books);
            })
            .catch((error) => console.log("error", error));}
        // for the recommendations shelf
        else{
            fetch(`http://localhost:8000/users/${userID}/recommended`,
            requestOptions
            )
            .then((response) => response.json())
            .then((result) => {
                
                for (const book of result) {
                    let newBook: Book = {
                        isbn: book.isbn,
                        bookInfo: {
                            title: book.BookInfo.title,
                            year: book.BookInfo.year,
                            blurb: book.BookInfo.blurb,
                            cover_url: book.BookInfo.cover_url,
                            page_no: book.BookInfo.page_no,
                            author: book.BookInfo.author_id,                            
                            publisher: "",
                            genre: [book.genre],
                        },
                        userBook: {
                            user_id: userID,
                            shelf_id: shelfID,
                            pages_read: 0,
                            rating: 0,
                            review: "no review" ,
                            is_favourite: false,
                        },
                    };
                    books.push(newBook);
                }

                setShelfBooks(books);
            })
            .catch((error) => console.log("error", error));}         
    }, [shelfID, userID]);

    // render the shelf as a whole
    return (
        <Box
            borderRadius="lg"
            shadow="lg"
            p="1.5rem"
            bgColor="white"
            minWidth="lg"
        >
            <Flex justify="space-between" mb="1.5rem">
                <Heading as="h2" size="md" data-testid={shelfID}>
                    {shelfName}
                </Heading>
            </Flex>
            <Stack
                direction={"row"}
                overflow="scroll"
                maxWidth="90vw"
                alignItems="flex-end"
            >
                {renderBooks(shelfBooks, shelfID)}
            </Stack>
        </Box>
    );
}

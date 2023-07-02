import { Stack, Image, Heading, Box, Flex } from "@chakra-ui/react";
import React, { ReactElement, useEffect, useState } from "react";
import { Book, testBooks } from "../types/Book";
import { Link } from "react-router-dom";


type Props = {
    shelfID: number;
    userID: string;
    shelfName: string;
};

export const shelfNames: { [key: number]: string } = {
    0: "To Read",
    1: "Reading",
    2: "Finished",
    3: "Did Not Finish",
    4: "Favorites",
    5: "Recommended",
};

function renderBooks(books: Book[], shelfID: number): ReactElement[] {
    const elements = Array<ReactElement>();

    for (const book of books) {
        // console.log(book);
            elements.push(
                    <Image
                        maxWidth="9rem"
                        objectFit="cover"
                        shadow="dark-lg"
                        src={book.bookInfo.cover_url}
                        data-testid={"book-" + book.userBook.shelf_id}
                    />
            );   
    }

    return elements;
}

export default function Shelf({ shelfID, userID, shelfName }: Props) {
    const [shelfBooks, setShelfBooks] = useState<Book[]>([]);

    // useEffect(() => {
    //     // get the userBooks when the shelf loads
    //     let books: Book[] = [];

    //     let requestOptions: RequestInit = {
    //         method: "GET",
    //         redirect: "follow",
    //     };
    //     if(shelfID>=0&&shelfID<=3){
    //         fetch(`http://localhost:8000/users/${userID}/shelves/${shelfID}`,
    //         requestOptions
    //         )
    //         .then((response) => response.json())
    //         .then((result) => {
                
    //             for (const book of result) {
    //                 let newBook: Book = {
    //                     isbn: book.UserBook.isbn,
    //                     bookInfo: {
    //                         title: book.BookInfo.title,
    //                         year: book.BookInfo.year,
    //                         blurb: book.BookInfo.blurb,
    //                         cover_url: book.BookInfo.cover_url,
    //                         page_no: book.BookInfo.page_no,
    //                         author: book.name,
    //                         publisher: "",
    //                         genre: [book.genre],
    //                     },
    //                     userBook: {
    //                         user_id: userID,
    //                         shelf_id: shelfID,
    //                         pages_read: book.UserBook.pages_read,
    //                         rating: book.UserBook.rating,
    //                         review: book.UserBook.review,
    //                         is_favourite: book.UserBook.is_favourite,
    //                     },
    //                 };

    //                 books.push(newBook);
    //             }
    //             setShelfBooks(books);
    //         })
    //         .catch((error) => console.log("error", error));}
    //     else if (shelfID==4){
    //         fetch(`http://localhost:8000/users/${userID}/favourites`,requestOptions)
    //         .then((response) => response.json())
    //         .then((result) => {
                
    //             for (const book of result) {
    //                 let newBook: Book = {
    //                     isbn: book.UserBook.isbn,
    //                     bookInfo: {
    //                         title: book.BookInfo.title,
    //                         year: book.BookInfo.year,
    //                         blurb: book.BookInfo.blurb,
    //                         cover_url: book.BookInfo.cover_url,
    //                         page_no: book.BookInfo.page_no,
    //                         author: book.name,
    //                         publisher: "",
    //                         genre: [book.genre],
    //                     },
    //                     userBook: {
    //                         user_id: userID,
    //                         shelf_id: book.UserBook.shelf_id,
    //                         pages_read: book.UserBook.pages_read,
    //                         rating: book.UserBook.rating,
    //                         review: book.UserBook.review,
    //                         is_favourite: book.UserBook.is_favourite,
    //                     },
    //                 };
    //                 books.push(newBook);
    //             }

    //             setShelfBooks(books);
    //         })
    //         .catch((error) => console.log("error", error));}
    //     else{
    //         fetch(`http://localhost:8000/users/${userID}/recommended`,
    //         requestOptions
    //         )
    //         .then((response) => response.json())
    //         .then((result) => {
                
    //             for (const book of result) {
    //                 let newBook: Book = {
    //                     isbn: book.isbn,
    //                     bookInfo: {
    //                         title: book.BookInfo.title,
    //                         year: book.BookInfo.year,
    //                         blurb: book.BookInfo.blurb,
    //                         cover_url: book.BookInfo.cover_url,
    //                         page_no: book.BookInfo.page_no,
    //                         author: book.BookInfo.author_id,                            
    //                         publisher: "",
    //                         genre: [book.genre],
    //                     },
    //                     userBook: {
    //                         user_id: userID,
    //                         shelf_id: shelfID,
    //                         pages_read: 0,
    //                         rating: 0,
    //                         review: "no review" ,
    //                         is_favourite: false,
    //                     },
    //                 };
    //                 books.push(newBook);
    //             }

    //             setShelfBooks(books);
    //         })
    //         .catch((error) => console.log("error", error));}         
    // }, [shelfID, userID]);

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
                {renderBooks(testBooks, shelfID)}
            </Stack>
        </Box>
    );
}

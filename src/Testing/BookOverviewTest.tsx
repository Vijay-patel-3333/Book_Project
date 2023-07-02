import React from "react";
import { shelfNames } from "../components/Shelf";
import { Link, useLocation } from "react-router-dom";
import { Image, Heading, Text, Box, Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from "react";

// import "./BookOverview.css";

type Props = {
    id: number;
    shelfName: string;
    books: Book[];
};


const shelfIDS: { [key: string]:Number } = {
    "To Read":0,
    "Reading":1,
    "Finished":2,
    "Did Not Finish":3,
    "Favorites":4,
    "Recommended":5,
};
export type Book = {
   isbn: number;
   bookInfo: {
       title: string;
       year: number;
       blurb: string;
       cover_url: string;
       page_no: number;
       author: string;
       publisher: string;
       genre: string[];
   };
   userBook: {
       user_id: number;
       shelf_id: number;
       pages_read: number;
       rating: number;
       is_favourite:boolean,
       review: string;
   };
}

export const testBooks: Book[] = [
   {
       isbn: 1,
       bookInfo: {
           title: "Test 1",
           year: 1990,
           blurb: "Summary",
           cover_url: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1617768316i/68428.jpg",
           page_no: 0,
           author: "author",
           publisher: "publisher",
           genre: ["fantasy"]
       },
       userBook: {
           user_id: 1,
           shelf_id: 1,
           pages_read: 1,
           rating: 1,
           is_favourite:true,
           review: "review"
       }
   }
]



function BookOverview() {
    const location = useLocation();
    const book = testBooks[0];
    const navigate = useNavigate();
    const [edit,setEdit]=useState(false);
    const [currentShelf,setCurrentShelf]=useState(shelfNames[book.userBook.shelf_id])
    const [shelfID,setShelfID]=useState(book.userBook.shelf_id);
    const [favorite,setfavorite]=useState(book.userBook.is_favourite);
    const [favText, setfavText] = useState(()=>{if (favorite==true){
        return '❤️';}
        return '♡';
    });

    const handleEdit = () => {
        setEdit(true);
    };

    const goBack = () => {
        navigate(-1);
    };


    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        // do the rest here
        console.log(event.target.value);
        setCurrentShelf(event.target.value); 
        console.log(shelfIDS[event.target.value]);
        // setShelfID(shelfIDS[event.target.value]);
        // setShelfID(0);
           
    }
    const handlefav= () => {
        if(favorite==true){
            setfavorite(false);
            setfavText("♡");
            console.log(favorite); 
            var myHeaders = new Headers();
            myHeaders.append("accept", "application/json");
            myHeaders.append("Content-Type", "application/json");
            console.log( "inside useEffect "+favorite)
            var raw = JSON.stringify({
            "is_favourite": false 
            });
            fetch(`http://localhost:8000/users/${book.userBook.user_id}/books/${book.isbn}`, 
            { method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'})
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));  
        }
        else{
            setfavorite(true);
            setfavText("❤️");
            console.log(favorite);
            var myHeaders = new Headers();
            myHeaders.append("accept", "application/json");
            myHeaders.append("Content-Type", "application/json");
            console.log( "inside useEffect "+favorite)
            var raw = JSON.stringify({
            "is_favourite": true 
            });
            fetch(`http://localhost:8000/users/${book.userBook.user_id}/books/${book.isbn}`, 
            { method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'})
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));  
            
            
         }
    }
    const handleAdd= () => {
            console.log(book);
            var myHeaders = new Headers();
            myHeaders.append("accept", "application/json");
            myHeaders.append("Content-Type", "application/json");
            console.log( "inside useEffect "+favorite)
            var raw = JSON.stringify({
                "isbn": book.isbn,
                "shelf_id": 0,
                    
                
                
            });
            fetch(`http://localhost:8000/users/${book.userBook.user_id}/books`, 
            { method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'})
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));  
        
    }
    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        console.log( "inside useEffect "+shelfID)
        var raw = JSON.stringify({
        "shelf_id": shelfID
        });
        fetch(`http://localhost:8000/users/${book.userBook.user_id}/books/${book.isbn}`, 
        { method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'}
        )
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }, [shelfID]);     
            

    
    if(currentShelf=="Recommended"){
        return (
            <Flex direction="column" alignItems="center" p="1rem">
                <Heading as="h1">Book Details</Heading>
                <Flex direction="row" m="4rem">
                    <Image
                        data-testid="image"
                        src={book.bookInfo.cover_url}
                        maxHeight="sm"
                        boxShadow="dark-lg"
                        alt="image"
                        className="img"
                    />
                    <Box
                        className="detail"
                        ml="4rem"
                        p="2rem"
                        // bgColor="gray.50"
                        minWidth="2xs"
                    >
                        <Heading as="h2" fontSize="3xl" mb="1rem">
                            {book.bookInfo.title}
                        </Heading>
                        <Text>
                            <b>Shelf:</b> 
                        
                        {edit ? 
                        <select name="dog-names" id="dog-names" onChange={handleChange} value={currentShelf} defaultValue={currentShelf}>
                            <option value="To Read">To Read</option>
                            <option value="Reading">Reading</option>
                            <option value="Finished">Finished</option>
                            <option value="Did Not Finish">Did Not Finish</option>
                            <option value="Recommended">Recommended</option>

                        </select>: shelfNames[book.userBook.shelf_id]
                        }
                        </Text>                  
                        
                        <Text>
                            <b>Genre(s):</b> {book.bookInfo.genre}
                        </Text>
                        <Text>
                            <b>Author(s):</b> {book.bookInfo.author}
                        </Text>
                        <Text>
                            <b>Summary:</b> {book.bookInfo.blurb}
                        </Text>
                        <Text>
                            <b>Rating:</b> {book.userBook.rating}
                        </Text>
                        <Text>
                            <b>Review:</b> {book.userBook.review}
                        </Text>
                        <br/>
                        <Button  onClick={handleAdd} colorScheme='teal' size='sm'>
                            Add to Read
                        </Button>
                         
                    </Box>
                </Flex>
                <Button
                    onClick={goBack}
                    className="back-button"
                    justifySelf="right"
                >
                    &larr; Go Back
                </Button>
            </Flex>
        );
    }
    else
    return (
        <Flex direction="column" alignItems="center" p="1rem">
            <Heading as="h1">Book Details</Heading>
            <Flex direction="row" m="4rem">
                <Image
                    data-testid="image"
                    src={book.bookInfo.cover_url}
                    maxHeight="sm"
                    boxShadow="dark-lg"
                    alt="image"
                    className="img"
                />
                <Box
                    className="detail"
                    ml="4rem"
                    p="2rem"
                    // bgColor="gray.50"
                    minWidth="2xs"
                >
                    <Heading as="h2" fontSize="3xl" mb="1rem">
                        {book.bookInfo.title}
                    </Heading>
                    <Text data-testid="dropdown">
                        <b>Shelf:</b> 
                    
                    {edit ? 
                    <select  name="dog-names" id="dog-names" onChange={handleChange} value={currentShelf} defaultValue={currentShelf}>
                        <option value="To Read">To Read</option>
                        <option value="Reading">Reading</option>
                        <option value="Finished">Finished</option>
                        <option value="Did Not Finish">Did Not Finish</option>
                    </select>: shelfNames[book.userBook.shelf_id]
                    }
                    </Text>                  
                    
                    <Text>
                        <b>Genre(s):</b> {book.bookInfo.genre}
                    </Text>
                    <Text>
                        <b>Author(s):</b> {book.bookInfo.author}
                    </Text>
                    <Text>
                        <b>Summary:</b> {book.bookInfo.blurb}
                    </Text>
                    <Text>
                        <b>Rating:</b> {book.userBook.rating}
                    </Text>
                    <Text>
                        <b>Review:</b> {book.userBook.review}
                    </Text>
                    <br/>
                    <Button data-testid="editButton" onClick={handleEdit} colorScheme='teal' size='sm'>
                        Edit
                    </Button>
                    <Button  data-testid="favButton" onClick={handlefav} >
                        {favText}
                    </Button>    
                </Box>
            </Flex>
            <Button
            data-testid="backbutton"
                onClick={goBack}
                className="back-button"
                justifySelf="right"
            >
                &larr; Go Back
            </Button>
        </Flex>
    );
}

export default BookOverview;

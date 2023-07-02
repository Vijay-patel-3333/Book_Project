import { VStack } from "@chakra-ui/react";
import Shelf from "../components/Shelf";

// shelfview component that shows all 6 shelves 
export default function ShelfView() {
    return (
        <VStack spacing={3}>
            <Shelf shelfID={0} userID={"1234"} shelfName="To Read" />
            <Shelf shelfID={1} userID={"1234"} shelfName="Reading" />
            <Shelf shelfID={2} userID={"1234"} shelfName="Finished" />
            <Shelf shelfID={3} userID={"1234"} shelfName="Did Not Finish" />
            <Shelf shelfID={4} userID={"1234"} shelfName="Favorites" />
            <Shelf shelfID={5} userID={"1234"} shelfName="Recommended" />
        </VStack>
    );
}

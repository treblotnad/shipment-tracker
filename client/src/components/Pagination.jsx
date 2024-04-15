import {
  Box,
  Text,
  SimpleGrid,
  Grid,
  Center,
  Select,
  Button,
  Stack,
  ChakraProvider,
} from "@chakra-ui/react";
import {
  Pagination,
  usePagination,
  PaginationPage,
  PaginationNext,
  PaginationPrevious,
  PaginationPageGroup,
  PaginationContainer,
  PaginationSeparator,
} from "@ajna/pagination";
import { useState, useEffect } from "react";

import ShipmentCard from "./shipmentCard";

function pageSlice(array, pageSize, pageNum) {
  return array.slice((pageNum - 1) * pageSize, pageNum * pageSize);
}

function PaginationObj({ props }) {
  const [packagesTotal, setPackagesTotal] = useState(1);
  const [packages, setPackages] = useState([]);
  const outerLimit = 2;
  const innerLimit = 2;

  const {
    pages,
    pagesCount,
    offset,
    currentPage,
    setCurrentPage,
    setIsDisabled,
    isDisabled,
    pageSize,
    setPageSize,
  } = usePagination({
    total: packagesTotal,
    limits: { outer: outerLimit, inner: innerLimit },
    initialState: {
      pageSize: 5,
      isDisabled: false,
      currentPage: 1,
    },
  });
  useEffect(() => {
    const pagePackages = pageSlice(props, pageSize, offset);
    setPackages(pagePackages);
    setPackagesTotal(props.length);
  }, [currentPage, pageSize, offset]);

  const handlePageChange = (nextPage) => {
    setCurrentPage(nextPage);
  };
  const handlePageSizeChange = (event) => {
    const pageSize = Number(event.target.value);
    setPageSize(pageSize);
  };
  console.log(props);
  return (
    <ChakraProvider>
      <Stack>
        <Pagination
          pagesCount={pagesCount}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        >
          <PaginationContainer
            align="center"
            justify="space-between"
            p={4}
            w="full"
          >
            <PaginationPrevious
              _hover={{ bg: "yellow.400" }}
              bg="yellow.300"
              onClick={() => console.log("Previous Page")}
            >
              <Text>Previous</Text>
            </PaginationPrevious>
            <PaginationPageGroup
              isInline
              align="center"
              separator={
                <PaginationSeparator
                  onClick={() => console.log("Separator component")}
                  bg="blue.300"
                  fontSize="sm"
                  w={7}
                  jumpSize={11}
                />
              }
            >
              {pages.map((page) => (
                <PaginationPage
                  w={7}
                  bg="red.300"
                  key={`pagination_page_${page}`}
                  page={page}
                  onClick={() => console.log("Page Selected")}
                  fontSize="sm"
                  _hover={{
                    bg: "green.300",
                  }}
                  _current={{
                    bg: "green.300",
                    fontSize: "sm",
                    w: 7,
                  }}
                />
              ))}
            </PaginationPageGroup>
            <PaginationNext
              _hover={{
                bg: "yellow.400",
              }}
              bg="yellow.300"
              onClick={() => console.log("Next Page")}
            >
              <Text>Next</Text>
            </PaginationNext>
          </PaginationContainer>
        </Pagination>
        <Center>
          <Select ml={3} onChange={handlePageSizeChange} w={40}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </Select>
        </Center>
      </Stack>
    </ChakraProvider>
  );
}

export default PaginationObj;

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
  Accordion,
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

function pageSlice(array, pageSize, offset) {
  return array.slice(offset, offset + pageSize);
}

function PaginationObj({ props, dbProps }) {
  const [packagesTotal, setPackagesTotal] = useState(1);
  const [packages, setPackages] = useState([]);
  const [sort, setSort] = useState("ETA-Desc");

  const outerLimit = 2;
  const innerLimit = 2;

  const {
    pages,
    pagesCount,
    offset,
    currentPage,
    setCurrentPage,
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
  }, [
    currentPage,
    pageSize,
    offset,
    sort,
    props,
    dbProps,
    PaginationPage,
    pages,
  ]);

  const handlePageChange = (nextPage) => {
    setCurrentPage(nextPage);
  };
  const handlePageSizeChange = (event) => {
    const pageSize = Number(event.target.value);
    setPageSize(pageSize);
  };
  const handleSortChange = (event) => {
    const sort = event.target.value;
  };
  return (
    <ChakraProvider>
      <Stack>
        <SimpleGrid columns={{ sm: 1, md: 1, lg: 1 }} spacing={5}>
          <Accordion allowMultiple>
            {packages.map((shipment) => (
              <ShipmentCard
                shipmentId={shipment.mongoId}
                key={shipment.mongoId}
                tracking_number={shipment.tracking_number}
                slug={shipment.slug}
              >
                test
              </ShipmentCard>
            ))}
          </Accordion>
        </SimpleGrid>

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
          <Select mr={10} onChange={handlePageSizeChange} w={20}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </Select>
          <Select ml={10} w={120} onChange={handleSortChange}>
            <option value="ETA-Desc">ETA-Desc</option>
            <option value="ETA-Asc">ETA-Asc</option>
            <option value=""></option>
          </Select>
        </Center>
      </Stack>
    </ChakraProvider>
  );
}

export default PaginationObj;

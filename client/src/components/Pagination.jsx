import {
  Text,
  SimpleGrid,
  Center,
  Select,
  Stack,
  ChakraProvider,
  Accordion,
  Checkbox,
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
import { dateToWeekDate, dateToShortDate } from "../utils/datetime";
import ShipmentCard from "./shipmentCard";

function pageSlice(array, pageSize, offset) {
  return array.slice(offset, offset + pageSize);
}
function etaDefine(props) {
  //   console.log(props);
  if (props.current_status === "Delivered") {
    return props.trackings.shipment_delivery_date;
  } else {
    return props.trackings.expected_delivery || "Not available";
  }
}
function PaginationObj({ props, dbProps }) {
  const [packagesTotal, setPackagesTotal] = useState(1);
  const [sort, setSort] = useState("ETA-Desc");
  const [checkedItems, setCheckedItems] = useState([true, true]);
  const [packages, setPackages] = useState(props);

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
  function checkFilter(packages) {
    if (checkedItems[0] && checkedItems[1]) {
      return packages;
    }
    if (!checkedItems[0] && checkedItems[1]) {
      return packages.filter(
        (packageIndex) => !(packageIndex.current_status == "Delivered")
      );
    }
    if (checkedItems[0] && !checkedItems[1]) {
      return packages.filter(
        (packageIndex) => packageIndex.current_status == "Delivered"
      );
    }
    if (!checkedItems[0] && !checkedItems[1]) {
      return [];
    }
  }

  useEffect(() => {
    const pagePackages = pageSlice(props, pageSize, offset);
    setPackages(pagePackages);
    setPackagesTotal(props.length);
    const packagesTemp = checkFilter(props);
    // const eta = packagesTemp.map((packTemp) => etaDefine(packTemp));
    // const packagesEta = { packagesTemp, eta };

    function etaObjCreator() {
      let packagesEta = [];
      for (let i = 0; i < packagesTemp.length; i++) {
        let eta = etaDefine(packagesTemp[i]);
        // console.log(eta);
        let packageIndex = packagesTemp[i];
        packagesEta[i] = { eta, ...packageIndex };
      }
      return packagesEta;
    }
    const packagesEta = etaObjCreator();
     packagesEta.sort(function (a, b) {
      if (sort === "ETA-Desc") {
        return new Date(b.eta) - new Date(a.eta);
      } else {
        return new Date(a.eta) - new Date(b.eta);
      }
    });
    // console.log(packagesSorted);
    console.log(packagesEta);
    setPackages(packagesEta);
  }, [
    currentPage,
    pageSize,
    offset,
    sort,
    props,
    dbProps,
    PaginationPage,
    pages,
    checkedItems,
  ]);

  const handlePageChange = (nextPage) => {
    setCurrentPage(nextPage);
  };
  const handlePageSizeChange = (event) => {
    const pageSize = Number(event.target.value);
    setPageSize(pageSize);
  };
  const handleSortChange = (event) => {
    setSort(event.target.value);
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
                props={shipment}
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
          </Select>
          <Stack ml={20}>
            <Checkbox
              isChecked={checkedItems[0]}
              onChange={(e) =>
                setCheckedItems([e.target.checked, checkedItems[1]])
              }
            >
              Delivered
            </Checkbox>
            <Checkbox
              isChecked={checkedItems[1]}
              onChange={(e) =>
                setCheckedItems([checkedItems[0], e.target.checked])
              }
            >
              In Transit
            </Checkbox>
          </Stack>
        </Center>
      </Stack>
    </ChakraProvider>
  );
}

export default PaginationObj;

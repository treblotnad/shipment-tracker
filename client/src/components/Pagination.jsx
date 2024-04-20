import {
  Text,
  SimpleGrid,
  Center,
  Select,
  Stack,
  ChakraProvider,
  Accordion,
  Checkbox,
  Flex,
  useBreakpointValue,
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
import ShipmentCard from "./ShipmentCard";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

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
    const packagesSorted = packagesEta.sort(function (a, b) {
      if (sort === "ETA-Desc") {
        return new Date(b.eta) - new Date(a.eta);
      } else {
        return new Date(a.eta) - new Date(b.eta);
      }
    });
    // console.log(packagesSorted);
    // console.log(packagesEta);

    const pagePackages = pageSlice(packagesSorted, pageSize, offset);
    setPackages(pagePackages);
    setPackagesTotal(packagesSorted.length);
    setAccordionIndex(-1);
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
  const isNarrowScreen = useBreakpointValue({ base: true, lg: false });
  const isMobile = useBreakpointValue({ base: true, sm: false });
  const [accordionIndex, setAccordionIndex] = useState(-1);

  function changeIndex(e) {
    setAccordionIndex(e);
  }

  return (
    <ChakraProvider>
      <Stack spacing={5}>
        <SimpleGrid columns={{ sm: 1, md: 1, lg: 1 }}>
          <Accordion
            allowToggle
            defaultIndex={-1}
            onChange={changeIndex}
            index={accordionIndex}
          >
            {packages.map((shipment) => (
              <ShipmentCard
                shipmentId={shipment.mongoId}
                key={shipment.mongoId}
                tracking_number={shipment.tracking_number}
                slug={shipment.slug}
                props={shipment}
              />
            ))}
          </Accordion>
        </SimpleGrid>

        {/* Combine sorting and pagination into one row */}
        <Flex justifyContent="space-between" alignItems="center" w="full" p={2}>
          {/* Left-side - Sorting and results count */}
          <Flex alignItems="center">
            {isMobile ? (
              <Stack direction="column">
                {isNarrowScreen ? (
                  <Stack direction="column">
                    <Select
                      onChange={handlePageSizeChange}
                      w={150}
                      h={8}
                      mr={4}
                    >
                      <option value="5">5 per page</option>
                      <option value="10">10 per page</option>
                      <option value="20">20 per page</option>
                    </Select>
                    <Select onChange={handleSortChange} w={180} h={8}>
                      <option value="ETA-Desc">Sort by Recent</option>
                      <option value="ETA-Asc">Sort by Oldest</option>
                    </Select>
                  </Stack>
                ) : (
                  <Stack direction="row">
                    <Select
                      onChange={handlePageSizeChange}
                      w={150}
                      h={8}
                      mr={4}
                    >
                      <option value="5">5 per page</option>
                      <option value="10">10 per page</option>
                      <option value="20">20 per page</option>
                    </Select>
                    <Select onChange={handleSortChange} w={180} h={8}>
                      <option value="ETA-Desc">Sort by Recent</option>
                      <option value="ETA-Asc">Sort by Oldest</option>
                    </Select>
                  </Stack>
                )}
                {isNarrowScreen ? (
                  <Stack spacing={1} direction="column" ml={3}>
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
                ) : (
                  <Stack spacing={1} direction="row" ml={3}>
                    <Checkbox
                      isChecked={checkedItems[0]}
                      mx={4}
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
                )}
              </Stack>
            ) : (
              <Stack direction="row">
                {isNarrowScreen ? (
                  <Stack direction="column">
                    <Select
                      onChange={handlePageSizeChange}
                      w={150}
                      h={8}
                      mr={4}
                    >
                      <option value="5">5 per page</option>
                      <option value="10">10 per page</option>
                      <option value="20">20 per page</option>
                    </Select>
                    <Select onChange={handleSortChange} w={180} h={8}>
                      <option value="ETA-Desc">Sort by Recent</option>
                      <option value="ETA-Asc">Sort by Oldest</option>
                    </Select>
                  </Stack>
                ) : (
                  <Stack direction="row">
                    <Select
                      onChange={handlePageSizeChange}
                      w={150}
                      h={8}
                      mr={4}
                    >
                      <option value="5">5 per page</option>
                      <option value="10">10 per page</option>
                      <option value="20">20 per page</option>
                    </Select>
                    <Select onChange={handleSortChange} w={180} h={8}>
                      <option value="ETA-Desc">Sort by Recent</option>
                      <option value="ETA-Asc">Sort by Oldest</option>
                    </Select>
                  </Stack>
                )}
                {isNarrowScreen ? (
                  <Stack spacing={1} direction="column" ml={3}>
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
                ) : (
                  <Stack spacing={1} direction="row" ml={3}>
                    <Checkbox
                      isChecked={checkedItems[0]}
                      mx={4}
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
                )}
              </Stack>
            )}
          </Flex>

          {/* Right-side - Pagination controls */}
          <Pagination
            pagesCount={pagesCount}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          >
            <PaginationContainer
              align="center"
              justify="flex-end"
              p={0}
              w="auto"
            >
              <PaginationPrevious
                _hover={{ bg: "gray.400" }}
                mr={-4}
                mt={-4}
                h={8}
              >
                <ArrowBackIcon />
              </PaginationPrevious>
              <PaginationPageGroup
                align="center"
                separator={
                  <PaginationSeparator
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
                    bg="gray.100"
                    h={7}
                    key={`pagination_page_${page}`}
                    page={page}
                    fontSize="sm"
                    _hover={{ bg: "green.300" }}
                    _current={{ bg: "green.300", fontSize: "sm", w: 7 }}
                  />
                ))}
              </PaginationPageGroup>
              <PaginationNext
                _hover={{ bg: "gray.400" }}
                ml="1rem"
                mt={-4}
                h={8}
              >
                <ArrowForwardIcon />
              </PaginationNext>
            </PaginationContainer>
          </Pagination>
        </Flex>
      </Stack>
    </ChakraProvider>
  );
}

export default PaginationObj;

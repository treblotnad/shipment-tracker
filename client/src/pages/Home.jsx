import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { Container, Col, Form, Button, Card, Row } from "react-bootstrap";

import Auth from "../utils/auth";
import { saveShipmentIds, getSavedShipmentIds } from "../utils/localStorage";

import { useMutation } from "@apollo/client";
import { SAVE_SHIPMENT } from "../utils/mutations";

//import the query to get the tracking information for a search
import { GET_TRACKING_INFO } from "../utils/queries";
import { matchCarrier } from "../utils/carrierValidate";
// import axios from "axios";


const Home = () => {

  const [trackingNumber, setTrackingNumber] = useState('');
  const [carrier, setCarrier] = useState('');
  const [fetchTrackingInfo, { data, loading, error }] = useLazyQuery(GET_TRACKING_INFO);

  const handleSearch = () => {
    if (!trackingNumber || !carrier) {
      alert('Please enter both tracking number and carrier.');
      return;
    }
    fetchTrackingInfo({
      variables: { tracking: trackingNumber, carrier: carrier }
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'tracking') {
      setTrackingNumber(value);
    } else if (name === 'carrier') {
      setCarrier(value);
    }
  };

  return (
    <main>
      <h1>Track a Package</h1>
      <section id="search-container">
        <form id="search-form" onSubmit={(e) => e.preventDefault()}>
          <label>Tracking Number</label>
          <input type="text" id="input-tracking-number" name="tracking" placeholder="Type in Tracking Number" value={trackingNumber} onChange={handleInputChange} />
          <label>Carrier:</label>
          <input type="text" name="carrier" placeholder="Carrier" value={carrier} onChange={handleInputChange} />
          <button type="button" id="search-button" onClick={handleSearch}>Search</button>
        </form>
      </section>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      {data && (
        <section id="results-container">
          <div className="results">
            <h3>Tracking Details:</h3>
            <div className="card">
              <p>Status: {data.getTrackingInfo.isDelivered ? 'Deliverd' : 'In Transit'}</p>
            </div>
          </div>
        </section>
      )}

    </main>

    //         <>
    //             <div className="text-light bg-dark p-5">
    //                 <Container>
    //                     <h1>Search for Books!</h1>
    //                     <Form onSubmit={handleFormSubmit}>
    //                         <Row>
    //                             <Col xs={12} md={8}>
    //                                 <Form.Control
    //                                     name='searchInput'
    //                                     value={searchInput}
    //                                     onChange={(e) => setSearchInput(e.target.value)}
    //                                     type='text'
    //                                     size='lg'
    //                                     placeholder='Search for a book'
    //                                 />
    //                             </Col>
    //                             <Col xs={12} md={4}>
    //                                 <Button type='submit' variant='success' size='lg'>
    //                                     Submit Search
    //                                 </Button>
    //                             </Col>
    //                         </Row>
    //                     </Form>
    //                 </Container>
    //             </div>

    //             <Container>
    //                 <h2 className='pt-5'>
    //                     {searchedBooks.length
    //                         ? `Viewing ${searchedBooks.length} results:`
    //                         : 'Search for a book to begin'}
    //                 </h2>
    //                 <Row>
    //                     {searchedBooks.map((book) => {
    //                         return (
    //                             <Col md="4" key={book.bookId}>
    //                                 <Card border='dark'>
    //                                     {book.image ? (
    //                                         <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' />
    //                                     ) : null}
    //                                     <Card.Body>
    //                                         <Card.Title>{book.title}</Card.Title>
    //                                         <p className='small'>Authors: {book.authors}</p>
    //                                         <Card.Text>{book.description}</Card.Text>
    //                                         {Auth.loggedIn() && (
    //                                             <Button
    //                                                 disabled={savedBookIds?.some((savedBookId) => savedBookId === book.bookId)}
    //                                                 className='btn-block btn-info'
    //                                                 onClick={() => handleSaveBook(book.bookId)}>
    //                                                 {savedBookIds?.some((savedBookId) => savedBookId === book.bookId)
    //                                                     ? 'This book has already been saved!'
    //                                                     : 'Save this Book!'}
    //                                             </Button>
    //                                         )}
    //                                     </Card.Body>
    //                                 </Card>
    //                             </Col>
    //                         );
    //                     })}
    //                 </Row>
    //             </Container>
    //         </>
  );
};

export default Home;

import { useState, useEffect } from "react";
import { Container, Col, Form, Button, Card, Row } from "react-bootstrap";
//import the client utils API.js functions
import { createTracking, getTrackingDetails } from "../utils/API";

import Auth from "../utils/auth";
// import { searchGoogleBooks } from '../utils/API';
import { saveShipmentIds, getSavedShipmentIds } from "../utils/localStorage";

import { useMutation } from "@apollo/client";
import { SAVE_SHIPMENT } from "../utils/mutations";

const Home = () => {
  //     // create state for holding returned google api data
  //     const [searchedBooks, setSearchedBooks] = useState([]);
  //     // create state for holding our search field data
  //     const [searchInput, setSearchInput] = useState('');

  //     // create state to hold saved bookId values
  //     const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());

  //     const [saveBookMutation, { error }] = useMutation(SAVE_BOOK);

  //     // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
  //     // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  //     useEffect(() => {
  //         return () => saveBookIds(savedBookIds);
  //     });

  //     // create method to search for books and set state on form submit
  //     const handleFormSubmit = async (event) => {
  //         event.preventDefault();

  //         if (!searchInput) {
  //             return false;
  //         }

  //         try {
  //             const response = await searchGoogleBooks(searchInput);

  //             if (!response.ok) {
  //                 throw new Error('something went wrong!');
  //             }

  //             const { items } = await response.json();

  //             const bookData = items.map((book) => ({
  //                 bookId: book.id,
  //                 authors: book.volumeInfo.authors || ['No author to display'],
  //                 title: book.volumeInfo.title,
  //                 description: book.volumeInfo.description,
  //                 image: book.volumeInfo.imageLinks?.thumbnail || '',
  //             }));

  //             setSearchedBooks(bookData);
  //             setSearchInput('');
  //         } catch (err) {
  //             console.error(err);
  //         }
  //     };

  //     // create function to handle saving a book to our database
  //     const handleSaveBook = async (bookId) => {

  //         // find the book in `searchedBooks` state by the matching id
  //         const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

  //         // get token
  //         const token = Auth.loggedIn() ? Auth.getToken() : null;

  //         if (!token) {
  //             return false;
  //         }

  //         try {
  //             // const response = await saveBook(bookToSave, token);
  //             await saveBookMutation({
  //                 variables: { userId: Auth.getUser().data._id, bookData: { ...bookToSave } }
  //             });

  //             // if book successfully saves to user's account, save book id to state
  //             setSavedBookIds([...savedBookIds, bookToSave.bookId]);
  //         } catch (err) {
  //             console.error(err);
  //         }
  //     };

  const [trackingNumber, setTrackingNumber] = useState('');
  const [carrierSlug, setCarrierSlug] = useState('');
  const [trackingDetails, setTrackingDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const creationResult = await createTracking(trackingNumber, carrierSlug);
      const details = await getTrackingDetails(creationResult.data._id);
      setTrackingDetails(details);
    } catch (err) {
      setError(err.message);
      setTrackingDetails(null);
    }
    setLoading(false);
  };

  return (
    <>
      <main>
        <h1>Track a Package</h1>
        <section id="search-container">
          <form id="search-form">
            <label>Tracking Number</label>
            <input type="text" id="input-tracking-number" name="tracking" value={trackingNumber} onChange={e => setTrackingNumber(e.target.value)} placeholder="Type in Tracking Number"/>
            <label>Carrier:</label>
            <input type="text" value={carrierSlug} onChange={e => setCarrierSlug(e.target.value)} placeholder="Carrier" />
            <button type="submit" onClick={handleSearch} disabled={loading} id="search-button">Search</button>
          </form>
        </section>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        <section id="results-container">
          {trackingDetails && (
            <div className="results">
              <h3>Tracking Details</h3>
              <div className="card">
                <h4>Status: {trackingDetails.data.current.status}</h4>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
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

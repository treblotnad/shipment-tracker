import axios from 'axios';

//Configuration for TrackHive API (key and base url):
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MTA0YmEwNzVlMjkyMDA3YjkzZGFkOSIsImlhdCI6MTcxMjM0NDc1OX0.KXebc8gmV66x8Z1oCa13AGavRcCYYmxZzf9AfkYNeXU';
const URL_BASE = 'https://api.trackinghive.com/trackings';

//Function to create a tracking

export const createTracking = async (trackingNumber, carrierSlug) => {
    try {
        console.log('Request URL:', `${URL_BASE}`);
        console.log('Headers:', {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        });

        const response = await axios.post(`${URL_BASE}`, {
            tracking_number: trackingNumber,
            slug: carrierSlug
        }, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        //return response.data;
        console.log(response.data);

    } catch (error) {
        console.error('Error creating tracking:', error.response ? error.response.data: error);
        throw new Error(error.response ? error.response.data.meta.message : "An unknown error occured");
    }
};

//Function to get tracking details
export const getTrackingDetails = async (trackID) => {
    try {
        const response = await axios.get(`${URL_BASE}/${trackID}`, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching tracking details:', error.response.data);
        throw new Error(error.response.data.meta.message);
    }
};

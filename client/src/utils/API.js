import axios from 'axios';
import { getId } from '../utils/axiosAPI'; 

const handleSearch = async () => {
    if (!trackingNumber || !carrier) {
      alert('Please enter a valid tracking number.');
      return;
    }

    try {
        const hiveId = await getId(trackingNumber, carrier);
        fetchTrackingInfo({  
          variables: { hiveId: hiveId }
        });
    } catch (error) {
        console.error('Error fetching tracking info:', error);
    }
};

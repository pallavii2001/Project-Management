
import axios from 'axios';

const BASE_URL = 'http://localhost:3005/'; 

const ApiResponse = async (method, url, params = null,data=null, headers) => {
  try {
    const response = await axios({
      method,
      url: `${BASE_URL}${url}`,
      params,
      data,
      headers
    });
 
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default ApiResponse;
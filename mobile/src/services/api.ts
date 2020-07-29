import axios from 'axios';
import ip from 'ip';

const api = axios.create({
  // Development API address
  baseURL: `http://${ip.address()}:3333`
});

export default api;

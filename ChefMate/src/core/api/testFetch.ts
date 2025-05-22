import axios from 'axios';

export const testFetch = async () => {
  try {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    return res.data;
  } catch (err) {
    console.error('Axios fetch failed:', err);
    throw err;
  }
};

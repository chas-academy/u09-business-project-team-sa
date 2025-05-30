import { useEffect, useState } from 'react';
import { testFetch } from './testFetch';

const TestFetch = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    testFetch().then(setData).catch(console.error);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Test Fetch Result</h2>
      <pre className="bg-gray-100 p-2 rounded">
        {data ? JSON.stringify(data, null, 2) : 'Loading...'}
      </pre>
    </div>
  );
};

export default TestFetch;

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateMockData } from '../../utils/mockData';

export default function DataTable() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setData(generateMockData());
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredData = data.filter((item) =>
    Object.values(item).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.key) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const currentItems = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      <div className="mb-6 flex justify-between items-center">
        <motion.h1 
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          className="text-2xl font-bold text-gray-800"
        >
          User Data
        </motion.h1>
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative w-64"
        >
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            🔍
          </div>
        </motion.div>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['id', 'name', 'email', 'role', 'status', 'lastLogin'].map((key) => (
                <th 
                  key={key}
                  onClick={() => requestSort(key)}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <motion.div 
                    whileHover={{ scale: 1.03 }}
                    className="flex items-center"
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                    {sortConfig.key === key && (
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-1"
                      >
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </motion.span>
                    )}
                  </motion.div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <AnimatePresence>
              {currentItems.map((item) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ backgroundColor: 'rgba(249, 250, 251, 1)' }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <motion.div whileHover={{ x: 5 }} className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                        {item.name.charAt(0)}
                      </div>
                      {item.name}
                    </motion.div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <motion.span 
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${item.status === 'Active' ? 'bg-green-100 text-green-800' : 
                          item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                          item.status === 'Suspended' ? 'bg-red-100 text-red-800' : 
                          'bg-gray-100 text-gray-800'}`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {item.status}
                    </motion.span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.lastLogin}</td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <motion.div 
        className="flex justify-between items-center mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
          whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
          className={`px-4 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-200 text-gray-500' : 'bg-indigo-600 text-white'}`}
        >
          Previous
        </motion.button>
        
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <motion.button
              key={page}
              onClick={() => setCurrentPage(page)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentPage === page 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'hover:bg-gray-100'
              }`}
            >
              {page}
            </motion.button>
          ))}
        </div>
        
        <motion.button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
          whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
          className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-200 text-gray-500' : 'bg-indigo-600 text-white'}`}
        >
          Next
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
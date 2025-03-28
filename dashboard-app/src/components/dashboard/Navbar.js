import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiLogOut, FiTrash2, FiBell, FiSearch } from 'react-icons/fi';

export default function Navbar() {
  const { user, logout, deleteAccount } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  if (!user) return null;

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg py-3 px-6 flex justify-between items-center">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-bold text-xl text-white flex items-center gap-2"
      >
        <motion.span
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          
        </motion.span>
        ALGO ROOT 
      </motion.div>
      
      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSearchOpen(!searchOpen)}
          className="text-white"
        >
          <FiSearch size={20} />
        </motion.button>
        
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 200, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-white/20 text-white placeholder-white/70 px-3 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-white"
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-white relative"
        >
          <FiBell size={20} />
          <motion.span
            className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full h-4 w-4 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring' }}
          >
            3
          </motion.span>
        </motion.button>
        
        <div className="relative">
          <motion.button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <motion.div 
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-indigo-600 font-bold shadow-md"
              whileHover={{ rotate: 10 }}
            >
              {user.name.charAt(0).toUpperCase()}
            </motion.div>
          </motion.button>
          
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-10 divide-y divide-gray-100"
              >
                <div className="px-4 py-3">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
                <div className="py-1">
                  <button
                    onClick={logout}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FiLogOut className="mr-2" /> Logout
                  </button>
                  <button
                    onClick={deleteAccount}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <FiTrash2 className="mr-2" /> Delete Account
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
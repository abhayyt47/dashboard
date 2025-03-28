import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

const menuItems = [
  { name: 'Dashboard', path: '/dashboard', icon: '📊' },
  { name: 'Analytics', path: '/analytics', icon: '📈' },
  { name: 'Settings', path: '/settings', icon: '⚙️' },
];

export default function Sidebar() {
  const router = useRouter();

  return (
    <motion.div 
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className="w-64 bg-gradient-to-b from-indigo-900 to-purple-900 text-white min-h-screen p-6 shadow-xl"
    >
      <motion.h2 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-bold mb-8 flex items-center gap-2"
      >
        <span className="text-3xl">✨</span> Menu
      </motion.h2>
      
      <nav className="space-y-2">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.path}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href={item.path}
              className={`flex items-center gap-3 py-3 px-4 rounded-lg transition-all ${
                router.pathname === item.path 
                  ? 'bg-white/20 shadow-lg' 
                  : 'hover:bg-white/10'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          </motion.div>
        ))}
      </nav>
      
      <motion.div 
        className="mt-auto pt-6 border-t border-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="text-sm text-white/70">Current Plan: Pro</div>
        <div className="h-2 mt-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '65%' }}
            transition={{ delay: 0.6, type: 'spring' }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
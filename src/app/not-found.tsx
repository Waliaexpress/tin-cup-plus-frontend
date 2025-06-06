'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

export default function NotFound() {
    return (
        <motion.div
            className="flex flex-col items-center justify-center min-h-screen bg-white px-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 150 }}
                className="bg-red-100 text-red-600 p-4 rounded-full mb-6"
            >
                <AlertTriangle className="w-10 h-10" />
            </motion.div>

            <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-6 text-center">
                Oops! The page you’re looking for doesn’t exist.
            </p>
            <p className="text-xl text-gray-600 mb-6 text-center">
                Tincup Plus Restaurant
            </p>
            <Link
                href="/"
                className="bg-primary hover:bg-primary/80 text-white font-medium py-2 px-4 rounded transition-all duration-200"
            >
                Go back home
            </Link>
        </motion.div>
    );
}

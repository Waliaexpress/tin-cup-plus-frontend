// src/app/layout.js or pages/_app.js
'use client'; // If you're using Next.js 13+ with App Router

import { Provider } from 'react-redux';
import { store } from '@/store';

export default function StoreProvider({ children }:{children :React.ReactNode}) {
    return <Provider store={store}>{children}</Provider>;
}
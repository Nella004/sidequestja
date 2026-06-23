import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 pb-20 max-w-lg mx-auto w-full">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}

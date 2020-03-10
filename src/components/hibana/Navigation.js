import React from 'react';
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';

export default function Navigation({ className }) {
  return (
    <header className={className}>
      <DesktopNavigation />

      <MobileNavigation />
    </header>
  );
}

import React from 'react';
import DesktopNavigation from './DesktopNavigation';

export default function Navigation({ className }) {
  return (
    <header className={className}>
      <DesktopNavigation />
    </header>
  );
}

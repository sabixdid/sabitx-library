'use client';
import React from 'react';
import WebQRMesh from './WebQRMesh';

export default function WebNearbyMesh() {
  return (
    <main className="mx-auto max-w-3xl p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Nearby Mesh</h1>
      <WebQRMesh />
    </main>
  );
}

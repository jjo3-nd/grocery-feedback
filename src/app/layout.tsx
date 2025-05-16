import type { Metadata } from "next";
import "./globals.css";
import React from "react";

import ReactGA from 'react-ga4';
const TRACKING_ID = "G-0ZJD8NMBE7"; // your Measurement ID

ReactGA.initialize([
  {
    trackingId: TRACKING_ID
  },
]);

export const metadata: Metadata = {
  title: "Grocery Shopping Feedback",
  description: "Grocery shopping feedback and analysis application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
import type { Metadata } from "next";
import "./globals.css";
import React from "react";

import ReactGA from 'react-ga4';
const TRACKING_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;


if (TRACKING_ID) {
  ReactGA.initialize(TRACKING_ID);
  console.log("Google Analytics initialized with ID:", TRACKING_ID);
} else {
  console.warn("Google Analytics Tracking ID is not set. Tracking will be disabled.");
}


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
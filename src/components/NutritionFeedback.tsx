"use client";

import React, { useState, useRef } from 'react';
import { Bungee, Open_Sans } from 'next/font/google';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';

const bungee = Bungee({
  weight: '400',
  subsets: ['latin'],
});

const openSans = Open_Sans({
  subsets: ['latin'],
});

const NutritionFeedback = () => {
  const [selectedSection, setSelectedSection] = useState<keyof typeof plateData | null>(null); // Keep this one

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  
  const plateData = {
    vegetables: {
      score: '8/10',
      status: 'Good',
      details: 'Including Spinach and Broccoli in your diet has improved your vegetable intake.',
      icon: '/vegetables.png',
      color: '#74B744',
      iconPosition: { x: 100, y: 100 },
    },
    fruits: {
      score: '7/10',
      status: 'Good',
      details: 'Regular fruit consumption is helping maintain a balanced diet.',
      icon: '/fruits.png',
      color: '#D62128',
      iconPosition: { x: 300, y: 100 },
    },
    protein: {
      score: '10/10',
      status: 'Great',
      details: 'Including Egg Whites and Chicken Breast in your diet led to exceptional results.',
      icon: '/protein.png',
      color: '#5F4994',
      iconPosition: { x: 100, y: 300 },
    },
    grains: {
      score: '8/10',
      status: 'Good',
      details: 'Your whole grain intake is well-balanced.',
      icon: '/grains.png',
      color: '#E67323',
      iconPosition: { x: 300, y: 300 },
    },
    dairy: {
      score: '6/10',
      status: 'Fair',
      details: 'Consider reducing high-fat dairy products.',
      icon: '/dairy.png',
      color: '#5083C5',
      iconPosition: { x: 450, y: 200 },
    },
  };
  
  const headingColors = {
    title: '#1A365D',
    positiveChoices: '#A3AA4E',
    goalProgress: '#6B5286',
    myPlate: '#E4702D',
    otherNutrition: '#58504C',
    recommendations: '#D92027',
    progress: '#3E85C6'
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scroll({
        behavior: 'smooth',
      });
    }
  };

  const handleSectionClick = (section: keyof typeof plateData) => {
    setSelectedSection(section === selectedSection ? null : section);
  };


  const MyPlateSVG = () => {
    // Calculate the exact centers of each quadrant
    const radius = 200;
    const centerX = 200;
    const centerY = 200;
    const quadrantRadius = radius * 0.6; // (radius * Math.cos(45°)) for quadrant centers
    
    // Calculate exact center points for each section
    const centerPoints = {
      vegetables: {
        x: centerX - quadrantRadius * 0.7,  // top-left
        y: centerY - quadrantRadius * 0.7
      },
      fruits: {
        x: centerX + quadrantRadius * 0.7,  // top-right
        y: centerY - quadrantRadius * 0.7
      },
      protein: {
        x: centerX - quadrantRadius * 0.7,  // bottom-left
        y: centerY + quadrantRadius * 0.7
      },
      grains: {
        x: centerX + quadrantRadius * 0.7,  // bottom-right
        y: centerY + quadrantRadius * 0.7
      }
    };
  
    const iconSize = 110; // Size of the icons
    const halfIconSize = iconSize / 2;
  
    return (
      <div className="relative w-full max-w-md mx-auto">
        <svg viewBox="0 0 500 400" className="w-full h-auto max-w-sm mx-auto">
          {/* Base plate circle */}
          <circle 
            cx={centerX} 
            cy={centerY} 
            r={radius} 
            fill="none" 
            stroke="transparent" 
          />
  
          {/* Vegetables (top-left) */}
          <g onClick={() => handleSectionClick('vegetables')} className="cursor-pointer">
            <path 
              d="M200,200 L200,0 A200,200 0 0,0 0,200 Z" 
              fill={plateData.vegetables.color}
              className="transition-all hover:opacity-60"
            />
            <svg 
              x={centerPoints.vegetables.x - halfIconSize} 
              y={centerPoints.vegetables.y - halfIconSize} 
              width={iconSize} 
              height={iconSize}
            >
              <image
                href={plateData.vegetables.icon}
                width={iconSize}
                height={iconSize}
                preserveAspectRatio="xMidYMid meet"
              />
            </svg>
          </g>
  
          {/* Fruits (top-right) */}
          <g onClick={() => handleSectionClick('fruits')} className="cursor-pointer">
            <path 
              d="M200,200 L400,200 A200,200 0 0,0 200,0 Z" 
              fill={plateData.fruits.color}
              className="transition-all hover:opacity-60"
            />
            <svg 
              x={centerPoints.fruits.x - halfIconSize} 
              y={centerPoints.fruits.y - halfIconSize} 
              width={iconSize} 
              height={iconSize}
            >
              <image
                href={plateData.fruits.icon}
                width={iconSize}
                height={iconSize}
                preserveAspectRatio="xMidYMid meet"
              />
            </svg>
          </g>
  
          {/* Protein (bottom-left) */}
          <g onClick={() => handleSectionClick('protein')} className="cursor-pointer">
            <path 
              d="M200,200 L0,200 A200,200 0 0,0 200,400 Z" 
              fill={plateData.protein.color}
              className="transition-all hover:opacity-60"
            />
            <svg 
              x={centerPoints.protein.x - halfIconSize} 
              y={centerPoints.protein.y - halfIconSize} 
              width={iconSize} 
              height={iconSize}
            >
              <image
                href={plateData.protein.icon}
                width={iconSize}
                height={iconSize}
                preserveAspectRatio="xMidYMid meet"
              />
            </svg>
          </g>
  
          {/* Grains (bottom-right) */}
          <g onClick={() => handleSectionClick('grains')} className="cursor-pointer">
            <path 
              d="M200,200 L200,400 A200,200 0 0,0 400,200 Z" 
              fill={plateData.grains.color}
              className="transition-all hover:opacity-60"
            />
            <svg 
              x={centerPoints.grains.x - halfIconSize} 
              y={centerPoints.grains.y - halfIconSize} 
              width={iconSize} 
              height={iconSize}
            >
              <image
                href={plateData.grains.icon}
                width={iconSize}
                height={iconSize}
                preserveAspectRatio="xMidYMid meet"
              />
            </svg>
          </g>
  
          {/* Dairy circle */}
          <g onClick={() => handleSectionClick('dairy')} className="cursor-pointer">
            <circle 
              cx="430" 
              cy="100" 
              r="50" 
              fill={plateData.dairy.color}
              className="transition-opacity hover:opacity-80"
            />
            <svg x="400" y="70" width="60" height="60">
              <image
                href={plateData.dairy.icon}
                width="60"
                height="60"
                preserveAspectRatio="xMidYMid meet"
              />
            </svg>
          </g>
        </svg>
  
      {/* Selected Section Details */}
      {selectedSection && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-full" style={{ backgroundColor: plateData[selectedSection]?.color || 'transparent' }}>
              <div className="relative" style={{ width: '64px', height: '64px' }}>
                {plateData[selectedSection]?.icon && (
                  <Image
                    src={plateData[selectedSection].icon}
                    alt="Icon"
                    width={64}
                    height={64}
                    onError={() => {
                        console.error(`Image failed to load: ${plateData[selectedSection].icon}`);
                    }}
                  />
                )}
              </div>
            </div>
            <div className="text-gray-900">
              <h3 className="font-bold capitalize">
                {selectedSection}: {plateData[selectedSection].score} - {plateData[selectedSection].status}
              </h3>
              <p>{plateData[selectedSection].details}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
  
  
  

  return (
    <>
    <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
    </Head>
    <div className={`w-full bg-white ${openSans.className}`}>
      <div 
        className="min-h-screen overflow-y-auto p-4 text-gray-900"
        ref={scrollContainerRef}
        onScroll={handleScroll}
      >
        {/* Logo & Title Section */}
        <div className="white p-4 rounded-lg mb-6">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0">
              <Image 
                src="/FINs.png" 
                alt="Food Logo" 
                width={64} 
                height={64} 
                className="h-8 w-auto"
              />
            </div>
            <div className="flex-1 text-center">
              <h1 className={`${bungee.className} text-2xl`} 
                  style={{ color: headingColors.title }}>
                Grocery Feedback
              </h1>
            </div>
            <div className="absolute right-0">
              <Link 
                href="/upload"
                className={`${bungee.className} bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors`}
              >
                Upload Receipt
              </Link>
            </div>
          </div>
        </div>

        {/* Positive Choices Section */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h2 className={`${bungee.className} text-xl mb-4 text-center`} 
              style={{ color: headingColors.positiveChoices }}>
            Positive Choices This Week
          </h2>
          <ul className="space-y-2 text-gray-900">
            <li className="flex items-center gap-2">• Spinach</li>
            <li className="flex items-center gap-2">• Broccoli</li>
            <li className="flex items-center gap-2">• Yogurt</li>
          </ul>
        </div>

        {/* Goal Progress Section */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h2 className={`${bungee.className} text-xl mb-4 text-center`}
              style={{ color: headingColors.goalProgress }}>
            Goal Progress
          </h2>
          <p className="mb-4 text-gray-900">You indicated your goals were to <strong>reduce added sugar</strong>, <strong>reduce sodium</strong>, and <strong>increase vegetable intake</strong>.</p>
          <ul className="space-y-2 text-gray-900">
            <li>• You have made great strides in increasing your vegetable intake with smart choices like <strong>Spinach</strong> and <strong>Broccoli</strong>.</li>
            <li>• However, items like <strong>Butter</strong> and <strong>Cheese</strong> did not support your goal of reducing saturated fat levels.</li>
          </ul>
        </div>

        {/* MyPlate Section */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h2 className={`${bungee.className} text-xl mb-4 text-center`}
              style={{ color: headingColors.myPlate }}>
            MyPlate Breakdown
          </h2>
          <div className="score text-center m-4"><strong>HEI Score: 63.87 / 100</strong></div>
          <MyPlateSVG />
          <div className="text-center mt-4 text-gray-500 text-sm">
            Tap to Explore Each Group
          </div>
        </div>

        {/* Other Nutrition Information Section */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h2 className={`${bungee.className} text-xl mb-4 text-center`}
              style={{ color: headingColors.otherNutrition }}>
            Other Nutrition Information
          </h2>
          <div className="mb-4">
            <p className="text-red-500">Saturated Fats: 1.46/10 - Needs Improvement</p>
            <p className="text-gray-900">Choices such as <strong>Butter</strong> and <strong>Cheese</strong> introduced more saturated fats, affecting your score.</p>
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h2 className={`${bungee.className} text-xl mb-4 text-center`}
              style={{ color: headingColors.recommendations }}>
            Recommendations
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="font-bold text-gray-900">Butter:</h3>
              <p className="text-gray-900">
                To better align with your health goals, consider trying{" "}
                <span style={{ color: "#A3AA4E", fontWeight: "bold" }}>Smart Balance Original Buttery Spread</span>{" "}
                available at Walmart.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg">
              <h3 className="font-bold text-gray-900">Cheese:</h3>
              <p className="text-gray-900">
                For a healthier alternative,{" "}
                <span style={{ color: "#A3AA4E", fontWeight: "bold" }}>Follow Your Heart Dairy-Free Cheddar Cheese</span>{" "}
                from Walmart could be a great option.
              </p>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className={`${bungee.className} text-xl mb-4 text-center`}
              style={{ color: headingColors.progress }}>
            Your Progress
          </h2>
          <div className="p-4 bg-white rounded-lg">
            <div className="mb-4">
              <Image 
                src="/progress.png" 
                alt="Progress Graph" 
                width={400}
                height={200}
                className="w-full rounded-lg"
              />
            </div>
            <p className="text-gray-900 font-bold text-center">
              Week 3: Congrats! Your HEI Score has increased from last week
            </p>
          </div>
        </div>

      </div>
    </div>
    </>
  );
};

export default NutritionFeedback;
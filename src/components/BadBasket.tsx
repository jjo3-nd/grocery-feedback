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

const BadBasket = () => {
  const [selectedSection, setSelectedSection] = useState<keyof typeof plateData | null>(null); // Keep this one
  const [selectedModerationSection, setSelectedModerationSection] = useState<keyof typeof moderationData | null>(null); // Keep this one

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  
  const plateData = {
    vegetables: {
      score: '10/10',
      status: 'Great',
      details: 'You had a great score due to Great Value Cut Green Beans and Fresh Tomato on the Vine. Vegetables are great to include in your diet as they are high in essential vitamins and minerals and low in calories, supporting overall health. Keep it up!',
      icon: '/vegetables.png',
      color: '#74B744',
      iconPosition: { x: 100, y: 100 },
    },
    fruits: {
      score: '6.26/10',
      status: 'Moderate',
      details: "You included Mott's 100% Juice Original Apple Juice, which contributed to your total fruit score. Including more whole fruits is beneficial because they provide fiber that juice lacks.",
      icon: '/fruits.png',
      color: '#D62128',
      iconPosition: { x: 300, y: 100 },
    },
    protein: {
      score: '10/10',
      status: 'Great',
      details: 'Your score was high due to purchases of Great Value Black Beans and 80% Lean / 20% Fat Ground Beef Chuck. Including various protein sources can enhance nutrient intake. Well done!',
      icon: '/protein.png',
      color: '#5F4994',
      iconPosition: { x: 100, y: 300 },
    },
    grains: {
      score: '4.44/10',
      status: 'Moderate',
      details: 'Your score included Great Value Instant Oats for whole grains, but had Minute Instant White Rice contributing to a lower whole grain score. Replacing refined grains with whole grains is beneficial for increasing nutrient and fiber content.',
      icon: '/grains.png',
      color: '#E67323',
      iconPosition: { x: 300, y: 300 },
    },
    dairy: {
      score: '7.35/10',
      status: 'Great',
      details: 'You achieved a good score with foods like Great Value Milk Whole Vitamin D and Great Value Original Strawberry Lowfat Yogurt. Dairy provides essential nutrients like calcium and vitamin D.',
      icon: '/dairy.png',
      color: '#5083C5',
      iconPosition: { x: 450, y: 200 },
    },
  };

  const moderationData = {
    refinedgrains: {
      name: 'Refined Grains',
      score: '10/10',
      status: 'Great',
      details: 'Your score is great because refined grain intake was minimal this week. Refined grains can spike blood sugar, so having less can benefit your overall health. Great job on managing this!',
      icon: '/refinedgrains.png',
      color: '#e7138c',
      iconPosition: { x: 100, y: 100 },
    },
    sodium: {
      name: 'Sodium',
      score: '0/10',
      status: 'Needs Improvement',
      details: 'You had a high sodium purchase with items like Swanson 100% Natural Chicken Broth and Great Value Naturally Brewed Soy Sauce contributing to the lack of scoring in this category. High sodium intake can lead to high blood pressure.',
      icon: '/sodium.png',
      color: '#5ec9e3',
      iconPosition: { x: 300, y: 100 },
    },
    addedsugars: {
      name: 'Added Sugars',
      score: '10/10',
      status: 'Great',
      details: 'You chose items with minimal added sugars like Black beans, NFS and Great Value Instant Oats Tube. This is beneficial, as high added sugar intake can contribute to weight gain and dental problems. Keep it up!',
      icon: '/addedsugars.png',
      color: '#9e69ad',
      iconPosition: { x: 100, y: 300 },
    },
    fattyacids: {
      name: 'Fatty Acids',
      score: '2.37/10',
      status: 'Needs Improvement',
      details: 'Items like Land O Lakes Salted Stick Butter and 80% Lean / 20% Fat Ground Beef Chuck contributed to a low score. High saturated fat intake can lead to heart diseases.',
      icon: '/fattyacids.png',
      color: '#fbb616',
      iconPosition: { x: 300, y: 300 },
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

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "great":
        return "#009900";
      case "moderate":
        return "#ff6c00";
      case "needs improvement":
        return "#ff0000";
      default:
        return "#4B5563";
    }
  };

  const handleSectionClick = (section: keyof typeof plateData) => {
    setSelectedSection(section === selectedSection ? null : section);
  };

  const handleModerationSectionClick = (section: keyof typeof moderationData) => {
    setSelectedModerationSection(section === selectedModerationSection ? null : section);
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
              {selectedSection}: {plateData[selectedSection].score} {"  "}
              <div 
                className="text-sm font-bold mb-2 px-2 py-1 rounded-full inline-block"
                style={{ 
                  backgroundColor: `${getStatusColor(plateData[selectedSection].status)}20`,
                  color: getStatusColor(plateData[selectedSection].status)
                }}
              >
                {plateData[selectedSection].status}
              </div>
            </h3>
            <p>{plateData[selectedSection].details}</p>
          </div>
          </div>
        </div>
      )}
    </div>
  );
};
  

const ModerationSVG = () => {
  // Calculate the exact centers of each quadrant
  const radius = 200;
  const centerX = 200;
  const centerY = 200;
  const quadrantRadius = radius * 0.6; // (radius * Math.cos(45°)) for quadrant centers
  
  // Calculate exact center points for each section
  const centerPoints = {
    refinedgrains: {
      x: centerX - quadrantRadius * 0.7,  // top-left
      y: centerY - quadrantRadius * 0.7
    },
    sodium: {
      x: centerX + quadrantRadius * 0.7,  // top-right
      y: centerY - quadrantRadius * 0.7
    },
    addedsugars: {
      x: centerX - quadrantRadius * 0.7,  // bottom-left
      y: centerY + quadrantRadius * 0.7
    },
    fattyacids: {
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

        {/* Refined Grains (top-left) */}
        <g onClick={() => handleModerationSectionClick('refinedgrains')} className="cursor-pointer">
          <path 
            d="M200,200 L200,0 A200,200 0 0,0 0,200 Z" 
            fill={moderationData.refinedgrains.color}
            className="transition-all hover:opacity-60"
          />
          <svg 
            x={centerPoints.refinedgrains.x - halfIconSize} 
            y={centerPoints.refinedgrains.y - halfIconSize} 
            width={iconSize} 
            height={iconSize}
          >
            <image
              href={moderationData.refinedgrains.icon}
              width={iconSize}
              height={iconSize}
              preserveAspectRatio="xMidYMid meet"
            />
          </svg>
        </g>

        {/* Sodium (top-right) */}
        <g onClick={() => handleModerationSectionClick('sodium')} className="cursor-pointer">
          <path 
            d="M200,200 L400,200 A200,200 0 0,0 200,0 Z" 
            fill={moderationData.sodium.color}
            className="transition-all hover:opacity-60"
          />
          <svg 
            x={centerPoints.sodium.x - halfIconSize} 
            y={centerPoints.sodium.y - halfIconSize} 
            width={iconSize} 
            height={iconSize}
          >
            <image
              href={moderationData.sodium.icon}
              width={iconSize}
              height={iconSize}
              preserveAspectRatio="xMidYMid meet"
            />
          </svg>
        </g>

        {/* Added Sugars (bottom-left) */}
        <g onClick={() => handleModerationSectionClick('addedsugars')} className="cursor-pointer">
          <path 
            d="M200,200 L0,200 A200,200 0 0,0 200,400 Z" 
            fill={moderationData.addedsugars.color}
            className="transition-all hover:opacity-60"
          />
          <svg 
            x={centerPoints.addedsugars.x - halfIconSize} 
            y={centerPoints.addedsugars.y - halfIconSize} 
            width={iconSize} 
            height={iconSize}
          >
            <image
              href={moderationData.addedsugars.icon}
              width={iconSize}
              height={iconSize}
              preserveAspectRatio="xMidYMid meet"
            />
          </svg>
        </g>

        {/* Fatty Acids (bottom-right) */}
        <g onClick={() => handleModerationSectionClick('fattyacids')} className="cursor-pointer">
          <path 
            d="M200,200 L200,400 A200,200 0 0,0 400,200 Z" 
            fill={moderationData.fattyacids.color}
            className="transition-all hover:opacity-60"
          />
          <svg 
            x={centerPoints.fattyacids.x - halfIconSize} 
            y={centerPoints.fattyacids.y - halfIconSize} 
            width={iconSize} 
            height={iconSize}
          >
            <image
              href={moderationData.fattyacids.icon}
              width={iconSize}
              height={iconSize}
              preserveAspectRatio="xMidYMid meet"
            />
          </svg>
        </g>
      </svg>

    {/* Selected Section Details */}
    {selectedModerationSection && (
      <div className="mt-4 p-4 bg-gray-100 rounded-lg">
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-full" style={{ backgroundColor: moderationData[selectedModerationSection]?.color || 'transparent' }}>
            <div className="relative" style={{ width: '64px', height: '64px' }}>
              {moderationData[selectedModerationSection]?.icon && (
                <Image
                  src={moderationData[selectedModerationSection].icon}
                  alt="Icon"
                  width={64}
                  height={64}
                  onError={() => {
                      console.error(`Image failed to load: ${moderationData[selectedModerationSection].icon}`);
                  }}
                />
              )}
            </div>
          </div>
          <div className="text-gray-900">
            <h3 className="font-bold capitalize">
              {moderationData[selectedModerationSection].name}: {moderationData[selectedModerationSection].score} {"  "}
              <div 
                className="text-sm font-bold mb-2 px-2 py-1 rounded-full inline-block"
                style={{ 
                  backgroundColor: `${getStatusColor(moderationData[selectedModerationSection].status)}20`,
                  color: getStatusColor(moderationData[selectedModerationSection].status)
                }}
              >
                {moderationData[selectedModerationSection].status}
              </div>
            </h3>
            <p>{moderationData[selectedModerationSection].details}</p>
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
            <li className="flex items-center gap-2">• Great Value Cut Green Beans</li>
            <li className="flex items-center gap-2">• Fresh Tomato on the Vine</li>
            <li className="flex items-center gap-2">• Great Value Black Beans</li>
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
            <li>• Great work! You made great progress with your goals in increasing vegetable intake. This was due to your purchases of <strong>Great Value Cut Green Beans</strong>, <strong>Fresh Tomato on the Vine</strong>, and <strong>Great Value Black Beans</strong>. Keep it up!</li>
            <li>• Some choices this week didn’t align with your dietary goals. You purchased <strong>Land O Lakes Salted Stick Butter</strong> and <strong>Great Value Reduced Fat Mayonnaise with Olive Oil</strong> which didn’t contribute to your goal of reducing sodium.</li>
            <li>• Some choices this week didn’t align with your dietary goals. You purchased <strong>Kellogg's Cocoa Krispies Breakfast Cereal</strong>, which didn’t contribute to your goal of reducing added sugar.</li>
          </ul>
        </div>

        {/* MyPlate Section */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h2 className={`${bungee.className} text-xl mb-4 text-center`}
              style={{ color: headingColors.myPlate }}>
            MyPlate Breakdown
          </h2>
          <div className="score text-center m-4"><strong>Overall Nutrition Score: 59.45 / 100</strong></div>
          <MyPlateSVG />
          <div className="text-center mt-4 text-gray-500 text-sm">
            Tap to Explore Each Group
          </div>
        </div>

        {/* Other Nutrition Information Section */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h2 className={`${bungee.className} text-xl mb-4 text-center`}
              style={{ color: headingColors.otherNutrition }}>
            Components to Moderate
          </h2>
          <ModerationSVG />
          <div className="text-center mt-4 text-gray-500 text-sm">
            Tap to Explore Each Group
          </div>
          {/* <div className="mb-4">
            <p className="text-red-500">Saturated Fats: 1.46/10 - Needs Improvement</p>
            <p className="text-gray-900">Choices such as <strong>Butter</strong> and <strong>Cheese</strong> introduced more saturated fats, affecting your score.</p>
          </div> */}
        </div>

        {/* Recommendations Section */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h2 className={`${bungee.className} text-xl mb-4 text-center`}
              style={{ color: headingColors.recommendations }}>
            Recommendations
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="font-bold text-gray-900">Sodium:</h3>
              <p className="text-gray-900">
                Choosing low-sodium alternatives or low-sodium broths can help reduce your sodium score.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg">
              <h3 className="font-bold text-gray-900">Sugars:</h3>
              <p className="text-gray-900">
                Increasing purchases of items with no or lower added sugars like whole grain cereals instead of the Cocoa Krispies.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg">
              <h3 className="font-bold text-gray-900">Whole Fruits:</h3>
              <p className="text-gray-900">
                Adding fresh fruits like apples and bananas can improve your whole fruit component.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg">
              <h3 className="font-bold text-gray-900">Saturated Fats:</h3>
              <p className="text-gray-900">
                Consider leaner meats or low-fat dairy products to lower saturated fat intake.
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
            <div className="mb-4 flex justify-center">
              <Image 
                src="/badprogress.png" 
                alt="Progress Graph" 
                width={500}
                height={400}
                className="rounded-lg"
              />
            </div>
            <p className="text-gray-900 font-bold text-center">
              Week 3: Oops! Your HEI Score has declined from last week
            </p>
          </div>
        </div>

      </div>
    </div>
    </>
  );
};

export default BadBasket;

import AccommodationSlider from '@/components/AccommodationSlider';
import type { Accommodation } from '@/types';
import { AlertTriangle, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const accommodationsData: Accommodation[] = [
  {
    id: 'nile-single-std',
    roomType: 'Standard Single Room',
    university: 'Nile',
    price: 120000,
    services: ['WiFi', 'Power', 'Cleaning'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'student bedroom modern',
    occupancyRate: 0.65,
    basePriceForAI: 120000,
    description: 'A cozy single room perfect for focused study, available for Nile University students.',
  },
  {
    id: 'baze-shared-apt',
    roomType: '2-Bedroom Shared Apartment',
    university: 'Baze',
    price: 180000,
    services: ['WiFi', 'Power', 'Laundry', 'Cleaning'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'shared apartment students',
    occupancyRate: 0.4,
    basePriceForAI: 180000,
    description: 'Spacious shared apartment with modern amenities for Baze University students.',
  },
  {
    id: 'nile-deluxe-single',
    roomType: 'Deluxe Single Room',
    university: 'Nile',
    price: 150000,
    services: ['WiFi', 'Power', 'Laundry', 'Cleaning'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'deluxe student room',
    occupancyRate: 0.8,
    basePriceForAI: 150000,
    description: 'Premium single room with extra space and enhanced features at Nile University.',
  },
  {
    id: 'baze-studio',
    roomType: 'Studio Apartment',
    university: 'Baze',
    price: 220000,
    services: ['WiFi', 'Power', 'Cleaning', 'Laundry'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'studio apartment campus',
    occupancyRate: 0.55,
    basePriceForAI: 220000,
    description: 'Self-contained studio apartment offering privacy and comfort for Baze students.',
  },
   {
    id: 'nile-shared-twin',
    roomType: 'Shared Twin Room',
    university: 'Nile',
    price: 90000,
    services: ['WiFi', 'Power'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'twin student room',
    occupancyRate: 0.9,
    basePriceForAI: 90000,
    description: 'Affordable shared twin room for students at Nile University seeking a communal experience.',
  },
  {
    id: 'baze-premium-single',
    roomType: 'Premium Single Suite',
    university: 'Baze',
    price: 250000,
    services: ['WiFi', 'Power', 'Laundry', 'Cleaning'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'luxury student suite',
    occupancyRate: 0.3,
    basePriceForAI: 250000,
    description: 'Exclusive single suite with top-tier amenities for discerning Baze University students.',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen container mx-auto py-8 px-4">
      <header className="text-center mb-10">
        <h1 className="font-headline text-4xl font-bold text-primary mb-2">
          Student Accommodation
        </h1>
        <p className="text-lg text-muted-foreground">
          Find your perfect room at Nile & Baze University.
        </p>
      </header>

      <Alert className="mb-8 bg-accent/10 border-accent text-accent-foreground shadow-md">
        <Info className="h-5 w-5 text-accent" />
        <AlertTitle className="font-semibold text-accent">Special Offer for Returning Students!</AlertTitle>
        <AlertDescription>
          All returning students get an automatic <span className="font-bold">10% discount</span> on accommodation fees. Welcome back!
        </AlertDescription>
      </Alert>
      
      <section aria-labelledby="accommodation-options">
        <h2 id="accommodation-options" className="sr-only">Available Accommodations</h2>
        <AccommodationSlider accommodations={accommodationsData} />
      </section>

      <footer className="text-center mt-12 pt-8 border-t">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Student Accommodation Services. All rights reserved.
        </p>
      </footer>
    </main>
  );
}

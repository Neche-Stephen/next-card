
"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import type { Accommodation } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ServiceIcon from './ServiceIcon';
import { assessDemandAndApplyDiscount, type AssessDemandAndApplyDiscountInput, type AssessDemandAndApplyDiscountOutput } from '@/ai/flows/assess-demand-and-apply-discount';
import { Skeleton } from './ui/skeleton';
import { AlertCircle } from 'lucide-react';

interface AccommodationCardProps {
  accommodation: Accommodation;
}

const AccommodationCard: React.FC<AccommodationCardProps> = ({ accommodation }) => {
  const [discountInfo, setDiscountInfo] = useState<AssessDemandAndApplyDiscountOutput | null>(null);
  const [isLoadingDiscount, setIsLoadingDiscount] = useState(true);
  const [errorLoadingDiscount, setErrorLoadingDiscount] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiscount = async () => {
      setIsLoadingDiscount(true);
      setErrorLoadingDiscount(null);
      try {
        const input: AssessDemandAndApplyDiscountInput = {
          accommodationType: accommodation.roomType,
          basePrice: accommodation.basePriceForAI,
          occupancyRate: accommodation.occupancyRate,
          serviceList: accommodation.services,
        };
        const result = await assessDemandAndApplyDiscount(input);
        setDiscountInfo(result);
      } catch (error) {
        console.error("Error fetching discount for", accommodation.id, error);
        setErrorLoadingDiscount("Could not load discount information.");
      } finally {
        setIsLoadingDiscount(false);
      }
    };

    fetchDiscount();
  }, [accommodation]);

  const discountedPrice = discountInfo && discountInfo.discountPercentage > 0
    ? accommodation.price * (1 - discountInfo.discountPercentage)
    : accommodation.price;

  return (
    <Card className="flex flex-col h-full overflow-hidden rounded-lg shadow-lg transition-shadow hover:shadow-xl">
      <div className="relative w-full h-56">
        <Image
          src={accommodation.imageUrl}
          alt={`Image of ${accommodation.roomType}`}
          layout="fill"
          objectFit="cover"
          data-ai-hint={accommodation.imageHint}
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="font-headline text-xl tracking-tight">{accommodation.roomType}</CardTitle>
        <CardDescription className="text-sm">
          For {accommodation.university} University Students
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-3 pt-2">
        <p className="text-xs text-muted-foreground">{accommodation.description}</p>
        
        <div>
          <h4 className="text-sm font-semibold mb-1">Pricing:</h4>
          {isLoadingDiscount ? (
            <div className="space-y-1">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>
          ) : errorLoadingDiscount ? (
             <div className="flex items-center text-destructive text-xs">
                <AlertCircle className="h-4 w-4 mr-1" /> {errorLoadingDiscount}
             </div>
          ) : discountInfo && discountInfo.discountPercentage > 0 ? (
            <>
              <p className="text-lg font-bold text-primary">
                ₦{discountedPrice.toLocaleString()}
                <span className="text-xs font-normal text-muted-foreground line-through ml-2">
                  ₦{accommodation.price.toLocaleString()}
                </span>
              </p>
              <Badge variant="default" className="bg-accent text-accent-foreground text-xs">
                {(discountInfo.discountPercentage * 100).toFixed(0)}% OFF!
              </Badge>
              <p className="text-xs text-muted-foreground mt-1">{discountInfo.discountReason}</p>
            </>
          ) : (
            <p className="text-lg font-bold text-primary">₦{accommodation.price.toLocaleString()}</p>
          )}
        </div>
        
        <div>
          <h4 className="text-sm font-semibold mb-1">Services:</h4>
          <ul className="grid grid-cols-2 gap-1 text-xs">
            {accommodation.services.map(service => (
              <li key={service} className="flex items-center">
                <ServiceIcon serviceName={service} className="h-4 w-4 text-primary" /> 
                {service}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Badge variant="secondary" className="text-xs">
          Occupancy: {(accommodation.occupancyRate * 100).toFixed(0)}%
        </Badge>
      </CardFooter>
    </Card>
  );
};

export default AccommodationCard;

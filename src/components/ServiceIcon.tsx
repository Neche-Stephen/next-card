import { Wifi, Zap, Shirt, Sparkles, HelpCircle } from 'lucide-react';
import type { LucideProps } from 'lucide-react';

interface ServiceIconProps extends LucideProps {
  serviceName: string;
}

const ServiceIcon: React.FC<ServiceIconProps> = ({ serviceName, className, ...props }) => {
  const iconClassName = cn("mr-2 h-5 w-5 text-primary", className);
  switch (serviceName.toLowerCase()) {
    case 'wifi':
      return <Wifi className={iconClassName} {...props} aria-label="WiFi available"/>;
    case 'power':
      return <Zap className={iconClassName} {...props} aria-label="Power available"/>;
    case 'laundry':
      return <Shirt className={iconClassName} {...props} aria-label="Laundry service"/>;
    case 'cleaning':
      return <Sparkles className={iconClassName} {...props} aria-label="Cleaning service"/>;
    default:
      return <HelpCircle className={iconClassName} {...props} aria-label={`Service: ${serviceName}`}/>;
  }
};

// Helper for cn if not globally available in this context (it is via utils)
const cn = (...inputs: any[]) => inputs.filter(Boolean).join(' ');

export default ServiceIcon;

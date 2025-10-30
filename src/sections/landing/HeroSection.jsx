import Image from 'next/image';
import Typography from "@/common/components/Typography";
import { Button } from "@/common/components/ui/button";
import Container from '@/common/components/shared/Container';
import { cn } from '@/common/lib/utils';

const HeroSection = ({
  backgroundImage = "/images/hero-background.jpg",
  title = "Bring Nature Into Your Home",
  description = "Discover handcrafted decor made by empowered women — sustainably made to brighten your space and support a greener future.",
  buttonText = "Explore now",
  onButtonClick,
  className = ""
}) => {
  return (
    <section className={cn(
      "relative w-full h-[500px] overflow-hidden",
      className
    )}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Natural handicraft products - bamboo baskets and plant pots"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20" />
      </div>

      {/* Content Container */}
      <Container className="relative z-10 h-full">
        <div className="h-full grid grid-cols-1 lg:grid-cols-2 ">
          {/* Left Column - Text Content */}
          <div className="flex flex-col justify-center space-y-sp-md">
            {/* Main Title */}
            <Typography.Title1 className="text-white">
              {title}
            </Typography.Title1>

            {/* Description */}
            <Typography.Paragraph className="text-md text-white">
              {description}
            </Typography.Paragraph>

            <div className="mt-sp-md">
              <Button
                onClick={onButtonClick}
              >
                {buttonText}
              </Button>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default HeroSection;

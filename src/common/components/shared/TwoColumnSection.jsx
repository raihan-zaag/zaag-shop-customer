import Typography from "@/common/components/Typography";
import Image from "next/image";
import { cn } from "@/common/lib/utils";
import Container from "./Container";

const TwoColumnSection = ({
    title,
    description,
    images = [],
    reverse = false,
    className = "",
    gridCols = 3,
    showImageGrid = false,
    singleImage = true,
    containerClassName = "",
    titleClassName = "",
    descriptionClassName = "",
    imageGridClassName = "",
    singleImageSrc = ""
}) => {
    return (
        <Container className={cn("py-sp-sm  md:py-sp-md lg:py-sp-5xl", containerClassName)}>
            <div className={cn(
                "grid grid-cols-1 lg:grid-cols-2 gap-sp-sm sm:gap-sp-lg lg:gap-sp-xl xl:gap-sp-2xl items-center",
                reverse && "lg:grid-flow-col-dense",
                className
            )}>
                {/* Content Section */}
                <div className={cn(
                    "space-y-4",
                    reverse && "lg:col-start-2"
                )}>
                    {title && (
                        <Typography.Title1 className={cn("text-left", titleClassName)}>
                            {title}
                        </Typography.Title1>
                    )}

                    {description && (
                        <Typography.Paragraph className={cn("text-left text-text-secondary text-md", descriptionClassName)}>
                            {description}
                        </Typography.Paragraph>
                    )}
                </div>

                {/* Image Section */}
                <div className={cn(
                    "w-full",
                    reverse && "lg:col-start-1"
                )}>
                    {showImageGrid && images.length > 0 ? (
                        /* Image Grid */
                        <div className={cn(
                            `grid gap-2 sm:gap-3`,
                            gridCols === 2 && "grid-cols-2",
                            gridCols === 3 && "grid-cols-3",
                            gridCols === 4 && "grid-cols-2 sm:grid-cols-4",
                            imageGridClassName
                        )}>
                            {images.map((image, index) => (
                                <div
                                    key={index}
                                    className="aspect-square relative overflow-hidden rounded-lg bg-gray-200 hover:scale-105 transition-transform duration-300"
                                >
                                    <Image
                                        src={image.src || "/images/image_placeholder.png"}
                                        alt={image.alt || `Image ${index + 1}`}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                                        priority={index < 4} // Prioritize first 4 images
                                    />
                                </div>
                            ))}
                        </div>
                    ) : singleImage ? (
                        /* Single Image */
                        <div className="relative w-full h-80 md:h-96 lg:h-[400px] xl:h-[550px] overflow-hidden">
                            <Image
                                src={singleImageSrc || "/images/image_placeholder.png"}
                                alt={"Featured image"}
                                fill
                                className="object-fill"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                                priority
                            />
                        </div>
                    ) : null}
                </div>
            </div>
        </Container>
    );
};

export default TwoColumnSection;

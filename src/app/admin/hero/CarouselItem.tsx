import Image from 'next/image';

interface CarouselItemProps {
    header: string;
    paragraph: string;
    link: string;
    imgSrc: any;
  }
  const CarouselItem = ({ header, paragraph, link, imgSrc }: CarouselItemProps) => (
    <div className="flex flex-col lg:flex-row items-center w-full">
      <div className="max-w-2xl mb-8 lg:w-1/2">
        <h1 className="text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight">
          {header}
        </h1>
        <p className="py-5 text-lg leading-normal text-gray-800 lg:text-xl xl:text-2xl ">
          {paragraph}
        </p>
        <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
          <a
            href={link}
            rel="noopener"
            className="px-4 py-4 lg:px-8 lg:py-4 text-md lg:text-lg font-medium text-center text-white bg-green-600 rounded-md ">
            Learn More
          </a>
        </div>
      </div>
      <div className="flex items-center justify-center w-full h-full lg:w-1/2">
        <Image
          src={imgSrc}
          width={616}
          height={617}
          className="object-cover w-full h-full rounded-md"
          alt="Hero Illustration"
          loading="eager"
          style={{ objectFit: 'cover' }}
        />
      </div>
  
    </div>
  );
  export default CarouselItem;
import Image from "next/image";

interface ArticleCardProps {
    date: string;
    title: string;
    imgSrc: string;
    imgAlt: string;
    imgWidth: number;
    imgHeight: number;
    link:string;
  }
  
  export const ArticleCard: React.FC<ArticleCardProps> = ({ date, title, imgSrc, imgAlt, imgWidth, imgHeight,link }) => (
    <>
      <div>
        <p className="p-6 text-md font-bold leading-4 text-white absolute top-0 right-0">{date}</p>
        <div className="absolute bottom-0 left-0 p-6">
          <h2 className="text-xl font-bold text-white hover:text-black">{title}</h2>
          <a href={link} className="focus:outline-none focus:underline flex items-center mt-4 cursor-pointer text-white hover:underline hover:scale-110 hover:text-green-400">
            <p className="pr-2 text-sm font-medium leading-none hover:scale-110 hover:text-green-400">Read More</p>
            <svg className="fill-stroke" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.75 12.5L10.25 8L5.75 3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </a>
        </div>
      </div>
      <Image loading='lazy' width={imgWidth} height={imgHeight} src={imgSrc} className="w-full rounded-md" alt={imgAlt} />
      </>
  );
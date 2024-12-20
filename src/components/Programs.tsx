import Image from "next/image";
import React, { ForwardRefExoticComponent, RefAttributes, SVGProps } from "react";
import { Container }  from "@/components/Container";
import { Program, ProgramPoint } from "@/types";
import ICON_MAP from "./Icons";

interface ProgramsProps {
  imgPos?: "left" | "right";
  data: {
    button?: boolean;
    imgPos?: "left" | "right";
    title: string;
    desc: string;
    image: any;
    bullets: {
      title: string;
      desc: string;
      icon: ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref"> & { title?: string | undefined; titleId?: string | undefined; } & RefAttributes<SVGSVGElement>>;
    }[];
  };
}
export const Programs = (props: Program) => {

  return (
      <Container className="flex flex-wrap mb-20 lg:gap-4 lg:flex-nowrap ">
        <div
          className={`flex items-center justify-center w-full lg:w-1/2 ${
            props.imagePos === "right" ? "lg:order-1" : ""
          }`}>
          <div className="w-full h-full">
            <Image
              src={props.image}
              width={521}
              height={521}
              alt="Programs"
              className={"object-cover rounded-lg shadow-lg w-full h-full lg:w-11/12 lg:h-11/12 xl:w-11/12 xl:h-11/12"}
              placeholder="blur"
              blurDataURL={props.image}
            />
          </div>
        </div>

        <div
          className={`flex flex-wrap items-center w-full lg:w-1/2 ${
            props.imagePos === "right" ? "lg:justify-end" : ""
          }`}>
          <div>
            <div className="flex flex-col w-full mt-4">
              <h3 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl dark:text-white">
                {props.title}
              </h3>

              <p className="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300">
                {props.desc}
              </p>
            </div>

            <div className="w-full mt-5 mb-4">
              {props.Program_points.map((item, index) => (
                <ProgramPointer key={index} title={item.title} icon={item.icon} desc={item.desc}/>
                 
                
              ))}
              
            </div>
            {props.button && (
              <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row mt-4">
              <a
                href='/blog/plant-based-diet'
                rel="noopener"
                className="px-4 py-4 lg:px-8 lg:py-4 text-md lg:text-lg font-medium text-center text-white bg-green-600 rounded-md ">
                Learn More
              </a>
            </div>
            )}
          </div>
        </div>
      </Container>
  );
};

function ProgramPointer(props: ProgramPoint) {
  const IconComponent = ICON_MAP[props.icon] || ICON_MAP['SproutIcon'];
  return (
      <div className="flex items-start mt-8 space-x-3">
        <div className="flex items-center justify-center flex-shrink-0 mt-1 bg-green-500 rounded-md w-11 h-11 ">
        {props.icon && React.createElement(IconComponent, {
          className: "w-7 h-7 text-green-50",
        })}
        </div>
        <div>
          <h4 className="text-xl font-medium text-gray-800 dark:text-gray-200">
            {props.title}
          </h4>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            {props.desc}
          </p>
        </div>
      </div>
  );
}

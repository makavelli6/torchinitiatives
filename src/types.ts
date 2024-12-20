export interface PageProps {
  params: {
    slug: string;
  };
  searchParams: {};
}
export interface ApproachProps {
  id:number;
  imgSrc: string;
  title: string;
  description: string;
  buttonText: string;
  tag: string;
  imgPos?: "left" | "right";
  caption: string;

}
export interface BenefitPoint {
  desc: string;
  icon: string;
  title: string;
}

export interface Benefit {
  id: number;
  title: string;
  button: boolean;
  desc: string;
  image: string;
  imagePos: string;
  Benefits_points: BenefitPoint[];
}

export interface Value {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface TeamMember {
  id: number;
  name: string;
  title: string;
  description: string;
  imageSrc: string;
}

export interface ProgramPoint {
  desc: string;
  icon: string;
  title: string;
}

export interface Program {
  id: number;
  title: string;
  button: boolean;
  desc: string;
  image: string;
  imagePos: string;
  Program_points: ProgramPoint[];
}
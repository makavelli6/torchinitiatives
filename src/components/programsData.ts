import {
    FaceSmileIcon,
    BookOpenIcon,
    UsersIcon,
    ShoppingBagIcon,
    HeartIcon,
    ArrowPathIcon,
    GlobeEuropeAfricaIcon,
    CloudIcon,
} from "@heroicons/react/24/solid";

import benefitOneImg from "../../public/img/empower5.jpeg";
import benefitTwoImg from "../../public/img/resource.jpeg";
import benefitThreeImg from "../../public/img/planted.jpeg";
import { StaticImageData } from "next/image";

import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';



interface ProgramBenefit {
    title: string;
    button?: boolean;
    desc: string;
    image: StaticImageData;
    bullets: {
        title: string;
        desc: string;
        icon: ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref"> & { title?: string | undefined; titleId?: string | undefined; } & RefAttributes<SVGSVGElement>>;
    }[];
}
const benefitOne: ProgramBenefit = {
    title: "Plant-based Diet Education Program for Schools",
    button: true,
    desc: "Torch Initiatives introduced and promoted plant-based diets in schools, fostering a mindful approach to food choices. This initiative addresses health and environmental concerns while promoting animal welfare.",
    image: benefitThreeImg,
    bullets: [
        {
            title: "Significant Impact on Dietary Habits",
            desc: "Engaged 1,500 students, 50 teachers, and 10 kitchen staff at Naramat School in Kajiado County and Joy Schools in Nairobi County. Educated children, staff, and parents on the health and environmental benefits of plant-based diets.",
            icon: HeartIcon
        },
        {
            title: "Awareness of Animal Rights",
            desc: "Highlighted negative impacts of factory farming and raised awareness of animal rights and welfare. Delivered age-appropriate sessions for grades 4-8 to ensure engagement.",
            icon: ArrowPathIcon ,
        },
        {
            title: "Culture of Sustainability",
            desc: "Fostered a culture of sustainability among students, teachers, and the broader school community.",
            icon: GlobeEuropeAfricaIcon,
        },
    ],
};

const benefitTwo: ProgramBenefit = {
    title: "Local Resource Mobilization Skills",
    desc: "Our team lead has conducted local resource mobilization workshops, coaching, and mentorship sessions for over 100 CSOs. These initiatives promote sustainable practices and development of fundraising plans at a local level.",
    image: benefitTwoImg,
    bullets: [
        {
            title: "Community Impact",
            desc: "Reached various communities with sustainable practices and fundraising strategies.",
            icon: CloudIcon ,
        },
        {
            title: "Women in Food Security",
            desc: "Provided seeds and demonstrated cultivation of indigenous vegetables in Kajiado and Nairobi County, empowering women and enhancing local food security.",
            icon: ShoppingBagIcon ,
        },
        {
            title: "Sustainable Agriculture",
            desc: "Facilitated training sessions on organic farming and eco-friendly pest control methods adopted by the communities we serve.",
            icon: UsersIcon ,
        },
    ],
};

const benefitThree : ProgramBenefit = {
    title: "Youth Empowerment and Job Search Clubs",
    desc: "Collaborated with partners to establish Job Search Clubs in Kenya, empowering youths with essential job search skills.",
    image: benefitOneImg,
    bullets: [
        {
            title: "Impactful Initiatives",
            desc: "Conducted by our team lead in collaboration with the Career Guidance Institute in Daadab, Kakuma, Nakuru, Naivasha, and West Pokot County.",
            icon: BookOpenIcon ,
        },
        {
            title: "Building Resilience",
            desc: "Workshops and programs focused on building resilience within communities, equipping individuals with skills and mindset to thrive.",
            icon: FaceSmileIcon ,
        },
        {
            title: "Africa Vegan Restaurant Week Campaign",
            desc: "Participated in promoting compassion and sustainable eating habits during Africa Vegan Restaurant Week, emphasizing health benefits of plant-based diet.",
            icon: UsersIcon ,
        },
    ],
};

export { benefitOne, benefitTwo, benefitThree };

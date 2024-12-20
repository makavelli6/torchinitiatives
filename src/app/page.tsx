import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import { SectionTitle } from "@/components/SectionTitle";
import { Video } from "@/components/Video";
import { Cta } from "@/components/Cta";
import Values from "@/components/Values";
import BenefitsSection from "@/components/BenefitsSection";
import { Navbar } from "@/components/Navbar";
import Banner from "@/components/Banner";
import Banner2 from "@/components/Banner2";
import { Footer } from "@/components/Footer";
export default function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      <Banner2 />
      <Container>
        <Hero />
        <Values />
        <BenefitsSection/>

        <SectionTitle
          preTitle="Our values"
          title="Be a Volunteer Our Community"
        >
          Our values encompass a commitment to sustainability, 
          inclusivity, integrity, divine guidance, and plant-based advocacy, 
          prioritizing the welfare of humans and animals, 
          while investing in the potential of young people as beacons of hope for the future.
        </SectionTitle>

        <Video videoId="CnfFugbdrx0" previewImageUrl="/img/logo.png" />
        <Cta />
    </Container>
    <Footer />
    </>
  );
}

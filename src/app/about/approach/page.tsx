import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { Cta } from "@/components/Cta";
import { Approaches } from "@/components/Approaches";
import { Navbar } from "@/components/Navbar";
import Banner from "@/components/Banner";
import Banner2 from "@/components/Banner2";
import { Footer } from "@/components/Footer";
export default function Programs() {
  return (
    <>
      <Navbar />
      <Banner />
      <Banner2 />
      <Container>
      <SectionTitle
        preTitle="Our Approach"
        title="Torch Initiatives: Fostering Positive Youth Attitudes and Sustainable Communities"
      >
      At Torch Initiatives, we are dedicated to social responsibility, 
      advocating for positive youth attitudes and aptitudes while championing 
      community sustainability. We emphasize the proper utilization of community 
      resources, nurturing positive cultures, and responsible stewardship.
      </SectionTitle>
      <Approaches/>
      <Cta />
    </Container>
    <Footer />
    </>
  );
}

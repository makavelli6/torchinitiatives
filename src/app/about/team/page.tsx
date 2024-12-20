import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";

import { Cta } from "@/components/Cta";
import { Team } from "@/components/Team";
import { Navbar } from "@/components/Navbar";
import Banner from "@/components/Banner";
import Banner2 from "@/components/Banner2";
import { Footer } from "@/components/Footer";
import Faq from "@/components/Faq";
export default function Programs() {
  return (
    <>
      <Navbar />
      <Banner />
      <Banner2 />
    <Container>

      <SectionTitle
        preTitle="Our Team"
        title="Meet the team"
      >
        We are a team of passionate people who love to develop community and empower the generation.
      </SectionTitle>
      <Team />
      <SectionTitle preTitle="Activities" title="We participate">
        Our team is involved in various activities that help us grow and develop our skills, while also helping the community.
      </SectionTitle>
      <Faq />
      <Cta />
    </Container>
    <Footer />
    </>
  );
}

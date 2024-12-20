import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import ContactForm from "@/components/ContactForm";
import { Navbar } from "@/components/Navbar";
import Banner from "@/components/Banner";
import Banner2 from "@/components/Banner2";
import { Footer } from "@/components/Footer";

export default function Contact() {
  return (
    <>
      <Navbar />
      <Banner />
      <Banner2 />
      <Container>
      <SectionTitle
        preTitle="Contact Us"
        title="We'd love to hear from you"
      >
        Please reach us at torchinitiatives@gmail.com
      </SectionTitle>

    </Container>
    <Footer />
    </>
  );
}
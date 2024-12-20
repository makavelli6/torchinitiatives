import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { Programs } from "@/components/Programs";
import { Footer } from "@/components/Footer";
import { Cta } from "@/components/Cta";
import { Navbar } from "@/components/Navbar";
import Banner from "@/components/Banner";
import Banner2 from "@/components/Banner2";
import { createClient } from "@/utils/supabase/server";
import { Program } from "@/types";
import { PostgrestError } from "@supabase/supabase-js";
import Spinner from "@/components/Spinner";

export default async function Page() {
  const supabase = createClient();
    const { data: programs, error }:{data:Program[]|null,error:PostgrestError|null} = await supabase
    .from('Programs')
    .select(`
      *,
      Program_points (
        title,
        desc,
        icon
      )
    `)
    .order('id', { ascending: true });
    if (!programs) {
        return (
            <Container className="flex flex-col justify-center items-center lg:flex-row lg:items-start">
                <Spinner />
            </Container>
        )
    }
  return (
    <>
      <Navbar />
      <Banner />
      <Banner2 />
      <Container>

        <SectionTitle
          preTitle="Our programs"
          title="Dedication to catalyzing transformative attitudes, and equipping individuals"
        >
          Our programs are designed to empower individuals and communities,
          fostering positive attitudes and aptitudes while championing community sustainability.
          We emphasize the proper utilization of community resources, nurturing positive cultures,
          and responsible stewardship.
        </SectionTitle>
        {programs.map((program, index) => (
            <Programs 
            key={index}
            title={program.title}
            desc={program.desc} 
            id={program.id} 
            button={program.button} 
            image={program.image} 
            imagePos={program.imagePos} 
            Program_points={program.Program_points}            />
        ))} 


        <Cta />
      </Container>
      <Footer />
    </>

  );
}

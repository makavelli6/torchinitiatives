import React from 'react'
import { SectionTitle } from './SectionTitle'
import { Benefits } from "@/components/Benefits";
import { createClient } from '@/utils/supabase/server';
import { Container } from './Container';
import Spinner from './Spinner';
import { PostgrestError } from '@supabase/supabase-js';
import { Benefit } from '@/types';



const BenefitsSection = async () => {
    const supabase = createClient();
    const { data: benefits, error }:{data:Benefit[]|null,error:PostgrestError|null} = await supabase
    .from('Benefits')
    .select(`
      *,
      Benefits_points (
        title,
        desc,
        icon
      )
    `)
    .order('id', { ascending: true });
    if (!benefits) {
        return (
            <Container className="flex flex-col justify-between items-center lg:flex-row lg:items-start">
                <Spinner />
            </Container>
        )
    }
  return (
    <>
        <SectionTitle
        preTitle="What we do"
        title="Dedication to catalyzing transformative attitudes, and equipping individuals"
      >
        Torch Initiatives is dedicated to social responsibility, advocating for positive youth
        attitudes and aptitudes while championing community sustainability. We emphasize the
        proper utilization of community resources, nurturing positive cultures, and responsible
        stewardship.
      </SectionTitle>
        {benefits.map((benefit, index) => (
            <Benefits 
            key={index}
            title={benefit.title}
            desc={benefit.desc} 
            id={benefit.id} 
            button={benefit.button} 
            image={benefit.image} 
            imagePos={benefit.imagePos} 
            Benefits_points={benefit.Benefits_points}            />
        ))} 
    </>
  )
}

export default BenefitsSection
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { Navbar } from "@/components/Navbar";
import Banner from "@/components/Banner";
import Banner2 from "@/components/Banner2";
import { Cta } from "@/components/Cta";
import { ArticleCard } from "@/components/ArticleCard";
import { Footer } from "@/components/Footer";

export default function Program() {
  return (
    <>
      <Navbar />
      <Banner />
      <Banner2 />
      <Container>
      <SectionTitle
        preTitle="Torch Initiatives Community"
        title="Our community is our pride"
      ></SectionTitle>

      <div className="lg:flex items-stretch md:mt-12 mt-8">
        <div className="lg:w-1/2">
          <div className="sm:flex items-center justify-between xl:gap-x-8 gap-x-6">
            <div className="sm:w-1/2 mt-4 lg:mt-0 relative">
              <ArticleCard
                date="Environment Sustainability"
                title="Transforming Waste into Nourishment"
                imgSrc="/img/blog/blog5.jpeg"
                imgAlt="chair"
                imgWidth={400}
                imgHeight={500}
                link={'/blog/transforming-waste-into-nourishment'}
              />
            </div>
            <div className="sm:w-1/2 mt-4 lg:mt-0 relative">
            <ArticleCard
                date="Healthy Living"
                title="Significant Impact on Dietary Habits"
                imgSrc="/img/blog/blog4.jpeg"
                imgAlt="chair"
                imgWidth={400}
                imgHeight={500}
                link={'/blog/healthy-living'}
              />
            </div>
          </div>
          <div className="relative mt-4">
            <ArticleCard
              date="Community Impact"
              title="Local Resource Mobilization Skills"
              imgSrc="/img/resource.jpeg"
              imgAlt="chair"
              imgWidth={800}
              imgHeight={500}
              link={'/blog/local-resource-mobilization'}
            />
          </div>
        </div>
        <div className="lg:w-1/2 xl:ml-8 lg:ml-4 lg:mt-0 md:mt-6 mt-4 lg:flex flex-col justify-between">
          <div className="relative mt-4 lg:mt-0">
            <ArticleCard
              date="Plant based diet"
              title="Plant-based Diet Education Program for Schools"
              imgSrc="/img/planted.jpeg"
              imgAlt="chair"
              imgWidth={800}
              imgHeight={500}
              link={'/blog/plant-based-diet'}
            />
          </div>
          <div className="sm:flex items-center justify-between xl:gap-x-8 gap-x-6 md:mt-6 mt-4">
            <div className="relative w-full">
              <ArticleCard
                date="Youth Empowerment"
                title="Empowerment Program for Youth"
                imgSrc="/img/empower5.jpeg"
                imgAlt="chair"
                imgWidth={400}
                imgHeight={500}
                link={'/blog/empowerment-program-for-youth'}
              />
            </div>
            <div className="relative w-full sm:mt-0 mt-4">
              <ArticleCard
                date="Sustainabilty"
                title="Sustainability Program for communities"
                imgSrc="/img/empower.jpg"
                imgAlt="chair"
                imgWidth={400}
                imgHeight={500}
                link={'/blog/sustainability-program-for-communities'}
              />
            </div>
          </div>
        </div>
        
      </div>
      <div className="lg:flex items-stretch md:mt-12 mt-8">
        <div className="lg:w-1/2">
          <div className="sm:flex items-center justify-between xl:gap-x-8 gap-x-6">
            <div className="sm:w-1/2 mt-4 lg:mt-0 relative">
              <ArticleCard
                date="Environment Sustainability"
                title="With kaloleni Women group at the mombasa food festival"
                imgSrc="/img/blog/blog2.jpg"
                imgAlt="chair"
                imgWidth={400}
                imgHeight={500}
                link={'/blog/transforming-waste-into-nourishment'}
              />
            </div>
            <div className="sm:w-1/2 mt-4 lg:mt-0 relative">
            <ArticleCard
                date="Healthy Living"
                title="Significant Impact on Dietary Habits"
                imgSrc="/img/blog/blog3.jpg"
                imgAlt="chair"
                imgWidth={400}
                imgHeight={500}
                link={'/blog/healthy-living'}
              />
            </div>
          </div>
          <div className="relative mt-4">
            <ArticleCard
              date="Community Impact"
              title="In mombasa food festival"
              imgSrc="/img/blog/blog1.jpg"
              imgAlt="chair"
              imgWidth={800}
              imgHeight={500}
              link={'/blog/local-resource-mobilization'}
            />
          </div>
        </div>
        <div className="lg:w-1/2 xl:ml-8 lg:ml-4 lg:mt-0 md:mt-6 mt-4 lg:flex flex-col justify-between">
        <div className="relative mt-4 lg:mt-0">
            <ArticleCard
              date="Plant based diet"
              title="Plant-based Diet Education Program for Schools"
              imgSrc="/img/blog/blog4.jpg"
              imgAlt="chair"
              imgWidth={800}
              imgHeight={500}
              link={'/blog/plant-based-diet'}
            />

            
          </div>

          <div className="relative mt-4 ">
            <ArticleCard
              date="Plant based diet"
              title="At Uwepo Nourishment restaurant"
              imgSrc="/img/blog/blog5.jpg"
              imgAlt="chair"
              imgWidth={800}
              imgHeight={500}
              link={'/blog/plant-based-diet'}
            />

            
          </div>
          <div className="sm:flex items-center justify-between xl:gap-x-8 gap-x-6 md:mt-6 mt-4">
            <div className="relative w-full">
              <ArticleCard
                date=""
                title="Empowerment Program for Youth"
                imgSrc="/img/blog/blog7.jpg"
                imgAlt="chair"
                imgWidth={400}
                imgHeight={500}
                link={'/blog/empowerment-program-for-youth'}
              />
            </div>
            <div className="relative w-full sm:mt-0 mt-4">
              <ArticleCard
                date=""
                title="Newspaper coverage of the Africa Vegan restaurant week"
                imgSrc="/img/blog/blog12.jpg"
                imgAlt="chair"
                imgWidth={400}
                imgHeight={500}
                link={'/blog/sustainability-program-for-communities'}
              />
            </div>
          </div>
        </div>
        
      </div>
      <Cta />
    </Container>
    <Footer />
    </>
  );
}




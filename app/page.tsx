import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { WorkGrid } from "@/components/work-grid";
import { Marquee } from "@/components/marquee";
import { Services } from "@/components/services";
import { RiskBand } from "@/components/risk-band";
import { Process } from "@/components/process";
import { Why } from "@/components/why";
import { Faq } from "@/components/faq";
import { QuoteForm } from "@/components/quote-form";
import { Footer } from "@/components/footer";
import { projects } from "@/lib/projects";
import { getAllRepoMeta } from "@/lib/github";

export default async function Home() {
  const meta = await getAllRepoMeta(projects.map((p) => p.repo));

  return (
    <>
      <Nav />
      <main>
        <Hero projects={projects} meta={meta} />
        <WorkGrid projects={projects} meta={meta} />
        <Marquee />
        <Services />
        <RiskBand />
        <Process />
        <Why />
        <Faq />
        <QuoteForm />
      </main>
      <Footer />
    </>
  );
}

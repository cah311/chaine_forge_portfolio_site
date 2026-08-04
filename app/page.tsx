import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Process } from "@/components/process";
import { RiskBand } from "@/components/risk-band";
import { Services } from "@/components/services";
import { WorkGrid } from "@/components/work-grid";
import { Marquee } from "@/components/marquee";
import { Why } from "@/components/why";
import { Faq } from "@/components/faq";
import { QuoteForm } from "@/components/quote-form";
import { Footer } from "@/components/footer";
import { getHomeProjects } from "@/lib/projects";
import { getAllRepoMeta } from "@/lib/github";

export default async function Home() {
  const homeProjects = getHomeProjects();
  const meta = await getAllRepoMeta(homeProjects.map((p) => p.repo));

  return (
    <>
      <Nav />
      <main>
        <Hero projects={homeProjects} meta={meta} />
        <Process />
        <RiskBand />
        <Services />
        <WorkGrid projects={homeProjects} meta={meta} />
        <Marquee />
        <Why />
        <Faq />
        <QuoteForm />
      </main>
      <Footer />
    </>
  );
}

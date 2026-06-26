import IntroLetter from "@/components/IntroLetter";
import Hero from "@/components/Hero";
import SaveTheDate from "@/components/SaveTheDate";
import Gallery from "@/components/Gallery";
import Events from "@/components/Events";
import Rsvp from "@/components/Rsvp";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <IntroLetter />
      <Hero />
      <SaveTheDate />
      <Gallery />
      <Events />
      <Rsvp />
      <Footer />
    </main>
  );
}

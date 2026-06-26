import Petals from "@/components/decor/Petals";
import CornerFrame from "@/components/decor/CornerFrame";
import MusicToggle from "@/components/MusicToggle";

/**
 * Layout for the main site. Mounts the global decorative layers (floating
 * petals, gold corner frame, music toggle) around the page. The `/invite`
 * print route lives outside this group, so the PDF stays free of them.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Petals />
      <CornerFrame />
      {children}
      <MusicToggle />
    </>
  );
}

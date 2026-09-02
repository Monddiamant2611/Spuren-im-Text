const completionCopy:Record<string,{title:string;summary:string}>={
  chapter_01:{title:"Das Regiebuch ist wieder lesbar.",summary:"Sie haben Textebenen und Bühnensituation rekonstruiert."},
  chapter_02:{title:"Die Figurenakte ist vollständig.",summary:"Sie haben Figuren, Ziele, Motive, Beziehungen und Entwicklungen untersucht."},
  chapter_03:{title:"DIE STIMMEN SIND GEORDNET.",summary:"Sie können nun untersuchen, was Figuren mit Sprache tun, wie Gespräche ihre Richtung verändern und wie daraus Bedeutung entsteht."},
  chapter_04:{title:"DER HANDLUNGSVERLAUF IST REKONSTRUIERT.",summary:"Sie haben Konflikte, Ziele, Handlungen, Ursachen, Wendepunkte und Folgen miteinander verbunden."},
  chapter_05:{title:"DIE DEUTUNG IST BEGRÜNDET.",summary:"Sie können aus Textbefunden eine Deutung entwickeln, diese am Text überprüfen, Gegenbelege berücksichtigen und zu einer schlüssigen Argumentation verbinden."},
};

export function ChapterCompletion({ chapterId, onExit }: { chapterId: string; onExit: () => void }) {
  const copy=completionCopy[chapterId]??{title:"Kapitel abgeschlossen",summary:"Dieser Teil des Theaters ist rekonstruiert."};
  return <section className="chapter-completion" aria-label="Kapitel abgeschlossen">
    <strong>{copy.title}</strong>
    <p>{copy.summary}</p>
    {!['chapter_03','chapter_04','chapter_05'].includes(chapterId)&&<p>Ihre Reise geht nun auf der großen Bühne weiter.</p>}
    <button className="chapter-primary-action" onClick={onExit}>Zur großen Bühne</button>
  </section>;
}

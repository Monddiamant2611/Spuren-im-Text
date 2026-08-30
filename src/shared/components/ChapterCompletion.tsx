const completionCopy:Record<string,{title:string;summary:string}>={
  chapter_01:{title:"Das Regiebuch ist wieder lesbar.",summary:"Sie haben Textebenen und Bühnensituation rekonstruiert."},
  chapter_02:{title:"Die Figurenakte ist vollständig.",summary:"Sie haben Figuren, Ziele, Motive, Beziehungen und Entwicklungen untersucht."},
  chapter_03:{title:"DIE STIMMEN SIND GEORDNET.",summary:"Sie können nun untersuchen, was Figuren mit Sprache tun, wie Gespräche ihre Richtung verändern und wie daraus Bedeutung entsteht."},
  chapter_04:{title:"Der Handlungsverlauf ist rekonstruiert.",summary:"Sie haben Konflikte, Ursachen, Wendepunkte und Folgen verbunden."},
  chapter_05:{title:"Die Deutung ist begründet.",summary:"Sie haben Beobachtungen, Belege und Interpretation zu einem Argumentationsgang verbunden."},
};

export function ChapterCompletion({ chapterId, onExit }: { chapterId: string; onExit: () => void }) {
  const copy=completionCopy[chapterId]??{title:"Kapitel abgeschlossen",summary:"Dieser Teil des Theaters ist rekonstruiert."};
  return <section className="chapter-completion" aria-label="Kapitel abgeschlossen">
    <strong>{copy.title}</strong>
    <p>{copy.summary}</p>
    {chapterId!=="chapter_03"&&<p>Ihre Reise geht nun auf der großen Bühne weiter.</p>}
    <button className="chapter-primary-action" onClick={onExit}>Zur großen Bühne</button>
  </section>;
}

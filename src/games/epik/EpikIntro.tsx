import { Button } from "@/src/features/literature-archive/components/Button";
import { Card } from "@/src/features/literature-archive/components/Card";

const functions = [
  ["Entdecken & ausprobieren", "Jeder Lernbereich beginnt mit Beispielen und kleinen Entscheidungen. Sie müssen nicht schon alles wissen – vieles erschließen Sie sich während des Spielens."],
  ["Begriffe verstehen", "Fachbegriffe können Sie direkt anklicken. In der Lernkartei werden verwandte Begriffe miteinander verglichen und voneinander abgegrenzt."],
  ["Feedback nutzen", "Nach Ihren Entscheidungen erfahren Sie nicht nur, ob etwas passt, sondern auch warum. Gerade falsche Antworten helfen dabei, typische Verwechslungen zu erkennen."],
  ["Anwenden & übertragen", "Am Ende jedes Bereichs wartet ein neuer Text. Später überprüfen Sie Ihr Wissen und bearbeiten schließlich einen unbekannten Abschlussfall bis zur eigenen Interpretation."],
] as const;

const tips = [
  "Lesen Sie den Text genau und entscheiden Sie nicht nur nach Gefühl.",
  "Nutzen Sie Textbelege, bevor Sie eine Deutung formulieren.",
  "Lesen Sie auch das Feedback zu richtigen Antworten.",
  "Wiederholen Sie Begriffe, bei denen Sie noch unsicher sind.",
  "Eine Interpretation muss nicht „die eine richtige“ sein – entscheidend ist, dass sie am Text begründet werden kann.",
] as const;

export function EpikIntro({ onEnter }: { onEnter: () => void }) {
  return <section className="epik-intro" aria-labelledby="epik-intro-title">
    <header className="epik-intro__header">
      <p className="archive-kicker">Spuren im Text</p>
      <h1 id="epik-intro-title">Epische Werke entschlüsseln</h1>
      <h2>Willkommen in der Analysewerkstatt.</h2>
      <p>In diesem Lernspiel lernen Sie Schritt für Schritt, epische Texte genauer zu lesen, Auffälligkeiten zu erkennen und daraus eine schlüssige Interpretation zu entwickeln.</p>
    </header>
    <Card className="epik-intro__mission"><h2>Ihre Mission</h2><p>Am Ende sollen Sie einen unbekannten Text selbstständig untersuchen können: Sie erkennen wichtige Spuren, sichern passende Textbelege, verbinden Ihre Beobachtungen und entwickeln daraus eine begründete Deutung.</p></Card>
    <section aria-labelledby="epik-intro-functions"><h2 id="epik-intro-functions">So funktioniert das Spiel</h2><div className="epik-intro__grid">{functions.map(([title, text], index) => <Card key={title} className="epik-intro__function"><span aria-hidden="true">{index + 1}</span><h3>{title}</h3><p>{text}</p></Card>)}</div></section>
    <section className="epik-intro__analysis" aria-labelledby="epik-intro-analysis"><h2 id="epik-intro-analysis">Die zentrale Analysekette</h2><ol aria-label="Beobachtung, Textbeleg, Analyse, Wirkung, Deutung">{["Beobachtung", "Textbeleg", "Analyse", "Wirkung", "Deutung"].map((step) => <li key={step}>{step}</li>)}</ol></section>
    <Card className="epik-intro__tips"><h2>So lernen Sie am besten</h2><ul>{tips.map((tip) => <li key={tip}>{tip}</li>)}</ul></Card>
    <footer className="epik-intro__footer"><p>Ihr Lernfortschritt wird auf diesem Gerät gespeichert. Bereits freigeschaltete Bereiche können Sie später erneut bearbeiten.</p><Button onClick={onEnter}>Analysewerkstatt betreten</Button></footer>
  </section>;
}

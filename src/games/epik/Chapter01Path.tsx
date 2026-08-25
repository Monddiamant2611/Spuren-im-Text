"use client";

import { useMemo, useState } from "react";
import { Button } from "@/src/features/literature-archive/components/Button";
import { Card } from "@/src/features/literature-archive/components/Card";
import { PracticeText as PracticeTextCard } from "./PracticeText";
import { authorNarratorStatements, chapter01Glossary, chapter01Steps, compareObservations, compareVersionCases, evaluateAuthorNarrator, practiceChecks, selectPracticeText, type PracticeText } from "./data/chapter_01";
import { shuffleChoiceOptions, useRunSeed } from "./choice-options";
import { ChapterCompletionActions } from "./ChapterCompletionActions";

function PracticeCard({ text }: { text: ReturnType<typeof selectPracticeText> }) {
  return <PracticeTextCard title={text.title} text={text.text}/>;
}

export function Chapter01Path({ initialStep = 0 }: { initialStep?: number }) {
  const [step, setStep] = useState(initialStep);
  const [runOffset, setRunOffset] = useRunSeed();
  const [selected, setSelected] = useState<Record<string, string | boolean>>({});
  const [feedback, setFeedback] = useState<string>();
  const [completed, setCompleted] = useState(false);
  const texts = useMemo(() => {
    const picked: PracticeText[] = [];
    for (let index = 0; index < 5; index += 1) picked.push(selectPracticeText(runOffset + index, picked.map((item) => item.id)));
    return picked;
  }, [runOffset]);
  const practice = texts[step];
  const transferText = selectPracticeText(6);
  const compareVersions = compareVersionCases[runOffset % compareVersionCases.length].versions;
  const orderOptions = (options: readonly string[], key: string) => shuffleChoiceOptions(options, runOffset, key);

  function advance(message: string) {
    setFeedback(message);
    if (step === 4) setCompleted(true);
    else setStep((value) => value + 1);
    setSelected({});
  }

  function restart() {
    setRunOffset((value) => value + 104729);
    setStep(0); setSelected({}); setFeedback(undefined); setCompleted(false);
  }

  if (completed) return <section className="epik-path"><Card className="epik-completion"><p className="learning-card__label">Bereich 1 abgeschlossen</p><h2>Episches Erzählen ist Vermittlung</h2><p>Ein Autor erschafft einen Text, in dem eine Erzählinstanz eine erzählte Welt mit Figuren und Ereignissen für den Leser vermittelt.</p><p><strong>Für die Analyse bedeutet das:</strong> Fragen Sie nicht nur, WAS geschieht, sondern immer auch, WIE das Geschehen erzählt wird.</p><ChapterCompletionActions chapter={1} onRepeat={restart}/></Card></section>;

  const checks = practiceChecks[practice.id];
  return <section className="epik-path" aria-labelledby="chapter01-step-title">
    <div className="epik-path-progress" aria-label={`Lernschritt ${step + 1} von 5`}>{chapter01Steps.map((title, index) => <span key={title} className={index === step ? "is-current" : index < step ? "is-done" : ""}>{index + 1}</span>)}</div>
    <p className="learning-card__label">Erzählen verstehen · Lernschritt {step + 1} von 5</p><h2 id="chapter01-step-title">{chapter01Steps[step]}</h2>
    {feedback && <p role="status" className="epik-feedback is-correct">{feedback}</p>}

    {step === 0 && <><div className="epik-version-grid">{compareVersions.map((text, index) => <Card key={text}><p className="learning-card__label">Fassung {String.fromCharCode(65 + index)}</p><p>{text}</p></Card>)}</div><Card className="epik-task"><h3>Was bleibt gleich – und was verändert sich?</h3>{compareObservations.map((item) => <label key={item.id}><input type="checkbox" checked={selected[item.id] === true} onChange={(event) => setSelected((old) => ({ ...old, [item.id]: event.target.checked }))}/>{item.text}</label>)}<Button disabled={!compareObservations.filter((item) => item.correct).every((item) => selected[item.id]) || Boolean(selected.identical)} onClick={() => advance("Dasselbe Geschehen kann unterschiedlich erzählt werden. Eine Erzählung wählt Informationen aus, ordnet sie und vermittelt sie aus einer bestimmten erzählerischen Position.")}>Beobachtungen prüfen</Button></Card></>}

    {step === 1 && <div className="epik-layout"><PracticeCard text={practice}/><Card className="epik-task"><h3>Wer erzählt hier eigentlich?</h3>{[
      ["Wie sind die im Text genannten handelnden Figuren fachlich einzuordnen?", "Figuren", ["Figuren", "Erzählinstanzen", "Autoren", "Leser", "Protagonisten", "Ich-Erzähler"], "class-0"],
      ["Welche Instanz vermittelt dem Leser die dargestellten Handlungen und Wahrnehmungen?", "Erzählinstanz", ["Erzählinstanz", "zentrale Figur", "reale Autorinstanz", "Leser", "beobachtete Nebenfigur", "alle Figuren gemeinsam"], "class-1"],
      ["Welche Aussage beschreibt die Funktion der Erzählinstanz am präzisesten?", "Sie wählt und vermittelt Informationen über das dargestellte Geschehen.", ["Sie wählt und vermittelt Informationen über das dargestellte Geschehen.", "Sie handelt als wichtigste Figur innerhalb der erzählten Welt.", "Sie entspricht grundsätzlich der realen Person des Autors.", "Sie entscheidet als Leser über den Fortgang der Handlung.", "Sie kennt in jedem epischen Text sämtliche Gedanken.", "Sie berichtet ausschließlich tatsächlich geschehene Ereignisse."], "class-2"],
    ].map(([question, answer, options, id]) => <fieldset className="epik-choice" key={String(id)}><legend>{String(question)} Wählen Sie die passendste Antwort.</legend>{orderOptions(options as string[], String(id)).map((option) => <button type="button" key={option} className={selected[String(id)] === option ? "is-selected" : ""} onClick={() => setSelected((old) => ({ ...old, [String(id)]: option }))}>{option}</button>)}{selected[String(id)] && <small>{selected[String(id)] === answer ? "Rolle und Vermittlungsfunktion sind fachlich passend bestimmt." : "Prüfen Sie, ob die Option eine Rolle innerhalb oder außerhalb der erzählten Welt beschreibt."}</small>}</fieldset>)}<Button disabled={selected["class-0"] !== "Figuren" || selected["class-1"] !== "Erzählinstanz" || selected["class-2"] !== "Sie wählt und vermittelt Informationen über das dargestellte Geschehen."} onClick={() => advance("Figuren handeln innerhalb der erzählten Welt. Die Erzählinstanz wählt und vermittelt Informationen über diese Welt.")}>Zuordnung abschließen</Button></Card></div>}

    {step === 2 && <div className="epik-layout"><PracticeCard text={practice}/><Card className="epik-task"><h3>Autor oder Erzähler?</h3>{authorNarratorStatements.map((item) => <div key={item.id}><p>{item.text}</p><Button variant="secondary" onClick={() => setSelected((old) => ({ ...old, [item.id]: true }))}>Trifft zu</Button><Button variant="secondary" onClick={() => setSelected((old) => ({ ...old, [item.id]: false }))}>Trifft nicht zu</Button>{typeof selected[item.id] === "boolean" && <small>{evaluateAuthorNarrator(item.id, selected[item.id] as boolean) ? "Richtig eingeordnet." : "Autor und Erzähler liegen auf unterschiedlichen Ebenen. Prüfen Sie die Aussage noch einmal."}</small>}</div>)}<Button disabled={!authorNarratorStatements.every((item) => typeof selected[item.id] === "boolean" && evaluateAuthorNarrator(item.id, selected[item.id] as boolean))} onClick={() => advance("Der Autor ist eine reale Person außerhalb des Textes. Der Erzähler ist die Instanz, durch die die Geschichte vermittelt wird.")}>Fehlerprüfung abschließen</Button></Card></div>}

    {step === 3 && <div className="epik-layout"><PracticeCard text={practice}/><Card className="epik-task"><h3>Im Text enthalten oder nicht?</h3>{[[checks.contained, true], [checks.notContained, false], [checks.observation, true], [checks.beyond, false], [`Der Text nennt als Schauplatz: ${checks.setting}.`, true], [`Die handelnden Figuren kennen den Grund für alle Ereignisse.`, false], [`Folgende Figuren oder Gruppen werden genannt: ${checks.actors}.`, true], ["Der Text erklärt abschließend die Gefühle aller Beteiligten.", false]].map(([statement, answer], index) => <div key={`${String(statement)}-${index}`}><p>{String(statement)}</p><Button variant="secondary" onClick={() => setSelected((old) => ({ ...old, [`contained-${index}`]: true }))}>Im Text enthalten</Button><Button variant="secondary" onClick={() => setSelected((old) => ({ ...old, [`contained-${index}`]: false }))}>Nicht im Text enthalten</Button>{typeof selected[`contained-${index}`] === "boolean" && <small>{selected[`contained-${index}`] === answer ? "Textnah entschieden." : "Prüfen Sie, ob die Aussage ausdrücklich mitgeteilt oder unbelegt ergänzt wird."}</small>}</div>)}<Button disabled={![true, false, true, false, true, false, true, false].every((answer, index) => selected[`contained-${index}`] === answer)} onClick={() => advance("Beim Lesen entstehen Vermutungen. Für die Analyse müssen wir unterscheiden, was tatsächlich erzählt und was nur vermutet oder gedeutet wird.")}>Textgrundlage sichern</Button></Card></div>}

      {step === 4 && <div className="epik-layout"><PracticeCard text={transferText}/><Card className="epik-task"><h3>Unbekannten Text selbstständig untersuchen</h3><p>Bei Frage 1 und 4 sind mehrere Antworten möglich. Wählen Sie sonst jeweils die passendste Antwort.</p><fieldset className="epik-choice"><legend>1. Welche Aussagen sind durch den Text sicher belegt? Mehrere Antworten sind möglich.</legend>{orderOptions(["Malik stellt eine Einkaufstasche ab.", "Der Umschlag besitzt keinen Absender.", "Malik schiebt den Umschlag unter Zeitungen.", "Malik erwartet seit Tagen eine Nachricht.", "Der Umschlag enthält eine unbezahlte Rechnung.", "Malik erkennt die Handschrift des Absenders."], "secure").map((option) => <label key={option}><input type="checkbox" checked={selected[`secure-${option}`] === true} onChange={(event) => setSelected((old) => ({ ...old, [`secure-${option}`]: event.target.checked }))}/>{option}</label>)}</fieldset>{[
        ["2. Welche Aussage geht über die sichere Textbeobachtung hinaus?", "Malik will sich vor dem Inhalt des Umschlags schützen.", ["Malik stellt seine Einkaufstasche ab.", "Malik dreht den Umschlag in der Hand um.", "Malik betrachtet die Rückseite des Umschlags.", "Malik schiebt den Umschlag unter Zeitungen.", "Malik will sich vor dem Inhalt des Umschlags schützen.", "Der Umschlag liegt anschließend auf dem Tisch."], "setting"],
        ["3. Welche Aussage beschreibt die Vermittlung des Geschehens fachlich passend?", "Eine Erzählinstanz vermittelt Maliks Handlungen, ohne selbst als Figur aufzutreten.", ["Eine Erzählinstanz vermittelt Maliks Handlungen, ohne selbst als Figur aufzutreten.", "Malik erzählt rückblickend selbst, wie er den Umschlag gefunden und versteckt hat.", "Der reale Autor tritt in der Küchenszene als Sprecher und handelnde Figur auf.", "Die Passage besteht ausschließlich aus Figurenrede und besitzt keine erzählerische Vermittlung."], "mediator"],
      ].map(([question, answer, options, id]) => <fieldset className="epik-choice" key={String(id)}><legend>{String(question)}</legend>{orderOptions(options as string[], String(id)).map((option) => <button type="button" key={option} className={selected[String(id)] === option ? "is-selected" : ""} onClick={() => setSelected((old) => ({ ...old, [String(id)]: option }))}>{option}</button>)}{selected[String(id)] && <small>{selected[String(id)] === answer ? "Die Aussage ist textnah bestimmt." : "Prüfen Sie, was ausdrücklich im Text steht und was bereits erschlossen wird."}</small>}</fieldset>)}
      <fieldset className="epik-choice"><legend>4. Welche vier konkreten Bestandteile kommen in der erzählten Situation vor? Mehrere Antworten sind möglich.</legend>{orderOptions(["Malik", "Küchentisch", "Umschlag", "Einkaufstasche", "Hausflur", "Briefmarke", "Mobiltelefon", "Küchenfenster"], "world").map((option) => <label key={option}><input type="checkbox" checked={selected[`world-${option}`] === true} onChange={(event) => setSelected((old) => ({ ...old, [`world-${option}`]: event.target.checked }))}/>{option}</label>)}</fieldset>
      {[
        ["5. Welche Aussage ist eine vorsichtige, textnahe Schlussfolgerung?", "Maliks Verbergen des Umschlags kann auf Unbehagen hindeuten; ein bestimmter Beweggrund bleibt offen.", ["Malik legt die Einkaufstasche ab und schiebt den Umschlag unter Zeitungen; dies ist zunächst eine Beobachtung.", "Maliks Verbergen des Umschlags kann auf Unbehagen hindeuten; ein bestimmter Beweggrund bleibt offen.", "Malik leidet unter einer ausgeprägten Angststörung, die sein gesamtes Verhalten sicher erklärt.", "Der Umschlag steht eindeutig für ein verdrängtes Familiengeheimnis; andere Deutungen sind ausgeschlossen."], "observation"],
        ["6. Welche Gesamtanalyse trennt Beobachtung, Vermittlung und Deutung fachlich sauber?", "Eine unbeteiligte Erzählinstanz vermittelt, wie Malik den absenderlosen Umschlag betrachtet und verbirgt; dies kann auf Unbehagen deuten, sein Beweggrund bleibt jedoch offen.", ["Eine unbeteiligte Erzählinstanz vermittelt Maliks Handlungen; weil er den Umschlag verbirgt, fürchtet er sicher eine konkrete Nachricht des Absenders.", "Der reale Autor beschreibt Malik am Küchentisch; der absenderlose Umschlag beweist dabei eindeutig ein verdrängtes Familiengeheimnis.", "Die Erzählinstanz nennt Umschlag, Tisch und Zeitungen; deshalb weiß sie sicher, dass Malik den Inhalt kennt und bewusst vor anderen verheimlicht.", "Eine unbeteiligte Erzählinstanz vermittelt, wie Malik den absenderlosen Umschlag betrachtet und verbirgt; dies kann auf Unbehagen deuten, sein Beweggrund bleibt jedoch offen."], "sentence"],
      ].map(([question, answer, options, id]) => <fieldset className="epik-choice" key={String(id)}><legend>{String(question)} Wählen Sie die passendste Antwort.</legend>{orderOptions(options as string[], String(id)).map((option) => <button type="button" key={option} className={selected[String(id)] === option ? "is-selected" : ""} onClick={() => setSelected((old) => ({ ...old, [String(id)]: option }))}>{option}</button>)}{selected[String(id)] && <small>{selected[String(id)] === answer ? "Die Antwort verbindet Begriff und Textgrundlage präzise." : "Prüfen Sie, ob die Aussage mehr behauptet, als der Text trägt."}</small>}</fieldset>)}
      <Button disabled={!["Malik stellt eine Einkaufstasche ab.", "Der Umschlag besitzt keinen Absender.", "Malik schiebt den Umschlag unter Zeitungen."].every((item) => selected[`secure-${item}`] === true) || ["Malik erwartet seit Tagen eine Nachricht.", "Der Umschlag enthält eine unbezahlte Rechnung.", "Malik erkennt die Handschrift des Absenders."].some((item) => selected[`secure-${item}`] === true) || selected.setting !== "Malik will sich vor dem Inhalt des Umschlags schützen." || selected.mediator !== "Eine Erzählinstanz vermittelt Maliks Handlungen, ohne selbst als Figur aufzutreten." || !String(selected.observation).startsWith("Maliks Verbergen") || !String(selected.sentence).startsWith("Eine unbeteiligte Erzählinstanz") || !["Malik", "Küchentisch", "Umschlag", "Einkaufstasche"].every((item) => selected[`world-${item}`] === true) || ["Hausflur", "Briefmarke", "Mobiltelefon", "Küchenfenster"].some((item) => selected[`world-${item}`] === true)} onClick={() => advance("Sie haben sichere Beobachtungen, erzählte Welt, Vermittlung und vorsichtige Deutung unterschieden.")}>Bereich abschließen</Button></Card></div>}

    <section className="epik-chapter-glossary" aria-label="Glossar zu Bereich 1">{chapter01Glossary.map((entry) => <details key={entry.id}><summary>{entry.term}</summary><p>{entry.short}</p>{"note" in entry && <small>{entry.note}</small>}</details>)}</section>
  </section>;
}



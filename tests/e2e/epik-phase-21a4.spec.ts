import { expect, test, type Page } from "@playwright/test";
import { chapter07PracticeTexts } from "../../src/games/epik/data/chapter_07";

async function transfer(page: Page, area: number) {
  await page.getByRole("button", { name: "Prüfmodus · Bereich wechseln" }).click();
  await page.getByLabel(`Lernschritte Bereich ${area}`).getByRole("button", { name: "Schritt 5", exact: true }).click();
}

async function choose(page: Page, group: string | RegExp, answer: string | RegExp) {
  await page.getByRole("group", { name: group }).getByRole("button", { name: answer, exact: typeof answer === "string" }).click();
}

test("B1-Transfer ist als ein kohärenter Lernweg vollständig lösbar", async ({ page }) => {
  await page.goto("/epik?__epik_test=1"); await transfer(page, 1);
  const secure = page.getByRole("group", { name: /1\. Welche Aussagen/ });
  for (const label of ["Malik stellt eine Einkaufstasche ab.", "Der Umschlag besitzt keinen Absender.", "Malik schiebt den Umschlag unter Zeitungen."]) await secure.getByLabel(label, { exact: true }).check();
  await choose(page, /2\. Welche Aussage/, "Malik will sich vor dem Inhalt des Umschlags schützen.");
  await choose(page, /3\. Welche Aussage/, "Eine Erzählinstanz vermittelt Maliks Handlungen, ohne selbst als Figur aufzutreten.");
  for (const label of ["Malik", "Küchentisch", "Umschlag", "Einkaufstasche"]) await page.getByText(label, { exact: true }).last().click();
  await choose(page, /5\. Welche Aussage/, /Maliks Verbergen des Umschlags kann/);
  await choose(page, /6\. Welche Gesamtanalyse/, /Eine unbeteiligte Erzählinstanz vermittelt, wie Malik/);
  await page.getByRole("button", { name: "Bereich abschließen" }).click();
  await expect(page.getByText("Bereich 1 abgeschlossen")).toBeVisible();
});

test("B2- und B6-Transfer schließen ohne parallele Altblöcke ab", async ({ page }) => {
  await page.goto("/epik?__epik_test=1"); await transfer(page, 2);
  for (const [group, answer] of [
    [/1\. In welcher/, "Er-/Sie-Form"], [/2\. Ist die/, /Heterodiegetisch/], [/3\. Welches/, /Personal: Wahrnehmung/],
    [/4\. Welche Information/, /Ob das rote Objekt/], [/5\. Welcher Textbefund/, /Tarek kann/], [/6\. Welche Gesamtanalyse/, /Die Er-\/Sie-Form zeigt/],
  ] as const) await choose(page, group, answer);
  await page.getByRole("button", { name: "Bereich abschließen" }).click(); await expect(page.getByText("Bereich 2 abgeschlossen")).toBeVisible();

  await page.goto("/epik?__epik_test=1"); await transfer(page, 6);
  for (const [group, answer] of [
    [/1\. Anfangszustand/, /Ida wartet/], [/2\. Auslösendes/, /Der Ausbilder/], [/3\. Welcher Beleg/, /Ida nutzt/],
    [/4\. Welches konkrete/, /Sie will den defekten/], [/5\. Welche Aussage/, /Ida möchte/], [/6\. Welche Haltung/, "Selbstständigkeit und Lernbereitschaft"],
    [/7\. Welche Entwicklungskette/, /Anfang: Ida wartet/], [/8\. Wie ist/, /Dynamisch/], [/9\. Welche Gesamtanalyse/, /Ida will den Schalter/],
  ] as const) await choose(page, group, answer);
  await page.getByRole("button", { name: "Bereich abschließen" }).click(); await expect(page.getByText("Bereich 6 abgeschlossen")).toBeVisible();
});

test("B7-Gewichtung steuert die Folgefragen und bleibt vollständig lösbar", async ({ page }) => {
  await page.goto("/epik?__epik_test=1"); await transfer(page, 7);
  const title = await page.getByTestId("practice-text").getByRole("heading").textContent();
  const current = chapter07PracticeTexts.find((item) => item.title === title);
  expect(current).toBeTruthy();
  await page.getByText("Atmosphäre und Gestaltung", { exact: true }).click();
  await page.getByText("Handlungsfunktion und Raum-Figur-Beziehung", { exact: true }).click();
  await choose(page, /Atmosphäre: Welcher Befund/, `${current!.evidence} Das Raumdetail trägt die Wirkung: ${current!.atmosphere}`);
  await choose(page, /Raum-Figur und Funktion/, `${current!.figureRelation} Daraus folgt als Funktion: ${current!.spaceFunction}`);
  await choose(page, /Muss der Raum symbolisch/, "Eine symbolische Deutung ist für diesen Ausschnitt nicht notwendig.");
  await choose(page, /Welche Gesamtanalyse verbindet/, `${current!.evidence} stützt die Atmosphäre ${current!.atmosphere}; zugleich verbindet ${current!.figureRelation} den Raum mit seiner Funktion: ${current!.spaceFunction}`);
  await page.getByRole("button", { name: "Bereich abschließen" }).click(); await expect(page.getByText("Bereich 7 abgeschlossen")).toBeVisible();
});

test("B8-Transfer rekonstruiert Motor und offene Konfliktachsen vollständig", async ({ page }) => {
  await page.goto("/epik?__epik_test=1"); await transfer(page, 8);
  for (const [group, answer] of [
    ["FIGUR", "Hadi"], ["WAS STEHT AUF DEM SPIEL?", /Frau Berans/], ["BEDROHUNG", /Rauch, Sperrung/], ["REAKTION", /Hadi hält inne/],
    ["ENTSCHEIDUNGSLAGE", /Hilfsimpuls/], ["ENTSCHEIDUNG", "noch nicht vorhanden"], ["SICHERE KONSEQUENZ", /Hadi bleibt/], ["AUSGANG", "offen"],
    [/1\. Wirkt/, /Innerer und äußerer/], [/2\. Welche äußere/, /Institutionelle/], [/3\. Welcher Konfliktinhalt/, /Pflicht:/],
    [/4\. Liegt/, /Kein eindeutiger/], [/5\. Welche Gesamtanalyse/, /Hadi steht/],
  ] as const) await choose(page, group, answer);
  await page.getByRole("button", { name: "Bereich abschließen" }).click(); await expect(page.getByText("Bereich 8 abgeschlossen")).toBeVisible();
});

test("B3, B4 und B5 bleiben im Transfer als Smoke erreichbar", async ({ page }) => {
  await page.goto("/epik?__epik_test=1");
  for (const area of [3, 4, 5]) {
    await transfer(page, area);
    await expect(page.locator(".epik-path-progress .is-current")).toHaveText("5");
    await expect(page.getByRole("button", { name: "Bereich abschließen" })).toBeVisible();
  }
});

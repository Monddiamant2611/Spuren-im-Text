import { expect, type Locator, test } from "@playwright/test";

async function solveChoice(group: Locator) {
  const buttons = group.getByRole("button");
  for (let index = 0; index < await buttons.count(); index += 1) {
    await buttons.nth(index).click();
    if (await group.locator("small").getByText(/^Richtig/).count()) return;
  }
  throw new Error("Keine als korrekt rückgemeldete sichtbare Option gefunden.");
}

test("Bereich 2 schaltet Begriffe anwenden nach allen sechs sichtbaren Teilaufgaben frei", async ({ page }) => {
  await page.goto("/epik?__epik_test=1");
  await page.getByRole("button", { name: "Prüfmodus · Bereich wechseln" }).click();
  await page.getByLabel("Lernschritte Bereich 2").getByRole("button", { name: "Schritt 3" }).click();
  const taskGroups = page.locator(".epik-version-grid .epik-choice");
  await expect(taskGroups).toHaveCount(12);
  for (let index = 0; index < 12; index += 1) await solveChoice(taskGroups.nth(index));
  await expect(page.getByRole("button", { name: "Begriffe anwenden" })).toBeEnabled();
});

test("Bereich 3 schaltet Wahrnehmung prüfen nach allen sichtbaren Teilaufgaben frei", async ({ page }) => {
  await page.goto("/epik?__epik_test=1");
  await page.getByRole("button", { name: "Prüfmodus · Bereich wechseln" }).click();
  await page.getByLabel("Lernschritte Bereich 3").getByRole("button", { name: "Schritt 4" }).click();
  await page.getByRole("button", { name: /Seine Beobachtung ist|Die Beschreibung bleibt|Die zugespitzte Bewertung|Die Details sind|Jules Wahrnehmung|Aussage und Verhalten|Die äußeren Eindrücke|Seine Deutung kann|Eine Enttäuschung|Seine Befürchtung/ }).click();
  await page.getByRole("button", { name: "Er bewertet die Handlung und lenkt die Leserwahrnehmung." }).click();
  const statements = page.locator(".epik-task > div");
  for (let index = 0; index < await statements.count(); index += 1) {
    const row = statements.nth(index);
    if (!(await row.getByRole("button").count())) continue;
    await row.getByRole("button", { name: "Trifft zu" }).click();
    if (await row.getByText("Zu pauschal", { exact: false }).count()) await row.getByRole("button", { name: "Trifft nicht zu" }).click();
  }
  await expect(page.getByRole("button", { name: "Wahrnehmung prüfen" })).toBeEnabled();
});

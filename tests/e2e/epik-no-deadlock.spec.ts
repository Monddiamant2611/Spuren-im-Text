import { expect, test, type Page } from "@playwright/test";

async function openStep(page: Page, area: number, step: number) {
  await page.goto("/epik?__epik_test=1");
  await page.getByRole("button", { name: "Prüfmodus · Bereich wechseln" }).click();
  await page.getByLabel(`Lernschritte Bereich ${area}`).getByRole("button", { name: `Schritt ${step}`, exact: true }).click();
}

test("Bereich 4 hält unabhängige Auswahlzustände und erlaubt Korrektur oder Weitergang", async ({ page }) => {
  await openStep(page, 4, 4);
  const choices = page.locator(".epik-task .epik-choice");
  const optionOrder = await Promise.all([0, 1, 2].map((index) => choices.nth(index).getByRole("button").allTextContents()));
  await choices.nth(0).getByRole("button", { name: "Direkte Rede", exact: true }).click();
  await choices.nth(1).getByRole("button", { name: "Innerer Monolog", exact: true }).click();
  await choices.nth(2).getByRole("button", { name: "Erlebte Rede", exact: true }).click();
  const detective = page.locator(".epik-task > div:has(> p)");
  const first = detective.filter({ hasText: "Eine eindeutige Figurenäußerung" });
  const second = detective.filter({ hasText: "Indirekte Rede erkennt man" });
  await first.getByRole("button", { name: "Trifft zu", exact: true }).click();
  await second.getByRole("button", { name: "Trifft nicht zu", exact: true }).click();
  await expect(first.getByRole("button", { name: /^Trifft zu/ })).toHaveAttribute("aria-pressed", "true");
  await expect(second.getByRole("button", { name: /^Trifft nicht zu/ })).toHaveClass(/is-selected/);
  for (const [index, name] of [[0, "Direkte Rede"], [1, "Innerer Monolog"], [2, "Erlebte Rede"]] as const) await expect(choices.nth(index).getByRole("button", { name, exact: true })).toHaveClass(/is-selected/);
  expect(await Promise.all([0, 1, 2].map((index) => choices.nth(index).getByRole("button").allTextContents()))).toEqual(optionOrder);
  await page.getByRole("button", { name: "Wirkung prüfen" }).click();
  await expect(page.getByRole("heading", { name: "Gleicher Inhalt – andere Wirkung" })).toBeVisible();
  await expect(page.getByText("Noch nicht alle Teilaufgaben wurden beantwortet.")).toBeVisible();
  await page.getByRole("button", { name: "Antworten ergänzen" }).click();
  await expect(first.getByRole("button", { name: /^Trifft zu/ })).toHaveAttribute("aria-pressed", "true");
  for (let index = 0; index < await detective.count(); index += 1) {
    const row = detective.nth(index);
    await row.getByRole("button", { name: /^Trifft zu/ }).click();
    if (await row.getByText("Zu pauschal").count()) await row.getByRole("button", { name: /^Trifft nicht zu/ }).click();
  }
  await first.getByRole("button", { name: "Trifft nicht zu", exact: true }).click();
  await page.getByRole("button", { name: "Wirkung prüfen" }).click();
  await expect(page.getByRole("button", { name: "Antworten überarbeiten" })).toBeVisible();
  await page.getByRole("button", { name: "Antworten überarbeiten" }).click();
  await first.getByRole("button", { name: "Trifft zu", exact: true }).click();
  await page.getByRole("button", { name: "Wirkung prüfen" }).click();
  await expect(page.getByRole("heading", { name: "Gleicher Inhalt – andere Wirkung" })).toHaveCount(0);
});

test("eine bewusst falsche Antwort blockiert Bereich 4 nicht", async ({ page }) => {
  await openStep(page, 4, 4);
  await page.getByRole("group", { name: "Welche Form erzeugt hier die unmittelbarste Konfrontation?" }).getByRole("button", { name: "Indirekte Rede" }).click();
  await page.getByRole("button", { name: "Wirkung prüfen" }).click();
  await expect(page.getByRole("status").filter({ hasText: "Die Form passt noch nicht" })).toBeVisible();
  await page.getByRole("button", { name: "Antworten überarbeiten" }).click();
  await expect(page.getByRole("button", { name: "Indirekte Rede", pressed: true })).toBeVisible();
  await page.getByRole("button", { name: "Wirkung prüfen" }).click();
  await page.getByRole("button", { name: "Trotzdem weiter" }).click();
  await expect(page.getByText("Rede- und Gedankenformen · Schritt 5 von 5")).toBeVisible();
});

test("Bereich 6 trennt Choice-Antworten von gleichnamigen Fehlerdetektiv-Keys", async ({ page }) => {
  await openStep(page, 6, 4);
  const self = page.getByRole("group", { name: "Selbstbild und Verhalten bei Luanne" });
  const chosen = self.getByRole("button").first();
  await chosen.click();
  const statement = page.locator(".epik-task > div:has(> p)").filter({ hasText: "Selbstbild und Verhalten müssen übereinstimmen" });
  await statement.getByRole("button", { name: "Trifft nicht zu", exact: true }).click();
  await expect(chosen).toHaveClass(/is-selected/);
  await expect(statement.getByRole("button", { name: "Trifft nicht zu", exact: true })).toHaveAttribute("aria-pressed", "true");
});

for (let area = 1; area <= 9; area += 1) {
  test(`Bereich ${area}: unbeantworteter Prüfschritt bietet Weitergang`, async ({ page }) => {
    await openStep(page, area, 1);
    const check = page.locator(".epik-progression-check > button").first();
    await expect(check).toBeEnabled();
    await check.click();
    await expect(page.getByRole("button", { name: "Trotzdem weiter" })).toBeVisible();
    await page.getByRole("button", { name: "Trotzdem weiter" }).click();
    await expect(page.locator(".epik-path-progress .is-current")).toHaveText("2");
  });
  test(`Bereich ${area}: letzter Schritt lässt transparenten Abschluss zu`, async ({ page }) => {
    await openStep(page, area, 5);
    await page.getByRole("button", { name: "Bereich abschließen" }).click();
    await expect(page.getByRole("button", { name: "Bereich trotzdem abschließen" })).toBeVisible();
    await page.getByRole("button", { name: "Bereich trotzdem abschließen" }).click();
    await expect(page.getByText(`Bereich ${area} abgeschlossen`)).toBeVisible();
  });
}

test("Abschlussfall enthält keine versteckte Korrektheits-Sperre", async ({ page }) => {
  await page.goto("/epik?__epik_test=1");
  await page.getByRole("button", { name: "Prüfmodus · Bereich wechseln" }).click();
  await page.getByRole("button", { name: "Abschlussfall", exact: true }).click();
  await page.getByRole("button", { name: "Orientierung prüfen" }).click();
  await expect(page.getByRole("button", { name: "Trotzdem weiter" })).toBeVisible();
  await page.getByRole("button", { name: "Trotzdem weiter" }).click();
  await expect(page.getByRole("heading", { name: "Auffällige Spuren sammeln" })).toBeVisible();
});

for (const viewport of [{ width: 390, height: 844 }, { width: 768, height: 1024 }, { width: 1366, height: 768 }, { width: 1440, height: 900 }]) {
  test(`Fehlerfeedback bleibt bei ${viewport.width}×${viewport.height} ohne horizontalen Überlauf`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await openStep(page, 4, 4);
    await page.getByRole("button", { name: "Wirkung prüfen" }).click();
    await expect(page.getByRole("button", { name: "Trotzdem weiter" })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  });
}

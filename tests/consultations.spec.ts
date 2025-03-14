import { test, expect } from '@playwright/test';

test('Consultations workflow', async ({ page }) => {
  // TODO (GAFI 14-03-2025): Ajouter le début du workflow depuis la page d'accueil
  await page.goto('/consultations/17/questions')

  let nextStep = await page.getByRole('button', { name: /(Question suivante)|(Envoyer)/ }).textContent();
  while (!nextStep.includes("Envoyer")) {
    const questionSuivante = page.getByRole('button', { name: 'Question suivante' });
    await questionSuivante.click()
    nextStep = await page.getByRole('button', { name: /(Question suivante)|(Envoyer)/ }).textContent();
  }

  const envoyer = page.getByRole('button', { name: 'Envoyer' })
  // FIXME (GAFI 14-03-2025): Le bouton envoyer ne fait rien quand on clique
  await expect(envoyer).toBeVisible();
})

import { test, expect } from '@playwright/test'

test.describe('PastilleStatut', () => {
  test('aria-label par état', async ({ page }) => {
    const etats: { story: string; ariaLabel: string }[] = [
      { story: 'etat-nouveau', ariaLabel: 'Nouveau tag' },
      { story: 'etat-existant', ariaLabel: 'Tag existant' },
      { story: 'etat-conflit', ariaLabel: 'Conflit' },
      { story: 'etat-vide', ariaLabel: 'Vide' },
      { story: 'etat-sain', ariaLabel: 'Sûr' },
    ]

    for (const { story, ariaLabel } of etats) {
      await page.goto(`/iframe.html?args=&id=ui-pastille-de-statut--${story}`)
      const span = page.locator('[aria-label]')
      await expect(span).toHaveAttribute('aria-label', ariaLabel)
    }
  })

  test('icônes distinctes par état', async ({ page }) => {
    // État nouveau → icône SVG (ValiderIcon / checkmark)
    await page.goto('/iframe.html?args=&id=ui-pastille-de-statut--etat-nouveau')
    let svg = page.locator('[aria-label="Nouveau tag"] svg')
    await expect(svg).toBeVisible()

    // État conflit → icône SVG (AttentionIcon / exclamation)
    await page.goto('/iframe.html?args=&id=ui-pastille-de-statut--etat-conflit')
    svg = page.locator('[aria-label="Conflit"] svg')
    await expect(svg).toBeVisible()

    // État sain → icône SVG (BouclierIcon)
    await page.goto('/iframe.html?args=&id=ui-pastille-de-statut--etat-sain')
    svg = page.locator('[aria-label="Sûr"] svg')
    await expect(svg).toBeVisible()

    // État existant → pas d'icône SVG, pastille pleine
    await page.goto('/iframe.html?args=&id=ui-pastille-de-statut--etat-existant')
    svg = page.locator('[aria-label="Tag existant"] svg')
    await expect(svg).toHaveCount(0)

    // État vide → pas d'icône SVG, cercle vide avec bordure
    await page.goto('/iframe.html?args=&id=ui-pastille-de-statut--etat-vide')
    svg = page.locator('[aria-label="Vide"] svg')
    await expect(svg).toHaveCount(0)
  })

  test('en mode renforcé, libellé toujours visible', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=ui-pastille-de-statut--accessibilite-renforcee')

    // Avec accessibiliteRenforcee=true et avecLibelle=false, le libellé doit être visible
    const span = page.locator('[aria-label="Nouveau tag"]')
    await expect(span).toBeVisible()
    await expect(span).toContainText('Nouveau')

    // Vérifie l'attribut data-accessibilite
    await expect(span).toHaveAttribute('data-accessibilite', 'renforcee')
  })

  test('tous les statuts s\'affichent dans TousLesStatuts', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=ui-pastille-de-statut--tous-les-statuts')

    for (const label of ['Nouveau tag', 'Tag existant', 'Conflit', 'Vide', 'Sûr']) {
      await expect(page.locator(`[aria-label="${label}"]`)).toBeVisible()
    }
  })
})

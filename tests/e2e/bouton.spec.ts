import { test, expect } from '@playwright/test'

test.describe('Bouton', () => {
  test('role="button" présent sur toutes les variantes', async ({ page }) => {
    for (const story of ['primaire', 'secondaire', 'ghost', 'danger']) {
      await page.goto(`/iframe.html?args=&id=ui-bouton--${story}`)
      const bouton = page.getByRole('button')
      await expect(bouton).toBeVisible()
    }
  })

  test('aria-label présent sur icône seule', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=ui-bouton--icône-seule')

    const bouton = page.getByRole('button', { name: 'Télécharger le rapport' })
    await expect(bouton).toBeVisible()
    await expect(bouton).toHaveAttribute('aria-label', 'Télécharger le rapport')
  })

  test('focus visible affiche l\'outline', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=ui-bouton--focus-visible')

    const bouton = page.getByTestId('bouton-focus')
    await expect(bouton).toBeVisible()

    // Focus programmatique
    await bouton.focus()
    await expect(bouton).toBeFocused()

    // Vérifie que focus-visible est appliqué (outline-style)
    const outlineStyle = await bouton.evaluate((el) => getComputedStyle(el).outlineStyle)
    expect(outlineStyle).toBe('solid')
  })

  test('taille minimale respectée', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=ui-bouton--tailles')

    const boutonPetit = page.getByRole('button', { name: 'Petit' })
    const boutonMoyen = page.getByRole('button', { name: 'Moyen' })
    const boutonGrand = page.getByRole('button', { name: 'Grand' })

    await expect(boutonPetit).toBeVisible()
    await expect(boutonMoyen).toBeVisible()
    await expect(boutonGrand).toBeVisible()

    const petitHeight = await boutonPetit.evaluate((node) => node.getBoundingClientRect().height)
    const moyenHeight = await boutonMoyen.evaluate((node) => node.getBoundingClientRect().height)
    const grandHeight = await boutonGrand.evaluate((node) => node.getBoundingClientRect().height)

    expect(petitHeight).toBeGreaterThanOrEqual(24)
    expect(moyenHeight).toBeGreaterThanOrEqual(32)
    expect(grandHeight).toBeGreaterThanOrEqual(40)
  })

  test('bouton désactivé', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=ui-bouton--desactive')

    const bouton = page.getByRole('button', { name: 'Valider et télécharger' })
    await expect(bouton).toBeDisabled()
  })

  test('tous les états : primaire, secondaire, ghost, danger', async ({ page }) => {
    const etats: { story: string; variante: string }[] = [
      { story: 'primaire', variante: 'primaire' },
      { story: 'secondaire', variante: 'secondaire' },
      { story: 'ghost', variante: 'ghost' },
      { story: 'danger', variante: 'danger' },
    ]

    for (const { story, variante } of etats) {
      await page.goto(`/iframe.html?args=&id=ui-bouton--${story}`)
      const bouton = page.getByRole('button')
      await expect(bouton).toBeVisible()
      await expect(bouton).not.toBeDisabled()
    }
  })
})

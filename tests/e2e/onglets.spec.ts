import { test, expect } from '@playwright/test'

test.describe('Onglets', () => {
  test('affiche la tablist avec les onglets', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=ui-onglets--par-défaut')

    const tablist = page.getByRole('tablist')
    await expect(tablist).toBeVisible()
    await expect(tablist).toHaveAttribute('aria-label', 'Navigation par onglets')

    const onglets = page.getByRole('tab')
    await expect(onglets).toHaveCount(3)
    await expect(onglets.nth(0)).toHaveText('Pseudonymiser')
    await expect(onglets.nth(1)).toHaveText('Restaurer')
    await expect(onglets.nth(2)).toHaveText('Paramètres')
  })

  test('l\'onglet actif a aria-selected="true"', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=ui-onglets--par-défaut')

    const ongletActif = page.getByRole('tab', { name: 'Pseudonymiser' })
    await expect(ongletActif).toHaveAttribute('aria-selected', 'true')

    const ongletInactif = page.getByRole('tab', { name: 'Restaurer' })
    await expect(ongletInactif).toHaveAttribute('aria-selected', 'false')
  })

  test('la story DeuxièmeOngletActif démarre avec le deuxième onglet sélectionné', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=ui-onglets--deuxième-onglet-actif')

    const ongletActif = page.getByRole('tab', { name: 'Restaurer' })
    await expect(ongletActif).toHaveAttribute('aria-selected', 'true')

    const ongletInactif = page.getByRole('tab', { name: 'Pseudonymiser' })
    await expect(ongletInactif).toHaveAttribute('aria-selected', 'false')
  })

  test('change d\'onglet au clic', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=ui-onglets--par-défaut')

    const ongletRestaurer = page.getByRole('tab', { name: 'Restaurer' })
    await ongletRestaurer.click()

    await expect(ongletRestaurer).toHaveAttribute('aria-selected', 'true')

    // Le panneau correspondant doit être visible
    const panneau = page.getByRole('tabpanel')
    await expect(panneau).toContainText('Restaurer')
  })

  test('navigation clavier flèche droite', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=ui-onglets--par-défaut')

    const ongletPseudonymiser = page.getByRole('tab', { name: 'Pseudonymiser' })
    await ongletPseudonymiser.focus()

    // Flèche droite → onglet Restaurer
    await page.keyboard.press('ArrowRight')
    const ongletRestaurer = page.getByRole('tab', { name: 'Restaurer' })
    await expect(ongletRestaurer).toHaveAttribute('aria-selected', 'true')
    await expect(ongletRestaurer).toBeFocused()
  })

  test('navigation clavier flèche gauche', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=ui-onglets--deuxième-onglet-actif')

    const ongletRestaurer = page.getByRole('tab', { name: 'Restaurer' })
    await ongletRestaurer.focus()

    // Flèche gauche → onglet Pseudonymiser
    await page.keyboard.press('ArrowLeft')
    const ongletPseudonymiser = page.getByRole('tab', { name: 'Pseudonymiser' })
    await expect(ongletPseudonymiser).toHaveAttribute('aria-selected', 'true')
    await expect(ongletPseudonymiser).toBeFocused()
  })

  test('navigation clavier Home/End', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=ui-onglets--par-défaut')

    const ongletPseudonymiser = page.getByRole('tab', { name: 'Pseudonymiser' })
    await ongletPseudonymiser.focus()

    // End → dernier onglet
    await page.keyboard.press('End')
    const ongletParametres = page.getByRole('tab', { name: 'Paramètres' })
    await expect(ongletParametres).toHaveAttribute('aria-selected', 'true')
    await expect(ongletParametres).toBeFocused()

    // Home → premier onglet
    await page.keyboard.press('Home')
    await expect(ongletPseudonymiser).toHaveAttribute('aria-selected', 'true')
    await expect(ongletPseudonymiser).toBeFocused()
  })

  test('le tabpanel a les bons attributs', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=ui-onglets--par-défaut')

    const panneau = page.getByRole('tabpanel')
    await expect(panneau).toHaveId('panel-pseudonymiser')
    await expect(panneau).toHaveAttribute('aria-labelledby', 'tab-pseudonymiser')
  })
})

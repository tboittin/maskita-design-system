import { test, expect } from '@playwright/test'

test.describe('Modal', () => {
  const storyUrl = '/iframe.html?id=ui-modal--interactive'

  test('role="dialog" et aria-modal="true"', async ({ page }) => {
    await page.goto(storyUrl)

    const bouton = page.getByRole('button', { name: 'Ouvrir la modale' })
    await expect(bouton).toBeVisible()
    await bouton.click()

    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    await expect(dialog).toHaveAttribute('aria-modal', 'true')
  })

  test('aria-labelledby pointe sur le titre', async ({ page }) => {
    await page.goto(storyUrl)

    const bouton = page.getByRole('button', { name: 'Ouvrir la modale' })
    await expect(bouton).toBeVisible()
    await bouton.click()

    const dialog = page.getByRole('dialog')
    const labelledby = await dialog.getAttribute('aria-labelledby')
    expect(labelledby).toBeTruthy()

    // Sélection par attribut id plutôt que par sélecteur CSS (évite les caractères
    // spéciaux comme ':' générés par useId())
    const titre = page.locator(`[id="${labelledby}"]`)
    await expect(titre).toBeVisible()
    await expect(titre).toHaveText('Retirer les valeurs du tag')
  })

  test('aria-describedby pointe sur le contenu', async ({ page }) => {
    await page.goto(storyUrl)

    const bouton = page.getByRole('button', { name: 'Ouvrir la modale' })
    await expect(bouton).toBeVisible()
    await bouton.click()

    const dialog = page.getByRole('dialog')
    const describedby = await dialog.getAttribute('aria-describedby')
    expect(describedby).toBeTruthy()

    // Sélection par attribut id pour éviter les problèmes de sélecteur CSS
    const contenu = page.locator(`[id="${describedby}"]`)
    await expect(contenu).toBeVisible()
    await expect(contenu).toHaveAttribute('role', 'document')
  })

  test('Escape ferme la modale', async ({ page }) => {
    await page.goto(storyUrl)

    const bouton = page.getByRole('button', { name: 'Ouvrir la modale' })
    await expect(bouton).toBeVisible()
    await bouton.click()
    await expect(page.getByRole('dialog')).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(page.getByRole('dialog')).not.toBeVisible()
  })

  test('retour focus à l\'élément déclencheur après fermeture', async ({ page }) => {
    await page.goto(storyUrl)

    const bouton = page.getByRole('button', { name: 'Ouvrir la modale' })
    await expect(bouton).toBeVisible()
    await bouton.click()
    await expect(page.getByRole('dialog')).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(bouton).toBeFocused()
  })

  test('focus piégé dans la modale (Tab/Shift+Tab)', async ({ page }) => {
    await page.goto(storyUrl)

    const bouton = page.getByRole('button', { name: 'Ouvrir la modale' })
    await expect(bouton).toBeVisible()
    await bouton.click()
    await expect(page.getByRole('dialog')).toBeVisible()

    const fermer = page.getByRole('button', { name: 'Fermer la fenêtre' })
    const annuler = page.getByRole('button', { name: 'Annuler' })
    const retirer = page.getByRole('button', { name: 'Retirer' })

    // Le focus initial est sur le dialog (tabIndex={-1}), pas sur un bouton.
    // Premier Tab → premier focusable (Fermer)
    await page.keyboard.press('Tab')
    await expect(fermer).toBeFocused()

    // Tab → Annuler
    await page.keyboard.press('Tab')
    await expect(annuler).toBeFocused()

    // Tab → Retirer
    await page.keyboard.press('Tab')
    await expect(retirer).toBeFocused()

    // Tab → retour au premier (focus trap)
    await page.keyboard.press('Tab')
    await expect(fermer).toBeFocused()

    // Shift+Tab → dernier (focus trap)
    await page.keyboard.press('Shift+Tab')
    await expect(retirer).toBeFocused()
  })
})

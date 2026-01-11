import { test, expect } from '@playwright/test';

test.describe('Context Manager Feature', () => {
  test.beforeEach(async ({ page }) => {
    // Start fresh
    await page.goto('http://localhost:3000');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('should satisfy all acceptance criteria', async ({ page }) => {
    // Test 1: Initial State (No Context)
    const contextButton = page.getByRole('button', { name: /Context \(Pro\)/i });
    await expect(contextButton).toBeVisible();
    await expect(contextButton).toHaveClass(/text-muted-foreground/);

    // Test 2: Create First Context
    await contextButton.click();
    await expect(page.getByText('No contexts yet')).toBeVisible();
    
    await page.getByRole('button', { name: /Create New Context/i }).click();
    await page.getByLabel('Context Name').fill('Marketing Voice');
    await page.getByLabel('Context Instructions').fill('Use professional tone');
    
    // Save context
    await page.getByRole('button', { name: 'Save Context' }).click();

    // Verify Modal Closes
    await expect(page.getByText('No contexts yet')).not.toBeVisible();

    // Verify Button Update (Active State)
    const marketingButton = page.getByRole('button', { name: /Marketing Voice/i });
    await expect(marketingButton).toBeVisible();
    await expect(marketingButton).toHaveClass(/text-orange-600/);

    // Test 3: Persistence After Refresh
    await page.reload();
    await expect(marketingButton).toBeVisible();
    await expect(marketingButton).toHaveClass(/text-orange-600/);

    // Test 4: Create Second Context
    await marketingButton.click();
    await page.getByRole('button', { name: /Create New Context/i }).click();
    await page.getByLabel('Context Name').fill('Tech Docs');
    await page.getByLabel('Context Instructions').fill('Technical writing');
    await page.getByRole('button', { name: 'Save Context' }).click();

    // Verify Auto-Switch
    const techButton = page.getByRole('button', { name: /Tech Docs/i });
    await expect(techButton).toBeVisible();

    // Test 5: Switch Contexts
    await techButton.click();
    // Click the row for "Marketing Voice" (assuming it's clickable or has a select button)
    // Adjust selector based on actual implementation of ContextManagerModal
    await page.getByText('Marketing Voice').click(); 
    
    // Verify switch back
    await expect(marketingButton).toBeVisible();

    // Test 6: Prompt Generation
    await page.getByPlaceholder('Enhance your conversations...').fill('Write a product announcement');
    await page.getByRole('button', { name: 'Generate Prompt' }).click();

    // Check generated content
    // We target the pre element which contains the prompt content
    const generatedContent = page.locator('.prose pre'); 
    await expect(generatedContent).toContainText('Use professional tone');
    await expect(generatedContent).toContainText('Write a product announcement');
  });
});

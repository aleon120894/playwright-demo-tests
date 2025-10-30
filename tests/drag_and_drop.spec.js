import { test, expect } from '@playwright/test';


// Callback-method for HTML5 drag & drop (works when page.dragAndDrop() doesn't work)
async function html5DragAndDrop(page, sourceSelector, targetSelector) {
  await page.evaluate(({ sourceSelector, targetSelector }) => {
    function createDataTransfer() {
      try {
        return new DataTransfer();
      } catch {
        return {
          data: {},
          setData: function (key, value) { this.data[key] = value; },
          getData: function (key) { return this.data[key]; },
        };
      }
    }

    const src = document.querySelector(sourceSelector);
    const dst = document.querySelector(targetSelector);
    if (!src || !dst) throw new Error('Source or target not found');

    const dt = createDataTransfer();

    const fireEvent = (node, type, dataTransfer) => {
      const event = new DragEvent(type, {
        bubbles: true,
        cancelable: true,
        dataTransfer,
      });
      node.dispatchEvent(event);
    };

    fireEvent(src, 'dragstart', dt);
    fireEvent(dst, 'dragenter', dt);
    fireEvent(dst, 'dragover', dt);
    fireEvent(dst, 'drop', dt);
    fireEvent(src, 'dragend', dt);
  }, { sourceSelector, targetSelector });
}

test.describe("Drag and Drop Tests", () => {
  
  test("Built-in dragAndDrop should swap columns", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/drag_and_drop");

    const columnAHeader = page.locator("#column-a header");
    const columnBHeader = page.locator("#column-b header");

    // Initial state
    await expect(columnAHeader).toHaveText("A");
    await expect(columnBHeader).toHaveText("B");

    // Using Built-in method
    await page.dragAndDrop("#column-a", "#column-b");

    // Checking place exchanging
    await expect(columnAHeader).toHaveText("B");
    await expect(columnBHeader).toHaveText("A");
  });

  test("HTML5 dragAndDrop fallback works correctly", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/drag_and_drop");

    const columnAHeader = page.locator("#column-a header");
    const columnBHeader = page.locator("#column-b header");

    await expect(columnAHeader).toHaveText("A");
    await expect(columnBHeader).toHaveText("B");

    // Use the backup option
    await html5DragAndDrop(page, "#column-a", "#column-b");

    await expect(columnAHeader).toHaveText("B");
    await expect(columnBHeader).toHaveText("A");
  });
});

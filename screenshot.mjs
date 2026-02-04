import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function takeScreenshot() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Figmaと同じ幅1280pxでビューポート設定
  await page.setViewportSize({ width: 1280, height: 2642 });
  
  // ローカルHTMLを開く
  await page.goto(`file://${join(__dirname, 'index.html')}`);
  
  // フォント読み込み待機
  await page.waitForTimeout(2000);
  
  // フルページスクリーンショット
  await page.screenshot({
    path: 'generated-screenshot.png',
    fullPage: true
  });
  
  await browser.close();
  console.log('Screenshot saved: generated-screenshot.png');
}

takeScreenshot();

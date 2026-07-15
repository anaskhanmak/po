import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer";
import puppeteerCore from "puppeteer-core";

export async function getBrowser() {
  // Local Development
  if (process.env.NODE_ENV === "development") {
    return puppeteer.launch({
      headless: true,
    });
  }

  // Vercel Production
  return puppeteerCore.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: true,
  });
}
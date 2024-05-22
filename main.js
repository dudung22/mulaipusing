const fs = require("fs");
const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

async function sleep(time = 2) {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve(true);
    }, time * 1000);
  });
}

async function autoClaim(phrases = [], delay = 7200) {
  for (let i in phrases) {
    var phrase = phrases[i];

    console.clear();
    console.log("############################");
    console.log("# BOT AUTO CLAIM WAVEONSUI #");
    console.log("############################\n");

    let chromeOptions = new chrome.Options();
    chromeOptions.addArguments("--start-maximized");
    chromeOptions.addArguments("--enable-chrome-browser-cloud-management");
    chromeOptions.addArguments("--disable-blink-features=AutomationControlled");
    chromeOptions.excludeSwitches("enable-automation");
    chromeOptions.excludeSwitches("enable-logging");
    chromeOptions.windowSize({
      width: 530,
      height: 900,
    });

    let driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(chromeOptions)
      .build();
    await driver.get(
      "https://walletapp.waveonsui.com/#tgWebAppData=query_id%3DAAH_WrgoAwAAAP9auChi8D9n%26user%3D%257B%2522id%2522%253A7125621503%252C%2522first_name%2522%253A%2522Ahnanznsnzn%2522%252C%2522last_name%2522%253A%2522%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26auth_date%3D1716327920%26hash%3D956a1e7f49df8225250b72f306668aa00b6d9d543ebcafefb5bf8fd81bdaaeb9&tgWebAppVersion=7.2&tgWebAppPlatform=weba&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22text_color%22%3A%22%23000000%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%233390ec%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%23707579%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23e53935%22%7D"
    );

    try {
      console.log(`[${i}] Phrase : ${phrase}`);

      await driver.wait(
        until.urlIs("https://walletapp.waveonsui.com/register/create-account"),
        5000
      );
      await driver.findElement(By.css("button.btn-login")).click();
      await driver.wait(
        until.urlIs("https://walletapp.waveonsui.com/login"),
        5000
      );
      await driver
        .findElement(By.css("textarea.h-full.w-full"))
        .sendKeys(phrase);
      await driver.findElement(By.css("button.btn-continue")).click();
      await driver.wait(until.urlIs("https://walletapp.waveonsui.com/"), 5000);
      await driver.findElement(By.css("button.btn_claim")).click();
      await driver.wait(
        until.urlIs("https://walletapp.waveonsui.com/claim"),
        5000
      );
      await sleep(2);
      var current_amount = await driver
        .findElement(By.css("div.boat_balance"))
        .getText();
      console.log(`[${i}] Current Amount : ${current_amount}`);
      await driver.findElement(By.css("div.claim.cursor-pointer")).click();
      await sleep(5);
      console.log(`[${i}] Berhasil claim!`);
    } catch {
      console.log(`[${i}] Gagal claim!`);
    }

    await driver.quit();
    await sleep(5);
  }

  console.clear();
  console.log("########################");
  console.log("# AUTO CLAIM WAVEONSUI #");
  console.log("########################\n");
  console.log(`Menunggu ${delay} menit...`);
  await sleep(delay * 60);

  return true;
}

(async () => {
  const DELAY_IN_MINUTES = 10;

  var phrases = await fs
    .readFileSync("phrases.txt", "utf-8")
    .trim()
    .split("\r\n");

  while (true) {
    await autoClaim(phrases, DELAY_IN_MINUTES);
  }
})();

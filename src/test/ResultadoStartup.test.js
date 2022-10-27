const { Builder, By, Key, until } = require('selenium-webdriver')
const delay = ms => new Promise(res => setTimeout(res, ms))
const chrome = require('selenium-webdriver/chrome')


let proxy = require('selenium-webdriver/proxy');
let opts = new chrome.Options();

opts.addArguments("--window-size=1936,1056");
opts.addArguments("--allow-insecure-localhost");
opts.addArguments("--headless");
opts.addArguments("--disable-gpu");
opts.addArguments("--disable-webgl");
opts.addArguments("--no-sandbox");
opts.addArguments("--ignore-gpu-blocklist");

const assert = require('assert')
const { wait } = require('@testing-library/dom')
const { waitFor } = require('@testing-library/dom')


describe('ResultadoStartup', function() {
  this.timeout(30000)
  let driver
  let vars

  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome')
    .setChromeOptions(opts)
    .build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })

  it('ResultadoStartup', async function() {
    await driver.get("http://localhost/")
    await driver.manage().window().setRect({ width: 1936, height: 1056 })

    await driver.manage().window().setRect(1936, 1056)
    await driver.findElement(By.name("email")).click()
    await driver.findElement(By.name("email")).sendKeys("startup@email.com")
    await driver.findElement(By.name("password")).click()
    await driver.findElement(By.name("password")).sendKeys("123456")
    await driver.findElement(By.name("entrar")).click()
    await delay(2000)
    vars["windowHandles"] = await driver.getAllWindowHandles()
    await delay(700)
    await driver.executeScript("window.scrollTo(0,0)")
    await driver.executeScript("window.scrollTo(0,0)")
    await driver.executeScript("window.scrollTo(0,0)")
    await driver.close()
    
  })
})
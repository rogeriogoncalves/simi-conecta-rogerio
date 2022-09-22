const { Builder, By, Key, until } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')


let proxy = require('selenium-webdriver/proxy');
let opts = new chrome.Options();

opts.addArguments("--window-size=1936,1056");
opts.addArguments("--allow-insecure-localhost");
opts.addArguments("--headless");
opts.addArguments("--disable-gpu");
opts.addArguments("--disable-webgl");
opts.addArguments("--no-sandbox");

const assert = require('assert')
const { wait } = require('@testing-library/dom')
const { waitFor } = require('@testing-library/dom')


describe('LogOn', function() {
  this.timeout(30000)
  let driver
  let vars

  s

  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome')
    .setChromeOptions(opts)
    .build()
    vars = {}
  })
  //afterEach(async function() {
    //await driver.quit();
  //})

  it('LogOn', async function() {
    //await driver.get("http://google.com.br")
    await driver.get("http://localhost")
    await driver.manage().window().setRect(1936, 1056)
    await driver.findElement(By.name("email")).click()
    await driver.findElement(By.name("email")).sendKeys("email" + Math.floor(Math.random() * 1000) + "@email.com")
    await driver.findElement(By.name("password")).sendKeys("123456")
    await driver.findElement(By.name("entrar")).click()
    await driver.close()
  })
})
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

const assert = require('assert')
const { wait } = require('@testing-library/dom')
const { waitFor } = require('@testing-library/dom')


describe('CadastroStartup', function() {
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

  it('CadastroStartup', async function() {
    await driver.get("http://localhost/register")
    await driver.manage().window().setRect({ width: 1936, height: 1056 })

    await driver.manage().window().setRect(1936, 1056)
    
    await driver.findElement(By.id("email")).click()
    await driver.findElement(By.id("email")).sendKeys("email" + Math.floor(Math.random() * 1000) + "@email.com")
    await driver.findElement(By.id("password")).click()
    await driver.findElement(By.id("password")).sendKeys("12345")
    await driver.findElement(By.id("confirmPassword")).click()
    await driver.findElement(By.id("confirmPassword")).sendKeys("12345")
    await driver.findElement(By.id("name")).click()
    await driver.findElement(By.id("name")).sendKeys("Teste S.A.")
    await driver.findElement(By.xpath("(//button[@type=\'button\'])[2]")).click()

    //Tela Cidade Sede
    await delay(700)
    await driver.wait(until.elementLocated(By.xpath("//div[@id=\'root\']/div/form/div[6]/div[2]/div/div/button")), 3000)
    await driver.findElement(By.xpath("//div[@id=\'root\']/div/form/div[6]/div[2]/div/div/button")).click()
    await driver.wait(until.elementLocated(By.css(".anticon-right > svg")), 300000)
    await driver.findElement(By.css(".anticon-right > svg")).click()

    //Tela Fase de Negócios
    await delay(700)
    await driver.wait(until.elementLocated(By.xpath("//div[@id=\'root\']/div/form/div[3]/div[2]/div/div/div/div/span/input")), 30000)
    await driver.findElement(By.xpath("//div[@id=\'root\']/div/form/div[3]/div[2]/div/div/div/div/span/input")).click()
    await driver.findElement(By.xpath("//div[@id=\'root\']/div/div/ul/li[3]/button")).click()
    await driver.findElement(By.xpath("//div[@id=\'root\']/div/form/div[5]/div[2]/div/div/div/div/div")).click()
    await driver.findElement(By.css(".anticon-right > svg")).click()

    //Tela principais dificuldades

    //Tela Programas de desenvolvimento
    await delay(500)
    await driver.wait(until.elementLocated(By.xpath("//div[@id=\'root\']/div/form/div[6]/div[2]/div/div/div/div/div")), 3000)
    await driver.findElement(By.xpath("//div[@id=\'root\']/div/form/div[6]/div[2]/div/div/div/div/div")).click()
    await delay(500)
    await driver.wait(until.elementLocated(By.xpath("//div[66]/div/div")), 30000)
    await driver.findElement(By.xpath("//div[66]/div/div")).click()
    await driver.findElement(By.xpath("//div[@id=\'root\']/div/form/div[6]/div[2]/div/div/div/div/div")).click()

    await driver.close()
  })
})
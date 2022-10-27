const { Builder, By, Key, until } = require('selenium-webdriver')
const delay = ms => new Promise(res => setTimeout(res, ms))
const chrome = require('selenium-webdriver/chrome')


let proxy = require('selenium-webdriver/proxy');
let opts = new chrome.Options();

opts.addArguments("--window-size=1936,1056");
opts.addArguments("--allow-insecure-localhost");
//opts.addArguments("--headless");
//opts.addArguments("--disable-gpu");
//opts.addArguments("--disable-webgl");
//opts.addArguments("--no-sandbox");
//opts.addArguments("--ignore-gpu-blocklist");

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
    await driver.findElement(By.id("email")).sendKeys("startup@email.com")
    await driver.findElement(By.id("password")).click()
    await driver.findElement(By.id("password")).sendKeys("123456")
    await driver.findElement(By.css(".ant-input-affix-wrapper-focused")).click()
    await driver.findElement(By.id("confirmPassword")).sendKeys("123456")
    await driver.findElement(By.id("name")).click()
    await driver.findElement(By.id("name")).sendKeys("Test S.A.")
    await driver.findElement(By.css(".anticon-right > svg")).click()

    //Tela Cidade Sede
    await delay(700)
    await driver.findElement(By.css(".ant-btn:nth-child(1)")).click()
    await driver.wait(until.elementLocated(By.id("headOfficeCity")), 3000)
    await delay(700)
    await driver.findElement(By.id("headOfficeCity")).click()
    await driver.wait(until.elementLocated(By.css(".ant-select-item-option-active .OnboardingStartup_OptionItem__n0rks")), 3000)
    await driver.findElement(By.css(".ant-select-item-option-active .OnboardingStartup_OptionItem__n0rks")).click()
    await delay(700)
    await driver.wait(until.elementLocated(By.css(".anticon-right > svg")), 300000)
    await driver.findElement(By.css(".anticon-right > svg")).click()

    //Tela Fase de Negócios
    await delay(700)
    await driver.wait(until.elementLocated(By.id("stage")), 3000)
    await driver.findElement(By.id("stage")).click()
    await driver.wait(until.elementLocated(By.xpath("//div[3]/div/div/div/div[2]/div/div/div/div/div/div")), 3000)
    await driver.findElement(By.xpath("//div[3]/div/div/div/div[2]/div/div/div/div/div/div")).click()
    await delay(700)
    await driver.findElement(By.css(".anticon-right > svg")).click()

    //Tela Principais Dificuldades
    await delay(700)
    await driver.wait(until.elementLocated(By.xpath("//div[@id=\'root\']/div/form/div[5]/div[2]/div/div/div/div/div")), 3000)
    await driver.findElement(By.xpath("//div[@id=\'root\']/div/form/div[5]/div[2]/div/div/div/div/div")).click()
    await driver.findElement(By.xpath("//div[4]/div/div/div/div[2]/div/div/div/div/div/div")).click()
    await delay(700)
    await driver.findElement(By.css(".anticon-right > svg")).click()

    //Tela Programa de desenvolvimento
    await delay(700)
    await driver.wait(until.elementLocated(By.xpath("//div[@id=\'root\']/div/form/div[6]/div[2]/div/div/div/div/div")), 3000)
    await driver.findElement(By.xpath("//div[@id=\'root\']/div/form/div[6]/div[2]/div/div/div/div/div")).click()
    await driver.findElement(By.xpath("//div[5]/div/div/div/div[2]/div/div/div/div/div/div")).click()
    await driver.findElement(By.css(".anticon-right > svg")).click()

    await delay(700)
    await driver.wait(until.elementLocated(By.xpath("//button[contains(.,\'Concluir\')]")), 3000)
    await driver.findElement(By.xpath("//button[contains(.,\'Concluir\')]")).click()

    await driver.close()
  })
})
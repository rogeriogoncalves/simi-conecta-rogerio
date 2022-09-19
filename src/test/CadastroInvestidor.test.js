const { Builder, By, Key, until } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const delay = ms => new Promise(res => setTimeout(res, ms))

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


describe('CadastroInvestidor', function() {
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

  it('CadastroInvestidor', async function() {
    await driver.get("http://localhost/register")
    await driver.manage().window().setRect({ width: 1936, height: 1056 })

    //Tela Vamos Começar    
    await driver.findElement(By.id("email")).click()
    await driver.findElement(By.id("email")).sendKeys("email" + Math.floor(Math.random() * 1000) + "@email.com")
    await driver.findElement(By.id("password")).click()
    await driver.findElement(By.id("password")).sendKeys("123456")
    await driver.findElement(By.id("confirmPassword")).click()
    await driver.findElement(By.id("confirmPassword")).sendKeys("123456")
    await driver.findElement(By.id("name")).click()
    await driver.findElement(By.id("name")).sendKeys("Teste S.A.")
    await driver.findElement(By.xpath("(//button[@type=\'button\'])[2]")).click()

    //Tela Categoria Organização
    await driver.wait(until.elementLocated(By.xpath("(//button[@type=\'button\'])[2]")), 30000)
    await driver.findElement(By.css(".anticon-dollar > svg")).click()

    //Tela Estagio Desenvolvimento
    await driver.wait(until.elementLocated(By.xpath("//div[@id=\'root\']/div/form/div[2]/div[2]/div/div/div/div/div")), 30000)
    await driver.findElement(By.xpath("//div[@id=\'root\']/div/form/div[2]/div[2]/div/div/div/div/div")).click()
    await delay(500)
    await driver.findElement(By.xpath("//div[@name=\'Operação\']")).click()
    await driver.findElement(By.xpath("//div[@name=\'Tração\']")).click()
    await driver.findElement(By.xpath("//div[@name=\'Escala\']")).click()
    await driver.findElement(By.css(".anticon-right > svg")).click()

    //Tela Segmento de Startup
    await driver.wait(until.elementLocated(By.xpath("//div[@id=\'root\']/div/form/div[4]/div[2]/div/div/div/div/div")), 30000)
    await driver.findElement(By.xpath("//div[@id=\'root\']/div/form/div[4]/div[2]/div/div/div/div/div")).click()
    await delay(500)
    await driver.wait(until.elementLocated(By.xpath("//div[@name=\'aerospace\']")), 30000)
    await driver.findElement(By.xpath("//div[@name=\'aerospace\']")).click()
    await driver.findElement(By.css(".anticon-right > svg")).click()
    //await driver.findElement(By.css(".anticon-right path")).click()

    //Tela Preferencia Tecnologia
    await driver.wait(until.elementLocated(By.xpath("//div[@id=\'root\']/div/form/div[5]/div[2]/div/div/div/div/div")), 30000)
    await driver.findElement(By.xpath("//div[@id=\'root\']/div/form/div[5]/div[2]/div/div/div/div/div")).click()
    await delay(500)
    await driver.wait(until.elementLocated(By.xpath("//div[@name=\'mobileApp\']")), 30000)
    await driver.findElement(By.xpath("//div[@name=\'mobileApp\']")).click()
    await driver.findElement(By.xpath("//div[@name=\'industrialAutomation\']")).click()
    await driver.findElement(By.css(".anticon-right > svg")).click()

    //Tela Modelo Negocio
    await driver.wait(until.elementLocated(By.xpath("//div[@id=\'root\']/div/form/div[6]/div[2]/div/div/div/div/div")), 30000)
    await driver.findElement(By.xpath("//div[@id=\'root\']/div/form/div[6]/div[2]/div/div/div/div/div")).click()
    await delay(500)
    await driver.findElement(By.xpath("//div[@name=\'ads\']")).click()
    await driver.findElement(By.xpath("//div[@name=\'subscription\']")).click()
    await driver.findElement(By.css(".anticon-right > svg")).click()

    //Tela Segmentação de clientes
    await driver.wait(until.elementLocated(By.xpath("//div[@id=\'root\']/div/form/div[8]/div[2]/div/div/div/div/div")), 30000)
    await driver.findElement(By.xpath("//div[@id=\'root\']/div/form/div[8]/div[2]/div/div/div/div/div")).click()
    await delay(500)
    await driver.findElement(By.xpath("//div[@name=\'b2b\']")).click()
    await driver.findElement(By.xpath("//div[@id=\'root\']/div/div/ul/li[3]/button")).click()

    //Tela Fase de investimentos
    await driver.wait(until.elementLocated(By.xpath("//div[@id=\'root\']/div/form/div[10]/div[2]/div/div/div/div/div")), 30000)
    await driver.findElement(By.xpath("//div[@id=\'root\']/div/form/div[10]/div[2]/div/div/div/div/div")).click()
    await driver.wait(until.elementLocated(By.xpath("//div[@name=\'seed\']")), 30000)
    await delay(500)
    await driver.findElement(By.xpath("//div[@name=\'seed\']")).click()
    await driver.findElement(By.xpath("//div[@id=\'root\']/div/form/div[10]/div[2]/div/div/div/div/div")).click()
    await driver.findElement(By.xpath("//div[@id=\'root\']/div/form/div[12]/div/div/div/button/span")).click()
    
    await driver.close()
    })
})
import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
const options={headless:true};
if(process.env.ARENA_CHROMIUM){const {default:c}=await import('@sparticuz/chromium');options.executablePath=await c.executablePath();options.args=c.args;}
const browser=await chromium.launch(options);
const page=await browser.newPage({viewport:{width:1440,height:1000}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto(process.env.TEST_URL||'http://localhost:5173');await page.waitForFunction(()=>document.querySelector('#loading').hidden);
await page.locator('[data-mode="activity"]').click();assert.equal(await page.locator('#clock').textContent(),'6.240');
await page.locator('[data-color="#d7c8af"]').click();assert.equal(await page.locator('#finish-name').textContent(),'Arena');
await page.locator('#crown').click();assert.equal(await page.locator('#clock').textContent(),'72 ♡');
await page.locator('#pulse').click();await page.waitForTimeout(2800);assert.match(await page.locator('#clock').textContent(),/^\d+ ♡$/);assert.equal(await page.locator('#drawer').isVisible(),true);
await page.locator('#close-drawer').click();await page.locator('[data-tab="specs"]').click();assert.match(await page.locator('#drawer-body').textContent(),/45 mm/);await page.locator('#close-drawer').click();
await page.locator('[data-env="immersive"]').click();assert.match(await page.locator('body').getAttribute('class'),/immersive/);await page.locator('[data-env="studio"]').click();
await page.locator('#reset').click();await page.locator('#ar').click();assert.equal(await page.locator('#toast').isVisible(),true);
await page.setViewportSize({width:390,height:844});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);await page.locator('[data-mode="clock"]').click();assert.equal(await page.locator('#clock').textContent(),'11:11');
assert.deepEqual(errors,[]);await browser.close();console.log('PASS: OBJ load, screen modes, finish, crown, pulse, specs, environments, AR fallback, mobile layout; no runtime errors.');

// Cliente mínimo del protocolo DevTools de Chrome (sin dependencias): abre Chrome en modo headless
// y expone `send(method, params)`. Lo usan los scripts de capturas y de exportación a PDF.
import { spawn } from 'node:child_process'
import { mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME =
  process.env.CHROME_PATH ??
  (process.platform === 'win32'
    ? 'C:/Program Files/Google/Chrome/Application/chrome.exe'
    : process.platform === 'darwin'
      ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
      : 'google-chrome')

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

export async function openChrome() {
  const port = 9300 + Math.floor(Math.random() * 500)
  const chrome = spawn(CHROME, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--hide-scrollbars',
    `--user-data-dir=${mkdtempSync(join(tmpdir(), 'cdp-'))}`,
    'about:blank',
  ])
  let targets = []
  for (let i = 0; i < 60 && !targets.length; i++) {
    try {
      targets = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).filter((t) => t.type === 'page')
    } catch {
      /* Chrome aún arrancando */
    }
    if (!targets.length) await sleep(250)
  }
  const ws = new WebSocket(targets[0].webSocketDebuggerUrl)
  await new Promise((r) => ws.addEventListener('open', r))
  let id = 0
  const pending = new Map()
  ws.addEventListener('message', (e) => {
    const m = JSON.parse(e.data)
    if (m.id && pending.has(m.id)) {
      pending.get(m.id)(m)
      pending.delete(m.id)
    }
  })
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const i = ++id
      pending.set(i, (m) => (m.error ? reject(new Error(`${method}: ${m.error.message}`)) : resolve(m.result)))
      ws.send(JSON.stringify({ id: i, method, params }))
    })
  const evaluate = async (expression) =>
    (await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })).result.value
  await send('Page.enable')
  await send('Runtime.enable')
  const close = () => {
    ws.close()
    chrome.kill()
  }
  return { send, evaluate, close }
}

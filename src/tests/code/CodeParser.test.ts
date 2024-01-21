import { promises as fsPromises } from 'fs'
import { join } from 'path'
import { CodeParser } from '../../code/CodeParser'
import { it, describe, expect } from 'vitest'

const dir = join(__dirname, '..', 'resources', 'code')
describe('CodeParser', () => {
  describe('parse', () => {
    it('typescript', async () => {
      const parser = new CodeParser()
      const json = await fsPromises.readFile(join(dir, '01code.ts.json'), 'utf-8')
      const code = await fsPromises.readFile(join(dir, '01code.ts.txt'), 'utf-8')
      const tokens = await parser.parse(code, 'typescript')
      // console.log(JSON.stringify(tokens, null, 2))
      expect(tokens).toEqual(JSON.parse(json))
    })
    it('unknown language', async () => {
      const parser = new CodeParser()
      const code = await fsPromises.readFile(join(dir, '01code.ts.txt'), 'utf-8')
      let err: Error|undefined
      try {
        await parser.parse(code, 'newlang')
      } catch (e) {
        err = e as Error
      }
      expect(err).toBeDefined()
      expect(err?.message).toEqual('Language not found: newlang')
    })
    it('markdown', async () => {
      const parser = new CodeParser()
      const json = await fsPromises.readFile(join(dir, '02markdown.md.json'), 'utf-8')
      const code = await fsPromises.readFile(join(dir, '02markdown.md'), 'utf-8')
      const tokens = await parser.parse(code, 'markdown')
      // console.log(JSON.stringify(tokens, null, 2))
      expect(tokens).toEqual(JSON.parse(json))
    })
    it('xml', async () => {
      const parser = new CodeParser()
      const json = await fsPromises.readFile(join(dir, '03code.xml.json'), 'utf-8')
      const code = await fsPromises.readFile(join(dir, '03code.xml'), 'utf-8')
      const tokens = await parser.parse(code, 'xml')
      // console.log(JSON.stringify(tokens, null, 2))
      expect(tokens).toEqual(JSON.parse(json))
    })
    it('html', async () => {
      const parser = new CodeParser()
      const json = await fsPromises.readFile(join(dir, '04code.html.json'), 'utf-8')
      const code = await fsPromises.readFile(join(dir, '04code.html'), 'utf-8')
      const tokens = await parser.parse(code, 'html')
      // console.log(JSON.stringify(tokens, null, 2))
      expect(tokens).toEqual(JSON.parse(json))
    })
    it('scss', async () => {
      const parser = new CodeParser()
      const json = await fsPromises.readFile(join(dir, '05code.scss.json'), 'utf-8')
      const code = await fsPromises.readFile(join(dir, '05code.scss'), 'utf-8')
      const tokens = await parser.parse(code, 'scss')
      if (process.env.DEBUG) {
        console.log(JSON.stringify(tokens, null, 2))
      } else {
        expect(tokens).toEqual(JSON.parse(json))
      }
    })
    it('java', async () => {
      const parser = new CodeParser()
      const json = await fsPromises.readFile(join(dir, '06code.java.json'), 'utf-8')
      const code = await fsPromises.readFile(join(dir, '06code.java.txt'), 'utf-8')
      const tokens = await parser.parse(code, 'java')
      if (process.env.DEBUG) {
        console.log(JSON.stringify(tokens, null, 2))
      } else {
        expect(tokens).toEqual(JSON.parse(json))
      }
    })
    it('ruby', async () => {
      const parser = new CodeParser()
      const json = await fsPromises.readFile(join(dir, '07code.rb.json'), 'utf-8')
      const code = await fsPromises.readFile(join(dir, '07code.rb.txt'), 'utf-8')
      const tokens = await parser.parse(code, 'ruby')
      if (process.env.DEBUG) {
        console.log(JSON.stringify(tokens, null, 2))
      } else {
        expect(tokens).toEqual(JSON.parse(json))
      }
    })
  })
})

import { promises as fsPromises } from 'fs'
import { join } from 'path'
import { CodeParser } from '../../code/CodeParser'
import { it, describe, expect } from 'vitest'

const dir = join(__dirname, '..', 'resources', 'code')
describe('CodeParser', () => {
  describe('parse', () => {
    it('main', async () => {
      const parser = new CodeParser()
      const json = await fsPromises.readFile(join(dir, '01code.ts.json'), 'utf-8')
      const code = await fsPromises.readFile(join(dir, '01code.ts.txt'), 'utf-8')
      const tokens = await parser.parse(code, 'typescript')
      // console.log(JSON.stringify(tokens, null, 2))
      expect(tokens).toEqual(JSON.parse(json))
    })
  })
})

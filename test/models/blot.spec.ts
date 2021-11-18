import test from 'ava'
import { Blot } from '@src/models/blot'

test('blot', (t) => {
  const imageBlot = new Blot({ insert: { image: 'http://img.example.com' } })
  t.truthy(imageBlot.isEmbed)

  const tableBlot = new Blot({ insert: { table: {} } })
  t.truthy(tableBlot.isBlockEmbed)
})

# quill-delta-converter
Convert [quill](https://github.com/quilljs/quill) data delta to html and markdown without using dom

# install
``` bash
yarn add quill-delta-converter
# or
npm install quill-delta-converter
```

# how to use
``` typescript
import { DeltaConverter } from 'quill-delta-converter'

function delta2html() {
  const converter = new DeltaConverter()
  return converter.toHtml(deltaData)
}

function delta2htmlWithConfig() {
  const config = {
    html: {
      formats: {
        bold(content, attributes) {
          return { tagName: 'b', classNames: 'my-bold' }
        }
        // ...
      }
    }
  }
  const converter = new DeltaConverter(config)
  return converter.toHtml(deltaData)
}
```

# scripts
``` bash 
# build
yarn build
# test
yarn test
# debug test
yarn test debug --break test/test-file-path/filename.spec.ts
```

# Todos
- [ ] markdown
- [ ] support table
- [ ] detailed documentation

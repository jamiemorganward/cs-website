import type { IGraphQLConfig } from 'graphql-config'
import { loadEnvConfig } from '@next/env'

loadEnvConfig('./')

const config: IGraphQLConfig = {
  schema: {
    'https://graphql.datocms.com': {
      headers: {
        Authorization: `${process.env.NEXT_DATOCMS_API_TOKEN}`
      }
    }
  },
  documents: 'src/graphql/**/*.graphql',
  extensions: {
    codegen: {
      overwrite: true,
      generates: {
        'src/graphql/generated/': {
          preset: 'client',
          plugins: [],
          presetConfig: {
            fragmentMasking: false // HERE
          }
        }
      }
    }
  }
}

export default config

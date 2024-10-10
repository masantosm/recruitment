// setupTests.ts
import { expect } from 'vitest'
import { config } from '@vue/test-utils'

// Configuración de Vue Test Utils
config.global.mocks = {
  $t: (msg: string) => msg
}

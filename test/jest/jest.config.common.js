/**
 * Shared Jest configuration set up with TypeScript for all environments. When using
 * TypeScript Jest config files, Jest will use `ts-node` to compile the config file.
 * `ts-jest` doesn't take part in that process.
 */

import * as dotenv from 'dotenv'

// load environmental variables if not already loaded
if (!process.env['ELEVENTY_ENV_VARS_INIT']) {
  dotenv.config({ path: './.env.local' })
}

const config = {
  /** Ignore any tests in the node_modules, .cache, or public directories */
  testPathIgnorePatterns: [`node_modules`, `<rootDir>/public`],
  /** Set up for Babel config for TypeScript code */
}

export default config

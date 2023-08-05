/**
 * Jest configured set up with TypeScript
 */
const config = {
  /** Root directory that Jest should scan for tests and modules within */
  rootDir: './',
  /** To place configuration elsewhere, point to the path of the config file in projects */
  projects: ['<rootDir>/test/jest/jest.config.jsdom.js', '<rootDir>/test/jest/jest.config.node.js'],
}

export default config

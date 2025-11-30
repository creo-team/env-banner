// Vitest setup file
import '@testing-library/react'

// Mock process.env for tests
global.process = global.process || { env: {} }

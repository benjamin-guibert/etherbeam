export const clearMocks = (): void => {
  jest.clearAllMocks()
  jest.clearAllTimers()
  jest.useFakeTimers()
}

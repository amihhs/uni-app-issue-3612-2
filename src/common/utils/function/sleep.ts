export default function sleep<T>(duration: number): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}

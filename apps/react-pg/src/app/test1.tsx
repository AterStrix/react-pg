import { useColor } from "./context"

export const Test1 = ({ children }) => {
  const { color } = useColor();

  return (
    <>
        <h1>Test 1</h1>
        {children}
    </>
  )
}

import { ReactNode } from "react";
import { useColor } from "./context"

export const Test1 = ({ children }: { children: ReactNode }) => {
  const { color } = useColor();

  return (
    <>
        <h1>Test 1</h1>
        {children}
    </>
  )
}

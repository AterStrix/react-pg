import React, { ReactNode } from "react"

type Item = React.FC<{ children: ReactNode, [key: string]: unknown }>;
interface ComposeProps {
  children: ReactNode;
  items: (Item|unknown[])[];
}

export const Compose = (props: ComposeProps) => {
  const { items, children } = props;
  const current = { item: (Array.isArray(items[0]) ? items[0][0] : items[0]) as Item };
  const params = Array.isArray(items[0]) ? items[0][1] : null;
  const next: unknown = items[1];
  return (
    <current.item { ...params }>
      {next ? <Compose items={items.slice(1)}>{children}</Compose> : children}
    </current.item>
  )
}

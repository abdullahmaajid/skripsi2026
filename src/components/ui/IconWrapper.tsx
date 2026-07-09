"use client";

import React from "react";
import * as Icons from "lucide-react";

/**
 * Wrapper untuk menampilkan ikon dari lucide-react dengan ukuran standar.
 * Props:
 *  - name: nama ikon (sesuai export dari lucide-react)
 *  - size: ukuran dalam pixel (default 20)
 *  - className: tambahan class CSS
 */
export default function IconWrapper({
  name,
  size = 20,
  className = "",
}: {
  name: keyof typeof Icons;
  size?: number;
  className?: string;
}) {
  // lucide-react exports icons as React components, but TypeScript cannot infer the exact type
  // from a dynamic key lookup. We cast to any to satisfy the compiler while keeping runtime behavior.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = (Icons as any)[name] as any;
  // @ts-ignore – Icon is a valid React component at runtime
  return <Icon size={size} className={className} />;
}

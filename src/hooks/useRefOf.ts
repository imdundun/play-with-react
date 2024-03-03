import { useRef } from "react";

export default function useRefOf<T>(value: T) {
  const ref = useRef(value)
  if (ref.current !== value) ref.current = value
  return ref
}
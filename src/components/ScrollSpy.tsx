import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import Button, { type ButtonProps } from "./Button";
import { useInView } from "react-intersection-observer";

type ScrollSpyValue = string;

export type ScrollSpyProps = React.PropsWithChildren<{
  value: ScrollSpyValue | undefined | null;
  onChange: (value: ScrollSpyValue) => void;
}>;
export default function ScrollSpy({
  children,
  value,
  onChange,
}: ScrollSpyProps) {
  const refs = useRef<Record<ScrollSpyValue, HTMLDivElement>>({});

  return (
    <ScrollSpyContext.Provider value={{ value, onChange, refs }}>
      {children}
    </ScrollSpyContext.Provider>
  );
}

export type ScrollSpyButtonProps = ButtonProps & {
  value: ScrollSpyValue;
  props?: (active: boolean) => ButtonProps;
};

ScrollSpy.Button = function ScrollSpyButton({
  value,
  onClick,
  props,
  ...other
}: ScrollSpyButtonProps) {
  const { value: activeValue, onChange, refs } = useScrollSpyContext();
  const active = activeValue === value;

  return (
    <Button
      {...other}
      onClick={(e) => {
        onChange(value);
        refs.current[value]?.scrollIntoView({ behavior: "smooth" });
        onClick?.(e);
      }}
      {...props?.(active)}
    />
  );
};

export type ScrollSpyContentProps = React.ComponentProps<"div"> & {
  value: ScrollSpyValue;
};
ScrollSpy.Content = function ScrollSpyContent({
  value,
  ...props
}: ScrollSpyContentProps) {
  const { ref, inView } = useInView({ threshold: 0.5 });
  const { value: activeValue, onChange, refs } = useScrollSpyContext();
  const active = value === activeValue;

  const setRefs = useCallback(
    (node: HTMLDivElement) => {
      refs.current[value] = node;
      ref(node);
    },
    [ref, value, refs]
  );

  useEffect(() => {
    if (inView && !active) {
      onChange(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, inView, value]);

  return <div ref={setRefs} {...props} />;
};

interface ScrollSpyContextData {
  value: ScrollSpyValue | undefined | null;
  onChange: (value: ScrollSpyValue) => void;
  refs: React.MutableRefObject<Record<ScrollSpyValue, HTMLDivElement>>;
}

const ScrollSpyContext = createContext<ScrollSpyContextData>({
  value: undefined,
  onChange: () => {},
  refs: { current: {} },
});

const useScrollSpyContext = () => useContext(ScrollSpyContext);

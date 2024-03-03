import { createContext, useContext, useEffect, useRef, useState } from "react";
import Button, { type ButtonProps } from "./Button";
import useInView from "~/hooks/useInView";

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
  const [inViewValue, setInViewValue] = useState<ScrollSpyValue>();
  const scrollingIntoViewRef = useRef(false);

  return (
    <ScrollSpyContext.Provider
      value={{
        value,
        onChange,
        inViewValue,
        setInViewValue,
        scrollingIntoViewRef,
      }}
    >
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
  const { inViewValue, onChange } = useScrollSpyContext();
  const active = inViewValue === value;

  return (
    <Button
      {...other}
      onClick={(e) => {
        onChange(value);
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
  const ref = useRef<HTMLDivElement>(null);
  const {
    value: ctxValue,
    inViewValue,
    onChange,
    setInViewValue,
    scrollingIntoViewRef,
  } = useScrollSpyContext();

  useInView(ref, {
    threshold: 0.5,
    onChange: (inView) => {
      if (!inView) return

      setInViewValue(value);
      if (value === ctxValue) scrollingIntoViewRef.current = false;
      if (!scrollingIntoViewRef.current && value !== ctxValue) onChange(value);
    },
  });

  const shouldScrollIntoView = inViewValue !== value && value === ctxValue;
  useEffect(() => {
    if (!shouldScrollIntoView) return;

    scrollingIntoViewRef.current = true;
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [scrollingIntoViewRef, shouldScrollIntoView]);

  return <div ref={ref} {...props} />;
};

interface ScrollSpyContextData {
  value: ScrollSpyValue | undefined | null;
  onChange: (value: ScrollSpyValue) => void;
  inViewValue: ScrollSpyValue | undefined;
  setInViewValue: React.Dispatch<
    React.SetStateAction<ScrollSpyValue | undefined>
  >;
  scrollingIntoViewRef: React.MutableRefObject<boolean>;
}

const ScrollSpyContext = createContext<ScrollSpyContextData>({
  value: undefined,
  onChange: () => {},
  inViewValue: undefined,
  setInViewValue: () => {},
  scrollingIntoViewRef: { current: false },
});

const useScrollSpyContext = () => useContext(ScrollSpyContext);

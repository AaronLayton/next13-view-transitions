import { useRef, useLayoutEffect } from "react";

interface UseViewTransitionArg<DataType> {
  beforeChange?(data: DataType, transition: ViewTransition): void;
  afterChange?(data: DataType, transition: ViewTransition): void;
  done?(data: DataType): void;
}

interface StartTransitionOptions<DataType> {
  classNames?: string[];
  data?: DataType;
}

export default function useViewTransition<DataType = undefined>({
  beforeChange,
  afterChange,
  done
}: UseViewTransitionArg<DataType> = {}) {
  const startResolverRef = useRef<(value?: unknown) => void>();
  const beforeChangeRef = useRef(beforeChange);
  const afterChangeRef = useRef(afterChange);
  const doneRef = useRef(done);
  const dataRef = useRef<DataType>();
  const transitionRef = useRef<ViewTransition>();

  useLayoutEffect(() => {
    if (startResolverRef.current === undefined) return;
    console.log("here");
    afterChangeRef.current?.(dataRef.current!, transitionRef.current!);
    startResolverRef.current();
    startResolverRef.current = undefined;
  });

  return async ({
    classNames = [],
    data
  }: StartTransitionOptions<DataType> = {}): Promise<void> => {
    if (!("startViewTransition" in document)) return;

    return new Promise<void>((resolve) => {
      dataRef.current = data;
      document.documentElement.classList.add(...classNames);

      const transition = document.startViewTransition(async () => {
        resolve();
        // Wait for next update
        await new Promise((resolve) => (startResolverRef.current = resolve));
      });

      transitionRef.current = transition;
      beforeChangeRef.current?.(data!, transition);

      transition.finished
        .finally(() => {
          document.documentElement.classList.remove(...classNames);
          doneRef.current?.(data!);
        })
        .catch(() => {});
    });
  };
}

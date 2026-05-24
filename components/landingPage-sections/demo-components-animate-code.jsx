"use client";

import React from "react";
import { Code, CodeBlock, CodeHeader } from "@/components/animate-ui/components/animate/code";
import { Code2 } from "lucide-react";

const CODE = `import { useState, useEffect, useCallback, useRef } from "react";

const usePreparation = (goal, options = {}) => {
  const [progress, setProgress] = useState(null);
  const [grinding, setGrinding] = useState(true);
  const [setback, setSetback] = useState(null);
  const attemptsRef = useRef(0);

  const { retryLimit = Infinity, onSuccess, onFailure } = options;

  const pursue = useCallback(async () => {
    if (attemptsRef.current >= retryLimit) return;

    attemptsRef.current += 1;
    setGrinding(true);

    try {
      const result = await goal();

      setProgress(result);
      setSetback(null);
      onSuccess?.(result);

    } catch (rejection) {
      setSetback(rejection);
      onFailure?.(rejection, attemptsRef.current);

    } finally {
      setGrinding(false);
    }
  }, [goal, retryLimit, onSuccess, onFailure]);

  useEffect(() => {
    pursue();
  }, [pursue]);

  const keepGoing = useCallback(() => {
    setSetback(null);
    pursue();
  }, [pursue]);

  return {
    progress,
    grinding,
    setback,
    keepGoing,
    attempts: attemptsRef.current,
    hired: progress !== null && !grinding,
  };
};

export default usePreparation;`;

export const CodeDemo = ({
  duration = 30000,
  delay = 500,
  writing = true,
  cursor = true,
}) => {
  return (
    <div className="h-full w-full overflow-hidden">
      <Code
        key={`${duration}-${delay}-${writing}-${cursor}`}
        code={CODE}
        className="relative h-105 sm:h-107.5 md:h-90 lg:h-full w-full overflow-hidden border-none bg-transparent"
      >
        <CodeHeader
          icon={Code2}
          copyButton
          className="sticky top-0 z-20 flex items-center justify-between border-b border-white/5 bg-[#0d0d14] px-3 py-2.5 text-[11px] sm:text-xs"
        >
          use-preparation.tsx
        </CodeHeader>

        <div className="h-[calc(100%-46px)] overflow-y-auto overflow-x-auto md:overflow-x-auto lg:overflow-x-hidden scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
          <div className="min-w-162.5 md:min-w-175 lg:min-w-0">
            <CodeBlock
              cursor={cursor}
              lang="tsx"
              writing={writing}
              duration={duration}
              delay={delay}
              className="px-3 py-3 text-[10px] sm:text-[11px] md:text-[11px] lg:text-[13px] leading-5 whitespace-pre"
            />
          </div>
        </div>
      </Code>
    </div>
  );
};
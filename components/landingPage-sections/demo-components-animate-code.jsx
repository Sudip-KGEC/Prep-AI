"use client";

import {
  Code,
  CodeBlock,
  CodeHeader,
} from "@/components/animate-ui/components/animate/code";
import { Code2 } from "lucide-react";
import React from "react";

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

export const CodeDemo = ({ duration, delay, writing, cursor }) => {
  return (
    <Code
      key={`${duration}-${delay}-${writing}-${cursor}`}
      className="w-full sm:w-110 h-110 border-none overflow-auto scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      code={CODE}
    >
      <CodeHeader icon={Code2} copyButton>
        use-preparation.tsx
      </CodeHeader>

      <CodeBlock
        cursor={cursor}
        lang="tsx"
        writing={writing}
        duration={duration}
        delay={delay}
      />
    </Code>
  );
};
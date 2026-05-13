"use client";

import {
  Code,
  CodeBlock,
  CodeHeader,
} from "@/components/animate-ui/components/animate/code";
import { Code2 } from "lucide-react";
import React from "react";

export const CodeDemo = ({ duration, delay, writing, cursor }) => {
  return (
    <Code
      key={`${duration}-${delay}-${writing}-${cursor}`}
      className="w-full sm:w-110 h-110 border-none overflow-x-hidden overflow-y-scroll [&::-webkit-scrollbar]:w-[0.5px] [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-purple-950 [&::-webkit-scrollbar-thumb]:rounded-full [scrollbar-width:none] [scrollbar-color:#7c3aed transparent]"
      code={`import { useState, useEffect } from "react";

const useFetch = (url, options) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error('HTTP error! status: response.status');
        }
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options]); // Re-run effect if URL or options change

  return { data, loading, error };
};

export default useFetch;'
`}
    >
      <CodeHeader icon={Code2} copyButton>
        use-fetch.jsx
      </CodeHeader>

      <CodeBlock
        cursor={cursor}
        lang="jsx"
        writing={writing}
        duration={duration}
        delay={delay}
      />
    </Code>
  );
};
"use client"

import ReactMarkdown from "react-markdown"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import "katex/dist/katex.min.css"

interface MarkdownRendererProps {
  content: string
  className?: string
  variant?: "light" | "dark"  // dark = white text on colored bg (chat bubble)
}

export default function MarkdownRenderer({ content, className = "", variant = "light" }: MarkdownRendererProps) {
  const isDark = variant === "dark"

  // Color tokens based on variant
  const heading = isDark ? "text-white" : "text-slate-800"
  const body = isDark ? "text-white/90 font-medium" : "text-slate-700 font-medium"
  const bold = isDark ? "text-white" : "text-slate-800"
  const italic = isDark ? "text-white/70" : "text-slate-600"
  const bullet = isDark ? "text-white/60" : "text-[var(--accent)]"
  const codeBg = isDark ? "bg-white/10 text-white/90 border-white/10" : "bg-slate-100 text-[var(--accent-dark)] border-slate-200/60"
  const codeBlockBg = isDark ? "bg-white/10 text-white/90 border-white/10" : "bg-slate-50 text-slate-700 border-slate-100"
  const quoteBg = isDark ? "border-white/40 bg-white/5" : "border-[var(--accent)] bg-[var(--pastel-purple)]"
  const quoteText = isDark ? "text-white/90" : "text-slate-700"
  const hrColor = isDark ? "border-white/10" : "border-slate-100"

  return (
    <div className={`markdown-prose ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          h1: ({ children }) => (
            <h1 className={`text-xl font-bold ${heading} mb-3 mt-5 first:mt-0`}>{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className={`text-lg font-bold ${heading} mb-2.5 mt-4 first:mt-0`}>{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className={`text-base font-bold ${heading} mb-2 mt-3.5 first:mt-0`}>{children}</h3>
          ),

          p: ({ children }) => (
            <p className={`text-[13.5px] md:text-[14px] ${body} leading-[1.8] mb-3 last:mb-0`}>{children}</p>
          ),

          strong: ({ children }) => (
            <strong className={`font-bold ${bold}`}>{children}</strong>
          ),
          em: ({ children }) => (
            <em className={`italic ${italic}`}>{children}</em>
          ),

          ul: ({ children }) => (
            <ul className="space-y-1.5 mb-3 last:mb-0 ml-1">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className={`space-y-1.5 mb-3 last:mb-0 ml-1 list-decimal list-inside ${body}`}>{children}</ol>
          ),
          li: ({ children }) => (
            <li className={`text-[13.5px] md:text-[14px] ${body} leading-[1.8] flex gap-2`}>
              <span className={`${bullet} font-bold mt-0.5 shrink-0`}>•</span>
              <span className="flex-1">{children}</span>
            </li>
          ),

          code: ({ children, className: codeClassName }) => {
            const isInline = !codeClassName
            if (isInline) {
              return (
                <code className={`text-[13px] ${codeBg} px-1.5 py-0.5 rounded-md font-mono border`}>
                  {children}
                </code>
              )
            }
            return (
              <code className={`block text-[13px] ${codeBlockBg} p-4 rounded-xl font-mono border overflow-x-auto mb-3`}>
                {children}
              </code>
            )
          },
          pre: ({ children }) => (
            <pre className="mb-3 last:mb-0">{children}</pre>
          ),

          blockquote: ({ children }) => (
            <blockquote className={`border-l-[3px] ${quoteBg} ${quoteText} rounded-r-xl pl-4 pr-4 py-3 mb-3 last:mb-0`}>
              {children}
            </blockquote>
          ),

          hr: () => (
            <hr className={`${hrColor} my-4`} />
          ),

          table: ({ children }) => (
            <div className={`overflow-x-auto mb-3 rounded-xl border ${isDark ? "border-white/10" : "border-slate-100"}`}>
              <table className="w-full text-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className={isDark ? "bg-white/5 text-white/70" : "bg-slate-50 text-slate-600"}>{children}</thead>
          ),
          th: ({ children }) => (
            <th className={`px-3 py-2 text-left font-bold text-xs uppercase tracking-wider border-b ${isDark ? "border-white/10" : "border-slate-100"}`}>{children}</th>
          ),
          td: ({ children }) => (
            <td className={`px-3 py-2 ${body} border-b ${isDark ? "border-white/5" : "border-slate-50"}`}>{children}</td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

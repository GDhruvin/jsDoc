import { CodeBlock } from '@/components/CodeBlock';

interface CodeExample {
  title: string;
  code: string;
  description?: string;
}

interface TopicPageProps {
  title: string;
  description: string;
  examples: CodeExample[];
}

export function TopicPage({ title, description, examples }: TopicPageProps) {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-100 mb-4">{title}</h1>
        <p className="text-lg text-gray-300 leading-relaxed">{description}</p>
      </div>

      <div className="space-y-8">
        {examples.map((example, index) => (
          <div key={index} className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-200">{example.title}</h2>
            {example.description && (
              <p className="text-gray-300">{example.description}</p>
            )}
            <CodeBlock code={example.code} title={example.title} />
          </div>
        ))}
      </div>
    </div>
  );
}
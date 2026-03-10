import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { MetricHighlight } from "./MetricHighlight";
import { DecisionLog } from "./DecisionLog";

const components = {
  MetricHighlight,
  DecisionLog,
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const text = typeof props.children === "string" ? props.children : "";
    const id = text
      .toLowerCase()
      .replace(/[&]/g, "and")
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9가-힣-]/g, "");
    return <h2 {...props} id={id} />;
  },
};

const options = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
  },
};

export function MdxRenderer({ source }: { source: string }) {
  return (
    <div className="prose max-w-none">
      <MDXRemote source={source} components={components} options={options} />
    </div>
  );
}

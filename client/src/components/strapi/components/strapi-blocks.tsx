import {
  BlocksRenderer,
  type BlocksContent,
} from '@strapi/blocks-react-renderer';

export function StrapiBlocks({ content }: { content: BlocksContent }) {
  if (!content) return null;
  return (
    <div className="prose-h6:heading-6 prose w-full max-w-full prose-h3:heading-3 prose-h4:heading-4 prose-h5:heading-5 prose-p:paragraph-2 prose-a:text-blue">
      <BlocksRenderer content={content} />
    </div>
  );
}

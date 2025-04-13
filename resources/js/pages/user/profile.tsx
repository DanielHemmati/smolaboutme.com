import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Content } from '@/types';

function Show({ content }: { content: Content }) {
    const editor = useEditor({
        extensions: [StarterKit],
        content: content.content,
        editable: false,
    });

    return (
        <div className="container mx-auto">
            <div className="mx-auto mt-10 max-w-[600px] ">
                {editor && <EditorContent editor={editor} />}
            </div>
        </div>
    );
}

export default Show;


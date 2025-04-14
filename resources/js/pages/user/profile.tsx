import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Content } from '@/types';

// This is where we show the content of the user
function Show({ content }: { content: Content }) {
    const editor = useEditor({
        extensions: [StarterKit],
        content: content.content,
        editable: false,
    });

    if (!editor) {
        return <div>loading</div>;
    }

    return (
        <div className="container mx-auto">
            <div className="mx-auto mt-30 max-w-[600px] ">
                <EditorContent className="text-black dark:text-[#d4d4d4] prose" editor={editor} />
            </div>
        </div>
    );
}

export default Show;


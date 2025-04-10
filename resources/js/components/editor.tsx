// src/Tiptap.tsx
import { BubbleMenu, EditorContent, FloatingMenu, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

// define your extension array
const extensions = [StarterKit];

const content = '<p>Hello World!</p>';

export default function Editor() {
    const editor = useEditor({
        extensions,
        content,
        editorProps: {
            attributes: {
                class: 'border border-red-200',
            },
        },
    });
    return (
        <>
            <EditorContent editor={editor} />
            <FloatingMenu editor={null}>This is the floating menu</FloatingMenu>
            <BubbleMenu editor={null}>This is the bubble menu</BubbleMenu>
        </>
    );
}

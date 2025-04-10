// src/Tiptap.tsx
import { BubbleMenu, EditorProvider, FloatingMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

// define your extension array
const extensions = [StarterKit];

const content = '<p>Hello World!</p>';

export default function Editor() {
    return (
        <EditorProvider
            extensions={extensions}
            content={content}
            editorProps={{
                attributes: {
                    class: 'border border-red-200',
                },
            }}
        >
            <FloatingMenu editor={null}>This is the floating menu</FloatingMenu>
            <BubbleMenu editor={null}>This is the bubble menu</BubbleMenu>
        </EditorProvider>
    );
}

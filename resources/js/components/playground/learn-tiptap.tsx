import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import { EditorProvider, useCurrentEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
// define your extension array

const MenuBar = () => {
    const { editor } = useCurrentEditor();

    if (!editor) {
        return null;
    }

    return (
        <div className="control-group mb-4 rounded-md border p-2">
            <div className="button-group flex flex-wrap gap-2">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    className={`${editor.isActive('bold') ? 'bg-gray-200 transition-colors duration-200' : ''} rounded-sm border border-gray-300 p-1`}
                >
                    Bold
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={!editor.can().chain().focus().toggleItalic().run()}
                    className={`${editor.isActive('italic') ? 'bg-gray-200 transition-colors duration-200' : ''} rounded-sm border border-gray-300 p-1`}
                >
                    Italic
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={!editor.can().chain().focus().toggleStrike().run()}
                    className={`${editor.isActive('strike') ? 'bg-gray-200 transition-colors duration-200' : ''} rounded-sm border border-gray-300 p-1`}
                >
                    Strike
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    disabled={!editor.can().chain().focus().toggleCode().run()}
                    className={`${editor.isActive('code') ? 'bg-gray-200 transition-colors duration-200' : ''} rounded-sm border border-gray-300 p-1`}
                >
                    Code
                </button>
                <button
                    onClick={() => editor.chain().focus().unsetAllMarks().run()}
                    className={`rounded-sm border border-gray-300 p-1`}
                >
                    Clear marks
                </button>
                <button
                    onClick={() => editor.chain().focus().clearNodes().run()}
                    className={`rounded-sm border border-gray-300 p-1`}
                >
                    Clear nodes
                </button>
                <button
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className={`${editor.isActive('paragraph') ? 'bg-gray-200 transition-colors duration-200' : ''} rounded-sm border border-gray-300 p-1`}
                >
                    Paragraph
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200 transition-colors duration-200' : ''} rounded-sm border border-gray-300 p-1`}
                >
                    H1
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200 transition-colors duration-200' : ''} rounded-sm border border-gray-300 p-1`}
                >
                    H2
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`${editor.isActive('heading', { level: 3 }) ? 'bg-gray-200 transition-colors duration-200' : ''} rounded-sm border border-gray-300 p-1`}
                >
                    H3
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                    className={`${editor.isActive('heading', { level: 4 }) ? 'bg-gray-200 transition-colors duration-200' : ''} rounded-sm border border-gray-300 p-1`}
                >
                    H4
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                    className={`${editor.isActive('heading', { level: 5 }) ? 'bg-gray-200 transition-colors duration-200' : ''} rounded-sm border border-gray-300 p-1`}
                >
                    H5
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                    className={`${editor.isActive('heading', { level: 6 }) ? 'bg-gray-200 transition-colors duration-200' : ''} rounded-sm border border-gray-300 p-1`}
                >
                    H6
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`${editor.isActive('bulletList')} ? 'bg-gray-200 duration-200' : ''} rounded-sm border border-gray-300 p-1 transition-colors`}
                >
                    Bullet List
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`${editor.isActive('orderedList')} ? 'bg-gray-200 duration-200' : ''} rounded-sm border border-gray-300 p-1 transition-colors`}
                >
                    Ordered List
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={`${editor.isActive('codeBlock')} ? 'bg-gray-200 duration-200' : ''} rounded-sm border border-gray-300 p-1 transition-colors`}
                >
                    Code Block
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={`${editor.isActive('blockquote')} ? 'bg-gray-200 duration-200' : ''} rounded-sm border border-gray-300 p-1 transition-colors`}
                >
                    Blockquote
                </button>
                <button
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                    className="rounded-sm border border-gray-300 p-1 transition-colors"
                >
                    Horizontal Rule
                </button>
                <button
                    onClick={() => editor.chain().focus().setHardBreak().run()}
                    className="rounded-sm border border-gray-300 p-1 transition-colors"
                >
                    Hard Break
                </button>
                <button
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().chain().focus().undo().run()}
                    className="rounded-sm border border-gray-300 p-1 transition-colors"
                >
                    Undo
                </button>
                <button
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().chain().focus().redo().run()}
                    className="rounded-sm border border-gray-300 p-1 transition-colors"
                >
                    Redo
                </button>
                <button
                    onClick={() => editor.chain().focus().setColor('#958DF1').run()}
                    className={`rounded-sm border border-gray-300 p-1 transition-colors ${editor.isActive('color', { color: '#958DF1' }) ? 'bg-gray-200' : ''}`}
                >
                    Purple
                </button>
            </div>
        </div>
    );
};

const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle, // check this
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false,
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false,
        },
    }),
];

const content = `
<h2>
  Hello wip,
</h2>
<p>
  this is a <em>basic</em> example of <strong>smolaboutme.com</strong>. I am using tiptap to create a simple text editor. Some stuff are paid i have to build them myself
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
<blockquote>
  You once told me that the human eye is God’s loneliest creation. How so much of the world passes through the pupil and still it holds nothing.
  <br />
  ~ Ocean Vuong, On Earth We're Briefly Gorgeous
</blockquote>
`;

export default function Editor() {
    return (
        <EditorProvider
            slotBefore={<MenuBar />}
            extensions={extensions}
            content={content}
            editorProps={{
                attributes: {
                    class: 'focus:outline-none',
                },
            }}
        ></EditorProvider>
    );
}


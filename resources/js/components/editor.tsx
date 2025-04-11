import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Italic, Strikethrough } from 'lucide-react';
import { useEffect, useState } from 'react';

const content = `
<h2>
  Hello wip,
</h2>
<p>
  this is a <em>basic</em> example of <strong>smolaboutme.com</strong>. I am using tiptap to create a simple text editor. Some stuff are paid i have to build them myself
</p>
<ul>
  <li>
    That's a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn't that great? And all of that is editable. But wait, there's more. Let's try a code block:
</p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
<blockquote>
  You once told me that the human eye is God's loneliest creation. How so much of the world passes through the pupil and still it holds nothing.
  <br />
  ~ Ocean Vuong, On Earth We're Briefly Gorgeous
</blockquote>
`;

export default function Editor() {
    const editor = useEditor({
        extensions: [StarterKit],
        content,
    });

    // this part make the editor editable or read only
    const [isEditable, setIsEditable] = useState(true);
    useEffect(() => {
        if (editor) {
            editor.setEditable(isEditable);
        }
    }, [editor, isEditable]);

    return (
        <>
            {/* control group */}
            <div className="border-gray-200 pb-4">
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={isEditable}
                        onChange={() => setIsEditable(!isEditable)}
                    />
                    <span>Editable</span>
                </label>
            </div>

            {editor && (
                <BubbleMenu
                    tippyOptions={{
                        duration: [100, 200], // show and hide duration
                    }}
                    editor={editor}
                    className="rounded-md bg-[#252525] p-1 shadow-lg"
                >
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            className={`${editor.isActive('bold') ? 'text-blue-500' : 'text-white'} rounded-md px-2 py-1 hover:bg-white/10`}
                        >
                            <Bold className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            className={`${editor.isActive('italic') ? 'text-blue-500' : 'text-white'} rounded-md px-2 py-1 hover:bg-white/10`}
                        >
                            <Italic className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleStrike().run()}
                            className={`${editor.isActive('strike') ? 'text-blue-500' : 'text-white'} rounded-md px-2 py-1 hover:bg-white/10`}
                        >
                            <Strikethrough className="h-4 w-4" />
                        </button>
                        {/* Add more buttons as needed */}
                    </div>
                </BubbleMenu>
            )}

            <EditorContent
                editor={editor}
                className="focus:outline-none"
            />
        </>
    );
}

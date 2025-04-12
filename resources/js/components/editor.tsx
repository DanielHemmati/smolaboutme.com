import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useForm } from '@inertiajs/react';
import Placeholder from '@tiptap/extension-placeholder';
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Italic, Strikethrough } from 'lucide-react';
import { useEffect } from 'react';

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
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: 'Write something...',
            }),
        ],
        // content: '',
        onUpdate: ({ editor }) => {
            setData('content', JSON.stringify(editor?.getJSON()));
        },
        editable: true,
    });

    useEffect(() => {
        if (editor) {
            editor.commands.focus();
        }
    }, [editor]);

    // this part make the editor editable or read only
    // const [isEditable, setIsEditable] = useState(true);
    // useEffect(() => {
    //     if (editor) {
    //         editor.setEditable(isEditable);
    //     }
    // }, [editor, isEditable]);

    const { post, processing, setData } = useForm({
        content: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (editor) {
            const jsonContent = editor?.getJSON();
            setData('content', JSON.stringify(jsonContent));
            post(route('content.store'));
        }
    };

    return (
        <>
            {editor && (
                <BubbleMenu
                    tippyOptions={{
                        duration: [100, 200], // show and hide duration
                    }}
                    editor={editor}
                    className="rounded-md p-1 shadow-lg dark:bg-[#252525]"
                >
                    <div className="flex items-center gap-2">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        onClick={() => editor.chain().focus().toggleBold().run()}
                                        className={`${editor.isActive('bold') ? 'text-blue-500' : 'text-black dark:text-white'} cursor-pointer rounded-md px-2 py-1 hover:bg-[#f2f2f3]`}
                                    >
                                        <Bold className="h-4 w-4" />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Bold</p>
                                    <span className="text-xs text-gray-500">Ctrl + B</span>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        onClick={() => editor.chain().focus().toggleItalic().run()}
                                        className={`${editor.isActive('italic') ? 'text-blue-500' : 'text-black dark:text-white'} cursor-pointer rounded-md px-2 py-1 hover:bg-[#f2f2f3]`}
                                    >
                                        <Italic className="h-4 w-4" />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Italic</p>
                                    <span className="text-xs text-gray-500">Ctrl + I</span>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                            <TooltipProvider>
                                <Tooltip>
                                <TooltipTrigger asChild>
                                                            <button
                            onClick={() => editor.chain().focus().toggleStrike().run()}
                                        className={`${editor.isActive('strike') ? 'text-blue-500' : 'text-black dark:text-white'} cursor-pointer rounded-md px-2 py-1 hover:bg-[#f2f2f3]`}
                                    >
                                        <Strikethrough className="h-4 w-4" />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                        <p>Strikethrough</p>
                                        <span className="text-xs text-gray-500">Ctrl + Shift + S</span>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                </BubbleMenu>
            )}

            {/* i am going with update and throttle */}
            <EditorContent
                editor={editor}
                className="focus:outline-none"
            />

            {/* <form
                onSubmit={handleSubmit}
                action={route('content.store')}
                method="post"
            >
                <EditorContent
                    editor={editor}
                    className="focus:outline-none"
                />


                <button
                    // className="absolute top-2 right-2 rounded-md bg-blue-500 px-4 py-2 text-white"
                    className={`absolute top-2 right-2 rounded-md bg-blue-500 px-4 py-2 text-white ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                    type="submit"
                    disabled={processing}
                >
                    save
                </button>
            </form> */}
        </>
    );
}

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useForm } from '@inertiajs/react';
import { Color } from '@tiptap/extension-color';
import Placeholder from '@tiptap/extension-placeholder';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, CodeXml, Italic, Strikethrough, Underline as UnderlineIcon, ListTodo } from 'lucide-react';
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

export default function TiptapEditor() {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: 'Write something...',
            }),
            Underline,
            Color,
            TextStyle,
            TaskList,
            TaskItem.configure({
                nested: true,
            }),
        ],
        onUpdate: ({ editor }) => {
            setData('content', JSON.stringify(editor?.getJSON()));
        },
        content,
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
                    className="rounded-md bg-white p-1 shadow-lg dark:bg-[#242425]"
                >
                    <div className="flex items-center gap-2">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        onClick={() => editor.chain().focus().toggleBold().run()}
                                        className={`${editor.isActive('bold') ? 'text-blue-500' : 'text-black dark:text-white'} cursor-pointer rounded-md px-2 py-1 hover:bg-[#f2f2f3] dark:hover:bg-[#313030]`}
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
                                        className={`${editor.isActive('italic') ? 'text-blue-500' : 'text-black dark:text-white'} cursor-pointer rounded-md px-2 py-1 hover:bg-[#f2f2f3] dark:hover:bg-[#313030]`}
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
                                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                                        className={`${editor.isActive('underline') ? 'text-blue-500' : 'text-black dark:text-white'} cursor-pointer rounded-md px-2 py-1 hover:bg-[#f2f2f3] dark:hover:bg-[#313030]`}
                                    >
                                        <UnderlineIcon className="h-4 w-4" />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Underline</p>
                                    <span className="text-xs text-gray-500">Ctrl + U</span>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        onClick={() => editor.chain().focus().toggleStrike().run()}
                                        className={`${editor.isActive('strike') ? 'text-blue-500' : 'text-black dark:text-white'} cursor-pointer rounded-md px-2 py-1 hover:bg-[#f2f2f3] dark:hover:bg-[#313030]`}
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
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        onClick={() => editor.chain().focus().toggleCode().run()}
                                        className={`${editor.isActive('code') ? 'text-blue-500' : 'text-black dark:text-white'} cursor-pointer rounded-md px-2 py-1 hover:bg-[#f2f2f3] dark:hover:bg-[#313030]`}
                                    >
                                        <CodeXml className="h-4 w-4" />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Code</p>
                                    <span className="text-xs text-gray-500">Ctrl + E</span>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        onClick={() => editor.chain().focus().toggleTaskList().run()}
                                        className={`${editor.isActive('code') ? 'text-blue-500' : 'text-black dark:text-white'} cursor-pointer rounded-md px-2 py-1 hover:bg-[#f2f2f3] dark:hover:bg-[#313030]`}
                                    >
                                        <ListTodo className="h-4 w-4" />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Task List</p>
                                    {/* TODO: shortcut is not working */}
                                    {/* <span className="text-xs text-gray-500">Ctrl + Shift + 9</span> */}
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

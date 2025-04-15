import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Content } from '@/types';
import { useForm } from '@inertiajs/react';
import { Color } from '@tiptap/extension-color';
import Placeholder from '@tiptap/extension-placeholder';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { BubbleMenu, Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { debounce } from 'lodash';
import { Bold, CodeXml, Italic, ListTodo, Strikethrough, Underline as UnderlineIcon } from 'lucide-react';
import { memo, useEffect } from 'react';


export default function TiptapEditor({ content }: { content: Content }) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: 'Write, hover over text to see options',
                emptyEditorClass: 'is-empty',
            }),
            Underline,
            Color,
            TextStyle,
            TaskList,
            TaskItem.configure({
                nested: true,
            }),
        ],
        content: content?.content,
        onUpdate: ({ editor }) => {
            deboncedUpdate(editor);
        },
        editable: true,
    });

    const deboncedUpdate = debounce((editor: Editor) => {
        const jsoncontent = editor.getJSON();
        setData('content', JSON.stringify(jsoncontent));
    }, 1000);

    useEffect(() => {
        if (editor) {
            editor.commands.focus();
        }
    }, [editor]);

    const { post, processing, setData } = useForm({
        content: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (editor) {
            post(route('content.store'), {
                onSuccess: () => {
                    window.location.reload();
                },
                onError: (error) => {
                    console.log(error);
                },
            });
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

            <TipTapEditorForm
                handleSubmit={handleSubmit}
                processing={processing}
            />
        </>
    );
}

// TODO: test this.
const TipTapEditorForm = memo(
    ({ handleSubmit, processing }: { handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void; processing: boolean }) => {
        return (
            <form
                onSubmit={handleSubmit}
                action={route('content.store')}
                method="post"
            >
                <Button
                    className={`absolute top-6 right-12 rounded-md dark:bg-white dark:text-black ${processing ? 'cursor-not-allowed opacity-50' : ''}`}
                    type="submit"
                    variant="outline"
                    disabled={processing}
                >
                    Publish
                </Button>
            </form>
        );
    },
);

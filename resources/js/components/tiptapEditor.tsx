import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Content, SharedData } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import CharacterCount from '@tiptap/extension-character-count';
import { Color } from '@tiptap/extension-color';
import Placeholder from '@tiptap/extension-placeholder';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { BubbleMenu, Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { debounce } from 'lodash';
import { Bold, CodeXml, Heading1, Heading2, Italic, ListTodo, Strikethrough, Underline as UnderlineIcon } from 'lucide-react';
import { memo, useEffect } from 'react';

const limit = 2000;

export default function TiptapEditor({ content }: { content: Content }) {
    const { auth } = usePage<SharedData>().props;

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
            CharacterCount.configure({
                limit,
            }),
        ],
        content: content?.content,
        onUpdate: ({ editor }) => {
            deboncedUpdate(editor);
        },
        editable: true,
    });

    // for showing character count
    // const percentage = editor ? Math.round((100 / limit) * editor.storage.characterCount.characters()) : 0;

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
            const jsoncontent = editor.getJSON();
            // if there is nothing in the editor, don't submit
            // there has to be a better way to do this
            if (
                jsoncontent.content &&
                jsoncontent.content.length === 1 &&
                jsoncontent.content[0].type === 'paragraph' &&
                !jsoncontent.content[0].content
            ) {
                alert('Content is required');
                return;
            }
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
                                        className={`${editor.isActive('taskList') ? 'text-blue-500' : 'text-black dark:text-white'} cursor-pointer rounded-md px-2 py-1 hover:bg-[#f2f2f3] dark:hover:bg-[#313030]`}
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
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                                        className={`${editor.isActive('heading', { level: 1 }) ? 'text-blue-500' : 'text-black dark:text-white'} cursor-pointer rounded-md px-2 py-1 hover:bg-[#f2f2f3] dark:hover:bg-[#313030]`}
                                    >
                                        <Heading1 className="h-4 w-4" />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Heading 1</p>
                                    <span className="text-xs text-gray-500">Ctrl + Shift + 1</span>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                                        className={`${editor.isActive('heading', { level: 2 }) ? 'text-blue-500' : 'text-black dark:text-white'} cursor-pointer rounded-md px-2 py-1 hover:bg-[#f2f2f3] dark:hover:bg-[#313030]`}
                                    >
                                        <Heading2 className="h-4 w-4" />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Heading 2</p>
                                    <span className="text-xs text-gray-500">Ctrl + Shift + 2</span>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <Popover>
                            <TooltipProvider>
                                <Tooltip>
                                    <PopoverTrigger asChild>
                                        <TooltipTrigger asChild>
                                            <button className={`cursor-pointer rounded-md px-2 py-1 hover:bg-[#f2f2f3] dark:hover:bg-[#313030]`}>
                                                A
                                            </button>
                                        </TooltipTrigger>
                                    </PopoverTrigger>
                                    <TooltipContent>Text color</TooltipContent>
                                    <PopoverContent className="w-[200px]">
                                        {/* <div className="grid grid-cols-3 gap-2 justify-items-center"> */}
                                        <span className="block text-left text-xs text-gray-500 ml-4 mb-1">Text colors</span>
                                        <div className="flex flex-wrap justify-center gap-4">
                                            <button
                                                onClick={() => editor.chain().focus().setColor('#000000').run()}
                                                className={`${editor.isActive('textStyle', { color: '#000000' }) ? 'text-[#000000]' : ''} h-8 w-8 cursor-pointer rounded-md border border-black px-2 py-1 hover:bg-[#f2f2f3] dark:hover:bg-[#313030]`}
                                                data-testid="setBlack"
                                            >
                                                A
                                            </button>
                                            <button
                                                onClick={() => editor.chain().focus().setColor('#958DF1').run()}
                                                className={`${editor.isActive('textStyle', { color: '#958DF1' }) ? 'text-[#958DF1]' : ''} h-8 w-8 cursor-pointer rounded-md border border-[#958DF1] px-2 py-1 hover:bg-[#f2f2f3] dark:hover:bg-[#313030]`}
                                                data-testid="setPurple"
                                            >
                                                A
                                            </button>
                                            <button
                                                onClick={() => editor.chain().focus().setColor('#F98181').run()}
                                                className={`${editor.isActive('textStyle', { color: '#F98181' }) ? 'text-[#F98181]' : ''} h-8 w-8 cursor-pointer rounded-md border border-[#F98181] px-2 py-1 hover:bg-[#f2f2f3] dark:hover:bg-[#313030]`}
                                                data-testid="setRed"
                                            >
                                                A
                                            </button>
                                            <button
                                                onClick={() => editor.chain().focus().setColor('#FBBC88').run()}
                                                className={`${editor.isActive('textStyle', { color: '#FBBC88' }) ? 'text-[#FBBC88]' : ''} h-8 w-8 cursor-pointer rounded-md border border-[#FBBC88] px-2 py-1 hover:bg-[#f2f2f3] dark:hover:bg-[#313030]`}
                                                data-testid="setOrange"
                                            >
                                                A
                                            </button>
                                            <button
                                                onClick={() => editor.chain().focus().setColor('#FAF594').run()}
                                                className={`${editor.isActive('textStyle', { color: '#FAF594' }) ? 'text-[#FAF594]' : ''} h-8 w-8 cursor-pointer rounded-md border border-[#FAF594] px-2 py-1 hover:bg-[#f2f2f3] dark:hover:bg-[#313030]`}
                                                data-testid="setYellow"
                                            >
                                                A
                                            </button>
                                            <button
                                                onClick={() => editor.chain().focus().setColor('#70CFF8').run()}
                                                className={`${editor.isActive('textStyle', { color: '#70CFF8' }) ? 'text-[#70CFF8]' : ''} h-8 w-8 cursor-pointer rounded-md border border-[#70CFF8] px-2 py-1 hover:bg-[#f2f2f3] dark:hover:bg-[#313030]`}
                                                data-testid="setBlue"
                                            >
                                                A
                                            </button>
                                            <button
                                                onClick={() => editor.chain().focus().setColor('#94FADB').run()}
                                                className={`${editor.isActive('textStyle', { color: '#94FADB' }) ? 'text-[#94FADB]' : ''} h-8 w-8 cursor-pointer rounded-md border border-[#94FADB] px-2 py-1 hover:bg-[#f2f2f3] dark:hover:bg-[#313030]`}
                                                data-testid="setTeal"
                                            >
                                                A
                                            </button>
                                            <button
                                                onClick={() => editor.chain().focus().setColor('#B9F18D').run()}
                                                className={`${editor.isActive('textStyle', { color: '#B9F18D' }) ? 'text-[#B9F18D]' : ''} h-8 w-8 cursor-pointer rounded-md border border-[#B9F18D] px-2 py-1 hover:bg-[#f2f2f3] dark:hover:bg-[#313030]`}
                                                data-testid="setGreen"
                                            >
                                                A
                                            </button>
                                            <button
                                                onClick={() => editor.chain().focus().unsetColor().run()}
                                                className={`h-8 w-8 cursor-pointer rounded-md border border-transparent px-2 py-1 hover:bg-[#f2f2f3] dark:hover:bg-[#313030]`}
                                                data-testid="unsetColor"
                                            >
                                                C
                                            </button>
                                        </div>
                                    </PopoverContent>
                                </Tooltip>
                            </TooltipProvider>
                        </Popover>
                    </div>
                </BubbleMenu>
            )}

            {/* we should all of this in Editor.tsx, for now this is good enough */}
            {editor && (
                <div
                    className={`character-count ${editor.storage.characterCount.characters() === limit ? 'character-count--warning' : ''} absolute top-2 right-[200px]`}
                >
                    {/* <svg
                        height="20"
                        width="20"
                        viewBox="0 0 20 20"
                    >
                        <circle
                            r="10"
                            cx="10"
                            cy="10"
                            fill="#e9ecef"
                        />
                        <circle
                            r="5"
                            cx="10"
                            cy="10"
                            fill="transparent"
                            stroke="currentColor"
                            strokeWidth="10"
                            strokeDasharray={`calc(${percentage} * 31.4 / 100) 31.4`}
                            transform="rotate(-90) translate(-20)"
                        />
                        <circle
                            r="6"
                            cx="10"
                            cy="10"
                            fill="white dark:fill-black"
                        />
                    </svg> */}
                    {editor.storage.characterCount.characters()} / {limit}
                    {/* <br /> */}
                    {/* {editor.storage.characterCount.words()} words */}
                </div>
            )}

            {/* i am going with update and throttle */}
            <EditorContent
                editor={editor}
                className="focus:outline-none"
            />
            {/* {errors.content && <div className="text-red-500">{errors.content}</div>} */}
            {/* TODO: i don't like that this form is position absolute in here */}
            <TipTapEditorForm
                handleSubmit={handleSubmit}
                processing={processing}
                username={auth.user.name}
            />
        </>
    );
}

// TODO: test this.
const TipTapEditorForm = memo(
    ({
        handleSubmit,
        processing,
        username,
    }: {
        handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
        processing: boolean;
        username: string;
    }) => {
        return (
            <form
                onSubmit={handleSubmit}
                action={route('content.store')}
                method="post"
            >
                <SharePopOver username={username} />
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

const SharePopOver = ({ username }: { username: string }) => {
    // const [copied, setCopied] = useState(false);

    return (
        <div className="absolute top-6 right-34">
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline">Share</Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <h4 className="leading-none font-medium">Share</h4>
                        </div>
                        <div className="flex items-center gap-4">
                            <a
                                href={route('user.profile', { username })}
                                target="_blank"
                                className="text-sm text-gray-800 dark:text-[#d4d4d4]"
                            >
                                https://smolaboutme.com/u/{username}
                            </a>
                            {/* TODO: add the copy button */}
                            {/* <CopyIcon
                                onClick={() => {
                                    navigator.clipboard.writeText(`https://smolaboutme.com/u/${username}`);
                                    setCopied(true);
                                }}
                                className={`h-4 w-4 `}
                            /> */}
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};

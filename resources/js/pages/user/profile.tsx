import { Button } from '@/components/ui/button';
import Layout from '@/layouts/layout';
import { Content, SharedData, User as UserType } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
// This is where we show the content of the user
function Show({ content, owner }: { content: Content; owner: UserType }) {
    const { auth } = usePage<SharedData>().props;

    const editor = useEditor({
        extensions: [StarterKit],
        content: content?.content,
        editable: false,
    });

    if (!editor) {
        return <div className="mx-auto mt-10 max-w-[600px] pt-20 text-black dark:text-[#d4d4d4]">loading</div>;
    }

    return (
        <Layout checkUser={owner.id === auth.user?.id} owner={owner} >
            <div className="mx-auto mt-10 max-w-[600px] pt-20 text-black dark:text-[#d4d4d4]">
                <EditorContent
                    className="prose text-black dark:text-[#d4d4d4]"
                    editor={editor}
                />
            </div>
            {owner.id === auth.user?.id && (
                <div className="absolute top-6 right-12">
                    <Button
                        variant="outline"
                        className="cursor-pointer"
                        asChild
                    >
                        <Link href={route('user.editor', { username: owner?.name })}>Edit</Link>
                    </Button>
                </div>
            )}
        </Layout>
    );
}

export default Show;

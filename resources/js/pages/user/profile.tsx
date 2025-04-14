import Layout from '@/layouts/layout';
import { Content, SharedData, User as UserType } from '@/types';
import { usePage } from '@inertiajs/react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

// This is where we show the content of the user
function Show({ content, owner }: { content: Content; owner: UserType }) {
    const { auth } = usePage<SharedData>().props;

    const editor = useEditor({
        extensions: [StarterKit],
        content: content.content,
        editable: false,
    });

    if (!editor) {
        return <div>loading</div>;
    }

    return (
        <Layout checkUser={owner.id === auth.user.id}>
            <div className="mx-auto mt-10 max-w-[600px] pt-20 text-black dark:text-[#d4d4d4]">
                <EditorContent
                    className="prose text-black dark:text-[#d4d4d4]"
                    editor={editor}
                />
            </div>
        </Layout>
    );
}

export default Show;

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useInitials } from '@/hooks/use-initials';
import { Content, SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { LogOut, User } from 'lucide-react';
import { User as UserType } from '@/types';

// This is where we show the content of the user
function Show({ content, owner }: { content: Content, owner: UserType }) {
    const { auth } = usePage<SharedData>().props;
    const getInitials = useInitials();

    const editor = useEditor({
        extensions: [StarterKit],
        content: content.content,
        editable: false,
    });

    if (!editor) {
        return <div>loading</div>;
    }

    console.log(owner);

    return (
        <div className="relative container mx-auto ">
            <Head title={`${auth.user.name} - smol page`} />
            <div className="mx-auto mt-10 max-w-[600px] pt-20 text-black dark:text-[#d4d4d4]">
                <EditorContent
                    className="prose text-black dark:text-[#d4d4d4]"
                    editor={editor}
                />
            </div>
            {/* if the owner is the same as the current user, show the dropdown menu */}
            {owner.id === auth.user.id && (
                <div className="absolute top-2 right-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Avatar className="cursor-pointer">
                            <AvatarImage src={auth.user.avatar_url} />
                            <AvatarFallback className="dark:border dark:border-white/50 dark:text-white">
                                {getInitials(auth.user.name)}
                            </AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        align="end"
                    >
                        {/* i don't know if there is a better for this or not */}
                        <DropdownMenuItem className="hover:!bg-transparent">
                            <span className="text-muted-foreground truncate text-xs select-text">{auth.user.email}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link
                                className="cursor-pointer"
                                href={route('profile.edit')}
                            >
                                <User className="mr-2 size-4" />
                                Profile
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link
                                className="w-full cursor-pointer"
                                href={route('logout')}
                                method="post"
                            >
                                <LogOut className="mr-2 size-4" />
                                Logout
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )}
        </div>
    );
}

export default Show;

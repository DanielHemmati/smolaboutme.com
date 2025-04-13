import TiptapEditor from '@/components/tiptapEditor';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useInitials } from '@/hooks/use-initials';
import { SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { LogOut, User } from 'lucide-react';

export default function EditorPage() {
    const { auth } = usePage<SharedData>().props;
    const getInitials = useInitials();

    return (
        <div className="relative container mx-auto">
            <Head title={`${auth.user.name} - smol page`} />
            {/* TODO: check if this color will effect the editor or not */}
            <div className="mx-auto mt-10 max-w-[600px] pt-20 dark:text-[#d4d4d4] text-black">
                <TiptapEditor />
            </div>
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
                                className="cursor-pointer w-full"
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
        </div>
    );
}

// const breadcrumbs: BreadcrumbItem[] = [
//     {
//         title: 'Dashboard',
//         href: '/dashboard',
//     },
// ];

// export default function Dashboard() {
//     return (
//         <AppLayout breadcrumbs={breadcrumbs}>
//             <Head title="Dashboard" />
//             <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
//                 <div className="text-center">
//                     <h1>hello from dashboard</h1>
//                 </div>
{
    /* <div className="grid auto-rows-min gap-4 md:grid-cols-3"> */
}
{
    /* later we can use this for showing how many content user has, etc */
}
{
    /* <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div> */
}
{
    /* </div> */
}
{
    /* <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div> */
}
//             </div>
//         </AppLayout>
//     );
// }

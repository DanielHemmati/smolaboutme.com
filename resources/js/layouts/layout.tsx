import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useInitials } from '@/hooks/use-initials';
import { SharedData, UserType } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { LogOut, User } from 'lucide-react';

interface LayoutProps {
    children: React.ReactNode;
    checkUser?: boolean | string;
    owner?: UserType;
}

function Layout({ children, checkUser, owner }: LayoutProps) {
    const { auth } = usePage<SharedData>().props;
    const getInitials = useInitials();

    return (
        <div className="relative container mx-auto">
            <Head title={`${owner?.name ? owner.name : auth.user.name} - smol page`} />
            <header className="flex items-center justify-between gap-4">
                <Link href={route('home')}>
                    <img
                        src="/images/logo.png"
                        alt="logo"
                        className="h-20 w-20"
                    />
                </Link>
                {checkUser && (
                    <div>
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
            </header>
            {children}
        </div>
    );
}
export default Layout;

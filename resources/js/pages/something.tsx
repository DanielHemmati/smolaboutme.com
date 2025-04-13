import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

export default function Something() {
    return (
        <div className="debug flex h-screen items-center justify-center dark:text-white">
            <HoverCard
                openDelay={0}
                closeDelay={200}
            >
                <HoverCardTrigger asChild>
                    <Button variant="outline">Hover Me</Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-56">
                    <div className="space-y-2">
                        <h4 className="font-medium">My Account</h4>
                        <div className="border-t" />
                        <div className="cursor-pointer rounded p-2 hover:bg-slate-100">Profile</div>
                        <div className="cursor-pointer rounded p-2 hover:bg-slate-100">Settings</div>
                        <div className="cursor-pointer rounded p-2 hover:bg-slate-100">Logout</div>
                    </div>
                </HoverCardContent>
            </HoverCard>
        </div>
    );
}

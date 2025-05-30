import TiptapEditor from '@/components/tiptapEditor';
import Layout from '@/layouts/layout';
import { Content } from '@/types';

export default function EditorPage({ content }: { content: Content }) {
    return (
        <Layout checkUser={true}>
            <div className="mx-auto mt-10 max-w-[600px] pt-20 text-black dark:text-[#d4d4d4]">
                <TiptapEditor content={content} />
            </div>
        </Layout>
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

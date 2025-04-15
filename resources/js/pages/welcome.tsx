import AppearanceToggleTab from '@/components/appearance-tabs';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import userContent from '@/lib/welcomeFakeData';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    return (
        <>
            <Head title="Welcome">
                <link
                    rel="preconnect"
                    href="https://fonts.bunny.net"
                />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="container mx-auto bg-[#FDFDFC] p-6 text-[#1b1b18] dark:bg-[#191919]">
                <header className="mb-6 flex w-full items-center justify-between text-sm not-has-[nav]:hidden">
                    <div className="flex items-center justify-end gap-4">
                        <Link href={route('home')}>
                            <img
                                src="/images/logo.png"
                                alt="logo"
                                className="h-20 w-20"
                            />
                        </Link>
                    </div>
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('user.editor', { username: auth.user.name })}
                                className="inline-block rounded-sm border border-purple-500 px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-purple-500 dark:text-[#EDEDEC] dark:hover:border-purple-700"
                            >
                                Editor
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-purple-500 px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-purple-700 dark:border-purple-500 dark:text-[#EDEDEC] dark:hover:border-purple-700"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-purple-500 px-5 py-1.5 text-sm leading-normal text-[#1b1b18] dark:border-purple-500 dark:text-[#EDEDEC] dark:hover:border-purple-700"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                <div className="w-full lg:grow starting:opacity-0">
                    <main>
                        <section className="py-20 text-center">
                            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Share about yourself fast with a Notion-like editor</h1>
                            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                                Create your personal page effortlessly and share it with the world.
                            </p>
                            <div className="mt-8">
                                <Link
                                    className="rounded-full bg-purple-500 px-6 py-3 font-semibold text-white hover:bg-purple-600 dark:bg-purple-700 dark:hover:bg-purple-800"
                                    href={auth.user ? route('user.editor', { username: auth.user.name }) : route('register')}
                                >
                                    Get Started
                                </Link>
                            </div>
                        </section>

                        <section className="py-20">
                            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">Real Examples</h2>
                            <p className="mb-12 text-center text-gray-600 dark:text-gray-300">
                                These are some examples of what users have written about themselves.
                            </p>
                            <div className="grid grid-cols-1 gap-8 px-6 md:grid-cols-2 lg:grid-cols-3">
                                {userContent.map(({ id, name, avatar_url, content }) => {
                                    const truncatedContent =
                                        content.length > 120
                                            ? content
                                                  .replace(/<h1.*?>.*?<\/h1>/g, '')
                                                  .replace(/\s+/g, ' ')
                                                  .slice(0, 120) + '...'
                                            : content.replace(/<h1.*?>.*?<\/h1>/g, '').replace(/\s+/g, ' ');
                                    return (
                                        <Link
                                            key={id}
                                            className="rounded-lg bg-white p-6 shadow-md transition-all duration-150 hover:shadow-xl dark:bg-neutral-800"
                                            href={route('user.profile', { username: name })}
                                        >
                                            <div className="mb-4 flex h-50 items-center justify-center rounded bg-gray-200 dark:bg-gray-700">
                                                <img
                                                    src={avatar_url}
                                                    alt={name}
                                                    className={`h-full w-full object-cover ${name === 'David Kern' ? 'object-top' : ''} ${name === 'Ana Sofia Torres' ? 'object-top' : ''}`}
                                                />
                                            </div>
                                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{name}</h3>
                                            <div className="mt-4 text-gray-600 dark:text-gray-300">
                                                <div
                                                    className="truncate whitespace-pre-wrap"
                                                    dangerouslySetInnerHTML={{ __html: truncatedContent }}
                                                />
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                            {/* TODO: create a template page */}
                            {/* <div className="mt-12 text-center">
                                <Link
                                    className="rounded-full bg-purple-500 px-6 py-3 font-semibold text-white hover:bg-purple-600 dark:bg-purple-700 dark:hover:bg-purple-800"
                                    href="#"
                                >
                                    Browse All Templates
                                </Link>
                            </div> */}
                        </section>

                        <section className="flex flex-col items-center p-8">
                            <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">Pricing</h1>
                            <div className="flex justify-center space-x-8">
                                <div className="max-w-sm overflow-hidden rounded-lg bg-white shadow-md dark:bg-neutral-800">
                                    <div className="p-6">
                                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Starter</h2>
                                        <p className="mt-2 text-gray-600 dark:text-gray-300">Get started with a simple page</p>
                                        <div className="mt-4">
                                            <span className="text-4xl font-bold text-gray-800 dark:text-white">$0</span>
                                            <span className="text-gray-600 dark:text-gray-300"> /month</span>
                                        </div>
                                        <div className="mt-6">
                                            <Link
                                                className="rounded-full bg-purple-500 px-6 py-3 font-semibold text-white hover:bg-purple-600 dark:bg-purple-700 dark:hover:bg-purple-800"
                                                href={auth.user ? route('user.editor', { username: auth.user.name }) : route('register')}
                                            >
                                                Sign up
                                            </Link>
                                        </div>
                                        <div className="mt-6">
                                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Key Features</h3>
                                            <ul className="mt-2 list-inside list-disc text-gray-600 dark:text-gray-300">
                                                <li>Notion-like editor</li>
                                                <li>2000 characters limit</li>
                                                <li>Shareable link</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="max-w-sm overflow-hidden rounded-lg bg-white shadow-md dark:bg-neutral-800">
                                    <div className="p-6">
                                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Pro</h2>
                                        <p className="mt-2 text-gray-600 dark:text-gray-300">Designed for advanced users</p>
                                        <div className="mt-4">
                                            <span className="text-4xl font-bold text-gray-800 dark:text-white">?</span>
                                            <span className="text-gray-600 dark:text-gray-300"> /month</span>
                                        </div>
                                        <div className="mt-6">
                                            <Link
                                                className="rounded-full bg-gray-500 px-6 py-3 font-semibold text-white cursor-not-allowed"
                                                href="#"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                Sign up
                                            </Link>
                                        </div>
                                        <div className="mt-6">
                                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Future Features</h3>
                                            <ul className="mt-2 list-inside list-disc text-gray-600 dark:text-gray-300">
                                                <li>Everything from Starter</li>
                                                <li>Add Domain (coming soon)</li>
                                                <li>Unlimited characters</li>
                                                <li>Customize your page (coming soon)</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <footer className="py-10">
                            <div className="container mx-auto flex flex-col items-center justify-between px-6 md:flex-row">
                                <AppearanceToggleTab className="mb-4 md:mb-0" />
                                <Link
                                    className="text-center text-gray-600 dark:text-gray-300"
                                    href="https://x.com/DaniellHemmati"
                                >
                                    Built with ❤️ by{' '}
                                    <span className="font-bold text-purple-500 underline hover:text-purple-600 dark:text-purple-400 dark:hover:text-purple-500">
                                        @DanielHemmati
                                    </span>
                                </Link>
                            </div>
                        </footer>
                    </main>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}

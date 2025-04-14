import { type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { ArrowLeft, ImageUp, Loader2 } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

// import DeleteUser from '@/components/delete-user';
import AppearanceToggleTab from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useInitials } from '@/hooks/use-initials';
import Layout from '@/layouts/layout';

type ProfileForm = {
    name: string;
    email: string;
    avatar_url: string | File | null;
};

// this is the setting page of the user
export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth } = usePage<SharedData>().props;
    const getInitials = useInitials();

    const { data, setData, post, errors, processing, recentlySuccessful, progress } = useForm<Required<ProfileForm>>({
        name: auth.user.name,
        email: auth.user.email,
        avatar_url: null,
    });

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setData('avatar_url', file);
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('profile.update'), {
            preserveScroll: true,
            forceFormData: true,
            method: 'patch',
            onFinish: () => {
                // TODO: do sth maybe
                console.log('finished');
            },
        });
    };

    return (
        <Layout checkUser={true}>
            <div className="mx-auto mt-10 max-w-[600px] pt-20">
                <Head title="Profile settings" />
                <div className="mb-6">
                    <Link
                        href={route('user.editor', { username: auth.user.name.toLowerCase() })}
                        className="group flex items-center"
                    >
                        <ArrowLeft className="mr-2 size-4 dark:text-white group-hover:dark:text-white/80" />
                        <span className="text-sm text-black dark:text-[#d4d4d4] group-hover:dark:text-white/80"> Back to Dashboard </span>
                    </Link>
                </div>

                <div className="space-y-6">
                    <HeadingSmall
                        title="Profile information"
                        description="Update your name and email address"
                    />

                    <form
                        onSubmit={submit}
                        className="flex gap-4 space-y-6"
                    >
                        {/* profile upload */}
                        <div className="flex w-1/3 flex-shrink-0 gap-4">
                            <label
                                htmlFor="avatar_url"
                                className="group relative h-24 w-24 cursor-pointer overflow-hidden rounded-full"
                            >
                                <Avatar className="h-24 w-24 overflow-hidden rounded-full">
                                    {selectedFile ? (
                                        <AvatarImage
                                            src={URL.createObjectURL(selectedFile)}
                                            className="object-cover"
                                        />
                                    ) : (
                                        <AvatarImage
                                            src={auth.user.avatar_url}
                                            className="object-cover"
                                        />
                                    )}
                                    <AvatarFallback className="dark:border dark:border-white/50 dark:text-white">
                                        {getInitials(auth.user.name)}
                                    </AvatarFallback>
                                    {/* testing */}
                                    {progress && (
                                        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black opacity-50">
                                            <Loader2 className="size-4 animate-spin" />
                                        </div>
                                    )}
                                    <div className="bg-opacity-50 absolute inset-0 flex items-center justify-center rounded-full bg-black text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                        <span className="text-sm font-medium text-white">
                                            <ImageUp className="size-4" />
                                        </span>
                                    </div>
                                </Avatar>
                            </label>
                            <Input
                                type="file"
                                id="avatar_url"
                                name="avatar_url"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </div>

                        <div className="flex w-2/3 flex-col gap-4">
                            <div className="grid gap-2">
                                <Label
                                    htmlFor="name"
                                    className="dark:text-[#d4d4d4]"
                                >
                                    Name
                                </Label>

                                <Input
                                    id="name"
                                    className="mt-1 block w-full dark:text-[#d4d4d4] placeholder:dark:text-white/30"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    autoComplete="name"
                                    placeholder="Full name"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.name}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label
                                    htmlFor="email"
                                    className="dark:text-[#d4d4d4]"
                                >
                                    Email address
                                </Label>

                                <Input
                                    id="email"
                                    type="email"
                                    className="mt-1 block w-full dark:text-[#d4d4d4] dark:placeholder:text-white/30"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                    autoComplete="email"
                                    placeholder="test@gmail.com"
                                />
                                {mustVerifyEmail && auth.user.email_verified_at === null && (
                                    <div className="mt-2">
                                        <p className="text-muted-foreground text-sm dark:text-[#d4d4d4]">
                                            Your email address is unverified.{' '}
                                            <Link
                                                href={route('verification.send')}
                                                method="post"
                                                as="button"
                                                className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:text-[#d4d4d4] dark:decoration-neutral-500"
                                            >
                                                Click here to resend the verification email.
                                            </Link>
                                        </p>

                                        {status === 'verification-link-sent' && (
                                            <div className="mt-2 text-sm font-medium text-green-600">
                                                A new verification link has been sent to your email address.
                                            </div>
                                        )}
                                    </div>
                                )}

                                <InputError
                                    className="mt-2"
                                    message={errors.email}
                                />
                            </div>

                            {/* TODO: this can be better */}
                            <div>
                                <AppearanceToggleTab />
                            </div>

                            <div className="flex items-center gap-4">
                                <Button disabled={processing}>Save</Button>

                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm text-neutral-600">Saved</p>
                                </Transition>
                            </div>
                        </div>
                    </form>
                </div>

                {/* TODO: delete user base on oauth and normal sign up stuff */}
                {/* <DeleteUser /> */}
            </div>
            {/* </div> */}
        </Layout>
    );
}

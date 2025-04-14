import GithubIcon from '@/components/icons/GithubIcons';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import Hr from '@/components/ui/Hr';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout
            title="Create an account"
            description="Register with github or email"
        >
            <Head title="Register" />
            <a
                type="submit"
                className="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md bg-purple-500 px-4 py-2 text-white shadow-xs hover:bg-purple-600 has-[>svg]:px-3"
                tabIndex={6}
                href={route('auth.github')}
            >
                {/* TODO: fix this we don't need this */}
                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                <GithubIcon />
                Register with Github
            </a>

            <Hr />

            <form
                className="flex flex-col gap-6"
                onSubmit={submit}
            >
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label
                            htmlFor="name"
                            className="dark:text-[#d4d4d4]"
                        >
                            Name
                        </Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                            placeholder="Full name"
                            className="dark:text-[#d4d4d4] dark:placeholder:text-white/30"
                        />
                        <InputError
                            message={errors.name}
                            className="mt-2"
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
                            required
                            tabIndex={2}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder="email@example.com"
                            className="dark:text-[#d4d4d4] dark:placeholder:text-white/30"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label
                            htmlFor="password"
                            className="dark:text-[#d4d4d4]"
                        >
                            Password
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={3}
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder="Password"
                            className="dark:text-[#d4d4d4] dark:placeholder:text-white/30"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label
                            htmlFor="password_confirmation"
                            className="dark:text-[#d4d4d4]"
                        >
                            Confirm password
                        </Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            required
                            tabIndex={4}
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            placeholder="Confirm password"
                            className="dark:text-[#d4d4d4] dark:placeholder:text-white/30"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <Button
                        type="submit"
                        className="mt-2 w-full bg-purple-500 hover:bg-purple-600 dark:text-white"
                        tabIndex={5}
                        disabled={processing}
                    >
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Create account
                    </Button>
                </div>

                <div className="text-muted-foreground text-center text-sm">
                    Already have an account?{' '}
                    <TextLink
                        href={route('login')}
                        tabIndex={6}
                    >
                        Log in
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}

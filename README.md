# smolaboutme.com

![smolaboutme.com](./docs/image/header.png)

The goal of this project is to create a simple and easy to use tool for creating a simple about me page, with the notion like editor experience.  

## How does it work?

The editor is powered by [tiptap](https://tiptap.dev/). Some of the tiptap extensions are free and some of them are paid.

All of the extensions which i used are free.

## Why did you made this?

Well I wanted to know how notion works and how it's built (the frontend part mostly).

## Features

Currently this feature are implemented:

- [x] Floating menu
- [x] Simple drag and drop
- [x] Bold, italic, underline, strike, code, code block, ordered list, bullet list, ...

## How to run it?

Clone the repository, install the dependencies (make sure you have docker installed) and run it.

```bash
# 1. Copy the .env.example file to .env and set the variables
cp .env.example .env

# 2. Install the dependencies
composer install
npm install

# 3. Run the docker compose
docker compose up -d

# 4. Run the migrations
php artisan migrate

# 5. Run the server
composer run dev
```

After that you can access the editor at `http://localhost:3000`

## Todo

- [ ] Add test please 😅
- [ ] User should have the ability to add their own custom domain
- [ ] Add the ability to add image (make sure images are no more than 5MB)
- [ ] add ability to add links (how do you make sure links are not malicious???)
- [ ] Add the ability to add tables
- [ ] Add the ability to add youtube 
- [ ] Add the ability to add pdf
- [ ] Add the ability to add audio



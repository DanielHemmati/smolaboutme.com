<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Content;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory()->create([
        //     'name' => 'daniel',
        //     'email' => 'daniel@gmail.com',
        //     'password' => Hash::make('1337'),
        // ]);

        $lars = User::create([
            'name' => 'Lars Steinmann',
            'email' => 'lars@gmail.com',
            'password' => Hash::make('1337'),
            'avatar_url' => 'https://assets.smolaboutme.com/avatars/lars.png',
        ]);

        Content::create([
            'user_id' => $lars->id,
            'content' => <<<HTML
            <h1>Lars Steinmann</h1><p>I'm Lars. I believe in running my own infrastructure. VPS over Vercel. Nginx over Netlify. Cron over Cloud Functions.</p><p>In an era where developers chase convenience over comprehension, I still read logs and patch kernels. I don't hate serverless—I just don't like surrendering control.</p><p>Self-hosting is not a hobby. It's a mindset.</p><strong>I deploy everything through Coolify—because real ops shouldn't require a PhD in YAML or sell your soul to a cloud monopoly.</strong><p>If your app can't survive without 12 third-party APIs and a "platform," maybe it's not your app.</p><blockquote><p>Minimalism in code. Maximum ownership in stack.</p></blockquote>
            HTML
        ]);


        $elise = User::create([
            'name' => 'Elise Navarro',
            'email' => 'elise@gmail.com',
            'password' => Hash::make('1337'),
            'avatar_url' => 'https://assets.smolaboutme.com/avatars/elise.png',
        ]);

        Content::create([
            'user_id' => $elise->id,
            'content' => <<<HTML
            <h1>Elise Navarro</h1><p>Hi, I'm Elise. I'm a <strong>web designer</strong> who sees creativity as a <em>playground</em>—and AI as the <strong>jetpack</strong>.</p><p><strong>AI-generated art</strong> isn't replacing imagination; it's <em>amplifying</em> it. I use it to prototype faster, moodboard better, and break through creative blocks. Every new model feels like <em>unlocking another layer of possibility</em>.</p><p>I'm obsessed with <strong>clean UI</strong>, <strong>fluid UX</strong>, and <em>bold ideas</em>. Big fan of <strong>Brett @ Designjoy</strong>—<em>one-man studio vibes</em>, minimal process, maximal output. That's the energy I thrive in.</p><p>If I'm not designing, I'm probably <em>remixing AI visuals</em>, diving into <strong>weird Figma hacks</strong>, or crafting <em>color palettes from satellite imagery</em>.</p><blockquote><p><strong>Creativity without friction.</strong> That's the goal.</p></blockquote>
            HTML,
        ]);

        $derek = User::create([
            'name' => 'Derek McKay',
            'email' => 'derek@gmail.com',
            'password' => Hash::make('1337'),
            'avatar_url' => 'https://assets.smolaboutme.com/avatars/derek.png',
        ]);

        Content::create([
            'user_id' => $derek->id,
            'content' => <<<HTML
            <h1>Derek McKay</h1><p>I write <strong>long-form essays</strong>—often to <em>clarify thought</em>. Writing is thinking. If I haven't written about it, I probably haven't understood it.</p><p>I host a podcast on <strong>entrepreneurship</strong>, <strong>personal growth</strong>, and the "AI stuff" I can't stop nerding out over. I believe most people don't need more productivity apps—they need <em>philosophy</em>.</p><p><strong>Hot take:</strong> Hustle culture is a symptom of existential confusion. Most people are optimizing for goals they didn't choose. I think that's tragic—and fixable.</p><p><strong>Hot take #2:</strong> The self-help industry sells clarity but profits from confusion. Read fewer books. Reread better ones.</p><p>I subscribe to axiom #405: <em>If you're the smartest person in the room, find a room with better people.</em> But also—maybe get out of the room entirely sometimes. Solitude builds signal.</p>
            HTML
        ]);

        $zara = User::create([
            'name' => 'Zara Malik',
            'email' => 'zara@gmail.com',
            'password' => Hash::make('1337'),
            'avatar_url' => 'https://assets.smolaboutme.com/avatars/zara.png',
        ]);

        Content::create([
            'user_id' => $zara->id,
            'content' => <<<HTML
            <h1>Zara Malik</h1><p>I'm Zara. I do stand-up comedy with a dark twist—because the world's already a horror show, might as well laugh during the jump scares.</p><p><strong>Governments?</strong> Love 'em. Especially when they're spying, lying, and then smiling for campaign photos. My punchlines land harder than their policies.</p><p>I say the things people <em>think</em> but won't say—like how "national security" is just code for "we're doing shady stuff but can't tell you because freedom."</p><p>People tell me I'm brave. I tell them I'm just <em>unemployable</em>.</p><blockquote><p><strong>The world's falling apart.</strong> I'm just here to roast the debris.</p></blockquote>
            HTML,
        ]);


        $david = User::create([
            'name' => 'David Kern',
            'email' => 'david@gmail.com',
            'password' => Hash::make('1337'),
            'avatar_url' => 'https://assets.smolaboutme.com/avatars/david.png',
        ]);

        Content::create([
            'user_id' => $david->id,
            'content' => <<<HTML
            <h1>David Kern</h1><p>I'm David, co-founder of <strong>Plainbeam</strong> — a product studio focused on calm software, clear thinking, and long-term trust.</p><p>I believe in writing before talking, and listening before reacting. <strong>Good writing is clear thinking made visible.</strong> Inside our company, clarity trumps speed, and strong opinions lose to better arguments.</p><p>I've seen how a single well-written message can unblock a team faster than a dozen meetings. Communication isn't just logistics — it's <em>culture</em>.</p><p>I'm proud of our small team, our slow growth, and our simple tools. We don't chase trends. We build software like it's going to last a decade — because we plan to.</p><blockquote><p><strong>Stay curious. Stay kind. Ship less, mean more.</strong></p></blockquote>
            HTML,
        ]);


        $anna = User::create([
            'name' => 'Ana Sofia Torres',
            'email' => 'anna@gmail.com',
            'password' => Hash::make('1337'),
            'avatar_url' => 'https://assets.smolaboutme.com/avatars/anna.png',
        ]);

        Content::create([
            'user_id' => $anna->id,
            'content' => <<<HTML
            <h1>Ana Sofia Torres</h1><p>Hi, I illustrate <strong>children's books</strong>—mostly stories with <em>foxes</em>, <em>umbrellas</em>, or tiny explorers with big dreams.</p><p>I believe gentle art can change the world. The quiet kind of change—the kind that helps a child feel understood, or helps a grown-up remember they once were one.</p><p>I'm lucky: I get to work in colors, daydreams, and cozy metaphors. I love sketching in cafés, listening to old French music, and mailing postcards to friends I miss.</p><p>If my work makes someone smile softly or feel just a bit lighter, that’s a day well spent.</p><blockquote><p><strong>Be kind. Be curious. Make something soft in a hard world.</strong></p></blockquote>
            HTML,
        ]);
    }
}

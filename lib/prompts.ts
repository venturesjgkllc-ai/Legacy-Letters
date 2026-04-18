import { EventType } from "@/types";

export interface Prompt {
  id: string;
  text: string;
  emotion: string;
}

export const PROMPTS: Record<EventType, Prompt[]> = {
  birthday: [
    { id: "b1", text: "Tell [Recipient] about the moment you first held them — what did you feel, and what did you whisper to yourself about who they'd become?", emotion: "tender" },
    { id: "b2", text: "What's a childhood memory of [Recipient] that still makes you smile every single time you think of it?", emotion: "joyful" },
    { id: "b3", text: "Describe the proudest moment you've ever had watching [Recipient] — what were they doing, and why did it move you so deeply?", emotion: "proud" },
    { id: "b4", text: "If you could give [Recipient] one piece of wisdom you've learned the hard way, what would it be and why?", emotion: "wise" },
    { id: "b5", text: "Tell [Recipient] about a time they surprised you — when they showed a strength, kindness, or talent you hadn't expected.", emotion: "surprised" },
    { id: "b6", text: "What does the world look like through your eyes when you imagine [Recipient]'s future? What do you hope for them most?", emotion: "hopeful" },
    { id: "b7", text: "Describe a birthday of yours from long ago — what was the world like then, and what has changed most since?", emotion: "nostalgic" },
    { id: "b8", text: "Tell [Recipient] about something you two share — a laugh, a love, a quirk — that belongs only to the two of you.", emotion: "intimate" },
    { id: "b9", text: "What's one thing you want [Recipient] to always know about how much they mean to you, even when life gets busy?", emotion: "loving" },
    { id: "b10", text: "Describe the day [Recipient] was born or came into your life — the sights, sounds, and feelings of that moment.", emotion: "wonder" },
    { id: "b11", text: "Tell [Recipient] about a challenge they overcame that you watched in awe — what did it teach you about who they are?", emotion: "admiring" },
    { id: "b12", text: "What's a family story or tradition you hope [Recipient] carries forward long after you're gone?", emotion: "legacy" },
    { id: "b13", text: "Describe [Recipient] at their very best — what are they doing, and what light do they bring to the room?", emotion: "celebratory" },
    { id: "b14", text: "Tell [Recipient] about someone in the family they remind you of — and what beautiful thing they've inherited.", emotion: "connected" },
    { id: "b15", text: "What do you love most about the person [Recipient] has become, and how have they changed you for the better?", emotion: "grateful" },
    { id: "b16", text: "Tell [Recipient] about a time you made a mistake as a parent or grandparent — and what you'd do differently.", emotion: "honest" },
    { id: "b17", text: "What's something [Recipient] has taught you — a perspective, a joy, or a way of seeing the world you didn't have before?", emotion: "humbled" },
    { id: "b18", text: "Describe your favorite ordinary moment with [Recipient] — nothing special, just the everyday magic of being together.", emotion: "present" },
    { id: "b19", text: "If you could spend one perfect day with [Recipient], where would you go and what would you want to talk about?", emotion: "longing" },
    { id: "b20", text: "What's the most important thing you want [Recipient] to remember about you — the real you, beyond any role or title?", emotion: "eternal" },
  ],
  wedding: [
    { id: "w1", text: "Tell [Recipient] about the moment you knew their partner was the right one — what gave it away?", emotion: "knowing" },
    { id: "w2", text: "Share the love story from your own marriage — what made it last, and what would you do all over again?", emotion: "wise" },
    { id: "w3", text: "What's the one piece of marriage advice you wish someone had given you on your own wedding day?", emotion: "honest" },
    { id: "w4", text: "Describe [Recipient] as a child — and tell them what the little version of themselves would think of who they've become.", emotion: "tender" },
    { id: "w5", text: "Tell [Recipient] what love really means after years of living it — not the storybook version, but the real, beautiful truth.", emotion: "real" },
    { id: "w6", text: "What do you hope [Recipient]'s marriage will look like in 25 years? What do you pray they'll still be doing together?", emotion: "hopeful" },
    { id: "w7", text: "Tell [Recipient] about a couple you've admired — what made their relationship a model worth following?", emotion: "inspired" },
    { id: "w8", text: "Share a story about a hard moment in your own relationship that ultimately brought you closer together.", emotion: "resilient" },
    { id: "w9", text: "What's something you see in [Recipient] that makes you certain they'll be an extraordinary partner?", emotion: "proud" },
    { id: "w10", text: "Tell [Recipient] about the day you realized they were truly grown — what were you feeling inside?", emotion: "bittersweet" },
    { id: "w11", text: "What does it feel like to watch someone you love so deeply choose to love someone else so deeply?", emotion: "profound" },
    { id: "w12", text: "Share your definition of a happy home — what does it look, sound, and feel like to you?", emotion: "grounded" },
    { id: "w13", text: "Tell [Recipient] about a sacrifice someone made for your family that you've never forgotten.", emotion: "grateful" },
    { id: "w14", text: "What do you most want [Recipient] to remember on the hard days — the ones that test the marriage?", emotion: "steadfast" },
    { id: "w15", text: "Describe the kind of grandparent or parent you hope [Recipient] will one day be, based on who you know them to be.", emotion: "visionary" },
    { id: "w16", text: "Tell [Recipient] what you've learned about forgiveness — and why it's the quiet secret to lasting love.", emotion: "deep" },
    { id: "w17", text: "What family values do you most hope [Recipient] carries into their new home and life together?", emotion: "legacy" },
    { id: "w18", text: "Share a memory of a wedding — yours or another's — that captured something true and beautiful about love.", emotion: "romantic" },
    { id: "w19", text: "Tell [Recipient] what you admire most about their partner, and why you feel at peace watching them together.", emotion: "welcoming" },
    { id: "w20", text: "What's the simplest, truest thing you know about love after all these years — the thing that matters most?", emotion: "essential" },
  ],
  anniversary: [
    { id: "a1", text: "Tell [Recipient] about the moment you knew this relationship was something worth fighting for.", emotion: "certain" },
    { id: "a2", text: "Describe your favorite anniversary memory — a celebration, a quiet moment, or a year that stands out.", emotion: "nostalgic" },
    { id: "a3", text: "What's the most surprising thing you've learned about [Recipient] after all these years together?", emotion: "curious" },
    { id: "a4", text: "Tell [Recipient] about a time they showed you exactly the kind of love you needed, even before you asked.", emotion: "seen" },
    { id: "a5", text: "What has your relationship taught you about yourself — something you might never have discovered alone?", emotion: "transformed" },
    { id: "a6", text: "Describe what an ordinary Tuesday with [Recipient] looks like — and why those ordinary days are anything but.", emotion: "present" },
    { id: "a7", text: "Tell [Recipient] about the hardest year in your relationship and what pulled you through it together.", emotion: "resilient" },
    { id: "a8", text: "What do you still look forward to doing together — a dream, a trip, or a simple ritual you treasure?", emotion: "hopeful" },
    { id: "a9", text: "Share what it felt like the first time you introduced [Recipient] to your family — what were you hoping they'd see?", emotion: "nervous" },
    { id: "a10", text: "Tell [Recipient] about a moment you fell in love with them all over again — years after it began.", emotion: "renewed" },
    { id: "a11", text: "What does 'growing old together' mean to you — what does that picture look like in your heart?", emotion: "eternal" },
    { id: "a12", text: "Tell [Recipient] about something small they do — a habit, a gesture, a phrase — that you secretly love.", emotion: "intimate" },
    { id: "a13", text: "What's something you never said but always meant to — something [Recipient] deserves to finally hear?", emotion: "honest" },
    { id: "a14", text: "Describe the proudest moment you've shared as a couple — something you built or overcame together.", emotion: "proud" },
    { id: "a15", text: "Tell [Recipient] about your very first date or the earliest memory you have of choosing each other.", emotion: "origin" },
    { id: "a16", text: "What's the funniest thing that's happened in your relationship — a story you'll still be telling at 90?", emotion: "joyful" },
    { id: "a17", text: "Tell [Recipient] what you would choose again — and again — if you had to do it all from the beginning.", emotion: "devoted" },
    { id: "a18", text: "What do you want [Recipient] to know about the way they've changed your life for the better?", emotion: "grateful" },
    { id: "a19", text: "Describe your vision of the next chapter together — what are you looking forward to most?", emotion: "anticipating" },
    { id: "a20", text: "What's the single most important thing that has held your relationship together through every season?", emotion: "foundational" },
  ],
  graduation: [
    { id: "g1", text: "Tell [Recipient] about the moment you realized they were going to do something truly remarkable with their life.", emotion: "proud" },
    { id: "g2", text: "What's one life lesson you learned the hard way that you want [Recipient] to carry into their next chapter?", emotion: "wise" },
    { id: "g3", text: "Describe [Recipient] as a young child — what did they love, and how does that still show up in who they are today?", emotion: "tender" },
    { id: "g4", text: "Tell [Recipient] about a failure of your own — and what it eventually taught you that success never could.", emotion: "honest" },
    { id: "g5", text: "What does the world look like to you right now, and what opportunity do you most hope [Recipient] seizes?", emotion: "visionary" },
    { id: "g6", text: "Tell [Recipient] about someone who believed in you when you doubted yourself — and what that made possible.", emotion: "grateful" },
    { id: "g7", text: "What do you hope [Recipient] never forgets about where they came from — their roots, their family, their story?", emotion: "grounded" },
    { id: "g8", text: "Describe the moment you knew [Recipient] had become their own person — independent, capable, and fully themselves.", emotion: "releasing" },
    { id: "g9", text: "Tell [Recipient] about the work that has mattered most to you — and what made it feel meaningful beyond a paycheck.", emotion: "purposeful" },
    { id: "g10", text: "What's the bravest thing you've ever done, and what would you tell [Recipient] about the courage it took?", emotion: "brave" },
    { id: "g11", text: "Tell [Recipient] about a person who changed the direction of your life — and how one relationship can shift everything.", emotion: "connected" },
    { id: "g12", text: "What do you want [Recipient] to do when they feel lost, afraid, or like they've chosen the wrong path?", emotion: "reassuring" },
    { id: "g13", text: "Describe what success really means to you — not the version the world sells, but the one that lets you sleep at night.", emotion: "authentic" },
    { id: "g14", text: "Tell [Recipient] about a time you reinvented yourself — and what that transition felt like from the inside.", emotion: "resilient" },
    { id: "g15", text: "What gift or talent do you see in [Recipient] that you want them to never, ever take for granted?", emotion: "seeing" },
    { id: "g16", text: "Tell [Recipient] about a place that shaped you — a home, a town, a school — and what it gave you that you still carry.", emotion: "rooted" },
    { id: "g17", text: "What do you know now that you desperately wish you'd known at [Recipient]'s age?", emotion: "hindsight" },
    { id: "g18", text: "Tell [Recipient] what you admire most about their generation — what gives you hope when you look at who's coming next.", emotion: "hopeful" },
    { id: "g19", text: "Describe the kind of life you hope [Recipient] builds — not the titles or achievements, but the feeling of it.", emotion: "dreaming" },
    { id: "g20", text: "What's the most important thing [Recipient] should always come back to, no matter where life takes them?", emotion: "anchoring" },
  ],
};

export function getShuffledPrompts(eventType: EventType): Prompt[] {
  const prompts = [...PROMPTS[eventType]];
  for (let i = prompts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [prompts[i], prompts[j]] = [prompts[j], prompts[i]];
  }
  return prompts;
}

export function insertRecipientName(text: string, name: string): string {
  return text.replace(/\[Recipient\]/g, name || "them");
}

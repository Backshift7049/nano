function pickOneByWeight(anObj) {
    let _keys = Object.keys(anObj)
    const sum = _keys.reduce((p, c) => p + anObj[c], 0)
    if (!Number.isFinite(sum)) {
      throw new Error("All values in object must be a numeric value")
    }
    let choose = ~~(Math.random() * sum)
    for (let i = 0, count = 0; i < _keys.length; i++) {
      count += anObj[_keys[i]]
      if (count > choose) {
        return _keys[i];
      }
    }
  }

const isType = (t) => Object.prototype.toString.call(t).slice(8, -1).toLowerCase()

class MarkovChain {
  constructor(contents, normFn = (word) => word.replace(/\.$/ig, '')) {
    this.wordBank = Object.create(null);
    this.sentence = ''
    this._normalizeFn = normFn
    this.parseBy = /(?:\.|\?|\n)/ig
    this.parse(contents);
  }
  startFn(wordList) {
    const k = Object.keys(wordList)
    const l = k.length

    return k[~~(Math.random() * l)]
  }
  endFn() {
    return this.sentence.split(' ').length > 7
  }
  process() {
    let curWord = this.startFn(this.wordBank)

    this.sentence = curWord
    while (this.wordBank[curWord] && !this.endFn()) {
      curWord = pickOneByWeight(this.wordBank[curWord])
      this.sentence += ' ' + curWord
    }
    return this.sentence
  }
  parse(text = '', parseBy = this.parseBy) {
    text.split(parseBy).forEach((lines) => {
      const words = lines.split(' ').filter((w) => w.trim() !== '')

      for (let i = 0; i < words.length - 1; i++) {
        const curWord = this._normalize(words[i])
        const nextWord = this._normalize(words[i + 1])

        if (!this.wordBank[curWord]) {
          this.wordBank[curWord] = Object.create(null);
        }
        if (!this.wordBank[curWord][nextWord]) {
          this.wordBank[curWord][nextWord] = 1
        }
        else {
          this.wordBank[curWord][nextWord] += 1
        }
      }
    })
    return this
  }
  start(fnStr) {
    const startType = isType(fnStr)

    if (startType === 'string') {
      this.startFn = () => fnStr
    }
    else if (startType === 'function') {
      this.startFn = (wordList) => fnStr(wordList)
    }
    else {
      throw new Error('Must pass a function, or string into start()')
    }
    return this
  }
  end(fnStrOrNum) {
    const endType = isType(fnStrOrNum)

    if (endType === 'function') {
      this.endFn = () => fnStrOrNum(this.sentence)
    }
    else if (endType === 'string') {
      this.endFn = () => this.sentence.split(' ').slice(-1)[0] === fnStrOrNum
    }
    else if (endType === 'number' || fnStrOrNum === undefined) {
      fnStrOrNum = fnStrOrNum || Infinity
      this.endFn = () => this.sentence.split(' ').length > fnStrOrNum
    }
    else {
      throw new Error('Must pass a function, string or number into end()')
    }
    return this
  }

  _normalize(word) {
    return this._normalizeFn(word)
  }

  normalize(fn) {
    this._normalizeFn = fn
    return this
  }

  static get VERSION() {
    return require('../package').version
  }
  static get MarkovChain() {
    // load older MarkovChain
    return require('../older/index.js').MarkovChain
  }
}



var nano = `Once upon a time Sunset Shimmer kissed Pinkie Pie.

It's just after the whole ordeal with seeing Pop Crush or whatever the hell that one band is called when Sunset Shimmer finds herself cheering with Pinkie Pie. She then kisses Pinkie Pie because she's a goddamn genius.

“I...” Sunset starts, her eyes going wide. Pinkie's staring at her, along with the entire rest of their group. “I...!” Sunset goes on, some sort of heat burning in her cheeks. She dashes away, and while she's nowhere near fast enough to actually outrun several of her friends (especially Rainbow Dash) they're all too stunned to do much of anything.

Even Pinkie's silent, which probably isn't a good thing.

I can't believe I did that...!

Why? Why did I do that? I...I was just so happy we got to see them. We got to see them, and...we got to see them together. Maybe...

Maybe that's what the big thing was. Seeing them, with her. With Pinkie Pie. And we were so close...and I was so happy...and I just...I just...!

Shaking her head and throwing tears to the wayside, she flees across the campgrounds surrounding the place for the whatever music festival. Probably Nerp Derp McFlerpenstein.

Starscroll?

She doesn't know where she's going, at first, but soon finds herself heading off in one very particular direction.

I think they drove away but...maybe they didn't? Maybe they're still there.

I don't know why I want to see them but...

Maybe they'll know how to deal with this.

She stops as her feet meet the end of the grass and hit the gravel of gravel. Also mud. This is a really good story.

She looks up and sees the Dazzlings' tour...van. Definitely not a bus. Actually it's barely even a van, let's be honest.

She knocks on the door with a fist, slamming over and over because she's not rude at all, not even a little. “Hey!”

“WHAT?!” Adagio barks, opening the door and bowling Sunset over with it.

“Ow!”

“Sunset Shimmer?” Adagio groans and rolls her eyes, then reaches a hand down. “What now? Are you after our toast after all?”

“Why'd you...? Ugh sorry, I just...can I come in? I need someone to talk to.”

“Uh,” Aria says from inside. “Just how hard did you hit her to make her think we're friends?”

“Yeah,” Sonata adds. “Like, that's like...not even I would be that wrong.”

“Yeah, not even Sonata,” Aria agrees.

“Hey! What's that supposed to mean?” Sonata says.

“Will you two shut it? ” Adagio counters. She sighs and heads back in but leaves the door open, and Sunset takes that as an invitation.

Sunset comes in and looks between the three of them, all of whom are hanging out on the makeshift couch that now exists in their van because I said it does. Adagio sighs again and motions off towards a stepstool that Sunset begrudgingly sits on.

Adagio raises an eyebrow and rests her elbow on the couch cushion mostly behind her head. “Well? I assume there's some sort of reason why you're bothering us?”

“Um...well...” Sus-net looks away, scratching the back of her neck. “I kinda...kissed Pinkie Pie.”

“Mmhm, mmhm,” Sonata nods. “Okay.”

“Uh,” Aria raises an eyebrow now. “So...was she like...passed out or something? Or like, you know. Dead?”

“What? No! We were...well, we just had such a fun time at the concert and doing all this...uh...anyway-”

“Whoah whoah,” Sonata chimes in. “Wait, doing all this what now? Were you like...you know.” She turns around on the couch and slaps her butt then whimpers into the cushion before sitting back down like a normal goddamn person. “You know?”

Adagio looks at her in confusion. “What the...?”

“Uh,” Aria says, “yeah I dunno what you're...implying here but-”

“Well you haven't actually because you're like super tense Aria but I keep hinting-”

“What?!” Aria stands. “What are you-?”

“Dense,” Adagio corrects. “She meant dense, which is ironic. And which also doesn't explain anything, but if you two could shut up for a few eternities then perhaps I'd be able to ascertain why Sunset Shimmer, of all people, would be so confused about kissing a girl she likes.”

“Wait,” Sunset says, “what do you mean me of all people? And what...?” She blushes, hard, as the rest sinks in. “And what do you mean by a girl I like? I don't...I don't...you know, girls, like that. Like-”

“Like what?” Adagio counters. “Like us? That's why you wandered over here, right? To figure out how to be the gay?”

“I..! I'm not...I mean, not that there's anything-”

“Oh please,” Adagio says, laughing. “As if anything you say could stand a chance of hurting us anyway. What I'm wondering is...are you just afraid of admitting your feelings for your friend because of some deep seated homophobia, or because you're worried you'll lose what you already have?”

“I don't have feelings for Pinkie Pie!” Sunset shouts.

“Did someone say Pinkie Pie?!” Pinkie says, busting down the crap door to the crap van.

“What?! Our door! You-” Adagio sits up, glowering, hands fisted into fists.

“Our toast!” Sonata yells, diving for the toaster.

“You idiot!” Aria shouts, diving for the Sonata.

Unfortunately, Pinkie Pie and Sunset Shimmer get caught in the crossfire. Adagio too for no reason.

Magic lights and shit burst out, making big bombad woombas and they all find themselves on the Skyrim cart with all the Skyrim peeps, their hands all bound.

“Ah, you're finally-”

“NO!” Sunset Shimmer and Adagio shout at once.

Ralof stares at them for a moment but he isn't about to let them completely escape his dialogue so he sorta continues. “...same as us, and that horse-”

“Fuck your horse!” Adagio screams. “What is this? Why?” She turns to Sunset. “Did you do this? Have you been messing with Equestrian magic?”

“And uh, not telling us?” Aria adds with a glare.

“Hey!” Sonata yells, out of her shackles. “Look! Horses!” She points to the horses at the front of the cart.

“How? How did you get out?” Aria demands. “There's no way an idiot like you could-”

“Uh, doi, they're way too small for our wrists.” Sonata holds up her giga thin arms and the other girls do the same, then slip out of their bonds.

“Well that-” Apocalypse Now starts wait no that's Sunset Shimmer, but then a big ass blue glowing fucking deer pops outta nowhere and kills the Imperials out front. It then doubles back and stomps the horses into horse pulp.

“Now's my chance!” The guy from Rorikstead says seconds before the blue glowing deer stomps him too. Ralof and Ulfric scurry away in the chaos, but all their friends die. They're not terribly bothered apparently.

The four wait five? The five girls cower before the blue glowing deer. Except Sonata, she's eating snow.

“So, beings from beyond our world,” The blue deer talks, as blue deer do. “You think you can escape the shackles of fate?”

“No!” Sonata yells out. “Just the shackles of arms, duh. Dumb blue deer.”

“Yeah, blue things tend to be dumb,” Aria agrees and Sonata looks at her bright eyed until the actual words start to sink in.

“Hey-!” She starts but Adagio cuts across her.

“What do you want? Either stomp us too and send us back or just, send us back!”

“What are you?” Sunset asks as she helps Pinkie Pie up, brushing snow off her gently and feeling max bads about how her skirt is all like ruined. Also sad she's in a skirt because holy crap it's cold.

“I am an aspect of the glorious hunter the beings here know as Hircine. And between your options, I choose...neither!” It cackles then nibbles on Sonata then Aria. Adagio tries to avoid getting gently nibbled by a giant blue deer but she can't run fast enough because snow kinda sucks like that and it totally gets her.

“Pinkie, stay back!” Sunset stands in front of Pinkie Pie but Pinkie jumps forwards with her arm exposed.

“Me next, me next!” She shouts and the deer obliges.

“No!” Sunset holds her arm out to Pinkie and the deer, not beliving how goddamn stupid these outrealmers are, bites her arm too. “Augh!” Sunset yells, though it doesn't hurt much it's just really weird to have a deer teeth you for a second or two.

“Now you will remain here on mundus until you break the curse! Enjoy your time here, outrealmers. You will never be able to hide your otherworldly nature. You must either hunt, or be hunted. Choose wisely.” The blue deer fucks off like a chucklefuck (Sunset Shimmer's words not mine) and the four start feeling weird.

“AH!” Sonata yells. “Omg guys I have a TAIL!” She jumps up and wiggles her tail at the others. Sunset adjusts her new wolf ears oh fuck.

“My ears!” Sunset shouts. She touches where her people ears would normally be but haha they're super gone. She reaches higher and feels her new anime-style wolf ears.

Yeah it's going that direction, I'm not sorry.

“Your tail is stupid and so are you,” Aria says to Sonata, standing up and wiggling her own tail. “Mine's great though.”

“Sunset!” Pinkie jumps over to Sunset Shimmer and bumps her butt with hers. “Tail buddies! Oh my GOSH can you believe we got tails and ears and everything! It's like when our pony powers activate!”

“Hey, you're right,” Sunset Shimmer says. She gently takes hold of Pinkie's hand in a platonic way she swears and tries to use her brain powers but nothing comes. Now when I say brain powers, look guys, hold on, I'm not saying she's dumb.

Okay...so sometimes she is, but aren't we all?

You know what I mean though, it's her telepathy/memory reading/pyroki- okay not that one.

You get it, right?

Anyway.

“THIS,” Adagio growls, “is ridiculosu! Why is it that whenever we see you, Sunset Shimmer, we never get to enjoy our toast in peace?”

“Well,” Sunset says back, still blushing from nothing and definitely not Pinkie's hand. “I'm not the one who installed Skyrim on my magical toaster.”

“We had a magical toaster?” Sonata asks, looking heckin sad and really cute too. I can't erase that this is Nano, I need every word I can get.

“As if it needed to be magical to have us lose it,” Aria says, sighing. “Why can't we just stop getting constantly harassed by ponies pretending to be girls and kissing girls?”

“I'm!” Sunset shouts.

“Oh,” Pinkie says. “Uh, right, um...”

“Pinkie,” Sunset says, turning, but an arrow whizzes by her head. They all turn and see a group of Imperials (okay they don't know that yet, they see a group of armored people with bows and swords charging at them).

“What?” Sunset asks. “Wait...” She looks up as a screeching cry rings out through the valley. “This means...”

“Anduin,” Adagio says with an annoyed growl. Which, Sunset realises, is a bit more...growley than usual.

Sunset turns and sees that Adagio's teeth are sharp. All of them, in fact, now have pointed teeth that fit together in an interlocking clamptrap of death. She looks down at her nails and sees that they've lengthened and sharpened themselves down to a point. “Uh, guys? What...what are we?”

Pinkie pops up next to her. “Aw, I thought you've played this? Shouldn't you know, Sunset?”

Pinkie's bright, wide eyes fill Sunset with that same rushing, excited feeling she'd felt earlier, when she'd kissed her. Sunset looks away, gulping, and lowers her hand. “Um...well, this is pretty different. That blue deer wasn't here at all, not by that town. He was way to the Southwest. And he also uh...” she glances over at the pile of dead bodies. “He didn't...kill people.”

“Still, if this is Skyrim,” Adagio starts, walking up near Sunset and Pinkie, with Sonata and Aria right behind her. “Then the fact that we've been cursed by Hircine is no laughing matter.”

“Ha!” Pinkie laughs. “What's a Hircine?”

“That blue beaver,” Sonata explains, rolling her eyes.

“That was a deer, you beaver,” Aria snaps and Sonata growls at her.

“Wait,” Sunset looks as Adagio. “You seem to know a weirdly lot amout about a video game.”

“Well I needed something to pass the time while we were figuring out what to do about, you know. Food and shelter. Those little luxuries we'd gotten so used to.”

“You stole those things by using your voices to mess with people's heads,” Sunset snaps, but calms down. “Well anyway, I'm just...surprised.”

“Happening a lot to you today, huh?” Adagio teases. “Learning about me having more hobbies than you'd expect, you, learning about Pinkie Pie being your soulmate.”

“She's-!” Sunset barks...

Sunset realizes that she's not entirely used to barking. Or growling.

“Alright,” Sunset says again, eyes wide, the surprise from her whole transformation overriding her embarrassment. For the moment. “Look, we're obviously...some kinda...I dunno, lycanthropes of some kind? Like not full werewolves but-”

“Werewolves!” Sonata says, lighting up.

“Werewolves?” Aria says, looking glum. “Couldn't we have been something cool, like vampires or uh...you know. Cool stuff.” She looks off, blushing, and Sonata grins at her.

“oooooo are you one of those vampy-wampy fan-pires?” Sonata teases, poking at Aria.

Aria dodges with a lithe grace that Sunset is pretty sure Aria never possessed before, though...perhaps it's possible. Sonata's increasingly vicious jabs, though, seem a bit new, as Sunset had never thought of Sonata as anything short of catatonically lazy.

“Uh, vampires are super popular in pop-culture, thanks,” Aria says back. “Plus, they don't get all hairy, so, major bonus.” Aria swats at one of Sonata's hands and Sonata yelps, backing off and rubbing her hand.

“Will you two idiots shut up? ” Adagio says, rubbing her forehead. She stops after a moment though, saying 'ow' under her breath, and every single one of them perks up at the scent of blood from where Adagio had cut her forehead. “Oh knock it off, we-”

“Stop right there!” The Imperials shout out. They look around at the carnage, their blank shock turning quickly into a fiery rage. “What have you-?!”

A huge roar from behind the Imperials, within the fort the group had been heading towards in their carriages, distracts the guards. Sunset, her mind in game-mode, leaps forwards and slashes at the exposed legs of one of the guards.

With this new blood, they all lose it. In moments, each girl is roaring and ripping their way through the guards, slashing through the flimsy leather of each Imperial, being stopped only slightly by the metal studs and chain meshes layered in their foes' armor. Before any of the five girls knows what's happening, before conscious thought returns, their already feasting on their fallen foes' bodies.

As their senses snap back into focus, each girl sets their meal down and tries to get away from it, their faces stuck in muted shock.

Except for Sonata's. She's still eating. Seems completely concsious and in control of her faculties. Too.

“Geeze, picky eaters, fine, more for me,” Sonata says, crushing a man's forearm in her jaws and lapping up the blood before ripping off shreds of steaming red meat.

“You're...!” Aria starts, but she's soon licking her lips and trembling. All of them are, and their eyes take on a bright, intense focus on the veritable feast before them. In moments they're back at it again, eating slower, in a much more controlled manner, speaking not at all.

Finally Sunset breaks the silence, gulping down a hunk of soldier-leg before speaking. “It's...fine. It's just a game.”

“Does it feel like a game?” Adagio asks, her face smeared with the fresh blood of their prey.

“Well then we're...in a coma. Or...you know.” Sunset hesitates to suggest what she wonders at, but Adagio, silently, stands and walks to where Sunset crouches. Sunset stands and Adagio takes her by the wrist.

“Do you feel dead, Sunset Shimmer? This pulse, this beat, getting faster as I get closer. Look into my eyes,” she says, drawing even closer. “And tell me you're dead.”

Sunset gulps, her eyes locked on Adagio's. She feels her pulse quickening, just as Adagio said, but she feels so much besides. The chill wind on her body, though she knows it should be chiller. The scent of their kill, yes, but also the scent of burning fire from where the dragon is laying waste to Helgen in the distance. She glances over and sees Pinkie Pie, her face morose as she chews sullenly but implacably on a dead man's foot, and she feels her heart lurch; pain for her friend. Pain for her friend, and nothing besides.

Pain.

Just pain.

No hope. No, because that would assume that Pinkie Pie might be able to feel the same way about her. But the odds of that...

Although, Pinkie Pie has never said anything about liking boys before. Then again, she could just like neither. But still...there might be a chance.

Sunset shakes her head to snap out of it and Adagio laughs. “We're not dead, Sunset Shimmer. Not yet. But we're clearly different. This...might not be entirely terrible.”

“We're eating dead guys,” Sunset snaps. “How is this not completely terrible?”

“Better than eating live guys?” Sonata offers and Aria glares at her. “What? You wanna put live guys in your mouth?”

“I swear to god Sonata if you say one more thing about dudes being in my mouth, I'm gonna start throwing fingers at you,” Aria shakes a severed hand at Sonata and Sonata watches it in a trance. Aria raises an eyebrow and rips a finger off, the bone snapping and her sharp nails making quick work of the tendons. She tosses the finger at Sonata and Sonata, like a puppy, snatches it out of the air with her mouth and happily munches down on it. Aria's lips go straight to fight a smile and she tosses the rest of the fingers, one by one, each in a slightly different spot that Sonata can get to but which still keeps her entertained.

“Well, it could be worse. We could be actually dead,” Adagio says, narrowing her eyes. Sunset looks down, feeling tears tug at the corners of her eyes as she considers the thought, and Adagio sighs and rests a hand on her shoulder. “Or, you know. You could be stuck somewhere, having to face your feelings for Pinkie Pie.”

“I-!” Sunset starts but this time it's Pinkie Pie that stops her, standing and coming closer.

“Sunset, um...could you not do that thing where you yell really loud and angry like about how you don't have feelings for me? It kinda hurts like, a lot. A super duper lot.” Pinkie rubs her elbow, her eyes pained as she looks up at Sunset.

Sunset feels a powerful tug at her heart and winces. “Oh, yeah...sorry.”

“Well well,” Adagio says, looking between the two. “This might get interesting. Though, we should probably find somewhere a little...better...” she looks up to the sky and the others follow her gaze, spotting the huge black dragon as it flies away into the distance. Adagio is silent for a few more moments as it passes out of sight before turning back to Sunset. “You know..if this really is Skyrim, we might have an advantage. For starters...I'm wondering if those standing stones are still down there by that river.”

“Oh, yyeah!” Sunset says, happy to have a distraction from her feelings for Pinkie pie. “We could hit those up, then head on to Riverwood.”

“Uh, and skip the mine? Do you have any idea how much money we might find there? Well, not a terribly huge amount, but more than we have. And more than these losers had,” she adds, kicking through the scattered body parts.

Sunset watches and wonders. She wonders why she feels no disgust, no shame, no terrible dread. She wonders if it's just because she might, deep down, still think it's a game, or if, instead, something deep within her has changed.

Something deep, something critical.

Who she is, and what she believes in.

Her very soul.

What she does feel, though, is a tad irritated. A tad annoyed.

That's good food she's kicking around, after all.

Shaking the thought away, but not entirely, Sunset looks up. “What exactly are you suggesting?”

“Easy. We get the standing stones, getting whatever increased experience translates to in real life...or whatever this is, and then we clear out the mine.”

“Clear out?” Susnet says, crossing her arms.

“Why, by killing everyone inside. Of course.” Adagio grins.

“So you're just fine with killing people. With killing them, and...” Sunset looks down at the mess of human body parts littering the blood-stained snow beneath and all around them. The wind picks up and Sunset can't help but smell the fresh scents of burning bodies from Helgen.

“Funny, considering I'm pretty sure you were the first one to charge them,” Adagio says, upgrading her grin to a full on smirk.

“Shutup,” Sunset growls but Pinkie pie rests her hand on Sunset's shoulder for a flash. Sunset turns, all too aware of how quickly Pinkie had withdrawn her hand.

“Um, Sunset,” Pinkie Pie starts. “I don't know what's happening, but I really, really think we should try and stick together.”

“See?” Adagio says. “Even your...dear friend there agrees.” Adagio looks back at the other two, her self-satisfied smirk fading a bit as she regards Aria teasing Sonata with a leg, holding it just out of reach then whisking it away whenever Sonata tries to jump for it. “Speaking of which, you two. Come on, we're heading out.”

“Who made you the leader?” Sonata asks, following immediately.

“Herself. I'd like a recount of the votes, personally,” Aria says, narrowing her eyes at Adagio.

Because the writer has now decided that she would like the three Dazzlings to have free reign without Sunset Shimmer and Pinkie Pie, those two get magically teleported back to the main world and the Dazzlings have no idea what happened and have no memory of Sunset Shimmer or Pinkie Pie ever having been there.

“So, the what-a stones?” Sonata says, picking some Imperial out of her teeth.

“Just come on,” Adagio says in a huff. The three set out, and Adagio is all too aware of how the chill, which before had seemed rather pleasant, is growing more biting by the second. They give Helgen a wide berth, their footfalls unusually silent.

What isn't silent, is Sonata's humming and Aria's constant annoyed sighs whenever they have to do simple things like 'climbing over a tree trunk.' Deciding that perhaps, for once, Sonata (accidentally) has a good idea, Adagio holds up a fist to stop the other two, then starts humming one of their songs. Sonata joins in shortly, and even Aria, brat that she is, can't help but join in after only a handful of moments. The three of them hum that way as they traverse the snow and underbrush in the dwindling sun, yet they can't quite make it to the standing stones before the chill starts frustratign Adagio.

“Alright, slight change of plans,” Adagio grumbles back and Aria growls.

“Great, fantastic leadership, Adagio. Are you just gonna have us do random things until we all freeze to death?” Adagio turns on her heels and grabs Aria by the scruff of her neck, pulling her close and sneering down at her. Yet after a few moments of staring intently into Aria's frightened eyes, an odd feeling comes over Adagio.

One she'd rather not deal with, quite yet.

She pushes Aria back a bit, not hard enough to make her backpedal, and rolls her eyes. “Plans change when circumstances change. Instead of just complaining about the cold, I'm deciding that we're going to do something about it.”

Aria holds her tongue, though she does fend off Sonata, who seems to be attempting to glomp onto her for warmth.

“C'mon Aria, you're hogging all the body heat,” Sonata whines. After a few seconds of being fended off by Aria, though, a change seems to come over Sonata. Adagio watches intently as Sonata's eyes go wide and she sniffs Aria, her lip trembling. Even from here Adagio can hear Sonata's heart beat faster, and Adagio must admit that hers is doing much the same.

“Alright you two,” Adagio says softly, breaking herself out of her wonderings. “We'll clear out this nest of vermin and take the hideout for ourselves.”

“Ughhhh,” Sonata groans, snapping out of the odd focus on Aria, “who cares about a hideout? I want warmth, cuddly wuddly snuggly wuzzums, you know?”

“...I defnitely don't know. But if you're looking for warmth, we'll have a nice cave, safe from the winds, and whatever bed rolls they leave behind.”

“And a fire?” Aria asks, putting an extra step of distance between herself and Sonata. Sonata, being rather incredible at reading moods, takes a step closer, and Aria sticks her fists out to her sides and growls at Sonata, forcing her to take a middling step back.

“Yes...yes I believe there were several fires, though, if memory serves...maybe only the one in the deeper chamber would be safe. Though then we'd have to deal with the possibility of wind or snow should the weather turn. Anyway, let's go. It isn't far.” Adagio thinks back to the many, many times she'd wiped out mine mine mc mine-enstein.

The fires they had in the first little section, near the bridge, after the downhill slope past the rock trap on the left-hand side...would it be safe to have a fire like that? I know if you keep one in an enclosed space you risk dying of carbon monoxide. But deeper in, there was definitely an opening into the mountain above. I distinctly recall daylight filtering down.

Alright...if we need a fire, we'll use that room. Though, we may have to secure it regardless. Honestly the first room isn't that great, and it has this obvious opening. Though I suppose-

She gets cut off as a shout comes from in front of them.

Leaning up against the wooden mine supports in front of the mine's entrance is a surly looking woman with a foul demeanor and ratty leather armor, wielding a dented and pockmarked axe. “Hey! That's far enough you three...whatever you are's...” The woman cocks her head, her eyes regarding the three teens cautiously.

Adagio admits that it's not exactly unwarranted, especially consdiering what she knows about Skyrim. The three of them are clad still in their performing attire: spikes and leather atop smooth purple silk for her; a form-fitting, short dress with assymetrical arm decorations, both bangles and gloves, for Sonata; and a polka-dotted top above tight pants for Aria, replete with a short coat of yellow feathers. All together they're a mish-mash of bright colors and vibrant designs, all of it a bit beyond a touch-too revealing for Skyrim's cold climate.

And while their skin color could link them to any number of various races, whether man, mer, or beyond, their hair colors are quite a bit beyond anything found in the normal world of the Elder Scrolls.

Assuming one doesn't use mods, that is.

“What we are, is done with you,” Adagio says, her voice dropping into a growl as she ducks low and charges. The woman brings her axe down but too slow, and Adagio dodges, slashing at the woman's Achilles tendon behind one foot as she circles around, glancing back.

Sonata and Aria had followed immediately, a fact that sends a glow of pride through Adagio; not for their skills, so much as for her leadership. Sonata leaps atop the axe-arm, which is still too slow to raise fast enough for another swipe, and as the woman tips sideways, her leg unable to keep her up after having her tendon slashed, Sonata grabs hold of the woman's wrist, holding the axe, with both hands. She giggles and twirls herself, lopping the woman's hand off and sending the axe clattering to the ground.

She lands just in time for Aria to bury her teeth in her throat and shake her about, gouging her neck apart and sending a hot gush of blood all across Aria's face. Aria holds what's left of the woman's throat in her mouth and Adagio, now back, stomps on the woman's unharmed arm, hard enough to shatter the bones within it. Sonata is grappling a leg, and licks it tenderly as the woman's dying spasms slowly fade.

Aria rises up and glances at the other two. “Not gonna lie...we're kinda awesome at this.”

“Only the most awesomest,” Sonata argues, though it's difficult to argue when you're on the same side.

“We are,” Adagio says warmly, uncharacteristic enough to make both of her fellows turn to her, eyes wide in surprise. She puts a hand on Sonata and reaches her other hand out to Aria, beckoning her closer. Aria delays for a moment, but eventually, looking away and grumbling, she comes forwards. Adagio continues, though she's keenly aware that the moment Aria's hand touches hers, she feels an intense, laser-focused desire. “We can...do whatever we must, to survive this ordeal. We've been through worse.”

“Have we?” Aria asks, her sarcasm dripping back into her voice. She idly moves her thumb along the back of Adagio's hand, and Adagio squeezes her hand back.

“W-well,” Adagio says. Her stutter makes both other girls look at her more closely, so she goes on stronger, stronger than she usually would. “Of course. I'd say that being stranded in that previous world without our magic was far worse than being here, with strength again. And there's magic in this world, too. Not Equestrian magic, but potent magic, nonetheless.”

“Do you um...” Aria starts, trying to take her hand back for a moment. Adagio doesn't let it go at first, but she does suddenly when she notices that both girls are now staring at Aria's hand being trapped by Adagio's. “Do...do you think it could help us get back to Equestria? Get back to our real forms?”

“It's very powerful. I don't see why not,” Adagio says, but while she's wearing a confident grin, she knows her voice is betraying her.

What's this thing I keep feeling, every time I touch Aria? And earlier, I could've sword something happened between Sonata nd her, too.

I'll have to watch out for this. It could be a problem, if it's something to do with our new curse.

Adagio closes her eyes for a moment and wills the line of thoguht away, then turns to the others. “C'mon, before it gets much colder. Let's-”

“Hey,” Sonata says, standing. “How come we get all weird whenever we touch Aria?”

Adagio stares back at her. “What?”

“You know,” Sonata continues, “when we touch her now it's like we get all oogle boogle in the brain-gajoodle. See, watch!” Sonata reaches towards Aria but Aria steps back, so Sonata presses the attack.

Rather than break up the fight, Adagio watches closely. Sonata goes low and Aria leaps up, grabbing one of the mine's support beams and flipping herself up atop it with an unnatural agility; certainly something to attribute to their 'curse.' Sonata squats down and makes the leap up in a single bound, and Adagio sees that her smile's gone. Her face, if anything, looks surprised, her mouth open in a little 'o,' yet her eyes are intensely staring at Aria.

The author has returned from work and decided several things.

It's going back into pseudo 3 rd omni 4 th wall breaking.

I miss Sunset Shimmer and Pinkie Pie so they're coming back and not a goddamn single person can stop me. We'll just say they were quietly thinking about their fee fees.

I don't wanna bother writing all that nonsense about them being super torn up about tearing people up so fuck that they're just gonna kill people. They might feel bad about killing innocent people or people they like but they won't give two damns about bandits.

The Dipper-ing over, Sunset Shimmer raises an eyebrow. “Uh, what're you all doing?”

Adagio turns back. “We're finding how to live, Sunset Shimmer. I'd suggest you try it sometime.”

“We're trying to figure out why we wanna press Aria up against a wall and just...moosh her,” Sonata says, still trying to catch Aria as Aria flips along the supports. It's outside by the way so if you've never seen this cave entrance this makes perfect sense. There's supports sticking out and going over this open-air like canopy of air thing going on down the entry way before you hit the door to the mine.

Pretty typical stuff, try to keep up.

Aria glares at Sonata, but her blush is pretty obvious. “Well I don't want you to 'moosh' me so back the hell off,” she spits, but not literally because that's gross.

“Both-” Adagio starts but the door to the mine opens, surprising everyone but mostly Sunset and Adagio.

“What?” Sunset exclaims. “They can leave interior cells?”

“Well obviously,” Adagio says as the two bandits stare at the ridiculous scene before them. “This isn't a game, Sunset Shimmer.”

“Awww,” Pinkie Pie says, sadly. “Wait, if it's not a game, then...” She holds her hands up and tries to do the magical sparkle power she has which, I'm gonna be honest, I've been mostly watching shorts and I kinda forgot what her actual power was other than sparkly pink magic little booms so that's what she teisesrser tries to do.

While some sparkly pink glittery sparklers do go off, mostly she just roasts the two bandits alive.

“...well that works,” Aria says, dropping down and heading towards the door.

“Wait!” Adagio yells out. “There are traps. We must proceed cautiously. As I've got the most experience-”

“Second most, at best,” Sunset says, coming up beside her. “I can't tell you how many times I've done this damn mine.”

“I have no interest in the overwhelming number of times you've done things and or people, Sunset Shimmer, unless one of those people happens to be Pinkie Pie.” Adagio grins and takes the advantage of Sunset's incensed silence to open the door and go first. The rest follow, with her goons right behind her and Sunset and Pinkie Pie bringing up the rear, side by side and hand in hand.

Heh.

“Now,” Adagio speaks, “stick to the right side. There's a trap on the left that'll-”

“W-” Pinkie starts but every single other girl is already stopping her from talking and also moving.

Well except Sonata.

She's down by the tripwire.

“Sonata no!” Adagio shouts, looking up at where the rocks are. She dives to the side and the others follow suit, which means they're now all in a pile. Sonata trips the tripwire because she's goddamn Sonata and easily sidesteps the rocks.

“Haha, wow, what a lame trap!” Sonata says, licking one of the rocks as it comes to rest gently beside her. “Not even good rock candy, wow.” She makes her way back up but find the others in a somewhat compromising position.

Sunset Shimmer is on top of Aria, her knees boxing Aria's waist in between them while her arms are pinning Aria's shoulders to the ground. Sunset's face is one of wide-eyed, trembling lipped intensity, and she seems completely absorbed in Aria's eyes. Pinkie Pie, meanwhile, has managed to get one of Aria's legs and is clamped around it, squeezing it between her thighs and keeping her eyes on Sunset, her shoulders tense.

Adagio managed to be underneath Aria. She has one leg twined around one of Aria's and both arms wrapped tightly around her waist, under her chest, and is breathing in her hair deeply, her eyes focused on Sunset and her lips pulled back in a sneer.

“Uh,” Sonata starst. “So...we doing this now, huh?”

“L-listen,” Sunset says to Aria, “I uh...I dunno...but...”

“Will you all...get off me?!” Aria shouts, but the three other girls don't seem to hear. Or they do, but instead of getting off...in that way...they hold on a little bit tighter. “I'm serious, you three are really creeping me the fuck out.”

“Does it...does it hurt?” Sunset manages, her voice wavering. Pinkie Pie tries to reach up and take hold of one of Aria's hands but Sunset growls at her and she keeps her hand away.

For a moment. She then instead (Pinkie Pie) reaches up and palms one of Sunset's cheeks. And not her facial cheek.

She touches her ass, okay.

Sunset looks back at her but doesn't mind, apparently. She gazes into Pinkie's eyes, a dim look of confusion across her face before she makes a small whimpering sound and goes back at staring at Aria.

“You...” Adagio starts. “You should get off her, Sunset Shimmer. You know what it is if you don't, right?”

“Y-yeah,” Sonata says, jamming one of Aria's feet in her crotch. “It's like, totally not a good luck for you. Ex bad girl, turned into a demon, becomes a rapist. Or...wait, maybe that actually fits, huh?” She smirks at Sunset, and Sunset's eyes go wide and her heart beats faster.

“You...the hell did you just call me?” She tries to kick back at Sonata but she only loses a bit of height, having kicked her leg back, so she flops down onto Aria more snugly.

“GET OFF!” Aria tries to wriggle free but can't, and she's blushing furiously and starting to pant. “You...you all need t-to...just...p-please.”

It's the last word that seems to snap them back into the reality of what they're doing, and Pinkie and Sonata reluctantly let go.

Sunset Shimmer starts too, but she's a little preoccupied by the fact that Adagio is still clamped onto Aria tightly. “Alright Adagio, we're letting go of Aria now. So just...”

“I'll let her go if you get off her,” Adagio counters, her glaring eyes hidden somewhat by the purple and teal hair of her friend covering most of her face. She sniff it in deeply and shudders, then nuzzles closer to Aria's neck.

“Why don't I believe you? Like, at all?” Sunset counters, squeezing her knees tighter onto Aria's waist.

“C'mon Sunset,” Pinkie Pie implores, “let's just get off her and go back to uh..not...wanting to get off her at all OH WHY DID I LET GO?!” Pinkie tries to jam herself betweeen Sunset and Aria, sitting on Aria's chest. Aria loses her breath and looks to be in pain with two girls now sitting atop her, but Sunset's a littler more concerned by the fact that she's now strangling Pinkie Pie.

“G-geez, sorry, Pinkie Pie!” Susnet stands up off of Aria and reaches down to help Pinkie Pie up, but Pinkie's now straddling Aria, pinning her down against Adagio and refusing to get up.

“Heh um...sorry! I don't know what I'm doing but uh...I'm...not gonna stop doing it...” Pinkie says, sweating. She adjusts her hips and slides her legs down so that she's laying flush against Aria, sending a full-body pulse through Aria, who almost writhes against her, her eyelids fluttering.

“What...is happening?” Sunset wonders, out loud, but Adagio is already hella pissed and rotates Aria in her grip, rushing up and throwing Pinkie Pie off of her.

“She's MINE!” Adagio roars, flexing her claws and standing between the other girls and Aria.

“I'm no ones, you bujnch of crazy hookers,” Aria hisses, standing. She falls against the wall, barely upright, trying to catch her breath.

“Are yo uokay?” Sonata asks, coming forwards. Adagio starts to turn towards her but something snaps in her brain and she stops, shrinking back and rubbing her forehead. Seeing that Adagio's not going to kill her at the moment, Sonata goes on towards Aria, though she gives her a few feet of space to breathe.

“I'm...i'm fine, now that I'm not getting gang raped by my supposed friends. And two enemies.” Aria crosses her arms across her chest and gets her back against the wall, eyeing each of the other girls warily.

“I'm...” Sonata starts, tearing up. “I didn't...I mean, that's not...”

“Aria,” Adagio says softly, holding her elbows in her hands. “I didn't...I wasn't trying to-”

Pinkie interrupts her. “I think I kinda was! Though, I wasn't thinking about it, but, looking back over what I was feeling and what I wanted to do, well...”

“What's happening to us?” Sunset asks the others. Sonata, not trusting herself to get any closer to Aria at the moment, turns towards Sunset, her face uncharacteristaclly morose wow that's a bad typo.

“We all wanna do stuff to Aria. I mean...it's not like she wasn't pretty before. Pretty annoying, ha! Also the other kind of pretty. Pretty dumb, ha!” Sonata stares for a moment, smiling, then goes on. “Also pretty beautiful. Ha.”

“What the hell?” Aria glares at her, her cheeks flushed. “Of course you'd think I'm pretty, you're like, the only one dumb enough to want me.” She smirks for a moment until the weight of the horribly depressing shit she just said sinks in.

“Wow,” Adagio says. “But besides that, Sonata's....right...” Adagio seems to have trouble saying those two words in that order, and that's pretty understandable. This is, after all, the girl who was eating snow while a bunch of pre-nuggeted chicken nuggets in Imperial armor charged them down. Or was that the blue deer? This was the girl who was eating snow when blue deer.

There we go. Flawless.

Adagio goes on, at great struggle-busing. “There's something about Aria that's drawing us to her. Making us...want her. More than usual.” The others stare at her, totally suspecting her of all sorts of lewd things, so Adagio clarifies. “I mean there's nothing wrong with wanting her, I just never really thought about her like that. I guess I always assumed she'd wind up with Sonata.”

“WHAT?!” Aria shouts/roars. “What are you...? Why would I...?”

“O-oh,” Sonata says, her derpy grin getting tight and wobbly as tears start glimmering in the corners of her eys. “Heh, yeah...you...you wouldn't want to be with someone dumb like me, huh?”

“That's...” Aria sighs, turning away for a moment before turning back, her eyes darting around at the others. “Ugh...I feel like I can't trust any of you right now. Obviously our feelings don't matter when it comes to...whatever this is. Especially since...” She looks over at Pinkie Pie.

“Oh yeah!” Pinkie says. “You were like...totally turned on when I laid down on you!”

“You!” Aria glares at her. “Shut. Up. Now!”

“She's right,” Adagio says, but she stops as she notices how hurt Sunset's looking. She grins, going on in a low, teasing voice. “Oh now...don't tell me you're jealous of Pinkie Pie getting Aria off, Sunset? I guess the question is, though...did you want to be where Pinkie Pie was, or Aria?”

Sunset's mouth works but no sound comes. So I guess her mouth doesn't work.

“Hey!” Pinkie pops up next to Sunset. “We just said that feelings don't matter about this! So clearly she wanted to be both!!” She wraps an arm around one of Sunset's and Sunset stares at her.

“P-Pinkie Pie...but...wait...” she gets her arm back. “I think-”

“I think,” Adagio cuts in. “That we should get down to that place by the water, in a bit further. There are bed rolls there, and we can start a fire. Feels like we have pretty good ventilation, though...I suppose we could clear out the rest of the bandits first. Then we can choose between the wide open main area or the smaller entryway, as our needs change.”

“Fine,” Sunset agrees. “Um..Pinkie Ppie, let's...spell your name better next time. Also let's talk about our feelings a little later, when we have a little more privacy.”

“Sure thing,” Pinkie says, softly but with her signature dazzling smile. “Though saying it out loud right in front of everyone kinda ruins a little bit of the point, but not the whole point. Also yes! Only two p's in me!”

“Heheheh,” Sonata chuckles, “pee pee.”

“Anyway,” Adagio says. “Let's clear out the rest of these bandits first before we figure out what to do about..everything.” She throws a glance at Aria and Aria glares back at her, but notds.

“Nods, that's what I did, wow. Anyway yeah, let's get this over with.” She holds her hands up and tries to make fire come out, and it works. “Heh...looks like we can all use magic, huh?”

“You're right,” Sunset says. “So if you got flames, then we should also have...” She holds her hand up in a fist and tries to pump healing energy through it, and it works. Though it feels draining in a way she's unused ot, Sunset manages to keep healing up on herself for a few moments.

“What was that?” Pinkie asks. She holds her hand out and channels healing energy out into Sunset, surprising both Sunset and Adagio.

“Wait..how'd you do that?” Sunset says.

“Impossible,” Adagio says, “you shouldn't start with magic that lets you heal others. Flames and Heal. That should be it, normally, unless you're an Alter, Dunmer, or Bosmer.”

“Breton, actually,” Sunset correct smugly. “Bosmer don't get any extra spells, being not naturally inclined towards magic.”

“That's racist,” Adagio says back.

“Yeah, racist!” Sonata agrees.

“You're all rapists,” Aria says angrily. “Let's just hurry up and kill these bandits. Seriously.”

They all head over and flick the switch. Flip, even. They flip the switch and the drawbrdige comes down. Now you're gonna hate this, but I'm going to gloss over most of what happens next.

Sonata leaps out from the place where the switch is and slashes one of the bandits (who had come across the bridge after the draw-bridge was lowered) across the throat, spinning and kicking his bleeding body off the bridge and into the water below. Aria sets the other man on fire from her spot across the way, by the lever, and the man dives down into the water to try and save himself.

This is bad for him, as Pinkie Pie feels like pretending she's a shark right now, so that's what she does. And what she does is shark stuff. Mostly the ripping and tearing variety.

With the two dead, the party cross the bridge and annihilate the guy that comes with a big ol' two hander. Pretty sure there was a guy there, but there ain't no more. They easily evade his first and only downward swipe and proceed to tear him limb from limb, their sharp claws and sharper teeth making quick work of his lightly armored body.

Aria reaches through that one window that looks in on the treasure room and grabs a dagger, then uses her bestial strength, agility, and coordination to huck it at the back of the head of the person standing useless guard outside the treasure cell (because it's totally more of a cell than a room) and that person dies. From dagger in skull.

The party rounds the corner and proceeds into the main room/cavern, darting around like xenomorphs and slashing necks and severing limbs until all that's left is a pile of bodies, dragged up to the forge.

“Well that was...ridiculous,” Sunset says, idly nibbling on a bit of bandit.

“I think we're even stronger than when we're all Rain-Boom'd out!” Pinkie exclaims, and I don't think I've used the word exclaim in any other fics. Pinkie just does that to people, yo.

“We're strong,” Adagio starts, “that's obvious. Clearly some sort of lycanthropy, though thankfully of a decidedly less hairy and unpredictable variety. Though...there is the issue of Aria. An issue we should settle, now.”

“Alright,” Aria agrees, “but can you settle it without gang raping me this time?”

“We didn't-!” Sunset starts, but thinking back, the group of them did sorta all glomp onto her and refuse to let go. “Well...we're sorry. Or I'm sorry. And Pinkie's probably sorry-”

“Are you implying,” Adagio growls, “that I wouldn't be sorry about raping my friend?”

“That's not...I'm sorry,” Sunset says, “I just didn't wanna speak for you. You're taking this way too-”

“Oh,” Sonata cuts in, “but you're fine speaking for Pinkie Pie. Is that why you kissed her? Because you wanted to? Even if you had no idea if she wanted you to kiss her?”

“I...” Sunjset wow she's a jet now but not really. She says I.

“Enough,” Adagio says. “WE're all drawn to Aria. We want her, sexually. I'm sick of dancing around this. Wwhat we have in an animalistic drive of some sort. AN instinct. So how do we deal with this?”

“I uh...” Sonata says, looking away. “I guess we just gotta...get better about it. Not touching her. If we know, then...”

“No.” Aria's voice is firm and all the others look towards her. “I...look, I don't want you freaks jumping me but...” she glances away, then back, hands on her hips. “I didn't...I didn't mind it. I mean, I don't feel that way about all of you,” she glances for a second at Sonata as she says this, “but even if I don't like like you, or whatever gross phrase you kids use these days...I still like that feeling. Probably for the same reason you all like it. Instinct, or whatever. But I don't like feeling like you're all attacking me without me having any say in it, okay?”

They all nod. Except Aria. That'd be weird.

“Okay, so,” Aria goes on, hands on her hips. “Let's...let's figure out some uh...ground rules. So...if I say no, that means no. Can't believe I'm having to clarify this to a bunch of teen girls but...got it?”

The same group that nodded before, nods again. So all except Aria. I have no idea why I'm specifying this, get off my back. Aria just said no means no, geeze.

“Alright, good. Next...so you guys were like, almost okay. But then there was this whole weird...I dunno...rivalry thing? So...figure that out.”

“I...” Adagio starts. “You're...you're right. I felt like I wanted you, yes, but the thought of Sunset Shimmer having you instead of me, or...” her eyes go wide. “It's like a hierarchy. We need to establish who has first rights to her.”

“I'm not a thing,” Aria says, glaring at Adagio. “Just to be clear? But if you idiots wanna figure out how to take turns, go ahead.”

“Turns!” Pinkie Pie says cheerily. “Hey, turns are a great idea! So, to figure out how to go first-”

“A competition,” Adagio suggests, “to see-”

“Nope!” Pinkie interrupts. “Competitions mean fights, and bad feels, and rivalries and all sorts of dumb stuff that no one wants to write fifty thousand words about!”

“...what?” Sunset asks but Pinkie pinkerrupts.

“We'll do it by chance! Let's see...” In a flash, she's ripped out a man's ribcage and shattered the rips into long, splintery, blood-soaked sickles of glistening red flesh and gleaming white tendons. Do ribs have tendons? Hell if I know.

She gets a big group of ribs in her hands, then realizing the issue in her plan she jabs them into a large bandit corpse, hiding her work from the others. Finally done, she turns around.

“Alright!” She announces. “We'll draw ribs for it!”

“Couldn't...?” Aria looks around. “Couldn't you use like...any of the huge number of sticks around?”

“Nope!” Pinkie answers.

“Me first!” Sonata says, jumping forwards and drawing a rib-sized rib. Having nothing to compare it too yet, she oo's at it. “Oh yeah, definitely the biggest. Probably a leg rib.”

“Ugh,” Adagio says, taking the next rib. Pinkie Pie and Sunset Shimmer each take one, then compare.

“Oh, heh,” Sunset says, holding up hers. “Looks like I got the biggest.”

“Okay wait,” Aria butts in. “Just to be clear...what is this for again?”

“Taking turns!” Pinkie Pie says. “With you!”

“Yeah but, does that mean,” Aria flexes her claws, “you think you're all gonna run a train on me or something?”

“Haaaa,” Sunset laughs/sighs, definitely not imagining it. “No, no! It uh...well...”

“Look,” Adagio says, sighing. She jumps up onto the railing above that overlooks the section with the forge, and flips over it onto the walkway. “Come on, all of you.”

“Fine, but only beause we're talking and not because you told me to,” Sunset mumbles, and Sonata agrees.

“Right? She always thinks she's ordering us around but we only do what she says because we wanna. Not doing it's scary because she gets mad at us. It's like, super obvious, gah.” Sonata smiles smugly and Sunset thinks very carefully about her life.

“Oh snap, it was Star swirl wasn't it? Not Starscroll, ha,” Sunset bops her forehead, taking one for the team (me).

“Starswirled, you fool,” Adagio says from on high as the three of them round the corner. “And I won't say foal, for that's more of a...pony thing. Anyway, look.” She points to the pile of bedrolls and sleeping bags. But ancient sleeping bags. Which might be what bedrolls are, don't @ me.

“Yeah, that's where the dudes we killed slept,” Sunset says snarkily.

“Well they won't need bedrolls where they're sleeping!” Pinkie Pie says cheerily, which is only slightly creepy given the circumstances.

“We'll share Aria. By day. Naturally,” Adagio says, flicking a thumb back at the sleeping rollbagsbeds, “when we sleep, whoever's day it is will sleep with Aria.”

Everyone's faces blush. I'd say go red, but skin colors being what they are...

“Hold up,” Aria says. “Look, I'm fine with cuddling and whatever, but I'm not gonna agree to just...bang, just because it's 'their turn.'”

“Of course,” Adagio agrees. “That's up to you, and for the sake of all of us, I'd hope you'd take your activities elsewhere, otherwise we might...kill each other. But as for the days, we'll just all agree that Aria...I dunno...let's...pretend they're that person's girlfriend. Everyone else will just butt out.”

“Wait,” Sunset starts, “but today's my day and it's already almost over.”

The rest glare at her and Sunset sighs, going on, “But fine, fine. IN the name of peace, I'll take a short day. Today.”

“Good,” Adagio says, “and by the order of our ribs' lengths, that means that tomorrow, Aria's going to be my girlfriend. Then Pinkie Pie's the day after, and finally Sonata's, before we start the cycle over.”

Sonata sighs. “Fine...well, guess we're saving the best for last, right? Just like my grades!”

“Getting last on every test doesn't make you the best,” Aria says. “But just so we're clear, this whole...girlfriend thing. I'm not actually any of your girlfriends. This is just to shutup whatever these weird instincts are, got it?”

The rest nod.

“Good. So-” she yawns, then covers her mouth, her eyes going wide. She sighs, rolling her eyes, and motions back towards the bedrolls. “Well...I guess we're gonna probably start...heading to bed now, huh?”

Adagio looks up and around the cave. Now protected from the wind, the chill is more than bearable, and the addition of the fur-lined bedrolls is certainly an attractive thing that should help greatly against whatever cold might linger after doffing their clothes. Not all of their clothes. Just most. Is doffing the right word? Well I can't change it, so it is now.

“A-alright, well,” Sunset stammers, standing next to Aria and trying very hard not to start touching her. That's a sentence.

Aria sighs. The others are already slipping into their bedrolls, oddly at ease, despite their earlier rapey attempts at getting Aria. Sunset thinks it could be because it really is a sort of rivalry thing, and with the winner currently set and accepted, the others are able to relax.

Aria just thinks this is all ridiculous and she'll be lucky if she leaves this cave without getting stuffed full of everyone's fingers.

“C'mon,” Aria whispers, scowling, but she can't help but feel a rush of excitement. She slips into a bedroll and pats the spot next to her, and Sunset almost trips over herself as she practically leaps onto it. Aria chuckles and pulls the flap of the bedroll over them. Next to her, Sunset's tense and still, like a vibrating...vibrator. No, not that.

Alright, like a vibrator. No take-back-sies.

“Look,” Aria murmurs. “We can snuggle alright? Just...if I tell you to stop something, you gotta stop. Got it?”

Sunset nods vigorously then slowly reaches an arm out, under the covers. She touches Aria's bare shoulder, drawing a little tiny moan from Aria, who reaches out and takes the collar of Sunset's T-shirt.

“Dumbass, hold me,” Aria mumbles, and Sunset schooches closer.

Sunset wraps her arm up under Aria's, landing on her back. She moves herself closer, and closer, and soon she finds herself rolling onto Aria's chest with her own. “Oh, sorry, I'll-”

“Wait,” Aria says back. “Um...you can like...be on top of me, if you want.”

Sunset stares, afraid that if she says anything she'll make Aria take it back. She rolls the rest of the way onto Aria then shifts her legs, straddling Aria's hips. “You're...you're sure?”

“Well,” Aria shifts a bit, then bites her lip and touches her forehead to Sunset's. “Y-yeah, just like...don't start trying to finger me or anything yet. Erm...I mean, not that...”

“Yeah, I won't,” Sunset assures her, though the thought of it is ungodly levels of arousing. Sunset rolls her hips reflexively and Aria gasps, her arms grabbing hold of Sunset's waist. “Oh!” Sunset goes, lifting up for a moment. “Sorry-!”

“Don't stop,” Aria says back. “Just...look, I dunno what this all is. I'd definitely never...you know. With you.”

“Yeah, the feeling's mutual,” Sunset mutters back, though with how she feels right now, she isn't completely sure.

“But, that said...” Aria goes on. “Maybe...let's go off a bit, like they suggested.”

Again, Sunset says nothing, afraid to spur a sudden take-back from Aria. At great effort (though, fantastically, not as great an effort as it was when everyone else was also clamped onto Aria) Sunset lifts herself off and rolls out of the bedroll. The two carry the bedroll to the treasure room, setting it down beneath the completely unopened treasure chest.

“Oh...” Sunset takes out the key she looted retroactively via retcons and opens the chest. They peek in and see a multi-faceted, white gem-like crystal/stone.

Sunset slams the chest shut and locks it.

“Yeah not touching that,” she says to the confused Aria. “Anyway...shall we?”

“Yeah,” Aria agrees with a warm smile that sends a maddening flutter through Sunset. “C'mon.”

They get back into the bedroll and Sunset mounts Aria again. This time, she lowers her hips straight down to Aria's and grinds herself against her, drawing a moan from Aria and a crazed rush of want from Sunset's entire being.

Sunset pins Aria's shoulders to the ground (this time without Adagio underneath) and growls low, though it's an odd sound; almost a whimper. She presses her forehead to Aria's as her hips start pulsing against Aria's, a rising, rushing feeling starting to fill her mind with blankness.

“W-wait,” Aria says and Sunset stops, though she doesn't let Aria up at all. “Uh...let's kinda...you know. Get...naked or whatever.” Her voice cracks at the last bit and something seems to crack inside Sunset.

Sunset cautiously gets up and stands, then, with great, methodical care, she starts, piece by piece, taking off the rest of the clothes.

“You okay?” Aria asks, a mocking laugh in her tone.

“I...am going...slow...so I don't...shred...my clothes...in my...excitement...” Sunset carefully says as she drops her panties and balls them up, keeping them with her more visible clothes, nearby.

“Ah,” Aria says back, too overcome with her own desire to manage much snark. Now naked, she lies in the bedroll, it's flap wide open.

If bedrolls don't have flaps, this is going to be a very frustrating read for people more used to bedrolls.

“Oh holy...” Sunset's voice goes faint as she approaches unevenly, her body stiff with nervousness.

“Uh...is this your first time?” Aria asks with a smirk.

“Yeah? Isn't it...I mean. No. Definitely not my first time.”

“If you're not honest I'll take it ba-”

“OH GOD it's my first time okay please just...you're...god these instincts are weird,” Sunset says, massaging her wolfey baby ears.


“What's that mean? Oh, right. You're all like, 'ew, I'm not teh gay.'” Aria laughs. “Funny, considering how excited you are to fuck.”

“Whoah um...”

“...are...is it because I said fuck?” Aria stares at Sunset, wondering, for just a moment, if Sunset's seriously this new to the whole sex thing.

Sunset definitely is, but she's not about to make that obvious. More obvious. “Well...I guess I'm just kinda surprised. Never really heard you curse.”

“Yeah, well it's kinda fun messing with you,” Aria snickers. “But c'mon, seriously. Get in.”

“Yeah. Okay.” Sunset, taking tiny steps, slips under the covers next to Aria. Sunset's body twitches, anticipation coursing through it, as Aria folds the flap back over them.

Aria smirks at her for a few moments before gulping and nodding. “Okay, come on. Gonna need you a little closer.”

“Yeah. Okay.” Sunset, her voice wavering more with every letter, syllables be damned, gets a little closer. She reaches an arm out and touches Aria, sending what feels like a spark of want through her, throwing her heartrate up. Her ears perk up and her tail swishes, and she hears Aria's breath quicken just a tad. But after a few moments of laying there awkwardly with a single arm on Aria's shoulder, Aria raises an eyebrow.

“Uh. Yeah. Little closer.”

“Sure. Yeah, okay.” Sunset gulps and slides closer, her hand tensing and slipping down Aria's arm. Sunset slips her hand under Aria's arm and lays it on her side, and both girls let out a little gasp at the contact.

“W-whoah...alright...” Aria murmurs, though Sunset isn't sure if it's to her or not. It isn't, but it's nice to hear anyway. Having Aria a bit off balance seems to excite Sunset more than she was expecting, and Aria, for some bizarre reason she can't place yet, seems to enjoy being toyed with by Sunset.

Sunset gets even closer, and closer, until finally she feels her knees knock gently against Aria's. Aria lets out a heavy breath and wriggles, then gives an exasperated sigh.

“Alright, Sunset Shimmer, uh...yeah this isn't working.”

“W-what? But...I mean I just started and-”

Aria kisses her gently and Sunset Shimmer shuts right the fuck up. “Get on top of me.”

“Oh. Okay.” As Aria lays down flat, Sunset slowly slips on top of her, boxing her hips in-between Sunset's knees. F/F gets fun with the pronouns, hang in there. Epithets can fuck right off.

Speaking of fucking, Sunset presses her forehead to (wait is that really how you spell forehead? No way) Aria's, looking deep into her eyes; eyes which, Sunset realizes, she probaby shouldn't be able to see.

“Uh, Aria...? Can we see in the dark?”

“I dunno, kinda, you wanna fuck me or talk about our wolf girl powers?”

Sunset looks back at her tail. “Are we wolf girls, or fox girls?”

Aria looks down at her own tail. “Well...alright, probably fox girls. Whatever, that's fine. So...?”

“Right, right, f....making love.”

“Oh god. Uh...I dunno if I can go through with it if you call it that,” Aria grimaces, saying. With a grimace.

“Okay...we're...we're gonna f-fuck,” Sunset stammers, then grins. She feels an intense desire pulsing through her, and a growl grows deep within her throat. She puts her hands on Aria's bare shoulders, pushing her against the bedroll, pinning her against it and the stone below, and Aria moans.

“Oh shit...okay...okay this is...a lot better,” Aria says, breathless, as the author remembers how to bold and or italicize.

“Hate that fourth wall crap,” Sunset mutters, “Um, so...” Giving words up, Sunset presses her lips hard against Aria, who starts to wrap her arms around Sunset's waist before halting suddenly and going tense. Sunset blinks, lifting her face up and looking down curiously into Aria's pained eyes. “What's wrong?”

“I...I dunno,” Aria says, holding her hands in front of her chest. “Oh...oh wait...” She holds her hands together and seems to curl up slightly, hunching down underneath Sunset. “Okay...okay so this is...way better. It was weird, I like...was gonna hold you and then I just got...turned way off all of a sudden, but now...I dunno.” She looks up at Sunset, then down, her eyes following down and down, then up again into Sunset's eyes. “Hey...could you like...squeeze me?”

“...huh?”

“Just...” Aria wriggles. “Just like, get your arms under me and fucking...I dunno, crush me. A little.”

“Um...” Sunset gives a mental shrug, unable to do the physical version, and slowly wraps her arms up under Aria, holding her close, her forehead pressing against Aria's for a moment before she cradles Aria to her chest.

Aria squeaks and mewls, her hips suddenly working, bucking against the air, towards Sunset. “Oh holy...okay...okay Sunset...just...fucking squeeze the fuck out of me, holy shit.”

Sunset holds her tight, then tighter, her chin resting on the field of Aria's purple, teal-streaked hair, wondering how the hell Aria gets it so soft as she breathes in the light, sweet fragrance.

“Oh god...” Aria whimpers. “Um...could...your legs, could you like...get one between mine or something?”

“Huh? Oh, sure,” Sunset says faintly. She lowers herself down against Aria and adjusts so one of her legs is between Aria's.

Aria clamps Sunset's leg between hers and rolls her hips against it hungrily, and Sunset feels the blazing wetness of Aria's passion slide against her.

“Whoah...uh, do you need my fingers or-?” Sunset starts but Aria whines.

“No, I mean maybe, I dunno, holy fuck...it's...” She pulses her hips against Sunset again and moans loud, the sound echoing through the stone walls of the mine. “It's not usually...I mean it's not like it's hard but...I usually don't, so fast, from just this...I dunno holy shit...”

“Um, good. Cool, heh. I guess I'm uh-” Sunset feels one of Aria's thighs hit her right in the sweet spot (which, at this point in Sunset's arousal, is just about anywhere) and Sunset huffs loud, squeezing her eyes shut. “Oh c-crap um...hey, Aria...I need one of your legs.”

“Huh? Yeah sure take one, whatever,” Aria, her eyes closed in concentration, adjusts slightly and gives Sunset a good bit of tight thigh to rub against.

“Okay, so now I just um...”

“Pretend I'm a drier, whatever. Come on, don't tell me you never found the armrest of a couch.”

“...the heck?”

Aria groans and starts to move her leg up against Sunset before stopping suddenly, that same grimace across her face as before. “Huh...alright,” she says, narrowing her eyes. “I think I see a pattern. Okay Sunset, just uh...you know, rub yourself against my leg or wherever. But...be kinda forceful about it, alright? Don't just fuck yourself with me. Fuck me. ”

Sunset can't mutter anything back, having been given such a dire/wonderous edict. She grinds herself hard against Aria, unsure what pleasure she could possibly derive from it, but she almost instantly loses her grasp on the world around her from the overwhelming rush that sparks through her, like the warm, maddening tang of blood, fresh from a kill.

Sunset's thinking maybe she's losing it, but at least she's getting laid.

Sunset growls and starts sliding herself against Aria's writhing body more vigorously, her arms clamping tight around Aria and holding her flush against her. Aria's arms, up between them, are crushed (not literally) between their breasts, and Sunset's filled with a crazed desire to start nibbling on Aria's skull. She settles for nuzzling down and getting her lips pressed against Aria's in a passionate kiss, yet she yelps when her tongue gets poked by one of Aria's sharp fangs.

“Shit, sorry,” Aria whispers.

In response, Sunset lets out a low growl and Aria stares at her, gulping but working her hips harder against Sunset, her leg between Sunset's cautiously inviting Sunset back into fucking it with little, gentle motions.

Sunset straight up licks Aria's cheek, and both girls have to admit they loved it. Sunset licks her again, a light, little lick, and Aria lets out a little whine, her lips trembling, her eyes begging for more. Sunset licks straight across Aria's lips, hard and slow, her tongue dragging across, daring Aria to open her mouth and let her in, daring Aria to bite her again.

Aria keeps her lips sealed tight. When Sunset stops the lick, she nuzzles into Aria's chest, licking at her breasts with quick, darting strokes.

Sunset moans, finally losing herself, and Aria prepares herself to get fucked, hoping it's as hard as she wants.

Sunset adjusts again, but before she starts grinding, Aria has an idea. And it's definitely not because the author had to lie down for a bit and came up with something.

“Hey S-Sunset...could...could we try like...touching them together?”

“...what?”

“God-fucking-damnit just touch my pussy with your pussy okay?” Aria huffs and Sunset raises an eyebrow but lifts herself slightly and lets Aria spread her legs.

Not sure what this'll accomplish beyond just frustrating them beyond all belief until they finally end up finger-fucking each other, Sunset Shimmer, still clutching Aria's upper body against herself tightly, with her chin mashing down into Aria's hair, lowers herself onto Aria's spread, open self.

What they both expect is a powerful warmth and tantalizing, teasing friction. What they get instead, as Sunset's deep, blustering warmth meets Aria's, is hip-bucking ecstasy.

Sunset nearly roars into the cave, clenching her teeth tight and her lips tighter as the blazing wetness of their pussies touch. She grinds herself furiously against Aria and Aria thrusts her body up, again and again, her stomach clenching and uncleching as she hurtles into a mind-blanking orgasms, little whimpers escaping her at first, followed soon by deep moans and finally long, low whines as Sunset slams herself down again and again, grinding herself harder, harder, harder against Aria's bucking, writhing self.

They ride the crest of orgasm up, then up again, letting it ebb only slightly and only from lack of breath before pressing themselves against each other again, their hips drenched in each other, the bedroll ruined but fuck the bedroll and its maybe extant flap. Sunset sniffs deep and catches the smell of them, the sweat, the bleeding makeup, and that deep, vulnerable scent of their pleasure as they rub it and slap it and grind it against each other, painting one another, marking one another, and Sunset comes up with an idea then, a little thing she wants, for some reason, to say, so badly.

She squeezes Aria tight as their hips work against each other, their pussies kissing deep in the bedroll, and warmth and wetness and wild abandon, and she growls, over the din of their pulsing bodies, “You're mine.”

Aria whines loud, her body nearly thrashing itself against Sunset's, desperate, so desperate for every second of contact, so wanting from every moment apart, craving the closeness, craving the heat, the friction, the everything. She bucks wildly, her eyelids fluttering as she ascends to a new, delirious height, her breath hitching and her whole body tensing from the sheer massivness of this new pleasure.

It takes time for her to come down off it, but Sunset's more than happy to squeeze her tight and lick at her ears while she comes back down. Once she's over the hump of it, Aria nuzzles herself against Sunset's breasts and hums.

“W-well...that was...huh,” Aria chuckles, her warm breath sending new shudders down Sunset's body. “That...wasn't bad, for your first time.”

“Not bad, huh?” Sunset laughs. She's quiet for a bit, then speaks again, softly. “Is it...always like that.”

“God no,” Aria says immediately, then laughs at herself. “Wow, I mean...sorry to everyone that came before, pun intended, but...that was...something else.” She sighs and nuzzles deeper, keeping her arms close to herself, all the easier for Sunset to hug her tight, like a warm little bundle of blankets. “For one thing, I usually don't get off from just that. I mean...not like, as fast, without something else going on.”

“Ah,” Sunset says, giving her hips another pulse and drawing a little gasp from Aria. “Yeah, um...I mean...I heard of like...scissoring before, but-”

“Oh god,” Aria says with a laugh. “So much work. I figured we'd get there from just what we were doing, but touching 'em like that usually won't. For me, at least. Fucking Sonata will get off from just about anything.”

“Uh...did...?”

Aria tenses up for a moment in Sunset's arms but then sighs, shaking her head. “I mean, yeah. Spend a few forevers with someone and you're bound to experiment. Even before we came here. Well, not here, but, you know. People land. Plus, I've never seen anyone else like us. No other sirens, so, you know...”

“Huh,” Sunset says, wondering, for just a moment, if they could get each other pregnant.

But pregnancies not a big turn-on for Sunset, or the author, so those thoughts just go away conveniently.

“So,” Sunset goes on. “Are the three of you like...together?”

“No,” Aria says quickly, then sighs. “I mean...you know. We've just fooled around a bunch, I guess. We've...always been there for each other. And for a long time, we didn't have anyone else. Still don't, most days.” She's quiet for a moment and Sunset lets the moment go, and soon, Aria continues. “I guess I wouldn't be against being with them, like that. Or...” She shakes her head and presses herself against Sunset. “Guh...I don't wanna follow up the biggest O of my life with deep thinking, Sunset Shimmer.”

“No problem.” Sunset chuckles into Aria's hair. “I mean, after all. Right now...you're mine.”

“F-fuck,” Aria squeals, her hips bucking again. Amazingly, she twitches and writhes in another mini orgasm. It dies down and she sniffles, sending a jolt through Sunset.

“Whoah, wait, you okay?”

“Yeah, yeah, just...fuck that was good,” Aria sucks in a shuddering breath through trembling lips and smooshes her cheek against Sunset's chest. “These instincts are...weird. But I think I'm figuring them out. As long as you just like...take charge, it feels...it feels pretty good. Pretty very fucking good.”

“You...curse a lot in bed,” Sunset says with a giggle.

Aria wriggles and turns her head up, pouting. “Yeah, well you kinda make me wanna curse a lot, Sunset Shimmer. So...there.”

“You got me,” Sunset says but Aria's lips pull back in disgust so she amends it. “Actually, nah. I got you. After all,” Sunset grins, going on, “you're mine. ”

“Fffff-!” Aria's stomach clenches and she buries her face back in Sunset's chest. Sunset isn't sure if Aria came—Aria didn't, but damn she came close...heh—but she's pretty sure that those words have a bit of a special effect on Aria.

“Hey,” Sunset says as Aria calms down. “So...should we...sleep like this?” She glances down at their pressed-together pussies, and while it feels nice to hold Aria against herself, she has a feeling her neck might hurt if the only thing supporting it is...pretty much nothing, as she faces downwards with Aria's head just below her chin.

“Right...oh hey, let's spoon.” Aria turns, and Sunset thankfully realizes what she means before making an idiot of herself.

Sunset wraps an arm around Aria's waist as Aria backs herself up against Sunset, and Sunset feels a warm, comfortable wave of soothing relaxation flow through her as Aria's hips fit snugly up against Sunset's waiting body.

“Heh,” Sunset starts. “We're like puzzle pieces.”

“Yeah...” Aria says softly, lifting her butt up against Sunset and caressing Sunset's body with it for a moment. “Y-yeah....”

Burying her face in Aria's hair, Sunset Shimmer drifts off to sleep, hoping they weren't too loud.

Back with the other three...yeah, holy crap they were loud.

“Wow,” Pinkie Pie says faintly, her voice wavering.

Adagio looks over at her, narrowing her eyes as she carefully watches Pinkie's expression. “It would seem that wolf...fox girls have rather loud sex.”

To their side, Sonata sighs, and Adagio turns to her. “Something to say, Sonata?”

“It's not fair,” Sonata grumbles.

“Yeah,” Pinkie Pie adds.

“You two...” Adagio sighs. “Just to be clear...this isn't about love. This isn't them, going off on some romantic, late-night get-together. We've changed.” She stands, showing off her fox tail. Fox. I said fox. What's a wolf?

... fox.

Adagio goes on, leaving the narrator to her shit. “We've changed, and we're dealing with those changes. You saw what it was like when we didn't. We can't afford to be at each other's throats here. Despite how it seems, I have a feeling our lives are in danger. Eventually, we'll meet enemies who actually know how to use their weapons. Or monsters strong enough not to need any weapons.”

“Speaking of which,” Pinkie says, “what's out there? You and Sunset seem to know an awful lot about this place.”

“Well,” Adagio says, slipping into her bedroll. Sonata slips into the same bedroll.

We now have a problem.

Pinkie Pie, never one to be left out, slips into the same bed roll.

The problem...has gotten worse.

“So,” Adagio starts, glaring at the other two. Sonata is facing her, laying sideways and cocking her head in confusion. Pinkie Pie is spooning Sonata and is casually taking deep whiffs of Sonata's hair, letting out loud, grinning sighs after every long inhale. “Would you two...mind telling me what you're doing?”

“Uh, laying in bed...roll with you?” Sonata asks, cocking her head the other way.

“Yeah! And I'm snorting this one's hair!” Pinkie exclaims giddily.

“Yeah!” Sonata agrees, beaming.

“You have your own bedrolls,” Adagio starts, but she has to admit that the warmth of the three of them together in this extra-wide-for-no-reason bedroll is rather pleasant. “Ugh, fine. Just...don't keep me up.”

“Sure thing!” Sonata says brightly as Adagio turns away. Sonata glomps up next to her, making a double spoon: Adagio being the smallest spoon, and Sonata in the middle, getting some sick two-girl action, while Pinkie brings up the rears. Or brings her front up against Sonata's rear.

Oh baby.

Following Adagio's orders as perfectly as usual, Sonata reaches around Adagio's hips and slides her fingers down the front of Adagio's dress, from her navel to where her (don't say vaga-doodle-oo) fingers probably shouldn't go unannounced.

“Sonata,” Adagio growls, squeezing her legs together and clamping Sonata's hand between them.

Sonata giggles and wriggles her fingers, tapping a few sensitive areas, and Adagio stifles a gasp. Sonata scooches closer and buries her face in Adagio's hair, sighing happily. “C'mon, you said it yourself. We've changed, so now we gotta deal with those changes!” She shakes her tail up and down, drawing a giggle from Pinkie Pie, who floofs it with her fingers a few times.

“Dealing with being turned into...girls with fox ears and fox tails and a weird desire to gang up on Aria isn't the same as fingering me in a bedroll with...Pinkie Pie.” Adagio's words, while true, aren't super conductive to sexy times.

Although resistance does make it more fun sometimes.

Heh.

“Can't I just...rest my hand on you for a bit?” Sonata pleads, her eyes bright, pouting.

“That's...you know that's not how it works. You do that, I get...frustrated, then you have to finish. You know that. You've been there, so don't play dumb with me.” Adagio sighs, but even she feels her resistance crumbling.

“Well, maybe it won't happen this time!” Sonata says brightly. She feels Adagio loosen up her leg-clamp and starts working her fingers back down, only to have Pinkie Pie suddenly slip her whole-ass hand up her (Sonata's jfc F/F/F) dress. “Wha-whoa-whuh?”

“Hey there!” Pinkie says brightly. Lot of brightness happening. “What we doing with our hands in each other's junk?”

The other two stare at her, then Sonata snickers. “Oh. My. Gosh. Is this...is this your first time?”

“Maybe!” Pinkie says with a grin. “First time doing what?”

The other two glance at each other, then smirk in unison.

“Okay,” Adagio says. “Change of plans. Pinkie Pie, right? Go ahead...and lay back.”

“Sure!” Pinkie says, laying flat on her back. Sonata moves her face down to holy crap. Pinkie Pie. Why are you wearing...nevermind. Sonata moves her face down a little then lifts up the multi-layered, ludicrous dress Pinkie is wearing, finally exposing Pinkie's...pink panties.

Shush.

“Um...!” Pinkie says, starting to sweat a bit as Sonata lays her palm across Pinkie's panties, sighing long and slow, a shuddering breath of barest restraint. “Uh...wait, what's happening?”

“We're gonna fuck you, Pinkie Pie,” Adagio says, scooching next to her. She reaches across Pinkie's chest, holding her down with her elbows and bring her lips up near Pinkie's. “Don't worry...we've had lots of practice.”

“Wha...? F-f-fuck, like...s-s-sex?” Pinkie looks more than a little worried.

She also looks to be very pinned.

Adagio kisses her lips tightly, and while Pinkie keeps her lips squeezed shut, Adagio doesn't seem to mind. “You got it. Sex. The two of us, are going to have sex with you. But don't worry...we're just...dealing with our changes, after all.”

“But...but what if...I don't want to?” Pinkie says as Sonata runs her fingers along the frilly lace lining Pinkie's pink panties.

“Then...” Adagio says, bringing her lips up against one of Pinkie's fuzzy ears. “Then I guess we'll really have our hands full of you, huh?”

“C'mon,” Sonata says as she kisses the very bottom of Pinkie's panties, drawing a stifled yelp from Pinkie. “It'll feel good. We don't hate you, so we won't hurt you, unless it makes you like it more. And you'll like, you know. Know how to make Sunset Shimmer feel good. Or have an idea, at least.”

This calms Pinkie.

Sorta.

She does relax a bit, her eyes going wide, and her panicking sweat slows. “Oh...yeah, I guess that's true. But...will...will you really be nice to me?”

Hearing this sends something strong through Adagio; a powerful feeling, a surging want. More than anything, right now, Adagio wants to hold Pinkie tight in her arms. She wants to coo sweet nothings to her; to kiss her neck softly, running kisses down her side and across her stomach, lighting on her navel and breathing little teasing puffs, drawing giggle-gasps and-

“Yes. Yes, of course,” Adagio says warmly, kissing Pinkie's puffy hair. “We'll be nice to you, sweet little thing. Our sweet little Pinkie...”

“Aw, alright,” Sonata says from below. She starts slipping Pinkie's panties down her legs and Pinkie gives a small jolt, but Adagio holds her firm against the ground.

“Shhh, shhh, it's okay. I said we'll be nice, so we'll be nice. Now,” Adagio says, lowering her lips back down to Pinkie's and looking into her eyes intensely. “Sonata's going to do things to you. She's not bad, so...lucky you.” Adagio turns her head slightly and brushes her eyelashes against Pinkie's cheek, tickling her lightly. “Meanwhile, I'll keep you company up here. Sound good?”

“Wh...what we gonna do in the bedroll, boss?” Pinkie memes, then gulps. “I mean, yeah, I...I guess. Just...please don't hurt me, okay?”

“Hurt?” Sonata says from down below. She thinks maybe she can see in the dark, or maybe she just has some sorta magical pussy-finding-eye-powers, because she can see Pinkie's body quite clearly. Something's off though, and she's gotta let everyone else know.

About what's off. About the vaga-doodle-oo.

“Hey, for someone who's never had sex, you sure do shave a lot,” Sonata says with all the grace and class a horse monster turned teen girl turn teen fox-girl can muster.

Not a lot. Not a lot.

“What? No I don't!” Pinkie says, truthfully, though since this is supposedly third-omni, the other two don't know that.

“Wait,” Sonata says, checking out her own puss-puss. Shutup. “Hey, cool! We got a free shave!”

“What are you idiots-” Adagio starts, running her hand up her own dress and slipping her fingers against her apparently smooth vagoodle.

I can't stop, send help.

“Impossible,” Adagio says faintly. She doesn't feel hair, true. She also doesn't feel the stubble-pricks of a shaven field of...vagina. Mound. Vagamoundaloo.

“Wow, being a retconned-into-a-fox-girl wolf-girl sure is great!” Sonata says chipperly before slipping herself back into position within Pinkie's absurd dress.

Pinkie, certain that her dress is awesome-mazing and not absurd, feels a huge tickle go up her body as Sonata puffs a quick breath on her no-no square. “S-so...what's it gonna...feel like?”

“Like you're losing your mind,” Adagio murmurs, pressing her lips up against Pinkie's cheek as she reaches back into herself, her fingers finding their familiar rhythm; the comfortable groove of lonely late nights, too lazy to drag the other two into it and happy enough with her own company.

“That...uh...g-great,” Pinkie says, her smile long gone and a worried frown on her face. She clenches her mouth closed against another yelp as Sonata's fingers find their way onto her lips.

Not her face lips. You goddamn...face-lipper.

Sonata spreads Pinkie, gazing at her secrets in the night-sight of her new form. “Ooo, I like it. Kinda tight, but...” She runs her fingers lightly, slowly, down Pinkie's slit-lips, drawing squeaks and shudders from the pinned-down Pie. “Not like I'll have to go in anyway.”

Adagio watches Pinkie's face, twisting in fear and worry and, bit by bit something new. Something desperate. She smiles and kisses Pinkie's cheek, then is struck by an odd urge. She licks Pinkie, and Pinkie looks over at her, her face softening ever so slightly. Adagio licks Pinkie again and Pinkie giggles, then gasps as Sonata does something down below.

What Sonata did is gently run a finger over Pinkie's clit. Sonata giggles back up at Pinkie and gets her face closer, then lays a long, gentle kiss across Pinkie's slit, enjoying the warmth of her new friend's body. Perhaps a bit quick to consider people friends, Sonata is, nonetheless, rather okay at what she's doing, so she proceeds by flicking her tongue against Pinkie's mound to test her response.

Pinkie jumps a bit and Adagio presses her down harder, moving her face up to Pinkie's ears and licking at them. Sonata progresses her dastardly plan, touching her tongue to the top of Pinkie's slit, avoiding her clit for the moment. Pinkie doesn't seem able (or willing) to writhe away, so Sonata hums and giggles and runs her tongue down Pinkie's lip. She dips her tongue in for a moment, noting how, despite Pinkie's protests, she's starting to get more than a little ready. Smiling, Sonata runs Pinkie's wetness up her other lip and finally touches Pinkie's clit, ever so gently, with her tongue.

Pinkie shivers and sighs, moving closer to Adagio on reflex. Adagio watches her for a moment, returning her fingers down into herself and pressing her lips to Pinkie's as her fingers work herself up to a mounting climax.

Adagio is a bit of a sadist. Big surprise, I know.

Meanwhile, back at Pinkie's pie, Sonata is having a blast. Pinkie's struggles turn slowly into the gentle pulses of desperate desire as Sonata toys with her, fluttering her tongue against Pinkie's clit and caressing her thighs with her fingers. She dips her tongue in and runs Pinkie's wetness all about, up one lip, down the other and all across, giving her clit just barely enough time to recover before she starts in on it again.

It isn't long before Pinkie starts squeaking, her hips bucking against Sonata's relentless tongue, and Sonata stops dead for a second just to watch Pinkie try and press herself against Sonata's lips. Giggling at Pinkie's desperation, Sonata sets back to work, her arms up under Pinkie's legs, holding her fast against Sonata's working mouth.

Sonata keeps her teeth away on instinct. Which is a good idea. But she kisses and licks and flicks, and soon, Pinkie's having her first ever orgasm, pinned against the ground, her fox-ears being licked by a cumming sadist and her hips bucking against an idiot with a magic tongue.

Pinkie's mind blanks out, white arcing across her vision as all thought ceases. All she can feel is her body twisting and bouncing, everything out of whack, everything wrong but right, so right, so good, too good. She feels a tear in the corner of her eye, but Adagio licks it away then presses her lips against Pinkie's cheek, moaning into her as her own body shudders, her breath hitching as she brings herself to whatever crazy place Pinkie's gone.

Pinkie doesn't know how long she's out there, in that bright, rushing light, her body buzzing and breaking and betraying her, but when she comes down, she can't open her eyes. She doesn't want to.

She doesn't want to see the cave, the hard stone, or the girls who made her do all that. She doesn't want to see the people who forced her out of her body and into that light, no matter how bright; no matter how wonderful.

“Hey,” Adagio whispers into Pinkie's ear. “You okay?”

Sonata comes up, slipping out of Pinkie's dress and snuggling up into the crook of Pinkie's arm. “You did super good, you know. Most girls won't get there, their first time.”

Pinkie doesn't say anything for a bit, her eyes still squeezing shut. But she feels less bad, and a bit of her hates herself for it. She sighs, hugging herself, and Adagio nuzzles against her.

“It's okay. We don't have to again, if you don't want.”

“I didn't want to this time,” Pinkie protests, growling. “And you did anyway.”

Adagio looks at her, realizing that the two of them may have gone a bit too far. “I'm...look, we won't again. We promise. Right, Sonata?”

“Awww, but it was so fun. Right, Pinkie Pie?”

Pinkie stands, leaving the bedroll and picking up a different one. She lays it down further back in the little room they're in and stuffs herself inside without saying a word.

Adagio turns to Sonata, glaring and speaking in a whisper. “Look. If we're gonna get out of this, we need everyone on the same side. So unless she starts it, don't do this again. And considering that you started all this by trying to finger me in the first place...don't do that again or I'll bite your hand off. Got it?”

“Guh, fine,” Sonata agrees, sulking. “I still don't get why, though. She obviously-”

“Sonata,” Adagio gets closer, a hand clamping onto Sonata's mouth. “In case you didn't notice, she wasn't exactly on board for all that. It doesn't matter what her body did. So unless she starts it, don't. Unless anyone starts it, don't. Got it?”

Sonata glares at her for a second then gulps and looks away. “Yeah...got it.”

“Good.” Adagio doesn't let go of her right away, staring intensely at Sonata's downturned eyes, daring her to glance up. Sonata doesn't, so Adagio grunts and lets her go. “Good.” She glances over at Pinkie Pie, sighing and speaking louder so Pinkie can hear. “We are sorry, you know. The three of us...well, anyway.” She sighs again and lays back down in her bedroll, shoving Sonata out.

As Sonata, grumbling, slips back into her own bedroll, Pinkie Pie speaks. “The three of you...what?”

Adagio thinks for a moment about how best to word it, but decides to just plow ahead. These accidental puns are very accidental I swear. “When you're the only ones of your kind, for so many long, long years...you get a bit...intimate, at times.” She shrugs, thinking back on it all. “I guess maybe we don't think about those boundaries much, since we never really had them with each other. If we were bored, or lonely, or hurt...or mad, or even if we were happy and just wanted a little extra...celebration. Whatever the reason, sometimes we'd just...” She motions off, though she know Pinkie can't see it.

“So...” Pinkie starts, sitting up. “You...didn't do it because you hate me?”

“What?” Adagio asks, surprised. “No? Is...that what you thought it was?”

“Well yeah,” Pinkie grumbles. “I didn't wanna and you did it anyway, like super meanie weanies. I thought you were bullying me because you hated me or thought I was dumb or something.”

“Pfft, you're not dumb,” Sonata says, cackling. “Arlia's dumb, duh.”

“...Aria,” Adagio corrects her. “But no, Pinkie Pie, we didn't do it because we hate you or anything. We did it to make you feel good. Just like we'd do for each other, or ask each other to do for us.”

“...well...” Pinkie sighs, turning towards them. “I...guess it did feel good. But it was also super scary. I...I really didn't like feeling like I couldn't get away.”

“I...I know,” Adagio says, holding a hand clenched up to her chest.


Adagio starts to go on but the author has had a very long, very boring day, so that's not gonna happen.

Each girl stops and stares as, through the massive crack in the stone ceiling above them, a dragon bursts downwards into the cavern, rocks tumbling and crashing all about as the dragon's powerful legs smash down onto the pile of dead bandits and its wings slam the bandit's forge set-up into disarray.

“I smell you, predators that make prey of man and mer,” the dragon starts. It then says some dragon language things but, ruining the point, it translates them itself. “Come and face me, and know true power!”

“...the fuck?” Adagio says, eyes wide. She's seen dragons before; heck, she's seen way bigger dragons. But in all her years, she's never seen one quite so...

“Dawwww, he's adorable! Look at his wittle wings!” Sonata squees, vaulting over the guardrail that might still exist—the author doesn't remember—landing in a crouch a few feet from the dragon.

“Sonata!” Adagio yells, rolling her eyes. “Are you kidding me?” She turns back to Pinkie Pie but Pinkie's already running up to jump after Sonata, her face grinning. Which...I mean wtf else would be grinning, her vagoodle?

“Wait for me!” Pinkie yells, either over the face that she just got kinda yeah raped or just stuffing it away for later.

Shut up, I know I said stuffing.

Shhhhhhhhh.

“Ugh these idiots,” Adagio grumbles. She hears the padding feetsteps don't @ me of Aria and Sunset Shimmer coming up the passageway, which does hearten her a bit; if nothing else, Adagio thinks it would be really funny to see them fight a dragon while naked.

Adagio leaps over the railing, followed shortly by the other two.

“A dragon?” Sunset Shimmer says as she falls. She's indeed naked, and it's indeed hilarious. Aria's naked too, but Adagio, Pinkie, and Sonata don't quite get the hilarious vibe from that.

They remember their turn, though, and wait.

Saving that drive...saving that desire.

They wait. Though they don't really want to.

“Ha!” The dragon's laugh shakes the wall of the cave as it lowers its head, spreading its wings. Even from here; which is like 20 feet—(this punctuation yo) the girls can feel the intense, raging heat from its mouth. “And what manner of diluted daedric blood has poisoned you so, pitiful little foxes? (Dragon language jackassery that shall now be translated) To think the lord of the hunt had fallen to such depths, to so lightly taint mere children. Then where he has failed, I shall not. Know now the ruinous folly of standing before me!”

With his speech finally done, he inhales life-giving air and exhales death-dealing flame, and each teenage wolfgirl scatters, diving far to evade the screaming blaze of torrential hellfire.

“Tch! The hell is this?” Adagio says, landing near Pinkie and scurrying along the ground as the dragon turns to her.

“Oblivion take you!” the dragon roars, swinging its tail at her. She stops dead and launches backwards and the dragon's tail slaps hard against the stone, its steely scales cracking rock and sending sparks up into the darkness. Pinkie dodged too, though she went straight up, and now she lands on the dragon's tail, latching on for dear life. I almost typed deer.

“This dragon's tail slaps!” Pinkie exclaims, giggling. She scrambles up its body as it tries to rotate, reaching back and snapping at her with its powerful jaws.

“I got this!” Sonata calls out as she launches at the dragon's now exposed neck. She tries slashing at it with her claws, but they can't pierce its scales and manage only tiny scratches against them. The dragon turns back and slams its head down at her like a club, but she rolls between its legs to evade. It lifts a leg to stomp her but quickly must balance itself and let her escape out from under it as Sunset Shimmer and Aria both latch onto the tough, leathery membrane of its wing. They scratch and slash, drawing blood at last, and it screeches in fury and surprise (and perhaps, a bit of pain) before launching itself hard against the wall, seeking to smash them into it with its wing. They jump away and it collides hard with the stone but is soon rounding on them, screaming its lethal fire across the cavern again and sending them diving once more for cover.

“This.....is a really bad place to fight a dragon!” Sunset calls out.

“No kidding, Sunset Shimmer!” Adagio calls back.

Aria spots something then, glinting in the flame of the dragon's breath. She peeks out when the dragon's breath is done and, seeing her chance, she makes a break for a claymore, half-buried beneath the ruined mess of what once was the bandit's forge.

The dragon laughs, lunging towards her. “Think you a mighty hero? Come then, and let's see again how useless your tools are against the majesty of a dovah!”

Flames shoot from the side, covering the dragon harmlessly, and it looks over in befuddlement at Pinkie Pie, who is blasting it impotently with her fire spell.

“Yeah, take that! Now who's burning up! Fire ain't so great now, is it!” She cackles while the rest of the girls sigh, facepalming.

Except Sonata, who's eating dirt.

She didn't fall down or anything she's just....Sonata.

The dragon laughs again and the girls feel the heat build as it prepares its own flame. “Shall we compare, then? Test yourself and see what awaits those who dare try and stand beside their betters!” The dragon starts to shout its withering flame at Pinkie but Aria launches herself up, using her foxy jump powers (pffffffft) crap I can't delete that well anyway she launches up and arcs across the cavern, slashing at the dragon's exposed neck.

A sound like a sword hitting a gong (shutup) clamors throughout the cavern as the blade dents itself against the dragon's hard scales, but the sheer force of the blow is enough to stagger the beast and cut short its breath, and it manages only the tiniest puff of flame that doens't come anywhere close to Pinkie.

“I win!” Pinkie shouts, whooping and cheering and really wishing she had a confetti cannon right about now.

Aria looks at the sizeable divot in the blade and its notable bent-ness, and huffs in frustration and worry as the dragon recovers and glares at her.

“You dare- ”

“Oh-my-god-shutup, come on everyone, there's literally weapons...everywhere. So stop messing around and start messing this jackass up. ” Aria turns the blade, hoping that the other side's sharpness is enough to make up for the fact that the tip is hella bent.

Adagio grabs an axe and Sunset grabs a short sword. Sonata grabs a bow, which is just...very unnerving to everyone else who is holding melee weapons, and Pinkie Grabs the air and pumps her fist.

“Nah, magic all the way! EAT FLAMES!” She continues uselessly blasting fire at the dragon, who is rather done with this shit.

“ENOUGH!” The dragon launches towards Pinkie while Pinkie's still blasting and chomps down, biting one of her arms off at the elbow.

“Pinkie!” Sunset screams, dropping the sword and running to Pinkie's side. Pinkie is a little...screamy also, holding the stump of what was her arm as blood gushes out, as blood is wont to do.

Adagio roars and leaps, spinning towards the dragon with her axe held fast; she's kinda loving these fox-girl-bullshit-werekitsune-powers, to be honest. Totally beats regular-teen-girl powers.

Her axe hits hard against the dragon's head, cracking a horn as its head is smashed against a stalag...ctctimite coming up from the ground, but still she hears that obnoxious ringing sound as her blade fails to pierce the dragon's scales.

“Wretched cursed-ones!” The dragon roars, spinning in place with its tail outstretched. It smashes a few other floor-stone-protrusions but the girls are easily able to dodge, and Adagio wonders if maybe they're actually pretty lucky to be fighting it in a cave.

Sonata can't figure out how bows work. She keeps twanging the string but doesn't know how to make arrows come out. The arrows are sitting pretty over against a nearby wall, by the way. “Guys, my gun's broken!”

Sunset tries to heal Pinkie, but her heal spell only works on herself. She can see the golden light in her hand, can even touch it straight to Pinkie's missing arm, but it does nothing. Useless warmth, useless light, useless magic doing nothing at all as her friend bleeds to death in front of her. “Pinkie...Pinkie please please please hold on, I-”

“M-maybe if I...” Pinkie casts the heal as well, and while her bleeding seems to slow, she's far too pale and far too tired, and soon the magic starts fading as well.

“Pinkie no, no please!” Sunset shakes her, holds her, kisses her neck and licks at her cheek. “Pinkie Pie...please don't go. I...I think I love you, Pinkie. Please...please don't leave me.”

“W-well...if you insist...” Pinkie mutters, then casts her heal again.

This time, her whole body is enshrouded in golden light that pulses massively, throwing the cavern into bright, stark relief.

The dragon stares in disbelief. Everyone else too. Except Pinkie, her eyes are closed serenely as her arm regenerates in brightened white. The light leaves and her arm is as good as new. Better, even. Not discolored though, that'd be weird.

Wait no that'd be cool, like a lingering reminder of the time she did the nearly impossible. Okay her arm is slightly lighter pink than the rest of her.

For now.

“Impossible,” the dragon mumbles and Aria sees her chance. She swoops in under the dragon and angles her blade, turning it so it slides beneath one of the dragons tough scales. Her blade slashes true and the dragon howls in pain as blood drenches the ground (and Aria) beneath it.

Adagio, also seeing her chance, now leaps atop the dragon and slashes at a diagonal, burying her axe deep into the back of the dragon's head. Like a donkey punch, but with an axe. And slightly more or less sexy.

Less, probably.

The dragon gives a choking, halting, gurgling growl, then crumples to the ground. Sonata runs up and slaps it with the bow.

Fucking...Sonata, stay gold, pony girl. Stay gold.

I know she's not a pony, c'mon man.

The group stares, first at the dragon, then at Pinkie Pie, then between the two.

“WOOOO!” Pinkie starts the cheer and the others join in, though much less Pinkie-ish.

“Wow,” Sunset says, still naked, as she helps Pinkie up. “That was...Pinkie, I'm..”

“Nakey!” Pinkie exclaims, hugging her close.

Adagio kicks the dragon, smirking. “Just...as I thought...” She might be a little out of breath. “Still just a dragon.”

“Kinda tougher than the other's we've fought,” Aria says. “Though I guess we usually just drove them off with our music.”

“Hey Aria!” Sonata says, coming up close but then backing away slowly. “Oh, wait...right, not my turn. But...yay! We did it!”

“Uh, we did. You didn't do anything,” Aria snarks, making Sonata giggle.

“Daww, I missed you too.” Sonata turns to the others. “So what, you can just regrow arms now?”

“Looks like it!” Pinkie says, beaming. She glances at Sunset, now unhugging her, and then glances at Adagio for a second. “Hey, you two've played this game before, so why you looking so surprised?”

“Well...” Sunset says, scratching the back of her neck. “I...don't think healing spells can usually pull that off. Though losing limbs isn't really a thing in the actual game.”

“Even the dragon was surprised,” Adagio points out, “so I doubt it's common. Exceedingly uncommon, even, considering how long-”

“AHHH glowing!” Sonata yells and the group turns. Everyone's eyes go wide, due to what they see, but Adagio and Sunset's go a little wider, because they know what's going on.

The dragon's soul, you see, is leaving its body and entering them. But not just the closest, and not just the one who slew it.

It's going into all of them, because the author's a crazy person.

“Impossible,” Adagio mutters as the soul enters her.

“Yeah...agreed,” Sunset says as the same soul enters her.

Once the swirling light has entered them all, a guard pops in from the cavern that Aria and Sunset had left ungaurded. Yes, yes, see, I have some reasonining, everything's fine, what's spelling but a miserable pile of letters?

“You...are Dovahkiin. D...Dovakhnikn.”

“We haven't even...ugh,” Adagio grumbles.

Sunset tries Fus and blows the guard back a bit. “There, fixed it.”

“You can shout now,” the guard says, “and you couldn't before.”

“Is that the right dialogue?” Adagio asks Sunset and Sunset shrugs.

“I dunno, after the first like...fifty times I just kinda ignored him.”

“Blood!” Sonata yells, running up and breaking her bow over the man's head.

The guard isn't dead, and is in fact only a bit dazed and a lot pissed, so the group, sighing collectively, rips the man to shreds.

Adagio tries Fus and it works. She and Sunset then look at the others expectantly.

Aria Fus's a bandit body and moves it a bit. The three who Fus'd now wait for the other two.

The other two, who are of course Pinkie Pie and Sonata. Pinkie stares back with a vacant grin and Sonata starts gnawing on the dragon's bones.

“Hey Pinkie, try saying 'Fus' and uh, putting...magical dragon soul power into your voice.” Sunset figures that, if nothing else, at least Pinkie might be able to follow abstract directions.

“Fus!” Pinkie shouts, sending a pulse of force through Sunset Shimmer and Adagio.

“Good, good! Great job, Pinkie!” Sunset beams, and Adagio turns to Sonata.

“Sonata, do what she did,” Adagio says, having zero faith in Sonata's ability to do just about anything. This especially.

“Good, good! Great job, Pinkie!” Sonata beams, and Adagio facepalms.

“Not that. Say 'fus' and put magical...ugh...dragon soul power into your voice.”

“Uh...did you hit your head, Adagio? You're sounding like Sonata,” Sonata says, giggling and rolling her eyes. “Wait...hey!” She rounds on Aria. “What's that supposed to mean?”

“Uh...you're the one that said it,” Aria says, trying and failing to cover her breasts with her hands. She turns and bends over, sifting through bandit remains until she's pieced together and outfit, and when she turns back she sees very clearly that every single one of the other girls had been staring at her body as she was turned and bent. “Great, love being in the cave of pervy rapists.”

“Hey,” Adagio growls, “it's not like that. We just didn't understand Pinkie's boundaries. We've learned from our miscalculation, and won't push her into anything she doesn't want again.”

“You...what?” Sunset says, coming up behind Adagio and turning her to face her forcefully. “What'd you do? What'd you do to Pinkie Pie?”

“I made sex in her with my mouth!” Sonata calls out.

“You...uh...what?” Sunset says again, less mad and more confused as hell.

“We forced ourselves on Pinkie Pie,” Adagio clarifies, adding more as Sunset's mouth twitches and her eyes...also twitch. “We didn't think about it. The three of us...we'd do things like that, sometimes. And we never really think about the other person not being...well, we're just so much more used to each other. Perhaps we forgot how to be with...others.”

“It's okay, Sunset. We talked, and they won't do that again, unless I want to,” Pinkie squeezes Sunset's hand, and Sunset feels a powerful thrum course through her. She feels, too, a breathless nervousness as Pinkie goes on. “But um...did...did you say you were in love with me?”

“I...” Sunset starts, glancing over at the Dazzlings, who are goddamned smirking and loving every second of this. Goddamn Dazzlings.

I love the Dazzlings.

Sunset sighs. “I...think I might be. I mean...it's not like I dislike you or anything, but I'm not completely used to...love.”

“See!” Sonata calls out. “Not everyone knows how to do everything!”

“Yeah,” Aria says, “though everyone knows how to do everything better than you. ”

“Yeah!” Sonata agrees cheerily, nodding. Everyone waits for a few moments but Sonata doesn't get it, so Sunset just plows ahead.

I use that word a lot when there's no immediate plowing occurring.

“Well...yeah, Pinkie Pie. I think I'm in love with you.”

“That's great!” Pinkie says, slapping her back. “I love my friends!”

“...big oof,” Aria says, snickering, and Adagio and Sonata join in with cruel chuckles.

“Erm...yeah...hey Pinky,” Sunset, plowmaster, plows further. “Um...see, when I say love...I mean something different than what you feel for a friend.”

“W-wait,” Pinky's eyes go wide and start brimming with tears. “Are...are you saying we're not friends?”

“What? Of course we're friends. I mean...well...oh, so you know how Twilight Sparkle gets when....wow is Twilight really the only example of romantic love? Anyway, you know how-”

“Wait, which Twilight? Pony Twilight or People Twilight? Oh wait, Pony and People Twilight, or only People People Twilight? Yeah, that's the ticket! Wait! Did I get a ticket for this ride?”

“Oh you don't need a ticket for this ride,” Sonata purrs, flicking her tongue out and pointing at it.

“Sonata I swear to Talos I'll smite thee if you say that again,” Sunset says, glaring at the author's unwillingness to hit the backspace key.

Adagio laughs. “Wow...really flying that geek flag high, huh?”

“You get the reference, so what's that say about you?” Sunset counters.

“That I have restraint?” Adagio shoots back, smirking, and Sunset growls, turning back to Pinky.

“Pinky, you know how uh...People People Twilight is with Timber Spruce?” Sunset hopes that Pinky can, perhaps, learn about romance. By thinking about Twilight Sparkle.

The irony of everything is pretty intense right now but Sunset forges ahead, take that, plows!

“Oh! You mean how she's all goo goo gah gah and all like..twitchy and nervous and giggly?” Pinkie grins. “Daw, are you all twitchy around me, Sunset?”

“Well...not really. I mean...a little, when I think about...you know. K-kissing you and such.”

“...Adagio I want popcorn so bad right now,” Sonata whispers loudly to Adagio.

“Shut it. Go munch on some guard if you're hungry.”

Aria watches intensely as Sunset and Pinkie talk, a strange ache shooting through her. It's not that she's...okay she's jealous. Flat-out jealous. She knows she shoudln't be, knows that her feelings are something markedly different than what Sunset feels for Pinkie, but still....

Although, moment by moment, she becomes less and less sure that those feelings really are that different.

“Pinkie,” Sunset goes on. “I want to...you know. Be with you. Like everything we were before, but also...just be with you alone. Doing stuff, having fun. Holding hands, holding each other, kissing...other things.”

Pinkie blushes, turning away. “Ah...erm...oh, I see. Um...but it's not like...that weird instinct thing like it is with Aria, right?” She turns back and Sunset nods, but Pinkie goes on before Sunset can talk. “But then if it's not that then...why?”

“Why?” Sunset smiles warmly, chuckling. “I dunno. That's just how it works.”

“O-oh...” Pinkie crosses her arms across her chest. “But...what if um...it isn't working for me?”

“HA!” Sonata laughs loud then proceeds to continue munching on the bit of guard she's holding, her eyes wide and bright as she watches Sunset Shimmer's heart be torn apart. Not literally.

“..damn,” Aria says, smirking. “Shot down hard.”

“Looks like the dragon might've gotten the softer death,” Adagio says with a humorless laugh.

“That's fine, Pinkie,” Sunset assures Pinkie, starting to reach out but quickly drawing her hands back and slapping them to her naked sides. Clothes would be great right now. Too bad, Sunset, too bad. “It's...” Sunset sniffles and sighs, forcing a wobbly smile on herself. “Hey...but...we can still be friends, right? I didn't um...gross you out, or anything...right?”

“Yeah, of course!” Pinkie says brightly. “I just don't love you like that!”

“Yeah...yeah I got that,” Sunset grumbles.

“We can still have sex though if you want!” Pinkie exclaims, just about killing everyone.

“Wh-what?” Sunset stammers.

“Yeah, what?” Adagio says in the distance. Sunset points a finger back at her menacingly and Adagio shrugs, still freakin' smirking.

“H-hey,” Aria says. “It's late, it's cold...let's just...all go back to our spots again, okay? We can do...whatever this all is in the morning.”

“No way,” Sunset says back, turning to Pinkie. “Pinkie we...I dunno if...I mean, if you don't love me...”

“I do love you, Sunset. Maybe not in the same way, but it's still love, right? And...it's not like sex doesn't make me feel good. So what's the problem?” Pinkie takes Sunset's hand in hers and smiles, and Sunset pulls her close, holding her tight. Pinkie doesn't struggle; she only wraps her hands around Sunset and sighs happily, nuzzling against Sunset's cheek and patting her back gently. “There there...just let me know when you wanna do stuff to me with your tongue and I'll let you know how I'm feeling, and we'll go from there, okay?”

“T-tongue...? Oh yeah...definitely, okay, I like this plan.” Sunset nods vigorously and Pinkie giggles, but a soft whine from behind Sunset turns Sunset around.

“H-hey,” Aria says. “So this is probably this weird fox-girl thing but...could you um...maybe stop? I kinda...I really don't like this.”

“Aria?” Adagio reaches out and Sunset snarls. Adagio turns, her hand still wavering in the air, her lips twitching. After a moment, and with great effort, Adagio pulls her hand back to herself.

Sonata's inching closer but Adagio turns to her and growls and Sonata stops.

“Oh, yeah,” Sunset says. She turns to Pinkie Pie and nuzzles her nose with hers. “We'll get back to this when it's not my turn with Aria, alright?”

“Sounds good to me! Oh hey, maybe you can practice with her!” Pinkie smiles wide and Sunset blushes.

“Yeah...I'm sure I've learned some things. More than I knew, definitely.” Sunset smiles back but her smile's a bit dimmed from all three Dazzlings snickering at once. “Anyway, yeah, let's get back to our spots.”

They all disperse, taking their weapons with them (with the exception of Sonata, who replaces her broken bow with a big ol' dragon rib).

Aria slips into the bedroll facing away from Sunset and Sunset slips in behind her, wrapping her arms around Aria. Aria growls and Sunset stops.

“Whoah...uh...what?” Sunset asks.

“I dunno. Just pissed, I guess.” Aria huffs, then turns, her arms boxing her breasts in, hands resting on her collarbone. “This shit's weird, and I dunno what I'm feeling. Okay nevermind. I'm jealous. Dead jealous. It doesn't make sense, and I hate it, so just fucking squeeze me and tell me I'm yours again so I can stop feeling like this for a bit.”

Sunset moves forwards, sniffing her hair deeply, and clenches her tight against her chest. “You're mine.” Her breath speeds as Aria whimpers and snuggles closer, her legs working against Sunset's, trying to spread themselves around her. “Y-you're mine,” Sunset repeats, her mind losing clarity but gaining focus. She wants something. She wants, some thing.

She wants.

She rolls Aria onto her back forcefully and knocks her legs aside with her knees, spreading them out on either side of her as she growls into the top of her head, into her hair, into the sweet, sweaty comfort of it.

“Y-you're...you're fucking mine,” Sunset growls and Aria lifts her hips up, desperate and delirious, and Sunset slams her pussy down onto her. Sunset roars and Aria whines, and they fuck furious, Aria's bitter jealous thoughts melting away into white light and the clamping warmth of Sunset's body, all around her, and Sunset's mind shattering into a feral fury, all slamming violence and slick warmth, pressing and teasing and smashing and squeezing, sadistic joy and smirking triumph as Aria cums beneath her, her legs spread wide around Sunset, inviting, inviting, screaming please more please, and Sunset delivers, hard and fast, her pussy grinding against Aria's, ruining all resistance.

When Sunset finally breaks through that maddening drive, she loses it all to blank lightning, mouthing a roar she can't verbalize, a cry she can't utter, her climax too much, her height too high. When she comes to, she's licking at a trembling Aria's ear, her body buzzing and charged and yet, so relaxed. So tranquil.

Refreshed.

“Fucking...hell, Sunset Shimmer,” Aria murmurs. “Fuck food, fuck water...I could live off you, all day, every day.”

“Whoah,” Sunset says, squeezing Aria close and drawing out another low, pleasing whine. “I uh...yeah. That was...wow.”

“Hey...” Aria whispers, licking at Sunset's neck. “Um...so this is kinda...bizarre. But...I kinda...like you.”

Sunset's quite for a bit, then sighs, kissing the top of Aria's head. “Yeah. This is so weird.”

“Do um...?”

“I dunno. It's hard to tell, with this whole...fox thing. Do foxes even do this?”

“What, have awesome sex?” Aria wriggles against her, humming. “Probably.”

“I mean this whole...hey, do they even have packs?” Sunset sighs again and decides to stop questioning the author before she gets a face full of daedra.

And not the sexy kind. I mean I guess some people probably think daedroths are sexy. The crocodile ones, not the...generalized term 'daedroth' ones.

Goddamn Elder Scrolls.

Aria sighs into Sunset's chest, making her whole body twitch at once. Aria chuckles and nuzzles closer. “I guess it doesn't matter, huh. I just fucking...want you, and you want me. And when it's your turn, we get each other.”

Sunset thinks for a time, letting Aria's words roll around in her mind as Aria turns and they re-initialize spoon-mode. She licks Aria's soft, fuzzy ear, making it flick back at her face, tickling her nose, and smiles. “Yeah. Still sucks my turn was super short.”

“Try not to miss me too much,” Aria purrs, rubbing herself up backwards against Sunset's body.

Sunset's breath hitches and she squeezes Aria closer. “Y-yeah, well...same to you. My girl,” Sunset murmurs into Aria's ear and Aria squeaks, thumping her ass hard against Sunset.

“You really are a villain,” Aria teases, curling up. Sunset holds her close, and the two drift off to sleep.

Back at Camp Rape, both Sonata and Adagio lay in Adagio's bedroll while Pinkie lays next to them but in her own bedroll. They slap their bedroll flaps against each other just to piss off all those flapless bedrolls that may exist, then drift off to sleep.

Sonata manages to not finger Adagio, which is impressive. Not many could manage the same feat of resistance in her situation.

This is where the author would like to end a chapter, but this is Nano, so there ain't no brakes on this skateboard.

They awaken the next morning and eventually all meander towards a congregation in the main chamber, where the dead-ass dragon skeleton is. They munch on a bit of guard, kept almost fresh from the cold, then head back into the first room by the draw bridge to get some water from the cave water that's probably unsafe but meh.

Fox girls give no damns.

They dress themselves in bits of bandit armor and head out, talking about not much, mostly just wishing morning could stop being so...morning-ey.

“Alright,” Sunset grumbles as she steps out of the front entrance of the mine, back where they'd first entered it. She looks back and, naturally, her eyes are first drawn to Adagio and Aria. Adagio's got her arm wrapped around Aria's waist, and Aria is squeezing her legs together, her hand trying to slip in. “So let's get those standing stones and then figure out what we're going to do from here.”

“Oh, I got this!” Pinkie runs towards a tree then veers off (barely) and picks up some rocks, then sets them up, standing against the tree. “Stand-”

“Anyway,” Aria says, rolling her eyes. “Where we going?”

“-stones!” Pinkie finishes and Adagio scoffs.

“That way,” Adagio points off and Sunset nods wearily, rubbing her eyes.

“Yep, let's go.” As they head off, Pinkie takes Sunset's hand, waking Sunset up quite a bit. “P-Pinkie?”

“S-Sunset,” Pinkie fake-stammers, teasingly. “What's up?”

“Huh,” Sunset shrugs. “I guess we hold hands a lot but...alright, well-”

“See? It's just like before, only it feels even better! I'm so glad you fell in love with me,” she giggles and squeezes Sunset's hand.

“You know,” Adagio says, “I don't know if Pinkie's just very daft, or secretly a sadist.”

“What's a sadist? Sounds like a sad person,” Pinkie asks and Sunset growls at Adagio.

“It's a person who likes other people's pain, Pinkie. Something you're definitely not.”

“Oh!” Pinkie says brightly. “Kinda like how Adagio liked me being all scared when Sonata was all up in my snizzle with her tizzle.”

Sunset trips over nothing and falls flat on her face like an anime, then rubs her head and stands, glaring over at Adagio and Sonata. “Remind me to pay you two back for what you did to her.”

“Is this going to be a problem?” Adagio says, growling. Aria hides behind her, blushing madly, and Sunset realizes how much more fun she could have had if she'd only had a full day for her turn with Aria.

Aria, loving how it feels to be hiding behind her...she's still unsure what the word is, but the person who owns her. Master, perhaps. The author knows what word it is, but in a rare show of storytelling the author's going to wait for in-universe things to happen before the characters learn certain specifics.

Sunset sighs. “No. You just raped my friend. It's fine.”

“She says it's fine!” Sonata calls out, baring her claws. Her dragon rib is still...well not sheathed, but still strung across her back with a variety of leather straps the bandits were hoarding for some reason (leveling up blacksmithing pre-patch, Sunset and Adagio bet).

“Well I bet she didn't say it was fine during,” Sunset growls back but Pinkie puts her hand on her shoulder.

“Sunset, it's fine. Really. They didn't hurt me, they just scared me a little. C'mon, let's just keep being friends, okay? All of us!”

Sunset sighs, turning back. “Fine, you're right. And anyway, this whole...fox girl thing is a little weird. So I'll chalk it up to that, this time.”

“Sure, sure,” Sonata says. “But can we call ourselves kitsune? I wanna be kitsunes. Kitsune? Is it plural?”

“I'm amazed you know what plural means,” Aria says. “But yeah, I think it's just kitsune, for both. Also why do you know that word?”

“Why do you know that word?” Sonata counters.


“Uh, because Japanese culture's awesome?” Aria counter-counters.

“...is Japan a thing?” Pinkie Pie asks, but the rest just shrug. Apparently it's a thing. Probably.

“Do we plan on continuing towards the standing stones, or are we just going to whine and complain for another few thousand words?” Adagio asks, taking full advantage of the not-yet-fully-functional 4th-wall barriers.

“Hard agree, let's just go,” Sunset hard-agrees, just going.

Okay okay, I'm here, I'm awake, let's do this.

They arrive at the standing stones, uncertain if they should capitalize them or not, and get down to the vine-laden monoliths. If yours aren't covered in vines, you're clearly not modding properly.

Those better be 8k vines by the by.

“So,” Sunset says, looking between the three stones. “Which ones we all-?”

All three Dazzlings touch the mage stone; unsurprising, since they've always been obsessed with magic, even if it's mostly just as a means to an end.

Aria mostly chooses it because Adagio's there, and Sonata chooses it because Aria's there. Adagio chooses it because she's curious of perhaps other magical anomalies, similar to Pinkie's re-arm-ification, could be accomplished by swaying the magical odds further in her favor. She flexes her fingers and lifts a hand to the sky, firing off her fire spell with ease. She tries the heal spell and it works, too, though she's uncertain if it'd reattach a severed limb.

It's rather hard to test, too, so she leaves things as is, for the moment.

“So Pinkie-” Sunset starts, expecting Pinkie to leap towards the magic stone too—her skill at magic already having been made apparent from her healing—but she bops over to the thief stone and touches it, sending a light up into the sky as it activates and passes its magic to her. The same happened to the Dazzlings when they touched the Mage stone, but the author forgot to describe it.

“Sweet, now I can wear hoodies!” Pinkie pumps her fists and Sunset facepalms, smiling.

“Alright...sure. Well, I guess I'll do this one then.” Sunset toches the ….oh I really wanna change that to touches....she tooches the warrior stone and feels the magic pass to her, which feels like...well, nothing, really. A slight buzz, like static, then the sensation is gone. She pulls out her sword and swings it a few times, and she thinks she might be a little better at it.

Sunset and Adagio know that what the stones do is increase experience gained from relevant actions towards thematically linked skills. What they don't know, though, is exactly what the hell that means outside the context of the game.

“Alright,” Adagio says. She slips her hand into the back pocket of Aria's pants, drawing a shuddering, leg-clenching gasp and moan from Aria, who practically collapses against her and starts whining into her chest. Each other girl feels their eye twitch; particularly Sonata, who draws her lips back in a snarl, though thankfully for her, Adagio doesn't see as she continues, “Now that we've gotten the magic from these stones...whatever that actually ends up translating to...we can head to Riverwood.”

“Are we gonna do the main quest?” Sunset asks, rubbing the back of her neck and eyeing Aria up and down hungrily. Pinkie squeezes her hand, but she, too, is staring at Aria, her mind filled with weird wants she doesn't fully understand.

She knows the what, mind you, having had an inkling for quite a while and having been introduced to the wut rather intimately recently by Adagio and Sonata, but what she doesn't understand is the why. Why she feels she wants to do these things; why those things would feel so good, or why they must feel so good, for her to want them so desperately.

“I suppose,” Adagio grumbles as the three make their way down the road. As the town comes into view, the growls of the expected wolves come as the small, mangy canines start circling around them. Each girl blasts outwards with their fire spells and the wolves die in miserable agony while the girls wonder vaguely what wolf meat might taste like but they decide that might be too close to cannibalism for their tastes.

They don't realize the irony in that thought as they continue on, bellies still full of guard and bandits.

“Well, here it is,” Adagio announces, waving a hand, unsmiling. “The glorious hovel of Riverwood.”

“Un-modded Riverwood,” Sunset sighs. “There should be a Zelda reference horse sitting outside that tavern.”

“But there's not,” Adagio also sighs, “nor are there doggos with back-mounted cannons on that island over there.”

“I forgot how empty everything was without mods,” Sunset says, saddened by reality. The reality of being in actual Skyrim.

As a kitsune-fox-girl-fox-girl.

Who's actually a pony.

Reality.

An elderly woman approaches a man with long, silken blonde hair. “I saw it I tell you, a dragon!”

“So,” Adagio says to Sunset Shimmer, “I guess this means we'll have to...you know. Hear all of it. Again.”

“Yeah, but I don't think the author is checking the wiki, and she doesn't remember everything word for word,” Sunset says, deciding that breaking the fourth wall is now fun for her apparently. The author, though, knows just how to distract her from that.

“Hey, a chicken!” Sonata calls out as she leaps onto a chicken and massacres it with her sharp teeth, crunching into its neck and shaking it to and fro.

“They've...!” S...Sven? Sven. Pretty sure it's Sven. Sven draws his sword, seeing the town's mascot murder-ated, and charges, willing to lay down his life for a fucking chicken. “I've fought mudcrabs tougher than you!”

“That's...that's an Oblivion reference, goddamnit,” Adagio growls, drawing her axe. She blasts sven with flame and he dies like the un-capitalized bitch he is, and his grandmother....mother...flees into his house, because Sven's a goddamn homeowner and the author isn't.

Stupid deadass Sven.

The town starts howling as people draw axes. Blacksmith man...okay I'm pulling up the wiki...Alvor! How did I forget Alvor? Alvor charges up, an axe in hand, and Aria leaps forwards, spinning, her bent-ass claymore that the blacksmith could've helped her fix cutting said blacksmith in half, right in full view of his 5 or 9 year old daughter.

The girl screams, eyes wide, and the party of teen fox girls turns, looking maybe slightly guilty.

“Oh...oh crap,” Sunset says faintly.

“YOU!” Sonata leaps towards the child and lands in front of her. “You didn't see anything, got it?”

“Y-you k-k-” The girl stammers but Sonata, before the others can stop her, gently pats the girl's head. The girl of course cowers from her touch but that doesn't phase Sonata, never has!

“It's okay, shush, shush, you're okay. Just go back inside while we kill literally every non-child in this town, okay?” Sonata grins and the girl turns, tripping in her panic. She gets up and scrambles up to her front door as her mother comes out, axe...axe? Axe in hand. Shit it's an iron dagger.

“You...you killed my husband... you killed my husband! ” She starts to charge forwards but Sunset slaps her hand down with hers and pushes her up against the wall, growling into the taller woman's breasts.

“Listen...you can either get inside or...” Sunset blushes, the heaving chest of the terrified woman sparking instincts she'd rather not think about right now, “or you die out here with him, and leave that poor girl an orphan. Alone. With us. Is that really the Nord thing to do? Is abandoning her really what it means to die a courageous death?”

Sigrid (thanks, Wiki!) drops the dagger and Sunset lets her go. Sigrid spares them one glare before going into her house with her daughter and locking their place up.

An arrow wooshes past Sonata's head and the girls turn, only to see Faendal get burned to a crisp by Pinkie Pie.

“Wow, this magic fire spell is really strong!” Pinkie says giddily as the man turns to a blackened crisp.

“How many more of these losers-” Aria starts but Hod, in the distance, pulls out the big saw from his sawmill for some reason (and by some unknown method) and hurls it at them.

It whirls its way towards Aria but Adagio deflects it with her axe and it flies off, embedding itself into the upper story of The Golden Claw. Sorry “The Riverwood Trader,” which is missing its signature The Golden Claw.

“Don't you dare, ” Adagio snarls, hurling her axe at Hod. He catches it masterfully with his entire whole-ass face and dies like cash money so big blood. Adagio rolls her eyes and starts heading off to retrieve her axe but Gerdur gushes out of the darkness with her iron dagger and slashes across Adagio's stomach, spilling hot gushing blood out onto the cold ground.

“You'll pay! ” Gerdur roars, the Nord blood in her pumping fiercely—onto the ground because she just got ganked by Sunset, Aria, and Pinkie wielding an iron bar. Gerdur crumples to death, having died to death, and dies, dead, on the ground.

“Is she dead?” Sonata asks.

Like a Sonata.

Adagio holds her hand up and starts casting the healing spell, but stops as she notices Aria licking at her stomach, on her wound.

Aria closes her eyes, lovingly caressing the torn slit across Adagio's taut, smooth skin, happily lapping up the blood that tries to escape her lover's warm body.

Adagio, her lip trembling, finally casts the spell and seals herself back up (woundwise), then drags Aria upright by the collar with one hand. She puts her other hand on the small of Aria's back and pulls her close, landing a growling kiss on Aria's lips, the tates of...the taste of Adagio's own blood a metallic tang, tantalizing, on her tongue.

“That was the hottest stomach ouchie I've ever seen,” Sonata says, faintly.

“Y-yeah...I mean...anyway,” Sunset says.

“Man, having sexy thoughts sure seems weird!” Pinkie announces, dropping the iron bar covered in blood, hair, and brain matter that she'd used to bludgeon an innocent woman to death with moments before.

“Alright, anyone-” Sunset starts, but a battle-cry from the inn reminds her that there's an inn.

Embry crashes into the fence and passes out, drunk. Hadvar, clad in his imperial uniform and being, between the two of him and Ralof, rather unlucky for not having been attacked by a blue deer, charges, his sword brandished high. The five girls mow him down with their fire spells and he dies, never getting in range for a single swing.

“Okay seriously this fire spell is way OP with five people at once,” Sunset says with a dissatisfied sigh, wishing she could bump the difficulty up. All five's ears perk up as they hear a door open. They turn to see Camilla peek out of the Riverwood Trader. She sees five fox girls and a bunch of dead people, and closes then locks the door.

Unfortunately for her, Sonata exists, and Sonata exists her way over to the door and crashes through it with her shoulder, though it does hurt quite a bit and she curls up uselessly on the floor for a few moments.

Lucan, being the savvy businesman he is crap that's not spelled right, brings a potion over and offers it to her. “Oh...oh no, are you hurt? Here, this should help.”

“Lucan what are you-?” Camilla starts but Lucan shuts her up with a wave of his hand.

“I'm just attending to our kind guest here.” He reaches down to help Sonata up but she bounces up on her own as the others arrive, their claws twitching and ready to blast flames into the whole of the shop.

“Well,” Sunset says, “I mean, we're only killing people that attack us anyway. And it wouldn't hurt to actually maybe have a merchant of some kind?”

“But couldn't we just take all his stuff and his money?” Pinkie asks and Sonata beams, nodding.

“I mean...” Sunset says, “we could, but then we couldn't ask him stuff. We don't know how different this version of Skyrim is from the game world version.”

“Very well,” Adagio says, motioning for Sonata to step away from Lucan and Camilla. “Back off, Sonata.” She glances at Aria but Aria's waiting by her side, slightly hunched, blushing and looking at her with wide eyes above a thirsty smile.

“So, Lucan,” Sunset starts, moving closer. Lucan moves in front of Camilla, but then realizes what he's doing and tries to get behind her. She looks at him glaringly, with glaring, via glaring, and he shrugs.

“Y-yes?” He asks Sunset. Sonata drinks the potion and then starts stealing everything in sight. “H-hey!”

“Don't worry, Lucan,” Adagio says soothingly, smirking. “You've become one of this town's few residents. I'm sure you can recover your wares by robbing what's left of this town blind.”

Lucan says nothing for a moment, watching as his livelihood is stolen by a blue-skinned fox girl, and very aware that they could apparently kill him at any moment. Moments stretch out to infinite, like that one hair bug when physics are enabled on hair, and once Sonata's sufficiently weighed down with stolen good, the group heads out.

They stop by Alvor's blacksmith setup and loot a few bags he'd been using to carry things before his untimely death, then pack all they stole into it.

“Sunset...is...is this all really okay?” Pinkie asks.

“Eh...I mean, most of my playthroughs are pretty peaceful, but I've gone this route a few times too.”

“But aren't they like...actual people? I mean, this isn't a game, right?” Pinkie feels something tugging at the edge of her mind; probably her conscience.

Sunset puts a finger to the corner of her mouth in thought, then licks it. She gets distracted by a dragonfly and runs off to chase it and Pinkie follows. Sonata follows soon after, and the three of them splash around in the water, chasing bugs, conveniently forgetting all about moral dilemmas that the author doesn't want to write about.

Meanwhile, Aria glances around the town. She sees a young punk chilling out hiding behind his dog in a cowering-type gesture (one could even say he's cowering) off in the distance. Deciding that he's just a wimp who can't do a damn thing, she looks over at Adagio. Adagio catches her eye and looks back, so Aria slides her bandit armor down and bends over, making little whimpering sounds as she presents herself to Adagio.

Adagio isn't new to desire. But this...this is something far deeper. Primal.

She growls, her eyes wide and her eyes twitching, and moves forwards, grinding her leather armored crotch against Aria's bare body. The feel of the tough leather and metal studs nearly finishes Aria right there, yet there's more to it. It's not just the feel of the rough hide forcing her open and caressing her in a soft yet unyielding push, nor is it the hard, round metal studs passing across her clit and running across her slit, cool and unstoppable. It's the fact that it's Adagio doing it, that Adagio's forcing it all on her, willing though she be.

Aria knows that, if she said no right now, Adagio wouldn't listen, and that fact ramps up Aria's yearning for her.

“...um...Adagio...?”

“Shutup,” Adagio says. She grabs Aria by the waist and lifts her, bending her over Alvor's blacksmithing table....the one he uses to slap leather straps onto steel armor to improve the...steeliness of it.

Aria whimpers but obeys, her body trembling with anticipation. Adagio starts stripping while, a short distance away, the rest of the party discovers their first mudcrab.

“So for these-” Sunset starts but that's as far as she gets before Pinkie and Sonata torch it with flames. “Alright seriously we gotta ban that spell or something.”

“oooo crab!” Sonata yanks a leg off and starts munching on it, so Pinkie does the same. Seeing that they don't both immediately die, Sunset takes a leg for herself and has to admit that it isn't bad.

Meanwhile back at the porn, they're now both naked. No, Aria still has her top. Adagio runs her hands up it, her hands finding Aria's breasts and squeezing them, her index fingers running over the front of them, across her nipples.

Adagio growls and moves herself up behind Aria, pressing her hips up against Aria's tight, willing ass. Aria whines, holding her arms close to her chest, her fingers scratching at the wood underneath her.

Adagio rolls her hips forwards, doing little more than rubbing her mound against Aria's cheeks, but Aria bucks hard, her body going taut and her face collapsing against the table as a long moan escapes her. Adagio chuckles but turns as she hears the other three zip up, having heard the cum-motion. I did that on purpose.


Adagio looks back, glaring, daring any of the three to try and yank her off of Aria, and throwing in a threatening growl to boot.

The three stop, their eyes glued to Aria's exposed ass. IN a few moments, Sunset is reaching her hand down into her own armor, her fingers dancing towards her rising warmth; her growing passion. Pinkie can't quite seem to figure out what to do at first though, so she turns to Sunset.

“Hey Sunset...I'm...feeeling all tingly and angry and I don't know what to do.”

“A-ah,” Sunset says, her eyes still glued to Aria's body as she dips into herself and spreads her slickness across herself, teasingly close to her own clit. “You just uh...you know. Touch yourself.”

“I don't know how though....oh!” She brightens up. “Would this be a good time for us to have sex?”

Sunset turns to her at last, staring as her fingers freeze. “Um. If you'd be okay with that. Then...yes?”

“Yay!” Pinkie starts doffing her clothes; really hope that's the right word, also that's totally not where semicolons go. Speaking of colons, that was terrible, also Adagio has turned back to Aria's bent-over self and is running her fingers down Aria's slit, drawing piteous whines and literal, full-on tears from Aria, who begins sniffling.

“P-please, Adagio, please just...please just fuck me, c'mon,” Aria arches her back, looking back over her shoulder with a desperation that knocks Adagio breathless for a moment.

“Oh,” Adagio murmurs as she recovers. “Wouldn't you like that? But I do like to toy with my prey a bit, so...such a shame.” She flutters her fingers across Aria's lips and Aria shudders and squeaks, crying into the table.

Sunset turns to the now naked Pinkie and de-clothes herself as well, her whole body shaking as her mind fills with thoughts of Aria's. More and more, her nose seems to fill too with her, Aria's sweat and hair and sex a maddening cocktail of pure craving. “P-Pinkie I'm sorry, I...I might get a little rough-”

“Oh god please do Sunset I dunno what's happening but I can't think straight and I just I just-” Pinkie looks over at Adagio and Aria and growls low, “I just wanna throw Adagio off a cliff and do I don't even know what to Aria.”

“You'll know,” Sunset reassures her as she launches towards Pinkie, pinning her to the hard, wet ground beside the stream. She licks at Pinkie's face furiously, kissing the base of her neck as her legs spread Pinkie's wide. “You'll know, P-Pinkie, don't worry, just...still, I'm sorry, I'm...I'm sorry...”

“It's okay just...please make the feelings stop, I can't...I can't thinkie-pie,” Pinkie whimpers.

Sunset slams her pussy down on Pinkie, but lets a frustrated huff out as she doesn't get that same, crazed pleasure she got from doing the same to Aria. She thinks for a moment but turns with a growl as she hears someone stepping close to them.

“Need some um...help?” Sonata says softly, tears welling in her eyes.

“Sonata?” Sunset forgets, for the briefest moment, her arousal as she sees Sonata in a state she's never seen her in before.

Sunset would never admit it, because it's too mean, but she kinda assumed Sonata wasn't intelligent enough to feel genuinely sad. At least, not the way normal people feel sad.

Pretty messed up, Sunset Shimmer, geez.

“Heh,” Sonata says, giving a wobbly smile she clearly doesn't really feel. “Guess you all know what it's like now, huh? To...to want Aria and to have Aria...always pick someone else.”

“She didn't.” Sunset flips upright/face upright, getting off Pinkie for a moment and holding her hand out. “This all...this doesn't mean-”

“I know,” Sonata says, taking Sunset's hand. “It's not the same, really, and this isn't that but...it's kinda the same, in a way. And this hurt...this hurt's the same, too.”

“Sonata,” Sunset lifts her hand up and kisses it, then licks it a few times. She turns to Pinkie Pie. “Are you okay with-”

“Oh please please please Sonata please save us with your magic tongue please?” Pinkie begs and Sunset snorts.

“Hm, well,” Sonata teases, “okay, I guess.” She motions for Sunset to lay near Pinkie, with just enough room for Sonata to kneel down between them. “This'll be tough but I'll try and get you both, but then you gotta both do me. Maybe the two of you together can figure it out,” she snickers.

Snickers is now canonically a dialogue tag, if it wasn't before.

Meanwhile, back at the bench/table, Adagio's had enough fucking around with Aria with her fingers on the outside. She slips a finger into Aria and Aria nearly screams as her hips buck in a shattering orgasm, but Adagio's far from done. Her teeth...her lips pulling back in a smiling snarl, she pins Aria to the table, every writhing struggle from Aria amping Adagio's breathrate higher and higher and her heartrate harder and harder (also faster). She takes her thumb of the hand already in Aria and starts wedging it into Aria's ass, and Aria starts screaming for a whole different reason.

“F-fucking what the fuck are you-!”

Adagio cuts her off by lifting her off the table by the hair for a moment then slamming her back down, face first. She lifts and slams her two more times before Aria keeps herself still and quiet on her own, though her whole body is trembling and her pussy is squeezing hard on Adagio's fingers. Adagio jams her thumb in deeper and Aria gurgles, then whines as her body tightens and twists into another clenching orgasm, ending in a shuddering sob as Adagio stands tall, her thumb firmly shoved in as far as it'll go into Aria's dry ass.

“There we go...my girl,” Adagio chuckles. She presses herself up against her own hand, buried in Aria, and as the unstoppable surge of her own climax rises in her like dragonfire, she roars into the ceiling of the smithy, the hand not in Aria grabbing Aria's hips tight and drawing blood as every claw breaks skin.

Trying to avoid saying “meanwhile back at the,” the focus shifts back to the three on the ground, who definitely hear Aria's screams of pain and only get more aroused by it. Sonata's working both girls, a hand on/in each. Pinkie's looking away, covering her face, crying despite the crazed desire building in her like wave of blinding flame, while Sunset's leaning back, arching her neck and pushing her chest out, massaging and twisting one of her own nipples while Sonata's fingers work their magic, all around, teasing around her clit for a bit.

Done with the foreplay and judging each girl to be ready enough (and not yet overly stimulated...yet) Sonata starts running her fingers across their clits, her eyes darting back and forth between the two, narrowed in intense concentration, as she judges their reactions.

Pinkie Pie clenches her legs around Sonata's hand and Sonata pauses for a moment, smirking, but Sunset's more than ready, and clamps her claws into the dirt beside her hips, her waist pressing up, lifted by her legs, trying to get more and more of Sonata's hand, every finger.

“Well well,” Sonata purrs, “here ya go, Sunset Shimmer.” She works furiously at her, her thumb a soft, silken fiend against Sunset's clit while her fingers delve, ever so slightly, between Sunset's lips, for brief moments before drawing out and rubbing their knuckles against Sunset's slit.

“S-sorry, please don't stop,” Pinkie says, loosening her leggy-death-grip on Sonata's hand. Sonata lightly caresses Pinkie's clit and Pinkie gasps.

“It's okay. I know you uh..you know. After the last time,” Sonata says, trying to stay cheery but failing and looking off, away. While she knows some people get off on other's suffering, and while she knows she can be mean (and enjoys it), when it came to sex, Sonata never saw it before as something she would hurt someone with. Now, she knows that she's a bit more like Adagio than she'd like to be.

Though a bit of her flares up in bitter jealousy, hearing Aria, and wonders if maybe she should try to be more like Adagio after all.

“No no!” Pinkie says, which makes Sonata stop for a second but Pinkie grabs her hand and guides it to continue. “I mean no as in, that's not it. Well, maybe a little, but...I think it's just sex stuff in g-general. If it wasn't for this fox-girl stuff I dunno that it'd ever really, you know. Be my thing.”

Sonata smiles and starts working on Pinkie in earnest. By her side, Sunset Shimmer's brought Sonata's hand up to her lips and kisses it slowly. She draws one finger into her mouth, her teeth kept far away, then slowly draws it out through tightly puckered lips, sucking the finger powerfully. As it leaves her lips she licks it, tickling Sonata, then presses Sonata's hand against her cheek, humming as she idly fingers herself, slowly coming down off the high and trying to draw it out for just a bit more.

Pinkie starts bucking, rather quickly, and Sonata does her best to keep her hand where it needs to be, but thankfully she's helped by Pinkie herself, who clutches Sonata's hand as close to her as possible, pressing the finger that had started to sneak in, inside, deep. Pinkie squeaks as she rides the highest crest of the wave, letting out a shuddering sigh as she starts to come down. Sonata doesn't let it end so quickly, though, and her thumb quickly brings Pinkie to a second, smaller high, forcing a high-pitched whine from Pinkie, whose whole body writhes in the wet ground beside the stream.

As both girls attached to her hands finally recover, Sonata takes her hands back and lays down between them, face up. “Okay, my turn. C'mon!”

“Okay,” Sunset says, smiling confidently and holding a fist up enthusiastically. Sonata briefly hopes that Sunset isn't planning on fisting her, but she'll try anything thrice.

“Me too!” Pinkie says, waggling her fingers. “Okay, I'mma jam this into you so hard-”

“W-wait!” Sonata pleads. “Um...try to uh...do what I did, instead.”

“Oh, okay!” Pinkie nods and hops up with her crazy foxy agility, then hops sideways and plants her face between Sonata's legs. “Ready?”

“S-sure....yeah!” Sonata's excited. She's pretty sure Pinkie doesn't know what she's doing, but Sonata's been wrong about things once or twice before, so maybe Pinkie's actually really good at it.

As it turns out, Pinkie is very good at it. Accidentally, true, and Sonata's not exactly a hard lock to pick, but Pinkie treats her like cake frosting and lovingly starts licking at her clit, her eyes bright and wide, watching Sonata from between Sonata's legs.

“W-whoah, Pinkie Pie, that's really....o-okay ke-keep on like th-th-th-!” Sonata's hips pulse, but she doesn't get there fully.

Sunset caresses Sonata's cheek and Sonata's eyes go wide. A tear runs down her cheek, though she doesn't know why, and Sunset kisses it off of her, then gives the corner of her eye a gentle lick. “Hey...it's okay. Let us know if you wanna stop, okay?”

“You'll...?” Sonata's breath hitches. “W-wow...thank you.” She closes her eyes and holds her arms up, smiling, asking Sunset to hold her, hug her. Sunset smiles and lowers herself into Sonata's arms, holding her close and kissing the side of her neck.

Pinkie giggles and sets back to work, experimenting with her tongue. She laps at Sonata's slit for a bit, loving the taste, then dips her tongue in fully, first touching Sonata's clit with the tip then slowly drawing it down, splitting into Sonata's lips and swooping down in an arc into Sonata. She swims her tongue in the clenching, warm wetness for a bit before slipping it back out and rubbing her nose against Sonata's clit, giggling again as Sonata's whole body bucks and twists, nearly throwing Sunset off.

“This is fun!” Pinkie exclaims, then starts terrorizing Sonata's clit with her tongue, like a hummingbird's wingbeats.

It doesn't take long for Sonata to hit a mind-blanking orgasm. Twice. She writhes and spasms in Sunset's grip, crying into her shoulder, grinning ear to ear, licking at Sunset's cheek, her ear, her whole face, whispering thank you's over and over, confusing the hell out of Sunset. When she finally comes down (with a third mini squeezing her eyes and throat tight, on the way down), Sonata beams, her eyes closed, and lets out a sigh.

“Thank you...thank you both, so much. You're...you're so nice to me.” She sniffles and nuzzles into Sunset's chest, and Sunset pats her head, scratching her ear.

“Of course. Hey, anytime.” Sunset (and the other two) hear the sloshing of water as their companions return.

Aria's cheeks are flushed and she's scrunched down, nearly cowering next to Adagio, taking little steps as she goes, her legs close together.

Adagio is positively glowing. “So, now that we're all...properly focused after murdering most of Riverwood,” Adagio starts, “shall we start plotting our next move?”

Aria tugs at Adagio's sleeve and Adagio glances over as Aria speaks. “Could...could I wash myself really quick? I think I'm bleeding. Or, I know I'm bleeding.” Aria touches her anus lightly with a finger, giving a small jolt from the pain, and brings her hand back up. “Yep, bleeding.”

“Your sides, too,” Sonata says, giving the world's fakest smirk. “Gosh Aria, can't....can't even tell all the spots you're bleeding from...”

“Very well,” Adagio acquiesces. “Clean yourself off, we'll watch.”

Aria sighs, but she does give a tiny smile, and re-dis-robes below the waist. She sits in the shallow stream and looks back at the others, who're absolutely obsessed with trying to stare through the water at her naked crotch. “Ah. This again.”

“It really is ridiculous,” Adagio grumbles. “We're going to have to figure out how to either get back to our world, or at least survive here, but we'll have to do it while being completely obsessed with fucking you.”

“Is this what it's like to be a guy?” Sonata wonders out loud. She looks over at the obliterated body of Alvor, but he doesn't seem to feel like talking at the moment so she shrugs.

“C'mon, you know we get just as horny,” Aria says. “Well...maybe not quite so horny, but I doubt many guys get like this, either.”

“Yes, this is certainly something a few orders beyond my usual,” Adagio admits. “And despite all the warnings, I've never actually known a man to get so...animalistically turned-on, to the point where they couldn't resist. It tends to usually be that they can resist, they just choose not to, selfishly.”

“Oh, um...” Sunset starts, wondering how not to sound like a complete idiot. Good luck, Sunset, every passing year makes the author less and less sure how to manage, too. “So you've...been with guys?”

“We've played with a few,” Adagio says, toying with her nails and licking Aria's blood off of them. Other stuff too. “Never quite saw the appeal, but once in a while it's fun to turn things around on them.”

“Turn...?” Sunset wonders.

“Taking them, like they want to take us. Well not precisely...well, sometimes precisely, as close as anatomically possible, but being the dominant one.” Adagio gazes out across the stream-river. It's kinda small, c'mon. “Huh...you know, maybe I was meant to be the dominant one after all.”

“Turns,” Sunset says quickly, growling, and Adagio laughs.

“Yes, yes, I know. It's strange, though. I would've thought Sonata would've ended up being the one to be...dominated.” Adagio glances over at Sonata, who's still staring at Aria. “It'll be fun when your turn comes around, Sonata. I'm curious to see what you do with her.”

Aria looks up at Sonata, her nose twitching as she sniffs the air, her ears perking up and her lips trembling for a second. Sonata looks at her, her eyes sad, longing, and she sighs after a moment and looks away.

“Yeah...can't wait. Literally.” She sighs again.

Aria watches her for a time, then looks away, twiddling a lock of hair between two fingers. The other girls watch this whole exchange, quietly. Finally Adagio speaks, her voice soft.

“Sonata, I know I'm going to have to repeat myself again like this, because...you're Sonata, but this whole turns thing. Pretending she's our girlfriend, playing with her body...this is all just-”

“I know, I know, because we're dumb fox girls now.” Sonata sighs again again. “I just...when it's my turn...I dunno. I guess I don't want to get too excited.”

Aria turns back to her. “What's that mean? Hey,” she stands, still naked below the waist, and every other girl's shoulders rise as each growls low, with want. Aria looks between all of them and slowly slips her lower-armor back on (don't think too hard about it) then goes on. “Sonata, what's that mean? And don't try to play dumb out of it. If I don't get an answer...then I won't let you touch me, even if it's your turn.”

“That's...!” Sonata growls, clenching her eyes and raising her fists to her head for a moment before dropping them down against the ground in a huff. “Fine! I just don't want to get too excited, because it'll be everything I've ever wanted, but it won't be real, so I don't want to get too attached because it'll only be for a day before I have to give you up again and watch everyone else have their way with you while I have to sit out on the sidelines and want you every second of every day and just...just...there! You happy?” She crosses her arms across her chest and frumps, grumping, her eyes closed and a tight frown on her lips.

The other girls stare at her for a time, especially Aria. Yes, definitely especially Aria.

“Sonata...I mean...” Aria looks up at Adagio, then over at Sunset and Pinkie. “Hey...so...what if...ugh I can't...”

Adagio looks over at her. “I know. What if we change things up a bit?”

Sunset looks up at her. “Really not a big stickler for rules, huh?”

“It's an evolving situation,” Adagio says softly, and the rest quiet up, unnerved by Adagio's atypical gentleness. “We...really all want to just ravish you, again and again, Aria. But...” She looks over at Sonata. “I wouldn't want to lose you. And I wouldn't want to hurt you...not in that way.”

“So...so what do we do?” Sonata asks. Aria opens her mouth but shuts up, and the others look over at her.

She gives a small, quick shrug. “So...what if we like...me and...Sonata...then if anyone needs to uh, you know. Get with me, we go in turn order? God this is tough.”

“It'd be nice if we had more Arias!” Pinkie exclaims, because I love having her exclaim things.

“Hmm,” Adagio starts, a finger under chin. “We all want to be with her, sexually at least. We want to dominate her, and she wants us to dominate her. But we get jealous when someone else is with her. Then to add on to that, even beyond this whole were-kitsune thing, Sonata has feelings for her.”

“Nuh-uh!” Sonata proclaims. Everyone looks at her for a moment and she cocks her head. “Ohhhh wait. Yeah, you're right. Go on!”

“Anyway...we can barely share her as-is, but now we have to somehow accept Sonata as the one who gets to be with her, while still leaving some room for us to all have her. Sexually, at least. And Sonata, you're okay with the fact that we may sometimes ask to borrow your girlfriend so that we can absolutely demolish her body with ours and leave her a shuddering, heaving, wet mess of ruin?”

“Gwahhhh,” Sonata shivers. “Ooooo um okay. Um...I wanna watch though. And participate. And also lick her up afterwards.”

The others stare at her for a moment, their bodies denying the fact that they just had sex a few minutes ago and insisting, instead, that they haven't for a while and really should do something about that.

“Well...” Sunset says. “We can certainly try, right?”

“Sunset Shimmer,” Pinkie says, elbowing her, “you perv. But yes, let's try.”

“Actually,” Adagio says, a smile playing across her lips. “Why don't we try it now?” She reaches a hand down and helps Sonata up, then leads her to Aria. She joines their hands (god I want to fix that typo) and then proceeds to join their hands thogether...no.... no....

Adagio joins their hands together. Sonata looks into Aria's eyes and Aria watches her. Adagio nods at Sonata and steps back, and Sonata moves forwards, bumping her forehead to Aria's. Aria closes her eyes, lowering her head, and smiles, and Sonata lets out a low growl.

“Good, good,” Adagio says as Pinkie and Sunset come up and flank her, watching. “So now, we just need a way to figure out the whole....us getting with her thing, while these two are together. Since it's my turn, I'll try first.” She steps up and Sonata turns to her instinctually, growling, her lips pulling back as she moves in front of Aria. Adagio turns her head down but doesn't close her eyes, keeping them locked on Sonata's. “Sonata...now we do that thing where I get to use her. Got it?”

“No,” Sonata says immediately, but she blinks and her snarl softens a bit. “I mean...you don't tell me. You don't tell me what you want. I...I wanna be the one to say it.”

“Okay.” Adagio nods. “What do you want?”

“You...” Sonata turns back at Aria, who nuzzles close to her, then turns back to Adagio. “You. I want you to sexy time Aria. But I get to watch. And...and I get to have her right after, and you have to, to...to tell me I'm great at it.”

“Well now you're just making random demands,” Adagio sighs, rolling her eyes.

“Fine. I want you to fuck her, but I get to watch. And I'll totally have her right after, then you can just...go do whatever.”

“Um,” Sunset interjects, “so, how about us?”

“Huh?” Sonata cocks her head, still glaring.

“Well...I mean, it'll be Pinkie after that, right? After you? Then, me. Naturally.”

Aria, peeking out from behind Sonata, her cheek pressed pleasantly against Sonata's side, raises an eyebrow. “So, you are all gonna run a train on me.”

Sonata looks down at her. “Is that bad? I'll allow you to say no, I suppose, if you don't want that.”

Aria shudders and presses her face to Sonata again, lowering her eyes and letting out a soft whine, smiling. “Th-thank you. But, it's fine. I want it. Freaking...fox girl thing and all.”

“Okay then,” Sonata says, looking back out at the others. “So, as Aria's owner—” (Aria whimpers at this and presses her legs together, and each other girl can smell her rising desire) “—I've decided that the order for taking her, for now, will be Adagio, then me, then Pinkie, then Sunset.”

“I don't like this,” Adagio says, and the others turn towards her. “It feels an awful lot like you're the one in charge.”

“I'm only in charge of Aria,” Sonata counters with, and Aria's breath hitches. “You all can figure out who's in charge of the actual group or whatever.”

“Hmmm,” Adagio thinks for a moment. “Strangely...that does make me feel better. But you'll need to promise us that we'll be able to have her whenever we want. I need to know that you won't stop me from taking her, if I feel like it.”

“So long as she isn't currently having her mind banged out by someone else, and as long as she tells me she's up for it, then sure. And since she's been super into it lately, I don't think you'll have to worry about that second part,” Sonata says, snickering.

“Y-yeah, honestly,” Aria starts, “unless I'm literally like too sore or whatever. Oh, speaking of which.” She casts her heal spell for a few moments, then stops, smiling. “There. Now....what Adagio did to my insides is healed, so...this should actually make it pretty easy, actually.” She puts a hand to her forehead, sighing and closing her eyes for a moment. “Never thought I'd be this happy about finding out that it'll be easy for my friends and two losers to run a train on me.”

“Pfffft,” Pinkie laughs, “there aren't any trains in Skyrim. Right, Sunset?” She looks at Sunset, but both her and Adagio are trading looks of horror as memories of train whistles and a certain theme song break into their minds.

“Anyway,” Aria says. “So...about that whole...train thing.”

“Yes,” Adagio says, drawing closer. “But, perhaps let's find somewhere a little more...less in the middle of a stream.”

“Oh,” Sunset starts heading into the tiny town. “Well...seeing as how Faendal's uh. Super dead. We could probably use his house?”

Adagio nods and the group heads off, entering Faendal's house. It's unlocked, being the day time, and seeing as how he didn't lock it after heading off to flop around, wishing he could be with Camilla for some reason.

Aria starts undressing and it takes just about every tiny bit of willpower each girl has to not throw down then and there and lay claim to her. They manage to hold off, staring at her as she lays down in the bed, spreading her legs and holding her slit open, seemingly intent on getting them all to kill each other.

The sheer frenzy of the other girls to undress themselves results in them ripping their clothes to a tattered mess of bandit leather and string, which means they'll all need new duds after this.

“Okay okay,” Sonata says, leaping in front and turning to the others, arms outstretched. “I own this one, and I saw Adagio gets to go first. Got it?” She growls at the other two, who nod slightly but don't look away, their eyes now fixed on Sonata's, silently making their standing challenge known. Adagio comes forwards and starts slowly stepping to the side, around Sonata, her head level and her eyes on Sonata's. Sonata nods her head ever so slightly and Adagio proceeds past.

“Alright,” Adagio says. Behind her, Sonata turns, and the other two come up slightly, still staying a bit back. All three watch as Adagio positions herself between Aria's legs. She loops her hands up under Aria's knees and Aria whimpers, holding her hands up to her chest, pressing her breasts together, her eyes almost inviting Adagio down towards her. Adagio resists for the moment, more to toy with Aria than anything else, and Aria whines. Adagio comes down just a bit, whispering out huskily, “Right now, right here, Aria. You're mine.”

Aria reaches her hips up, whining, not lifting her torso up but still opening her mouth and working her lips, trying to get Adagio closer, close enough to kiss, close enough to lick, close enough to just smash her down into this godforsaken bed of a dead elf and fuck her through the floor. “A-Adagio...Adagio please...”

“I said you're mine, ” Adagio growls and Aria's body clenches, her wetness spreading on the sheets under her. “I'm not yours, Aria. I'll do what I want, when I want.”

“Okay,” Aria whispers, her hips working in slow circles, her eyes half-lidded in a trance.

Adagio nods and moves herself closer. She looks down at Aria's pussy in disdain, sighing, then gently touches her thumb to Aria's clit.

She may as well have pressed a live wire to Aria's entire everything, because the instant she touches Aria's clit, Aria's mind is well and truly gone. Her stomach tightens massively for a moment then releases, and her hips buck madly, her legs clamping around Adagio's hand for dear life. Her vision melts away and her mouth sings a whining, weak cry of shameless release. Her whole body spasms, over and over, and she isn't sure how long it lasts. It could be forever, it could be never, all she knows is that she's melted, melted, melted, completely well and truly gone indeed, melted around Adagio's hand, like wax on a sparking wire, all wet and dripping and arcing, dangerously, threatening to burst into flames, and she wishes, oh she wishes she could take Adagio's whole hand into herself, wishes Adagio would just crush her down, smash her breasts upon her breasts, with her breasts, crush her skull in with a kiss and tear her cheeks off with her fangs.

All wanting for ruin, Aria cums, and the girls would be surprised if all of Skyrim didn't hear.

When she comes down (down cums, cums down off her cums, cums cums leave me alone wahhhh) she slowly opens her eyes and sees Adagio smirking at her.

“Well well, Aria. Aren't we getting ahead of ourselves?” Adagio moves forwards then, so sudden, so fast, crushing Aria down beneath her chest, everything Aria's ever wanted but so fast, so soon, too soon but there's nothing she can do, she's helpless, she's helpless, and that's fine, because she isn't her own, anymore. She belongs to someone, to several someones, so she doesn't have to worry about all these silly little things like what hurts or what doesn't, what happens when. All she needs to do is follow, to accept, to be crushed and used. Adagio crushes down, her teeth glinting in a cruel, exquisitely cruel grin, her eyes alight with that trademark sadism as she watches Aria's flashing terror beneath her as she realizes that if she thought that first orgasm was a bit much, she's in for a ride.

The instant Adagio's pussy crashes against her, that blazing heat and lovely wetness, Aria realizes that yes. Indeed.

She's in for a ride. Because yes, indeed.

That first one was nothing, compared to this.

The other girls watch as, as far as they can tell, Aria fucking dies. They know she doesn't really, but the death wail of a whine she lets out, like the cry of a banshee heard through snow, cracks through each of them as Aria's body bucks and writhes under the snarling Adagio, whose own orgasm is all violent thrashing and slamming hips. Adagio slams herself down, again and again, before devolving to vicious grinding, her whole body trembling and twitching as she pushes through her orgasm and on to an even greater one, using Aria, crushing her everything into the bed to squeeze out every tiny moment of a blinding climax.


Alright now thanks to some very lovely people and the feeling the author has that her momentum is slowing, I have decided to take one hell of a turn with the plot.

There was a plot. I swear.

Stop looking at me like that.

Okay I'll check back to see where I was and...oh the fox girls were banging in Faendal's house.

Well...alright I'll at least let them have their fun. There'll be way more fox girl banging, don't worry, but I don't wanna cut them short now.

With a long, low growl, Adagio dismounts the whimpering, shuddering heap of hot-mess that is Aria post-orgasm. Sonata stands tall, puffing her chest out, and Adagio gives her a small nod as she passes. Sonata lets her by, then turns to Aria.

“Okay...okay me...me next.” Sonata lets out a shuddering breath and walks to the bed, sitting on it with her legs over the side.

Aria watches her, sitting up a bit against the headboard that Faendal now has if he didn't before. Sonata turns to her and gives her a weak smile, then holds her hand out.

Aria narrows her eyes a bit and reaches her hand out, and Sonata takes it in hers, lifting it to her lips and kissing Aria's knuckles, one by one, then flicking her tongue against the back of Aria's hand. Aria keeps watching, her lips tightening into a small frown, until Sonata raises Aria's hand further, to her cheek, and presses against it, humming.

“Aria,” Sonata whispers.

“...yeah, Sonata?” Aria says with a frustrated sigh, raising an eyebrow.

Sonata looks at her for a moment, wide-eyed, then turns away, letting Aria's hand go. “...oh, nevermind, um...alright, spread your legs, I guess.”

“Sonata, I'm fucking...I'm sick of this.” She kicks at Sonata, pushing her further on the bed. Sonata growls, swiping at Aria's leg.

Sonata sighs, hard, and stands. “Fine, I get it. I'm sorry I'm not as-”

“Will you-!” Aria reaches out across the bed, onto all fours, and drags Sonata back by the shoulders, setting her down. The other girls watch, enraptured by the drama before them.

Except Adagio, she's sitting in a chair, leaning her head back over the back of it, smiling at the ceiling with her eyes closed, basking in the afterglow.

Freakin Adagio.

Aria plops Sonata down...still/again and turns her. “Sonata, listen. I know...that 'listen' is usually like the hardest thing for you to do. Second hardest, under 'understand,' but I need you to do both, okay, you dumbass?”

Sonata looks at her and Aria reaches out, lifting her chin with a clawed fingernail.

Aria goes on, trying to keep her lips from pulling back in a grimace. “Sonata...we've been, all three of us, together, for so long. Never like that. Never in love. And now you're fucking acting like you've been in love with me since always, and you know what? I kinda...don't know why, and maybe it's just this, whatever bullshit we're going through, but...right now...I want to love you, okay? But you have to do something for me.”

“What?” Sonata asks instantly, eyes wide, desperation flittering through her voice and her heart. “Anything, anything, just-”

“You have to love yourself, Sonata. You gotta love yourself, because right now, with me like this...that's the only way this'll work. I can't...if you're gonna be down on yourself, if you're gonna be turning away and feeling sad, and acting like you're not good enough for me, acting like I can get better...with me like this, Sonata, if you do that, if you say those things, with or without saying them...I'll believe them.” She reaches out and shakes Sonata by a shoulder. “You have to feel like you deserve me. You have to believe it. I mean...” She stops shaking Sonata's shoulder and caresses it for a moment, her breath getting shallow. “It's....it's not like it isn't true,” she finishes softly.

Sonata stares at her, feeling something incredible welling up in her chest. She doesn't have the words. She may never have the words; if thousands of years couldn't give them to her, she doubts, very lot-ly, that anything could ever give her the words, but it's a good feeling, a happy feeling, and in that feeling she feels that yes, yes absolutely, she does deserve Aria.

She deserves Aria, and deserves to make Aria hers.

Aria sees a change come over Sonata as her wide-eyed, open-mouthed joy, her rare reaction to the few times she's learned a thing, shifts into a smirking, narrow-eyed confidence that shakes through Aria like no aphrodi..oh god. Aprodesiac shit close enough, like no afro-deezy-ack ever made by anypony anywhere.

I have to power through guys, send thoughts and prayers.

Aria scooches back and Sonata grabs her heels, growling, so Aria stays put, ducking her head in her shoulders and bowing her head low, looking up at Sonata for brief, cowering seconds before looking away, looking back after another few moments only to look away again, repeating the cycle, waiting for confirmation, for permission, to do something, anything, yet loving every single second that Sonata glares her down, daring her to try and reclaim any position that isn't firmly at the bottom, begging to get crushed.

Finally satisfied that Aria knows her place, Sonata puts her hand right on the middle...right in the middle of Aria's chest, her breath getting shallow and fast as Aria's does the same. She pughes holy...she pushes Aria down flat against the bed then keeps her there with a hand, her other hand, with one finger, running down the smooth, quivering path from between her breasts down to her navel. Her hand on Aria's stomach, Sonata growls, her eyes a mask of fury, hiding desire, her lips pulled back in a snarl.

Aria closes her eyes and squeezes her breasts together around Sonata's hand, letting out a whimper and pulsing her hips as she feels Sonata's claws prick at her chest. Sonata's other hand venturess lower and Aria opens her eyes, barely to slits, and mumbles out a reproach. “Sonata, you...you don't have to, with me like this. You can ju-”

“Shut...” Sonata growls, moving the hand on Aria's chest up to her mouth, clamping it down on Aria's lips, keeping her silent, killing the words that, forevermore, have been Sonata's foes, ever elusive, always divisive. “Shut up, Aria. Shut up. Shut....up....” She growls and moves her fingers down, making little swirling motions on Aria's mound, teasing her hips up and up, like a conductor of waves, pulling the swelling waters up and up and telling them when, if ever, they get to crash and break.

Finally she dips them lower, curling a finger and running her knuckle over Aria's clit, hard, on her way down to run it between Aria's slit and into her warmth, into her wetness. She makes it, but just barely, as Aria's body writhes, her legs thrown wide and shoving herself down, taking Sonata's barely-there knuckle into herself as well she can with the hand clamped on her mouth.

Sonata snarls and balls her hand into a fist, knowing it's too soon, knowing she's not prepped, but right now, through fox-magic, maybe, maybe it can work.

IT does, but not through fox magic.

More like sheer savage force, from both the giver and the taker. Sonata roars and barks, jamming her fist into Sonata as deep as it'll go, and Aria screams and whimpers, jamming herself down, spreading her legs wide and wider, trying to take it all, take everything, a crazed thought lingering at the back of her mind of how nice it'd be to just swallow Sonata whole, fist-first, 'look ma, no mouth!' if you get what I mean. They jam and twist and try so hard to relax but it doesn't get easier through such gentle means, and progresss is violent and bloody, all ripping and tearing despite so much slickness, so much slickness, and Sonata pushes and pushes, nearly punching herself into Aria's body. Sonata grabs a leg and wrestles it back, forces it down between her own, and clamps it tight as her fist pushes deeper, barely in at all yet still far too far, yet she doesn't care, she doesn't care, and her hand flies up and clamps again on Aria's mouth, shutting her up and damn that feels good to have mastery over words at last.

Wordless, Sonata moans, like a howl, haunting, as she rubs herself against Aria's thigh and cums on the spot, her body wracked and wrecked. She pushes herself down, laying across Aria, not moving her fist but keeping it there, pressing it down harder with her body as she nearly headbutts Aria's face. Sonata breathes heavy heat on Aria's tear-stained cheeks, and watches, wide-eyed, as Aria's eyelids flutter, faster and faster, her mouth blazing moisture into Sonata's palm.

As it turns out, Aria's orgasm started the very moment Sonata grazed her knuckle across Aria's clit, and from there it only went up, never ebbing, never fading, until now, at last, she can come down, though she wonder, for more than a moment, if maybe she never will; if maybe she died, so dead, so dead, out beyond where thoughts melt across time, memory lived and memory waiting, out in that blankness where her body stays and says goodbye, all pitiful jerking, such shameless motions amidst tears and whines, poor little fox, so craving for more, always wanting, always wanting.

She was there so long, at such great heights, that Aria can't believe, opening her eyes, that a ceiling could ever be so depressing. Yet she sees, right away, the eyes staring down into hers, eyes so familiar, full of memories, painful, beautiful, all of it, everything.

Aria wants nothing more. Aria needs nothing more. Just those eyes, gazing down forever. Yet Sonata doesn't let her have that, no siree. She yanks her fist out of Aria, though it didn't make it as deep as she'd have liked, and puts her hand on Aria's throat.

Sonata lays down across Aria, settling her pussy across Aria's, and Aria's body tries, so hard, to hurl Sonata through the ceiling with its titanic, upwards thrusts, over and over, desperate for more as Aria gets flung again out beyond thought, her breath a ragged scream into Sonata's palm and her hearbeat indeterminate thuds blending together into a single thrum, but now something new, blackness, beyond, as her scream of ecstasy flickers and fades, breath crushed into nothingness by Sonata's clawed hand.

Right before she passes out, Aria feels the clamping pressure on her neck ease, and Sonata's departing hands signal Aria's desperate gulps for air, painful in her throat, painful in her chest, all exquisite pain sliding in tears down her cheeks that Sonata licks up, nuzzling Aria's cheek with her nose.

“My silly dumb Aria,” Sonata chuckles because I'm pretty sure I made chuckles a canonical dialogue tag, and I know that 'canonical' here is nonsensical but you can't stop me, I've got mods!

Aria opens her mouth to protest but doesn't, can't, never wants to. Yes, she's dumb, whatever, she's whatever Sonata says she is, whatever Sonata wants her to be, and isn't it strange? Not so long ago, that couldn't be the case, was never the case. It was always Aria, correcting her, wanting her to change, wanting her better, but now...now...

Now Sonata's perfect, just as she is, and isn't it strange, how maybe that's how it always was, deep beneath denial and pride; that thought, that knowing, that a different Sonata isn't better at all. Sonata's Sonata, and that's all Aria wants.

So Aria chuckles and hums, and lets Sonata caress her, lets Sonata squeeze her down. But there's something different this time, so much deeper than desire, and she doesn't know how to say it.

So she says it anyway, plans be damned.

“I don't want anyone else,” she says softly at first, then louder, to all the rest. “I don't...I don't give a shit about this...whatever this is.”

“That won't work,” Adagio says, rising from the chair. “You know it won't.”

“I don't know anything,” Aria growls from beneath Sonata and Sonata turns, guarding her on the bed. “All I know is I want Sonata. Just...Sonata.”

“What if...we did both?” Sunset offers. Aria and Sonata cock their heads, while Pinkie wonders if an elf house is any different from a people house (that's racist Pinkie) and Adagio calculates her odds of ganking the lot of them, dismissing the thought as her heart gains rare traction over her loins.

I just really wanted to italicize/capitalize that. I may never know why.

A cackle comes, though it's more of a deep uproarious bellow of a laugh, because the author knows no restraint and thus has summoned Sheogorath into the fic.

A grinning man with smiling eyes and two-faced attire sprouts, fully formed, from Faendal's fireplace, and if Faendal didn't have a fireplace before well he sure does now.

“Well well welly welly well, if it isn't the well of hilarity that is all of you. And to what do I owe the dishonor of your trespass to your new native soil, dear Ms. Foxes, nee Wolves?” The Prince of Madness smiles unsmiling, his eyes inhuman mirth and a crushing fury all at once in ever-clashing tides of all things disparate.

“Magical toaster!” Pinkie shouts, raising her arms in the air in a cheer. They're all naked. Except Sheogorath, because he's the only one with class.

“Magical isekai toaster apparently,” Aria grumbles, and Sonata snerks at her. Like snerk. SNKER.

“Ah yes, ah yes, a roasty toasty path to a roasty toasty world,” Sheogorath strokes his beard and laughs as the fireplace behind him bursts to life (as in, fire, not actually a living fireplace, he's gotta start easy on the crazy). “One full now of dragons and crispy crunchy villagers, yet it's a different sort o' burnin' that's been burnin' a hole through yer minds, isn't it now? So tell me, anypony, what it be that's truly troublin' ye?”

“We!” Pinkie stands up on a table and points down at Aria, the others all two unnerved or (in Sonata's case) still trying to figure out what language he's speaking in to do much else. “We all wanna have the sexums with that one!”

Sheogorath, both hands on his cane now, laughs, and the girls see that the flickering shadows of the fireplace flicker out of time in impossible shapes, the shadows of nothing they see stretched and twisted into sickening shapes their minds crave, like an itch driving one to scratch their arm bloody. “Yes, yes, but of course, the sexums! Ah, ye'll have yer fill of each other two shakes of a tail past the end of forever, with a ratio like this. SO I'll tell you what I'll do, for the sake of all of you, and you'll tell me if it's true, that this world's truly new.” He summons a thing then, canon be damned, and it's nothing less than a staff, of three screaming faces, their expressions but facets of a greater, lesser whole. “You know the tempo, I'll be betting, so cry havoc, and loose the yiffs of yore!” He hands Sunset the dreaded Wabbajack and a bit of his hair catches fire, so he snuffs it out and vanishes in a pinch of black smoke.

“...don't you d-” Adagio starts but too late, Sunset's already Wabbajacking her.

It seems to have no effect, though, a common side effect of missing completely, and Adagio shoots forwards, grabbing at the dire artifiact. Oh dear. “Give me that! Don't you know-”

“It's temporary anyway, calm down,” Sunset giggles, not sure why she feels such an intense, calming joy from just the thought of using it. She fires at Pinkie and Pinkie doesn't manage to dodge, and Sunset feels an overwhelming woosh of sweet relaxation flood through her as Pinkie doesn't change at all.

At least, Sunset doesn't realize the change at first. Adagio does though, being closer after having launched herself at Sunset. Adagio growls and Pinkie whimpers, her already overwhelming arousal now shifted to something new, something much less aggressive but no less powerful. Pinkie lays down straight on the ground, pulsing her hips up, and Adagio mounts her before Sunset knows wtf is going on.

“H-hey!” Sunset growls and fires the Wabbajack at the now less-able-to-dodge Adagio, who takes a full Wabbajacking in the back as she wabba-jacks herself down against Pinkie's naked Pie. While Adagio's orgasm ends rather abruptly, Pinkie's doesn't, and she continues to hump upwards against Adagio's new form.

Which is a wereshark.

Adagio turns and Sunset feels more than a little terror racing through her, her hair standing on end and her tail puffing out (do foxes do that well now they do™) and her ears perking up as Adagio's soulless black eyes regard her, the rows upon rows of razor sharp teeth shining bone-white in the firelight.

“Uh...wasn't me,” Sunset claims, chucking the goddamn Wabbajack over to Sonata, of all people.

“Hey!” Sonata points the Wabbajack at Adagio and hits her again with it because this just isn't Adagio's day, and Adagio's heart-pounding roar of sheer sharky terror-inducing nightmare fuel is cut short as she gets turned into.

Into a slime girl.

“Sonata,” Adagio gurgles and surges forwards, oozing over Sonata's naked body.

“Wh-whoah!” Sonata tries to wriggle away but can't, and Aria, behind Sonata, tries to fend Adagio off but only gets stuck there too.

Transferring the Wabbajack back through her oozy body, Adagio presses Sonata down and spreads herself across Aria, marveling over how it feels to be free from the shackles of their strange fox-girl wants.

“Wh-whoah round t-two...” Sonata stammers, her voice breaking apart into a sensual moan as Adagio's body spreads across her. Every little motion Adagio makes is either a moist caress or a suctioning-grip, and Adagio has decided to absolutely abuse the time she has.

She spreads herself up into Sonata's slit as two bits of her clamp onto Sonata's nipples, suctioning gently. Sonata squeals and to her side Aria tries to escape but that's no good, no good at all, so Adagio enters her too and, just for good measure, splits a bit of herself off and slips up Aria's ass, a tendril wrapping around Aria's neck and keeping her there as each bit inside her pumps, furiously, coated in a natural lubricant that makes even Aria's tightly clenched back-door not a bit of a problem for Adagio's body to enter, again and again, spreading her just a bit, just a bit more, while her other bit suctions onto Aria's clit while also sloshing up into her, caressing her lips with rippling suction, all the way down then back up again.

Sonata loses it first, letting out a whining wail through smiling lips as she shudders against Adagio's jelly-like form. Aria ends soon after, howling into the roof as she sits impaled upon two madly working tentacles, with one wrapped 'round her neck and crushing hard but not hard enough, never hard enough, but she's too breathless to beg for it harder.

“Ya'll are perverts,” Sunset, who mounted Pinkie Pie and watched, amazed, as a blob banged the bajeezies out of her two foxgirl compatriots, now starts on Pinkie, gripping Pinkie's elbows tightly, drawing ten pricks of blood.

“S-Sunset, are...are you gonna smash me oh my gosh please say yes,” Pinkie whimpers, squeezing her breasts and wriggling around.

Sunset slids her arms around Pinkie and lowers herself, kissing Pinkie gently, gently, harder, harder and harder as she squeezes Pinkie close, her knees knocking Pinkie's legs aside. She presses one knee to Pinkie's pie (I'll never get sick of that, I'm so sorry) and Pinkie whines loud, her breath escaping through it. Through the whine. Don't type wine.

Wait did I seriously type “slids her arms” oh god no.

Sunset's knee slips because Pinkie's just a tad slippery so she reaches a hand down, her amateur fingers probing into Pinkie like a tarantula in a new enclosure trying to find the bounds of its new territory, like slowly reaching up, did you know they're blind? Anyway her fingers poke around but Pinkie's more than satisfied to take a firm pokering, and her hips buck, ruining what little accuracy Sunset had managed to accumulate over time. That's how accuracy works right? You just kinda jam your fingers around some girl's va-jee-jay-mc-na-en-stein-a-doodle and then Jerry Michulek is like “damn that's some good shooting,” I never really watched him but he's a fiend with a revolver, tell you what.

“Um Adagio, I think the author's losing her goddamn mind,” Sunset calls out to Adagio, who is a slime girl and who has decided that neither Sonata nor Aria has yet earned the right to not be double-penetrated by her magical tentacles of vibrating suctioning self-lubing bliss.

“No, Sunset Shimmer, this is all perfectly natural,” Adagio gurgles.

Sonata, her pussy and ass wholly stuffed by Adagio's slick fullness, whines into the bed beside Aria, who's faring much the same. They hold hands and meet eyes, smiling, together in their submission to Adagio's relentless, pumping sadism, their bodies thrashed and squeezed, and below the waist all wet ruin and sweet, shameless desolation.

“I love you, Aria,” Sonata whimpers and Aria bucks, squeezing Sonata's hand as a tear runs down her cheek, smiling.

“I love you too, dumbass,” Aria chuckles.

Canonical dialogue tage. Oh no.

A horse sound from outside, like a horse, stops them all for a moment. Also Adagio un-slime-girl'ing stops her for a bit.

Pinkie bucks and writhes and cums hard, grabbing Sunset down close to her, and Sunset realizes that the change that had made Pinkie into whatever Aria is has faded, but still, she just had sexums with Pinkie Pie, and that's...that's just swell, tell-you-whatums.

Adagio, now in full control of having bones, opens the door, not bothering to dress since they thrashed their clothes anyway. She slowly closes the door, then turns to Sunset.

“So...Epony was some sort of black horse, right? Or was it Epona?” Adagio asks.

“Uh...I really, really don't remember...wait...” Sunset, at GREAT effort, lifts herself up off Pinkie Pie, realizing now that between all the sweat and cum she's covered in, this stream is...well this stream is probably going to be fine, thank god for running water, but anyone drinking anything downstream is gonna have a big ol' handful of gamer girl water coming their way. Cumming their way. If God smites this keyboard I won't be surprised.

Sunset comes up and follow Adagio out, and the two behold a glorious horse, munching away on Faendal's lawn. Or his fenced in grass. (Pulls up wiki) yeah he's got that.

“Wait...” Sunset starts running off towards the inn and Adagio follows, neither caring, at all, that they're completely naked. Adagio thinks about stopping since she realizes now that she left the Wabbajack with Pinkie Pie and Sonata (and Aria probably won't stop either of them at this point) but she's far more interested in finding out if a certain young woman has suddenly taken up residence at the...the Sleeping Giant inn. You know, when you play it enough, you just kinda start forgetting things. Also my signs are really distracting, I have mods that do that. Get on my level.

Anyway.

Back at the jack, Pinkie Pie holds up the Wabbajack and looks between Sonata and Aria, both of whom are hanging out on the bed, watching her, Aria's head in Sonata's lap. Sonata strokes Aria's hair gently, her legs slightly apart and her crotch pulsing upwards at Aria's warm, fluffy hair.

Sonata realizes that she's basically trying to fuck Aria's hair but by golly that's fine by her.

“Alright, here we go!” Pinkie shoots the Wabbajack at Sonata but it does nothing. She shoots it at Aria and it does nothing times two, which is still nothing. “Aw, what gives?” She shakes the stick around and hears in her head the voice of the laughing man who had popped outta the fireplace like the world's fakest (also best) version of Santa Claus.

“Ah, ye got not the offerings to make, Pinkie Pie. Without a memory of an altered world to expel into ours, my staff won't be much more'n'a blunt object to ye.”

“Memory of an altered world?” Pinkie scratches her head with the Wabbajack. “Oh, are those those mods Sunset and Adgio wer...Adaggggggioio were talking about?”

“Ye got it, lass, and now, if you'll be so kind, do return the staff to those that can use it. Oh, but if you'd like, I could give you something not nearly as good.” The voice laughs in her head and Pinkie grins.

“Yay! I love not good things!” Pinkie exclaims, and both other girls, who can't hear the voice in Pinkie's head, are pretty sure she's lost it. Aria wonders though if she ever had an 'it' to lose.

One of Faendal's forks, from his fork collection, what don't believe me? Well I have the wiki pulled up here so clacky-clacky-he's got a fork collection now and one of them rises up and floats over to Pinkie, handle first. Pinkie takes it and the Wabbajack flees out a window, flying off towards Sunset and Adagio. Pinkie brandishes the fork high and cackles.

“Finally, the fork of...what was it again?” She waits for a moment for the voice in her head to tell her what her fork is called, and it does so. Of course. Why wouldn't it? What, yours doesn't?

Are you saying the voice in your head doesn't tell you the names of your forks?

I'm...so sorry to hear that.

“Finally, the Fork of Whore Compilations!” Pinkie announces to the metaverse.

“Oh nice,” Aria says from Sonata's lap. “Wonder if Adagio's on there somewhere.”

Sonata puts her hand over Aria's mouth, shuddering from the sensation of shutting Aria up, then runs her fingers across Aria's mouth-lips. I feel I need to specify at this point.

Meanwhile back at the Inn, Sona...Sunset Shimmer and Adagio, and definitely neither Sona nor Sonata, bust through the front door, though they're stuck for a moment as they both tried to come in at the same time and have become entangled in each other. Managing to get through without fucking each other—this time—they stand and behold the remains of Riverwood's population. Minus Dorthe. And her mom. Sigurd...?

Boy child and dog are cowering in the corner while Delphine and Orgnar stare at their nude intruders. Delphine snaps out of it first and points to Orgnar. “Watch the front, I'll be right back.”

“Oh I'll watch it alright,” Orgnar says, eyeing the naked teens up and down. There's another person here, though, who confirms both Sunset's and Adagio's suspicions.

Standing by the alchemy table that I think might be in there, and if it isn't, well it is now, is a giraffe-necked (slight hyperbole) young woman with long black hair, one they both know well.

“Recorder!” Sunset says, shimmering, and runs up to the unsuspecting young woman, putting on absolutely nothing.

Recorder turns and sees the naked teen charging her. “H-how do...wait, no, no! This isn't what it looks like! Why would you think I'd be the kind of girl to have naked women just fly at her? This is definitely not that kind of game!” Recorder tries to flee and succeeds, because Sunset Shimmer is too crushed to go stop her.

“Wow,” Adagio says, coming up beside her. Orgnar, or should I say Ogle-nar, is still staring, cleaning a glass with a rag that looks dirtier than the floor. “So sad. I take it she's one of your favorite companions? She sure doesn't seem into you, though.”

“Screw you,” Sunset growls, rounding on her. “And-”

The Wabbajack flies through the wall right about now and lands in Sunset's hand.

Adagio looks down at it, then up at Sunset. “Hey...now don't you-”

Sunset Wabbajacks-her-off and Adagio becomes a goddamn Daedroth.

“Oh...shit...” Sunset says faintly, looking up the massive, clawed form of the demonic gator towering over her.

Adagio-dile growls, a rumbling sound that shakes through the whole room, and backhands Sunset through the wall into Delphine's room. Delphine comes up the stairs, sword in hand, and turns first to the dazed Sunset laying in a heap against the wall and rubbing her shoulders then at the giant were-croc (not really) bearing down on her. “You....were sent by the Thalmor, weren't y-?”

Delphine doesn't get her dumbass question out though before her head is taken off in a single swipe from Croc-dagio, who's mighty scales and crushing claws ignore the pitiful Blades blade that Delphine tries to block the blow with.

Should be “whose.” Oh well.

“Oh thank god,” Sunset says, standing up and rubbing her butt. She stretches and walks over to Delphine, giving her a kick. “Stupidest....like, why would the Thalmor brings dragons back, seriously?”

Adagio just stares at her for a while, and eventually Sunset feels super awkward so she goes down into Delphine's secret chamber, that's not a euphemism, and starts pulling weapons out of their...locations and putting them in her...in her possession.

She comes up the stairs, laden with katanas, and Adagio eventually de-crocs.

“You know,” Adagio starts, “I'm wondering if the recent arrival of your beloved Recorder might be related to the use of the Wabbajack.”

“Huh,” Sunset turns the oh wait. Sunset drops the heap of katanas into Delphine's dead body, pointy-parts first, and retrieves the Wabbajack from the floor, making Adagio both look and feel super dumb.

Meanwhile, back at the fork of whore compilations, Pinkie and the others have left the house and found one terrified young woman with a not-precisely giraffe-lengthe neck, and are holding her up at fork-point.

“Now then,” Pinkie says, smirking, as her two foxy companions empty the woman's pockets. “You're gonna tell us how to make my fork do magical things, or we're gonna have to fork you silly.”

“I...um...” Recorder stammers, looking between the fox girls. Sonata rubs her face along Recorder's thighs and Recorder yelps, but a sound in the distance distracts each girl.

A whistle, loud, and a song, from long ago.

“Hey, I remember that sh-” Pinkie starts as Thomas the Tank Engine descends from the clouds, roaring out in Dovah-nese.

Then translating himself. “Ah the smell of blood and death. Good to know you're acquainted with your inevitable fate, mortals!” The train breathes fire across the buildings in the town, setting them aflame, and Adagio/Sunset come out of the Sleeping Giant Inn, both holding as many katanas as they can wield as weapons.

Which means four, two each.

No. Wait. This is Nano.

They have three each, one in each hand and one in their mouths, Sif style.

Oh now shit's on.


I can't believe I left it off with two Sif-style fox girls and Thomas the Tank Engine, then proceeded to do almost zero writing on this, the seventh day of Nano.

Thomas rolls down across Alvor's house, the flaming thatch thrown far and wide as his steel un-tracked wheels crush the hose..house beneath his weight.

Alvor's living relatives escape (Dorthe? Dorthe and uh...Sigurd probably) as Thomas whistles aggresively, spinning in place, his metal wheels shredding the wood, throwing up splinters and broken, shattered boards across the fiery hellscape of a town that once was Riverwood.

Adagio leaps into the fray first, which wasn't a fray before but which is now because now there's actually people fighting (fox girls and a train are people damn you) and slashes at Thomas's steely hide, but literally this time; it's actually metal, which make it rather hard to cut with a katana.

“Wait a minute,” Sunset says, dropping the sword out of her mouth before saying it so she can say it. She drops the other katanas too and whips out Wabbajack.

She (the author) then remembers that Orgnar is a thing, and a thing to happened to see Delphine get murdered right before him. Orgnar, from out of the burning Sleeping (Despite Burning) Giant Inn, charges with a claymore he found lying around (Nords amirite). Sunset Wabbajacks him and he becomes a slaughterfish next to a claymore. She picks him up and throws him at Thomas, who crushes him under a wheel.

“Anyway,” Sunset says, unsure why turning a man into a fish then getting him killed by a sentient train feels so damned good, Wabbajacks the dra...the train, just for shucks and fuckles.

It shouldn't work.

But it does.

Thomas the Tank Engine becomes Thomas the Goat, and is promptly hurled by Adagio towards Sonata, who briefly stops rubbing her face against Recorder long enough to snag the goat out of the air with her teeth and worry it about, ripping its throat out.

The dragon's soul (because it was secretly a dragon, didn't see that coming did you, me?) enters the girls, but Sunset's a little distracted.

You see, she's learned, just now, how the mods are sneaking into the game. She learned this because she becomes suddenly very aware of a new power she possesses, a new power she hopes eludes her friends' notice in their own minds.

Sunset realizes that every time she uses the Wabbajack, the world gets a new mod. Deciding to test something out, she starts hunting around for a mudcrab or something to Jack but soons find herself hooooo boy messed that one up surrounded by the Dazzlings and Pinkie, also Recorder.

“Recorder!” Sunset tries to hide her naked body behind the staff but it'll be a cold day in Adagio's blaze before that happens (don't think about that one too much) so she does the next best thing, Wabbajacking Recorder while thinking about a mod she wants to install into real life.

It works. It works because, well, lemme tell you how she knows. Pinkie grabs her suddenly infinitely fluffier tail, her eyes going wide. Each girl notes now that not only are her/their tails way fluffier, their ears are too.

“Yay!” Sunset says as Recorder, who is now a mudcrab, starts-

Oh...oh Sunset has an idea now.

She turns the Wabbajack to Adagio but Adagio's had enough of her shit and gut-punches her, slapping her bent-over self to the shore and yanking the Wabbajack out of her grip. Even as she falls, though, Sunset calls up to Adagio, “If you think about a mod when you use it, it installs that mod in the world, otherwise you just get a random one!”

Adago's eyes go wide but she doesn't stay stunned for long and quickly Wabbajacks Pinkie Pie into a random (she doesn't get to choose that) and as it turns out “a random” is a Winged Twilight, which is like a harpy but more scaly and less feathery and with a long, venemous tail. Unless...venemous...venomous...okway th...okay there we go, unless harpies already have vene...venomous tails in which case it's exactly like a harpy. Other than the ways it's different.

Today is just not my day, folks.

It is sorta Sunset's day, though, because Adagio apparently had the same plan as guys I spelled Adagio “Adago” earlier the same plan as Sunset and the mudcrab that was previously Recorder now has a top hat and monocle on.

“Excellent,” Adagio says, preparing to Wabbajack the crab, but Pinkie's venomous (this'll be awkward if they don't have venom and their tails just look like that for no reason) tail jabs Adagio in the wrist as Pinkie cackles in a haunting, airy voice, like a dying songbird lost adrift in the deep ashes of lost memories. Yes, that's a very specific sound, thank you.

If it's just adrift in the ashes of lost burned-ass wood it's gonna sound different, okay?

Moving on.

Sonata, her omg adorable puffy-wuffy-tail-a-doodle floofing out behind her, jumps and snags the Wabbajack. She turns it to Adagio as Adagio staggers and Adagio and Sunset both yell in unison: “Sonata imagine if that mudcrab cursed a lot whenever you hit it!” As Adagio gets Wabbajacked into an Ascended Sleeper.

“AHHHHHHH!” The other girls, except Sunset, scream as Adagio turns her many-tentacled, hulking face and hunched form towards the other girls, the any-number-of empty looking eye-holes staring, eyeless, at each of them all at once; the void, in truth, looking back.

Aria glares at Sonata, her eyes panicked, “Sonata did you seriously just turn fucking Adagio into a tentacle monster?”

“...maybe!” Sonata says. She tries to Wabbajack Adagio but Adagio slaps the Wabbajack out of her hands and sends it off into the stream, where it promptly tries to escape.

Recorder-crab caches … catches it in her claw and (one of several, at least two) but Aria leaps on her and punches a hand through the crab's carapace, gouging out its equivalent of a brain.

“Ow, fuck!” The crab curses as it dies, but it's hard to hear over Sunset's pained wail of misery.

“Recorder, nooooooooo!” Sunset cries out.

Meanwhile, Adagio has decided that she's only got a short time as a tentacle monster, and there's very specific things Adagio does when she has a short time.

Spoiler alert: it's non-con.


“Sonata,” Adagio says. Somehow. Her tentacles vibrate around an unseen mouthhole, the echoes of their oscillating, undulating tubicles creating a voice like wet corn slapping around in a drier.

“...the hell?” Aria says, looking at that last line.

“Wh-wh-what, Adagio-oh...” Sonata's wrapped up in Adagio's tentacles now. Aria slashes down, severing a forest of well...a forest of a few of them with her sharp claws. Adagio turns to her but Aria swoops low and around slashing at the water behind Adagio, the loud sound of it startling the slow-to-turn Adagio, who trips and lands tentacles first down on Sonata.

“How is this helping me?!” Sonata says, then gasps as Adagio holds her close with her consenticles.

“Aria,” Adagio shudder-says through her appendages. “Listen. I don't want to hurt you right now. Either of you. I won't be like this for long so...just like I was with the slime girl-”

“Oh no, hell no...” Aria growls. “Sonata and me just fucking figured out we want to be with each other then all this bullshit started happening and...and what the hell does this do again?” She shoots it at Adagio, turning Adagio into gimme one sec I gotta pull up some sorta bestiary um a ghost.

Aria didn't kill her, Adagio just...becomes a ghost.

“That does it!” Adagio scream/wails ghostily, raising her hand. The Wabbajack is lifted out of Aria's hands and spins in the air, held fast in Adagio's telekinetic grip that ghosts now have (if they didn't before for some reason, I mean c'mon, how you think they're holding stuff up muscles?). Adagio flicks her wrist and the highly dangerous Daedric artifact of the Prince of Madness goes giddily twirling off into the direction of “later, Riverwood!” out past the smoldering wreckage of the Sleeping Giant Inn.

Adagio turns and yanks Aria towards her, slapping her on the ground beside Sonata, keeping them both pinned with her ghosty powers. “You two ruined my chances of tentacular domination, and now...you'll pay. ”

“And here I thought you said you weren't going to h-hurt us,” Aria manages, the pressure of Adagio's power crushing the wind out of her.

Hearing this, Adagio immediatey lets up, though she doesn't release them completely from the ground. She sighs, a sound like (oh here we go) a whispered prayer across a cold, dead void. “I don't want to hurt you. But every time...it seems like it goes that way, doesn't it. You know what I like. You know what I'm like. I just wish...you knew it meant something to me. To be with you two. That it wouldn't be the same with just anyone else.”

“Adagio...you like hurting us,” Aria says softly, glaring. “You literally get off on making us feel pain.”

“That's...” Adagio lets them up, lowering her arms and trying to hug them to herself. She turns away in a huff, finding no solace in her immaterial form's touch. “It's who I am. It's who I've always been. And,” she turns back, glaring, as she goes on, “it's who you two are, too. Maybe not as strongly, mabye not as...obviously. But all these years of taking from others, from using them to make us feel powerful, to make us feel loved. You can't honestly tell me you didn't enjoy it.”

The two on the ground look at each other, then join their hands.

Sonata speaks first, though she can't meet Adagio's eyes. Partly because she can barely see them since it's daytime right now and Adagio's kinda blue-ish but pretty see-through overall. “I don't know what to do. And I know, okay? 'Haha, Sonata doesn't know a thing, big surprise.' But really. I mean...really all the other times too but really this time mostly! I want to...” She glances over at Aria, squeezing her hand. “I want to be with Aria. And it might be because I'm stupid, but I think she wants to be with me, too.”

In the distance, Pinkie Pie jabs her fork into Recorder's dead, crabby body, as Sunset Shimmer cries out, begging for the fork's magical powers to awaken and raise the crab.

“You're not stupid,” Aria murmurs, pressing her shoulder up against her as they sit on the shore, Adagio towering over them.

Adagio's ghost form fades and she sighs. “She is stupid, but she's right. How I wish...I could just leave you two alone.” She sniffs the air and that maddening scent of Aria, always Aria, fills her nostrils. “But...you know I can't, don't you?” She squats down low in front of them, the stream through Riverwood just an inch or two away from her naked butt. “You know I can't stop wanting her. None of us can.”

“But you can resist, right?” Sonata asks, but though Aria puts her head on Sonata's shoulder, she gives it a few shakes, too.

“They can't, though. If it was just...they found me hot or something, then yeah. But this is something else. And...Sonata, look,” she holds a hand up and presses it against her chest, leaning onto Sonata's shoulder and giving a soft whimper. “S-Sonata please...please don't hate me. All these years I've called you fucking stupid and-”

“I could nev-” Sonata starts but Aria cuts her off with a lick on the neck.

“Yeah, well, if you can't hate me, then that kinda proves you're stupid, huh?” She laughs, going on in a soft voice. “But...it's not just that they can't resist. I kinda...don't want them to, now that I think of it.”

“What? But-?”

Aria stands, turning away from the both of them, certain that they're both staring at her ass. She's certain, too, that that simple fact excites her like nothing she's ever known before coming here. “I know what I said, that I just wanted to be with you, but...the more I think about it, the more...it just feels wrong. Maybe not overall, but for here, while we're dealing with...with this. It just feels like...ugh why's this gotta be so hard?” Aria sighs, turning back around and indeed catching them both gazing at her body, as if deep in thought.

Which might be believable for Adagio. Sonata...not so much.

But as it turns out, Sonata is quite deep in thought, though again the hatefulness of language gets in the way of getting it out. Still, she tries, and that, more than anything, is just so very Sonata. “I get jealous when you're with the others, but...they're jealous too when you're with me. But their 'jealous' feels are because they just wanna rub ya. Mine are because...you know. But...maybe it's okay. I guess...it's not so bad, as long as I know you feel the same about me. As long as I know I'm good enough.”

“You are, ” Aria says, stepping close to her and lighting her fingers softly upon the skin around her navel, drawing a shudder from Sonata. “You are, Sonata. I mean, you're dumb as shit, but...I kinda like that about you.”

“Hey! You three!” Pinkie Pie calls out. The Dazzlings turn and see Pinkie and Sunset emerging from the wreckage of the inn, having avoided catching fire thanks to the author's desire for them to do so.

Also they have foxy agility, and it's super cold so the fire's struggling a bit, even though it's dragon fire.

Shush.

Sunset starts handing out clothes, and the Dazzlings note that Sunset's re-acquired the Wabbajack but say nothing at the moment.

“Figured it'd start getting cold here pretty soon,” Sunset says, looking out over the horizon.

“So,” Adagio says, slipping into some of Delphine's underwear and preparing to don one of her plain, commoner dresses. “The Wabbajack can make mods reality.”

“Yeah...” Sunset places the Wabbajack down for a moment, looking between everyone, but no one seems like they're too keen on stealing it so she dresses with the others as she goes on, “which might mean we can get pretty powerful if we just install mods we know we can abuse.”

“Like the Ion Cannon one.” Adagio casually runs a hair through her poofy hair and Sunset freezes in place, her head not quite through the neckhole of her dress.

She pops it through slowly, looking up at Adagio warily. “I'm...not sure what you-?”

“Yes you are. But we should probably...well...what do you think the odds are that we'll annihilate each other with it?”

The three other girls, all dressing as well (Pinkie and Aria got dresses too, while Sonata got a full set of leather armor and is distracted with playing around with all the buckles) all watch the two nerds as they talk about nerdy things.

“Not sure,” Sunset says with a sigh. “Kinda hard...to...oh...wait a minute.” Sunset looks around as the others get their clothes on. “Really wish I had something to just Jack but-”

“M-!” Sonata starts but Sunset growls at her.

“I swear to god if it's some sort about j-jacking some...some dude off, I'mma turn you into...something. Something you won't like, probably!”

Sonata smiles, keeping her mouth shut but puffing her cheeks out for a moment.

Aria sighs. “Goddamnit Sonata. Anyway, if you want, couldn't we just like...grab a chicken or something?”

“On it!” Pinkie Pie scampers off, and after about fifteen awkward minutes she returns with a live rabbit thrashing about in her hands.

“Pinkie!” Sunset says with an exasperated sigh. “Alright, well, hold it still for a second. Sorry, bun bun,” Sunset says sadly as she Wabbajacks the bunny, thinking of a mod.

Okay she Wabbajacks it several times thinking of several mods. When she's done, after the bunny turned into a series of sometimes terrifying things (but never long enough to wreak much havoc before getting 'jacked again), the bun bun finds itself in the form of...

Of a Spider Daedra.

Guess it'll be in a form long enough to wreak havoc after all.

The girls scream, except for Adagio and Pinkie Pie.

However, Sunset's scream ends quick as she launches into action. First, she uses Ion Cannon.

That's it. Spider's gonna die.

“Hey guys uh I'll...I'll be right back!” Sunset starts sprinting off and Adagio does too while Pinkie hops around the Spider Daedra as it slashes at her with its sharp spider legs, rearing up and slapping them down hard, cracking and shattering stone along the riverside. As Pinkie giggles and dances, you know...I think I might be whumping Pinkie Pie at this rate...anyway, the colors of the world start to fade out and take on a notably blue hue. White, sparkling flickers flit through the air like butterflies burning to ashes in an icy dawn, and Pinkie ooo's and ahh's. A column of light, white and terrible, builds in the middle.


“Sunset Shimmer!” Pinkie calls out as she gets annihilated by the column of fatal white light crashing down from space. The Spider Daedra gets blasted apart too.

Probably.

To be honest, none of the girls really see it, aside from Pinkie Pie, and she's a little flying dead through the air at the moment.

Look, there's a reason I didn't tag major character death, hang in there.

Although I'll probably go “did not choose to warn,” let's be honest.

Sunset had run off almost immediately, and Adagio, guessing Sunset's plan, had done the same. Aria and Sonata, too, had sensed something amiss (aside from the spider lady) and fled.

Only Pinkie Pie, still hopping around the daedra, didn't run, and so of course she was in ground zero when the orbital ion cannon that Sunset Shimmer had activated with her mind fired down with titanic force, blasting the smoldering ruin that was once Riverwood into an arcing, sparking crater.

It does lightning damage I think for some reason.

Anyway.

Sunset rushes back, Pinkie's voice in her ears and a creeping horror starting to cloud her mind as her eyes dart around the obliterated ruin that was once the town. She thinks she sees, at last, a pink puff of hair, all by its lonesome and hanging, burning, from a blasted-off branch thrown wide by the force of the energy beam's impact.

“Okay, heh, it's fine, it's fine, it's fine,” Sunset repeats to herself endlessly as she searches her mind, using the mod that allows her to add spellbooks to her inventory. A spellbook pops into existence and she reads the nothingness within it, the spell snapping into her mind. She uses, again, the mod that lets her search and add things and adds a ring, then, out of a flickering consideration for her compatriots, summons four more of the same.

“It's fine, it's fine, it's fine, it's fine,” Sunset keeps muttering to herself. She slips a ring on and begins to cast a spell, a spell she knows she shoudn't be able to cast but can, thanks to the ring.

She casts the spell on the flaming bit of her friend's bubblegum pink hair, the only bit of her she can find, and in a moment, golden light loops and swirls around the clump of singed hair, regrowing Pinkie Pie.

“Thank god...thank god...” Sunset breaks down then into wracking sobs but when she tries to reach out to Pinkie Pie, Pinkie's already running off. “P-Pinkie?”

Pinkie grabs the Wabbajack from where it's laying and points it at Sunset, and that's when Sunset notices the yellow, glinting eyes of a memorable Prince. Pinkie grins a manic grin and fires the Wabbajack at Sunset and it hits her full force, shifting her form all around her.

The Dazzlings come back and see an unusually evil-looking Pinkie Pie cackling madly while Sunset, who is now a mammoth, looks down morosely at her exploded clothes. Pinkie summons a toaster and Sheogorath leaves her body, running off into the woods.

“The magical isekai toaster is mine now, ye twice-imprisoned invaders of worlds, all thanks to the empty mind of the little equine reflection there!” Sheogorath, now in possession of a magical isekai toaster, cackles and escapes.

“Guys...” Sunset starts, summoning a variety of DX Deserter Nightingale armors (in a wide range of like 4 or 5 colors). The party starts getting dressed into the more sensual, revealing armors (in a wide variety of like 2 or 3 levels of revealing-ness) and Sunset continues. Which is like five minutes later. “This...is messed-”

“Sunset,” Pinkie says in a soft, wavering voice. “Why...did you kill me?”

Sunset's eyes go wide as she tries to speak but can't.

“Look...we've all been making mistakes,” Adagio says. She crosses her arms across her chest, sighing. “And...in the last bit, things have been,” she motions around at the explode-ified Riverwood, “a bit insane. So let's try to refocus, alright?”

“Yeah, sure,” Pinkie says, her voice still a low, uneven, tremoring thing, but she continues, “let's refocus, of course. Right after Sunset Shimmer explains to me why she thought it'd be okay to kill me.”

“Pinkie I-” Sunset starts but Pinkie cuts her off with a choked growl, like a high-pitched squeak.

“Sunset Shimmer. If you say you did it because you could bring me back...that won't be good enough. Do you...do you u-understand m-me, Sunset Shimmer?” Pinkie moves forwards, her hands tensed into claws.

Sunset tries not to move, not to start speaking, not to blink. She tries everything to stay as still as possible, to not betray the truth: that Pinkie had guessed, quite unfortunately, the reason why Sunset Shimmer had thought it okay to kill her.

Sunset doesn't understand it herself, and she wonders at that. But the answer falls into place all too easily; the reason behind the veil that had drifted down in front of her eyes, that had made it seem okay for her to kill her friend.

“Pinkie...I think Sheogorath was messing with us for a bit there. I don't know what I was thinking but...looking back, none of it really makes sense, does it? Did...did you feel normal, during all that?” Sunset grips a lock of her hair and strokes it (her own hair), trying to calm herself, destress a bit.

Pinkie stares hard at her for a while, her narrowed eyes implacable. Then she sighs, and then she smiles, and Sunset feels a flare of warmth go through her chest, seeing that.

Pinkie, for her part, knows a few things. Sunset Shimmer probably did kill her because she thought it'd be okay, yeah. Very true. But also true is how Pinkie's pretty sure she wasn't thinking very clearly either, for a while. She looks down into her hand and sees the Wabbajack is gone, and shrugs up at Sunset. “Well, fair enough! If we can all go back to-”

Aria cuts her off. “To being stuck in this shitty winter wonderland, with all of you trying to fuck me to death at every opportunity?”

The other girls are quiet for a bit, and Aria realizes it's because they're probably imagining fucking her to death, so she groans.

Sonata reaches her hand out and takes Aria's shoulder in it forcefully. “Hey. You. Listen.”

Aria glares at her but obeys, a fluttering feeling going through her chest.

“We're going to figure this out. Look, we've gotten a lot of it down. We all wanna have sex with you. We're okay with not having sex with you, if we're going in turns, like that first night with Sunset.”

Sunset chimes in, “Are...are we gonna just let it be Sonata who lays down the whole recap?”

The other girls just nod, except Sonata, she just smiles vacantly, then goes on.

“Anyway, we're okay with turns. I, myself, have been feeling really bleh from it all though, because I l-ove...your...um...you. I love your you, Aria.” Sonata grins wide and squeezes her eyes shut, feeling the rush of admitting her love again to someone who feels the same.

“Uh, yeah. I um...you know. Whatever your whatever too,” Aria says back, looking away and blushing but stepping closer to Sonata.

“Heheheheheh dawwwww you softie,” Sonata coos, wrapping her arm around Aria's waist. She turns back to the others as she goes on, “So since I love her, she's my girlfriend. But since we're all horny kitsunes, or whatever, we'll take turns banging the va-jee-jies out of her, okay?”

The other girls all nod vigorously, their eyes running down the tight leather curves of her 'armor' (if you don't know, trust me, it needs the quotation marks). She had, of course, gone for the most revealing version, albeit the most revealing one with fishnet webbing all over.

Which really doesn't make it less sexy, at all. C'mon.

It's the opposite.

“S-speaking of which,” Sunset stammers. “It's...well I guess it's not cold but-”

“Um I'm cold,” Pinkie says, shivering. The other girls seem to agree, and Sunset realizes why, instantly.

“Oh! Um, here. You all can have these.” She passes out a ring to each and they don them, feeling immediately impervious to the cold.

Adagio raises an eyebrow and narrows her eyes at Sunset, who tries to whistle nonchalantly in that incredibly chalant way people do. “Sunset Shimmer...what ring might this be?”

“Oh you know...a um...a normal...one?” She tries to smile but it comes out just as suspicious looking as her incredibly suspicious whistling. She sighs, crossing her hands over her chest but looking down in defeat. Also shame. “Alright it's the Ring of Andragon.”

Adagio shoots forwards, gripping Sunset's arms tightly. “Say it's the Ring of Akatosh.”

“Huh?” Sunset cocks her head, trying to escape Adagio's grip but failing. “But it's-”

“Sunset Shimmer I need you, right now, to just say it's the Ring of Akatosh. Whatever the truth might be doesn't matter. Just...if you say it's Andragon then-”

“OH oh hecky heck um yeah...yeah Ring of Akatosh.” Sunset, her heart hammering in her chest from panic, sighs loud, patting Adagio's elbows. Like a fucking weirdo. “Thanks, Adagio, I-”

“No need to thank me, nothing happened. Nothing at all. Ring of Akatosh.” Adagio nods and steps back. “Anyway, since cold and...well, all magic now can't touch us, and since we can cast spells for no cost-”

“We can what?” Aria says, staring.

“The Ring of Akatosh is a definitely legitimate item used for testing purposes,” Sunset assures them.

Assures them that she's a filthy cheater (like the author).

Aria rolls her eyes but smiles and chuckles. “Heh, well...cool, whatever. But it'd be great if we had like...actually good spells.”

Adagio motions to Sunset, and while Sunset knows Adagio probably could do it herself, she sighs and summons a horde of spellbooks, one copy of every spell for several mods for each girl.

“Reading time,” Sunset says with a weak jazz-hands hand motion. Sonata tries to flee but Adagio catches her instantly and drags her back.

“This'll be easy,” Adagio says, grabbing the first in Sonata's stack. She opens it up and jams it in Sonata's face and Sonata learns a powerful magic spell capable of devastating a small countryside.

“Wow...learning magic is easy!” Sonata says loudly, staring at Sunset Shimmer.

“Yeah...thanks...” Sunset Shimmer wipes away the memories of her time as Princess Celestia's magical pupil and starts flash-carding her way to utter mastery of magic.

Once they've all read through the absurd spells granted to the world by the mods Sunset managed to install before Sheogorath's jacking of the 'Jack, they glance around at each other.

“So we've um..” Sunset looks at the Rivercraterwood again. “Let's find somewhere to sleep, then...”

“Okay,” Aria starts, “we need to set up an order. But, if I'm remembering right, I don't think Pinkie Pie's actually been with me yet. So tonight it'll be Pinkie, with permission from Sonata...” Aria shudders, moving a hand between her legs for a moment before going on. “A-anyway, first Pinkie Pie, then we'll set up a fresh order in the morning. And it'll be an order for fucking me.” Her breath hitches. “For...for sleeping, I dunno, Sonata'll cuddle with me and whoever fucked me. And in the daytime, I'm Sonata's.” She bends over, arching her back and moaning, nearly killing every other girl there. “S-sorry it's...it's really hot saying this stuff. God what's wrong with me...?”

“Nothing,” Sonata assures her. “You just...really really like being dom'd now. That's literally it!”

Aria blinks, blushing hard. “Yeah...yeah you're r-right. I don't know why I'm overthinking it when really...that's all it is, huh? I wanna be owned. I wanna be told to do stuff, by badass bitches,” she grins, her breath fast. “Okay s-seriously though we need to find a place and then Pinkie needs to annihilate me.”

“PINKIE IS ON FOR THIS PLAN!” Pinkie screeches and darts off, galloping on all fours up the nearby hill.

“Oh shit wait!” Sunset calls out. “Let's all go that way!”

Adagio groans. “Bleak Falls Barrow? Well...I guess Skyrim Together as Fox Girls might be better than the single player experience...for the ten-millionth time.”

“Yeah, exactly,” Sunset says, beaming, and Adagio has to admit she's kinda maybe sorta hot.

She doesn't admit this out loud, though, oh no. That's not how this works and you goddamn know it.

They chase Pinkie Pie up the hill. They chase her as she dropkicks a wolf off the mountain and sends it crashing, bones exploding, into the crater that was once Riverwood. They chase her as she uses Grand Telekinesis to hurl a frost troll down the hill, followed shortly by a hail of exploding chickens.

Sunset Shimmer doesn't fuck around when it comes to bonkers spell mods.

As she starts heading off towards the tower, though, Sunset catches her by the shoulder.

“Wait up,” she says, and casts Mass Immortality, granting them all tons of constant healing. “I dunno what'll happen if we get hit by an arrow or something. We'll probably just...die, to be honest. Oh speaking of which, let's all cast Dragonhide on ourselves.”

The others do so, and since Sunset Shimmer rolls a certain way, the glowing effects are extremely minimal.

Adagio nods in approval. “Not bad, Sunset Shimmer. But let me do you one better,” she purrs with a smirk. She turns invisible, and while the girls can track her with their hearing and their sharp eyes catch the movement of her feet in the snow, the bandits at the tower don't notice her.

They do notice, though, when a huge, spherical field of fire, lighting, and the sun (it's a damage type different from fire, believe it) erects itself around the tower. They don't notice it for long, though, as they all die within moments.

“This is...kinda great,” Aria says with a wicked grin, and Sonata caresses her shoulder, pulling her close.

“It's like all the magic we never had back in Equestria! We were always so desperate to suck up the bad vibes from people, but it never felt like we had enough to get really powerful. Not powerful enough, at least.” Sonata huffs, but grins as she feels the magical power coursing through her veins. “But now it's like...we have so much!"

“Yeah...” Aria looks off to where Adagio, now un-invisibled, is walking back. “So...what do we do now?”

“First, we get shelter,” Sunset says, heading off down the path. “Then we live. Find a way back, someday. In the meantime, we just live. Eat, sleep, explore...” She glances over at Pinkie Pie. “Love.” She glances back at Aria. “Make love.” She turns back to the path and heads on. “Now...we live.”

“...fucking Sunset Shimmer,” Aria says, her face a-blaze.

Pinkie Pie, proud of her friend's tearjerking, hopeful words, slaps Sunset Shimmer on the back, grinning ear to ear. Well not literally, that'd be terrifying now, considering the location of their ears.

“Well worded, Sunset Shimmer!” She wraps an arm around Sunset's and nuzzles her shoulder. “Golly, keep up with that stuff and I might just learn what romantic love is about.”

“Pinkie.” Sunset looks over at her with a warm smile. “That's...incredibly offensive to aromantic people.”

“...oh crap don't cancel Pinkie Pie! I didn't sign up for this kind of whump!” Pinkie covers her eyes in terror but Sunset pats her shoulder.

“It's okay, just try to be more sensitive about it in the future. I mean...you're just the way you are, and that's fine. If you never feel that sort of love, that's not some sort of failing. The only failing would be if someone were to make you feel bad about being this way. That'd be failing in a 'not being a terrible person way.' As in...they would be a terrible person so would fail at not being-”

“Pffft,” Pinkie Pie laughs, bumping her hip against Sunset's. “You goof, I get it. I really do love you, and I know it's different. But it's also just how I love people, so it's perfect. And after I bang the crackle-snapple outta Aria tonight, you and me can play with each other's bodies for funsies!”

“SNERK,” Sonata louds from behind them. She doesn't snort or anything, she literally just yells 'snerk.'

“Y-yeah,” Sunset stammes. “Yeah, definitely um...yeah. Yeah! Yeah...yeah. Yeah, heh-”

“Oh my god please can I cast comet on her?” Aria asks no one in particular but Sonata nods. Aria doesn't, though. “Em...thanks, but I think I'll hold off. Still a little...frazzled after that craziness back in...whatever that town was.”

“Big Hole,” Sonata answers, and Aria raises her eyebrows and nods.

“Ah, right. Back in Big Hole.”

“You'd-” Sonata starts but Aria shuts her up with a kiss directly on her belly button.

Aria stands back up, smirking at the stunned Sonata. “So instead of having to hear some terrible joke about us having huge gapers or something, I figured I'd shut you up in a new way. One that um...fits this whole thing,” she finishes, motioning around at all the girls.

Up ahead, Adagio and Sunset, along with Pinkie Pie, and shortly, the other two, turn a bend and see the stairs leading up to Bleak Falls Barrow.

“You know what?” Adagio says, holding up her hand. The blue column of light appears in the distance and the other girls get the hint, summoning their own Ion Beams.

In short order, everything outside the barrow is dead.

Including the entrance.

“Damnit,” Adagio grumbles. “Too much, huh? It's odd, being able to affect the environment. But I suppose it's only odd because some part of us is still thinking of it as a game.”

“We should probably...stop that,” Sunset agrees. “But I think we can probably use Grand Telekinesis to get rid of the rubble, then just...find a hole to get in?”

Aria turns to Sonata and holds a finger up to her lips. Sonata, deciding that she'd like to get another tummy kiss, starts to go on with her jab about big ol' holes, so Aria slips the finger she'd been holding up to her lips into her lips and sucks on it, brushing her hair back with her free hand and turning her face down so she can look up at Sonata.

“I..don't even have a pee pee and that's...super hot...” Sonata mumbles. “Okay okay no joke about Daughter Mom, Mom Daughter, or Satancest.”

“...wh-?” Aria starts but Sonata takes her free hand and starts skipping off towards Bleak Falls Barrow's thrashed entrance, where Adagio and Sunset are using telekineses yes. Multiple. Telekinesi is actually the plural. They're using telekinesis to hurl stuff around a clear a path.

There. I did it. I won the money.

They manage to clear the main entrance enough to streak inside, fully clothed but really fast so it's like they're streaking around like shooting stars.

Flawless.

The two or three bandits who had wondered loudly at each other about what was going on outside but who couldn't get the collapsed stone out of the entryway enough to figure things out and/or escape get annihilated through a combination of slashing, flashing claws and extremely overpowered (when free to cast) spells.

“This...man, I wish I could turn the difficulty up or something,” Sunset says with a sigh as she sits atop the treasure chest by the bandits' bedrolls. They glance around and decide this spot sucks so they pick up the bedrolls and prepare to head deeper.

Adagio and Sunset open the chest and, on seeing the Beacon, promptly close the chest.

“Last thing I need,” they each say in unison to each other, smiling.

“Hey...Sunset,” Adagio starts, her eyes following the curve of Sunset's back, down over her hips.

“Yeah?” Sunset glances over and sees Adagio checking out her ass and nearly drooling.

“I was not almost drooling,” Adagio growls, wiping drool from her mouth. She sighs, accepting her place beneath the narrator, and goes on, “But I was wondering if perhaps, since Pinkie Pie was going to be...otherwise occupied, if you might wish to spend the night together.”

“I mean-”

“Sunset Shimmer, if you play dumb and say something about us all sleeping together anyway, in reference to the fact that we will in fact largely be sleeping in the same area, I will absolutely slap you.”

Sunset thinks better of doing exactly what Adagio had predicted she'd do, and instead opts for actually acknowledging Adagio's question.

We're all very proud of you, Sunset Shimmer. Very proud.

“I mean...hey, Pinkie, would that-?”

“Yeah, sure! Go ahead and get all sex'd up, Sunset,” Pinkie says with a sneaky grin, “so you don't miss me too much.”

“Oh my,” Adagio says, throwing Pinkie a smile before turning back to Sunset, biting her lip for a moment. “I guess...that means it's you and me tonight, Sunset Shimmer. If that's...okay with you.”

“And um,” Sunset's eyes can't help but flicker down to Adagio's taut, exposed stomach, her subtle muscles glistening from sweat as they descend the stairs deeper into the barrow. “If...um...I say it's...not?”

“Oh, don't threaten me with a good time,” Adagio purrs. “A little resistance goes a little way with me. A lot...a lot.” She laughs, getting closer to Sunset and running a claw down Sunset's forearm, not hard enough to draw blood but more than hard enough to draw a white-scratch line across Sunset's skin and send shivers through her whole body.

“Fucking...” Sunset jerks her arm away but can't hide the blush on her cheeks, and Adagio chuckles, going on ahead and certainly making her hips sway a little bit more than usual.

They blast their way, absurdly, through the rest of the dungeon, and finally find themselves in the chamber with the word wall. Adagio and Sunset start laying down fire runes (and a few anti-undead AoE's) on the boss's tomb, and he barely gets to exist before re-dying.

“What's this?” Sonata asks, pawing at the word wall.

“Sonata, you're being a fucking weirdo,” Aria says, laying their bedrolls down by the wall and pawing at it.

“What we all doing?” Pinkie Pie asks, pawing at the word wall.

“I'm not pawing at the word wall,” Sunset Shimmer says, pawing at the word wall. “Damnit...”

The word wall activates and the power of the dragon language pours into their apparently dragonborn veins. Adagio too, but she's the only one who didn't look like a feral idiot because she didn't paw at the word wall.


The author worked on a completely different story today, like a tool. The girls stand around, glaring up at their author, wondering when they'll get to finally bang.

The author soundly apologizes but assures them that their days of instant orgasms upon the touching of vajiiijeeees is over, and they shall once again know the joy of working up to that shudder-stutter buck and chuck of mad delight.

The fox girls suppose that this'll suffice, and let the author off the hook. Mostly because the author chooses to have them do that.

Heheheheheh.


“Wait,” Sunset Shimmer says as the word wall's power fully enters her. “But we already had Fus. Wait, how'd we already have Fus?”

“Sunset Shimmer, we're fox girls in Skyrim. I think broken game mechanics are the least of our worries,” Adagio says, rolling her eyes. She looks towards the soul-gem holder holding a soul gem on the set of...you've seen it, c'mon, it's... shelves, that'll work, like a hutch? What's a hutch? Crap it's not like a hutch it's just fucking shelves, sitting beside the tomb where the boss draugr died like the dead thing it always was ever since it died the first time. “Fus, roh!” Adagio says, and the powerful blast of concussive force proves that they somehow now have two words of Force unlocked despite having wait no they killed Thomas the Goat, hell yeah! They have two words of Force unlocked and I didn't even cheat.

Ignore the fact that they've never seen a word wall before now in real life.

Real life.

“Well I guess that's a thing,” Sunset Shimmer says, rubbing her forehead. “Alright this...is all a bit much oh. Oh wait...” Sunset Shimmer's eyes go wide and she looks up at Adagio with a wide-eyed look of dawning realization. “Sheogorath...he has the magical isekai toaster!”

“Oh...shit...” Adagio says faintly. The other girls gather around, now done pawing at the word wall (Sunset finished early).

Sonata scratches at her cheek, then sniffs Aria deep before making language happen. “So, what's that mean?”

“It means,” Sunset Shimmer starts, “that the Prince of Madness can travel to our world. Or more importantly, that we can't, unless we get it back from him.”

“Well can we just ask him nicely?” Pinkie asks, nicely.

“Or like...beat his ass and take it?” Aria suggests.

“You and your ass taking,” Sonata says, giggling. “Don't'cha know, the only ass getting taken is yours. ”

Aria stares at her, wide-eyed, and Pinkie sneaks up behind Aria and wraps her arms up under Aria's shoulders, holding her close and pressing her hips up against Aria's ass.

“Yeah, Aria. Pinkie Pie finally gets a turn with your pie tonight,” Pinkie says, cackling.

“That was objectively terrible,” Adagio says, sighing and turning to Sunset Shimmer. “But if Sheogorath has obtained the magical isekai toaster, there's no guarantee that we're doomed quite yet. He may not know how to work it. In fact...even we don't know how it happened. Honestly, I'm not competely convinced the toaster had anything to do with it.”

“True,” Sunset admits, suddenly aware that Adagio is getting closer, swinging her hips a bit from side to side and gazing at her hungrily. “Um...”

“Shall we all...begin the festivities?” Adagio suggests, lifting Sunset's head up with a claw beneath her chin.

“YES!” Pinkie screeches, dragging Aria off towards the bedrolls.

Sonata tosses a few of the bedrolls back at Adagio and Sunset, the bedrolls' flaps flapping flappily in the flapping breeze of the still, breezeless cavern.

At this point I almost hope bedrolls don't have anything resembling a flap, phor khayoss.

Adagio, smirking at Sunset, drops the bedroll at her feet and runs her hands through her hair, back to the nape of her own neck where she starts unlacing her leather outfit.

Sunset can only stare, her bedroll held fast and probably a little hole-ey now that she's clenching it tight in her claws. She's seen Adagio naked, sure.

But something about Adagio's eyes as she slowly unwraps herself from the tight leather, her skin, taut and shining with a thin sheen of sweat, coming loose and steaming as it meets in full the chill air of the cavern, hits different than just seeing her naked and flopping around Riverwood while, on occasion, being a tentacle monster or ghost.

Hits a little different indeed.

“Well?” Adagio asks, raising an eyebrow. “You going to undress, or...would you rather have me tear those clothes off myself?”

“Hababbaba,” Sunset babbles before dropping the bedroll and reaching back to start unlacing herself. She of course dropped the bedroll into the one single spot where a crack exists leading down to the nearby stream, and Adagio laughs.

“Well, looks like we'll be getting very snug together in this single bedroll we have,” she says with a grin, now dressed only in the high heels of the outfit.

Back at the word wall, Pinkie Pie is smiling warmly as she smashes Aria face-down into the cold stone of the cavern and starts undressing her, a likely-luck driven dexterity allowing her to unlace the leather without shearing through it with her claws. Aria says nothing, only gasps and moans and grunts, trying to keep herself at least somewhat able to breathe.

Sonata preps her bedroll and undresses, laying down and curling up, watching the pair with a little smile on her lips and her finger caressing her other lips, a warm feeling filling her. She knows she should be more jealous, but something about the fact that what's happening is only happening because both she and Aria are allowing it makes the bad-feels drift away, and she's left watching one heck of a great porno.

So lifelike, too.

Like iMax but...iShlick.

Ladies and gentlemen and all points beyond and between, you're welcome.

Pinkie finally flips Aria over, though much of the leather, though unlaced, still stays somewhat plastered to Aria's body so Pinkie starts slipping it off and hucking it away, the leather strings/straps and cloth laces running across Aria's skin beneath her as the un-tied armor is pulled off of her, sending cascades of tingling tickles across and through her. She giggles and Pinkie grins, and when finally Aria's at the correct level of nudity (completely) and with Pinkie conveniently at the same level, Pinkie holds her down by the shoulders and gazes into her eyes.

“This is gonna be so fun! ” Pinkie says with a giggle. She presses her forehead to Aria's and Aria smiles, letting out a fast huff of breath.

“Heh, well...glad you're excited. I dunno if you have much experience but...just go with the flow, alright?”

“Well, I'm certainly flowing!” Pinkie says, running a finger down her slit. “And it seems like you are t-too!” She stutters as she touches Aria's and Aria gasps, tensing her stomach. Pinkie, staring wide-eyed at Aria's pussy, splits the lips in two and runs a knuckle inside, working it in a little at a time. “Oh it's...it's so...nice...” Her breath hitches and she pauses, bending across Aria and kissing her clumsily on the lips. “S-sorry. I'm...but...it's...wowsies...”

“Y-yeah,” Aria manages, her own breath speeding as her heart hammers. “Hey it's okay though. Just stay confident, and...you know. Do whatever you w-want to m-me. However fucked it is. I'll let you know if it's too much, okay?”

“Well, um...don't expect me to come up with anything too crazy. But, it's pretty fun to just play around with you, honestly.” Pinkie's voice is soft and her eyes unfocused, her hand still down between them. She knuckles her way into Aria and presses her own pussy down against her hand, feeling an odd comfort as she lays down across Aria.

Aria smiles, licking at Pinkie's cheek. “Do whatever feels natural. I'm...well I'm fucking turned on as all hell, but really, just being close like this...I dunno. It does a ton, really. So even just...fuck though, here, can I try something?” Pinkie nods and Aria reaches down and starts guiding Pinkie's fingers, rubbing closer and closer to Aria's clit. Pinkie presses her forehead against Aria's again and Aria whimpers, her eyes squeezed shut, until her hips start pulsing in a gentle rhythym. Someday I'll spell that right.

“Oooo, like this?” Pinkie takes charges and starts working Aria and Aria moans, biting her lip.

“Y-yeah, just like that. Thank you,” she nuzzles into Pinkie Pie's chest and Pinkie grins.

“Heh, this is fun. Sex is like...making your friends feel good, which is what I'm all about!” She licks Aria's fluffy ear and mooshes her cheek into Aria's hair, her breath speeding. “And um...I dunno why, but making you feel good is really....wowie zowie...”

Regretting her decision to include multiple sex scenes at the same time, the author now directs the focus back to Adagio and Sunset. Adagio has Sunset pinned down against the bedroll, gazing down into her eyes and pressing their chests together, yet Adagio's body below the waist is just barely kept out of Sunset's reach and Sunset's hips work and pulse as Adagio caresses her shoulders.

“Um...Adagio, whenever you wanna...you know...”

“Oh, do I know?” Adagio takes one of Sunset's ears in her lips, keeping her teeth safely out of the way and pressing down hard as one of her fingers trails down from Sunset's shoulder to between her breasts.

Sunset stifles a moan and closes her eyes, then mumbles, a hand sneaking down between her legs. “Y-yeah I mean...whenever's good. I just mean, I'm um...you know. Good to start, and all, so...”

“Oh, but it appears I'm still getting warmed up,” Adagio says with a smirk, lowering her lips to one of Sunset's nipples and taking it firmly, sucking hard to keep it trapped. Sunset gasps and throws her head back and Adagio takes the chance to bring a hand down to Sunset's breast, cupping it while she starts swirling her tongue around Sunset's nipple. Sunset's breath speeds and speeds and hitches as her stomach tenses and her hand furiously works at her clit, and Adagio lifts her lips off and flicks at Sunset's nipple with her tongue while snagging Sunset's wrist with her hand.

Sunset opens her desperate, pleading eyes, and Adagio grins.

“Now now, Sunset Shimmer. Don't trust me to get you there myself?” Adagio grins as Sunset whimpers. “Well, I suppose, since you're so desperate for me...if you'd beg, perhaps I'd consider moving things along?”

“You...you want me to beg for it?” Sunset says with disbelief, but weakly. Her eyes dart between each of Adagio's and she bites her lip, her whole body trembling with want. She squeezes her eyes shut and mutters something, and while Adagio's fox ears got the gist, she'd really rather hear it loud.

“What's that, Sunset? I don't think I quite heard you. If you could...speak a bit more loudly?”

“Adagio, p-please...please fuck me. Please just...do whatever you want, okay? Is...is that good enough?” Sunset pleads, louder, wondering if the other three heard her.

They totally did, but let's stay with these two for a bit longer.

“My my, such language. But I suppose if you're so...tortured without my touch, I can deign to help you a bit. I know I'm so hard to resist, after all,” Adagio purrs to Sunset, moving herself down. She takes one of Sunset's legs in each of her arms, in the crooks of her elbows, and raises Sunset's legs by the knees, spreading them wide. She runs her claws gently down the underside of Sunset's thighs and Sunset's hips pulse upwards, beckoning Adagio's lips down to them.

“H-holy...how much-?”

“I don't kiss and tell, Sunset Shimmer,” Adagio says, letting Sunset's legs flop to the sides and lowering her lips to Sunset's body. “And besides, I've hardly been with anyone besides...those two. So I guess I'll have to do a bit of exploring, then. Find what works,” she says coyly, pressing her tongue right beside Sunset's clit and making Sunset's body twerk towards her to close the clit-distance. Clit-stance. That sounds like a fighting stance. A hot fighting stance. “And find what doesn't...at least, for you. ” With this, Adagio presses a knuckle against Sunset's anus and Sunset gasps, though not wholly in surprise. “Well now,” Adagio says, her smile broadening, “it seems you might be a little more... open to a few things, huh?”

“It's...it's not weird, is it? I mean...it's not like I'd take a-”

“Sunset Shimmer, never say never,” Adagio says huskily, forcing her tongue between Sunset's slit and pressing her knuckle through the clenching resistance of Sunset's back door.

As it crests into her tightness—and with a gratefulness that it isn't Adagio's claw—Sunset moans loud. She tries to say something, anything, but Adagio's tongue flicks against her clit and Sunset's words fail as her mind starts screaming, throwing words into Oblivion where they burn to soft ashes.

“Good girl,” Adagio says, fluttering her tongue against Sunset, tearing down Sunset's last bit of resistance and smiling as Sunset tries to press her body down harder against Adagio's tongue and knuckle both. “ Very good girl.”

Meanwhile, back at Aria's clit, Pinkie has decided that she'd like to start sliding her fingers into Aria's slit, and she finds the whole...the hole attempt hahaha okay she finds it rather fun, like slipping her fingers into-

Oh shit claws.

Pinkie slides her finger straight out before it goes in too deep and tries a knuckle instead, slipping it, curled, into the vast wet warmth of Aria's pulsing body.

Aria feels Pinkie enter her inexpertly—twice—but as Pinkie pushes her knuckle in and, with her other hand, starts rubbing the sides of her finger against Aria's clit, she starts to feel the world blur away at the edges, tearing into a white, blanking nothingness as she rides a rushing wave of tight warmth that throbs through her body, making her hands, across her chest, clench tight in a speeding beat. Take that, rhythm. Oh I spelled it right.

Woooo!

“Th-thank you, Pinkie Pie, I...” Aria's voice devolves into a whine and Pinkie giggles.

“Heheh, you're welcome!” Pinkie beams down and Aria feels a flush of warmth across her cheeks for a moment before she gasps, her body tightening massively for a flash before letting her down, slow.

She tries to speak but fails and surrenders to the pleasure coursing through her, bucking her hips at Pinkie, feeling Pinkie's knuckle wedged inside her and loving the discomfort of its presence, the feeling of it jammed deep into her; loving how it feels to be split apart and violated while Pinkie's fingers work away on her clit.

As she comes down, Pinkie giggles again, laying herself across Aria. “Wow, that looked fun. So um...h-h-how...?” Pinkie stammers as her pussy touches Aria's, and Aria feels herself rising up to a second, smaller O.

“Just...here, Pinkie,” Aria, her arms now crossed across her stomach as her breasts kiss Pinkie's, grinds her hips against Pinkie's, drawing a shuddering moan from her.

“W-wowie...z-zowie...” Pinkie grinds herself down and it's Aria's turn to shudder and moan, and Pinkie follows up by taking Aria's shoulders in her hands and growling next to her ear. “I...um...erm...Aria, if...I might get...a little crazy, if that's okay.” She grinds again and her breath hits hard and fast on Aria's ear. “And if that's not okay...that's um...kinda too bad, okay?” Pinkie presses Aria's shoulders down hard and starts grinding slow and deep, trying to split Aria open by force of torque alone, and Aria moans out loud into the cavern, smiling through happy tears.

“Oh fuck yes, P-Pinkie Pie just...fuck me through the stone, please, c'mon, please,” Aria whimpers, her body screaming for more, and endless font of want, craving Pinkie's motion, her warmth, her crushing, forceful self.

Pinkie obliges best she can, grinding hard and harder, harder still, her sharp teeth grinding too in concentration by Aria's ear and Aria thinks for one delirious moment how wonderful it'd be to have those teeth slashing through her ear, such wonderful, exquisite pain.

They come together, bucking hips slapping against each other and drawing their orgasms out into new, stuttering heights, dragged on and on like the bodies of masochists dragged across nails.

That's a bit too much for your average masochists. Sure wish I could edit.

Sonata giggles as Pinkie Pie flops down hard on Aria, who squeaks then hums, nuzzling into Pinkie's hair.

“Alright you two, ready for the snuggles?” Sonata says, opening her bed flap, readying to pounce in.

“Mrhrlher yes, very much,” Pinkie murmurs. The three fuse their bedrools together into Bedroolzillah and snuggle close, with Aria in the middle. Sonata caresses Aria's stomach, her fingers teasing lower and curving away at the last second, swooping up and over the curve of Aria's hips, coming to rest finally on the small of Aria's back. She pulls Aria close and Pinkie spoons Aria from behind.

Pinkie wonders briefly what happened to the Fork of Horripilation, but she's guessing it wasn't actually magical and huck the thought out of her mind.

Meanwhile back at Sunset's clit, Adagio has managed to work nearly her whole curled finger into Sunset's ass while licking and kissing Sunset's mind to Oblivion and back. Again and again Sunset writhes and moans, her voice cracking into a whine as her hips twist and twerk, yet Adagio never slows, never stops, until, at long, long last, she kisses Sunset's slit, over and over, again and again, pulling her knuckle out and letting Sunset down easy.

Sunset's breath hitches, more than once or twice, and she covers her eyes with her forearm, her breath ragged. She doesn't know how long she spends just riding the high down, but when she finally reaches the bottom she's filled with guilt. She peeks out under her arm and sees Adagio, lovingly kissing her slit gently, murmuring sweet nothings into it and breathing little soft, warm breaths. “H-hey, Adagio, um...?”

“Welcome back, Sunset. Did you enjoy your little trip?” Adagio smles up at Sunset and Sunset smiles down, though her eyes are a bit sad.

“Y-yeah, it was...wow. Just. Wow. But...I don't suppose you...?”

“Aw,” Adagio chuckles, “how sweet. You wonder how I could be so giving, without taking? Sorry to say, though...I got myself there while you were twisting about like a worm on a hook.”

“I wasn't...well...okay maybe I was, but that was...a fantasically unsexy way to put it,” Sunset whines, her heart beating hard as Adagio raises herself up and sets herself beside her.

Adagio gazes into her eyes, running her fingers idly through Sunset's hair. “Perhaps. But it was quite a sight. One I'd like to see more of, if you'd be willing.”

“I'm...” Sunset looks over to where the three amigos hide, snuggling, in their burrito. “Well...”

“I'm sure Pinkie Pie won't mind. After all, it's just a sex thing. Like Sonata, and how she feels about this little need of ours towards her Aria.” Adagio, lifting a lock of Sunset's hair to her with a claw, sniffs it and lets it slip out of her grasp.

Sunset's cheeks burn and she glances down, along the slight curves and soft skin, hiding taut muscles, of Adagio's body, and gulps. “Yeah...”

Adagio's quiet for a moment, watching Sunset's eyes and hearing Sunset's heartbeat, then smiles, placing a hand on her shoulder and pulling her closer. Without a word they kiss, Adagio's lips like soft, smooth directives, impossible to ignore, demanding acquiescence, and Sunset lets her lips melt against their firm, gentle guidance.

Adagio hums as she lets the kiss ends, pursing her lips and tasting Sunset's lingering...taste...shit so close to being a good writer...on her lips, before turning Sunset's body away and snuggling up close, spooning the barely-resisting Sunset. “C'mon, little Shimmer. We'll have our hands full tomorrow figuring out what to do about...well, everything.”

“Y-yeah, okay.” Sunset sighs but must admit it feels nice to have Adagio's hips press against her and Adagio's arms wrapped snug around her stomach. Sunset lets out a happy sigh and Adagio lets out a long, shuddering breath, admitting at last that Sunset's kinda really hot.

Still not admitting it out loud, though. Nope.

They sleep the night and wake in the morning, stretching and preparing for another day of something. Probably sex. Also murder.

A typical Skyrim day.

They dress in their flimsy leather, their rings of And....Akatosh still worn and providing them way too many cheaty bonuses to count. They head out the back entrance of the cave, descending the hill and drinking water from the fresh river. They're upstream of where they all banged each other in the shallows, and it's been quite some time—at least half a day or two—so they're probably safe from drinking their own cum, for now.

Not that any would mind, at this stage.

Sonata, following Aria closely and sometimes wrapping an arm around her waist and licking at her ears, is positively glowing, and Aria, having spent the night cuddling her girlfriend and Pinkie Pie—after a fresh fucking from Pinkie—looks radiant. Meanwhile, Sunset walks hand in hand with Pinkie Pie, both looking happy.

Adagio stands back a way from the rest, watching it all and wondering where precisely she fits in.

She doesn't wonder for long, though for she knows, deep down, that she fits where she sits; wherever she wants and whenever, ever challenged and always the victor.

I almost wrote fictor. Send halp.

“What's next?” Pinkie Pie says, and Sunset Shimmer wonders.

“Well, we could make our way to Whiterun. That could be...something.” She tries to think if there are any mods she might've accidentally thought of while spamming the Wabbajack on what ended its existence as a Spider Daedra and started as...probably a bunny, but she can't think of anything.

Probably not a good sign for her. Great sign for the author.

“Let's goooo!” Sonata calls out, an arm around Aria's shoulders.

Aria, pulled close, laughs and smiles brightly, sending up death flags everywhere.

It's okay though, they all have resurrection spells.

I mean, if they installed SexLab: Defeat they could just bang people back to life because for some reason the necrophilia portion of the mod just kinda does that sometimes. Or maybe that's just the author's install?

Okay the fox girls are looking at the author weirdly now, or calling the author weird with their looks, so we'll just move on.

They set off around the mountain and find themselves on the opposite side of the river that they were on before; a side effect of crossing the river to go up the hill to Bleak Falls Barrow. Thus, they run into the Witch's Cabin.

Sorry, Anise's cabin. Pretty sure an Anise is just a type of hag in D&D. And probably also in real life.

I'm not a dork, you're blank.

Ignoring the author's sick Futurama references, the fox girls paw their ways up to the poor unsuspecting woman, who starts to suspect something due to how I worded that.

“And..what might such a fine group of young women want with an innocent old lady like-”

“Can the mouth, chug fist, it's goofy time!” Sonata says, using Time Stop (from Phenderix...Phendrix? One of those) and setting up a bunch of exploding chickens before time resumes and the chickens annihlate the old woman.

“Nerd!” Sonata calls out, pumping one fist in the air and snagging Aria's hand with the other, pulling her into the woman's cabin.

“Did-?” Sunset starts but Adagio cuts her off.

“Don't make the author have to shoot down our attempts to have a sense of morality, Sunset Shimmer.”

“I'm still trying to figure out what the hecky heck she said!” Pinkie exclaims with a wide grin.

The sounds of whimpering come from within and the foxes outside rush inside, only to find Sonata bending Aria over the dead witch's bed and rutting against her rump.

“Oh um. Hey!” Sonata says, not stopping at all.

“Right. Anyway,” Sunset says, opening the Witch's secret door. The group that isn't rutting Aria—also the group that isn't Aria—descend down the stairs and find the Witch's secret basement.

“Well this looks normal. Aside from the obviously over-the-top enchantment table and alchemy lab, but at least we have access to these now,” Adagio says, glancing over at Sunset Shimmer with a smirk.

“Yeah yeah, okay, here we go.” Sunset Shimmer starts plopping stuff from her imagination out into the real world using her cheaty-ass mods that the author loves to have installed, and promptly sets about becoming a master of both alchemy and enchanting. Eventually Sonata gets off on Aria's fully clothed ass (it's fully clothed yes, but in tight leather that Sonata is rubbing up against, so c'mon) and Aria gets off on a combination of that and her own fingers. They come down the ladder and find Sunset Shimmer enchanting everyone's stuff with some of the most overpowered bullshit anyone has ever conceived. She even enchants a few belly-button rings that everyone then gets installed.

It's way easier than real life. They just slap them on and boom, piercing. Skyrim's great.

Once they're all more OP than anyone could possibly imagine, they leave the random dead woman's cabin and head off towards Whiterun, passing by the blasted crater that once was Riverwood.

“Heh I wonder if anyone will notice,” Pinkie Pie says nervously. As if in answer, a few minutes later as they start down the winding hill towards the meadery buildings—you know the ones, don't lie to me—they find themselves facing a small contingent of Whiterun guards, led by Irileth and a group of odd teenagers in heavy makeup and revealing leather armor.

“W-well, l-” Sunset Shimmer starts, shaking, but Adagio is soon upon her.

“Sunset Shimmer,” she hisses, “are you goddamn kidding me with that Companions replacer?”

“I dunno what you're-” Sunset starts but Adagio slaps her ass because that's...that's how she quiets people down now, apparently.

“Right. Of course. That's just...” She turns, her hands up in the air, smiling. “Don't worry everyone, it's just Bijin wives, yep. That's all there is, nothing to see here, folks. Move along!”

“You there!” The guards call up. In front, Aela pulls out her...well she techinically has a dagger but I'mma have her pull out her bow for funsies.

“Did you-?” Aela starts but Sonata's got just the thing for this.

Just the thing is, of course, a literal fucking comet.

The mists swirl and the sky opens as a titanic chunk of ice and 'fuck you' falls from the sky, impacting the column of living roadblocks with the force of a few lorge booms, sending the fox girls flying and crushing even the bones of their victims into icefire dust.

The nigh-invincible fox girls recover instantly, the only effect of the boom-a-ling their physical displacement, and regroup on the hill.

On what's left of the hill.

Sunset scratches her temple, choosing to ignore the judgmental stare from Adagio. “There's not gonna be much of a Skyrim left at this rate. Think we could use...maybe some less destructive spells?”

“The school of magic is literally called the school of destruction, Sunset Shimmer,” Adagio says. Sunset turns to her and sees that Adagio is smirking knowingly, and that doesn't really make it better.

“Look, I just...I dunno, I really liked the sloppy makeup look and the freckles and-”

“Oh,” Adagio purrs, “you dn't have to explain anything to me, Sunset Shimmer. Except what sorts of spells you think we should use. In this, at least, you seem to be more of an expert.”

“Oh, yeah!” Sunset brightens up, realizing that it took a magical isekai toaster, a Prince of Madness, and not a small amount of gay sex to finally be accused of being good at magic. “Well, let's try Spirit Storm. It drains Magicka and Stamina before health but with our gear it shouldn't be a problem. Also it'll give us a less lethal thing to do, I guess. If people will just...I dunno, give up from being tired or something.” She casts the spell, which is really pretty.

What. Dn't look at me like that. I can't believe my word processor fixed the capitalization of “dn't” but didn't fix it to “don't.”

She casts the spell and tendrils of light flow out softly from her, white and streaked with reds and blues, and the other girls think first of the look of dragon souls as they flee the bodies of the slain dragons/trains and enter their bodies. A sound like gently wooshing wind outside a window on a lazy summer day grows and grows as Sunset casts the spell, and the swirling tendrils softly whip and caress their way across the sky.

“So yeah that kills people dead pretty quick,” Sunset says, ruining the moment.

The other girls all start spamming it into the sky, much to the short-lived chagrin of the various bird and butterflies. After a time of mad wooshing, they giggle and head off down the hill, watching as the townsfolk cry out and flee into their homes.

“Huh,” Susnet says, repeating that old typo. “Well I guess someone did drop a comet on the ground over there. And we all also spent like five minutes just shooting dragon-soul-looking wooshy-woos into the sky.”

“Pathetic,” Adagio growls at the nearest building, which is the...fucking busy bee meadery. The Honningbrew Meadery. She summons a comet on it, and the girls immediately wonder if perhaps they might be a bit OP.

They definitely are, but just like Thomas, this train's got no brakes.

After the building and everything immediately beneath it for a good 50 feet is demolished, the girls scramble back into formation and set off again towards the town proper.

“We're just-?” Sunset starts and Adagio, having devleoped a new favorite habit of interrupting Sunset, interrupts Sunset.

“Yes, we're just going to ignore the fact that I just exploded a meadery. We'll start using restraint now. ” Adagio looks back at the other three non-Sunset shaped fox girls.

Aria shrugs and looks off but blushes, loving the feeling of being ordered around.

Pinkie Pie and Sonata both stare vacantly. Sonata cocks her head after a while then gasps, having forgotten to breathe, and Pinkie Pie starts eating her own hair before remembering that it's not actually cotton candy.

“This bodes well,” Adagio says sarcastically, or lies. Both work here.

What also works here, where the scene now is, is the...the horse make-go-er.

The fucking carriage.

“Uh,” the carriage driver starts, having only recently watched as the fox girls standing before him crushed the nearby meadery with a summoned comet.

“If you don't wanna end up like that building, you'll give us free passage,” Adagio growls.

“Where are you heading?” The carriage driver asks, not liking his odds of survival due to his lack of an actual name.

“Whiterun,” Sunset says, fully aware of the fact that they're right outside Whiterun. The girls pile in the back and the carriage driver turns the carriage and walks the horses up the hill. Drives the horses. Rides...no.

He makes carriage go up the hill while still sitting in the carriage make-go-er spot.

The girls stare at each other, but smiling. They're not staring. That implies...I don't know what that implies.

They gaze at each other, smiling warmly, as the carriage bounces up the hill, driven by a man who isn't too confident that he won't eat a whole hill-load of comet soon.


The author, never backing down from a challenge, will now proceed to never back down from a challenge.

“Ah!” a Khajiti trader calls out to the carriage as it meanders up the hill to the Whiterun gates. “Care to sample my—oh no!” Like the useful plot device he is, the Khajit accidentally drops the potions of en-dong-enating on a couple of the girls.

You heard me.

Adagio gets splashed because of course. Pinkie Pie also gets splashed.

Trouble's a brewing.

Sonata gets splashed, for fuck's sake (hah!) and that's all. The vajania twins—that being Sunset Shimmer and Aria Blaze—keep their vagoodies and the others now have raging erect-a-doodles.

This is gonna be a time.

“What the...?” Adagio says, standing and glaring at the now-fleeing Khajit. Wait. He wouldn't flee.

He's a businessman, for god's sake.

“Ah, three vials then? That shall be...600 gold,” he says, holding his pawsies up for recompense. Adagio pays him back with a tri-elemental triangle of death and he explodes.

The caravan pilot takes this opportunity to jump out of the cockpit of the wagon and roll away down the hill, chased promptly by a barrage of fiery meteors shot by Sonata and Aria.

True to his earlier suspicions, he doesn't make it away safely and gets both pummeled by falling rocks and also set on fire.

Probably died to the rocks though. Lucky dude.

Back at Adagio's dong, she glares down at it as it tents her tight leather, screaming to get out. Not literally.

Pretty sure they don't scream.

“Well great. How long will this last?” Adagio asks Sunset, who stares at her blankly for a few moments.

“W...wait what? How should I know?” Sunset stands, her lack of a dick making her not have a dick, crap I died.

“Don't play dumb with me,” Adagio goes on, her cock pointed to the summit of the Throat of the World. “Obviously you installed your cock potion mod or whatever when you were installing your magic mods.”

“I don't-! I Don't have a cock potion mod!” Sunset says truthfully, though the author refuses to allow the other girls to know the truth, for the sake of fucking with Sunset. “See? Even the narrator knows!”

“Narrator, what's that?” Sonata says, like a good girl. Good girl, Sonata. “Yay!”

“So!” Pinkie exclaims, her leather bottom pulled down enough to unleash her cockzillah upon the world. It's penis sized and also penis shaped, just for good measure.

Heh.

Pinkie goes on, taking her cock in her hand. “What do we...oh...oh that feels nice. Do I just squeeze it? Hm. That's...eh, that's okay but...maybe if I twist-OH NO. Don't twist! Okay...okay...easy now, what if I just...shhh shh it's okay-”

“Pinkie,” Sunset says, staring at Pinkie's cock. “Are you...are you talking to it?”

“Heck yeah! I have to build a rapport! Hey, want it in ya?”

Meanwhile, at the cocks of both Sonata and Adagio, Aria's looking a bit troubled.

“Well hey there Aria,” Sonata says smirking as she slides her leather bottoms down. “You sure are looking...like you could use some dick in ya, if you know what I mean.”

“She does indeed,” Adagio says, stroking her cock as she unleashes it. “I suppose the only question is...whose, where?”

“Uh...” Aria looks between the cocks, but she already knows how this is gonna go. “Fuck. Okay. Look. I love Sonata. So she's goes in h-here,” she says, patting the front of her leather crotch, her fingers lingering for a moment as she rubs herself through it. “And um...and Adagio's a gross bitch sadist who loves ass-play so she goes in here,” she continues, patting her ass with her other hand.

“Good girl,” Adagio says. “Now let's kill the people who own the horse store so we can make use of their furniture. I'd rather not fuck you apart on this cramped wagon.”

“On it!” Sonata says, jumping out of the carriage with her cock still in her hand. She busts down the door to the horse shop and rushes in, killing everyone inside with one hand while keeping her BONNER hard and throbby. Murder complete, she stands at the door, waving them in.

“Shall we?” Adagio asks Aria, holding out a hand. Aria takes it and the two depart while Sunset watches Pinkie's cock dance.

“She moves, she moves, oh baby...wait...she bangs, she bangs!” Pinkie sings, using her cock...groin muscles to bounce her cock in front of Sunset's eyes.

“Yes...bangs...” Sunset says, her eyes roving up from the bouncing one-eyed monster and up the smooth skin of Pinkie's stomach, up to her leather-trapped breasts and the slight sheen of sweat on her collarbone. Shaking herself out of it, Sunset sighs and stands, doffs her leather bottoms, and gets down on all fours. “Alright Pinkie. Let's try this.”

“Wow, it's really excited now!” Pinkie exclaims, kneeling down behinds … behind Sunset's open body. “Alright so now I just...here we go...” She guides her cock towards Sunset's slit with her fingers, but when she touches Sunset's warmth, her whole body shudders. “Holy...moly...polly...poly? Pole-ey. That's...Sunset you're so...but huh? You're not wet yet!”

“Um...yeah that's...weird...” Sunset, knowing why she's not precisely turned on at the moment, tries to play dumb, but this time the narrator is going to go ahead and let Pinkie know.

Take that, Sunset. That dick.

“Aw, you're not into Pinkie Penis?” Pinkie asks.

“It's...it's not you Pinkie it's just....I dunno. I...I dunno!” Sunset sighs. “Maybe try um...with your mouth for a bit, like you did with Ari-ah!”

Before Sunset's done with her sentence, Pinkie is lick-flicking away, her tongue tasting Sunset's lips up and down her slit, teasing around her clit but not coming close yet.

Yest.

...YET.

It doesnt' take long for Sunset to get moister than a fresh baked moisture cake fresh down by the moisture farm at...here at Skywalker Ranch, where moist's the moist moistjjj, so that means it doesn't take long for Pinkie's ween-a-doodle to make it's way back to Sunset's vaginagahoooooog.

“Alrighty, h-here w-we g-g-g-!” Pinkie starts pressing in but loses her goddamn shit over how good it starts feeling almost immediately. The feeling of Sunset's tightness spreading across the head of her cock, all warm, blazing wetness, fills her with a crazed, bestial desire to start humping the ever-fucking shit out of Sunset, but she resists, mostly because she can barely make headway with Sunset clenching herself so tight. “Su-Sunset, c-could you...maybe...relax like...a million-billion percent?”

“I c-can't...but...I'll t-try for you, P-Pinkie.” Sunset tries, and she starts to feel Pinkie's cock pressing into her, drawing out a pained whimper from Sunset's clench-tight lips. Her face lips.

SNERK.

“F-Friendship is m-m-magic!” Pinkie stammers as her cock pops through and into Sunset's ungodly tight body, entering a dimension of pure, blazing bliss. “H-holy cappy wappy Sunset I-!” Pinkie exclaims then gives in to her urge to hump, shoving her cock in deeper and drawing a yelp from Sunset.

“W-wait Pinkie I-!” Sunset starts, clawing at the wood beneath her, and Pinkie answers by drawing back and giving another hard thrust. “Pinkie wait! P-please!”

“Oh, sorry!” Pinkie says, grabbing Sunset's waist and wanting, desperately, to pump her again. “What um...what's up, babe?”

“Babe?” Sunset looks back over her should and Pinkie shrugs. Sighing, Sunset goes on, “Just...slower, okay? Not so h-hard. And um...could you keep your hands there, on my waist?”

“Sure thing, shorty,” Pinkie says through her labored breath. She keeps her hands on Sunset's waist and presses in, slowly, savoring, every small detail of Sunset's body etching itself in a loving caress over the head of Pinkie's cock. “Hollymolly Sunset I...I th-think I'mma...d-d-die-ey Pie...” She pulls back slow, feeling it all close behind her cock's retreat, tightening back up, then thrusts in again slow, forcing back the walls that tried to reclaim the ground her receding cock conceded.

“It's...not bad...” Sunset says, gritting her teeth. She feels full, for one thing, but having Pinkie's hands on her and hearing Pinkie's voice makes that massive, delving thing of hers seem less invasive, less unwelcome. Still, there's something missing, and she lays down on her chest and reaches down between her legs with her hand, finding her click...sonofa....finding her clit and swirling her fingers around and across it, ramping her arousal from “eh okay” to “holy fuck” in moments.

Back at Aria's doomed entrances, we find the poor omega looking between her two long-time companions, their cocks in hands and smirks on their lips. “So...” Aria starts. “I guess...how does this go again?”

Adagio smiles and sits on the bed, laying across it then moving up so she's resting her back on the headboard. She points to her cock and beckons Aria closer with her other hand, and Aria sighs, rolling her eyes and crab-walking across the bed towards her.

Look I know. Okay? But I just really wanted to picture that.

After confusing the shit out of everyone, Aria un-crabs and crouches in front of Adagio, facing away. She sits on one of Adagio's legs, lifting herself, and her and Adagio slowly guide her cock. Adagio's cock, into Aria's ass.

Or up to the entrance, as she's completely unlubed.

However, unfortunately for Aria, this is Adagio we're talking about. Adagio takes some of Aria's slickness and rubs it over her cock a few times then calls it good enough and starts pulling Aria down onto her throbbing womanhood.

Which in this instance is a cock.

“F-fucking-!” Aria starts, but Adagio cuts her off.

“Working on it,” Adagio grunts, holding down Aria's waist and bucking her hips up, trying to force her way in by sheer … by sheer force.

“I'll help!” Sonata says, surging forwards and grabbing Sonata's waist, forcing her down forcefully onto the upward forcing thrusts of Adagio's force-rod.

So close.

“You dumbass b-!” Aria's shouts of refusal melt into acceptance as Adagio's cock starts wedging its way into her ass, vicious thrust by vicious thrust, with Sonata's weight forcing her down onto it.

Bit by bit, Adagio feels her cock forcing its way into Aria's incredible tightness, the warmth and friction like nothing she's ever felt before. The bit of Aria's wetness that she'd borrowed does nearly nothing against the constricting, denying force, and Adagio craves every tiny bit of progress, every painful reaming jab, every sound, the squeaks and grunts and whines and shouts, and when she smells, with her fox nose, the scent of Aria's tears as she starts to cry, Adagio can only crave more.

Aria doesn't know how long she's force-fucked anally by Adagio's skewering meatload, ha, but finallly she sits, rather uncomfortably, her hips flush with Adagio's and her ass full of weenie.

Fuck that's a good line.

“Fucking...fucking shit,” Aria says, hilariously. She looks back and sees Adagio's eyes squeezed shut, biting her lip and almost squealing at every little motion Aria does and Aria admits that at least that's kinda fun.

“Okay!” Sonata exclaims, as if she was Pinkie. “Here we go!” She wraps her hands up under Adagio's legs and pulls the whole combo forward, making Adagio's head slide down the headboard, much to her surprise. She can't yell out though because the little movement of Aria on her lap almost squeezes the cum right out of her, because that's how it works.

That's not how it works. But the little motion does almost finish Adagio off then and there as she feels Aria's clenching tightness try to fight its way away. She grabs Aria's shoulders and shoves her back down, keeping her there while she lays flat against the bed and Aria lays flat against her.

“Heh, nice!” Sonata says, lining her cock up as she sits betweeen both girls' spread-open legs. She presses it into Aria's slit and Aria bucks, again almost finishing Adagio off. “Calm down, calm down,” Sonata coos, moving forwards until her cock is almost pressing in by sheer...physics. She lines up again like a … like a person with a gun pressing the muzzle of their rifle up against their dear friend's vagainia while their dear friend takes a cock up the ass from their other good friend.

Just like that's. That's how Sonata lines up her cock.

She presses in further, bit by bit slowly, but Aria's no wimp and she, whimpering, pulls Sonata deeper with her feet on the small of Sonata's back. Sonata starts to laugh but can't as she feels the indescribable pleasure spreading across her as her beloved envelops her fully in warm wet tightness.

See, she said indescribable guys, I'm off the hook!

“It's so...so amazing, Aria,” Sonata starts describing it goddamnit, “it's like...p-pressing myself into your heaven. So tight, and warm, and it's like it's throbbing all around me, like it's just...hungering for me, begging me to do...to do this,” she pauses pressing deeper and into a maddening tightness before it gives way, cinching her cock for a moment as she pushes deeper and deeper, like a ring of pure tightness moving up her cock like a … like a ring of ...Sonata save me “Aria...Aria you're so...” Sonata lays across the shuddering, awestruck Aria, whose hands are clenched tight on the sheets beside Adagio's body. Sonata kisses her deeply, deeper still, more and more, her lips mad passion and her hair their veil as she grinds her cock into Aria deeper.

“Oh fucking holy fuck me, please Sonata holy shit with both of y-you with with...please, please Sonata,” Aria begs and Sonata obliges, kissing Aria one more time before pulverizing her hole with her VAGINA OBLITERATOR and sending Aria sky-high in a shamless, hey how about that, SHAMELESS hip-bucking orgasm, but Sonata ain't stopping until she's done so she just keeps fucking and fucking utnl she's done.

Sonata's cum before, but never like this. There's no rushing wave, no rising, crazed high. There's just one huge fucking explosion then she screams for a while, then passes out.

Beneath Aria, Adagio makes use of Sonata's unconscious weight and starts fucking the ass out of Aria's ass, but it doesn't take her long to meet the same fate as Sonata, crying out pitifully as she cums into Aria's ungodly did I say that already? Aria's un-demon-ly....un-Cthulhu-ey tightness. Of her ass. Which is full of dick.

Am I doing it? Is this almost M/F?

Outside, because Pinkie's pounding Sunset outdoors in public like a goddamn degenerate (ily Pinkie Pie), Pinkie's pace has reached manic levels, her thighs slapping hard against Sunset's ass as she merrily pounds away. Sunset, having goaded herself up to … close enough, having handled herself to the brink (and beyond, a few times) of orgasm, doesn't need Pinkie to go slow anymore.

She just needs Pinkie to goddamn finish already.

To help, she backs her ass up, taking Pinkie in pace with Pinkie's thrusts, and she tries her hand ((not literally))))))) at milking Pinkie's cock with muscles she hasn't really used a ton before, defnitely ...dnfdhf not for this purpose.

Pinkie finally reaches that explosion of spurting joy and blasts blast after blast into Sunset's blazing warmth I say blazing a lot leave me alone. Sunset feels Pinkie's cock start spasming like a fish with a fork inside it, jammed into an outlet, then Pinkie passes out on her back (almost passed out not really geez) and starts licking at Sunset's ear as she fades out of conciousness. Sunset gives up the goat and flops onto her side, feeling Pinkie's limping dick slide out of her like a (oh here we go) balloon filled with sand but not like a lot, just a bit, like a makeshift club, and suddenly the sand is like escaping so it's just small and floppy now but instead of sand it's COOM and it's filling Sunset's (deep inhale) VANGANAGAHOOG.

I did it. I won the money.


Following shortly after everyone fucking each other with big ol' donguses, they lose their dhangusiis since potions aren't forever, unlike your private information in google's servers, so wee mc. Woo woo's turn back into normal fox girls. Three of which used to be magical monsters that are kinda like seahorses but way more or less sexy, one of which is a person (was a person, now is a fox person) who used to wait whit shit a person who is a reflection of a pony in another parallel dimension, and one of which is really a pony from that parallel dimension (is it parallel or alternate? Is there a difference?) who came to the human dimension so she's like a pony that's a girl that's now a fox girl. She never had a dick though (we're talking about Sunset Shimmer keep up) and she still doesn't have a dick but she totally got some cummies all up in her (I hate that word) and (by “that word” I mean “cummies” it just sounds...I dunno stop ruining gummies jfc) and she wonders briefly if maybe she's now pregananananananant with Pinkie's child until she remembers something way back in chapter somefuckingthing where the whole “pregars is blah and not turn-on” so the author declared she wasn't going to address it at all and now that Sunset's remembering that she's ever so thank ful , not realizing that the author may at any time decide that they're all rep-prepppgg.

Okay. Okay let's all just calm down and put the guns away.

Not realizing that the author may at any time decide that they're all pregnnnt as all hell. All of a sudden. Hell they could be like 9th trimester (shush) and about to blow their load (their baby load) all over the docto's. Docto Octopus all over his face like mad money cash g. Yo.

Deciding that the longer the author does the non-dialogue prose the crazier everything gets and also deciding that she doesn't want things to get much crazier at the moment, Ysolda runs down the main down-way from the doors of Whiterun (the White Way, pretty sure hey you remember when Goku ran along the White Way for like thirty-five episodes on his way to King Cricket's place?) and hoo boy is she thirstin' for mammoth tusks.

Literally.

But she doesn't bring that up unprovoked to strangers because that'd be a big ask out of nowhere for a bunch of cum'd up fox girls.

“What's going on here? Where are the guards?” Ysolda surveys the wreckage of a khajiti apparently I'm not capitalizing that of a Khajiti merchant and a Nord...Nord? Nord carriage commandant of the sixth dynasty man am I sure I don't have a fever?

“Hi lady!” Pinkie says, waking up from her post-nut bliss and using grand telekinesis to yank Ysolda over to where she and Sunset are laying. Heh remember when this chapter opened and it almost looked like Sunset was going to do shit? Fun times.

“L-let me down!” Ysolda says.

You know where this is going, don't lie to me.

Pinkie sets her down gently in some nearby hay because the author's completely sane and I don't even know what you're talking about. The guards start running down the hill though and even though the girls (Pinkie and Sunset, the other three are still basking in the afterglow of doubple-plbowing Aria. That's right, you read it here folks they all shoved their plbow baggins into her douplleb and now they're just laying there in a big cummie pile. If I hate that word why am I using it? O shit this is a parenthetical?) can see the guards' faces due to Sunset installing a cool amor mod. Armor mod

Armor mod.

Even though Sunset installed a cool ARMOR mod, the guards still kinda all look alike and alright, alright, I'm done trying to rationalize why they're okay with killing people. Pinkie Pie fires a Frozen Orb that spins and shoots Ice Fuckers ina spinning spin of spinning spin death like beyblade but disconnected and blue and also made entirely out of frost instead of what Beyblades are normally made of (fucking unobtanium or something) and the guards get shrek'd.

The icy shards of glass-like...ice slice into their bodies, leaving frozen frosty holes behind. Like cauterized because the temperature is so low that the wounds ar closed but not closed with sweet singing. Like singe. Not sing. Singeing? Oh it let me get away with that one sweet, you know most of this document is just underlined red shit.

They drop to the ground, hearts and heads exploded (and other things too) their blood slowly melting the frosty closed-shut wounds and eventually they will thaw through and the. That's not right. Close enough. Eventually the warm blood will get through and start flowing together with the melted water of the icy magic and it's like ironic.

It is. Believe me. Super ironic.

“Are we gonna survive today?” Pinkie wonders aloud, not even knowing what's in store.

“...you know, I'm not sure,” Sunset admits, standing up and patting Pinkie's shoulder. Screw it, patting Pinkie's ass. “But if we don't survive...I'm glad we shared this. This moment, these feelings, even if...even if you don't really feel the same way. At least you love me, and at least...well...”

“At least I bust a load into your tight holde!” Pinkie fucking says. Pinkie, c'mon, spell properly. One word or the other, just pick one, geez.

“...yeah, I'm glad we could spend some time together likee that. Hey, have we had sex um...without dicks?”

“I have no idea!” Pinkie says, channeling the author's terrible memory.

“Well maybe we can-” Sunset starts. Doesn't finish. Ulike Pinkie Pie, inside of her. But earlier, not now.

Not now yet.

“Are you tring. Trying to make the oh no, no you delete that right now, you're not allowed to make typos in dialogue.” No one says.

To Sunset, though, Aria says, “Aria?”

Adagio talks then, because that's who I was trying to have talk. “Sunset Shimmer, are you trying to have gay sex without us?”

“No!” Sunset lies, trying to have gay sex without them. “She's lying, she's just crazy!”

“Ha, who? The alleged narrator? Sunset Shimmer, going bonky bonk again,” Sonata says, really really asking for a cookie. She'l find one if she goes into Whiterun, I swear. “Oh, let's go into...whatever Whiterun is, I hear there's cookies?” “I hear there's cookies!” She didn't question mark. She knows a mark. Period.

Ah, another thing I would include because it isn't fun for me to write about.

Ah, another thing I won't include because it isn't fun for me to write about.

The party goes up the hill to Whiterun's main, now unguarded gates, and pop through because are they even locked? They come in and see Dude McDudles hassling Blacksmith Lady of the Outdoor Hotness about making more swords for the Imperials because life just isn't the same without the sounds of their blades clattering along the ground after they get a good ion-cannoning.

“I won't make swords for the war,” Lady says, or whatever her dialogue is. The two look up, feeling something a bit off, and see five hypersexed teen foxgirls of indeterminate age (beyond teen, as in, beyond teen being a determinate approximation of their possible range of ages, from one teen to thirty teen thousand).

Man Dude starts to talk but Sonata tackles him to the ground like the plot device she is and throttles him. If you think that's a sexual term, well it's not, at least on it's own. I guess there could be erotic throttling. Heck everything can be erotic.

“Where's the cookies, Magic Mike?!” Sonata screams at the confused man. The blacksmith lady tries to stand up real fast from the grinding wheel-a-doodle but trips and falls over, but Aria catches her.

“Thank you...but what are you?” Lady Blacksmith goes.

“Uh, a normal teenage girl, duh,” Aria says, her floofy tail that I just remembered they had being all fluffy-wuffy swirling-floofy-doofy cuddle-wuddley. “fuck dude.”

Blacksmith lady ooks over at The Juice is Loose, then to Aria. “I'd rather not...fuck that dude.”

“Oh, cool,” Aria says, glossing over the misunderstanding. “Could you fuck me then?”

“Aria!” Adagio growls, walking over. “What's gotten into you?”

“Well, not this random lady. Yet. Wait wtf?” Aria forgets she can spell the whole thing out for three words. You just cost me two words, Aria. “Weeble wobble,” Aria says, trying to make it up to the author.

The author will forgive Aria, for now.

Adagio turns to the rest. “Alright everyone. We're in very, very dangerous times right now, with the...world as it is. So we should just try and spend the night somewhere, calmly, so nothing too terrible can happen.”

Some Fucker(tm) walks up to the fox girls. “Get to the cloud district very often? Oh what am I saying, of course you don't.”

“Oh that's it,” Sunset says. She grabs him with Grand Telekineses and nods at Adagio. Adagio lifts Sunset as high as she can with Grand Telekinesis. Then she turns to Sonata.

Sonata does the same, lifting Adagio as high as possible, then Pinkie Pie, does the same for Sonata, and finally Aria does the same for Pinkie Pie.

Now up near the clouds, Sunset yells out to Nazeem, “How's this for a Cloud District?” before shooting him as high up in the air as he'll go. The girls let each other down easily since I don't wanna write the details, and by the time they're all there they find out that Nazeem landed and crushed a chicken.

Cue the 'aw shit here we go again' meme.

Guards and townsfolk start charging over, weapons in hand, to avenge the chicken's death. Many step over and upon Nazeem's body as they go to check the chicken's vitals and mourn the chicken's passing.

Heimskr (how close was I on the spelling?) runs in an suplexes Nazeem's corpse through the floor and straight to Oblivion where it belongs, yelling "Trust in me, Whiterun! Trust in Heimskr! For I am the chosen of Talos!”

Back at the ground, Sonata jumps another human, this time Braith, and pins her to the ground. “Where are the cookies you goblin!?”

Braith punches her across Whiterun, going all ultra-instinct.

No that's silly.

She just struggles with her little useless child-arms like the potato she is and whimpers, begging Sonata not to kill her. Sonata sighs and lets her up, then promptly jumps on Milfga Whitemane. Not the mom, the woman.

The hot woman.

“Yo, comfy chest!” Sonata says from the safety of hold up. Olfina Grey-Mane. I spell Gray Grey, get over it. “Where your cookies at, now that I've already found the milk!?” With this Sonata nuzzles her face into Olfina's chest and hums warm vibrations into it, the warmth surrounding her like a warm blanket.

“H-help! Guards!” Olfina calls out, drawing her Skyforge steel dagger. It's pretty obvious when I actually pull the wiki up.

“Daw don't be like that,” Sonata coos, slashing Olfina's hand off at the wrist. “Whoops! Whooooops!” She goes on, cutting Olfina in half. She then casts resurrection and Olfina's fine and Sonata gets a reset on her comfy comfy chest.

The rest of the fox girls proceed to blast the ever-shitting fuck out of the entirety of Whiterun, running across buildings and raining hell down upon the townsfolk. They don't use ion cannons because they'd like at least some small portion of the town to survive (the buildings, not the people) so they do totally normal things like firing frozen death lasers (Glacial Ray, the spell's called) across the main thoroughfares then using Spirit Storm to snake around the edges of everything (and finish off those slowed by the left-behind ice crystals of Glacial Ray). In moments everyone's dead, except the children.

Braith ran off a while ago, Wimp is crying under a crate somewhere, Orphan is in the hall of the dead because she can, uh.... “Hungry Daughter to Feed” went outside (of Whiterun) following the whispers of ghosts.

Like a normal kid.

Sunset sighs. “There has to be something we can do to get back on the right track. I don't...I don't want to give up this world, where I can finally...”

Pinkie Pie steps up next to her. “Finally what?”

“Finally...be with you. I kissed you. I don't know why, or...I mean, I know why. But I don't know why I actually did it. I should've just...could've just...if I hadn't done that, we'd still be home. Friends. Safe, sound, surrounded by loved ones but just...friends.”

Pinkie bumps her shoulder against Sunset's, then presses it against her, firm. “Hey, you don't know that. Maybe someday you would've gottan all brave-like and told me, and I'd...well...”

“Yeah, Pinkie. What would you do? You didn't...you didn't like sex, or think about it, or think about love or romance or anything before this.” She motions out to the devastation of death and destruction all around them. “This is what it took to be in a world where you...well, I don't even know. You say you love me, but it's just like all our other friends, isn't it?”

“Well...” Pinkie looks down as a bit of frozen villager snaps off the rest of the frozen villager and shatters on the ground. “I..guess it is. I don't really feel different kinds of love, I don't think. Just the one. But...I mean, I wouldn't let anyone else have sex with me.”

“But you would. Heck, you have. With Sonata and Aria and-”

“But that's just this fox girl thing!” Pinkie says, scowling. “You even said it was okay!”

“I know, but...”

“No, you can't just 'I know but' when it's something like this. If I'm bothering you...if who I am, isn't good enough...if what I can give isn't good enough, then...then I don't know what to do,” Pinkie, whose anger had been growing, ends softly, plopping down in a sit on the roof of the apothecary.


“Hey,” Sunset says, wishing these segments weren't broken by day but instead by chapter so the author could look back at things. “Pinkie...what if we just...stayed here?”

Pinkie looks up at her from her place on Sunset's shoulder. She's not a bird.

Guys. Guys I need you to understand this.

Pinkie Pie. Is not. A bird.

She's sitting next to Sunset, feeling all sorts of mixed-up in the membranes....the...the femme brains....oh god why did I ANYWAY all mixed up in the feels, atop a roof of...THE roof of the apothecary and or alchemist.

The alchemist is dead by the way. A ton of people are dead, and the Dazzlings + Pinkie + Sunset killed them.

Pinkie looks up from her head's spot on Sunset's shoulder, because she's rsting her head oh c'mon auto correct work with me here. She's resting her head on Sunset's shoulder and the uathor has decided that fuck trying to correct sentences with new sentencs.

“Sunset...but...I mean...” Pinkie looks around at the destruction they've wrought. “Was there any chance of us leaving anyway?”

Sunset's eyes go wide and she looks out, spotting Heimskr who sruvived somehow. He suplexes the Gildergreen or whatever it's called and starts screaming about Talos while wieldin the shrine of talos like an axe and chopping his way into the inn The Shining style.

“Huh. Yeah, I'm guessing we're probably stuck here,” Sunset admits. “I just wish...we could get rid of all these ridiculous mods and such. I mean, it's nice being immortal...practically immortal, and the thought of you getting hurt and not being able to come back is...” she shudders, squeezing her eyes tight.

“I know, but...Sunset, if we keep up like this, won't the whatevers of this world come after us eventually? The gods or Leggy Morasses and such?”

“...Sheogorath?” Sunset's brain gets dumber from Pinkie's mouth noises.

“Hey, that's mean,” Pinkie says. Sunset's brain gets normal again. “And yeah, that's the name!”

“Yeah...” Sunset sighs. “But Skyrim without mods is dangerous. Besides, I don't think we can unlearn spells and such. So...” she looks down at her ring, then the heavily enchanted armor. “I guess if we got rid of all this though, we'd only be able to cast the spells if we got enough actual practice. Like...like actually learning the magic.”

“Sounds good to me!” Pinkie exclaims, standing and hucking the ring into the distance. Girl Who Listens to Ghost Whispers outside (one sec...Mila Valentia) sees the ring land near her and picks her up, setting up a plot that the author swear to not let be a loose end.

Sunset chuckles and does the same, and Mila now has double immunity to all magic and can cost her spells for free. Twice. At the same time.

The girls then huck their highly enchanted leather armor over the wall and -

Okay first off, let's just all calm down for a moment okay? She's not the vanilla Mila. She's got...okay there are mods. She looks less like a potato and more like an actual human. Now, that said, clearly the leather armor for the teen girls is going to fit...oddly on her. But that's okay. She'll grow into them. Still, she's definitely going to wear them. If it makes you feel better, she can wear her clothes underneath.

Look, I need this “Mila Valentia is now a war god” plotline, and I'mma have it. So there.

Adagio, hopping over from Jorvaskr not even gonna try with that spelling, glances down at the two naked fox girls, her tail whipping to and fro with interest as she sips brain from Kodlak Whitemane's severed head. I could've said blood. I should've said blood.

She's sippin' straight brain, yo.

She stops sippin' brain out of his head like a sippy cup with a straw made of one of his severed ribs and raises an eyebrow. “And what might you two be doing? Planning on making love up here?” She kicks at the roof, the thatch swallowing her foot. “Seems a little...scratchy.”

“Well,” Sunset Shimmer says, imagining plowing Pinkie's pie (hey! It's back!) straight throught he roof but blinking the thought away. “We were gonna get rid of our super powerful gear so we could...I dunno, avoid the wrath of the gods?”

“We've likely already earned their ire,” Adagio says. “If you get rid of everything now, you'll just be less able to defend yourself when they do come.”

“Oh...oh well I-” Sunset starts and Adagio, true to her passions, interrupts her. She really, really loves doing that.

“I suppose I understand, though. It has been a bit...dull. I had always thought that having vast magical power would...” she lets Kodlak's head fall out of her hand and roll down the roof and over the edge, landing with a meaty thwack on the hard cobblestone. “I...I suppose I thought...it might make happy.” She sits aside the other two, realizing just how empty she feels.

“I've felt....kinda happy, at times,” Sunset says softly. “But not from the power. Just from figuring stuff out with all of you.”

Adagio glances over at her, then rolls her eyes, though she's smiling. “Ugh. Well, I suppose we don't really need all this power. And it may come to bite us in time....and not in the good way.” She hucks her stuff over the wall and let's just say Mila could probably smack Anduin out of existence at this point with like, her pinky. “Besides,” Adagio continues, “we still have our bellybutton piercings.”

“Oh, right,” Sunset looks down at the glittering amber stone in her beyy. Her belly button. “I think it had like...health, magicka, and stamina regen?”

“We may not be immortal, but we'll be hard to tire out, and we'll recover quickly,” Adagio says, nodding. Sonata and Aria hop up on the roof. Sonata sees that everyone's naked and figures it's orgy time so she makes Mila even more OP by hucking her stuff over, and Aria, figuring that if it's an orgy she's gonna be the star attraction does the same.

The girls who aren't Aria stare at Aria, their lips trembling. Face lips.

(Deep inhale.)

SNERRRRRK.

“Erm,” Sunset says, looking between them. “Glad to know uh...that you girls are all on board for not having overpowered magical items anymore.”

“Huh?” Sonata says. She chucks her ring for no known reason and Aria, caught up in the moment, doesn't, because she's not an idiot. “I figured it was luvin time, what's this about overpowdered?”

“Powered. Over powered. I'm amazed that was intentional, though,” Adagio grumbles. “Aria, throw your ring over the wall.”

“What? No, this thing's sick,” Aria says, squeezing her legs together as her arousal mounts from Adagio's edict. “You want this ring you uh...better like...take it from me.” She sticks her hand down into...into the between of herlegs.


The author has an idea. Wait for it, it'll come.

SNERKRHRKRK.

Sonata james .

Be quiet. I see you out there, laughing at my brilliance.

Sonata JAMS her hand into Aria's crotch and grabs her hand out, growling, chucking the ring over the dge and furthering Mila's ascension to godhood. At this point even cutting the finger with the ring off won't work because she's now got like five of the damned things, so take that Sauron you dumb fuck.

“Sonata what the-?” Aria starts but Sonata yanks her close and wraps her arm around Aria's waist, kissing her deeply.

As she draws away, her eyes gazing into Aria's, Sonata's brain starts to function again and she stares vacantly for a few moments. “Wait what we doing again? Is it..each other?”

Adagio sighs. “You're insatiable. We should get inside though, seeing as how we're all naked and now no longer immune to the cold.”

The girls agree and head inside, though not before Sonata squeezes Aria close to her, giggling and nuzzling Aria's soft, fluffy ears as her tailwhips about between them.

“Heheheheh, your tail is so fluffy wuffy Aria,” Sonata says, letting it tickle between her legs.

“Yeah well...that's kinda just what they're like,” Aria murmurs, her breath shallow as Sonata holds her tight against her, their body heat rising in wispy mist off of their chill skin as the Skyrim sun starts to set.

I mean I guess it's the whole sun. For the whole Tamriel. Mundus? Man I had a nice groove going there too, damnit Bill Cipher.

“Okay, let's go!” Sonata says, taking Aria by the hand and hopping down to join the others who hopped down off the building offscreen.

They enter Belethor's shop because today just isn't Belethor's day, and he seems to know it too because he's currently stuffing everything he can (in order of what'll sell for the highest price) into a sack sack. Big ol' sack. I was goint to say knapsack.

“AH,” Belethor shouts out from back in his back room. “Uh, take a look around, I'll be out in-” more sounds of jamming stuff into sack “-in uh, just a moment, so just hang tight.”

“LIAR!” Pinkie Pie shotus and accidentally also Shouts, sending a bunch of decorative glass shards (formerly vases) flying into the back room, giving Belethor a mean scratching. Also a mean murdering.

“Pinkie, I can't believe you killed a man,” Sunset says half-assedly. “Oh hey, blankets and fur armor. We could get pretty cosy here!”

“Yep!” Sonata agrees, tossing Belethor into the firepit to keep the fire alive. Alive. Unlike Belethor.

“Um...?” A little blonde girl in the corner of the shop pipes up.

Adagio glares over at Sunset. “Seriously?”

“W-what? I just...” she loots a bunch of money and supplies and hands them to the girl. “Here, go out and use this to hire an adventurer to save your mom and such. If you stay here, uh...yeah you'll probably die.”

“yeah...” the girl agress, taking the supplies and running outside.

Sunset dusts off her hands and smiles proudly, her hands on her hips. She is then promptly punched by Adagio.

“What?” Sunset asks, glaring at Adagio.

“Nothing. Nothing at all.” Adagio glares back then sighs. “Look, I'm not here to judge you. I mean...obviously I've used or come across many of the same mods, but you're really making it difficult for if we ever do get back to our world.”

“How so?” Sunset asks.

Adagio heads into the back room, joining the others, and drapes a few bearskin bearskins over herself then sits on one of Belethor's few chairs. “Well, what if these idiots actually start putting things together?”

Pinki perks up. “Oh, you talking about us?”

Sunset raises an eyebrow at Adagio. “You're not worried about them, you're worried about the readers. Are...are you a self-insert?”

Adagio's eyes go wide as she grimaces. “How...how dare you? To think I'd be a self-insert of that degenerate? If anything, I'd think you're the self insert. Always crushing on girls who are just ever so out of reach.”

“What? Pinkie's right here,” Sunset says as Pinkie sits next to her and the two start cuddling underneath a … a mammoth skin rug.

It's huge.

Aria and Sonata join them, and Adagio looks lonely so they all make room and pat the same spot. They pat it really fast though, like cracked-out crack people, creating a huge, thumping sound. A cheese wheel from Belethor's sack (that didn't get thrown into the fire) rolls out from the thumping, having been summoned by the combined furious drumming of four fox girls, and ends up rolling right into the middle. It then turns on.

Like a television.

“...the hell?” Aria says as a scene flickers into view on the cheese wheel's screen.

I told you it was a great idea guys.

“Hey, I know them!” Pinkie Pie says, making it canonical that the MCU is a movie series in My Little Pony: Equestria Girls in one fel swoop.

Captain America's bent over a plot device, looking back at Bucky, who is nude from the waist down.

You'll never guess where this is going. Go on. Guess. I dare you.

I don't remember much of anything about Bucky so let's just say he's got a robot arm. I don't remember which one's not a regular arm, so let's just say 'his left arm is now a robot arm.'

The girls, now enraptured by the ridiculous bullshit going on in the cheese wheel's screen as they cuddle up, naked, under a mammoth-skin rug that takes up the entirety of Belethor's back room (except the fire and a safe area around it) watch closely as Captain America glances back at Bucky.

“C'mon, you gonna make me wait all day?”

Bucky looks down longingly at Capn's butthole. One sec.

One sec, I gotta stop laughing.

Bucky exhales slow, then bites his lip.

Capn' raises an eyebrow like a cheeky tart. “What's wrong? America's ass got your tongue?”

“It's about to get a whole lot more than that,” Bucky says, holding up a robo finger. The top of his finger pops to the side like a cap and starts expelling lube. “Don't watch while I work. I might...misfire.”

Capn' smirks and chuckles then whimpers because that's totally a thing that he'd do right now.

Bucky lubes up a finger and slides it into Capn's puckery hole, feeling it press in and then get cinched a bit at the base but otherwise be pretty free to just wiggle around in Canp's shit wait...

Wait I meant shit referring to the typo. Not like. His actual shit.

Because of course they took the ridiculous, over-the-top time to actually do the whole enema thing, and Cap'n also hasn't had fiber rich foods ro whatever in like a hot sweaty minute.

I've studied M/M a lot I swear.

Shit they're onto me.

What shit's not onto though, Is Bucky's finger. Bucky chuckles low down to Anpan and speaks in a low murmur, “Well, Cap'n? Do I pass muster?”

“S-satisfactory,” Captain says, revealing the author's dramatic lack of military jargon knowledge. “Could stand for a promotion, even.”

“A promotion, huh? Guess I'll move on up to two chevrons then,” Bucky says, moving another finger inside instead of just putting his goddamn dick in there for fuck's sake.

Seriously.

What a jackass.

Adagio turns to Sunset Shimmer. “So...what mod is this now, Sunset Shimmer?”

“Don't look at me,” Sunset says. “I've never even heard of a T.V. in a cheese wheel mod. Much less a porn version.”

Aria groans. “God, robo-cop back there is as much of a tease as you, Adagio.”

“At least I get to the good stuff in some semblance of haste,” Adagio mutters. “How many fingers-?”

As if in answer, Bucky starts working a third finger into the Cap'n, apparently not fucking ready to put his dick in. If he even has one.

Schrodingers cock.

Capn' whimpers and moans and makes other gentlemanly sounds of rising ecstasy as Bucky's fingers drum over his - hol' up – prostate, making a tingly sensation (don't @ me) that thrums through Captain's raging bon-hona-gahoog like the vibrations through water of a Tyrannosaurus meandering around as it looks for a main character to eat.

Captain America looks back over his shoulder at Bucklefuck. “You're killing me, Soldier. Stand and deliver already.”

“Alright,” Bucky says with another smirk. “I guess it's time...”

“Oh thank god,” Captain says.

“To move up to four fingers,” Bucky goes on.

“...what.”

Bucky slides his lubed pinkie into Captain's asshole and Captain gives a frustrated huff, echoed by the watching fox girls out in Skyrim.

“C'mon man, it's a fucking pinkie, what more's it gonna add?”

“Fair enough,” Bucky says, smelking, which is like a milky version of a smirk. He jabs his now-lubed thumb into Captain and Captain writhes.

“The fuck?” Captain glares back. “The shit is this?”

“You wanted more,” Bucky answers simply.

“Yeah I wanted your cock, not...this is like the dead-fish-handshake equivalent of a fisting.”

Bucky shrugs. “We gotta prep.”

“...yeah like some lube, not like....this whole production.”

“You know what? Just for that, I'm doing a whole communication whatever thing.”

Captain raises an eyebrow back at him. “Uh. A what?”

“You know, like...I make a big show out of calling it off. Here like this.” Bucky pops his arm off, leaving his five fingers stuffed into Captain and revealing that he'd been using his robot arm for the fingering this whole time.

Captain looks back at the robot arm dangling out of his asshole, then up at Bucky.

Bucky gives a one-shouldered shrug. “Your move, Captain.”

The girls look at each other.

“Uh,” Sunset starts, “is there like...a channel select on this thing?”

Pinkie pokes it and it changes to a scene of what could be an anime.

But is actually another alternate dimension. Not that they know. So it looks just as real life as before.

“Three girls?” Sonata says. “Dang, guess there won't be any sex then.” She grins and looks over at the others and they collectively roll their eyes.

On the screen, Oomuro Sakurako (aka a thirteen....I mean a two million year old girl with short blond uneven hair and a flat af chest because she's just lucky like that goddamnit my lower back) bounces over, fully clothed (you've seen my fic, you know I needed to specify) to her sisters, who are also full having of the clothes.

Her older sister, Nadeshiko, is like if Sakurako was older and more refined looking. Also a whole lot less stupid.

Her younger sister, Hanako, is like if Sakurako was younger and more ephemeral looking, with much much much longer hair. Also she's a whole lot less stupid.

Sakurako ain't the sharpest bread loaf in the crayon box, if you know what I'm moisturizing.

Pinkie Pie glances at the other girls. “Wow, I bet no one's even heard of these characters!”

“Don't rub it in,” Sunset and Adagio grumble in unison, then do that whole Spiderman pointing at Spiderman meme thing. “Oh shit,” they say in unison again.

“Shhh, I got a good feeling about this one,” Aria says, staring intensely at the screen.

Like a degenerate.

Sakurako plops herself next to Nadeshiko, who is sitting on the couch, scrolling through her phone. Hanako, meanwhile, is doing her homework like a good child.

A um. One point five million year old child.

Nice. Safe. Alright, moving on.

Sakurako groans, covering her eyes with her arms. Failing to elicit a response, she groans louder, wriggling around, purposefully bumping up against Nadeshiko a bit. Nadeshiko scooches away, her eyes not leaving her phone.

Hanako, about ready to pop a bitch, clenches her teeth and, her eye twitching, continues working away dilligently at her math homework. Which is like really hard because of how ungodly legal she is.

Sakurako peeks out from under her arm, seeing that her attempts at getting attention are going unheeded, and sighs, then groans, then moans, then just starts making loud sounds until finally Nadeshiko punches her in the face.

“Hey!” Sakurako yells. “What was-?”

“Just do whatever spiel you had prepared and get it over with,” Nadeshiko mutters, looking back at her phone.

Hanako gently places her pencil down and folds her arms across her chest, waiting for Sakurako to get it over with.

Sakurako starts tearing up in angry frustration. “Well, fine! I guess I won't ask you for love advice then! Not like you'd be able to give it.” She stands and starts to go but the sound of Nadeshiko gently patting the couch cushion next to her stops her. Sakurako turns around, her eyes shining with tears but her face bright with hope, and Nadeshiko gives her the tiniest hint of a warm smile.

Grinning, Sakurako charges forth and sits back next to her sister, beaming. After a few moments of her sitting there smiling and saying nothing, Hanako buries her face in her hands and groans.

“Oh right,” Sakurako says. She turns to Nadeshiko. “So...how do you know if someone likes you?”

Nadeshiko glances over. Her gaze drifts to the ceiling as she hums in thought. “Well...I suppose it depends on the person. They could be very nice to you, wanting to be around you all the time. They might laugh at jokes you make, even if they aren't very funny, or constantly ask you questions to try and learn more about you. Then there's the ones, especially the younger ones...maybe even younger than you, who don't know what those feelings are, or what to do with them. They might lock up or get very shy or quiet around you too, though that's not reserved only for people who might like you but who don't understand their feelings. I guess I've just noticed it more with those? Hmmm...then there are the ones who don't want to admit it, or who haven't accepted it, even if they might suspect it. They might get angry for no reason you can tell, they might make fun of you. Heck, they might even bully you.”

“Yeah, yeah, that one!” Sakurako says, perking up. “Tell me more about that one!”

“Hm,” Nadeshiko, keenly aware of how close Sakurako and her friend Himawari have been ever since they were little, and remembering the time the two, as young children, had declared that they would marry each other. The two had, in recent years, seemed at each other's throats constantly, and Nadeshiko had a strong suspicion that the two were both equally confused about their feelings and unwilling to admit them, despite the fact that the two have spent almost every day together and the fact that Sakurako becomes a listless lump whenever Himawari is busy or spending time with someone else. “Well,” Nadeshiko goes on, satisfied with catching up a bunch of most assuredly fandom blind readers—who are rather cultured, to have made it this far into sheer crack—via exposition between two syllables, “I guess there's not much else to say. They'll just keep doing that, acting like they don't want to be around the other person or acting like they can't stand them, but always hanging around them anyway. It'll go on like that until one of them finally confesses.”

Sakurako's lip twitches.

Dn't say face lip. Oh I see Dn't is making a reappearance.

But really it is her face lips.

SNKERK.

Hanako sighs. “Sakurako-chan...why don't you just tell Hima-nee how you feel already?”

Sakurako leaps up and falls over the back of the couch, then pops up from the other side. “WHAT? How I feel what, squid?”

“What?” Hanako says, shaking the stupid out of her head and pushing on. The stupid from Sakurako, it's infectious, you see.

I love Sakurako, but goddamn.

“No,” Hanako goes on, “how you feel about her.”

“I don't feel her up!” Sakurako exclaims, lying. No really. She's like always groping her, telling Himawari how much she hates her breasts.

While groping her breasts. God I love Japan.

Sometimes.

“Too bad,” Nadeshiko says, going back to her phone.

“What, you think I don't know how?” Sakurako shouts at her, driving the plot in a saucy new direction.

Just kidding, I was planning this all along.

“Probably don't,” Hanako says grumpily, going back to her math.

“Oh yeah?” Sakurako says menacingly, with a terrifying grin and her hands up in grabby grabby mode.

Out in the real world, the girls' eyes all widen a bit.

“Oh, this is...this is getting um. Illegal, or something,” Susnet says, starting to sweat a bit, her fox tail wagging in anticipation.

“Yeah, yeah, shame, shame,” Pinkie adds, full on starting to finger herself.

Adagio, leaning back and forcing Aria onto her lap so she can start working Aria's clit, grunts and growls then says to the others, “Have some damn self control.”

Sonata hops between Aria's legs and starts flicking her tongue at Aria's clit for a few moments, then sits herself on Aria's lap, crushing her down into Adagio and making her almost as moist as Skywalker Ranch.

Almost.

On the screen, the arousal fest continues, driving the fox girls up into new heights of debauchery.

As alternate universe porn viewed on a cheese wheel is wont to do.

Hanako falls back away from her math homework as Sakurako lunges at her. “Wh-what are you-!”

“I'll show you just how good I am at feeling girls up!” Sakurako exclaims, pinpointing the author's location to the F.B.I.

Nadeshiko glances over as her younger sister tackles her youngest sister to the ground, and wonders why she feels her own heart start to race a little.

Uh oh.

“W-wait!” Hanako says, struggling against her bizarrely athletic dumbass of a sister. “S-stop, what are you doing!”

“I'mma tickle you!” Sakurako says, slipping her hands up into her sister's shirt and dancing her fingertips along the soft, smooth skin of her younger sister's stomach.

Uh oh.

Hanako starts busting out laughing as she tries to wriggle away, but Sakurako's boxing her in with her knees on either side. Hanako's shirt is riding up to well over halfway up her chest, and her little hands, clenching on Sakurako's wrists, can't tug her sister away enough.

Nadeshiko sighs and stands, her breath oddly shallow, and picks up Sakurako, yanking her off of Hanako. “You have to let her breathe, Sakurako, or else she won't enjoy it and just get mad at you.”

“Huh?” Sakurako says. She glances down at Hanako, who is pulling her shirt back down and glaring at her. “Wait...you...you don't hate me now, do you?” Her voice cracks and Hanako's face softens.

“No, but...Onee-san's right. You can't just tickle me. You have to like...um...” Hanako looks away, her cheeks flushed, her young age suddenly smacking her full in the face as she realizes how little she's able to verbalize her conceptualization of physical affection.

Her young age of, wait, let's see (pulls up checklist) yep yep 1.5 million that's right, good job boyos we're in the clear.

Alright that's enough of that joke, read the archive warnings, damnit.

Sakurako is, just about now, realizing that her sister Nadeshiko, after pulling her off of Hanako, has sat her upon her lap.

Uh.

Oh.

Nadeshiko, her phone down on the couch cushion beside her, slips her hands up into Sakurako's tanktop. Sakurako tries to speak but her breath shudders as her older sister runs the pads of her middle fingers from her navel up along the smooth, taut skin of Sakurako's stomach, following the lines of her slight, subtle muscles. Like silken sheets Nadeshiko softly caresses her hands up the slight, trembling curves of her sister's undeveloped body until she reaches her chest.

“O-onee-chan?” Sakurako stammers, her breath fast and her heartbeat growing frantic as the prickles of sweat start along her back.

“You have to start gentle. Well...sometimes. Everyone's a little different, but starting gently is usually a good way to start off, until you're each sure what you like. Which...unfortunately for you, takes talking.” She swirls ones finger around her sister's nipple, avoiding it just barely for the moment, while her other hand comes up through the opening of her tanktop, taking her chin between two fingers. “You've never been that great at talking, to be honest.”

“I-I-I-” Sakurako says, her shoulders tightening suddenly as a strange sensation sends a pulse through her hips. “S-sorry,” she says, trying to still her body.

“Sorry?” Nadeshiko cocks her head ever so slightly. “Oh, that little grinding you did.” Nadeshiko gives a slight smile and adjusts, slipping her hands out of Sakurako's tanktop for a moment.

Sakurako, at once, feels she's done something wrong, but Nadeshiko takes her hips in her hands and sets her more firmly in the middle of Nadeshiko's lap, giving a little hip pulse of her own.

“It's alright, Sakurako. It means I was doing good. Just let the feelings come. Let your body do what it wants, and it'll all turn out alright. So long as the other person doesn't tell you to stop.” She takes the hem of Sakurako's tanktop in her fingers, her body giving a small shudder as her legs, splayed out on either side of Sakurako's, squeeze a bit on Sakurako's thighs. “Do...do you want me to stop, Sakurako?”

“H-huh?” Sakurako, her voice faint, seems to snap back into awareness a tad bit more. “Oh, no. I'm good, um...” She takes her sister's hands in hers and guides them into her tanktop clumsily, towards her navel. “You can...you know. Do it again. And um...whatever else you wanna show me.”

Nadeshiko smiles, then presses her lips against the nape of Sakurako's neck. “I will, then.” She glances over and sees Hanako pouting, then chuckles. “Hanako, would you like to help?”

Hanako blinks. “Help? How?”

“Come here,” Nadeshiko says, slipping a hand out of Sakurako's shirt and patting Sakurako's thigh. “Sit here, with her leg between yours. Though I guess...we'll be helping you, more than anything...”


The


The author has reacquainted herself with the Dazzlings and has once more fallen in love. However, this is crack porn about cheese wheels, so onwards we go.

“Man,” Sonata starts, grinding harder down on Aria, “imagine if this silliness actually like, gets spun off into some sort of actual, really good Equestria Girls fic focused on us. ”

Aria snorts, her eyes squeezed shut as the ecstasy of being ground on both top and bottom by Sonata and Adagio respectively sends her to a nice, even plateau of 'almost fucking there.' “You really think anyone from the fandom's gonna want that after she just inserted some underage incest porn from a completely different fandom via a magical cheese wheel?”

Adagio presses her palms down on Aria's thighs, moving them towards the inside of her knees and spreading her legs apart before speaking in a low murmur, “When has the fandom ever kept the author from gracing them with her works?”

“Alright,” Sunset sighs, “at this point it's more of a fourth-wall-heap-of-rubble than a wall. Can we focus?”

“Yeah!” Pinkie exclaims. “Ya'll are distracting me from the ponr!”

“...pont huh? Ponr. Pony.” Sunset blinks. “Okay anyway, cheese wheel of porn. So is this gonna be like Beavis and Butthead?”

“Eh,” Pinkie starts, not yet exclaiming. “More like Mystery Science Theater? Oh hey, now both of those things exist in Equestria Girls!”

“Oh. Sweet!” Sunset exclaims. “I agree though, it'd be totally rad if we had like...a real fic. But this'll do for the meantime.”

“Whaddya mean, Sunset?” Pinkie asks, fingering herself more deeply as she adjusts under the mammoth skin rug taking up the majority of a dead man's back room so that she can more easily watch the interdimensional porn on the magical cheese wheel that is native to the video game world they got isekai'd to via a toaster that may or may not actually have any magical properties. “This is a real fic!”

Sunset sighs and smiles, leaning onto Pinkie as she rubs, gently, the smooth skin just above her clit. “Well, whatever it is, I'm just glad I'm here with you.”

“And us!” Sonata says, slamming her ass down hard over and over on Aria's bucking lap as Adagio claws into Aria's sides, humping upwards and desperately trying to get some contact.

“...yeah,” Sunset says, avoiding eye contact and looking instead at the magical cheese porn.

Meanwhile, on the...on the magical cheese porn, Hanako stands and makes her way, slowly, to her sisters, her hands clenched nervously on the sides of her dress and her lips trembling.

It occurs to me that possession of this magical cheese wheel, while completely legal in Skyrim, would probably land someone in prison for twenty years in real life. Phew, sure is a good thing real world cheese wheels don't have magical incestual underage porn viewable on them.

Phew!

She turns once she gets to Sakurako's knee and sits back slowly, smoothing her dress down her legs to keep it from riding up or getting bunched up under her, allowing her to more directly sit on and straddle her sister's leg. And since Nadeshiko's own leg is right up next to Sakurako's, it's really more like “sisters' legs.”

Hanako sits there stiffly, not moving, and Nadeshiko chuckles.

“Hey...you okay?” Nadeshiko says, her hand moving up to Hanako's long, auburn hair. She runs her fingers through it gently, feeling the soft strands part and caress her trespassing fingers, like soft, parted lips trembling, longing for a kiss.

“Yeah,” Hanako says forcefully, looking back at Nadeshiko with a burning mix of uncertainty and determination. “Just um...what do I do?”

Nedeshiko moves her hand up to Hanako's shoulder, squeezing it gently. Her littlest sister tenses up in her grasp but doesn't flinch away, and on seeing Hanako's gaze go faint and unfocused, Nadeshiko smiles and speaks softly. “It's okay. It's just us. Do whatever you want. Whatever you feel comfortable with. It might make you feel nice if you just rub along on Sakurako's leg, though.” She shrugs, her smile growing just a slight bit.

Hanako thinks she sees a small glint in her sister's eye, but she trusts her oldest sister more than anyone in the world. And while she won't admit it out loud, not quite having the words, she thinks she knows what her sister means. There have been more than a few times in her young life where Hanako has felt strange things while touching her special spot, whether with her own fingers or with something else: plushies, pillows, and, once, the hanging bar at the playground.

Hanako reaches down, bending forwards slightly and arching her back, more out of natural physical necessity than any conscious thought towards being alluring, but Nadeshiko feels her heart start thudding harder in her chest and bites her lip, looking at the curve of her littlest sister's back under her now taut, tight dress, rolling down sharply and ending in the slight swell of her thin little hips atop Sakurako's thigh.

The author has returned from work. So there was over ten hours between when I left off and when I'm back.

This outta be good.

...ought'tataaa.

Hanako clenches her hands on the couch cushion, one hand between her sisters' knees, towards the endge of the cushion, yes, good, and the other hand on the other side of their three legs.

I don't have to draw you a diagram do I? Ok I'll draw you a diagram.

Okay so the Blue are shutup, shutup right now. The blue lines are Nadeshiko's legs. The greens are Sakurako's, and the reds are Hanako's, then the orage. Orange circles are Hanako's hands. The black line is their wavey ass couch.

Moving on.

I included two versions depending on which Sakurako thigh you're headcanon-ing. That's all on you.

Hanako tries to grind herself on Sakurako's thigh, but her movements are jerky and small, like small pieces of beef jerky.

Nadeshiko blinks away the bit of insanity leaking into her brain from the narrator and puts her hand on Hanako's shoulder, if it wasn't there before.

It's sure there now, hot diggity.

“Hey,” she says softly. “It's alright, just relax.”

“I'm doing fine,” Hanako huffs. Her shoulders slump and she stops grinding though, letting out a little sigh. “I don't...I don't know why it's not working.”

Nadeshiko puts a finger on the corner of her mouth in thought, looking up and down her sister's small, thin back. Her other hand is on Sakurako's thigh, opposite where Hanko's...Hanako's sitting, up near Sakurako's waist. Nadeshiko stretches her fingers down, her short nails scratching at the soft fabric of Sakurako's pajama bottoms right at the crease where Sakurako's leg meets her mound, and Sakurako's caught in a trance, her eyes half-lidded and her breath shallow, her body filled with little trembles.

“Hm,” Nadeshiko says, her vision blurring slightly from the heavy thudding of her heart. “Maybe...” she reaches out and slides a finger down from Hanako's shoulder down her arm. “Maybe if you...took your panties off?”

“Huh?” Hanako looks back, the slightest bit of unease entering her voice, and Sunset Shimmer realizes she's become rather invested in this sordid tale.

“What? No I haven't,” Sunset lies, like a lying liar who lies. “Really! I'm just...I mean, it's not like there's anything else to do,” she claims, ludicrously, sharing the warmth under a mammoth skin rugh with four other horny, naked fox girls who are in various states of en-bang-ening. “I'm not just gonna start banging people because there's porn on!” she says while starting to bang people just because there's porn on. “Oh damnit,” she says, finally conceding defeat as she scooches closer to Pinkie and wraps an arm around her waist.

Pinkie, who had been idly fingering herself while the sisterly threesome progressed, glances over at Sunset with a smile. “Heya! Whaddya wanna do to me?”

“Pinkie um...that's...” Sunset, sweating, tries to catch her breath. “Is...is anything okay?”

“Sure! I mean, as long as it doesn't hurt me or something. Oh, I know! Can we do like those girls!”

Sunset glances over at the Dazzlings. Sonata's tongue has performed a magic trick and disappeared into Aria, while meanwhile, at Aria's mouthlips (SNERK) Aria is thick-licking along a standing Adagio's slit.

It's a bit mammoth rug, she can stand.

“Uh...” Sunset starts and Pinkie snorts.

“No, not those girls, these girls!” She motions to the cheese whell and shit “chellse wheel” there we go, thus allowing the author to switch back to the incest.

Nadeshiko smiles warmly, trying to keep from letting her breath escape her too quickly. “Well, it might feel better if you take your panties off and can rub right against her.”

Hanako looks at Sakurako, whose daze subsists just the slightest bit.

That's not the right word, but here we go.

Sakurako smiles and gives Hanako a thumbs-up, one hand reaching out and patting Hanako's leg.

Hanako's brow furrows for a moment, but she decides to trust in her older sister. That, and her own personal experiences have proven that skin-to-surface does tend to be a bit better in some circumstances. Sometimes a lot better.

She stands off Sakurako's knee and slips her panties down, and Nadeshiko watches intently as the soft white fabric slides down her sister's thin legs. She steps out of them with her little feet and backs up to Sakurako's knee, not turning around, but Nadeshiko can spot the blush tinging her cheeks. Hanako gets ready to sit but Nadeshiko holds her hand out flat, palm out, stopping Hanako from getting far back enough to sit.

Hanako looks back, confused, but Nadeshiko explains, “Your dress will be in the way, as is. Here...let me help.” She points forwards and Hanako looks straight again.

Nadeshiko guides Hanako back, as far back as she can go without having to sit or falling over backwards. Once there, Nadeshiko clenches one side of Hanako's dress and says to her, gently, in that same trustworthy voice Hanako's come to rely on for so much of her short, young life. “Hanako, go ahead and pull your dress up to your waist, then sit. Okay?”

Hanako tries to speak but her mouth is bone dry, so she nods instead and lifts her dress with trembling hands. Both Sakurako and Nadeshiko watch as she pulls her dress up to her waist, bunching it in her hands, then sits back gingerly on Sakurako's leg. She lets her dress go back down, but Nadeshiko catches it in the back with her hand.

Hanako glances back, her mouth open in a little 'o' of surprise. She sees her older sister then, like she's never seen her before: a hungering look in her eyes, intensely focused on a part of Hanako's body.

Nadeshiko is staring at her little sister's butt, sitting atop her other sister's thigh, and Nadeshiko isn't sure how much more she can take before the urge to get herself off becomes too great. She looks up and catches Hanako staring at her, confused, and gives a little, twitchy shrug. “Just um...wanted to see how you were sitting.”

Sakurako snaps back enough into consciousness to shoot Nadeshiko a knowing grin. “Heheheheh, Onee-chan, are you peeking at Hanako's booty?”

Nadeshiko starts to deny it but Hanako glares over at Sakurako and speaks first. “So? It's not like there's anything wrong with my b-butt.” She turns to Nadeshiko, her eyes vulnerable and her voice cracking. “R-right? It's...it's not gross or anything, is it?”

“No,” Nadeshiko says, too quickly in her own mind, but Hanako seems pleased so she goes on. “It's nice. Very nice. IN fact, I'd like to keep your dress up like this, with my hand, if that's okay with you.”

“Oh,” Hanako says. She stands and takes her dress up to her waist again, then sits, holding it up and pulling it a bit higher. “I um...I think if I get it up here, you won't have to keep your hand there, if you don't want to.”

Nadeshiko runs the pads of her fingers down her littlest sister's back, over the bumps of her spine and down to where her little cheeks sit squashed on Sakurako's thin, bony thigh. “Yeah...I um...might touch a bit, here and there.” She catches Sakurako looking at her in her periphery and turns, coming face to face with Sakurako's smug grin.

“Heh, Onee-chan's a perv,” Sakurako says, her voice low and thick. She kisses Nadeshiko's cheek, and at that moment, Nadeshiko knows she's lost.

Nadeshiko looks deeply into Sakurako's eyes and Sakurako's grin fades, her lips left trembling beneath wide eyes. Nadeshiko takes her hand and traps Sakurako's head from behind as Nadeshiko presses her lips onto her younger sister's. Her tongue snakes in-between Sakurako's barely moving lips and presses down hard on Sakurako's as her lips move expertly across Sakurako's mouth, putting pressure in just the right spots before softening and caressing to a new spot, a different angle, keeping her poor little sister off-guard. Sakurako gasps as Nadeshiko lets up but Nadeshiko comes in again; her own breath managed by her knowledge of precisely when she'll lay claim to Sakurako's lips, while Sakurako's breath is running more and more ragged, unable to predict when next her sister will let up and when she'll be back, her silken lips, like pillows pressed against a struggling face to snuff out breath, unyielding with their softness; unrelenting with their gentle, lethal touch.

Hanako watches for a moment, then decides to try and get her sisters' attention her own way, and starts working at grinding herself against Sakurako's thigh. She presses down hard, nearly skidding at first, the friction of their skin threatening to chafe before the slightest bit of wetness starts in Hanako's private spot. But she starts realizing that she's sweating hard from the exertion, and her shortness of breath makes her need to pause, and in those pauses the little wetness she's gained dries and she's back at square one. She stops, hearing the sounds of her sisters' passionate kissing, and sighs, thinking to herself that they'll just have more fun without her anyway.

But as she starts to get up to leave, Nadeshiko clenches her hand on Hanako's dress and Hanako stops, looking back.

Nadeshiko stops kissing Sakurako and looks tenderly at Hanako, seeing the young girl's quiet dejection; her unspoken defeat. “Hey...it's okay. It can be pretty hard work like that, so...”

“I know,” Hanako says, turning again. “I'll just-”

“So let's go to the bedroom. I can show you both some...other ways. They're easier, but they do take a little more room. So the bedroom would...would be best,” Nadeshiko manages, though her light, fast breath makes her voice weak and forces more pauses than she'd usually do. Both sisters look at Nadeshiko for a moment, then each other. They each smile and turn back to Nadeshiko, saying in unison, “Sure, Onee-chan.”

Meanwhile, out in the real world, Sunset has become keenly aware that the sounds of the three hussies has paused. She turns and sees the girls un-glomped, glaring over at them.

“What?” Sunset says.

“I just remembered something,” Adagio says, her hands flexing, claws at the ready. Okay so I'll just put this here and then never find it again probably, but their claws can now sharp and un-sharp at will, since it's really annoying to have this many lesbians without full use of their fingers. Like it's possible but having razor-sharp claws (a few steps beyond regular ol' nails, you know) is a bit of a hassle to deal with, so just like other things (pregnancy, morality, etc.) the author's just gonna retcon it.

Like a goddamn pro.

“Uh...what?” Sunset says, standing and flexing her own claws. Pinkie does the same, though her vacant smile suggests she may not have recognized the danger.

With my powers of third omni, I can confirm that she does not recognize the danger. Tense shifts? Who knows, danger time!

“I remembered our entire backstories and motivations! ” Sunset roars, picking Aria up by the crotch and hurling her at Sunset and Pinkie.

Aria lands on Sunset and immediately straddles her, moaning sensually and looking up innocently from between Sunset's breasts. Aria arches her back and glaces back at Pinkie Pie, flicking her eyes to her raised rump suggestively.

“HOLY MOLY ME WANNA!” Pinkie hella exclaims, jumping atop Aria's exposed ass while Adagio and Sonata blast by them on their way out the backdoor of the shop.

Meanwhile at Aria's backdoor heh....anyway Pinkie's grinding on her and Sunset's running her hands through Aria's hair, growling low in desire. Her eyes flutter and she realizes that the cheese wheel of porn has paused.

The author is going to make the three sisters banging into a separate one shot, don't worry. Or do worry. Both are great.

“W-wait,” Sunset says, trying feebly to push Aria off. It's not that Aria's forcing herself very hard on Sunset, Sunset's desire to keep her there is just way higher than her desire to really push her off. “Where...are the others...?”

“Heh,” Aria says, taking Sunset's nipple in her lips for a moment and giving it a flick with her tongue before kissing her way up Sunset's chest. She pauses, just at the base of Sunset's throat, and whispers up to her, “You think we'd really just give up that much magical power?”

Sunset's eyes snap open and she pushes Aria and Pinkie off with all her might, snarling, and dives for the door. Aria catches her leg but Pinkie swats Aria down, giving Sunset a thumbs up. “Don't worry Sunset! I'll bang her through the planet while you stop those two!”

“Uh...okay!” Sunset says, unsure if she's more worried about Pinkie grinding Aria to a cummy pulp goddamnit there's that word again or if Sunset's more worried about taking two Dazzlings on by herself.

Sunset bolts outside and finds the two Dazzlings facing off against a child covered in layers upon layers of overpowered leather armor.

Adagio, realizing that the child is probably now strong enough to punch her through a few mountains, decides to play dumb. “Hello there little one. How can we help you?”

“You,” Mila Valentia says through clenched teeth. “Are...are you the ones who killed my mommy?”

“No,” Adagio says. Possibly truthfully, because no one was really keeping track of who killed whom. “She did.” Adagio points at Sunset and Mila turns to her.

“N...nuh-uh!” Sunset tries, lamely, to deny it, and Mila isn't buying it.

Totally bought the idea that it was Sunset though.

“My mommy....everyone else in town...” Mila takes a step towards Sunset and Sunset's body pricks up in fear, her instincts sending arcs of panic through her from the sheer overwhelming power coursing through Mila's body and tinging every moment of hers a new shade of lethal.

“I um...” Sunset, blanking on a excuse, feels a tug on her shoulder and turns to find Pinkie Pie .

“Don't worry,” Pinkie says to her. “I got this!” Pinkie bounds over to Mila, beaming, and bends down, putting her face right in smacking range. “So, which one's your mom? I can bring her back!”

Sunset, knowing that Pinkie can't hope to cast the resurrection spell without the ring of “““““Akatosh””””” tries to figure out some way to off the child with-

Wait, Sunset wtf c'mon that's messed up. Geez. I mean sure we all installed killable children like....right off the bat, but still.

C'mon Sunset Shimmer.

Mila...Mila? Mia? Mila leads Pinkie Pie to the shattered fragments that once was her frozen mother before someone had thrown a carriage wheel through her, breaking her like a cheap saltine cracker you get at a grocery store, but like one of those stores where they buy the stuff other stores couldn't sell then resell it at a discount. So we're talking like...double-crap saltines. Might as well be completely disintegrated right out of the bag.

“Here we go!” Pinkie starts casting the spell, then becomes whooshed and booshed in golden whispels. Light courses through her and she levitates, then blasts out a ray of holy dead-raising magic (not necromancy we swear) and Mom Valentia reforms and becomes once more a valid taxpayer.

“Mila?” She...wait, wait, wiki time, oh shit it's Carlotta guys! Carlotta bends down, taking her leather-armor ball in her hands by the approximate shoulders. “Mila, what happened? I...” Carlotta looks around at all the corpses, then at the naked fox girls.

“Mama!” Mila hugs her mom and her mom explodes.

That armor's no joke, Mila, you gotta be more careful.

Despite Mila's screaming, Pinkie manages to cast another miracle and raise her mom from the dead.

Adagio gets up close and says to Mila “Hey, Mila. That armor is too powerful. You might keep killing your mom if you don't take it all off.”

“I”m not getting naked,” Mila says, narrowing her eyes at Adagio's naked, sussy self. Mila takes off all the leather armor and the rings and hands it all to Adagio, who grabs Sonata and makes a break for it. Sunset chases after them while Pinkie gives a smug grin and Aria pops outta the back room of Belethor's general shop, and that's as far as the author's getting tonight.

Something approaching a plot is happening. Oh and Aria's got the magical cheese wheel of porn viewing, because I'mma need that thing if I'm going to get through 13 more days of writing.


The author passed out at 6 P.M. Because it has been a week and is hastily typing this in the last 10 minutes of the day.

First, Sunset Shimmer didn't roar about remembering her backstory/motivation yesterday then grab Aria by the crotch and hurl her at herself. That was supposed to be Adagio, but the funny thing about not doing edits is that um.

I can't do edits.

Oh but I can show you this updated diagram of the three sisters' legs. I figured it would make a ton of sense for Hanako to wedge her leg between Sakurako's and Nadeshiko's, since Sakurako was right atop Nadeshiko's lap, so while she's squeezing on Sakurako's, Nadeshiko's is still under it and within the...you know what, just check out this amazing diagram.

I've also included a drawing of a velociraptor waiter dropping some wine glasses. A tray of wine glasses. The raptor is very clumsy. Half of it is off-screen because if you think I can't draw, you should see what the other half would look right.

Because if you think I can't draw, you'd be right.

I mean you still are but it's more glaringly obvious if I try the other half. Actually I'll go ahead and try it now.

You asked for it. I mean you didn't, but you're getting it anyway. Which I suppose is the whole theme of this entire fic.


Now holding the rings of power and with the leather armor of mom-destroying in the crook of her arm, Adagio is just about the strongest mortal-ish thing in this dimension.

Which is rather unfortunate for both Sunset Shimmer and Pinkie Pie, who stand amongst a pile of dead townsfolk. Mila, no longer a war god (and having only been one briefly, her sole kill consisting of her own mother, accidentally) and Carlotta run right the fuck off because this isn't looking good.

Aria, with the cheese wheel of porn doom, sidles up next to Adagio, who hands her a ring. Sonata gets up there too and also gets ringed.

Adagio smirks at Sunset and Pinkie as she holds her arm out and her two fellow Sirens start dressing in their preferred (deep inhale) DESERTER X CELES NIGHTINGALE ARMOR god okay anyway in their preferred (that) armor configurations.

“Well well, Sunset Shimmer and Pinkie Pie. It looks like we've finally gotten the power we've wanted all along. And now that we're done with whatever madness was driving us to think we needed you...I suppose this is goodbye,” Adagio's grin, filled with razor-sharp teeth, widens as she holds out her free hand and drags Sunset closer with telekinesis, holding her naked body in front of her in midair.

Sunset tries to struggle against the invisible force holding her but can't find a single thing to fight against, so flails helplessly. She growls down at Adagio, her eyes narrowing, but her face softens as she remembers the time they've spent together recently. “Adagio, please.”

Next to her, Pinkie Pie wooshes up, being held telekinetically by Aria, who has paused her redressing. “Yeah Adagio, c'mon! We were getting along so well!”

Aria sighs. “I gotta admit-”

“Shut it!” Adagio growls. She flicks her eyes downwards to a point on the ground then smirks up at Sunset. “I'll admit, it's been fun. But can you really promise me you'll just let us have all this power and never, ever try to stop us? Even if we bring it back to the other world?”

Sunset's eyes widen and she tries to say yes, tries to say she'll be okay with it; just for the sake of what they've found, for the sake of this friendship that has brought them so very close together. But she can't say it; she can't lie, not that drastically. She knows, deep down, that the only thing that has led the Dazzlings to their redemption has been failure; the only drive towards their betterment, their defeat. They were never taught the magic of friendship. They were never taught that what they were doing was wrong.

They were just beaten down and forgotten, abandoned, left to their own devices, to stew in their miserable helplessness; powerful beings brought low and exiled, turned weak and wanting by those who condemned them summarily then defeated again just as they started gaining ground against their failure.

And now, they have power. Power like they've never known; power like has never been seen, in Equestria or its human reflection.

Adagio's smile lessens but stays strong and bitter as a familiar blue light starts to build at her feet. She drops the leather armor—only her outfit and those belonging to Sunset and Pinkie remaining—and uses her now free second hand to summon a large, heavy metal object. She turns back to the other two, still holding Sunset with her spell, and Sunset realizes then exactly how it is that Adagio plans to kill them.

“Sonata, Aria,” Adagio says over the growing hum of the ion cannon's incoming beam. “Grab hold of this ball so you don't go flying.”

“On it!” Sonata says gleefully.

Aria, though, feels a tug of something in her heart as she sees the tearing-up eyes of Sunset; tears of frustration, of powerlessness. Tears Aria knows well. And try as she might, she can't forget the closeness she shared with each of her foes.

Aria looks at Adagio, an apology in her wincing eyes. “Sorry Adagio but...” She sighs and swings Pinkie Pie hard into Adagio, breaking Adagio's concentration. Aria takes advantage of the brief distraction and telekinetically grabs Sunset out of the air then hurls both far over the Whiterun walls as the ion cannon's beam builds to its apex and crashes hard, the lethal light crushing down and exploding in the main market square outside Belethor's, down the stairs from the inn, sending what corpses it doesn't disintegrate flying.

Sunset and Pinkie Pie land in a heap outside Whiterun, the tall grasses from the grass mods you should all install softening their blow, thus proving that you should get those grass mods.

Don't ask what they are, just noodle around and you'll find some great ones.

Meanwhile, in the city, the three Dazzlings find themselves all clinging onto the huge metal rings that have been joined into a vaguely ball-esque shaped which Adagio summoned for them to hold onto (I think it's called like Lodesphere yeah it is I just checked, dunno what mod). Adagio recovers first and quietly sets about picking up a full set of special leather armor from where they lie strewn about the crater.

“Adagio,” Aria says, her voice cracking. “Look, I-”

Adagio holds a hand up and Aria's long-term conditioning sets in, shutting her up at once. She wants to press on anyway, to rebel against that damned subservient training, but her new form craves it, longs for it; even now she can feel the arousal rising in her.

“Don't be mean to her, Adagio,” Sonata says, stepping in front of Aria. “She just-”

“I know,” Adagio says softly. “Your laces are sloppy, by the way,” she says, just a touch louder, as she starts dressing.

Aria's lip trembles but she starts trying to tighten the laces securing her armor when Sonata's hand touches her shoulder.

Sonata, seeing Aria so troubled, feels a deep, sharp pain in her chest, and she wonders, if dimly, why she doesn't feel the old smug glee she used to on seeing Aria getting told off. “I'll fix yours if you'll fix mine?” she offers, and Aria gives her a weak smile.

As Sonata gingerly but still clumsily works on her laces, sometimes bumping her with her forehead as she bends down to see more clearly or scratching her with her unsharpened-but-still-fingernails nails, Aria watches Adagio dress.

Adagio is making a point of not looking at the other two, especially after how softly her voice came out. She's been the leader for as long as she can remember, and she knows, very keenly, that she's only been able to keep her position in the past due to her aggression; leading firm with an iron fist has always ever been the only way to keep the other two fully in line. Although fully in line has rarely been so clear cut, and more than a few times, Aria has suggested that Adagio may be losing her edge.

But Adagio knows too that an edge isn't always what's needed, and the feelings Aria suggested—feelings of warmth, feelings of, perhaps, even friendship—certainly exist between Adagio and the two girls Aria had flung over the wall in an attempt to save them. Adagio wonders for a moment if she really would've killed them; if maybe she herself would've saved them somehow at the last moment, or if instead she would've slain them, only to resurrect them.

She wonders, also, if maybe she would've slain them and left them dead, unable to ever interfere in her plans again. But this wonder hurts, and it's a wonder that it hurts.

She sighs and turns back to her two fellow sirens; the only other two of their kind, besides herself. “Alright. Our next goal should be figuring out how to-”

“Adagio, we-” Aria interrupts, though her voice is faltering and her eyes downcast.

“Fine.” Adagio could say no; she knows she could power through, knows she could refuse to discuss the matter futher. Possibly ever, if she got angry enough. But she wants to discuss it.

She wants to figure her feelings out, and it amazes her, more than a bit.

She casts a spell, summoning a small portal to a personal demiplane (spells be cray cray like that yo) and hucks the extra rings and leather armor that had belonged to Sunset and Pinkie Pie into it before sealing the portal, thus ensuring that the extra, all powerful enchanted items can't be-

Adagio remembers something crucial right about then.

“Well hell,” she says as Sunset Shimmer and Pinkie Pie hop back over the wall, having re-equipped themselves with new Rings of Andragon.

“Yep,” Sunset says, glowering, “we still have the same mods, Adagio.”

Sonata waves merrily at them. “I think we were all gonna talk about we still have like, good feelings for you and how we feel really bad about almost killing you.”

Adagio, just about as surprised and amazed at Sonata's accidentally useful blurting as Sunset and Pinkie, stares for a second before coming to and taking advantage of the brief opening to agree. “She's...actually right. But you two should know that we have no intention of surrendering our power, whether or not we go back to the other world.”

“You keep saying 'other world,'” Sunset says. “But don't you mean 'your' world?”

Adagio narrows her eyes. “'Our' worlds are the same, Sunset Shimmer. If we were to go back to Equestria-”

“Oh!” Sonata perks up. “Really? We're...we're finally going home?”

Adagio glares over but her eyes go wide when she sees the hopeful faces of both Aria and Sonata. “You two...would really want that?”

“Uh, duh?” Aria says, putting a hand on her hip. “That's like, all we've ever wanted. Going home, being back in our true forms...instead of being stuck here as...these things.” She motions down to her body but the disgust in her face cracks a bit.

Sonata, looking down Aria's body, shows that same sudden doubt. “Uh, so...I dunno if this is just me being...me or whatever, but...now that I think about it...”

“C'mon!” Pinkie Pie says cheerily. “I've been in a body like this my whole life, and it's pretty nifty!”

“Well,” Sunset says, bumping Pinkie's shoulder playfully with her own, “not exactly the same. Though even without fox ears and fox tails and teeth and claws, it's...not bad.”

“Certainly put these to good use,” Adagio mutters, holding her hand up in front of her eyes and running her thumb across her fingers.

Aria looks over at Adagio. “So, what's the plan then? We have more magical power than ever before, and even these two could, at best, just slow us down. And barely. There's a good chance we'll figure out how to get out of this world, and then...those rumors...”

“Oh yeah!” Sonata says, bouncing on her heels. “All that stuff about how they're totally bringing that Twilight Spunkle here from Equestria through a portal somewhere is probably true huh? So once we get back to that whatever world, we could totally figure out where the portal to Equestria is and then get home! If...if we wanted,” she says in a fading voice as she cups her breasts.

Sunset rubs her forehead, her mind trying to catch up to all the ways this could go terribly, terribly wrong as she remembers, over and over, just how un-human (and un-pony-ish, honestly) the Dazzlings are. “Well...I guess it doesn't matter where you end up, but what're you planning on doing once you go there?”

Adagio opens her mouth, then closes it, clenching her teeth and drawing her lips back in a frustrated snarl. Truth be told, she isn't sure what her plans are anymore.

“Well, we always were like,” Aria says, stepping up beside Adagio with Sonata next to her, “trying to...get people to...obey us? Was that it?”

Adagio turns. “What do you mean 'was that it?' We....of course we...” Adagio turns away, putting her hand on her chin and looking down in thought. “How much of it was just to have power, though? Did we want to lead? No, no that couldn't be. With all the chaos we sowed to try and get more power...I guess I can't rightly say I wanted anything but to incite combat. To lure people into conflict so we could feed off their negative energy.”

“But if we were in charge,” Aria starts offering tentatively, her voice dying as Adagio turns around. But Adagio's thoughtful eyes and a small motion from her hand, urging Aria to go on, send a thrum of warmth through Aria and she brightens up, going on. “If we were in charge, like...of everything...well first off I dunno if we'd even need to feed on negative energy anymore. Or if we even can, with our gems broken. So we'd have all the power we'd want, and wouldn't need anyone else to have it. So if we don't need to sow negative feelings...would we even need to be in charge?”

Adagio huffs, though not at Aria, and she's quick to flash Aria an apologetic smile. “It's not you. You're right. Completely. It's almost funny,” she starts then rolls her eyes, smiling, as Aria's lip twitches. “Not you being right, I mean. It's funny that just as we're starting to find something better....just as we're beginning to see the magic in all the little things in life, we're suddenly given all the magical power we always wanted. All the power that we've craved, that we've made others suffer for, finally in our hands. I won't give it up,” she says, throwing a threatening glare at Sunset and Pinkie Pie before turning back to her two, “but now that we have it, I wonder what we do from here.”

“Well, if I could suggest something,” Sunset starts, going on quickly as Adagio rounds on her, “something that isn't give it up. You were all telling me how you're started learning how to live. So maybe just...keep doing that?”

It's Sonata's turn to huff. “Then what's like...even the point of all this power?”

“Well, why did you want it in the first place?” Pinkie asks, hands on her hips.

“To get more power, duh. With more magical power we could lure more people into fighting each other which gave us...uh...” Sonata starts to see the cyclical nature of their motivations. “Uh if we have power, then we can get more power, which we'll use to...get more...power.”

“We used to talk about getting people to like, worship us,” Aria chimes in. “So maybe that? But even then, wasn't that just so that people would do what we'd say and uh...fight when we'd say, so we could get more power? I mean sure, if we were like...in charge of everything, we could, I dunno....make a world where everyone's just miserable and constantly feeding us negative energy, so our power keeps going up? But even then, that'd only work if we had our gems all pieced back together, which...we don't. And we don't even need them because we have all this power from just...I mean honestly I dunno why we didn't just slap all the enchantments onto like, our belly-button rings, so we could wear whatever.” Aria sighs, then blinks. Every other girl is staring at her, and for once, it's not because they all wanna bang her into the ground.

Well that too, but at this point that's just implied.

Adagio turns quick and snags both Sunset and Pinkie in her telekinesis; while the other two are immune from magical damage, they're apparently not immune from getting fucked with. “Hold it you two, let's...let's form a truce for a moment.”

“I'm listening,” Sunset says, twirling in the air. “Mostly because there's not much else I can do. Oh I guess aside from this.” Sunset snags Adagio with telekinesis and things get wonky.

With the three girls whipping around Whiterun and slap-flapping against buildings and the ground, things are a bit odd. Aria presses herself against Sonata, looking up into her eyes. While they're about the same height, Aria really likes scrunching down to make herself look and feel smaller so she can retreat to the safe, strong haven of her lovers' arms. “Hey, let's go figure out that enchanting thing real quick while they're all um...being like pancakes in a hurricane.”

“Mmmmm pancakes. Let's go!” Sonata grins bright and takes Aria by the hand, leading her off in a random direction because she has no goddamn idea where to go.

“Oh right, the nerd brigade is in that,” Aria says with a groan, motioning towards where the three pancakes are slapping around, crashing through signs and knocking over blasted-out bits of building as they swirl around in their telekinetic grapple.

“Alright alright!” Adagio says, releasing both Pinkie and Sunset. The two still go flying quite a ways and land out by the stable, with a floating Adagio in tow (she slaps along a few buildings on the way, don't worry). She crosses her arms as Sunset recovers, waiting.

If she could tap her foot, she would.

“Oh uh,” Sunset says, letting her down gently in a heap of … oh no. Hay! That's it.

Hay.

Aria and Sonata arrive shortly after, having realized how lost they are without the nerd brigade to help direct them to the next enchanting table.

“Okay everyone, just calm down,” Sunset says, her hands tensing and getting ready to telekinetically hurl whoever moves across Whiterun.

“Sure,” Adagio says, sprawled across the hay pile. “After you.”

“Okay, so...” Sunset sighs, relaxing a bit. “Okay, so what Aria said kinda makes sense, at least for...consolidating our magical ridiculousness into a single, easily hidden thing.”

“Ooo and we can wear whatever we want then!” Sonata says with a cheer that Pinkie soon joins in on.

“Heck yeah we can!” Pinkie agrees with a giggle.

“Hey, those gems,” Sunset says, turning back to Adagio. “So what were they? Were they like...magical items you three came across?”

The author, having now just spent $2 to purchase the kindle edition of My Little Pony: FIENDship is Magic #3: Sirens (which has been retconned by a random little episode in one of the later seasons that I refuse to watch because the series lost my interest at a certain point) and will now read it for lore. Research!

Never thought I'd do it, did ya? DID YA?

Well I told them I'd shoot but they didn't believe me? WHY? Why didn't they believe me?

Alright that's enough references to old cartoons. For...for a moment, I mean I'm still writing about My Little Pony here. That's enough references to Ren and Stimpy, there, you happy?

No?

Good.

Good.

The author, having read the true background of the Dazzlings/Sirens (retcons be damned) still doesn't really know where they got the amulets, but has decided that they're not actually part of their anatomy by nature. The gems happen to be in their van at the moment though.

“There you have it,” Adagio says, standing back up from her spot watching interdimensional porn on a cheese wheel.

This time it was about (looks up at shelf of new figures and picks the first two she sees) uh Kamado Nezuko x Toga Himiko.

Blame/thank the author's shelf.

“Moving along,” Adagio says, moving along, “let's go get our enchantments sorted.”

The rest agree, still in varying levels of deep thought.

Sunset Shimmer has no easy answers for the Sirens and what drives them. To her, their life seems driven by conflict; all action necessitated by a constant craving for more power. Yet with the near limitless power they wield right at this moment, she can't, for the life of her, picture what the Sirens would do now.

Pinkie Pie likes cake.

Sonata doesn't mind cake, but she's really more of a savory person over sweet, so she'd enjoy a cheeseburger right about now. She's not just about tacos.

GEEZE.

Aria wonders what their life will be like now. Having been stripped of their magic, they had begun finding joy in the little things in life as they learned how to music without their powers; through hard work and endless research, hours and hours of training that never seemed to end, they had become true singers and masters of sound editing. All of it without magic, through their own talent. Yet of course that hadn't translated to instant success; every day was still a struggle, whether it was finding gigs, getting to gigs, or even just passing the time between it all...

Once they got their skills, Aria realized that she never had quite mastered herself; who she is, what she wants. She doesn't even know how to dream, really. Every accomplishment was just another bitter push towards something unreachable, and now that they've reached the pinnacle of the one solid concept that constituted their goal—“magical power”—she realizes that there's nothing she wants to do with it.

But there are a few things she likes. She does like to sing. She likes fashion, makeup; she loves to travel and likes organizing their stays, figuring out where they'll park their van, getting them better time slots or amenities by sheer force of charisma.

And she likes her friends. Adagio, the ever-present leader. Aria won't admit it, but she knows how hard Adagio tries to keep her position; and Aria knows that it's because Adagio knows that if she doesn't try, then Aria will take that spot. Yet deep down, Aria knows that she'll never be as effective as Adagio.

Still, it's nice to keep her on her toes.

And Sonata...

Aria glances at Sonata and feels a familiar pulse thrum through her. Not the one of her new odd nature; that bizarre, yearning desire for Sonata to crush and pulverize her into a puddle of shuddering ecstasy.

The feeling that goes through her right now is something more worn, more faded, but so much stronger. The feeling of Sonata, still in her life. A needed part; a wanted piece.

A person Aria couldn't be complete without.

Sonata glances back and smiles. “What? Weirdo. Wanna bang?”

“Sure, later,” Aria says, laughing.

Adagio, leading the way to the enchantment table (accompanied by Sunset; they keep trying to slightly outpace the other without full-on breaking into a race) tries to keep her mind clear.

She knows what they have, and what they're about to get.

What they'll do after can wait; at least until their power's a certainty.

They enter Dragonsreach, and two things happen right away.

Adagio groans loudly and throws Sunset a dirty look.

Sunset swiftly walks around the girl with a bucket on her head who's standing just inside the doorway, cheerfully greeting them.

“Seriously Sunset, your modlist may as well be a list of charges at this point,” Adagio says, side-stepping the girl. The others come in and walk around her as well, which is rude but probably the safest thing they could've done.

If the pile of corpses littering the first two starting zones of Skyrim is any indication, having this party pay attention to you is basically a death sentence.

They arrive at the arcane enchanter. They don't have to wipe the collars and whips off of it because those are on (oh crap spelling here we go) Fahrenghar's study.

Nailed it?

They're on his desk in his weird little cubby-hole of a room, so they get to have at the arcane enchanter without despoiling Sunset Shimmer's name even further. The fact that some of these mods really were added at random by the Wabbajack doesn't matter.

Secretely (yet known to all), it's always Sunset's fault.

“This is bullcrap,” Sunset mutters, enchanting a new set of belly-button rings with all of the combined enchantments possible. They slap their new auto-affixing bling onto them and feel the intense power of way too much power powering through them powerfully.

It's...empowering.

“Alright,” Adagio says, turning to the rest. She summons a new set of … of Spindrift Knight Armor.

The other girls (aside from Sunset, who summons the black version for herself) immediately hold their paws out, asking for their own set. Adagio sighs and gets them each a full set and they dress, looking like the world's most CPU draining physics-enabled group of fox girls to have ever graced...cursed Skyrim with their grace.

But mostly horniness.

Speaking of which, Sunset, c'mon, the black version is just a 2-B flavored version.

You degenerate.

Huffing at the narrator, Sunset proceeds to cross her arms and look over at Adagio. She's able to perform this feat of 'looking' through the cunning use of not equipping the lacy blindfold.

Sunset. You. Degenerate.

“There,” Adagio says. “We have all the power we had before, possibly even a bit more. We'll gloss over the fact that we had our previously enchanted belly-button rings still in us before by asserting that we only put a couple of useless enchantments on them. Arguably useless. Stamina regeneration and...let's say Archery. Since none of us use bows.”

“I-!” Sonata starts.

“None of us use bows,” Adagio emphasizes. The rest of the girls all agree to not worrying about the gaping plot hole that is their former navel piercings. The audience also agrees, because I say so.

The other plot holes?

Well I won't remember those in time, don't worry about it.

Aria crosses her arms. “Well now we're back to figuring out what to do with all our power. I mean...we could literally have anything we want.”

“Uh,” Sunset says, “not...really? I mean, unless you're planning on just...taking whatever you want by force.”

“Yeah, that's what I said?” Aria says, raising an eyebrow.

“No, having power doesn't mean you can just...force people to do things for you or give you things you want,” Sunset says. The baffled expressions of the sirens leads her to believe that she may have a hard time selling morality. “C'mon guys. You've lived, how long? Don't you have anything you'd like to do?”

“Uh, be rich?” Adagio suggests. “If we were rich, we could just do whatever. Figure out what we like, what we wanna do, then just do it.”

Adagio looks out across the grand hall of Jarl Balgruuf, who perished while figuring out why the whole of his town was trying to avenge the loss of a chicken. “So much of what we've done has been in the hopes of achieving success. Of getting power, yes, but power to be...well, to be. To exist. Now that we have the power, you're saying we can't use it to get what we've wanted?”

“Well not like that, ” Sunset says. “I dunno. I mean, I don't wanna say 'offer to resurrect people for money' or 'heal the sick...for money' but I'm sure there's a way you can help people and make a living off of it.”

“...I'm not sure how I feel about restoring the dead outside of Skyrim,” Adagio says. “The powers of this world are prone to fiddling with mortality as is, but in our other worlds...things are more set in stone, so to speak. And if we do break through that barrier, we've got no idea what sort of forces will push back.”

“Well,” Pinkie Pie starts, “what if you just like...well darnit. Huh, it sure is tough to make power turn into a job without either being evil or charging people for doing good, which is...kinda evil, huh?”

“This is a whole lotta thinking and talking about thinking,” Sonata says. “Can't we just all get into a big pile and bang?”

“Hmm...” Adagio goes, considering it. No really. “Come to think of it, I've felt the most satisfaction recently out of being intimate with you all. If I were to picture a perfect day...I suppose it would be just waking up at the break of dawn alongside you all, watching you still sleeping in our vast bed, like beautiful ships thrashed amidst a sea of white sheets. I'd step out onto the veranda, looking out across the forest surrounding our home, down to the river where our boat sits, waiting. I'd make tea and enjoy it slow as you all slowly woke up, one by one, and you'd taste it on my lips as you'd kiss me on your way to get ready for the day. Then the rest...” she waves her hand, turning back to the others, who are staring at her intensely. “What?”

“Uh, Sunset?” Pinkie says. “Um...I kinda want that too.”

“Yeah...I mean...it sounds really peaceful. And that's literally just us waking up. The rest of the day could be whatever. Following our passions. Music, baking, decorating, gaming, whatever. We'd just be together, spending every day of our lives, living it to the fullest. But how do we get there?” Sunset asks Adagio.

Of all people.

Adagio smirks. “Well, if we can't charge people for good deeds, and if we can't simply browbeat people into giving us what we want...then how about we loot this current world and bring our treasures back to our world? Gold and gems are rather valuable there as well, after all.”

The other girls break into grins.

Skyrim's gonna have a bad time.

“Speaking of bad times,” Sunset says. “We should probably go up and visit the greybeards. If for no other reason than getting the final word of Unrelenting Force.”

“Why?” Adagio asks.

“Well...I kinda...really like it. It's like the only shout I ever use. Oh, also I guess if we unlock more of the main quest...well, wait, no, I guess it won't really pave the way for more treasure.” Sunset thinks, but she can't really see a benefit in doing the main quest line.

Imagine that.

“Well, I suppose we can at least save this world from its apocalypse as we rob it blind,” Adagio says. “Alright, Greybeards. This'll be strange though, seeing as how both Balgruuf and Delphine...and a whole host of other people...are dead.”

“Bleh, they're optional,” Sunset says. “Really all we gotta do is tackle Alduin outta the sky and then...uh...”

“How do we get to Sovngarde again?” Adagio wonders. “I swear there was a portal...and we needed to fly to get up there, but we can probably manage without having to ride a dragon.”

Sunset clenches a fist and pumps it. “However we do it, we'll figure it out. Alright, Operation Get Rich and Save the World, start!”


The author is in a mood. This may actually turn out well for someone.

But that's unlikely.

For this episode we'll pretend that was all a dream that Sonata was having and which she'll forget immediately on waking up in their crappy van of crap.

I mean, it wasn't a dream, that was all actually real life, but I'd just like to write something about the Dazzlings that isn't crack porn for one goddamn day so buckle in and guns up, let's do this.

Sonata wakes and wobbles in the glowing, early-morning sun lining the purple curtains hanging down across the windows of their tour van. She stumbles to the kitchen, her crisp memory of their van's layout helping against everything but the clutter strewn across the van's floor. A sleepy smile sneaks across her lips as she takes the bread from the cabinet underneath the counter and slips two pieces into her beloved toaster.

She hears Aria waking up and sets three plates, getting new slices ready to replace the toast that's soon to come.

First for Aria, then for me, since Adagio's out. Breakfast in bed!

Or... near bed.

Man I'm good.

Aria, her hair a sea of teal-streaked amethyst, huffs and tries to press the curtains against the window to block out the light seeping through the edges. Giving up, she turns, and Sonata sees her favorite thing for just a moment, though it's a favorite thing she can never tell everyone about.

Unlike tacos. Everyone needs to know about those.

For just the tiniest littlest bit of a second, Aria's eyes are kind and warm and her lips almost curl up into a smile.

It's the little things in life Sonata likes, and that itty bitty split-second is probably about the biggest of the littlest of the things she loves most.

It's gone quick though, as Aria sees who's there.

Heh, if I was someone else, I bet she'd be happy all the time!

“Toast again?” Aria grumbles, searching for a drink. While their van has some electricity—Sonata's not totally sure how, but Adagio mentioned something about taking the idea from whatever an RV is—it doesn't really have enough for a fridge, which means the canned coffee Aria pops open isn't the coldest.

But it's definitely the canniest, Sonata guarantees!

“Yep! It's the...it's the toast of the morning to ya!” Sonata giggles as the toast pops out and she slips it onto the plate expertly.

Putting toast on plates is one of her many finely honed skills. Not that she'd brag of course.

Much.

“What?” Aria takes the plate that Sonata hands to her and turns away, munching with a grimace. “Way to be weird first thing. Not even awake and you're already giving me a headache.”

Sonata smiles, turning away from Aria and back to the counter, and puts the next two slices into the toaster. They'd be for her, unless Adagio comes in pretty soon. She'll be excited for toast, Sonata's sure of it!

She's a little confused though.

Her chest hurts and tears are falling on the counter. They couldn't be from her, though.

Definitely...definitely not.

But words escape her lips before her mind even thinks them, and she wonders where they're coming from. “Why do you do that?”

Behind her, Aria doesn't say anything, and Sonata turns. The look of blank confusion on Aria's face turns to something else when she sees Sonata's face, but Sonata can't see it clearly through the tears.

“Well?” Sonata's voice is weak and cracking, more a squeak than the firm follow-up she'd intended, but it seems to do the job of getting a response.

Aria's eyes, wide with surprise, narrow as she turns away. “Do what?”

“Why do you always have to... I dunno. Act like I'm just annoying and dumb?”

Aria sighs and walks the two steps to the couch set up in the back of their van. She turns and sits on it gently, setting the plate on her lap and the toast atop it as she looks away and speaks in a mumble. “Because you are dumb?”

“Why do you hate me?” Sonata whispers through her tears, wiping them away and being super duper glad that she hasn't put on her makeup yet today.

Thank goodness for small blessings!

“It's too early for... whatever this is,” Aria says, closing her eyes and holding a hand to her temple as she eats. “Just go back to sleep, we'll—”

“I wanna make everyone breakfast.”
“It's just toast, we can—”

Sonata isn't sure how she ends up on the floor, hugging her knees and sobbing into her pajama bottoms. Maybe this is just life now.

It feels about right.

She's lucky she's wearing her P.J.'s today though. Even though Aria and Adagio say she's too old for them, they're a heck of a lot better at soaking up her tears than her super unfluffy knees.

But pajamas don't make all the hurt go away. Her chest hurts. Her head hurts. She wants to crush herself smaller and smaller but she's as small as she'll go, and in the back of their van it's just so, so cold once you're out of the blankies.

Aria and her sleep side by side, and Aria even says it's okay if she cuddles up on the really cold nights.

Sonata can't tell anyone though.

Sonata wonders who would care.

She glances up and sees no one coming around the counter to tell her it's okay.

But that's okay.

That's how it always is.

No one's coming around the mountain, when she comes...

No one's coming...

The side of the van slides open and Sonata knows it's Adagio. No one else would hear Sonata crying and then sigh, walking to the front of the van to wait it out. No one else would slip their headphones on, and maybe this time the headphones will actually be playing music and not just be there for show!

Or maybe...

Maybe everyone would. Why would anyone care, if the two closest to me don't?

“Fine,” she hears Adagio grumble, and she peeks over the counter and, to her surprise, sees both of them coming from the front of the van. Adagio glances over and meets Sonata's eyes for a moment, her gaze tired and distant. “What is it, Sonata?”

Sonata looks down. Her knees don't hate her.

They're a little crampy, she guesses, but that's probably not hate.

“I just wanted to make breakfast.”

“So go ahead,” Adagio says, her voice carrying the faintest hint of something that might be kindness. “No one's stopping you.”

“But... but Aria said I'm dumb.”

“No, you said you were dumb,” Aria growls, crossing her arms. “I just agreed, since you're right.”

Sonata looks back down into her knees and closes her eyes.

No one hates her in her own head.

Well... only one person. But that person isn't much anyway. That's person's dumb. Annoying.

Childish.

Clumsy.

Dumb, dumb, dumb.

Adagio whispers something to Aria and Aria huffs, leaning across the counter.

“Sonata, I'm sorry. Thanks for breakfast.” She turns and heads back to the couch, and Sonata thinks maybe she hears the sound of Aria eating toast.

That makes her smile, just a little.

It doesn't even hurt that Aria's apology sounds forced.

It doesn't even hurt that her apology was forced, by Adagio.

Because Sonata smiles, just a little, and gets her legs under her, rising back up into a stand. It seems a little harder to stand back up each time she does it, for some reason.

The floor seems safer.

Not as far to fall.


“Alright,” Adagio says, back in the real world.

Which is, of course, Skyrim. Sonata scratches her head, vacantly wondering why she feels so sad all of a sudden, and Aria cuddles closer to her, scared of the brief feelings of 'we're not together yet' she'd just experienced for no apparent reason.

Sunset and Pinkie Pie are fine.

Lucky couple of doofs.

Fucking...

Wait they're not....or are they?

Adagio doesn't manage to go on in time before the clusterfuck that is her adventuring party circle around the cheese wheel of porn and start watching -

You'll never guess.

Did you guess porn? You probably guessed porn.

I mean, only the most refined, intelligent people read my works. If you don't think you're amazing, you're just wrong, and I'm sorry you had to find out how awesome you are through a smutty dead dove crack fic about the Equestria girls in Skyrim.

Moving on.

After laying down for a while because the author is so very old inside, the author has come to the stunning realization of what NaNo has done.

And what has NaNo done?

NaNo has burned the author out.

On smut.

“Is this uh...” Sunset scratches her fox ear. One of them. She has two. “Is this cheese wheel working? Never thought I'd say that.”


“Are you kidding me?” Adagio asks the author.

The author apologizes profusely. She laid back down and didn't get up until her alarm clock got her up for work.

“Anyways,” Pinkie says, saving the author for the moment, “why's this cheese wheel not showing us interdimensional porn?”

God fucking damnit Pinkie Pie.

Now I'm unsaved.

I'll start whump-adjacent-ing you again I swear god so feed.

Oh I have an idea. This oughtta show you for giving me free will, G-...Pinkie Pie.

On the cheese wheel of porn's screen, which is really clear and not cheese covered at all, more like...whatever the hell rich people watch their porn on...

Probably their yacths.

Ba dum TSS

Okay anyway as clear as the Caribbean waters through which the yacht-bound rich watch their porn comes a scene.

A vision, if you will. Crap scene really does work better.

“Are we sure she's okay?” Sonata asks, extremely not subtle about how batshit crazy she thinks the author is. Shutup Sonata.

ily Sonata.

In the cheese wheel, they see a young woman tied to a wooden X, her arms and ankles bound by leather straps.

So I guess she's bound to it and not literally tied.

The girl's black hair is in two buns and the fox-girls think immediately of a … woman with hairbuns.

“She's going off-track,” Adagio mutters, forcing another apology from the author.

The room the young woman's in is dark stone. Beside the wooden X she lies bound upon are implements, but of an odd variety.

Unless you're a pervert.

Go easy on me though I'm pretty vanilla.

“So,” a way too young vampire girl of indeterminate legality but definite age-having says as she walks up to the implements, her dark eyes glinting in the stark white of her skin, framed between her flowing, wavy hair. “Maoa, is it?”

Maoa, the girl bound to the X, glares over at the much younger girl, but her eyes go wide as she sees the young girl holding up a giant chartreuse-green dildo.

Look up that color. Go ahead I dare you.

Now know fear.

“What is...?”

“You know what this is, I'm sure,” the young girl says.

“...glaringly ugly?”

“Don't worry, it'll be hidden soon enough...”

Maoa sighs. “No really it's..the most hideous thing I've ever seen.”

The young girl, who is called Al-Khamil Ghika goddamnit Maoa is it so hard to ask you to use her name so I can stop calling her 'the young girl,' smirks and positions herself between Maoa's spread legs with the goddamn ugly-ass shining green dick-rod of ugly greenness.

“You're not actually going to put that elongated tennis ball in me are you?”

“Will you stop being OOC for one minute so we can turn this cheese wheel of porn back into a cheese wheel of porn?” Ghika snarls, aiming the elongated tennis ball so that it's trajectory approximately angles corrently towards the insertion port of the Maoa Mk I.

“Now what the fuck is happening?” Maoa asks, hella OOC.

“Well don't acknowledge it, you'll only empower her!” Ghika says, firing the proton dickpedo down the terminal vector coils towards the...the deflector dish of Maoa's giant outboard nacelles.

Maoa, unable to figure out what's happening through the narration, lets the collider … solid ray of …. tubular VAGINAL DENOMINATION kinda like one of those what are they, evangelicals, yes, that's a denomination, that bright green because who has the time to spell chatureharse a second time. It impacts her cellular membranes and like her FOLDS and um FLESH all like...aaround up in them, like just jams right in and her hymen like super explodes and shit.

Because she totally has one of those. That Arthur guy or whatever, they're like...super affectionate because of how much of a HYMEN she has.

“Oh no it looks like I have become unvirgin,” Maoa moans into the . The fucking world.

Ghika just walks out of the room because she's had enough of this shit. “Let me know when you want an actual scene like this,” she calls back over her shoulder, through the fourth wall.

“Oh I want it now, I'm cooming,” Maoa says, definitely still bound to the X and not walking off and redressing. She still has the Red (green) Dicktober all up in her though, like...just slapping her clit around like it owes her money, and she forgets how to have a clit and finds that like super hot so she just cums all over and it gets in her ears because...because why not, and the dildo also cums because WHY NOT and like...I dunno creampies.

“Cream pies?” Ghika says, coming back. She sees what's going on and leaves again though.

Probably a good plan.

Outside in Skyrim, Pinkie looks at the others. “Cream pies?”

“Ughhhhhh,” Aria groans, “I really don't wanna go find more potions of dick having. If it wasn't for our magical whatevers I probably wouldn't walk for a week after getting double dick Duke Nuke'md by these two,” she says, thumbing at Adagio and Sonata.

Not thumbing them, just thumbing at them.

“Really?” Adagio says, looking at the author. “That's as far as you're getting tonight?”

Yes Adagio it is. And the same goes for you. But my Thanksgiving vacation starts tomorrow so I'll finally not start at 1% power.


“Alright alright!” Sunset says, standing up and hopping away from the magical cheese wheel of deteriorating porn quality. “Look, if we're gonna make it home, we gotta do it fast. She's already passed out once today—and for a solid four hours—so if we don't hurry up and get home, there's a very good chance she'll just keep passing out all the way through the rest of November.”

“And,” Sonata starts, putting a finger to the corner of her mouth, “what'll that mean?”

“It'll mean,” Adagio starts answering for her, “that NaNoWriMo will be over, and she won't pick the story up again. Wherever it ends will be where it ends. If we're still stuck in Skyrim, still stuck utterly unable to get home or even find out what it is we're fighting for, what we'll do with all this power...how we feel about each other. Nothing will be resolved! We'll just exist in this endless, tormenting confusion for the rest of time. If we're lucky she'll poke at it randomly here and there. More likely, she won't touch it for another year until next November. If we're unlucky, she'll never touch it again. ”

“That's so unfair!” Pinkie Pie says, hands on her hips. “Don't we deserve a happy ending?”

“We've had plenty of those,” Aria says, smirking. “But I agree. I've already had to resign myself to living in one alternate universe I got hurled into without my consent. I'm not gonna let myself get stuck in an even duller one, even if it does have magic.”

“Alright, then we gotta make it to whatever dumb town,” Adagio says, glancing over at Sunset. “The one where Anduin's raising the whatever dumb dragon, to progress the main quest. Even without Delphine, Anduin's going to keep progressing with his plan as normal.”

“How do we know he'll even still go there? In an alternate timeline where things have gone so strangely-” Sunset starts but Adagio cuts her off.

“None of that. We just have to believe that the...the 'universe' will want us to succeed and give us a chance. So now...what was the name of that town again?” Adagio prepares the spell to teleport her to a Skyrim town, which is a fantastic spell and I'm glad it exists because fast travel wouldn't make sense even in this crackfic and even if it did, you can't fast travel somewhere you haven't been before. And since they killed the carriage driver and thus can't make it to … you know, that place where Ulfric lives. Windhelm.

“Kynesgrove,” Sunset says, prepping the same spell. “Alright Pinkie Pie, get that Teleport to Skyrim City spell ready and tell it you wanna teleport to Kynesgrove.”

Adagio looks at her two. “You two tell it the same.”

They nod and Adagio is pretty sure she'll never see them again.

Amazingly, everyone teleports to Kynesgrove, where that one woman who yells about the dragon attacking makes it painfully clear to Adagio, Sunset, and everyone else who's never played Oblivion that Skyrim is just missing that bit of extra magic that made Oblivion such a great game.

Still love Skyrim though, you can't beat these mods.

Adagio grabs the woman with grand telekinesis and hucks her a mile away, assisted by the first two words of Unrelenting Force (that both her and her two siren gal pals use at the same time in unison, kindred spirits that they are) and Adagio wonders for a moment about how similar the power of dragon blood is to their own vocal magics.

Aria has much the same thought, and her and Adagio meet eyes for a moment and smile slyly. They look at Sonata, hoping that she came to the same conclusion.

She didn't.

She sees the other two smiling at her and smiles back though, then chuckles. “Heh, yeah. We're gonna bang so much.”

“Goddamnit Sonata,” Aria mutters under her breath.

Adagio rolls her eyes and they start off up the hill, followed by Sunset and Pinkie Pie.

Pinkie Pie, the most effective plot device since whatever it was that Bucky had Cap'n bent over (which was, probably, also Pinkie Pie) giggles. “You know, this whole 'voice has magical power' thing is like, totally up the alley of you Sirens!”

“Yes, indeed,” Adago says. Oh no not Adago. Adagio reclaims her name and goes on. “If there was perhaps a way to-”

“Dragon Soul Relinquishment,” Sunset blurts out accidentally, making her the second most useful plot device since the Pinkie Pie Barrel of Stucky-ness.

“No, that one doesn't have a debug menu or anything. Well whatever. Even just having the dragon blood in our veins might mean something if we ever get back to our world. As in the human world,” Adagio clarifies.

“What are we gonna do again?” Sunset wonders then remembers. “Oh right. Live in peace and luxury and um...”

“And love!” Pinkie shouts, exclaimily.

“And lots of banging!” Sonata adds, tactfully.

“I'm not adding to that,” Aria refuses to add, bitchily. “Hey!”

“Look!” Adagio points up beyond the rising hill of cresting around-ness and the other girls look up and spot Alduin, who I think I may have accidentally called Anduin. “There he is. Let's-”

“On it!” Pinkie says, firing off her ion cannon. Alduin moves slightly and wiggles around and she sighs. “Aw man.”

“Actually,” Sunset says.

“Ackshually,” Sonata echoes, mockingly. Sentence variation, what's that?”

Sunset glares at her for a moment, then sighs and goes on. “Let's keep shooting it off as we go up. As long as we don't hit ourselves we won't get blown away and we might clip him.”

“I don't think we'll need to, ackshuweaeallly,” Aria says as Alduin flies high above them.

Oh ha, Anduin is like that little kidd in World of Warcraft. Wait shit Alduin's a train.

“Huh,” Adagio starts. “I wasn't aware they even had a Thomas mod for Special Edition, now that I think of it.”

Alduin choo choo chooses them (for death) and starts breathing fire, his dragon screech voice still screeching screechily underneath the train whistles. The girls stand there.

Well Pinkie Pie pretends she's in pain and Sonata joins her after a moment, though Sonata's by far the worse actor of the two and just rolls around like a goof giggling.

Meanwhile, everyone summoned their ion beams and Alduin gets shreked. As in killed.

Is there a mod that adds Shrek? Okay yeah there definitely is but not in a way that'll let him be like...a projectile from space. Without some cleverness.

And I mean...look at who we're dealing with here?

Some train whistles come at them from Alduin's direction and Alduin vaporizes but doesn't leave a soul behind because he's a twat like that.

“Okay, now,” Sunset starts, I have to do this a lot because there's so many damn characters in the scene, “we gotta get to Skuldafyn. Or however it's spelled. Which doesn't make sense for me to say because I said it and didn't spell it but whatever.”

“Wait.” Pinkie Pie starts popping a bunch of gold jewelry, then other jewelry, then gems, then some more stuff, then just starts blasting out gold coins. “Guys I don't think we even need to loot Skyrim, we can just make a bunch of treasure so we'll be rich once we get back!”

“Good thinking Pinkie!” Sunset says with a grin, her fox tail swooshing. Didn't think I forgot about them being fox girls, didja? DIDJA?

“Alright now the best way to get to Skuldafyn,” Adagio says, “is like this.” She pops out a potion and drinks it then grows wings.

“Mods are great!” Sonata says, popping out a potion and getting a dick. “Noooooo!”

Adagio sighs and summons two new potions then tosses one to Sonata and one to Aria, while Sunset downs one and summons one for Pinkie.

Now all winged up, the girls fly to nowhere. They teleport to Shor's Stone then fly East, ignoring the terrified townsfolk who will speak for ages of the flying fox demons that suddenly appeared out of nowhere and ate all their honeycombs (thanks Sonata).

“I just realized Skuldafn doesn't have a 'y' in it,” Sunset says, taking one for the team.

Adagio, flapping off somewhere, doesn't look back but calls out to her. “Still doesn't make sense, since you were just saying it out loud and not spelling it.”

The party gets to Skuldafn and flies straight to the draugr stick that lets them enter the portal. Since they're cheaty mc cheaters, the dragon priest doesn't have time to realize that he's been hoodwinked before the girls snag the staff and enter the portal. He does have time to wonder what all the weird blue beams building up around him are, but he only really has like three seconds to wonder before oops.

He's dead.

Ion cannons yo.

The party enters the mist-filled valley of lost souls trying to find their way to the hallowed hall of the honored dead. A train whistle sounds menacingly in the distance.

It's kinda killing the mood.

“Alright,” Adagio says, see what I mean? Hard to not like immediately try and specify who's talking. “I mean you could just put the attribution before the dialogue but anyway, let's just fly straight to fathead and bump him off the cliff.”

“Uh-” Sunset flies after Adagio and quickly realizes that she's calling the guardian of the hall of dead people, whose name is...Bumblescrotes, yes, that's his name. “Wow. Zero respect for the lore.”

“Screw you,” Aria says and Sunset looks back at her hopefully with big ol' doe eyes. “Ugh...later, okay? When we're back home, let's all...you know.”

“Erm,” Sonata mumbles, but really loud so people can hear her while they fly through the mists. “Will we still be all like...sex crazy once we get out? What if we're not fox girls?”

“I mean, we don't need to be fox girls to wanna bang,” Aria says. “We'll just probably be a little less....I dunno, needy about it? Maybe?”

“Well, even if I'm not a fox girl,” Pinkie says, “I'll still super love to lick all of your privates!”

“...Pinkie...there are only a couple ways that could've been said in a less sexy way,” Adagio says, groaning. They arrive at Bumblescrotes and he starts talking.

Which is really not a great tactical move for him because it gives them all a chance to summon ion cannon beams.

He dies before his spiel is up and respawns or whatever it is he does when he loses and he lets them pass. They enter the hall of the dead vikings- sorry, “Nords,” and get to the three annoying people.

“Give us help or whatever,” Aria demands.

“Yeah!” Pinkie exclaims.

“Oh no, we're not doing this again,” Adagio says, obnoxiously. “You gotta be kidding me.”

“Holla holla get dollah oh no, I didn't think that'd actually come out,” Sunset says, blushing and face-palming.

“Ah, heroes of-” the whatever people start saying, but the author hasn't done this quest in a billion years so they shut up as Sonata whacks them outside with an ox leg.

“Problem solved, let's go!” Sonata says cheerily, running outside while the whole of Shor's hall draw their weapons.

“Um!” Sunset says as everyone targets ion cannons at the door. Everyone as in all the fox girls. They rush outside and the throng of immortal souls gets rather hampered by the orbital lasers which have no right being able to fire in this dimension.

It's just...look, that orbital station is super dedicated to its job. Whatever dimension you're in, you can count on Skywalker Brand Ion Cannons to deliver utter death to everything within a significant radius within three seconds or your money's still gone!

Skywalker Brand Ion Cannons is a division of Skywalker Ranch, a Delaware Limited Liability Company.

“We must blow back these mists!” the old wizard dude says. The girls blink then start casting ridiculous wind spells that actually work pretty well, and the three ancient heroes supplement it with repeated casts of the Clear Weather shout.

A train whistle echoes in the distance and Alduin arrives, whistling angrily. The girls summon ion cannons but Alduin shoots up into space and destroys their Skywalker Brand Ion cannons.

The train rips through the light metal and poly-whatever materials of the space station, his hard steel grill shattering the many focusing lenses until finally he sits face to face with the cannon's power supply, which is a sponge.

Skywalker Ranch, only the moistest!

Whistling in a groaning type fashion, Alduin-train runs over the sponge over and over until the space station powers down, but the girls, who can breathe in space because they have water breathing and space is just water with less pressure and way more radiation, chased Alduin up here and now stand at the … at the right behind him, so he turns around and sees them.

The three Nords are there too since they're like...they don't gotta breathe, they already dead. Don't think too much about that.

The three Nords use Dragontrainrend and Alduin hurtles down to the ground of the dimension, since he's gotta land now, and the party+NPCs chase him.

“Friendship is-!” Sunset starts and Adagio tackles her out of the air. The two crash through a spirit mountain and finally kill off Hod for good by landing on his soul and exploding it with explosive explosions.

Of COOM>

“God why!” Sunset groans and Adagio kisses her neck softly.

“Whoah wait what? Knock it off Sunset Shimmer, we have a dragon demigod to kill,” Adagio purrs, running her tongue along Sunset's collarbone.

Sunset wrestles Adagio off of her and onto the ground and holds her throat against the stone beneath them with her forarm, her eyes gazing deep into Adagio's. “Adagio I think we gotta...go finish off Alduin or something.”

“Obviously, so if you could get off me!” Adagio says, flipping the pin and holding Sunset down. She trails her fingers down the front of Sunset's..down her front, down the front of Sunset's Sunset and down to where her leather pants hug the skin of her waist tight. She slips a finger in, loving the feeling of the tight pants pressing her finger into Susnet's skin oh I see 'Susnet' is making a reappearance.

“Are we just gonna bang?” Sunset says, her breath light and fast. She reaches down and pulls her laces free, loosening her pants and letting Adagio slip her fingers lower.

Adagio breathes a hot, heavy breath on Sunset's cheek and presses her face close, one of her hands reaching up and stroking one of Sunset's ears. “It would seem that way. May as well just...lay back and enjoy the ride.”

They bang and-

“Hell no!” Adagio shouts. “Write the damn thing!”

Fine fine.

They unbang so they can bang.

Sunset reaches down, glancing towards Adagio's hand as she tries to work her pants down her hips.

Adagio turns her face up with a finger, looking down at Sunset's lips and nuzzling her with her nose as she gets her lips just a teensy bit away from Sunset's.

Sunset, not about to be teased so easily, kisses Adagio before Adagio can pull back and takes Adagio's hips in her hands, pulling her down and moaning into Adagio's mouth.

Adagio's eyes widen in surprise but she chuckles into the kiss, running her palms behind Sunset and down into the slowly loosening leather pants around Sunset's body; the loose laces have let the leather hold up.

Those aren't pants, those are panties with some leggings.

Well Adagio now has her hands fully on Sunset's ass, her fingernails unsharpened but still hard and scratchy and pressing into Sunset's body as Adagio pulls herself closer, further down.

Sunset slips her thumbs up into Adagio's panties, glad that the author looked up the armor again, and slips them down over Adagio's hips. Adagio sits up and Sunset looks down, watching, her eyes focused solely on every inch of Adagio she reveals as the panties slide down. With Adagio's legs straddling her own, the panties reach a point where they can't stretch any wider to get down, and Sunset stares at Adagio's hairless body, glistening in the pale white light of the spirit realm they inhabit.

“See something you like, Sunset?” Adagio asks, dropping a finger down. She opens her slit a bit and bites her lip, smirking down into a hypnotized Sunset's eyes.

Sunset wets her lips (FACELIPSSNERK) and lets out a little shuddering sigh and Adagio laughs.

Adagio dismounts to the side and slips her panties the rest of the way off while Sunset raises up on her elbows, watching. With her panties off, Adagio comes back and slides Sunsets the rest of the way down, her eyes locked with Sunset's as her mouth sits on the crotch of the panties.

“W-weird that we haven't had a scene change,” Sunset says awkwardly.

With Sunset's panties out of the way, Adagio spreads Sunset's legs apart with her hands on Sunset's knees and looks down longingly at Sunset's sex.

Blushing slightly despite the fact she's gotten laid more in the last x days than ever before, Sunset moves a hand down to block Adagio's view but Adagio moves closer, kneeling, and moves Sunset's hand aside.

“I've worked hard Sunset. Don't you want me to have my prize?” Adagio coos, running the crook of her hand down one of Sunset's raised knees, each of Sunset's legs splayed to either side.

Sunset looks down Adagio's body then up into her eyes. “Uh well, I'm pretty obviously turned on, and it's not like we haven't had sex before. Also I'm pretty sure the author's holding us hostage here until we bang. That, and we kinda overrode her attempt to gloss past it.”

“That we did,” Adagio says softly, bringing her lips down to Sunset. She peeks up over Sunset's mound and sees Sunset's wide, wanting eyes, and smiles. “You know...I think if we do get out of this...I'd like very much for us all to live together.” She kisses Sunset's slit and Sunset shudders.

“Y-yeah. I mean, we don't have to, for...for stuff like this, but it'd be more convenient, definitely,” Sunset says, breathless.

Adagio works her lips against Sunset's slit, splitting her ever so slightly, then lets her tongue flow between her lips and into Sunset's body, sending a pulse up through Sunset's hips and drawing a pained moan from Sunset.

“God you...” Sunset starts but she clamps her mouth shut as Adagio circles her clit with her tongue. She whimpers through closed lips and reaches down, gently running her hands through Adagio's warm, curly hair and down to Adagio's ears. Sunset rubs her thumbs along the soft, cold fur of Adagio's foxears and closes her eyes, letting herself rise towards bliss as Adagio's hands grip her thighs tightly.

Adagio says nothing back but smiles, her tongue now lightly stroking across Sunset's clit teasingly, only to swirl around then down one of Sunset's lips, dipping in slightly to take and smear some of Sunset's wetness across her.

After a time Adagio growls, looking up into Sunset's wide, desperate eyes, and starts in earnest. She circles Sunset's clit with her lips, pressing down and caressing her with firm, hard kisses as her tongue flicks and flutters against Sunset's clit, and Sunset's gentle, rhythmic pulses become fast, twitching bucks as she rises and crests into orgasm, her moan now unveiled and echoing across the spirit plains. Adagio doesn't let up for more than a moment, bringing Sunset up again and again, her hands now sliding down Sunset's legs until they're cupping Sunset's ass underneath her. Adagio's knuckles scrape against the stone, too hardened by the enchantments in their bellybuton rings to become bloodied. Adagio sticks her tongue in deep and looks up into Sunset's squeezed-shut eyes, reveling in the look of Sunset's wild, thrashing passion.

Sunset claws at the stone beneath her, her stomach tensing up massively only to relax as her breath hitches and then tensing up again, her back arching, her neck arching, her eyes squeezed shut to drown out everything but the feeling and the sounds, the sounds of her own voice moaning in ecstasy out into whatever lies beyond the darkness of her closed eyelids. She can feel Adagio's tongue working expertly inside and all across her, letting up just as she starts getting too sensitive and coming back once she's ready, over and over again, never letting her orgasm abate for more than just-long-enough before bringing her up to a new height.

Adagio moves a hand off of Sunset's ass and down to herself, her arousal already nearing the breaking point just from watching Sunset's crazed joy. Adagio viciously rubs herself up and into that same maddening height, moaning high-pitched into Sunset's body, the vibrations and suddenness of it making Sunset's whole body twerk as she shoots into another plateau for a moment.

Sunset writhes beneath her and Adagio's hips work against her hand, fucking it like it's her little bitch, and they're genuinely uncertain how many times they finish together, there in the plains where Hod's soul died for good.

When Adagio finally stretches out over Sunset's body and collapses down onto her, breathing hard into Sunset's soft hair, Sunset turns and watches, her eyes half-lidded and a dreamy smile on her face. “You know, Adagio...I'm kinda...super excited to see what happens to us when we get back.”

Adagio, her eyes still closed, smiles. “Yes, well...I guess we should probably go back and help everyone with the dragon, huh?”

Sunset sighs. “Yeah, I guess.” She stays there for a bit longer though before finally slipping out from under Adagio and finding her panties. She slides them back on and turns to see Adagio done doing the same.

“Very well, let's get this over with,” Adagio says. “Then we can...use this.” She uses the console to pop out the magical isekai toaster.

“Oh. Right. That's...a thing we can just pop out now.”

“Yep, since Sheogorath brought it into this world, it's now accessible to our mods.”

Sunset sighs. “If only dragon souls were items and not weird whatevers. Player stat values or something.”

Adagio nods in agreement, sighing as well before flapping her wings and rising up into a hover. “Well, we won't have to worry about game mechanics affecting real life for long. Let's go.” She flaps away and Sunset flaps after her, following the trail of train noises in the distance.

Less of a trail and mostly just noises. Not really a high tracking DC, gotta say.

“She gets nerdier by the second,” Adagio mutters. They arrive at what appears to be a train looking slightly slumped as everyone stands around it.

“Hey guys!” Pinkie calls out as the two land. Each foxgirl who isn't Adagio and Sunset sniffs the air.

Sonata and Aria smirk, and Pinkie keeps sniffing.

“Whoah!” Pinkie says. “Did you two have sexums?”

“...yep,” Adagio says, answering for the bizarrely flustered Sunset.

Sunset snaps out of it. “Weird, I wonder why I'm still shy about it. Um yeah, we crashed through a mountain and couldn't get out of banging. Well we could've, but our options were live through it or have it glossed over.”

“Oof,” Aria says. “Either you have sex and get to enjoy it, or you have sex but don't even remember it clearly?”

“Pretty much,” Adagio answers then motions to the somehow slumped train. “So what's going on here?”

“Dunno,” Sonata says with a shrug. “I think the dragon totally landed on those people though, they're like...double dead Duke Nukem now.

“Cool,” Sunset says. “I mean, 'oh no.'” Nodding at how good of an actor she is, she goes on, “Alright anyway, we probably have to hit him with dragonrend or he can't actually die.”

“Oooo neat, is that like, a sword?” Pinkie asks to the now wide-eyed pair of Sunset and Adagio.

“Wait...” Sunset starts but Adagio puts a hand on her shoulder.

“I have an idea,” Adagio says. “And we might be able to pull it off thanks to you, Sunset.”

“Really?” Sunset brightens up for a moment.

Adagio nods. “Yes. Thanks to how much of a degenerate you are, there might be a way to make this happen.”

“Oh. Thanks?” Sunset frowns but Adagio pats her shoulder and summons a bunch of iron slave collars of leashing.

Uh oh.

“Uh...?” Sunset glances over at Adagio.

“Hush, it's all your fault,” Adagio says, holding up two collars and turning to the others. “Alright everyone, we're going to make a really big collar out of these smaller ones.” Adagio starts connecting collars to other collars, taking advantage of the static nature of the collars in Skyrim to retcon them into being able to do this. Like imagine if you had like, a slave collar that was like a big ol handcuff.

Hang in there.

And like, you attached one handcuff to another set of handcuffs, and you just kept doing that until it was big enough and then you just kinda attached the last one to the first one and now you got a big chain of handcuffs. It's like that but none of the collars are closed because they're attached to other collars instead of themselves, so it's like one big collar. The group makes that.

One big, magical, Skyrim slave collar.

Sunset Shimmer, you degenerate.

“It's not a racial thing!” Sunset insists.

Adagio sighs. “I know, Sunset Shimmer. It's a sex thing.”

“Exact- wait wait does that make me look better or worse?” Sunset Shimmer tries to think but the group is already dragging the giant slave collar to Alduin and she'll be darned if she isn't going to count amongst his new masters.

The group of (here we go) winged fox girls who were first wolf girls because Hircine cursed them from coming from another world so that no one could ever mistake them for belonging and who are actually (in Pinkie Pie's case) a reflection of another existence in a pony-filled word or who (in the Dazzlings' case) former monsters from said pony-filled world or who (in Sunset Shimmer's case) are actually ponies who got through a portal into the human world.

That wasn't as bad as I thought.

Anyway that group gets the giant magical slave collar around the face-ish region of the train that's actually the first-born of Akatosh, a dragon known as Alduin and the devourer of souls (or the world or both I don't remember) and Alduin opens one of his train eyes just a bit and Sunset comes forwards.

“You're um...our slave now?”

Alduin's train eyes open wider, but he can't resist the magic of the iron slave collar(s) of leashing.

“And now,” Adagio says, “we finish him.” The group prepares their favorite spells.

Pinkie Pie casts acceleration rune then hits him with a “fus” and he goes flying.

“Pinkie Pie!” Sunset whines. Alduin hits a wall and dies but the other girls fire their spells anyway.

Adagio uses Hoschimal's comet or however it's spelled. While the sky opens up and the massive chunk of icy space death makes its way down, Aria fires off Frozen Orb, spinning and ripping through Alduin's body with shards of ice. Sonata casts the flaming exploding chicken spell because she thinks its hilarious.

Good girl Sonata, I love that spell.

Sunset Shimmer casts Tri-Disaster and summons a tornado, small sun, and some cold shit on top of Alduin's dead-ass body.

The comet hits and what's left of Alduin is obliterated. The body then explodes on its own as Alduin does some train whistling, and the party is left hanging out.

“Alright,” Sunset says. “Now-”

The party find themselves back in Skyrim, at the Throat of the World, where a bunch of dragons are hanging out. Sonata and Pinkie Pie immediately start summoning Ion Cannons of death, and since Skywalker Ranch ain't no bitch, they've got replacement Ion Cannons up and ready so the beams start obliterating dragons left and right.

The party summons ion lasers whenever they can and fire spells at the panicked and/or infuriated dragons, who screech in train at them and choo choo across the sky, dive-bombing the crazed flying fox girls.

Sunset leaps into the air and beats her wings like mad, closing in on a train and grabbing it by one of its Train-ing wheels.

PFFFT

“Looks like this train does have brakes!” Sunset shouts with a grin as she spams Spirit Storm on the drag-on the train. It dies in midair and careens down. Sunset lets go and watches as it crashes into Rivercraterwoodcrater. “That's what they call....a....a dead train. Alright.”

Behind her on the ground, Sonata is pissing a dragon off by throwing boulders at it with telekineses. The dragon/train whistles mockingly until Sonata launches Pinkie Pie at it. Pinkie Pie lands on the dragon and casts Major Libido Transfusion, and the train's traincock gets super huge and filled with coal or whatever passes for cum in the train world. The traincock explodes and the train gets some anime blushes on its stupid looking train face before it dies, crashing into Paarthunax, who flies off to live another day because he's just the best dragon/train ever.

Aria's found out that the dragon's can't make it hard to see with their various impotent breath weapons if she hits them with way too much goddamn lightning, so she summons a Gate of Babylon-level numer of glowing sigils that then start streaming kamehameha-sized beams of pure lightning death in all directions, killing and/or draining the magicka of every dragon they touch.

Adagio remembers that glacial ray has a dumb range and just starts blasting with it, knocking dragons dead left and right (except the immune ones). She uses her other hand to Spirit Storm the air, filling it with wispy tendrils of draining death.

It basically isn't long before a shitton of dragons are dead and their souls flow into the girls.

“Alright,” Adagio says, landing. The rest all get around her. Sonata wraps a hand around Aria's waist and Aria shudders, smiling. Pinkie Pie takes Sunset's hand and Sunset, blushing, gives her a bright smile. Adagio goes on, unable to keep herself from smiling too, “Let's go down and strong-arm the Greybeards into teaching us way too many words of power that we can use with these souls, then use whatever souls are left to power ourselves up with the dragon shrine that Dragon Soul Relinquishment added. Then we can give ourselves loads of treasure and finally use the magical isekai toaster to return to our world.”

“What about this?” Pinkie says, holding up the cheese wheel of porn.

“Well of course we're taking that,” Adagio says, summoning a new cheese wheel. “We should each make a few and take them with us. For..for the purposes of having porn on a cheese wheel.”

The rest nod. It's a very obvious, sensible thing Adagio just said.

They skip the majority of the mountain, including the snowstorms, via flight, and arrive at High Hrothgar. They bust in through the unlocked front doors and find the Greybeards in a cirlce in the main room, doing that thing they do. Meditating on the way of the voice.

Lazy bastards.

“Hey!” Adagio shouts, but in regular language. Not the dragon language. “Teach us everything you know or we'll blast this place apart.”

“You'll find your threats have no power here, daemons,” Arngeir says as they all slowly stand.

Too slowly.

Aria ducks low and hamstrings one, slitting his throat before he can shout. All hell breaks loose as the Greybeards start shouting every which way, throwing fox girls left and right as the old men zip to and fro, their unbound voices an echoing crash of explosive power through the stone chambers.

Unfortunately, these girls are just about immortal at this point.

With slashing claws and overwhelming spells, they rip and blast their way through the Greybeards until only one remains.

Arngeir, because I'll be damned if I remember any other names. Actually didn't even remember his, looked it up, but I'll be damned if I look up anyone else's name.

“Very well,” Arngeir says. “I have felt the passing of Alduin, and from your power I suspect it was you all who did it. Though I cannot say whether his plans for the world were worse than whatever calamity next befalls it, I shall at least pay you with what knowledge I have.”

He teaches them a bunch of shouts. They use dragon souls to power their learning, since he doesn't feel like remembering how to magically gift his knowledge over. They then take turns kneeling before the shrine where they can spend their excess souls (thanks, mods!) and become even more ungodly powerful.

Finally, they stand in a circle around the toaster. They summon an ungodly amount of treasure and snuggle with it. They put some in bags, some in magical dimensions of holding, wear some more, and all in all just try to bring as much ungodly wealth back with them in whatever manner they can in the hopes that at least one method will work.

“We ready?” Sunset asks.

“We are,” Adagio says, answering for everyone. Everyone else smiles and nods, but in an actual let's go kick ass way, not like a...smile and nod kind of way.

“Alright, let's all touch the toaster!” Sunset says and they all do so.

It'd be really funny if nothing happened, but the author decides to let them go home with all their treasure.

The girls cheer, the gold and gems glittering in the dim light of the inside of the Dazzlings' tour van.

They note that they still have fox ears, fox tails, the ability to grow sharp claws, and way too much magical power. Their teeth are now normal though.

Because I can.

“Well then,” Adagio says, and both Sunset and Pinkie Pie have a bad feeling until Adagio flashes them a warm smile. “Shall we go sell all this?”

The group cheers, but the author has some more time to write today so she totally will.

A montage happens of the girls selling all their money, and wait.

They sell all their treasure for money, they don't sell their money. I mean money trading is a thing but that's not what they do.

Newly millionaires, they go to a realtor store.

I know. I just wanted to call it a realtor store.

They find the perfect home for themselves. Cozy and comfy and modest, a mere 6.5k square feet of humble-ness on a little less than 2 acres. It has six bedrooms and two bathrooms...for some reason...and a separate outbuilding with another bathroom and basically like 10+ more beds in a sort of dorm/guardhouse style way. Also ping-pong tables, foosball tables, how do you spell foozball tables, and other necessary amenities.

They're on a river, big, huge, bigwide, so wide, like....really wide. All around them are pine trees. It's a private community because hahaha take that, commoners! They have a boat on a private pier.

It's humble. Simplicity at its most simple.

They have an outdoor pool built into the deck, as well as a hottub that fits fifteen.

It's ridiculous. I have an address for it but I dunno if I can give it. The damn place has its own website. Like I know it's not like, whatever rapper/pop-star's crazy crib levels but it's still nice.

“This is...amazing,” Sunset says, spinning slowly in the titanic living room, her eyes wide and her smile huuuuuuuuuuuuge.

“Wooooo!” Pinkie drops her stuff—it's fine, the movers are handling most of it—and flies outside, then plummets into the pool. “WOOOOO!” she shouts, swimming, her wings (they're dragon wings, did I not mention? Well they are. Wait shit no. They're fairy wings, heck yeah!) kept tight against...oh those diaphonous fuckers, okay they're just like up and cutting through the water like a shark fin. She flips so she's face up and keeps going “WOOOOOOO!”

Sonata leads Aria to the hottub and they naked then slip in, sighing loud as the relaxing heat eases their muscles and opens their pores. God that sounds gross. But it's a good thing.

The pore opening. I dunno why, it just bothers me to say it like that, but yeah, it's great.

Adagio bumps Sunset's hip with her own and smiles. “I'm certainly looking forwards to breaking in our beds. We have that one room set up right? For the...group activities?”

“Yep, told the movers to move the big bed in there,” Sunset says, taking one of Adagio's hands and draping it over her shoulders. Adagio squeezes her arm and Sunset lays her head on Adagio's shoulder, humming happily. “This is gonna be a lot of fun. I'm so glad that toaster of yours was magical.”

“Me too,” Adagio says, wondering where the original toaster might be and what the implications of it being gone on their return (and of Sheogorath having gotten it into Skyrim). “Me too.”

“Um,” Sunset starts. Unfortunately, while there have been several points during which the author could have ended the chapter, this train has no brakes, no matter what Sunset may have screamed into a train's central train-ness. “Well, I guess we have this.” She pulls out the magical cheese wheel of porn and the two sit on a couch made of the tears of the poor (or like, some sort of high-quality cloth, you know, one or the other).

They turn on the cheese wheel and Catra has Adora bent over a barrel. Literally.

“Well well,” Catra purrs. Ha.

HA. SNERKKKKK

“Catra, what're you doing?” Adora, her heart thudding loud and her breath speeding, can't move at the moment. Catra had hit her with a plot-device-syringe and while Adora can talk and make facial expressions, her limbs may as well be noodles right now.

Hot, toned noodles.

MMMM

“..the hell? Anyway, hey Adora,” Catra purrs again, catlike, her cateyes taking in the sight of Adora's bent-over form. Adora's wearing her standard Adora-Horde attire, and while Catra admits that it usually isn't the most flattering, it fits Adora's sculpted ass nicely.

“Wh-what was that about my...my butt?” Adora says, a hint of fear tinging her voice as she looks back at Catra, sweat building on her forehead.

“Don't worry,” Catra coos, “it's very nice. Though I feel like it's missing something...” She pulls out one of those stun rods.

Ruh oh.

“Catra...Catra look, I know you're mad about me leaving the Horde, and I know you're really, really upset that Shadowweaver...wait is her name really two 'w's' next to each other?”

“Shut it,” Catra says. She stands behind Adora, then presses herself up against her, a hand on the small of Adora's back while the other holds the stunrod. She pulls back then thrusts forwards with her hips, slapping Adora's ass with her crotch. She does this again, and again, and again, her grin widening as Adora makes little sounds of surprise and fear.

“Catra, please, please I don't know what-”

“I said, ” Catra says, slapping Adora's ass. Adora can feel everything, she just can't move. “Now then,” Catra says, reaching a hand down under Adora and undoing her pants pocket.

“P-please-” Adora starts to plead, her eyes watering.

Sunset looks over at Adagio. Adagio is absolutely hooked.

She's got...certain tastes, don't judge her.

Catra sets the stunrod down and takes the waistband of Adora's pants in both hands, her claws poking through the pants and scratching Adora as she pulls Adora's pants down slowly, admiring Adora's pale white skin and firm, toned thighs as the pants stretch, going down over the swell of Adora's body. They pass her hips and drop easily down to the floor, past her knees, pooling around her ankles. Catra laughs, seeing Adora's plain white panties, and cups Adora's ass.

“I'll do anything, please don't do this...not like this...” Adora begs, but Catra's quite the fan of begging.

Not giving in to it, just hearing it.

“Oh Adora. But all I want you to do..is take it, like a good girl,” Catra says softly, sliding Adora's panties down. Adora's panties join her pants and Catra gazes at Adora's quivering body, so scared, so very scared. She holds Adora's hips and kisses Adora's slit, drawing a cracking, squeaking cry from Adora, who starts quietly sobbing.

Catra stands and picks up the stunrod.

Sunset looks at Adagio, and Adagio smiles back at her then turns to the cheese wheel. Sunset looks at the cheese wheel, feeling quite a bit turned on and quite uncertain how she feels about that.

Catra isn't kind.

She starts ramming the stunrod into Adora's too-tight ass, zero lube, and Adora's crying turns quickly into screams.

“Okay, that's enough of that,” Sunset says, turning the cheese wheel off.

“Aw,” Adagio says, looking crestfallen. “But it was just getting to the good part.”

“You...really really really like pain, don't you?” Sunset says. She leans onto Adagio, hoping that her subtle jabs won't set Adagio off.

Adagio smiles. She knows herself; she knows what she likes. She kisses Sunset's foxear (one of them damnit, she still has two) and closes her eyes, burying her face in Sunset's hair. “Only causing, not receiving. Though of course, I like to keep my partner's wants in mind.”

“You know,” Sunset murmurs, feeling so very warm and at peace right here, nestled up beside Adagio. “You're actually surprisingly generous in bed. Our last time, in Sovngarde, you just ended up finishing yourself off.”

“Does it bother you?”

“No, but, I mean...” Sunset rubs her cheek against Adagio's chest. “I guess I'd just like to play around with you, too. Like...I dunno. You know.”

“No, I don't think I do,” Adagio teases. “Go on.”

“Well you're...I mean c'mon, you know what you look like. Erm...I dunno why I said that actually, I mean, it's not just the looks. I feel like we've really gotten closer, and um..well...I wanna do stuff to you too. I don't wanna always just take. I wanna give.”

Adagio licks Sunset's ear. “Oh Sunset. Such a sweetheart. Well, I can certainly agree that looking at me would make one want to touch.”

“I know I probably won't be as good as...well, as you, especially on you, but I'd really like to try.”

“Sounds like a plan,” Adagio murmurs, kissing Sunset's head through her hair.

“Looks like that's it for right now,” Sunset says to the camera. “The author got over seven thousand words in here.”

“Kinda glad,” Adagio says brightly. “We're set now. Out of Skyrim, super powerful, rich, together...”

“Yeah, the rest will be like...a horny epilogue or something,” Sunset says.

Sonata, Aria, and Pinkie burst in from outside.

“WHAT!?” Pinkie exclaims. “I want in on horny logs!”

“Nuh uh!” Sonata says. “If anyone's gonna be a horny log, it's gonna be me.”

Aria sighs. “You have about the right I.Q.”

Sunset and Adagio laugh together, hand in hand, and wave their peeps over.

Thanks, Skywalker Ranch. The moistest of the moist!


“Have you seen this?” Aria says, coming into the main room. One thing the girls have noticed about the house is the aberrant number of windows it has. While the odds of anyone being able to spy on them is low (the house sits in such a way that almost all the windows point out over the big-ass lake) it's still mildly disconcerting.

Aria's holding the cheese wheel by the way.

Pinkie looks up from the eggs she's making for everyone on the giant ass stovetop. But like on a pan. Five pans.

Seriously this stove is probably bigger than my truck.

“The porn wheel?” Pinkie asks.

“Not...well yeah, but like, this shit,” Aria says, putting the cheese wheel on the table. The girls gather around, then push Pinkie back towards the unattended stove.

“We'll tell you about it,” Sunset says.

“I'll just turn the volume up,” Aria says, rubbing the side of the wheel in an upwards motion.

It works.

A man's on the cheese wheel's screen, smiling. What's odd though is that he's fully clothed.

“Here at Skywalker Ranch,” the man begins and Adagio, Sunset, and Sonata all groan.

“Why does this keep coming up?” Sunset wonders.

Adagio facepalms. “Who knows, let's just...hear what this is about.”

The man goes on, having been paused by Aria, who really has this whole cheese wheel of porn thing down pat.

Is that the saying? I know “having it down” is and I know I've heard “having it down pat,” but is it really “pat” or just something that sounds like “pat?”

Moving on.

The man goes on damnit. “We're simple moisture farmers.”

“What's a moisture farmer?” Sonata asks, moving behind Aria and rutting up against her.

“Sh-shutup, he'll...unf,” Aria manages as Sonata grinds her hips up against Aria's ass.

The video shows a man in jeans kneeling down on some wet ground next to a bucket, breathing heavily. He turns towards the camera, smiling serenely, then reaches into the bucket. The audience can't see what's in there because of how the shot's angled, but he pulls out a blue sponge. He dabs it on his sweaty, stubbly face and grins at the camera. “Now that's some moist moisture.”

It cuts back to the first man, who looks pretty much like the second man only with a different face and body. “Skywalker Ranch, where the moisture's moist!”

The commercial ends and Aria arches her back, running a hand through Sonata's hair. Sonata licks at her arm, and the rest of the girls watch until the smell of something burning perks them up and turns them all towards Pinkie Pie, who is watching also.

She's not watching what she's doing though, clearly.

“Whoopsie-Pie!” Pinkie exclaims, I almost put says but remembered it's Pinkie Pie.

Sunset looks back towards Aria, whose head is getting pushed down onto the counter by Sonata's whole-ass hand. “So what? Some weird commercial about dudes with wet sponges?”

“It's...S-Sonata, hold up a sec,” Aria says. Sonata spanks her hard then lets up, sitting on a stool beside her. Aria breathes heavily into the counter for a few moments before standing up, swiping her hair out of her eyes and sitting with a pleased smile and flushed cheeks. “Okay anyway. That blue sponge is like, totally the thing powering the ion cannons. And I'm pretty sure I heard you-know-who mention that they were Skywalker Ranch affiliated.”

“The...the ion cannons?” Sunset asks, cocking her head. “I mean I think I heard that too, but I figured it was just some weird...whatever.”

“Yes,” Adagio says, “it was originally because the author went mad and couldn't figure out how to say 'moist' without it devolving instantly into madness. They remember vaguely that the Skywalkers from Star Wars were moisture farmers, and apparently this is how the author's choosing to interpret that.”

“Well still though,” Sunset insists, “what's this got to do with us? I mean, we haven't been able to use any of our spells since coming here anyway.”

Adagio nods. “And with our investments, we won't have to ever worry about running out of money, so we'll never need to re-isekai ourselves into Skyrim again.”

“Well,” Aria starts, “this isn't just Skyrim though. I mean, these cheese wheels can show us porn from anywhere. So what if Skywalker Ranch is actually like...some sort of interdimensional thing?”

“And what if they are?” Adagio asks. “If anything, we should be thanking them. Without ion cannons, that whole ordeal would've been quite a bit slower and more annoying.”

“I dunno,” Aria says, “it just creeps me the fuck out. Gonna be like that whatever from that old movie. That A.I. that like...takes over everything.”

“Skynet?” Sunset offers. She glances at Adagio, who raises an eyebrow. “Oh c'mon, I'm sure you've heard of that.”

“Just because I played Skyrim doesn't mean I'm into all manner of....whatever it is you people are into,” Adagio says with a smirk. She stands and walks over to Aria, kissing the top of her head and breathing the scent of her hair in deep before continuing on to one of the multiple couches set up in the living room.

Seriously like, my college had this big community area and this house gets pretty close to that size-wise.

Pinkie brings eggs over and gets everyone a plate. She brings Adagio hers and Adagio takes the plate then sprawls out over the couch.

“Well,” Pinkie starts as she sits next to Sunset, bopping her with her shoulder. “They're a business right? So we could probably figure out where they are, or some way to contact them or something. Maybe they have a website!” She pulls out her phone, which has wifi via the router. Which is like....how wifi works. Anyway their house has a fiber-optic connection straight to it.

This house is ridiculous.

“I'll be amazed if-” Sunset starts but Pinkie interrupts her with a cheer.

“Ooooo found it! Skywalker Ranch!”

“I'm amazed,” Sunset says, laughing. “So where are they?”

“Well, they just have one phone number and an email address, and no branches or like...non-email addresses or anything. Their 'about us' just says 'moist.'” Pinkie raises an eyebrow. “They're really dedicated to being moist, huh?”

“They sound like, total weirdos, but not like...the kind we have to care about,” Sonata says, leaning onto Aria and licking at her cheek.

“Guess so,” Aria concedes, her eyes closed and a smile on her face as Sonata gently licks her. “I guess it's just weird to uh...wait...” She stands but doubles over almost immediately.

Sonata reaches out to help but her eyes go wide as some scent catches her attention. All around the house, the other fox girls have all perked up, their eyes wide and ears twitching. They sniff.

And all of them zero in on Aria.

“Guys,” Aria says, stripping in a flurry of razor claws and whimpering growls. “I...oh shit...guys something's h-happening,” she says as she hops up on the table, spreading her legs wide and arching her back, whining loud into the house.

“S-something's...” Pinkie starts but her voice devolves into a growl and she tears her own clothes off. All around the house the other fox girls do the same, inching towards Aria.

Sunset launches towards her first, landing atop Aria and trying to jam her leg between Aria's to wrench hers open even further. She claws onto the table and Aria grips her arms tightly, but Adagio wraps her arm around Sunset's neck and yanks her down by the throat, out of Aria's grip. Aria tries to chase them down but Sonata gets between her and the fighting pair and grabs Aria's face in her palm, throwing her backwards onto the table and smashing her down into it again and again.

Aria whimpers and licks at Sonata's hand and Sonata stops smashing her down (by the head) and instead kicks her legs aside and scooches up close, her hips pulsing erratically as she positions herself to slam her sex onto Aria's.

Pinkie Pie chooses now to choose violence, dragon-kicking from across the kitchen, out into the dining area and straight onto Sonata's face, carrying the both of them through several massive windows and out onto the deck. They slash and kick at each other, twisting each other's limbs and viciously biting with their no-longer sharp teeth but making up for it by clawing at each other, growling viciously all the way. They tumble down a set of stairs and wipe out several chairs set up around a firepit, their skin grinding onto the gravel, too hard to pierce but not impervious to pain. Their faces are twisted grimaces and hateful sneers as they growl and bark at each other, their eyes locked on their foes but their minds locked on thoughts of Aria.

Aria, meanwhile, would just like one or all of these fucking idiots to fuck the everliving fuck out of her.

Fuck.

She moans and pulses on the table, fingering herself, trying to bring herself up to orgasm but something in her mind blocks her, keeping that height just out of reach, frustrating her more and more by the moment. She never knew desire could build like this, rising and swelling more and more, yet denying her that sweet, blanking pleasure of losing herself completely.

Her own body is teasing her, luring her to the edge and holding her waist as she tries so desperately to fall.

Adagio leaps back from Sunset but Sunset closes the distance and gutpunches her then spins a kick into her face, sending her flying across the room and through a window. Sunset turns to Aria but before she can fuck the be-crap-us out of her, Adagio recovers and leaps back in through the window. She dives into the living room, rolling and coming out of it in a spin, hucking a couch at Sunset with her momentum.

Sunset takes the full brunt of a couch to the face and topples over, skidding across the ground and running headfirst (sliding headfirst like a Sunset Torpedo) through the front door. She handstands and spins, flipping back up feetfirst and grabbing a rock.

She decides though that grabbing a rock is silly and instead runs to the nearest tree and uproots it. She slashes it down to a manageable size, about 15 feet long and tree-width wide, and runs back inside.

Inside, Adagio has Aria on the table while she stands at one edge, Aria's legs splayed out to either side. She's pressing her pussy against Aria's hard, moaning into the ceiling while Aria writhes and squeaks, hips bucking.

“Eat tree bitch!” Sunset shouts as she uses her palm against one end of the tree to drive it outwards, nailing Adagio straight in the face and sending her flying through the far windows and down the hill into the river. Sunset runs up to Aria, who is crawling desperately towards where Adagio went, and leaps onto her back. Aria's breath hitches and she looks back at Sunset, her eyes panicked.

“S-Sunset please, please you gotta fuck me, c'mon, please I'll do anything,” Aria begs and Sunset flips her onto her back and spreads her legs.

“Yeah okay I can do that, sure, sure I-” Sunset mutters but she's cut off by the bright chirping of two very horny, very angry idiots.

“Whatcha doin' there Sunset Shimmer,” Pinkie says, holding a gun.

“Yeah Soznet Shomner, hope you're not banging my girl or something without my gun in your mouth,” Sonata adds, also holding a gun.

“Where'd you get guns?” Sunset asks, pulling out a gun from the floorboards.

“Will you all just fuck me already?” Aria says. She doesn't pull out a gun she's just really horny.

Adagio arrives from the river, pissed as all hell, with an AK. “Alright, if this is how it's gonna be.”

The group all stands poised to attack, a true Mexican standoff. Whatever that means. I mean I know what it means but I don't know why it's called that.

Look I'll google what Alvor's wife is called or whatever but I refuse to do any other research.

It's Sonata who cracks first. “You ain't no weeble-wobble!” she shouts at no one in particular as she turns and puts her gun up against Pinkie Pie's cheek, blasting immediately.

Pinkie Pie's skin is too tough for guns thanks to all that magic, but it still hurts like a bastard and she falls back, clutching at her face as she opens fire at Sonata.

Adagio holds up the AK, lining up the sights and blasting Sunset before Sunset can even figure out if she's racked the slide to chamber a round or of there was already one in it. While Pinkie's cheek is tougher than the 9 M.M. Parabellum Sonata shot at it, Sunset's forehead really, really doesn't like getting hit by the 7.26x39 from Adagio's AK and she sees fucking stars as she clutches at her forehead, falling backwards off of Aria and losing consioucness for a few seconds.

Adagio takes advantage of these few seconds by running forwards and snagging Aria's wrist in her hand. She pulls her, trying to make a break for it, but now both Pinkie Pie and Sonata are unloading on her, each bullet like twenty to thirty Sunset gutpunches all across her body. Stunned from the pain, Adagio topples straight over, and unlike a weeble-wobble she doesn't pop up but instead curls up as her mind recovers.

“I hit the most, she's mine!” Pinkie screeches as she runs in and grabs one of Aria's legs, hitting the mag release on her Glock 32 Gen 4 chambered in .357 Sig Sauer.

Now that's not the same as a .357 magnum, okay, you goof. GEEZ. Also even though it has “Sig Sauer” in the name, that's the cartridge designation. Yeah, it was developed or whatever by Sig Sauer, but they're not the only brand that makes that round.

Look, cartridge designations are ridiculous, trying to find the logic in them is a recipe for madness. They have self-contained logic, but once you start trying to compare them it gets nuts.

Anyway the round is like a 10 mm casing or rather a 9 mm parabellum projectile with a 10mm casing necked down to it or something like that. Really great round, but the recoil was apparently too much for most LEA's so they refused it, just like the 10mm, and are sticking with the 9mm parasolmushroom until the end of time at this rate, which is fine, if it works it works.

Anyway.

Pinkie goes to load a new mag (that she pulled out of a nearby potted plant) but Sonata, who had already (opens gun locker) reloaded her Sig Sauer P365 XL chambered in 9mm parabellum/9mm luger/9x19 huehuehue are cartridge designations fun yet is now firing at her and Pinkie gets donkey punched by four rounds straight in the donkey-punchable part of her head and staggers over, clutching at her skull like the near immortal fox girl she is. With wings.

Sonata leaps on Aria mouth first and lands in a 69, her tongue setting to work immediately on Aria's clit. Aria's mind lets her through the wall on Sonata's touch and she crashes into orgasm like a Seattle driver who has never driven in snow is now going East over the pass and it starts snowing and like they can't see anything, it's just white, drifting snow coming down, dancing almost, it's like hypnotizing and you know it's just random but it almost starts to be like a pattern and it's so beautiful and everything around you is white because the plows have pushed the snow to the sides but of course there's more on the road itself and the walls on either side are like 20-30 feet high so you're just adrift in this white void and it's so quiet too because of how snow muffles/absorbs the sound and it's lovely but also there's snow on the road and this is a Seattle driver we're talking about so they've lost control a bit ago and are now just sliding back and forth, not quite full-spinning but mostly just sliding at an angle down this road, and they're trying not to overcorrect and they have the radio on and it's just this surreal, calm atmosphere despite the fact that they're completely out of control and could die at any moment because let's be honest they can't see a goddamn thing in front of them and they're not even sure they're driving the right direction because everything is just white and it's night out did I mention it's night out and yeah.

That's how hard she goes into orgasm. Just white nothingness all around, and this overwhelming tranquility filling her even while her body twists and writhes and bucks in maddened, crazed ecstasy.

But that's when Sunset starts blasting with her (glances in gun locker oh shit Sunset you cray cray) Ruger Super Redhawk with a 9 inch barrel chambered in .44 magnum. And when I say “starts blasting” I mean she shoots once and Sonata just stops moving completely and flops off the side of Aria.

She's not dead, but Sonata.exe has stopped working after taking a .44 magnum round straight to the dome.

“Fucking shit!” Aria screams, pounding the ground on either side of her with her fists. “Will one or all of you just fuck me already fucking fucking fuck fucks!”

Sunset doesn't need to be told twice—or at all, honestly—and she's already launching across when Adagio recovers and brings her AK down like a fucking hammer on Sunset's spine as she rushes towards Aria.

Sunset hits the ground but flips up immediately, only to realize that the melee attack was more of a positioning thing.

Adagio smirks as she starts unloading with the AK, and Sunset does some writhing and bucking of her own as her body gets pounded by the rifle rounds. Leaving her twitching in pain and shock, Adagio turns to Aria and leaps on her, placing the AK by her side as she jams her knee down on Aria's pussy.

Right about now, Adagio's knee might as well be like....like if Aria's vagina was a deer and the knee was a salt lick. Aria grinds on it, humps at it, fucks that knee like fucking it will cure cancer. She can't get enough of that knee, she wraps her ankles back behind Adagio's hips and pulls herself closer just to fuck that knee harder.

Adagio holds Aria's throat down and squeezes while her other hand grabs one of Aria's and pins it down to the ground for a moment. Aria keeps her hands down and Adagio lets her hand go, bringing her hand up and greedily grabbing at her breast, working the soft handful of squishiness in her fingers like... like a …. like a breast.

C'mon.

Like a marshmellow but not really, like if there was somehow water in it? But like the texture is really different too. C'mon people don't go out there feeling up giant marshmellows, it's not all that similar.

It's marshmallow isn't it. Goddamnit.

At Adagio's touch, Aria moans, biting her lip and fucking Adagio's knee harder. Her eyes tear up, so very, very grateful for the touch that lets her slip back up into orgasm. Every moment she falls away from that height feels like dying, like starving and dehydrating all at the same time, like coming down off a high for someone so utterly addicted, always needing more, needing more.

But that's when Pinkie Pie recovers.

“Yo Dizzle-Dazzle!” Pinkie says as she flips forwards and snags Adagio's AK. “Eat sled, Rosebud!” Pinkie exclaims as she blasts Adagio over and over, sending a good five rounds straight into Adagio's stomach.

While the bullets clink against the ground, flattened and shattered against the impenetrable skin of the flying fox girl, oh are flying foxes a thing? Anyway, it still hurts like ten bitches and Adagio falls backwards away from Aria, taking her cum-covered knee with her. Pinkie reaches down and grabs Aria by the hair, which kinda fucking hurts, then stats dragging her out of the house, which really fucking hurts but right now Aria doesn't really give a damn as long as it looks like she's about to get laid.

Also her hair can't be pulled out.

Uh it's an enchantment or something.

Sonata chooses this moment to pop up like fucking Bonnie from Five Nights at Freddy's. “Two in the Pink!” she screeches, front-flipping and snagging the magnum then popping Pinkie in the shoulder with, it's like a little bop I swear, who says getting hit by a .44 magnum isn't like a little bop huh?

I mean c'mon how many eyewitness testimonies of .44 magnum survivors could there be.

Anyway it's like getting gently booped by a train and Pinkie grabs her shoulder and topples over in pain, but she doesn't let go of Aria's hair and Aria's still screaming. With Pinkie down for the count though, Aria starts rubbing her slit against the passed-out Pinkie's stomach, moaning in ecstasy as her body finds itself unable to determine the consciousness/consent of her partner.

Sonata growls and wooshes over by Aria then kicks Aria off of Pinkie.

Aria whines but Sonata jumps onto her and jams her hands down into Aria's crotch like if you're looking for the last few chips in a bag of potato chips (or crisps if you're from that fucking place with the tea) and Aria screams “Yes, yes, please Sonata please more!”

“Gimme dem chips!” Sonata yells back, a growl permeating her voice as a Skywalker Br- wait as Aria's moisture permeats her...

Permeats. That ain't it.

Permeates her fingers. She doesn't care about being subtle, she doesn't care about being gentle, Sonata just wants to fuck Aria's pussy apart in whatever direction her fingers happen to be fucking in as she jams and jabs them around.

Aria's sexmad vagingo is fucking pleased at any contact from an alpha, but she doesn't get to enjoy it long before-

“Noooo!” Aria pleads with the author but too bad, Sunset's back and she's got a Glock!

Sonata turns and both she and Sunset unload on each other, making each other that one word, you know the one, incapacitated that's the ticket.

“Goddamnit!” Aria shouts in annoyance. She turns and sees Sonata holding her stomach where the .357 Sig Sauer rounds hit and squats down on Sonata's face, grabbing her head and jamming her upwards, forcing her lips against her slit. “You're gonna have to breathe eventually!” Aria yells, cackling, and she's right.

Sonata, finding her mouth full of hot puss, tries wriggling away enough to breathe but Aria jams herself down harder and pulls Sonata's head up with all her strength. It's all Sonata can do to stab her tongue around, trying to get Aria off enough to distract her long enough to breathe.

Adagio's back.

She's not pleased.

Adagio picks up Sunset's Glock (they all actually belong to their “community gun pile” which is what they call “their furniture” because despite the law of the land they can't be bothered to properly secure their firearms) and runs up behind Aria. She wraps one arm up under Aria's shoulder while maneuvering the gun around Aria's waist.

Sonata glances over. Just next to Aria's mound is the muzzle of a gun.

This isn't Sonata's day.

Adagio blasts and blasts and Sonata's flailing pain is enough to break her out of Aria's grip and Aria drops her and shoves herself ass-first backwards into Adagio, who isn't terribly bothered by this and in fact super enjoyes it.

Adagio drags her over to a counter and bends her over it, jamming her thumb up Aria's ass while her other fingers slide into the slick tightness of Aria's slit, splitting it open and exploring her as Aria moans and cries out barely-coherent thanks, her eyes filling with tears of joy and the torturous feelings of having her orgasm denied so often, again and again and-

Pinkie's back.

She's got that AK.

“Stop goddamnit!” Aria screams but Pinkie isn't about to let someone just not get shot by an AK, so Pinkie blasts round after round into Adagio's back.

Adagio isn't giving up this time though. She grits her teeth against every titanic blast of piercing force, all that momentum and explosive power focused into the fine tip of the FMJ round pounding into her again and again. Pinkie runs out but ejects the magazine and pulls a new one out of their fucking tea-set as Adagio keeps her fingers going, her other hand wrapped around Aria's waist, working her clit like a rotary phone, don't know what that is? Too bad!

It's the sexy spot of a wewman.

SNERKKRKKKKKKK

Pinkie keeps shooting, getting closer, step by step, but Adagio won't stop, can't stop, so many thousands and thousands of years she's been with her two fellow sirens, the only three of their kind. So much she's done to keep them going, to keep them safe and alive and thriving, even when the whole of the world was against them, and Adagio is certain, after all that time, that if nothing else could stop her at any point before, she sure wasn't going to let herself get stopped by the human reflection of the pony world that got isekai'd into Skyrim and became a wolf girl who later retconned herself into a fox girl and went on a magical bullshit adventure in which Sheogorath gave them a cursed Wabbajack that could install game mods into the world which led to them getting insane magical powers and enchantments and even eventually wings and allowed them to wreck Alduin who was a train at the time thanks largely (wrecking him, not him being a train) to Skywalker Ranch, where the moisture's moist, and let them also get lots of treasure that they used to become rich on returning to the world that's a human reflection of the pony world.

Adagio.

Wasn't going to get stopped.

By a THAT, with an AK.

Pinkie Pie closes the distance and spins, hitting Adagio square in the side of the head with the barrel of the AK at a speed of about 200 mph. Adagio loses consciousness, but the will of her conviction drives her hands to keep working her gal pal's ass&puss like mad while Adagio's head lolls back, her eyes half-lidded and drool coming out of the corner of her mouth to emphasize how ko'd she is.

“No way,” Pinkie says in awe. But she isn't about to get stopped by-

“God no!” Sunset says, Sunset, who is a pony who-

Sunset runs up and dragon-kicks Adagio's ko'd body, popping her outta Aria like a cork outta champagne. Pinkie takes this opportunity to start humping the shit outta Aria's bare ass, but angles are weird so she flips Aria and pushes her further on the table then jumps up onto the table and lifts up one of Aria's legs, while on her knees (Pinkie's on her knees jfc sex scenes why) and has the leg like...okay so one of Aria's legs is just normal “come hither upon mine vajeanyeah” position but the other is like up against Pinkie's shoulder, such that Pinkie could just fuck the leg, but she ain't gonna because she's gotta make this hard on me.

Pinkie gets close and starts straight-up scissoring Aria like a fucking try-hard first-timer “I've only seen porn” bitch and Aria loses her shit because it's secretely what she's been craving so bad this whole time, just some good old-fashioned gal pal clam slamming.

Pretty sure if I ever get within 200 miles of the pearly gates St. Peter's just gonna whip this fic out and my case will be closed. Against me.

I'll probably go to hell is what I'm saying, so moisten your moisturizers so you can meet me there, ya dig?

Aria's just straight up screaming now, no words can come close to describing how fucking good it feels to have Pinkie's wet slit rubbing and crushing itself against hers, the pressing warmth, the foreign wetness, the wondrous feel of them melting together like to slap-happy pussies just clip-clopping away at each other.

Adagio recovers consciousness and tries to make a bolt for the happy fuckers but Sunset suplexes her outside. Sonata tries to take advantage of this opening but Pinkie blasts her with the AK. Sonata rolls down the hill, taking out Sunset and Adagio, who had broken off of each other to try and run up the hill, forgetting their wings in their panic.

“Fucking Sonata!” Sunset shouts. She starts just straight up wailing on Sonata's body with her fists, pounding and pounding away, then flips Sonata face down and starts rubbing her slit on the small of Sonata's back. “Gonna fucking show you who's boss, Sonata you fucking fuck,” Sunset Shimmer, redeemed villain, says out-fucking-loud in public. Well it's a private residence but still.

“I think you need a chill-pill,” Adagio says. Adagio rises up, her wings boosting her (don't @ me people who understand physics) and punts Sunset into the river. She doesn't try and help Sonata because as far as Adagio's concerned ain't nothing gonna help that girl.

Damnit it's 11:55 P.M., be back soon!


Sunset Shimmer isn't about to let herself get counted out just on account of getting punted across the river and in a few seconds of mad wing flapping she's back. She picks up Sonata on her way because it can't hurt to have a blunt instrument in matters of getting laid.

Well that's dark, moving on.

Adagio sees Pinkie still screwing Aria's brains out and Aria just wailing, smiling bigger than anyone's ever seen as she jerks and writhes in an endlessly en-bettering orgasm. Adagio picks up a couch and hurls it at Pinkie but if she thinks that's gonna stop Pinkie from having the best lay of her life she's damned wrong because Pinkie just keeps fucking.

Adagio growls but turns and slashes at the air as Sunset, wielding Sonata, busts through the wall and takes a swipe at her. Adagio's claws and Sonata's face meet and Sonata, still ko'd, goes twirling.

Adagio thinks maybe she sprained her wrist.

Sunset takes advantage of whatever the hell she got out of busting through a wall and tackles Adagio to the ground. She headbutts Adagio and tries to peel herself off to make a break for Pinkie's Pie but Adagio grabs her arms and drags her back, headbutting her again and again.

“You wanna make this a real battle of the heads?!” Adagio snarls, bashing her forehead into Sunset's over and over. No blood is drawn but both girls feel themselves getting dizzier and dizzier, their vision blurring more and more as consciousness starts eluding them.

“I'mma breadroll!” Sonata yells, picking up their 150” T.V. and bringing it down on both Adagio and Sunset's heads like one of those cartoon moments where someone hits someone else with a painting and they're like sitting there dazed with their head punched through the canvas.

It's like that but a little worse because it's a fucking T.V.

Sonata, a breadroll, rushes up to Pinkie Pie and puts one hand on the nape of Pinkie's neck then starts punching the shit outta Pinkie's face, cackling, a manic grin plastered across her face as she punches Pinkie again and again.

Pinkie eventually flops off of Aria and Sonata takes her place but she's too blah to try and figure out scissoring right now so she just spreads Aria wide and dives in with her crotch, full-slamming like way back in chapter whatever the fuck.

Aria makes it pretty clear she loves this just as much and keeps howling in joy, but her throat's getting a little parched. Sonata notices and, without stopping, picks her up by the waist, still pumping like she's got a dick, and dunks Aria's head in the sink. She reaches up and activates the faucet then resumes fucking as Aria gargles a mouthful of live sink, getting rehydrated and then holding her hands up in a desperate attempt to divert the water from drowning her. Sonata growls and slams Aria up on the counter so she's like....a cutting board that's up on the counter with one half in the sink and the other half getting fucked by a winged fox girl.

Just like that, just like that totally normal visual that definitely happens to cutting boards around the world.

If your cutting board isn't getting fucked by a winged fox girl then you're just...that's just mean, I can't believe you would deprive your cooking implements of that joy. How could you.

Pinkie pops back up and Adagio and Sunset rip their way out of the remnants of the T.V. The three of them launch towards Sonaria (official ship name) and Aria finally bats the faucet away and wraps her legs around Sonata, twisting her down to the ground and roaring out at the others.

“Will you psycopaths just knock this shit off already?” Aria grinds herself against Sonata, who is bucking upwards and clawing at Aria's ass. “Listen!” Aria shouts out as the other three come at her with hands twitching. “I'm sick of this...unn...” her lids flutter as she rises into another orgasm and the three pounce but Aria twists to the side and falls over, using Sonata to shield her body. The three start wrapping themselves around Sonata and Aria and they end up in a big pile of twisting limbs and punching fists.

Aria calls out over the din of growls, “Just fuck me all at once goddamnit, stop fighting each other and fucking fuck me damnit!”

The ball of horny fox girls growls but agrees, and they twine themselves together. Aria feels someone's fingers work their way inside her, sliding gently down her lips (you know which lips damnit) then up again, dipping in and rubbing her wetness across her clit, sending a full-body shudder through her. This hand's joined by another, then another, and before she knows it Aria has four hands and thus...twenty fingers caressing her like a disjointed twenty-tentacled squid-monster with four different brains all intent on finger-fucking her senseless.

And finger fuck her senseless they do, even though it feels like she's got the most disturbing fisting being done upon her occurring. That is techinicall a sentence.

Stuffed full of feral fingers fumbling into her and sliding in and out at random, each hand sparing a few fingers or a thumb for her clit (and one hand also totally goes for her asshole, goddamnit Aadgio) Aria would expect that she'd find the situation uncomfortable at best and terrifying/painful at worst.

Unfortunately she's an in-heat omega fox-girl and this is about peak hotness for her right now.

She doesn't buck, nor does she writhe. Her hips don't pulse. Her whole body shakes, tensed throughout her, her pussy contracting on the fingers that fuck into her viciously, love-lessly, and she lets out one long, breathless whine as her mind shatters into pleasure, bright and senseless, pure burning gone-ness, a high like she's never known in thousands of years of trying whatever caught her fancy.

She's sampled this and that here and there, all through the ages of Equestria and the human world they'd been exiled to, but nothing compares to this.

The other girls all feel one singular drive. They must fuck Aria, and they must keep fucking Aria. All else is secondary. Eating, drinking, even breathing means nothing besides getting their bodies near Aria and making her cum. They hate that they're not alone with her.

They hate it.

But the fact that their ceasefire means they all finally get to send her past a delirious brink, past conscious thought and into the madness of pure, peak pleasure, lets them able to at least tolerate the presence of the other alphas, their legs and arms all an attack on their goal but Aria's able to take them all in, squeeze herself around their probing fucking fingers, and use them all to send herself off that sheer white cliff.

So they keep tolerating each other, and they keep fucking her, sending her higher and higher, the hands not inside her touching and caressing, their tongues flicking across her in little teasing strokes then dragging across her skin slow and hard, their eyes glaring at each other and their growls low and restrained.

Aria feels it all, but where once her body would've turned the excess sensitivity into discomfort and chafing after a time, now there's no barrier, no upper limit; her mind feels as if its expanding to accommodate new sensations of pleasure that she could never perceive before, flying ever upwards, height now meaningless.

They eventually drag their love pile of fox-fucking out the back door of their house and down to the water, and without missing a beat they sip from the river, staying hydrated while still endlessly fucking Aria. They switch out hands, they take turns with their mouths, they even all wrap their legs around each other and try fucking her with their thighs (it doesn't work, Aria's not that huuuuuuuuuuge) and time passes. Night falls, and they never stop.

The dawn arrives, and still, they never stop.

It isn't until midway through the day that they all stop at once, their bodies relaxing as that strange, craze-inducing scent that had filled them vanishes, as soon and as subtly as it had come. They lay there in silence for a time, the bright sun blaring down on them through the pine trees surrounding their home. The wind rushes through the trees, making a gentle sound as it pushes through the pine needles, like a whisper long and low from very far away.

On the ground beneath them, by the pier, the dry dirt and pine needles hide ants that make their way to spots unseen, caring not at all how much the fox girls paid for their mansion; nature always hides just beyond the edge of civilization, especially here, where it surrounds and threatens to swallow up the meager holdings of mankind should ever humans falter for even an instant.

“That was...pretty okay...” Pinkie says, her voice hoarse. She stands and wobbles over to the river. Upon arriving at it, with the water lapping at her bare feat, she falls forwards into the river and starts sucking in water/drowning. She flips and starts coughing up water and promptly starts sucking in more, now on all fours, and drinks like that for a bit, half still recovering from drowning.

The other girls all skip the part where Pinkie almost drowned herself and go straight to the part where they're on all fours and drinking straight from a totally safe to drink from river.

Eh they got enough enchantments to not die from it. Probably. Should've really kept the waterbreathing though, now Pinkie looks like a dummy head.

Once they're all rehydrated, they make their way back up to their mansion along the wooden stairs/walkway in silence, stretching and rubbing at sore spots earned while fucking the beezies out of Aria. Aria, for her part, looks pretty damn content, and even more so with Sonata's arm around her shoulders.

Aria turns to Sonata and licks at her cheek once. “Hey.”

Sonata giggles, turning and nuzzling her nose against Aria's. “Hey.”

To their side, Adagio smiles. While her body is a wreck and she's unconvinced that she actually fully survived that ordeal, there's still a bright, soft warmth working its way through her body. She feels peaceful, contented, fulfilled; she feels like she's never felt before. Every small success before now, every great conquest, every thing she's ever accomplished always left her craving for more, except this.

She feels, finally, complete.

Sunset steadies Pinkie Pie, who had just staggered a bit and nearly fallen off the path. Pinkie smiles at her and leans her weight onto Sunset, who is more than happy to help her make it up the rest of the way. Sunset wonders at her luck; while Pinkie may not have that separation of love that Sunset assumed was the normal for everyone, and while Pinkie's sexual desires seem mostly in the realm of “I'm down for whatever, but I probably won't go get it on my own,” the “curse” Hircine had given them has allowed Sunset to explore her romantic feelings for Pinkie in a way that isn't too terribly different from how it would've been if Pinkie had been built like herself. And while Sunset hadn't initially imagined being in a polyamorous fuck circle of five total girls (counting herself), she has to admit that it's been far from terrible.

Pinkie feels good. There's no other way to explain it. So often, so often, she chases the good feels as fast as she can, trying to outrun the doubts that always linger just beyond the bright circle of her shining, smiling self, those doubts that threaten to shatter her happiness and go so much further. They've caught her a few times, and each time, she feels her cheer turn to a vicious, furious anger, burning in its self-righteous bitterness. She can't always say that those doubts are wrong; in fact, she's had to admit, more than a few times, that those doubts have some truth to them. As much as she'd like not to admit it, sometimes people really don't want her around.

But it's not because they hate her or because either side's necessarily in the wrong. Sometimes, people just like alone time.

So her happiness has always been tempered with the knowledge that there are times when her overbearing joy just plain isn't welcome. But that's not the case this time. This time, there was no limit to the want on the other end; Aria wanted her, all of her, forever and ever, as deep and hard as she possibly could have her. There was no limit, no “too-much,” and after their day all-together, Pinkie has achieved a happiness she never knew she could ever find; that feeling that she might just not have enough to fully satisfy the other person, that she could give and give and never give enough, was somehow freeing to Pinkie.

She knows now that there's at least one situation in which she could never be herself hard enough, and that's comforting.

Sonata feels great. She just got to spend a whole day fucking Aria. What could be better?

What Aria feels is indescribable. It's like she's gone through a whole movie, starred in it from start to finish, the entire thing filled with pain and angst and fury, never getting what she wants, always losing, always coming up short; even their successes were tinged with the knowledge that they stood against all others, allied only to themselves, and the knowledge that their success could never be anything but short-lived. But then the plot turns, and everything that had eluded her finally finds her and she doubts it, questions it, can't believe it's real, but she finds at last that it is, and so the movie ends.

She feels that way now, though she knows this isn't the end. She feels like she's walking through an eternal happy ending, the credits playing, her joy guaranteed. She has everything she's ever wanted, and she'll never need anything else.

She knows, too, that this isn't true, but right now that doesn't matter. She's never felt so fulfilled, so perfected. Nothing can compare.

They get back to their mansion and bathe. Sunset bathes with Pinkie and Sonata bathes with Aria, and Adagio bathes alone, comfortable in her solitude and deep in reflection.

When they all join each other again, they're in the living room. They sit on couches and loveseats set up around their massive room, and Adagio calls the various repair services they'll need to fix up their shot-to-shit, window-exploded home.

The call done, Adagio glances over at Aria. Aria smirks and stands, walking to the kitchen and pulling out of the fridge a cheese wheel.

A cheese wheel....of porn.

She jabs one end of an HDMI cable into it and plugs the other end into their second of (indeterminate number) of 150” T.V.s and sits, and they all settle in for some interdimensional porn.

On the screen, two … young-looking girls sit side by side in a bedroom. The room is stone, though the window is stained-glass and the sun shines down on the plush furnishings of what is clearly a room for a young woman, with an air of pamperedness apparent in the silken sheets of the canopy bed and the broad, extra-fluffy down-feather pillows.

While both girls have green hair, one's styled into (I'mma just flat-out say it even though I don't wanna) twindrills that lay down the front of her shoulders, while the other's floor-length, wild hair is set in twintails that flow down her back, spraying out like crashing waves of seafoam on the bed they both sit on.

Also, this is third-omni (allegedly) so I'mma just say their names.

Flayn turns to Sothis, her hand tensing on her thigh, wanting so badly to move it the mere few inches to the side where Sothis's hand sits calmly on the bed. “I apologize. There is not much we can do here. Oh, but it must be so boring for you, we had better-”

“It is not boring,” Sothis says, smiling sweetly. “Just being near you fills me with such a comforting feeling.”

“Oh! Well...that is certainly....um, if I might ask....what sort of feeling is it?”

Pinkie turns to the other girls. “Hey, do you think they're related?”

Aria sighs. “Just because their hair's the same color doesn't mean they're related. Pretty sure they're both like ten though.”

Sunset's lips tighten as she tries to keep her mouth shut but Adagio spots her and smirks.

“Well, Sunset? Seems you might be familiar with these two. Anything you care to share?”

Sunset sighs. “Fine, fine, I've played it too. They're from a video game actually. They're...technically related? I mean I think there's some distance, like generationally. But also they're both like...super old.”

“Oooo, granny porn!” Pinkie exlaims, excitedly, as the wild-haired Sothis answers Flayn.

“I am uncertain,” Sothis says, running a hand through her hair. “It is somehow both familiar and new. What is familiar is warm and comforting. What is new...is exciting. Though confusing.”

“Confusing?” Flayn puts her hands in the middle of her lap and wrings them together, her shoulders hunching. “I am sorry if I have caused you trouble.”

Sothis giggles, a bright, free sound that sends a flutter through Flayn's chest. “I do not mind being troubled by you,” she says softly, moving a hand to Flayn's lap and taking one hand in hers. “These troubling feelings...I believe I have an inkling as to what they lead to, but I am uncertain. Would you care to find the answers with me?”

Flayn lets out a shuddering breath. Despite her appearance, she's not new to this world. But there are certain elements that she's uncertain about. Things that lie hidden behind closed doors, whispered amongst the young and old alike.

Things that throb and writhe; frightening things, alluring things. A mystery feared; a fear, desired.

Flayn can't quite meet Sothis's eyes, but she squeezes her hand and nods, closing her eyes.

But Sothis doesn't move at first, instead sitting beside Flayn, holding only her hand. Flayn looks up and meets Sothis's eyes at last and Sothis smiles warmly.

“If you are uncertain, Flayn, I have no issue with waiting. Time is often on our side, it would seem.” She runs a hand through Flayn's hair gently, careful not to let her fingers tangle in the swirling strands that flow like gentle threads of silk, tickling the webs of skin between each finger as they caress across their lengths.

Flayn's lips twitch and her eyes drift down the front of Sothis's elaborate outfit, resting for a moment on the sun-touched skin of her chest, sitting beneath the chain-like golden accoutrement hanging down straight across Sothis's chest. She thinks for a moment of taking that chain in her hands, and how it would feel to have her knuckles run across that smooth, warm skin as she would pull Sothis closer for a kiss.

Flayn turns away but squeezes Sothis's hand tighter, her breath feeling shallow and faint. “I...do not wish to wait, if it is agreeable with you. But I do not believe I know how to start.”

Sothis hums. “I am not sure that I have any more experience than you in the matter. Or if I do, I have forgotten it. So I suppose we will be learning together.” She runs her hand up through Flayn's hair but as she reaches the top of Flayn's head her eyes widen in surprise. “Speaking of learning...your hair. It does not have anything that causes its shape.”

Flayn cocks her head. “No, it simply is as it is. I do sort of braid it, in a way, though it is certainly a loose braid compared to some.” The thought of the Black Eagles student, Petra, crosses her mind for a moment, but the image of her braid is wiped straight out by Sothis's hand flowing back through her hair and landing at the nape of her neck. Flayn watches as Sothis scoots closer and gazes intently into Flayn's eyes.

“Your hair is quite lovely,” Sothis whispers, bringing Flayn closer with the hand on her neck. Flayn lets herself be moved, and closes her eyes an instant before the kiss starts; the sight of Sothis's green eyes fills her mind as the feeling of Sothis's lips pressing against hers shortens her breath. She cocks her head a bit more and Sothis gets closer, her lips now parting Flayn's with firm confidence. Her tongue comes in like a curious sparrow, quick and flitting, fascinating in its unpredictable flight-and-return. Flayn tries to catch it with her tongue but Sothis is too fast with her teasing, and so Flayn pushes her lips harder against Sothis's, working Sothis's lips like dough, her hand finding purchase on the bed for a moment before straying further and poking at Sothis's thigh.

Sothis, startled, lets out a little squeak into Flayn's lips and Flayn's eyes go wide in embarrassment as she pulls away.

“I apologize, I...oh and it was going so well, too...”

“It is still going well,” Sothis says, her voice low like a cat's purr, and Flayn looks at her in surprise.

“I...if my ineptitude is troubling, I would much prefer your honesty. I can take criticism just as well as any other. Better, even.” She pouts but Sothis giggles in response.

“I am certain of that. There are,” Sothis pauses, one hand on the bed beside Flayn and the other now coming up to Flayn's cheek, stroking it as she goes on, “many things I am sure you can take. Many things I would have you take, for my...pleasure.”

“O-oh my,” Flayn stands and takes a few steps away from the bed. Behind her, she hears Sothis standing too.

“I am sorry,” Sothis says. “I...I did not mean to make you uncomfortable. Perhaps this is what it means to 'come on too strong.'”

“I am not troubled by the strength of your coming,” Flayn says, eliciting a series of stifled cackles from the fox-girls watching via the cheese wheel, “I simply...my heart felt as if it was trying to escape me.”

Sothis comes closer, her bare feet padding across the stone. Each step carries with it the barely-audible tinkling of her elaborate headdress's subtle movements. Flayn turns to face her and Sothis stops, just barely within reach.

Flayn looks into Sothis's eyes and sees an unfamiliar tinge of uncertainty; the tiniest tremor of fear. Guilt tightens Flayn's shoulders and her lips tremble, but Sothis steps closer and lays a hand on Flayn's chest, just above her hammering heart.

Sothis's eyes still carry that faint fear, but her voice is strong, albeit a whisper, as she speaks with sureness, “I will not let your heart escape. Neither you, nor me.”

“W-what will you do, if it tries to flee?” Flayn whispers back, her voice soft more from lack of breath than any wish to be unheard.

Sothis brings her other hand up, stepping closer, and moves it around Flayn's body, first like a spirit, barely there at all, then touching more clearly as it passes beneath Flayn's arm on its way to points beyond. As it comes to rest on the small of Flayn's back, Flayn notices the tiny beads of sweat forming around the golden star-like decoration on Sothis's forehead; part of her headdress. Sothis's arms are shaking ever so slightly, and Flayn notes that her partner's eyes are wide but tense and her lips pressed firmly against each other.

Sothis moves the hand on Flayn's chest, making it less a flat palm and more akin to a handshake, but what she places in the crook between her fingers and thumb is very much not Flayn's hand. Flayn's eyes flutter and close as she feels her breath quicken and her body tense and release as Sothis first squeezes the tiniest bit before gently tapping with her fingers.

“If your heart tries to escape,” Sothis says, her voice uneven. She gulps and continues, “Then I shall catch it thusly.”

Flayn smiles, her eyes still closed, her hands clenched at her sides. “S-such a promised capture would certainly lead a heart to desire escape, would it not?”

Sothis squeezes Flayn's small breast again then swirls her thumb wide, hoping to (and succeeding in) running it across Flayn's nipple, through her robes. Flayn squeaks and tenses, then lets out a shuddering sigh, and Sothis brings her lips to Flayn's neck and speaks into it, her breath warm and wet on Flayn's skin. “Such a heart, to escape and long for capture.”

“If there is nothing to want for here,” Flayn says, putting one hand over Sothis's hand on her chest. “Then escape would surely not be necessary.”

Sothis smiles and moves Flayn closer with the hand on her back, moving her lips up to Flayn's ear; long and pointed, though not as much as Sothis's own. Sothis takes Flayn's earlobe in her lips and moves Flayn back against the nearby wall until she's pinning her own hand to the stone with Flayn's body. Flayn gasps and wraps both of her hands around Sothis and Sothis moves her hand from Flayn's breast to her waist, gently biting Flayn's ear before bringing her lips around to within a hair's breadth of Flayn's own.

“Then,” Sothis says, her breath on Flayn's lips drawing another gasp. “I suppose I shall have to make you want for nothing.”

Aria glances over at the other fox-girls, who sit enraptured on the couches. “Are we sure this is the same author?”

Pinkie snorts some pixie stick off Sunset's collarbone and starts coughing immediately, bowling over like the dumbass she is, so Adagio answers for her. “She hits her stride randomly. Her whims shift like Sonata's attention span.”

“Guhhhh shutup, I'm busy,” Sonata growls, very obviously masturbating to Sothis x Flayn.

Flayn starts the kiss this time, almost surging forwards to catch Sothis before the latter can tease her lips with their closeness any longer. Sothis's eyes go wide for a moment but she chuckles into Flayn's kiss, and she watches as Flayn's lids flutter, as if in the throes of a dream.

Flayn, her arms around Sothis's waist, moves her arms up and takes Sothis's thin, bare shoulders in her hands, squeezing them as she holds Sothis closer, loving the feel of Sothis's soft, cool skin, unwarmed by the chill of the room. She opens her eyes and catches Sothis watching her, and her lips freeze for a moment.

Sothis kisses her lips once then smiles. “I caught a sight I will treasure forever.”

“I hope I was not making a strange face,” Flayn laments with another pout, and Sothis kisses her cheek.

“Your face is not strange.” She kisses just under Flayn's eye, high on her cheek, and Flayn feels Sothis's heart beating harder as Sothis's breath comes faster. Sothis kisses Flayn's cheek again, just a bit lower as she continues, “Your face is soft. Gentle.” Another kiss. “Smooth. Your eyes...” She kisses just beside Flayn's lips and Flayn's eyes almost close as her stomach tenses, a strange but pleasant feeling coming from a bit lower. “They are like the gleaming depths of tropical waters.”

“I...” Flayn starts but stops to stifle a sound rising up from somewhere low in her body; perhaps from where that pleasant feeling hides, deep beneath. “I had thought all waters were blue, tropical or no.”

Sothis kisses Flayn's lips, moving a hand up behind Flayn's head to protect her from the stone behind it as she presses forwards. Her lips linger, their motions slow and implacable, desire tempered solely by her certainty in her longing's fulfillment. When she draws away she does so slowly, her eyes still closed, and she licks her lips once before she speaks, as if savoring the memory of Flayn's lips pressed against hers. “A sea rife with life will be the loveliest shade of green. Shimmering,” she kisses Flayn again quickly, and now Flayn is certain she feels Sothis's heart thundering harder as Sothis goes on, “how beautiful such shallow waters are, where vibrant life lies in such close clarity.”

“I...” Flayn squeezes her eyes closed as a wretched feeling spikes itself up from where doubt lies stabbed through her heart, her shameful lack so very apparent and made more clear with each overstep towards a desire believed unearned. “I do not know what to do and I am sorry.”

“You do not need to know,” Sothis says as holds Flayn close, kissing her neck once before going on, “you only need to want, and together...we shall learn, and then, shall we know.”

Flayn sniffles as tears well up in her eyes, but Sothis only holds her closer and pats the back of her head, laying firm kisses on Flayn's neck until the tears subside.

Sothis holds Flayn a while longer before moving her lips up again to Flayn's ear. “We do not need to go further if you are unsure. But if it is lack of experience that troubles you...know that I do not recall having ever been with another. Though it may certainly have happened, without my memory I am as much unlearned as you.”

Flayn shakes her head, then nods, then shrugs and laughs, wiping at her eyes once with a sleeve. “It is certainly that which troubles me, but..I am not unsure. I would...I would very much like to continue. Or rather...I would like to move on, and continue exploring what is unknown.”

“Then let us...” Sothis steps back and takes one of Flayn's hands in hers. She caresses Flayn's cheek with the other hand, running it down past her jaw and along her neck, trailing down the front of Flayn's robe and drifting ever lower until it stops just below Flayn's navel. Sothis gulps and she continues, her breath finding a way to speed up even more. “Let us explore...the unknown.”

The fox-girls stare at the author because the author just barely broke 5k, but the night's still young-ish so she's gonna press on.

Sothis leads Flayn slowly to the bed. Flayn's slow, cautious steps are not trepidation though, but fear of showing her eagerness by rushing. Were she to trip in her excitement, she feels she may never recover from the mortifying shame.

Yet as they arrive at the bed and Sothis moves behind Flayn, turning Flayn to face her, with the bed at Flayn's back, Flayn can't help but gulp. At the very least, it heartens her to see that Sothis's shoulders tremble as they rise and lower in a stuttering yet quick pace, her breath light and growing ragged. “Perhaps you wish to wait a moment?” Flayn suggests, trying her hand at a coy smile.

Sothis's brow raises and her mouth opens in surprise, and her cheeks flush red. “I...if I am to wait a moment, it shall certainly be for your sake, not mine own.”

“Oh?” Flayn giggles, enjoying the turnaround. “Well, then I suppose you will not mind...” Flayn turns around, facing the bed, and folds her hands in front of her. “It would appear that there are laces securing my robes, as well as a rather sizable bow. I would very much appreciate...your assistance.”

Flayn closes her eyes and imagines Sothis's look of shock and want, and hears a soft gulp from behind her. Then the feeling of hands on her shoulders, squeezing once before drifting off. She feels gentle tugs as the laces of her robes are loosened, and at once can no longer bear the burden of coyness. Her breath hitches as her excitement mounts and she wishes, fervently, that her heart could stop thundering in her burning ears. The gentle tugs stop and she feels her robes slipping just a bit off her shoulders, and feels the first tinge of unease as she realizes the enormity of what is happening.

As if sensing this, Sothis moves forwards and takes Flayn by the shoulders again, giving a quick, reassuring squeeze. “We can stop anytime you would like. Just say the word.”

Flayn lets out a shuddering breath and grits her teeth. “If I say the word stop at a time like this, be certain that it shall be preceded by 'please do not.'”

Now it's Sothis who lets out a ragged breath as desire squeezes her tight, and she gives another twitching squeeze of Flayn's shoulders before proceding.

Pinkie Pie flails around. “Dawww darnit it's almost midnight!”

“Well,” Adagio starts, “the author can just save her wordcount and update NaNo then continue in a new document. After all, it's not like she didn't get up at 1 P.M. today like a scrub.”

The rest of the fox girls nod and stare at the author, who goes off to update her NaNo profile before opening a new document and continuing with this sick groove she's got going. Sick as in good.

I am old.


“Really is turning into Mystery Science Theater of Porn, huh?” Sunset says, smiling, as Pinkie comes back with some popcorn.

If you're thinking about spatial/temporal inconsistencies right now regarding where we just left off let me remind you that currently we're watching a scene in which five fox-girls (not even going into the whole everything behind them) are watching interdimensional porn on a 150” T.V. paid for with Skyrim treasure and which is hooked up to a cheese wheel with an HDMI jammed into it.

Okay moving on.

Flayn feels more tugs now, but not at her laces. Instead she feels her hips being tugged left then right as Sothis works on the bow secured behind her, and Flayn giggles picturing it.

“Are you mocking me?” Sothis asks, pausing for a moment.

“Oh,” Flayn says loftily, “I would never dream of it. I know what a potent foe that bow can be.”

Sothis huffs, then starts back on tugging at the bow gently. “If I did not know better, I would say this particular article of fashion had been designed solely to exasperate me specifically.” Sothis tugs again and Flayn feels her waist moved with each tug, and she must admit that the feeling of having her body moved so easily at such unexpected intervals is a rather exciting thing.

Behind her, Sothis suddenly laughs, then gives one long tug, so long that Flayn, at first letting herself be moved, must adjust herself to stop from toppling over. She overcorrects but Sothis catches her waist with a hand as her other hand finishes with the bow, undoing it all with the cunning pull of the proper piece.

Flayn giggles, her face flushed as she rights herself with Sothis's help. “It would seem you have learned the secret to unwrapping me.”

Adagio glances at the others. “Pause it. Let's bring out the big screen for this one.”

Sonata giggles and bounces off, and after a few seconds every other fox girl chases after her because no way in hell are they letting Sonata handle this one. They end up just hanging out in the other living room where the bigger T.V. is, naturally hooking the cheese wheel up to it with an HDMI.

And by bigger T.V. I mean the Titan Zeus 370 inch T.V.

Sothis, now in 4k on a T.V. that costs more than the author will make in her lifetime, clears her throat and speaks shakily. “I....yes, well, it is necessary information, certainly. I will be sure to remember the secret for the future.”

“The...?” Flayn glances back and meets Sothis's eyes, and she feels something then. Her breath seems to leave her and her chest feels filled with a something new; something wonderful. Like the break of dawn over a shimmering sea, it sparkles within her.

Sothis's mouth works for a moment, soundless, before she blinks and furrows her brow. “Did...did I say something strange? I would not think that the prospect of additional...unions....would be quite so surprising.”

“...unions?” Flayn's cheeks burn hot and she looks at the ground, holding a hand up to her chest over her mad-hamering heart. “I...and in the future, as well as...as now.” She glances up and sees Sothis pouting, but speaks before Sothis can. “It would please me if...if future unions would occur.”

Sothis presses her lips together and looks away, crossing her arms with Flayn's bow still held tight in one hand. “Well certainly they shall. I do not know why such would be in question.”

Flayn takes hold of a bedpost to steady herself and Sothis glances back at her in worry, but Flayn's shy smile and soft voice quiet her. “I did not know my breath could be stolen away with a promise.”

Sothis stares at her for a moment then laughs, holding the bow up to cover her mouth. She keeps holding it there when her laughter leaves, and her eyes smile over it as she says, “Yes, well...I do hope to steal your breath many more times before I am done. Your breath and other things besides.”

Flayn cocks her head but Sothis only gives her a smile in return, so Flayn puts her hands on her hips. This small motion though is enough to make the shoulders of her robe slide down, stopping halfway down her shoulders.

“Oh dear,” Sothis says with a smirk. She reaches behind Flayn with the bow in one hand and takes hold of a bit of it with her other and pulls Flayn close with it. “It looks like you need a little more help being unwrapped,” Sothis goes on in a whisper, her eyes roving down to where Flayn's robe sits stuck high on her slight chest.

Flayn starts to speak, perhaps to tease, but all that comes out is a little moan and she squeezes her eyes shut in embarrassment.

“Well now, such sounds you make when pressed,” Sothis says with a chuckle weaving through her voice.

Flayn feels Sothis's hands on her shoulders again, her fingers tense as they slowly slide down her arms, pushing Flayn's robes further down, though it stays halted by her chest, the downward pressure increasing in a low, unstoppable pace as the robe is pulled ever downwards. Finally it is only Flayn's nipples that stay its progress, and Flayn feels Sothis's breath on her chest as she moves her face closer. Risking a glance, Flayn opens her eyes and looks down to see Sothis smiling up at her.

“Hello again,” Sothis says softly. She kisses Flayn's chest, just above a breast, but leaves her tongue behind, pressing against Flayn's skin as she draws her lips back. Her tongue presses in hard then moves down, pushing the neckline of the robe over a nipple, and while the tension from the tugged-down robe releases it's followed soon by the feel of Sothis's tongue slipping over Flayn's nipple.

Flayn gasps and Sothis giggles, then cups Flayn's nipple with her tongue for a moment before kissing her small breast with firm lips. Flayn moans again, her head becoming fuzzy and floaty like the seeds of a dandelion, though that feeling from below comes again stronger, making her body pulse and seize. Her mind drifts first to the thought of a serpent, in the throes of death, uneven writhing twitches shooting through its body, and she wonders why such a sight would enter her mind in such a place, at such a time.

Sothis stops, her eyes narrowing and her voice suspicious. “Your words aside, you do not seem terribly fond of what is transpiring.”

“Please do not put my words aside,” Flayn says through labored breaths. “I do not know what faces I make. This...this is very new to me. My body moves when I do not mean it to, and my mind fills with strange images. When...when you touch me,” she goes on in a whisper, taking one of Sothis's hands and moving it to where the robe still hangs, kept up by her other breast, “it feels as if I am possessed. But it is strange.” She moves Sothis's hand down her chest, pushing the robe past it. Her robe falls to the ground, pooling around her feet, and she stands clothed only in the white collar around her neck, the black stockings on her legs, and her undergarments, as white as her collar.

“Wh-what is strange?” Sothis says softly, her gaze running from the top of Flayn's stocking upwards, lingering low for a moment.

“It is almost as if I long to be possessed, if it is by your touch.”

Sothis stares, stunned, her mouth open and her eyes wide, so Flayn takes advantage of her momentary inaction to leave one of Sothis's hands upon her breast. Flayn's own hands venture down and loop their thumbs through her panties, on the thinnest parts, aside her thighs.

Sothis's eyes, drawn down by the moment, linger for another long, savoring moment before flickering up to Flayn's, a smug smile on her lips. “If by my touch I could possess you, then you should work to become accustomed to it.” Her thumbs join Flayn's and slide further back, her fingers caressing the side of Flayn's thigh and ending on the slight swells behind.

Flayn stifles a moan, but into a whimper, and she presses forwards to hide her face in Sothis's hair. Flayn moves her hands up under Sothis's arms, leaving her panties for Sothis to toy with, and holds their bodies close; Flayn's, near-nude, and Sothis, still clad in her regalia.

Sothis moves Flayn closer with her hands behind Flayns, her fingers splayed over the gentle curves beneath the back of Flayn's panties, and whispers into her ear, “I do not know for how much longer I can refrain from throwing you onto this bed like a beast.”

“Then do so,” Flayn says through sharp breaths on Sothis's shoulder, “to never know that limit.”

Sothis tenses, then moves her hands, taking Flayn by the waist and stepping back. “I shall take you. At your word, and how I wish.”

“Such promises,” Flayn says, but her giggle is cut short as Sothis pushes her back upon the bed, the back of her knees hitting the soft mattress and bending her backwards over it.

“Perhaps promises are better left unsaid,” Sothis says softly, her eyes drawn to Flayn's as she removes her headdress and sets it upon the ground. She takes Flayn's robe off her ankles where it hangs on desperately and lifts Flayn's knees with her hands under them.

Hoping she's following the cues right, Flayn starts scooching back on the bed, and Sothis holds her legs until Flayn's far up enough for her feet to be upon the mattress with her legs stretched long. Flayn reaches down and starts preparing to remove her undergarments when Sothis stops her.

“Nuh-uh-uh,” Sothis says, waggling a finger. “I shall be the one to unwrap you. But first, for the sake of fairness...” Sothis pulls at something in her hair and her twintails come undone, unleashing a sea of green behind her, glowing like an aura in the sun through the stained glass.

Flayn watches, propped up on her elbows, her eyes wide and her breath speeding. Sothis tugs at the ribbons on her arms and the bows there loosen, then, her eyes on Flayn's, she loosens something at the back of her neck. The golden chain of cloth across her chest sags and she widens the neck of her regalia, now free from the bonding decorations, and lets its slip down her arms. In a flash its at her elbows, leaving her chest exposed.

Sothis's eyes narrow and her smile shortens though, and she holds her hands across her chest. “I know that I am not...as other women oft are. My body is...” Her lips twist down in a sneer but Flayn's voice comes, a soft, gentle sound.

“I do not mean offense, but...your attire does not tell lies about what lies underneath. You have felt my heartbeat. You have heart my breath. I hope you know the desire you spark in me. Know that such was only from the thoughts of what your clothing might hide. Now faced with the truth...” Flayn's breath fails her and she lets out a shuddering breath, and Sothis stares at her in disbelief. Flayn goes on, clenching at the sheets with her hands. “Now faced with the truth...I too know what it feels to be unable to promise restraint.”

Sothis stares a moment longer before her eyes brighten above a smirk. She lets her regalia fall the rest of the way down her body, revealing black panties. “If you cannot promise restraint, then perhaps a promise to show none would be possible...”

Flayn's mouth works but no sound comes, and she can only nod in response. She scooches further and lays upon the puffy pillows behind her, then, with a knee raised, motions Sothis closer with a finger.

Sothis smiles and mounts the bed, crawling towars Flayn on all fours like a lynx, her hair like a blanket upon her back as she comes ever closer. When she reaches Flayn's feet Flayn pulls her other knee up towards her, blocking the sight of Sothis's approach.

Sothis rises into a kneel as her face crests over Flayn's knees like a sunrise, and her hands are soon to follow. “It would seem these are in the way,” she says, tapping Flayn's knees with her fingers.

“Oh. If you would be so kind,” Flayn says back, her hands like claws, gripping the sheets beside her waist.

“Certainly,” Sothis says with a grin, spreading Flayn's legs wide. She looks down with a sigh at Flayn's panties and lays her palm atop them, barely lighting on them with more than a feather's worth of weight.

Yet that's more than enough, and Flayn's stomach tenses as a moan escapes her lips. She twists her face away, shame tinging her cheeks, but Sothis only coos to her as her hands loop again through Flayn's panties.

“I do hope you are not embarrassed by these sounds you make. They are, after all, what I long to draw from your lips.” Sothis giggles and moves herself to one side, and together, though Flayn's eyes are squeezed shut and her hands by her side on the bed, they take Flayn's panties off.

Flayn opens her eyes just in time to see her panties go flying into one corner of the room, and she has the silly thought of hoping that they're easy to find when she goes looking for them later. She delays in turning back towards Sothis, feeling the cold air of the room touch a part of her unused to being so brazenly displayed. Yet she thinks she feels too Sothis's gaze upon her, and she cannot bear to think that perhaps any hint of disappointment might lay upon her face. But Flayn's delay in looking away from the corner where her panties absconded to only leads to her seeing Sothis's panties join her own, flying through the air and landing in a tiny heap upon them.

Now she for certain cannot turn, because if she does she will see a secret laid bare, its truth revealed after so long wondering and imagining, and she is uncertain what sorts of shameful sounds or faces she may make were she to gaze upon it. But she knows she cannot delay forever, and as if in confirmation, she feels Sothis's weight beside her spread-open legs shift and a hand light upon the knee closest to her.

Sothis moves herself again to kneel between Flayn's legs, but still Flayn cannot open her eyes. It isn't until Flayn feels Sothis's hands start to caress down from her knees down her thighs that her eyes flutter open.

What Flayn sees makes her breath catch in her throat, and she grows dizzy as she stares, her breath locked in her lungs.

Sothis, gazing down between Flayn's legs, licks her lips then looks up and catches Flayn's gaze at last. She neither smiles nor pouts, but only stares, blank faced and still, until she says in a wavering voice. “If...if you do not wish for this body to-”

Flayn can't bear to let her finish, so she wraps her ankles behind Sothis's back and pulls her closer suddenly, toppling her thin frame onto Flayn's body. Flayn feels Sothis crash all along her, first low, a maddening collision that presses into lips new to the sight of daylight, then higher, as Sothis's taut, smooth body rolls itself along Flayn's, like the tide caressing over the sand. Sothis's young, flat chest squishes down onto Flayn's own small swells, and Sothis makes a little squeak, her body tightening up as her hands land just below Flayn's armpits, on the bed.

“Y-you!” Sothis says, incensed. She tries to raise herself up but Flayn takes Sothis's face in her hands, her thumbs caressing Sothis's cheeks.

“Forgive me, but I cannot bear to hear you speak ill of this body of yours. Not when I have these feelings for it...”

“My body is as a child's,” Sothis says through gritted teeth. She tries to turn away but Flayn forces Sothis to face her.

“I know that feeling well. Mine, as well, is enough like a child's.”

Sothis opens her mouth, perhaps to argue, to claim that Flayn's slight subtle curves are more like a woman's than Sothis's lithe frame could ever be, but Flayn shushes her with her thumb over Sothis's lips and goes on.

“They treat me like a child, and think that I cannot understand difficult things. But I can understand. Understand...and feel.” She wraps her ankles around Sothis's and becomes keenly aware of the wetness that stains Sothis's stomach, low-down as she is, and just as aware of how that wetness spreads across her as Sothis adjusts, trying to bring her own body's gifts to bear. Flayn's eyes flutter and she lets out a soft sigh, her hips pulsing, beckoning Sothis as Flayn continues, “You are so strong, but your body looks so fragile. Ephemeral, delicate, like the ocean foam on a wild wave. Please do not doubt it when I say I long so dearly for that wave to crash upon me.”

“Are you saying you want to b-break me?” Sothis says, stuttering as her sex presses against Flayn's, their warmth mixing in the blooming heat that spreads, like waves, in the wetness they share.

“If you break,” Flayn teases, rolling her hips and pulling a gasp out of Sothis. “Then I hope it is upon me, that I too may break.”

Sothis pulses against Flayn and brings her lips down in a forceful kiss, her hands slipping up beneath Flayn and clawing at her shoulderblades with her nails. She spreads Flayn's legs wider with her knee, her body twisting to grind their wetness together closer, harder, and in mere moments she's pulling her lips out of the kiss and gasping for breath. Her chest presses down on Flayn's, so light and smooth, and Flayn runs her hands all across Sothis's back, marveling at the feel of her skin on her fingertips and the soft fluffiness of Sothis's vast hair all around her.

“Please,” Flayn pleads, “please, I do not know how, but I...I wish to touch every part of you.”

Sothis runs one hand down, past Flayn's navel and much lower. It seems to vanish for a split-second before making its presence known again in sudden, shocking brazenness as a knuckle rubs around a precious spot.

Flayn squeaks, her hands tensing on Sothis's back, her nails digging in the slightest bit. Flayn opens her eyes and sees Sothis smirking at her, her eyes half-lidded.

“Flayn,” Sothis starts. “Touch every part of me, if you would like. But know that I shall touch every part of you as well.”

Flayn gulps, smiling as she tries to catch her breath. “Do not make promises you cannot keep.”

Sothis smiles and lowers her face to Flayn's neck, her hair surrounding them like a canopy of leaves over a small inlet of seafoam green waters. She kisses beside Flayn's throat and Flayn closes her eyes, her breath hitching as Sothis's knuckle drifts lower and unfurls, slipping into her tightness as if it always belonged, filling a lack she never knew she had. She moans, and for the first time, she feels no shame for it.

“...no that did not just fade to black,” Adagio snarls. “Damnit!”

“F-fuck,” Aria, atop Sonata's lap, gives her own moan as Sonata finishes her, her fingers swirling around and across Aria's pussy as Aria's hips work.

“Yeah, I dunno what you're complaining about,” Sunset says, riding the downward ebb of the orgasm she managed a short bit ago. “You're probably just mad there wasn't any butt stuff.”

Adagio glares over, but she knows Sunset's right. “Wait, no she's not!” Adagio lies, like a lying liar. “Fine...fine, I suppose it would've been fun if they'd tried getting a little dirtier.”

“I liked the part where they had sex!” Pinkie says, eating another spoonful of icecream like the utter pervert she is. Lord Almighty Pinkie, I can't believe you're watching porno and eating icecream. Can't you just masturbate like a normal pony? Person? A normal person? I'm normal.

Shutup everypony, I'm normal, damnit.

“That does make me wonder though,” Adagio says, walking over to the cheese wheel. “Butt stuff,” she says, prodding it.

A new scene starts.

“Oh shit,” Sunset says, seeing (komibreakdown emoji, gotta think of something fast) um Hida Shouko bent over a table....table? Counter. Plot device? Table. Shouko's bent over a table, her hands cuffed, both to each other and to a leg of the table.

Behind her is Matsuzaka Satou.

This can only end well.

“I told you,” Shouko pleads, “I won't tell the police. Please...you're my friend. Please don't...”

“Why would you think I'd believe you?” Satou holds a knife in one hand, toying with the blade with her other as she gazes down at Shouko with empty eyes. “You, who couldn't even stay by my side back when all you thought you knew was the state of my aunt.” She stands right behind Shouko now and Shouko can feel Satou's skirt's bottom edge gently tickling the back of her thighs. “When you thought the worst thing about me was that my aunt laid herself down on that cum-covered ground and let whoever do whatever, all while I lived there. I couldn't trust you then. You couldn't accept me then.” She lowers the knife and Shouko's heart beats hard, but then Satou raises Shouko's skirt with it, and for a moment, Shouko's heart seems to stop, but Satou's voice goes on and so too does Shouko's heart's hammering. “So why would you think I'd believe you now? ”

“S-Satou,” Shouko's voice cracks as she feels Satou flip her skirt up fully, laying it flat upon her back with the flat of her blade. “I-I know I was wrong, to abandon you then. But I won't run away anymore. I won't abandon you. But please...please I need you to talk to me. Please...please help me understand.”

“Understand? Shouko-chan,” Satou says, sighing as she lays her free hand against Shouko's panties, her fingers expertly pressing into Shouko's slit, even from here. “What's there to understand? It's just love, isn't it?”

“S-Satou what...what are you doing?” Shouko tries to twist away but Satou stabs the knife down hard in the wood of the table and Shouko freezes, though she tries to go on, “I-I-I d-don't understand, what...what's this?”

“All that time, playing with boys,” Satou says as she takes the crotch of Shouko's panties between two fingers, pulling it back and exposing Shouko's pussy to the air. “I never found love there, Shouko-chan. We tried together, didn't we? To find our 'Ones.' But I finally found my one, and now...you're here, putting my love at risk.”

“I told you,” Shouko says, her voice gaining strength as her fear shifts the slightest bit into anger. “I won't tell the police. I won't tell anyone. Just please, let me up, and let me be here for you!”

“You're here for you, ” Satou says, her voice that same, soft-bitter venom as it always is, from the days she greeted Shouko warmly as her friend to now, as she takes hold of the band of Shouko's panties and drags it down over the swell of Shouko's ass, exposing her everything. “You're here because you couldn't just let us live in peace, or maybe you were just curious. Either way...I won't let you threaten us.”

Shouko's lips tremble but she dares not writhe, not with the knife still within Satou's reach. She tries to speak but can't manage, and Satou sighs.

“Shouko-chan, Shouko-chan....don't you know? If you don't say anything, it makes it sound like I'm right. Well...” Satou yanks the knife out of the table and steps away, and Shouko can feel her heart slowing and her breath shaking less until Satou returns. She dangles something in front of Shouko, and for a time, all Shouko feels is mute shock.

Shouko's eyes widen and she whimpers, and behind her Satou hums.

“Shouko-chan...surely you didn't merely tease the boys. I'm sure you've felt the real thing more than once before.”

“Satou...Satou please, I don't....I don't want this, please, just...just tell me what you want and I'll do it.” Shouko's eyes twitch and her breath goes shallow again as Satou sighs and leans back, the strap-on in hand.

“What I want? But I'm already going to get what I want. Is there something you can offer that I can't simply take?”

“Satou...please.” Shouko begs but Satou doesn't listen, and Shouko realizes something then.

Satou isn't listening...and she never will again. Not after being abandoned. Not after feeling betrayed. Even though she's in the wrong, Satou is clinging to the simple, undeniable fact that Shouko couldn't stand by her, even faced with the lesser of her great secrets.

So Shouko grits her teeth, and prepares to bear it.

“Oh Shouko-chan...did you give up?” Satou lets out a sad little sigh and Shouko hears the sound of something squirting, tensing her shoulders and making Satou giggle. “Oh, don't worry. I'm going to be as gentle as can be. All things considered...”

Shouko feels it then, what Satou has planned, and a feeling like a chunk of ice plummets from her chest to her stomach where it churns and rises in waves of nausea. Shouko feels Satou's plan, because Satou's plan is heralded with a finger, lubed and gentle, pressing itself against the clench-closed tightness of Shouko's anus.

“S...Satou...?”

“Mmm?”

“In...there...?

“Mhm,” Satou says with a happy little giggle as she presses her finger inside, and Shouko yelps, the sound of herself, sounding for all the world like a frightened puppy, sending a furious blush through her cheeks as she feels Satou's thin finger slide deeper, slowly, cautiously, almost lovingly.

“D-?” Shouko starts to ask a question but Satou's finger curls painfully and Shouko stifles a scream.

Satou clicks her tongue then sighs, relaxing her finger. “Shouko-chan...how do you expect me to trust you with my secret, if I can't even trust you to be quiet and take it like a good girl?”

Shouko looks back over her shoulders, pleading with her eyes, and Satou gives a little nod, so Shouko dares a question. “Satou...if I...if I take it...?”

“We'll see. Though, to clarify...I don't mind if you make little sounds.” Satou hums again and presses the tip of a second finger against Shouko's anus. “It's just all that begging that bothers me so.”

Shouko gulps, turning back and clenching her eyes tight as she feels Satou's second finger slip inside. She can feel her pussy getting wet and hates herself for it, but another part of her feels a rushing joy, and it's that part of her she wonders most at.

Sure, one can feel arousal from assault. No, it does not mean it was wanted.

But that joy is something else, something different from the blind pleasure Satou's experience is goading her body into. It's excitement, but something besides.

Something suspiciously close to comfort, like the feeling of going home. Though not a home Shouko's ever known before.

Her mind drifting deeper and deeper into wonder at that comforting feeling, she lets out a little moan, and Satou giggles again.

“Oh my, Shouko-chan. I had no idea you enjoyed this sort of thing.” Satou slides her fingers in and out, splitting them wide bit by bit. When they start to rub raw against the inside, she re-lubes and works again, caressing Shouko's body from within.

Shouko sees the knife, sitting beside her on the table. She knows she can't escape the cuffs, and the strap-on waits, prepped, on Shouko's other side.

She thinks a bit on her life; rich, pampered, but empty and alone. There has only ever been one person she could truly call a friend; one person with whom she's hunted for the one to sweep her off her feet.

But that comforting feeling fills her again as Satou's fingers do, and Shouko wonders if maybe her hunt has been misguided.

“I don't think it's...this that's doing it,” Shouko murmurs. “I think it's because it's you.”

Satou stops dead. “...what?”

Shouko looks back, smiling, her eyes barely open. She sees Satou shimmering in the light from the kitchen apartment, and that rushing warmth fills her. She realizes then why it feels like she's home. All that time hunting...to finally find her one, in a place like this.

Sunset glances over at Adagio, who has that same face on as when she first saw Equestrian magic in the human world. “Yeah....you would eat up a story about a girl getting her butt fingered and falling in love because of it.”

Adagio growls. “You wouldn't understand. There are clearly many important undertones to this that you're missing due to fandom-blindness. This turnaround, these emotions...they come from outside this scene.”

“But isn't it like the writer's job to convey them?” Pinkie says.

To her side, Sonata sniffles. “I...I dunno, I'm feeling the feels pretty hard. Realizing that you're in love with your best friend, even though they hurt you...”

Aria snuggles close. “Hey...I'm sorry. Also um...” she kisses Sonata's neck and licks at her cheek. “I, you know. Love you and junk.”

On the massive ungodly expensive T.V., Shouko giggles and arches her back.

“Satou...did you ever wonder what it would be like, if we were together?”

“Not once,” Satou says immediately, but Shouko only giggles again.

“Not once? But here you are, your fingers inside me. Here you are, ready to lay me at your leisure. If you think you're punishing me...then why are you being so gentle?” Shouko looks back and sighs, her smile wide and her eyes glimmering.

“I...” Satou falters, in belief, in conviction. Her eyes twitch and her lips tremble, but the fingers in Shouko don't curl in painful annoyance. She doesn't claw at her friend's insides again, and she can't tell why even the thought of it bothers her. But she already has someone she loves; someone precious, far moreso than Shouko. So she gulps and feigns a smile. “I don't know what you mean, Shouko-chan. If you happen to feel something for me, because of this...well, I don't know what that might mean, about who you are as a person.”

“Satou...don't play dumb. Don't try and turn this back on me. You're the one doing it to me. You're the one...making me love you,” Shouko says sweetly, letting out another little squeaking moan. “Satou...just please promise you won't leave it like this.”

“...what?”

“Please don't let that strap-on be for show,” Shouko says with a pout over her shoulder.

Satou grimaces and takes her fingers out, then lubes up the strap-on, not meeting Shouko's eyes. Shouko hums and turns back forwards, arching her back more, nearly rising up on her tiptoes.

If she's honest, she's never been a fan of this.

Several guys have tried, but she's always turned them down. And it isn't as if their “tries” had been wholly verbal either. But not a single one of them made her want it like this. Not a single person.

Except Satou.

Satou loosens her skirt and drops it, then her panties, though Shouko notes she doesn't need to. The type in Satou's hand doesn't require anything of the wearer, beyond strapping oneself in.

Shouko notes this, and says nothing, only smiling slightly as Satou, gritting her teeth and furrowing her brow, straps the strap-on on and puts even more lube on the business-end of the affixed dildo.

Satou places the tip against Shouko's anus and Shouko looks back at Satou's cold, empty smile.

“Shouko-chan...you know what happens next, right?”

“Mhm,” Shouko says, a syrupy chuckle weaving through her voice.

Satou's eyes twitch and she takes a tiny two-steps forwards, and Shouko feels the tip of the dildo start pressing in, already opening her up thanks to Satou's preparation. Shouko turns back forwards, her torso arching upwards, a heavenly smile pointed towards the ceiling. Her shirt rides up and she feels the cold table underneath her, but Satou's hands find Shouko's sides and grip tight, keeping her warm as Satou starts pushing deeper.

Satou's progress is slow but steady, filling Shouko with a fullness like she's never felt. She's been with men, her age and older. None have been in her like this, and she wonders what it would be like if a few had. If she had something to compare to the feeling of Satou filling her full, pressing deeper and deeper and making her fuller and fuller. Every time Shouko thinks she can't possibly take any more, Satou presses further, and Shouko can almost feel herself opening to let Satou in.

Shouko presses her face down now, keeping her back arched and sighing happily into the table. “Satou...you know...there's still a chance for us.”

“There's only one person for me,” Satou says, her voice a low growl. She pulls back and Shouko feels the briefest relief before Satou pushes in again slow, reopening Shouko wide just as her body tried desperately to close itself tight once more.

“There's no reason...” Shouko starts, stopping and moaning as Satou pulls back and thrusts in again harder. “N-no reason...there can't be two loves in your life. Im...imagine it. We could even take turns watching over Kobe Shio-chan. We'd...” She's cut off as Satou thrusts in hard and fast, the shock of it making her throat gurgle as she chokes down her words. She swallows and continues though as Satou pulls back again, her hands on Shouko's sides clenching hard, drawing blood with her nails. “We'd be like a married couple, Satou. Or I'd be okay...even just to be there by your side. By the side of you two, in love.”

“Shutup,” Satou says through a cracking voice, heavy with fury. She thrusts in again hard, once, then twice, then again and again, and Shouko laughs as her ass is pounded hard again and again, her arousal building despite Satou's utter inattention to Shouko's other areas. Shouko looks back and sees a surprise: Satou crying, her teeth pulled back in a snarl.

“S-S-Satou!” Shouko says, her own tears coming now. “W-Whatever h-happens, I'll...I'll always love y-you!”

“Shut, UP!” Satou roars, pounding ever harder, the lube running thin and the dildo slamming raw into Shouko's now-bleeding ass.

“I l-love you,” Shouko says again, giving in to the mounting climax that she feels from Satou's closeness, that brutal fullness filling and leaving and filling her again, time after time. “I love you, S-Satou...” Shouko twerks and shudders in orgasm, and Satou keeps pounding, until finally she slows, her breath a tattered wheeze and her body shaking from exertion.

Satou pulls out and detaches the strapon, hurling it across the room and standing there behind Shouko, her hands clenched into fists. She stands there for a time while Shouko catches her breath and hums, pleased.

After a time, Satou comes to the side of the table and unlocks the handcuffs.

Shouko doesn't move. She glances up at Satou, afraid that moving might make it look as if she's fleeing; as if it were all a lie, and her claims of love only meant to lure Satou into letting her out. After a few moments she brings her hands up under her chin, propping her head up and smiling at Satou. “So...what's next, Satou?”

Satou doesn't meet her eyes for a time. Finally she turns, and the face she wears is so unlike her that Shouko frowns. But deep down, Shouko suspects that perhaps this, at long last, is the true face of Matsuzaka Satou, and this thought brings a new warm smile to her lips.

When Satou finally speaks, her voice is soft, almost a whisper. “Let me tell you...about my happy sugar life.”

As the screen fades out, Sunset glances over at Adagio. Amazingly, Adagio did not touch herself at any point during the scene.

Which, considering who Adagio is (according to this 100% accurate work of fiction), is extremely odd.

Adagio doesn't move for a few moments after the scene's over, instead sitting there staring at the screen with the same wide, wonder-filled eyes she'd had when it started; the same expression as when she saw, in the distance, Twilight defeat Sunset Shimmer.

I mentioned this before but it's been like four thousand words so...

Finally Adagio stands suddenly and rushes over to Sunset Shimmer, sitting beside her and loopin her arm through hers. She leans onto Sunset and nuzzles her shoulder, then kisses her neck, then finally rests her cheek against Sunset's, humming pleasantly.

Sunset, fucking stunned, doesn't do anything to stop her but finally recovers her brain meat enough to at least talk. “Um...Adagio?”

“Shhh,” Adagio says. She kisses Sunset's cheek and Sunset sees a glimmer of a tear in the corner of her eye, but Adagio wipes it away with a little laugh. “It...I just liked that one, and...I'd like to...have you hold me, for a time.”

“Oh...um...sure.” Sunset obliges and wraps her arm around Adagio and Adagio snuggles in close, and Sunset has to admit that the feel of Adagio's puffy hair on her body isn't bad.

Isn't bad at all.

To their side, on another couch, Sonata and Aria cuddle up close, with Aria scrunching down and scooching in and Sonata wrapping both arms around her like a little bundle of warm fluffy floofs.

Pinkie Pie's eating the pizza she ordered and had air-lifted in. Like a degenerate.

“Well,” Sunset starts. “I wonder what tomorrow will bring.”

“Hopefully more cheese wheel porn!” Pinkie exlaims, either …

...exclaims.

Either dooming them to more cheese wheel porn, or...or not dooming them to that.

Really should've ended it with Sunset's line, seriously.

Or just...not started it.

Nah, who am I kidding. This train's never had brakes.


The author has come to the startling realization that over seven thousand words were from things worked on during NaNo that were not cracksmut about fox girls who are actually oh god no not doing that again even though she could use the words. You see, the author really wants a 100k longfic of completely unedited nonsense so she needs to make up ten thousand words in the next three days.

Shouldn't be too hard, she's a goddamn maniac.

“I want crabs!” Pinkie Pie shouts out the next morning while everyone else gets normal breakfast like nomral...normal “people.”

“Uh, Pinkie... I don't think prostitutes are legal here,” Sunset says, and the other girls all glance over at her.

“Uh,” Adagio starts, “Sunset Shimmer, are you implying that they're legal... elsewhere?”

“Well... I mean c'mon, you used to live in Equestria,” Sunset says nonchalantly, pouring some cereal into a bowl full of milk like a fucking monster. “Hey, it's not that weird... I just kinda forgot to put the cereal in first.”

Sunset Shimmer's lost control of her life, send thoughts and prayers and a few AK mags.

Look, target shooting is Sunset Shimmer's self-care okay? Don't judge her.

Fucking.... Sunset Shimmer.

Sunset sighs. “I feel like this is gonna be a bad day for me.”

“Sunset,” Adagio says, smirking, as she closes the fridge door. She's holding a carton of orage rjuice. You know what I mean. Okay nevermind.

It's actually a special orange juice derivative that causes an intense seething rage in the imbiber. Adagio pours it down the drain... Adagio that's my plot you're pouring.

“Sunset,” Adagio tries again, hucking the empty carton of the author's hopes and dreams into the bin. You monster frisbee. “Are you implying that there are locales in Equestria where prostitution is legal?”

“...do ponies have sex?” Sunset says, and while it's an honest question it doesn't really sound like it because yeah Sunset, in any world, ponies have sex. “Geez fine, I guess I just...was more concerned with my magical studies.”

Aria laughs. “Yeah, sure, more like more concerned with being a huge bitch and hopping into another world to uh.... I dunno, be a huge bitch?”

“Hey, yeah!” Pinkie exclaims as she remembers that the author literally just rewatched the first Equestria Girls movie like ten minutes ago. “Why did you come to the human world?”

Sunset, her eyes wide, eats a spoonful of cereal. Look at that bowl Sunset. Look at how little cereal you get when you pour the milk in first. “I... I dunno, I think it's an alright amount. Uh I mean... I'm not sure. I found it and got curious I guess? It used to belong to... uh... Star...swirl? Starswirl the Bearded? Yeah that's the one.”

Sonata snorts. “Wow you're like... soooooo a good student, huh?”

“...'such' a good student,” Adagio corrects.

“Look,” Sunset says, placing the milk down on the counter. Why she was holding the milk, I haven't the foggiest, since she has more milk than she'll ever need in that bowl. “Will you lay off the milk already?”

“Did-?” Sonata starts and Aria stops her.

“I swear to god if it's something about 'laying' I'mma slap on a chastity belt with a math problem as the code,” Aria growls.

“Holy... okay, calm down,” Sonata says, trembling in terror at the prospect of Aria's sweet vagingo being locked behind math.

Sunset flees to the livng room at a normal speed and with no intention of escaping anything and sits on a couch.

So I guess she just goes to the living room and doesn't flee.

“When I came to this world, it was so... strange. But I realized that there wasn't any magic here, and that got me thinking. First, there wasn't that huge divide between me and where I wanted to be. All of a sudden, the only things I needed to have power... I already had. I could lie, I could intimidate, I could just... take what I wanted. And I realized that I only needed like... hardly anything from Equestria to completely dominate that place. Heck I could've probably held that power through high school and beyond. I mean... intimidation? Gatekeeping? Fear and hate? Those things hold tons of power, even outside of school. But then it was like,” she goes on after taking another spoonful of milk, “if I had magical power, like real magical power, then even that tiny bit of effort I was putting into everything wouldn't be needed. I'd just win, plain and simple, and there would be no one to stop me.”

The others stare at her for a few awkward moments before Adagio laughs.

“Wow... you really are a wicked one, aren't you, Sunset Shimmer?” Adagio hums, pouring agla. A glass of actual literal orange juice and sitting on a couch near Sunset Shimmer's. Her location.

They co-own all the furniture, that's just part of being magical fox girls.

“Y'know,” Pinkie says, plopping down on a footrest because she's a footrest and she wants to assert dominance over the other footrest. “Those like, ears and tails we had as Wondercolts are pretty similar to the ears and tails we have now, except like... ours now are foxier.”

“...goddamnit,” Adagio says, realizing how right Pinkie is. “I'm glad we barely had to actually attend that school.”

“I'm not,” Sonata says despairingly, which is like normal saying but with more despair, “I was kinda having fun being around other kids.”

“...Sonata,” Aria says, sitting beside her and resting her head on Sonata's shoulder, “you're like fucking thousands of years old.”

“I'm a kid on the inside! Just like you! And I know it for a fact because I've been inside you!” Sonata sips her orange juice smugly.

“...Sonata, I'm going to need you to um... never say something like that again,” Adagio says, facepalming. “Anyway, what was that about wanting crabs?” She glances over at Pinkie Pie and Pinkie Pie does a spit-take but like with a bagel instead of any actual liquid. It's pretty unfortunate.

“You're right! I want crabs! But not like crotch crabs, I want mouth crabs!”

“Pinkie those... those might be more similar than you think,” Sunset says, earning her raised eyebrows from the entire entourage. “What?”

“Anyway,” Adagio says, snorting, “I think she's probably wanting to eat the animal known as a crab. I've seen them in supermarkets.”

“Hey, do you eat food?” Pinkie asks the sirens.

“Yes?” Aria says. “You've literally seen us eat people in Skyrim.”

“But I mean like...normally?” Pinkie pushes onwards, eating... well she's done with the bagel in more than one way, so I suppose she's just eating the next thing on her breakfast plate. Which is an uncooked package of ramen.

Monster.

“Of course!” Sonata says. “I looooove tacos.”

The other girls snort and stifle laughs, and Sonata puts her hands on her hips. “Oh c'mon! I'm sure you'll all love tacos too! I like running my tongue down their-”

“Okay okay,” Sunset says. “Let's go get mouth crabs.”

This does not help the matter of snorts and stifled laughter, but it does get the girls moving to their.

What the shit do rich people drive, one sec.

They get moving to their Boeing AH-64 Apache twin-turboshaft attack helicopter.

Rich people, am I right?

Sonata and Aria duct-tape something to Sunset's back and Sunset doesn't notice. Which is amazing once you learn what it is they duct-taped to her back.

They arrive in the parking lot of Generic Grocery Store 27B-6 and park on top of a few... nah that might damage their sweet ride, they park on top of the store and hop down with their foxy-roxy-poxy... their foxy agility.

They don't have pox. Yet. Any sort of pox.

“Here we go!” Sunset says, grabbing a shopping cart. People around her flee and cry out for some reason and the Sirens and Pinkie Pie all cover their mouths to hide their laughter. Sunset still doesn't realize what's on her back.

That doesn't last long though, as a few moments after entering the store Flash Sentry points at Sunset and cries out: “Oh my god, it's Sunset Shimmer with an AK!”

Sunset's eyes go wide and she grabs at the AK on her back, pulling it off and swinging it around as she yells out, “No it's not!”

“Call the police!” someone yells and Sunset turns on the other fox girls, AK in hand.

“Darnit, why? Which one of you did it?”

Aria points at Sonata and Sonata points at herself, so Sunset points the AK at her.

“Pfft,” Sonata says, “you'll never take me alive!”

Sunset pulls the thingie back to chamber a round but it already had a round chambered so that round flies off to the side, making Sunset look like a total scrub. “Ugh! Well unfortunately, I think I will take you alive.” She starts blasting at Sonata in public in a public space Sunset why there are so many....SUNSET WHY?

“Okay fine!” Sunset winds the clock back using her Akemi Homura powers and leaves the AK in the Apache. “There, happy!”

“That should be a question mark but yes,” Adagio says. “We already messed Skyrim up. We should at least try to leave our world... or this world in some semblance of one piece. Speaking of which, when did you get Akemi Homura powers?”

“Who?” Sunset says, lying about how much of a weeb she is. “Okay fine, um... well I found out that we can sorta... kinda...”

“No,” Adagio says faintly, then again, stronger. “No. NO! Are you kidding me? We've had magic this whole time since we've been back?” She tries to telekinesis the helicopter but nothing happens. “Wait... what's going on here?” She turns on Sunset and the other Sirens do too.

Pinkie Pie has made her way back down and is plopping a bunch of candy into a shopping cart. This will get real akward when she realizes how...ha, like AK-WARD, no it'll get awkward when she finds out that her friends don't trust her with their near infinite fortune and so don't let her have any of the credit cards.

“Well, see,” Sunset says and the other girls surround her, glaring. “Ok okay... O.K. OK. Heh, so many ways to-”

“SUNSET!” The sirens yell in unison, uncertain why they're not always capitalized.

“I found out that if we tap our belly-button piercings of magical op-ness three times and say 'the magic of friendship!' that we get like...a bunch of magical powers. Not the same as we had in Skyrim though, they're like... crazy.”

“We had Ion Cannons, and you're telling me this magic is crazier?” Adagio says in shocked disbelief. “Well...” She taps her piercing three times and says, while cringing super duper hard, “The Magic of Friendship. Ugh.”

It works and she gets some ridiculous magical power. The other sirens do it and they get the same.

“Well then,” Adagio says, smirking. “You know...”

“Hey,” Sunset says, suddenly uneasy. “Don't forget all those moments of closeness we've shared.”

“Oh I won't,” Adagio says, her smirk smirking harder, like SMORK. “After all... think of it, Sunset Shimmer. Haven't you wanted power all along?”

“I... I mean sure, but... but I've found something better.”

Sonata smorks too now. SMERK. “Pfft, what, friendship? Uh, are you like super dumby or something?”

“There's nothing dumby about friendship. Dumby?” Sunset raises an eyebrow but Aria's SMARK stops her. From...I dunno, from going on or something. Can't stop her from raising an eyebrow with a smurk. Not yet at least.

“Uh, duh? You know you can have power and friendship, right? I mean, what? You think everypony in Equestria only has power through friendship? Or that every powerful pony has zero friends? Or...or that like. Every powerful pony with friends only has their power because of their friends?” Aria says, circling Sunset with the other two SirenS. Yeah, now you have no idea what I'm gonna capitalize, huh?

“What are you saying?” Sunset asks, but she suspects she knows the answer. And she suspects that the excitement she feels in her isn't completely anxiousness at being circled by the sirens.

“I'm saying,” Adagio says, putting a hand on Sunset's shoulder. “That together, as friends... as lovers, we can rule this world. This world... or Equestria.”

“N-no!” Sunset says, moving her hand up to slap Adagio's hand off. She doesn't quite make it though, and instead ends up with her hand clutching Adagio's tightly. “I... I would never...”

“Never what?” Adagio says, bringing her face close. “Never crave power? Never long to take over the world that denied you everything?”

“I...” Sunset starts, but she can't finish.

Heh.

She imagines it; taking her power to Equestria, overthrowing the powers of that world to make way for a new leader: herself. She thinks back to how she had been defeated by Twilight Sparkle and her friends' reflections in the human world.

Sunset Shimmer realizes that it wasn't until the very moment she lost that she even spared a single second for thoughts of a peaceful life. It hasn't been a bad life, not by any means. Recent times especially have taught her that there is so much untapped potential in a calm, domestic life.

Sunset Shimmer I'm going to need you to slow down for a moment, please remember that your calm domestic life is you and four other crazy magical fox girls constantly fucking and watching porn and sometimes blasting each other with way too many guns you have just lying around the house. Also just kinda beating the shit outta each other.

Sunset's eyes go wide.

She realizes then that she chose violence, long ago. Only in defeat has she ever considered another path. Only when her agency was taken away, whether by the power of her foes or by the will of destiny, has she ever satisfied herself with peace.

And now she has power. Power unlinked to friendship, but in truth she has that too. No longer does she have to play nice. No longer does she have to do anything but let her heart's desires run free.

And the best part is that she doesn't have to sacrifice friendship for it.

She squeezes Adagio's hand, giving a smyrk of her own, and says with a cruel glint in her eyes, “You know what? Let's do this.”

“I'll get Pinkie!” Sonata chirps. Chirps? Sure, why not. She bounces off to retrieve Pinkie.

Sunset turns back to Adagio. “So what're we gonna do?”

“Simple,” Adagio says. “We find out what our powers are, then we bring them to Equestria and topple the leadership there to seize control.”

“But what about Twilight Sparkle and the others? I doubt they'll just let us get away with it.” Sunset thinks both of the group here and their pony selves in Equestria, and a horrible danger rears its head. “Oh wait. If the group here joins the group from Equestria, they'll be at least twice as dangerous.”

“Oh we probably don't have to worry about that,” Adagio says.

“I'm not going to hurt them. They're my friends,” Sunset says.

“Then we'll take them with us,” Adagio suggests, walking away and flexing her fingers. Beside her, the other Dazzlings look enthralled by the feel of the magic flowing through their veins.

Suddenly realizing that she may have made a critical mistake in telling three evil creatures who, like her, only drifted towards peace after defeat and being helpless to fight, Sunset uses her Akemi Homura powers to try and set time back.

Adagio and the other Dazzlings realize what she's doing because of their Akemi Homura powers and a time battle ensues. Whatever the hell that might normally look like, here it looks like a beam battle ala Dragonball Z. And probably regular Dragonball. And other variations thereof.

“You'll never win this time battle!” Adagio roars, pushing her beam further towards Susnet Shomer. I like typo'd Sunset and just figured 'may as well fuck up her second name too.' Would Shimmer be like a family name? Like the 'Pies?' That wouldn't make sense though, the 'Apple' family has their family as their first name.

Oh heh, 'Apple Pie,' just saw that.

Anyway.

“Maybe not!” Sunset roars back, keeping her beam going agaist all three Dazzlings' beams. “But I'm not gonna just lay back and take it!”

Sonata snorts and her beam loses quite a bit of strength.

“Sonata you idiot!” Aria shouts.

“No way....” Adagio says faintly as Pinkie Pie with a toaster jumps into the middle of all the beams.

“Did somebody say Apple Pie?” Pinkie exclaims as she enters the timebeams with the toaster.

Sonata falls into it too for no reason.

The group all find themselves in the Dazzlings' tour van. They're wearing the same things they started this ridiculous adventure with.

That's right.

No more magical powers, no more fox girls.

No more AKs.

“No,” Sunset says faintly, falling to her knees on the shag carpet. “No, please... that whole thing. Like ninety thousand words...”

“It's fine,” Adagio says, also falling to her knees. “It's fine... it's fine... completely fine...”

Aria's rocking back and forth on the floor, hugging her knees. Pinkie Pie and Sonata are eating toast happily like a couple of toast-eating chipmunks. Or squirrels. Whichever's cuter.

Otters?

“All that pain,” Sunset says, remembering the feeling of holding that patch of Pinkie Pie's bubblegum-pink hair and desperately casting a resurrection spell, hoping she hadn't killed her friend for good.

“All that time,” Adagio says, remembering how they had all struggled so much to figure out their feelings, over and over, as their instincts kept pulling them in new, strange directions.

“All those orgasms,” Aria says, remembering... remembering all those orgasms.

“Sure were a lot!” Pinkie exclaims and Sonata giggles.

“Yeah, like, a crazy lot. Aria was all like 'oooo I'm cooming! My nacelles!'” Sonata says with a snort.

“Everything,” Adagio says, standing shakily and walking over to where her shattered gem sits, reformed at great effort and great expense, though still cracked all through. She holds up the amulet and it glows faintly, a dim red; the best they've managed, in a world nearly bereft of magic. “Everything...” she says again bitterly, her teeth grinding.

“I... how...?” Sunset says. She grabs the toaster and shakes it, rubs her face on it, slaps it, sticks it between her legs and rubs on it wtf Sunset. Nothing works.

She doesn't get isekai'd into Skyrim, no matter how hard she fucks the toaster.

She turns to the others. “How... how do I go on? After all that? How do... how do any of us just... go on?”

Pinkie puts down her toast in Sonata's lap and stands, bouncing over to Sunset with a look of deepest worry on her face. She takes Sunset's hand in hers and looks deep into her eyes as she speaks carefully. “Sunset? Sunset, it's okay. We're okay. We're all back to normal, so... so we can just keep living normally, like we were doing before. Okay?”

Sunset's breath gets light and fast and the world starts to swirl as dizziness hits her hard. Pinkie holds her close, coos to her, and that's when Sunset remembers what started this whole ordeal.

Once upon a time, Sunset kissed Pinkie Pie.

“Pinkie... Pinkie, I think I like you. Like like. I.... I want you to be my girlfriend,” Sunset holds Pinkie close, already knowing what comes next. She's been trhough this before.

So has Pinkie.

Despite the machinations of time and a mad director, Pinkie's already told Sunset how this all ends. Still, Sunset has to try. She has to try, because there's nothing left.

All that closeness.

All that comfort.

Gone, as if it had never happened, remembered only in memory; memory that may fade, trapped deep within a body that may as well never have been touched in those intimate ways.

“Um...” Pinkie starts shakily and Sunset sniffles.

“I know,” Sunset says as the tears start. “Just... you can say it. This might be the only way. The only way for us to go back to how we were.”

“Sunset...” Pinkie sniffles too, and Sunset feels her arms around her tighten just the tiniest bit before loosening and going stiff, awkward. “I um... I don't think I feel that way about people. But... but it means a super duper lot that you think of me that way. I guess... I guess I just don't want to make you think that I can ever feel the same way. I... I hope we can still be friends.”

“Yeah,” Sunset says, crying into Pinkie's puffy outfit. “I'd like that.”

Aria scoffs. “Great. Wonderful. Get out. ”

“I agree,” Adagio says, grimacing. “You weren't welcome here in the first place, Sunset Shimmer. Since we're back... since everything we did was undone... I guess that means there's nothing left but to pick up where we left off.”

“Really?” Sonata says, standing and putting her hands on her hips, scowling. “Seriously? Who cares if it didn't actually happen, or happened in another timeline-a-doodle, or whatever? We remember it. It did happen. It was only magic that set time back to now. Are... are we just all gonna pretend those feelings didn't happen? Those... those times together?”

There's silence for a bit, but Adagio's sigh breaks it.

“Of course not, Sonata,” she says softly, walking over to Sonata and placing a hand on her shoulder. She holds a hand down and Aria takes it, and Adagio helps her stand as she goes on, “Those moments together happened. Now though... we'll get to figure things out without that whole... wolf and or fox girl thing going on. You two will be able to... well... be together,” she says with a soft, sad smile, joining Sonata's and Aria's hands.

“Um,” Aria says, looking away with a blush. “Adagio...”

“It's okay,” Adagio says soothingly, her hands on theirs, like a comforting blanket, wrapping tight and squeezing gently. “I've always loved the both of you. You seem happiest together. Even before all this, the time we've spent... it's been nice. But I always knew that you two wanted each other, more than anything, or anyone, else.”

“Are...are you sure?” Sonata says, moving her free hand up and caressing Adagio's arm. “You um... I mean, if you ever wanna...”

Adagio chuckles. “We'll see. But for now, I think I'd like to let you two just have each other for a bit. It may be wise to figure out your own feelings for each other in full and untainted by those odd instincts before we test how it feels with a third.”

“Adagio,” Aria starts, “this is really... thank you. I don't... I don't know what else to say.”

“Maybe there's nothing more to say,” Adagio says, giving their hands another little squeeze. “At least, not about this. You two stay here,” she says to her fellow sirens before turning towards where the crying duo of Sunset and Pinkie stand embracing. “And you two,” she mutters, stepping close.

Pinkie and Sunset turn.

“What?” Sunset asks, then laughs. “Oh, right. Okay, we'll... we'll get out.”

“Good,” Adagio says with a nod. She looks away and her cheeks flush, though, as she goes on, “Though if you ever need anything, we'll... consider helping you.”

“Heh.” Sunset starts to let go of Pinkie Pie, though a bit of her realizes that it may be the last time she ever holds Pinkie in that way; it may be the last close, intimate contact she has with her that is anything but 'just as friends.' So she lets go of Pinkie slowly, her hands lingering on Pinkie's arms as they slide down. She grips Pinkie's hands once, tightly, wishing that she could just stay there in that moment and never have to let go.

But she can't.

So she lets go.

“Well...” Pinkie says. “Let's get back to the others!”

“Yeah,” Sunset agrees, wiping away a tear. “Let's go.”

They leave, and this would be a good time to wrap up.

But you know what they say about trains and brakes. Specifically this train and its lack.

Of brakes.

Sunset and Pinkie Pie make their way back to where their friends wait at the R.V., their faces worried.

“There they are!” Applejack says, pointing them out. The rest of the girls around the camper turn and spot Sunset and Pinkie Pie.

Welcome to the show, rest of the cast. Run for your lives.

And for your virginias.

“Are you two okay?” Twilight asks as the horde of them surround Sunset and Pinkie.

“Yeah,” Sunset says, wiping her eyes again. “Just uh... you know. Talked some things out.”

“Uh, you mean like how you two kissed right? What was up with that?” Rainbow Dash asks, tactfully.

Oh god the cast is bigger god why.

“...yeah,” Sunst admits, frumping at how bad Rainbow Dash is with wording.

“Oh,” Rarity says awkwardly, looking away and bouncing her index fingers off each other. “So... are you two... an item, then?”

“We're two items!” Pinkie says, not realizing how goddamn savage that is.

The rest of the girls wince and grimace because they do know how goddamn savage that is.

“Ah, well,” Applejack starts, scratching the back of her neck. “Uh... alright, someone say something. Please?”

“Uh,” Rainbow Dash starts. Applejack you really should've specifically excluded Rainbow Dash from 'someone.' “Better... better luck next time?”

“Break a leg?” Fluttershy offers, shyly.

Hoo boy.

“It's fine,” Sunset says, trying a smile. “We're just all gonna stay as friends, okay?” She lets out a long, slow exhale, heading by herself to the door of the camper. “Though... I think I'm gonna lie down for a while.” Her eyes go wide as she realizes the possible implications of this.

The possible safe for work implications, jeez, whaddya think this is, Skyrim?

“Oh,” Sunset goes on, “I mean... like literally laying down. I'm not gonna cry. Probably. So like, don't hesitate to come on in if you want. I've just had a really long... uh... couple minutes.”

“Have a nice nap!” Pinkie exclaims. Sunset nods and heads in, flashing them one last weak smile, and the other girls turn to Pinkie.

“Um, Pinkie Pie, darling,” Rarity starts. “It... it might help if you were a little less... flippant about this.”

“Huh?” Pinkie asks, cocking her head. “But I haven't done any flips for a bit. ”

“What she means, ” Applejack says, and Rarity can't wait to hear what Applejack thinks she means. “Is that Sunset's feelings are probably pretty hurtin', so... it might not be the best plan to be all jokey about it.”

“Yeah,” Twilight agrees, acting like she knows how humans interact. Just to clarify this is SciTwi or whatever, the version of Twilight native to the nine hells of.... to the human world that's a reflection of the pony world.

How did this world come to be?

No one knows. Except maybe the fine folks at Skywalker Ranch but... do you really wanna talk to those freaks?

Twilight goes on, not hearing the narrator's rambling. Weird. “Even if you turned her down, which, I'm calculating based on how red Sunset's eyes were and the fact that you said 'two items' and the fact that all of Sunset's words and actions seem to imply that she was in fact turned down after admitting her feelings to you, is what happened... even then, you should try to, as they say, 'let her down easy.'”

“But it was easy!” Pinkie says. “I just told her I don't feel the same way about her. Easy-peasy!”

“Uh, wow,” Rainbow Dash says, grimacing. “Uh Pinkie that's...”

“Yeah,” Applejack says, her eyes narrowing as she crosses her arms over chest. “Pinkie, I know you ain't like, the best sometimes with knowing when not to say a thing, but can't you imagine how Sunset might feel if she were to hear you say something like that?”

“Like what?” Pinkie cocks her head, genuinely confused.

“Oh I dunno,” Rarity says, shaking her hands in mock confusion, “maybe if she heard how easy it was for you to turn her down?”

“Oh... ohhhhh.” Pinkie Pie finally gets it, and the other girls all sigh.

“Well,” Twilight starts, “it's probably okay since she didn't hear that, though I guess it doesn't undo whatever else you might've said. Still, might be better to just... watch that from now on and apologize if you did go a little overboard.”

“But!” Appejack says, holding her arm out and blocking the rushing-forwards Pinkie, “ After giving her some time to rest.”

“Ah, right,” Pinkie says, giggling and scrunching down in a bit of embarrassment. “Hey, I have a question for you guys.”

The others wait, some cocking their heads, most raising their eyebrows.

Pinkie looks around at all of them and smiles. “So do you guys like... fall in love? Like, love that's not just... you know. What you feel for friends, or family, or cake?”

The other girls look between them.

“Well,” Rarity starts. “I suppose I've had a few crushes here and there?”

“I am one hundred percent certain that I um... maybe... sorta... have felt something like a um... romantic love, if that's the term we're going with,” Twilight mumbles, blushing hard and looking away.

“Not me,” Rainbow Dash says. “Never really think about it. Too busy, probably.”

“You've definitely had people feel that way about you though,” Applejack says with a chuckle. “Zephyr Breeze, anyone?”

“AHH! Where?” Rainbow Dash dives under the R.V. to hide herself from the predations of Fluttershy's gross younger brother, and the others laugh at her. “Oh very funny,” Rainbow says, “and what about you with uh... hmm...”

“Ayup, that's right. I ain't got no one crushin' on me,” Appejack says proudly, though her smile cracks a bit as she realizes how freakin depressing that sentence is. “Huh. Well, I guess for me, I've had crushes on a few celebrities here and there but... I ain't sure, truth be told. I don't think I've felt that way about anyone I actually know.”

“Same here,” Fluttershy says quietly, and the others turn to her. “Well, I haven't had crushes at all, really. And I'm sure no one would want to be with me, anyway...” She ends in a mumble and Applejack feels an intense urge to hold her and comfort her.

WUH. OH.

“Hey now,” Applejack says, getting close to Fluttershy and channeling her urge to hold her close into a twitchy, awkward back pat as a sheen of sweat builds on her forehead, her mind battling with the confusing signals her heart is sending her. “I'm sure someone out there's probably crushin' on ya. Heck, they're probably just as shy as you are.”

“I don't think that's possible, ” Fluttershy laments, and Appejack gulps.

Applejack really has this strange feeling like someone, somewhere, did something weird. Maybe like misspell her name. But that doesn't make sense.

Mostly, Applejack really wants to hold Fluttershy now.

“Statistically speaking,” Twilight starts, like only SciTwi can in this situation, “the odds are fairly high that at least one person out there is more shy than you. And I would call the odds of many people being more shy than you statistically significant, at the very least. Especially when one considers the many strides you've taken towards combating your shyness when it interferes with your ability to function in society.”

“I suppose that's probably true,” Fluttershy admits. She smiles up at Appejack and jfc. What is that, like Ape-jack Horseman? Like Bojack but 100% just King Kong in a horse cosplay?

Is it cosplay or just costume?

Applejack's heart beats hard in her chest, but she hides it with a bright smile and retreats. “Course it is! Now then... let's start packing up and gettin' ready to head on out, ya'll!” She hurriedly sets about tearing down their campsite and the other girls agree while Pinkie Pie thinks out loud.

“Huh, that's awesome! So it sounds like not everyone has the same sorts of feelings for other people. But are there really only a couple types of love? Are they like, actually different? Oh, are all of you still virgins?”

That stops them pretty dead.

“...what?” Rainbow Dash asks, holding a tree stump in a position that appears to indicate her desire to huck it in the distance. Technically that's fine but you could probably just leave it there Rainbow Dash.

“Y'know, have any of you had the sexums?” Pinkie asks loudly. Very loudly.

Too loudly.

“Pinkie!” Appejack rushes forwards and clamps her hand over Pinkie's mouth. “What in the world d'ya think you're doing? You can't just yell about things like that!”

Pinkie murphs something into Applejack's hand and Applejack narrows her eyes.

“Pinkie, I'mma take my hand away. But you better not let me regret it.” She takes her hand away and Pinkie just smiles for a bit before speaking.

She loves speaking though so she tries not to set Ape-Jack off again. Sorry Applejack I just keep misspelling your name, it's the darndest thing.

The girls all seem to ignore the author. Either that or they genuinely can't hear her.

Interesting...

“Well, I was just wondering...” Pinkie starts, at a reasonable volume. “If any of you have, y'know...”

“I certainly haven't,” Twilight says, somehow blushing even harder. “I think we're a little young for that, don't you?”

“Eh, I wouldn't be so sure about that,” Rainbow Dash says. “I'm pretty sure a few of the people in a few of my sports clubs have done the...you know. What's it called. But not sexums.”

“Really?” Rarity says, her gossip-radar spiking up with a 'holy-shit-spill-that-t' alarm. “I wouldn't have guessed, though I suppose it makes sense. All those finely toned, sweaty bodies, all so close to one another...”

“Rarity!” Twilight exclaims, trying to hide herself in her hands. “Language!”

“What language? I was only imagining them together after a game, the smell of their exertion so overpowering, the slick sheen of sweat on their hardened muscles or lithe, smooth curves-”

Fluttershy makes some indescribable squeaking sound of shyness and Rarity stops, giggling.

“G-golly, Rarity, can't you keep them wonderings to yourself?” Applejack says, helping Fluttershy up and trying real hard to ignore how her heart beats a bit faster when she feels Fluttershy's soft hands delicately laying in her farm-hardened, calloused ones.

“Sorry, sorry, I'll relent, ” Rarity says, giggling again as she folds a folding chair. Which, let's be honest, is probably the extent of physical labor she's going to do today.

“I-I-I sure haven't had....that...with anyone. Or mys...” Fluttershy's admission is lost in another little squeak as she tries to hide behind Applejack.

Which really, c'mon, doesn't help Applejack's heart rate. At all.

C'mon.

“Not even by yourself? Oh darling...” Rarity says sadly, a hand on her cheek. Her own cheek. Her face cheek. “There's no rush, of course, and it's completely fine if it's not your thing, but I do hope it isn't some sort of misplaced shame that's keeping you from it.”

“I...I don't wanna talk about this,” Fluttershy whispers from behind Applejack and Applejack holds her hands out wide as if protecting Fluttershy from the others.

“Now c'mon y'all, this ain't proper talk for outdoors. Or indoors, if anyone's feeling uncomfortable. Which I think I feel, truth be told.” Applejack looks at the others but they all agree and continue packing things away.

Except Rarity, who already filled her manual labor quota for the year.

And Pinkie.

“Huh, I see,” Pinkie says. “Well that's okay! I was just wondering since Sunset, the Dazzlings and I have had like...a crazy amount of sex with each other.”

The other girls all stop moving.

Probably a fair reaction.

“W-what?” Applejack says, shocked.

“Uh, Pinkie?” Rainbow Dash, her hand on the R.V. door, suddenly hesitates to open it and go in. Partly because of her utter astonishment, and partly because a bit of her realizes then that she's about to go in and see Sunset Shimmer, who, according to Pinkie, has banged Pinkie and the Dazzlings—of all people—a 'crazy amount of times.'

Rainbow isn't sure why that fact seems to add to her un-desire to open the door.

“Hey, no probs here,” Pinkie says, helping pack away the everything that still sits on their nearby picnic table. I think they ate around the bonfire thing or whatever but there's totally a picnic table there, pretty sure.

Pretty sure.

Pinkie goes on. Probably unfortunately. “I'm totally good not talking about all the clam-slamming finger-licking-good sex we all had in a big ol' pile! Sometimes several big ol' piles!”

“Pinkie!” Applejack says, though her voice is strained on account of Fluttershy hugging her, panicked, from behind. “Will you cool it with all that talk? Not everyone's comfortable just... shoutin' stuff like that out! Or having it shouted at them, for that matter. And by not everyone, I'm including myself.”

“Okey dokey lokey!” Pinkie says. She also doesn't hear the author.

The author now has the element of surprise.

Good, good...

“That P-Pinkie,” Applejack says. She glances down but sees that Fluttershy is still squeezing her tightly and shivering into her back, which explains why she stuttered a little there. Definitely the restricction of her airflow. Oh yeah, absolutely, that'll do it every time, tell-you-what.

“Uh, you alright there Applejack?” Rainbow Dash says, snorting. “This might be the world's slowest strangulation, but I wouldn't put it past you to let it just happen.”

“Oh!” Fluttershy says, letting go of her death grip on Applejack. “I...I'm sorry,” she says faintly.

Applejack turns around. “No, no that's fine. I can't believe Pinkie would just be shoutin' things like that so loud.”

“Geez,” Pinkie says, “you guys are so uptight. Well, if you ever, y'know, or want some advice, just ask me or Sunset, okay?” She giggles and takes some things into the R.V., passing by Rainbow Dash, who finally gets the courage to enter the love nest, if for no other reason than a morbid curiosity regarding whether or not Pinkie and Sunset are going to immediately start banging.

It's a longshot but Rainbow's being slowly awoken to something deep within her, so she keeps an eye on them while she's inside, poorly organizing the stuff she stuffs in random places absentmindedly.

Now when I say stuffing, I don't mean like...things or any part of her body into other people's bodies. There's nothing sexual happening at the moment.

At the moment.

The girls load things in and eventually they all start setting up to sleep, but a couple of things are a little different.

Applejack may have adjusted her sleeping bag just a bit. It would appear that she's now set up to lay right next to Fluttershy. She isn't sure why.

Or rather, she thinks she knows why. She wants to be there to protect Fluttershy if Pinkie gets weird and starts talking all that sex talk again.

Yeah, that's probably why. Totally.

We believe you, Ms. Element of Honesty.

Pinkie starts trying to climb into bed with Sunset, to the chargine of...well now. The chagrin? There we go. To the chagrin of all.

“Pinkie? Whoah whoah wait a sec,” Sunset says, holding an arm out and stopping Pinkie.

“Huh? Oh, right, the Prude Patrol,” she says, glancing back over her shoulder with a smug grin on her face at her bewildered friends. “Well alright, I guess I can wait until-”

“Um, Pinkie?” Sunset says, softer. Pinkie turns and Sunset sighs, going on without looking Pinkie in the eyes. “I...kinda don't wanna do that with you... um... at all.”

“Wh...what?” Pinkie says in an uncharacteristically quiet voice.

Sunset exhales through her nose, that sort of puffing sigh-like thing, and glances up, meeting Pinkie's eyes for a moment. “Can we talk outside?”

“Um... okay...” Pinkie dismounts from Sunset's bed and the two of them head out.

“Wow,” Rarity says, “something strange is certainly happening. I had no idea the two of them were... ahem... that close.”

“It is rather strange,” Twilight says. “I honestly got the feeling that Pinkie Pie was pretty shocked when Sunset kissed her. But if they've done other things before...”

“Maybe they've been keeping it a secret and Pinkie was surprised Sunset slipped up and kissed her in public,” Rainbow Dash mumbles, yawning as she wraps the blankets around hersef.

“Huh,” Applejack says, looking up at the ceiling of the R.V. “If they was keeping it a secret, I'd have figured it'd be Pinkie who would've let it slip by now, if anyone.”

“I just hope they're okay,” Fluttershy says softly, turning towards the wall and curling up into a little ball for warmth in her sleeping bag.

Applejack glances over at her for a second and feels that feeling again, that feeling like she's doing something wrong and about to get caught; a guilty excitement, and a strange urge to reach out and see what Fluttershy's hair feels like. She's touched it before, she's sure, but it's so strange that she's plum forgotten the feel of it flowing through her fingers.

She'd really like a refresher, but she doesn't wanna scare Fluttershy, so she sighs and turns towards her, curling up and watching the slight rise and fall of the sleeping bag beside her as Fluttershy's breath slows and becomes the even tempo of sleep.

Though as she watches, Applejack's the one who starts to get a little scared. Scared of the feelings she's having; scared of whatever's happening to Sunset and Pinkie happening to her and Fluttershy.

Outside, Sunset sighs, facing away, and Pinkie bounces around to get in front of her.

“Sunset, what's wrong? Do... don't you like me?”

“Of course, but... but you don't feel the same way.” Sunset sighs again, shrugging and letting her hands hit the sides of her thighs. “I just... well, first off, even if I wanted to, there... no, you know what? Pinkie, I'm not gonna... I'm not gonna have sex with you. Not if I know you don't feel the same way about me as I do about you.” She crosses her arms but tries to keep her expression gentle, though more than anger, more than frustration, what Sunset feels right now is just a tired sadness.

Pinkie, on the other hand, feels nothing but confusion. “Sunset, we've talked about this right? I mean... I'm not crazy, right? That all really happened... right?”

“Yeah, I remember it too. And I'm pretty sure it did. ”

“So... then why aren't you remembering that whole talk we had? About how it's okay, because I do love you, just not the exact same way? Remember?” Pinkie reaches out but Sunset steps back and Pinkie withdraws her hand, holding it in her other hand to hide its shaking.

“I know. But now that I don't have all those crazy.... wolf or fox or whatever feelings. I dunno Pinkie. It just... it doesn't feel right. It... it kinda hurts. I know some people can do it. Like, be with people they don't love, or be with people who don't love them back the same way. But... I guess I'm just not one of them. I wish I was... even though that's kinda messed up, I mean, we're all just different... still.” She looks away and holds a hand up to her eyes, wiping away the tears. “I'm sorry, I just... I can't.”

“Hey... hey no, that's okay,” Pinkie says, her voice wavering. “I... I mean, I just... it's okay. If you're okay, then I'm okay. I guess I'm just... sorry. Sorry I'm not different. S-sorry I c-can't...” Pinkie's bright smile finally cracks and she sniffles as the tears start.

“Pinkie, it's not your fault. It's no one's fault. We're just... we're just not right for each other. Not like that. Feelings like this, they come for... who knows what reason. And in time, they... they go, too.”

“I don't want them to go,” Pinkie says through miserable tears. “I don't w-want you to stop. Thinking about it... thinking about you waiting for your feels to just... d-die...” she sniffles hard as her tears come down harder, and covers her eyes with her forearms. “I... I wish it wasn't like this.”

“Yeah, well...” Sunset sniffs too, her tears coming down harder. “I wish it wasn't like this, too.”

They cry together, not touching. In time their tears slow, as tears do, and they turn, feeling hollowed and empty, to head back in.

“We'll always be friends... right?” Pinkie asks softly.

“Of course,” Sunset assures her, smiling. “I'd never want that feeling to end.”

“I'm glad,” Pinkie says with a tiny, trembling smile. “I'm glad.”

They head in together and go to bed, though neither sleeps well.

Applejack gets to sleep eventually, but she has a dream of pink butterflies and a soft, tinkling voice singing to her from somewhere far away, and not even she can deny what her mind is trying to hint at.

Boy sure would be great to have a chapter ending around here. Or even earlier. Well, almost there.

The next morning, the Dazzlings prepare to head out for the next stop on their tour. Aria, driving, smiles back at Sonata in the backseat. Sonata smiles back and Adagio sets up her phone's gps, setting it to guide them where they need to go.

They drive off into the sunrise, to chase their dreams of life and love, and have thus passed beyond the bounds of this story, free at last to live happily ever after, free from the crazed author.

The Mane Six, however, are not yet so fortunate.

They head back the next morning, the mood somber and quiet. The festival was a blast, all in all. But the last bit of it had tinged things a certain shade of awkward, and while those who never knew the joys of being fox-girls in Skyrim are glad that Sunset and Pinkie (or rather, Pinkie) aren't/isn't talking about banging anymore, that hyper inappropriateness was at least rather joyous.

Not so is the current atmosphere.

Sunset watches the world go by. Her body's sore from where she'd slept, and she wonders how long it's been since she's felt such a dull, lingering discomfort. Even getting slammed by live fire from short range hadn't hurt this long, and she has to remind herself, again and again, that this is what life is like.

What it will always be like, until it ends. Dim dull discomfort and a feeling like she's missing something; something she's lost, or never had. And she has no idea, none at all, where she might find it, whatever it is.

Though she thinks she knows, at least what it might be.

Now if only she knew who.

Applejack can't stop stealing glances at Fluttershy, trying, with every bit of her mental might, to figure out why she can't stop feeling this strange sort of way. She keeps glancing, to see what it might be that's drawing her gaze, to try and find out if maybe it's just that she noticed something off that she can't quite place. Her mind works harder and harder, coming up with ever-increasingly ludicrous ideas, until finally she's convinced that there's something she sees that's a sign of dark magic; some sort of mark, like maybe one left by a curse or magical beastie, and that's why she can't stop looking.

But a part of her knows that's ridiculous. And a part of her, a quiet part that's grown louder with every fleeting glimpse, that says the truth into her heart, where it echoes back on her, a maddening clamour of things that couldn't be.

She doesn't feel that way.

Of course not.

For one, Fluttershy's a girl. And sure, there are plenty of people who have those feelings. Sunset Shimmer for one.

The Dazzlings, probably. Pinkie Pie, though apparently only in the physical way.

But Applejack? Naw, couldn't be. She's had crushes on boys before. Probably. Dirk Thistleweed, for one.

Another worry starts up in her though, one far worse than the worry that she might also like girls.

The worry of why she'd be worried.

She's never thought of herself as the type to judge, not about things like that. What a person likes, who a person likes... these things are a person's own business. Love is love, after all.

So why? Why is the thought of liking Fluttershy so frightening?

“Um, Applejack?” Fluttershy says, turning towards her.

Applejack nearly leaps out of her seat in surprise but manages to calm herself and play it off as.... well honestly she probably doesn't make it look like anything than what it was: her being startled by being suddenly addressed. “Um, yes?”

“Oh, nothing,” Fluttershy says, turning back out the window.

“Oh... um, okay.” Applejack presses her lips together tight and puffs her cheeks out for a moment, eyes wide. Finally she can't resist any longer and pushes the tiniest bit. “Uh, was it like... a question, or...?”

“Hm? Oh, I guess so,” Fluttershy says, glancing over for just a split-second before looking out the window.

“Ah, well. Um... was it... a question for me?” Applejack presses onwards, feeling more than a little ridiculous.

“Yeah,” Fluttershy says softly, laying her cheek against the glass and closing her eyes.

“Oh, okay.” Applejack waits a few moments but curiosity just won't let her be apparently. “Um... what was the question?”

“Hm?” Fluttershy says, her voice faint as she floats somewhere between being awake and being very much not.

“The... um... nevermind,” Applejack sighs and looks out her own window, wondering why she wants to hear, so badly, what the question might be. She hates herself a bit for it, but she tries, again, to press on. “I'm real sorry Fluttershy but... you can go ahead and ask, whatever it is.”

She looks over at Fluttershy but notes with surprise that Fluttershy's now fully asleep.

Applejack you keep trying to drive this back into third limited and I'm not appreciating it.

Applejack sighs, putting her forehead against the window. Somewhere behind her, Sunset's eyes, wide and alert, stare out her window as she listens in.

She knows why Applejack wanted to hear the question so badly. Even though it was probably just a random little wonder Fluttershy had, or maybe just a question about why Applejack, never terribly stealthy, had been glancing at her so often.

Sunset Shimmer knows the feeling, and hearing Applejack headbutt the window gently confirms it to her.

She glances over at Pinkie, who's watching the scenery roll by with tired eyes and a frown, and sighs.

Sunset Shimmer really, really wishes she could help Applejack. But how could she? Would she even know how? So far, her feelings have only ever been rejected or driven by magical fox instincts. What does she know of love? Wouldn't she just make it worse?

These fears and more spill through her and she clenches her eyes tight, sick of tears, sick of sadness.

Sick, most of all, of this godforsaken trip.

The ride is quiet until they start dropping people off at their homes. Despite the odd tension of the last day and the ride in particular, their goodbyes are kind and warm, brimming with the genuine feelings of friendship the girls share for each other.

Sure, Sunset's goodbye as they drop Pinkie off might seem a bit more sad than it normally would be. And Pinkie's hug might not have always stopped before starting, appearing only as a slight motion forwards, as if almost tipping over.

And sure, when they drop Applejack off, she might not normally have blushed when Fluttershy hugged her goodbye.

But after they're all dropped off and Rarity sits alone in the camper, she wonders, to herself, what might be in store for them in this, the last home stretch of a nightmare she's only barely aware of.

Even that thought alone seems so strange and alien in her mind.

So off she heads to home, and the next day finds them on a weekend; a Sunday before school.

If you look up the actual days of the Starswirl the Whatever festival I swear god so feed there won't be enough sharks in the world to eat you. Because you'll be like really really large. Not like obese or anything I mean just literally hitting the size slider higher so that it's all still completely in proportion.

Look, we all have different body sizes, okay? We're all beautiful and or hideous in equal amounts at the same time forever.

Moving on.

Applejack's up before the crack of dawn, setting about to the chores she's become so accustomed to. They're like a ritual now; part of waking up, an essential thing to start her day. Every day at the Starswirl music festival had thrown her off just a bit, and maybe that's why she's been having these strange thoughts.

Nice try Applejack but third limited isn't going to come so easy once you're ninety-five thousand words into this madness.

Also nice try trying to explain the gay away with 'oh my mornings were just a bit off.'

Applejack still doesn't respond or even appear to detect the author in any capacity, and the author now wonders if perhaps her invisibility is a curse and not a blessing.

Applejack sighs, going through the motions; but for her chores, the motions are all that matter.

If only everything was so easy.

When she finishes, the clock has barely met 7 A.M., and she wonders how on Earth she's supposed to spend the rest of the day with these thoughts swirling around in her head.

As if sensing her inner turmoil, Big Mac comes by for a talk.

As it were.

He comes to the fence she's leaning on and leans on it beside her, gazing out across the farm. He looks at her for a moment and she sighs.

“I dunno,” Applejack says. “I just... been having some feelings. It ain't that they're bad feelings, on their own. But you never know how these things go, and... well, I've seen them go some not great ways between a few friends of mine. Maybe that's the worst part of it too. When it happens between friends, and there's this whole big mess of friends that ya both share. If it goes bad, then what then? You're just still stuck there with them, seeing them all the time. And maybe it won't go so bad that it gets... unbearable, but still. What if it does? How can I even tell? I dunno just... that's pretty much it, I guess.”

Big Mac watches as the winds roil the grasses between the trees of their orchard, swaying the apple-laden branches of their family's livelihood. He wonders, for a moment, how so much could depend on so little.

He remembers a poem about a wagon and smiles, looking back towards his sister. He doesn't have all the answers; at least, not in words. But as every shining red apple on its branch has always shown, in every choice there lies a promise.

Not of success.

But also, not always of failure.

“Sometimes,” he starts, “hoping's all that matters.”

Applejack's eyes go wide and she turns away, blinking back tears. “I... I guess you're right. If I don't try, I'll never know what might happen. Just gotta push on and hope for the best. Thanks, Big Mac.” She pats his arm and he nods, turning again to the trees, and she heads on inside to make a call.

“H-hey, Fluttershy,” she says into her cell. Even now, after all this time of owning one—for as long as she can remember, really—she still isn't used to the feel of her phone on her cheek. It feels too fake. Too unnatural.

“Oh, hello Applejack,” Fluttershy says, her voice amplified by Applejack's volume control, done well ahead of time in preparation. “Is something wrong?”

“No, no, nothing like that. I guess I was sorta wondering if you were uh... busy today, is all. So um... are ya?”

There's silence for a few moments, and Applejack's mind goes first to fears that Fluttershy's caught on; that somehow, through some sudden insight, she's realized the truth behind her friend's tense, uncertain words. If perhaps she has also realized the truth behind why Applejack threw her so many glances on the ride back from the concert.

But when Fluttershy's voice finally comes, it doesn't carry with it the reproach of realization; only the same gentle softness that it always does, her tone almost ephemeral. “Not today. Um, as in, I'm not busy today. Was there something you wanted to do?”

“Yeah, something like that,” Applejack says, but she goes on quickly to clarify, knowing Fluttershy's tendency to shy away from things that sound potentially frightening. “Well nothing special really, just wondered if maybe you'd like to go for a walk or something. Guess I'm still a little wound up after all that business at the festival, so... I'd like to maybe just spend some time uh... unwinding.”

Fluttershy's quiet again for a few terrifying seconds and Applejack curses herself for her rambling, but when Fluttershy speaks, her voice is still the same as always, albeit with a slight note of excitement. “Oh, that sounds lovely! Um, where would you like to meet up?”

“Oh! Um, I could come by your place and we could just go from there. It's pretty nice out by where you live, if I recall.” Applejack chuckles, and thinks immediately that she sounds way too nervous. She wonders if there's any possible way at this point that Fluttershy doesn't suspect what's going on, but amazingly, Fluttershy's response is just the same, friendly tone it's always been.

Though even that seems to send misgivings through Applejack's mind.

“It is! That sounds wonderful! I'll be ready by the time you get here, so.... um, I'll see you then!”

“See you then! Bye now!” Applejack, hearing Fluttershy's goodbye, presses the red button to free her from the ramping anxiety that's built up in her from the moment she hit call, and sighs loud once she's sure the call's ended.

“Alright,” she says to herself. “This'll be fine. Just gotta get ready to go on and... oh wait a darn tootin' minute...” She realizes then something crucial.

She realizes, at long last, her plan, and if she thought she was anxious before, the feeling now that crushes through her chest reminds her of what true anxiety is.

“That's right... now that I set this all up... guess there's no choice but to try and tell her how I feel. But... how do I feel?”

She tries to think but the author is listening to ToTo or however the hell it's spelled. It's “Africa” and it's one step out of tune and off-key or something and all brains is useless.

But that's how it goes sometimes.

Applejack sighs. She tries to picture Fluttershy, and when she does, her breath gets light. She's wetting her lips and one moment.

Ahem.

FACE LIPS.

SNERRRRK.

Alright anyway.

She wets her lips, though she doesn't know why, so she thinks a little more, pushing the limits of her imagination.

Truth be told, it's not a thing she's pusehd often.

Holy damn.

It's not a thing she's PUSHED often.

She imagines the walk to come, and wonders what it would be like to hold Fluttershy's hand as they go.

She's sure she'd sweat, and she wonders if Fluttershy would mind.

Yet as she pictures it, her heart starts to beat faster and her breath seems to deepen, or perhaps she's just much more conscious of how her shoulders move, as if she's breathing hard.

Maybe she is.

“Okay... well that's sure... something,” Applejack mutters, unbuttoning her shirt and hucking it into the hamper to be dealt with when laundry day comes round again. She's a little surprised though; she usually wouldn't bother to change when going out with her friends.

She wonders at that. She wonders, too, why she changes out of her bra and into a new one, and a new wonder: why, oh why, would she pick the one single one she owns that has any trace of lace on it?

Strange, indeed.

Speaking of strange, the author has switched to Parade from Susumu Hirasawa. Much easier to think now, isn't it, Applejack?

Applejack doesn't answer the author. Applejack doesn't hear the author. Doesn't sense her presence, doesn't know her will.

As far as Applejack can tell, her will is her own, and right now, her will leads her to pick out her favorite denim shorts and her best boots. She even changes out her socks.

She passes by the cracked, dingy mirror in her bathroom and toys with the idea of makeup for just a split-second, but that split-second on its own is enough to give her more that a split-second of pause.

But if she can help it, Applejack's never late, so she sets out at once, her uncertainty and nervousness chasing her like the dark clouds of a thunderstorm, heavy with rain.

She's always liked the rain. When it's wanted, that is.

Thoughts swirl through her mind, confusing and worrying, all filled with little things she can't quite put a name to.

She's got a name for it overall, though, and it's not something she's terribly used to.

Yet when she arrives outside Fluttershy's house, she pushes those thoughts aside, and as if blessing her on the trials still to come, the sun shines down brightly on her as she approaches the door.

Sometimes, Applejack thinks to herself, hoping's all that matters.

So here's hoping.


Vaggie sighs and puts a hand on the doorknob, then thinks better of it.

For a moment.

But there's a job to do here at the Happy Hotel; for her and everyone else, though at the moment 'everyone else' consists solely of a manic maid, a grumpy drunk, and... one singular, sole actual client.

Who is unfortunately Angel Dust.

With Charlie answering an exceedingly rare summons by her mother—a summons that will almost certainly end in Charlie getting stood up, but which will nonetheless result in her being out of the hotel for a few too many hours—only Vaggie remains to interview the new hopeful.

Someone new, both to Hell and the Hotel.

She glances down at the clipboard in her hand, checking over the name of the newest soul to long—or claim to long—for redemption.

Sunset Shimmer, huh?

I wonder what her real name was, back when she was alive.

Usually isn't the same. Pretty obvious it's not the same this time.

She sighs again and this time makes it through the door. She throws a withering glare towards Husk, but he's otherwise occupied with the business end of a bottle of the cheapest grog Alastor could possibly summon. Vaggie thinks she sees Nifty zip between two rooms in the opposite wing of the hotel, and she doesn't see Angel Dust anywhere, which, while suspicious, is probably for the best at the moment.

Wouldn't want any corrupting influences endangering the success of their latest patron. Although the fact that such influences would most likely come from their only other patron isn't particularly heartening.

The one wildcard, as always, is Alastor, but Vaggie thinks she saw him leave quite a bit ago, and while she wouldn't put it past him to make his 'leaving' apparent for the sole purpose of surprising her later, she tries to hang onto the hope that maybe he just went off for a long stroll.

Preferably off a short boardwalk.

The only other one visible in the hotel lounge could only be her patron, and Vaggie already feels misgivings.

Granted, she accepts that she's not always the most optimistic; that's a quality her better half has in spades, enough for the both of them. And, very likely, the entire rest of Hell, for that matter.

Charlie is, if nothing else, optimistic, even in the worst circumstances.

But the new demon's wide, shimmering wings, like the reflection of fire on the vapors of a morning sea, give her a few moments of pause.

She's not even in her demon form. That's just...her walking-around, casual default.

What exactly did she do, to get a form like that?

Just how much havoc did this girl wreak?

She gets close, noting how the young woman's eyes are closed in thought. If it's reflection, that's a good sign.

If she's dozing off, well... at the very least, Vaggie's used to lazy.

“Hey,” Vaggie says awkwardly. She's never been the best at this sort of thing.

Talking. Dealing with people.

Talking.

The demon, Sunset, glances up, and Vaggie feels a bit of relief on noting, at the very least, that her eyes aren't the crazed, manic glare of so many others that roam the Ring of Pride.

“Oh!” Sunset stands and brushes herself off, and Vaggie's relief dims a bit and her nerves go on edge as she registers the demon's unusual height.

That, and the faint glow of white flame that seems to ring her wings when her attention's been roused.

“I'm Vaggie,” Vaggie says. She gives a forced grin that she knows isn't great, but it's the best she's got at the best of times, which, compared to everything else the last few days, even this situation might qualify as. “Uh, and you're... Sunset Shimmer.”

“Yeah! Just Sunset's fine though,” Sunset says, brushing some of her hair over an ear.

Or rather, Vaggie notes, brushing it back where a human's ear might normally be. This Sunset Shimmer, though, seems to have the relatively common trait of animal ears up on top of her head. Possibly a wolf's.

Perhaps a fox's.

“Great. Follow me, and we'll do this whole... interview thing.” Vaggie turns on the spot and clears her throat, clicking the pen in her hand a few too many times out of nervousness.

A few more wouldn't hurt though.

...just a few more.

She gives a huff as she opens the door to the office and heads around the side of the desk, sitting where Charlie would normally sit in such a situation.

Where she'd sit, if she'd be calm enough to sit.

I have to make her feel welcome. I can't just... me this into not working out. I want it to work.

I believe in her dreams.

I'm not great with talking, but... maybe I don't have to be.

“So,” Vaggie starts as Sunset takes a seat on the other side of the desk. She glances up and Sunset's smiling at her, so Vaggie chooses to believe, at the moment, that she hasn't fucked things up yet. “Alright Sunset, this will probably be... tough. Maybe. But even that'll tell me something...” Vaggie narrows her eyes and Sunset seems to tense up a bit, which in itself relaxes Vaggie. “Sunset, why do you think you're down here?”

Vaggie watches carefully, her finely trained instincts kicking in.

She's not great at people, sure. But she is great at reading them. It doesn't tell her what she should say next to not lead to a fight, and it sure doesn't tell her how not to get intensely pissed at whatever comes out of their dumb mouth, but if nothing else, this skill of reading people can tell her who's dangerous.

Sunset looks off to the side and her smile fades into a frown as her eyes unfocus. She looks like someone who lost something precious a long time ago and has just been reminded of it, while alone; someone whose quiet grief has long stopped smoldering in wasting flames.

She's naught but ash and smoke now, and Vaggie watches intensely for any sign of lingering embers of wrath and ruin.

“Well,” Sunset starts. “I've never been... you know. Super religious at all. Or even like... mildly religious. But... well, I'm pretty sure I heard somewhere that people get sent here if they... you know.” She gulps.

Vaggie waits.

So Sunset goes on. “If they... kill themselves.”

There it is, then.

Vaggie narrows her eyes just a bit but looks down and scribbles a quick note on the paper. She keeps scribbling a bit more nonsense though, not wanting her eyes to scare Sunset off and pretending her focus is on the paper entirely.

There it is, but... not all of what there is.

“I see.” Vaggie clears her throat and closes her eyes, trying to put on her best mask of empathy. It's not hard.

She does feel sorry for the girl.

But Hell has a way of hardening people, and until she knows for certain, she can't rule out the possibility of a lie.

Vaggie gives a small smile and nods. “I get it if it's hard for you to talk about, so we'll just move on. Was there anything else you might've done, that might've led you here?”

Sunset looks away and Vaggie sees a disturbing change come over the fiery-haired demon. Not flickering rage, not burning hate, not bitter denial.

Apathy. Cold, empty.

“I killed a lot of people,” Sunset says softly, and Vaggie's eye twitches.

“What, you don't think that could've been worth saying first?” Vaggie blurts out. She curses her hot-headedness but Sunset just sighs, a tired sound of exhaustion like Vaggie's never heard before.

“I dunno. I guess the way things turned out, it was almost like it never happened. But I remember it. We all remembered, me and the other girls. So maybe, in a way, it really did happen. Or maybe it doesn't matter either way. We made those choices. We believed we knew what we were doing, and 'what we were doing' was killing people.” She laughs, and now Vaggies catches a hint of bitterness, but it's a bitterness turned sharply inwards, like a dagger to one's own wrists. “Y'know, I could even raise people from the dead, and I only did it when it suited me.”

“There's only one person who can raise people from the dead,” Vaggie mutters and Sunset glances up with a questioning look, but Vaggie waves her hand. “Eh, nevermind. Just an... old story I heard once. Anyway, go on.”

Sunset looks down, holding her head up with the palm of one hand on her forehead while the other hand sits on her knee. “Wanna know what the messed up thing is?”

“Besides killing a lot of people?” Vaggie mouth once more moves before her brain can stop it, but Sunset gives that tired, bitter laugh again.

“Fair enough, but... the worst part is...” She looks up, and Vaggie spots an eerie fire in her eyes; not a literal one, like the ghostly wings of veiled flame that seem to blaze a searing heat in a dimension just barely out of phase with the current one. No, the fire she sees is the fire of desire, of manic want.

More dangerous than actual flames. At least, in the long run.

Sunset continues, her voice soft but fast, almost outrunning herself as she goes. “I'd do it again. All of it. All the killing, all the carnage. I'd do it again, a million times over and over again, neverending, if it meant...” Her voice cracks and she covers her eyes. She gives a sniffle, and that alarms Vaggie more than anything else thus far has. “If it meant I could have that time again. It was such a short time... but for just a bit, we had it all. More than that though...” Sunset looks up, the tears on her cheeks sending a trembling alarm through Vaggie. Sunset goes on, her voice almost a whisper. “We had... each other. We had so much... but we were together. And when it all ended... I think maybe... maybe I made a mistake. Maybe I could've had some tiny bit of that. But... I don't know. I guess I wanted more. For things to be different... even though they never could.”

Sunset hangs her head and sniffles for a time, wiping her tears away. Vaggie glances up and freezes in surprise.

In Sunset's wings, she sees it, though through a veil of smoke and flame. Death, debauchery, but underneath it all a desperate love.

She can't make out the details, but it's one hell of a gist. And the first thing that comes to Vaggie's mind is a simple, absolute truth:

This one's dangerous.

Vaggie waits a time but finally can't justify any more delay, and clears her throat, setting down the clipboard.

She knows that this could ruin them.

She knows what a desperate Sinner might do.

But she knows, more than that, her lover's greatest dream. And it's a dream that can't turn any away. Not those hopeless fools who never admit their wrongs; not those cunning crooks who are most certainly taking advantage of the hotel.

And not those who cry havoc, and let loose the dogs of war; who sing of oblivion and dance side-by-side with their dear pal annihilation.

“Are you sure you want redemption?” Vaggie asks; a genuine question.

Sunset looks up, her eyes uncertain. She sighs. “Something led me here. I think maybe it was.... something like nostalgia. For just a tiny moment... I think maybe I remembered something. Something I'd forgotten, a long, long time ago. And I think... if it's something I'd remembered in life, even though I'm not sure what it might be, still, I think maybe I wouldn't have... gone the same route.”

Vaggie closes her eyes, keeping herself from clenching them shut with all her might like she truly wants to right now; out of frustration, out of anxiety, out of the absolute certainty that she's damning them all by following Charlie's wishes to the letter. “If you're looking for redemption, then you'll always have a home here. Welcome to the Happy Hotel.” She opens her eyes and sees Sunset's eyes sparkle as she smiles.

“Thank you! I... I won't let you down!”

Vaggie tries a smile, and maybe she succeeds. “It's more about letting yourself down here. I'll show you to your room.”

Vaggie leads Sunset Shimmer down the hall, trying to comfort herself with the only positive she can see in letting all this happen.

At least Charlie would approve.

At least, today, I made a choice... for the sake of her dream.

She can't smile about it, but she feels a bit of warmth. And she hopes, against all hope, that it's the warmth of her love, and not a portent of things to come.


Adagio opens her eyes and unclasps her hands. To either side, her close friends do the same.

On one side, Aria.

On the other, Sonata.

As it has been for countless years, and as it shall always be; for as they've come to learn, their exile to this world granted them, at the the very least, immunity to the ravages of time.

They've found more power since they first came here, but they've lost it all every time, again and again. Yet each time they rise, stronger than before, if not in might then at least in resilience.

But it was not so with Sunset Shimmer.

Adagio glances down at the gravestone. Every year it seems a little more faded, a little more worn.

She spends some time just watching the drops of rain sliding down the edges of the hard stone, like tears.

Like her tears; like those of the others. Every year they come on the same day, to commemorate something dear to them.

Not the day they lost her, though perhaps in a way, it could be said they lost her that day. But they come to remember the day that spanned so much longer; the day undone.

The day they went to another world and found, in their madness, love and togetherness. And in the end, that day was all it was. All that time erased; those sins wiped clean, but while the warm memories remained, so too did the scars.

Adagio wonders if she made a mistake. If she could've staved off what would happen later, had she kept Sunset close.

But she suspects that the damage was too deep to undo by that point, and breathes those thoughts out like the tired sigh of lingering grief, near-healed but never all-gone.

“Where to after this?” Sonata asks. A fair question.

The day is young, still.

Adagio thinks for a moment. “If it wasn't raining, I'd say the beach...”

Aria turns as she pops open her umbrella and Sonata scooches in close underneath it. “I mean...I'd still be down. At least there wouldn't hardly be anyone there.”

“I love the ocean!” Sonata says. “I wonder if there'll be any taco stands?”

Adagio smiles and opens her own umbrella, popping it to block the rain. They all know they were crying; the rain's concealment of this is unnecessary. But rain will do as it does, and so too will the Dazzlings, weather be damned. “Only one way to find out.” She flashes them a smile and heads out.

On the way, as they do every year, they pass by Pinkie Pie as she heads to the same. Age has been kind to Pinkie, but she's not been kind to herself.

Still, she makes the journey every year, though the bags under her eyes never seem to diminish, and though, somehow, her bubblegum-pink hair stays pink but seems to fade, never quite going silver; only dimming, as if being layered-upon by a thin film of clear, dull plastic.

She nods to them and they nod back. They watch her for a few moments more, then head on to the beach.

Adagio knows that the sirens will keep the vigil, long after Pinkie Pie has left. She'll remember, always, what Sunset Shimmer forgot.

She'll remember, always, the magic they found, in madness and mayhem: the magic of friendship.


Applejack and Fluttershy kiss the strange object, and they're only a tiny bit disappointed that they don't get to kiss each other. Though after ten years of being together, they suppose they've had a good number of kisses.

Few million more couldn't hurt, but they'll let this one slide.

“Alright,” Adagio starts, as she has so many godforsaken times before, “with the kiss of true love by those native to this world, the Time Twirler, restored and amplified by our gems, which are themselves empowered by the dragon blood flowing in our veins, should be able to get us back to where we need to be.”

Appjeack, who thankfully doesn't realize how horribly I misspelled her name, takes Fluttershy's hands in hers and looks at Adagio worriedly. “And you're sure this'll work?”

“Of course not,” Adagio snarks. “But it's our best hope right now.”

“Uh,” Sonata...Sonata's. “What was the plan again?”

Adagio, holding back on commenting about how lazy it is of the narrator to get this exposition out in this manner (since neighter … holy moly... since neither AppfuckingAPEJACK nor Flatterfloof can hear the author and Adagio doesn't wanna look crazier), proceeds to exposition the fuck outta Sonata.

Having been expositiooned and now knowing the plan—yeah didn't expect that did ya Adagio?—Sonata recedes into her spot next to Aria. So she doesn't move.

I really should write more crackfics like this.

“Anyway,” Adagio goes one. Wow. She goes two next and three for the money, four to get ready and here we go!

She holds the Time Twirler high and her siren buddy boos get in close. Applejack and Fluttershy, embracing, watch.

Both are filled with hope; hope that the plan will work. Even though it might end up with them forgetting everything; even though they might not end up together. They know it's possible.

But they hold onto hope; hope that the Dazzlings will be able to change the past and prevent the loss of their devastating, world-shattering magical powers, and thus be able to live in infinite wealth in a big ol mansion where they all bang every day.

But Sunset Shimmer will be back. Alive and happy. And Pinkie Pie will be back to how she was, back when she could dance and singe. Also sing.

Back when she could smile.

Adagio activates the Time Twirler Gaiden XDF-1 (& Knuckles) and the Dazzlings find themselves there on that fateful day, ready to head out and get some fucking face crabs.

You know the ones I mean.

“Uh,” Sunset Shimmer starts, and it's oh so good to not have her in literal, actual Hell, isn't it? “W-wait, what?”

“Shutup!” Adagio covers her face as the Time Twirler and their attached gem pendants explode. Their cohorts in the current timeline (the gem pendants that is) also explode.

So let's get this clear. They didn't come back and find like...other THEMS. There's only one trio of Dazzlings. It's the good kind of time travel.

Moving.

On.

Sonata, remembering her job, tackles Pinkie Pie and, when Pinkie Pie inevitably thinks it's a game of wrestling (which is immediately) Sonata holds her super close and giggles, kissing Pinkie's Ear …

Son. Of . A BITCH.

Whatever, we''re in the final run boyos, let the errors ramp up!?*

“Aria, NOW!” Adagio yells. Aria flops onto the table and starts flopping harder like a fish lfop flop ldfkhslf and the errahrs inscrease. The author can't remember if they were fox girls. They probably were.

Yeah they probably were, right?

Okay so their fox girls, and -

“it's working!” Sonata fucks.

Wait.

Sunset Shomner takes Pankle poknk by the vageegee (good think I didn't smisspell vaggodle) and tries to shak...SHAWSKANK REDEMPTION Sonata off. Right? That's whre she is?

“Use your powers!” Adagio yells, grabbing at her bellybutton. They had like. Magic.

Heyyyyyy wait a minute-

“You see nothing!” Aria flops harder, then explodes out of her clothes for convenience's sake and gets all Skywalker Ranch up in her vanguard, moaning and whining with her foxy fox self, goading Sunjet Slamjammer into mounting her before she is the thinking.

How can you kil a god? Shame on you, sweet Nerevar.

“What's happening?” Pinkie Pie asks, for some reason. Everything's normal, U dinno what yer talkin' bout.

You ever just see a disaster start and you know you can't stop it but you can, at the very least, watch it get worse, and you do so, and you wonder if maybe there's something you could do, but if you do something now and you actually succeed in stopping it, then there'd be this question of “why didn't you stop this sooner?”

Well that's not what's happening here, I dunno what you mean.

“L-look, anyway-” Sunset starts abut. A-BUTTTT is what she's getting, Aria's butt, Aria grabs Sunset's facecheeks SNERKS and pulls her face close for a kiss.

“Nothing's happening, Sunset Shimmer. Now, about how you learned that you could awaken our secret magics.” Adagio jumps up onto Sunset's back. “I'm going to need you to go ahead and hear me tell you how to do it.”

“What? But don't you just-”

“Oh no,” Adagio says, and at long last she uses the power of retcons that once turned them from wolf girls into fox girls. “To give yourself the power of the dragonblood, awoken within these cursed beast forms that we inhabit, and to forever seal away the powers that might threaten to undo all that you've done, all you have to do,” Adagio goes on, “is take this finger of mine into your sweet, tight self and say 'this train has no brakes.'”

“...” Sunset says, fittingly.

But Adagio has never been one to wait. She pushes Sunset's head down while Sonata snuggles the crap outta Pinkie Pie, and jams her finger into Sunset's tight slit, wet from its closeness to Aria's whining, whimpering self.

Adagio then jams her thumb into Sunset's ass because she's goddamn Adagio.

“Say it,” Adagio growls. “Please. Listen to me. If you don't surrender those other powers, you'll lose everything.” She glances over at Pinkie. “You'll lose her. ”

“I'll...?” Sunset looks over at Pinkie and her eyes go wide. The shimmer of tears in them shines like shiny...things, and she turns back to Adagio. “Alright.”

“Say it,” Adagio whisper-please.

“C'mon, Sunset,” Aria says, snuggling her arms close to herself and licking at Sunset's chest.

“Heheheh you taste like sprinkles,” Sonata says to Pinkie Pie.

“Yeah well you taste like Aria,” Pinkie counters, perfectly slaying Sonata but not really. Just metaphorically.

“Alright,” Sunset says. “This train has no brakes.”

The biggest.

Baddest.

Wooomba-loomba-looos go all swibbidy-swappty all over the slap-flapping bedrolls that ever did moisten this side of your mom's last night stand at the old don't tell hotel where once an entire town was wiped out by orbital ion cannons, and maybe it was two towns but it's hard to tell these days when there's Anduin the Stormwind Crybaby and his horde of like two and or three dozen small train whistling freaks that just kinda roll on out of the tracks even though the whole idea of being railroaded is to prevent one from wandering side to side, still, despite it all, the three girls who are actually a unique monstous species (no racism) from a world of ponies and who got exiled to a human world that is the reflection of the pony world and a pony from the pony world who came to the human world that is the reflection of the pony world because she was like...

A fucking loser,

And then a human native to the reflection of the pony world (and who is a human) all cement, forever, their status as fox girls with dragon blood that allows them to use powerful magic, but not that which could set time back and thus ruin everything forever.

They get to keep their $1.7 million dollar T.V. and their dumb expensive mansion.

Adagio will get to make real her dream of waking up early and giving each girl a good morning kiss between sips of her tea.

Sonata will get to eat tacos and slap tacos and lick and kiss tacos and just generally get all sorts of laid, especially with Aria, who she loves and who loves her back.

And Aria, as the center of all sexual attention, will get so goddamn laid that she can't even like believe it with a hundred percent of her believables.

Sunset Shimmer will get to love all the rest, and especially Pinkie Pie, who, even though her love might not be exactly the same, who cares? Two peole who care deeply about one another, plus they get to bang. What more do you need?

And Pinkie, who never has to worry about gettnig a job. Wait she was a waitress.

Pinkie Pie, who gets to get laid and play around all the time forever.

“Uh, what just happened?” Sunset asks, taking her bowl of milk to the couch.

Adagio wangs to

…

Wadagio okay this is beyond repair.

Adagio wants to gloss over it all. To say “don't worry about it” and just keep on with their live as is.

She knows they'll end up okay in the end. Even when everything went wrong, the Dazzlings made it through, touring the country, every day an adventure.

But she thinks Sunset might be owed the truth.

“Sunset we came from the future using the Time Twirler you saw for a few moments. We turned time back so that we wouldn't lose...” she motions around, “All of this. In that future, we lost it all. Our powers, our fortunes. It was as if everything had been un-done.”

“Oh geez,” Sunset facepalms. “Was it Pinkie Pie?”

“It was you, ackshuuuulallaly,” Sonata...says?

“Me?” Sunset raises an eyebrow.

Adagio nods. “Yes. It was accidental, but using our Akemi Homura powers caused us to undo all that we'd done in Skyrim. After losing everything and being back in that van....Sunset...” Adagio sighs. “Sunset, in that timeline, you couldn't cope with it all. Sunset Shimmer, in that timeline, you killed yourself.”

Silence reigns for a time. Sunset stares. Aria caresses Sunset's ass. Adagio also caresses Sunset's ass, but from the inside.

Pinkie's quiet too, which is probably a bad sign. Or at the very least, a sign that things have gotten serious.

Sonata's suckling one of Pinkie's nipples because Sonata's a fucking champion.

gv

The author dorpped her keyboard don't worry about it. Anyway.

“That's...really, really not funny,” Sunset says, but she sees the painful truth in Adagio's eyes. “I...wow.”

“Yeah,” Aria says, slapping Adagio's hands out of Sunset Shimmer. “So...I mean, we didn't do it right away. Didn't think we could. But after so many years of seeing Pinkie Pie as we all...as we all visited your grave, and seeing her get more and more depressed year after year...”

“Then, one day,” Sonata says softly, kissing Pinkie's chest. “One day we didn't see her.”

“That was the last straw,” Adagio says, wrapping her arms up under Sunset's and laying her head on Sunset's hair. “We wanted this life back, Sunset Shimmer. We wanted this peace. This closeness. We wanted Pinkie to smile again, and...we wanted you back.”

“You...” Sunset starts but stops as the tears start to fall. “You really c-came back in time to...to save me?”

“Duh,” Sonata says, laughing. “We even gave up our gems to make it work.”

“Your...?” Sunset scrolls up a bunch and re-reads. “You did. But...but what did you do?”

“We're fox girls,” Adagio says, smorkily. “We have the blood of dragons, and all the magical spells we had in Skyrim. Without need of enchantments, we're just as impervious to harm as we were. And damn, are we rich.” Adagio looks around her mansion. “But more than all that, we're together. That's what we did, Sunset. We fixed it.”

“And...the author?” Sunset says, tempting fate.

Sonata chuckles. “We got her derping hard and had her write this.”

“Yeah,” Aria says with a laugh. “Her throat was scratchy so she downed too much sleepy time cough syrup and we saw a chance to set things right with retcons.”

“Wow,” Sunset says, laughing at the poor defenseless author. “And now we're all here, together. So...what'll we do?”

“Ooo, I know!” Pinkie leaps over to the cheese wheel and taps it on.

The other girls all join her on the couch, and together, in their multi-million-dollar mansion paid for with Skyrim loot that they got after getting isekai'd to Skyrim by a possibly-magical toaster and then getting their lives modded by Sheogorath and his magical Wabbajack of Wabbajackingoff, after all that, the fox girls sit on the couch and finger each other (and grind on Aria) while they watch interdimensional porn on their cheese wheel that is hooked up via an HDMI cable to a 370” 4k television.

Sunset looks over at Pinkie Pie. “You know...I'm really glad I kissed you.”

And they lived happily ever after. Godfuckingdamnitfinally.

The.

End.

SNERK`


console.log(nano.split(/[\.\n]/));

const markov = new MarkovChain(nano);

var anyWord = function(wordList) {
    var tmpList = Object.keys(wordList);
    return tmpList[~~(Math.random()*tmpList.length)]
}

var useUpperCase = function(wordList) {
    var tmpList = Object.keys(wordList).filter(function(word) {
        return word[0] >= 'A' && word[0] <= 'Z'
    })
    return tmpList[~~(Math.random()*tmpList.length)]
}
  

function generate() {
    var text = markov.start(useUpperCase).end(30).process();
    document.getElementById("nonsense").innerText = text;
}
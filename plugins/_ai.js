const { Alpha, mode, badWordDetect, elevenlabs, config, GPT } = require('../lib/');

Alpha({
    pattern: 'dalle',
    desc: 'generate image with ai',
    react: "🤩",
    type: "ai",
    fromMe: mode
}, async (message, match) => {
    match = match || message.reply_message.text;
    if (!match) return await message.reply('*_give me a text to generate ai image!_*');
    if (badWordDetect(match.toLowerCase())) return await message.send("_*Your request cannot be fulfilled due to the presence of obscene content in your message*_")
    return await message.sendReply(`https://api.gurusensei.workers.dev/dream?prompt=${encodeURIComponent(match)}`, {
            caption: "*result for* ```" + match + "```"
    }, "image");
});


Alpha({
    pattern: "gpt",
    desc: 'get open ai chatgpt response',
    type: "ai",
    fromMe: mode
}, async (message, match) => {
    if(match && match == 'clear') {
        await GPT.clear();
        return await message.reply('_successfully cleard_');
    }
    match = match || message.reply_message.text;
        if (!match) return await message.reply('_please can you provide me a task_');
        if(!config.OPEN_AI) {
         return await message.reply('*please set openai apikey in config*\n*${PREFIX}setvar OPEN_AI: sk........rbfb*');
        } 
        return await message.reply(await GPT.prompt(match));
});

Alpha(
    {
      pattern: "aitts",
      type: "ai",
      fromMe: mode,
      desc: "gernate ai voices",
    },
    async (message, match) => {
      if (match == "list")
        return await message.send(`╭「 *List of Aitts* 」
   ├ 1 _rachel_ 
   ├ 2 _clyde_ 
   ├ 3 _domi_ 
   ├ 4 _dave_ 
   ├ 5 _fin_ 
   ├ 6 _bella_ 
   ├ 7 _antoni_ 
   ├ 8 _thomas_ 
   ├ 9 _charlie_ 
   ├ 10 _emily_ 
   ├ 11 _elli_ 
   ├ 12 _callum_ 
   ├ 13 _patrick_ 
   ├ 14 _harry_ 
   ├ 15 _liam_ 
   ├ 16 _dorothy_ 
   ├ 17 _josh_ 
   ├ 18 _arnold_ 
   ├ 19 _charlotte_ 
   ├ 20 _matilda_ 
   ├ 21 _matthew_ 
   ├ 22 _james_ 
   ├ 23 _joseph_ 
   ├ 24 _jeremy_ 
   ├ 25 _michael_ 
   ├ 26 _ethan_ 
   ├ 27 _gigi_ 
   ├ 28 _freya_ 
   ├ 29 _grace_ 
   ├ 30 _daniel_ 
   ├ 31 _serena_ 
   ├ 32 _adam_ 
   ├ 33 _nicole_ 
   ├ 34 _jessie_ 
   ├ 35 _ryan_ 
   ├ 36 _sam_ 
   ├ 37 _glinda_ 
   ├ 38 _giovanni_ 
   ├ 39 _mimi_ 
   └`);
      const [v, k] = match.split(/,;|/);
      if (!k)
        return await message.send(
          `*_need voice id and text_*\n_example_\n\n_*aitts* hey vroh its a test,adam_\n_*aitts list*_`,
        );
      const stream = await elevenlabs(match);
      if (!stream)
        return await message.send(
          `_*please upgrade your api key*_\n_get key from http://docs.elevenlabs.io/api-reference/quick-start/introduction_\n_example_\n\nsetvar elvenlabs: your key\n_or update your config.js manually_`,
        );
      return await message.send(
        {
          stream,
        },
        {
          mimetype: "audio/mpeg",
        },
        "audio",
      );
    },
  );
  
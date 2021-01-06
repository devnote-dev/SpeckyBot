const fetch = require('node-fetch');

const badwords = fetch('https://raw.githubusercontent.com/RobertJGabriel/Google-profanity-words/master/list.txt')
.then(res => res.text())
.then(text => text.trimLeft().trimRight().split('\n'));

module.exports = (bot) => {

    bot.censureText = async (string) => {
        const censures = [
            bot.emotes.censure1,
            bot.emotes.censure2
        ];
        return string.replace(
            new RegExp(`(?<=\\b)(${(await badwords).join('|')})(?=\\b)`,'gi'),
            Array(Math.ceil(Math.random()*4))
            .fill('')
            .map(()=>censures.pick())
            .join('')
        )
    }

}

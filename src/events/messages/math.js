module.exports = {
    event: "cleanMessage"
}

const qdb = require('quick.db');
const usersettings = new qdb.table('usersettings');

module.exports.call = (bot, msg) => {
    if(!msg.content) return;
    if(!usersettings.get(`${msg.author.id}.math`)) return;

    const { result } = bot.matheval(msg.content, msg);

    const string = `${result}`;

    if(typeof string == 'undefined') return;
    if(string == msg.content) return;

    return msg.channel.send(`${string}`.slice(0,100).code('js'));
}

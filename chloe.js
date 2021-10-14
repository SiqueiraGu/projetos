const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.on("ready", () => {
    console.log(`Eu amooo demais a Chloe e estou pronto para dar muito amor para ela.`); 
});

client.on("guildCreate", guild => {
    console.log(`O bot entrou nos servidor: ${guild.name} (id: ${guild.id}). População: ${guild.memberCount} membros!`);
    client.user.setActivity(`Estou em ${client.guilds.size} servidores`);
});

client.on("guildDelete", guild => {
    console.log(`O bot foi removido do servidor: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on('raw', async dados => {
    if(dados.t !== "MESSAGE_REACTION_ADD" && dados.t !== "MESSAGE_REACTION_REMOVE") return
    if(dados.d.message_id != "871676826945208320") return

    let servidor = client.guilds.get("871676826945208320")
    let membro = servidor.members.get(dados.d.user_id)

    let cargo1 = servidor.roles.get('871678415659483186'),
        cargo2 = servidor.roles.get('871678535515914250'),
        cargo3 = servidor.roles.get('871678656618057788')

    if(dados.t === "MESSAGE_REACTION_ADD"){
        if(dados.d.emoji.id === "408795937834532882"){
            if(membro.roles.has(cargo1)) return
            membro.addRole(cargo1)
        }else if(dados.d.emoji.name === "810522793065709568"){
            if(membro.roles.has(cargo2)) return
            membro.addRole(cargo2)
        }else if(dados.d.emoji.id === "810522684831563797"){
            if(membro.roles.has(cargo3)) return
            membro.addRole(cargo3)
        }
    }
    if(dados.t === "MESSAGE_REACTION_REMOVE"){
        if(dados.d.emoji.id === "408795937834532882"){
            if(membro.roles.has(cargo1)) return
            membro.removeRole(cargo1)
        }else if(dados.d.emoji.name === "810522793065709568"){
            if(membro.roles.has(cargo2)) return
            membro.removeRole(cargo2)
        }else if(dados.d.emoji.id === "810522684831563797"){
            if(membro.roles.has(cargo3)) return
            membro.removeRole(cargo3)
        }
    }
});
    



client.on("message", async message => {
    if (message.author.bot) return;
    if(message.channel.type === "dm") return;

    const args = message.content.slic(config.prefix.length).trim().split(/ +/g);
    const comando = args.shift().toLowerCase();
    
    if(comando === "ping") {
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! A Latência é ${m.createdTimestamp - message.createdTimestamp}msContentScript. A Latência da API é ${Math.round(client.ping)}ms`);
    }

});

client.login(config.token);


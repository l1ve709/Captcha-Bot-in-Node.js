//
//*****************************************************************
//*    *                                                *          *
//*     *               _ _          _____ ___   ___  
//*   *       | / |_   ____|___  / _ \ / _ \ 
//*  *        | | \ \ / / _ \ / / | | | (_) |        *
//*     *     | | |\ V /  __// /| |_| |\__, |
//*   *       |_|_| \_/ \___/_/  \___/   /_/      *
//*      *                                                     *    *
//*    *          Contact Mail: businnes@l1ve709.com   *
//*   *            Contact to Instagram: l1ve709                *   *
//*      *            Developed by Ediz Sönmez                       *
//*****************************************************************
//




import pkg from 'discord.js';
const { Client, GatewayIntentBits, EmbedBuilder, AttachmentBuilder } = pkg;
import { createCanvas } from 'canvas';
import randomInt from 'random-int';
import { promisify } from 'util';

const sleep = promisify(setTimeout);

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

const config = {
    captchaChannelId: '1287812387147354204',
    verifiedRoleId: '1287485764908875919',
    logChannelId: '1287812387147354204'
};

client.once('ready', async () => {
    console.log(`${client.user.tag} active`);
});

function createCaptchaText() {
    const number1 = randomInt(10, 35);
    const number2 = randomInt(10, 35);
    const operator = '+';
    const sum = number1 + number2;
    return { captcha: `${number1} ${operator} ${number2} =`, result: sum };
}

async function createCaptchaImage(captchaText) {
    const canvas = createCanvas(300, 100);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '30px Arial';
    ctx.fillStyle = '#000';
    ctx.fillText(captchaText, 50, 50);

    for (let i = 0; i < 10; i++) {
        const startPoint = { x: randomInt(0, 300), y: randomInt(0, 100) };
        const endPoint = { x: randomInt(0, 300), y: randomInt(0, 100) };
        ctx.beginPath();
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(endPoint.x, endPoint.y);
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#000';
        ctx.stroke();
    }

    const buffer = canvas.toBuffer('image/png');
    return buffer;
}

client.on('guildMemberAdd', async member => {
    if (!config.captchaChannelId || !config.verifiedRoleId || !config.logChannelId) return;

    let captchaChannel, logChannel;

    try {
        captchaChannel = await client.channels.fetch(config.captchaChannelId);
    } catch (error) {
        console.error('Doğrulama kanalı bulunamadı:', error);
        return;
    }

    try {
        logChannel = await client.channels.fetch(config.logChannelId);
    } catch (error) {
        console.error('Log kanalı bulunamadı:', error);
        return;
    }

    if (!captchaChannel || !logChannel) {
        console.log("Geçici veya log kanalı bulunamadı.");
        return;
    }

    const role = await createOrGetUnverifiedRole(member.guild);
    await member.roles.add(role);

    const { captcha, result } = createCaptchaText();
    const imageBuffer = await createCaptchaImage(captcha);

    const embed = new EmbedBuilder()
        .setTitle(`Hoşgeldin ${member.guild.name}`)
        .setDescription(`${member}, sunucuya hoş geldin. Tam erişim sağlamak için işlemi çöz.`)
        .attachFiles([new AttachmentBuilder(imageBuffer, { name: 'captcha.png' })])
        .setImage('attachment://captcha.png')
        .setFooter({ text: member.guild.name, iconURL: member.guild.iconURL() });

    await captchaChannel.send({ embeds: [embed] });
});

async function createOrGetUnverifiedRole(guild) {
    const roleName = "Doğrulanmamış";
    let role = guild.roles.cache.find(r => r.name === roleName);
    if (!role) {
        role = await guild.roles.create({ name: roleName });
        guild.channels.cache.forEach(async channel => {
            if (channel.id !== config.captchaChannelId) {
                await channel.permissionOverwrites.create(role, {
                    VIEW_CHANNEL: false,
                    SEND_MESSAGES: false,
                });
            }
        });
    }
    return role;
}

client.on('messageCreate', async message => {
    if (!message.content.startsWith('*') || message.author.bot) return;

    const args = message.content.slice(1).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ayar') {
        const channel = message.mentions.channels.first();
        const role = message.mentions.roles.first();
        const logChannel = message.mentions.channels.last();

        if (!channel || !role || !logChannel) {
            return message.channel.send('Doğru bir kanal ve rol belirtin.');
        }

        config.captchaChannelId = channel.id;
        config.verifiedRoleId = role.id;
        config.logChannelId = logChannel.id;

        await message.channel.send(`✅ CAPTCHA kanalı **${channel.name}**, doğrulama rolü **${role.name}** ve log kanalı **${logChannel.name}** olarak ayarlandı.`);
    }

});

client.login('tokeni_yapıstır');  // YOUR TOKEN / // TOKENİN

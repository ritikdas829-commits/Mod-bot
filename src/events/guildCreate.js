import { Events } from 'discord.js';
import { logger } from '../utils/logger.js';
import { getGuildConfig, setGuildConfig } from '../services/config/guildConfig.js';

export default {
  name: Events.GuildCreate,
  async execute(guild, client) {
    try {
      logger.info('Bot joined guild', {
        event: 'guild.create',
        guildId: guild.id,
        guildName: guild.name,
        memberCount: guild.memberCount,
      });

      let config = await getGuildConfig(client, guild.id);
      
      // Agar naye server ke liye config nahi milti, toh ek default empty/base config set karein
      if (!config) {
        config = {
          guildId: guild.id,
          prefix: "/", // Aapka default prefix ya settings
          enabledCategories: [],
        };
      }

      await setGuildConfig(client, guild.id, config);
    } catch (error) {
      logger.error(`Error initializing guild ${guild?.id} on join:`, error);
    }
  },
};

import { registerPlugin } from '@capacitor/core';

export interface WhatsAppStickersPlugin {
  addToWhatsApp(options: {
    identifier: string;
    name: string;
    author: string;
    trayImage: string;
    stickers: string[];
  }): Promise<{ success: boolean }>;
}

export const WhatsAppStickers = registerPlugin<WhatsAppStickersPlugin>('WhatsAppStickers');

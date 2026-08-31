package com.mdarsalan.stickerly;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.ActivityNotFoundException;
import android.util.Base64;
import android.util.Log;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.io.File;
import java.io.FileOutputStream;

@CapacitorPlugin(name = "WhatsAppStickers")
public class WhatsAppPlugin extends Plugin {

    private static final String TAG = "WhatsAppPlugin";
    private static final int ADD_PACK = 200;

    @PluginMethod
    public void addToWhatsApp(PluginCall call) {
        try {
            String identifier = call.getString("identifier", "pack1");
            String name = call.getString("name", "Stickerly Pack");
            String publisher = call.getString("author", "Stickerly");
            
            String trayBase64 = call.getString("trayImage");
            JSArray stickers = call.getArray("stickers");
            
            if (stickers == null || stickers.length() < 3) {
                call.reject("WhatsApp requires at least 3 stickers in a pack.");
                return;
            }

            Context context = getContext();
            File packDir = new File(context.getFilesDir(), "stickers/" + identifier);
            
            // Clean old files
            if (packDir.exists()) {
                File[] files = packDir.listFiles();
                if (files != null) {
                    for (File f : files) f.delete();
                }
            }
            packDir.mkdirs();
            
            // Save tray image
            saveBase64ToFile(trayBase64, new File(packDir, "tray.webp"));
            
            // Save stickers
            for (int i = 0; i < stickers.length(); i++) {
                String base64 = stickers.getString(i);
                saveBase64ToFile(base64, new File(packDir, i + ".webp"));
            }
            
            // Save metadata to SharedPreferences
            SharedPreferences prefs = context.getSharedPreferences("sticker_pack_prefs", Context.MODE_PRIVATE);
            prefs.edit()
                .putString("identifier", identifier)
                .putString("name", name)
                .putString("publisher", publisher)
                .putString("trayImage", "tray.webp")
                .putInt("sticker_count", stickers.length())
                .apply();

            // Trigger WhatsApp Intent
            Intent intent = new Intent();
            intent.setAction("com.whatsapp.intent.action.ENABLE_STICKER_PACK");
            intent.putExtra("sticker_pack_id", identifier);
            intent.putExtra("sticker_pack_authority", context.getPackageName() + ".stickercontentprovider");
            intent.putExtra("sticker_pack_name", name);

            getActivity().startActivityForResult(intent, ADD_PACK);
            call.resolve(new JSObject().put("success", true));

        } catch (ActivityNotFoundException e) {
            call.reject("WhatsApp is not installed.");
        } catch (Exception e) {
            Log.e(TAG, "Error", e);
            call.reject("Error: " + e.getMessage());
        }
    }
    
    private void saveBase64ToFile(String base64Str, File file) throws Exception {
        if (base64Str == null) return;
        if (base64Str.contains(",")) {
            base64Str = base64Str.split(",")[1];
        }
        byte[] decodedBytes = Base64.decode(base64Str, Base64.DEFAULT);
        FileOutputStream fos = new FileOutputStream(file);
        fos.write(decodedBytes);
        fos.flush();
        fos.close();
    }
}

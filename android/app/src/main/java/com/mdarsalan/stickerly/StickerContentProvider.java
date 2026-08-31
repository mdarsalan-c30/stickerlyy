package com.mdarsalan.stickerly;

import android.content.ContentProvider;
import android.content.ContentValues;
import android.content.Context;
import android.content.SharedPreferences;
import android.content.UriMatcher;
import android.content.res.AssetFileDescriptor;
import android.database.Cursor;
import android.database.MatrixCursor;
import android.net.Uri;
import android.os.ParcelFileDescriptor;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.List;

public class StickerContentProvider extends ContentProvider {

    public static final String AUTHORITY = "com.mdarsalan.stickerly.stickercontentprovider";
    public static final String METADATA = "metadata";
    public static final String STICKERS = "stickers";

    private static final UriMatcher MATCHER = new UriMatcher(UriMatcher.NO_MATCH);
    private static final int METADATA_CODE = 1;
    private static final int STICKERS_CODE = 2;
    private static final int STICKERS_ASSET_CODE = 3;

    static {
        MATCHER.addURI(AUTHORITY, METADATA, METADATA_CODE);
        MATCHER.addURI(AUTHORITY, STICKERS + "/*", STICKERS_CODE);
        MATCHER.addURI(AUTHORITY, STICKERS + "/*/*", STICKERS_ASSET_CODE);
    }

    @Override
    public boolean onCreate() {
        return true;
    }

    @Nullable
    @Override
    public Cursor query(@NonNull Uri uri, @Nullable String[] projection, @Nullable String selection, @Nullable String[] selectionArgs, @Nullable String sortOrder) {
        int code = MATCHER.match(uri);
        if (code == METADATA_CODE) {
            return getPackMetadata();
        } else if (code == STICKERS_CODE) {
            return getStickers(uri.getLastPathSegment());
        }
        return null;
    }

    private Cursor getPackMetadata() {
        MatrixCursor cursor = new MatrixCursor(new String[]{
                "sticker_pack_identifier", "sticker_pack_name", "sticker_pack_publisher", "sticker_pack_icon",
                "android_play_store_link", "ios_app_download_link", "sticker_pack_publisher_email",
                "sticker_pack_publisher_website", "sticker_pack_privacy_policy_website",
                "sticker_pack_license_agreement_website", "image_data_version", "whatsapp_will_not_cache_stickers",
                "animated_sticker_pack"
        });

        SharedPreferences prefs = getContext().getSharedPreferences("sticker_pack_prefs", Context.MODE_PRIVATE);
        String identifier = prefs.getString("identifier", "pack1");
        String name = prefs.getString("name", "Stickerly Pack");
        String publisher = prefs.getString("publisher", "Stickerly");
        String trayImage = prefs.getString("trayImage", "tray.webp");
        
        // WhatsApp requires this specific format
        cursor.addRow(new Object[]{
                identifier, name, publisher, trayImage,
                "", "", "", "", "", "", "1", 0, 0
        });

        return cursor;
    }

    private Cursor getStickers(String identifier) {
        MatrixCursor cursor = new MatrixCursor(new String[]{"sticker_file_name", "sticker_emoji"});
        SharedPreferences prefs = getContext().getSharedPreferences("sticker_pack_prefs", Context.MODE_PRIVATE);
        
        String savedId = prefs.getString("identifier", "pack1");
        if (!savedId.equals(identifier)) return cursor;

        int count = prefs.getInt("sticker_count", 0);
        for (int i = 0; i < count; i++) {
            cursor.addRow(new Object[]{ i + ".webp", "😄" });
        }
        return cursor;
    }

    @Nullable
    @Override
    public AssetFileDescriptor openAssetFile(@NonNull Uri uri, @NonNull String mode) throws FileNotFoundException {
        int matchCode = MATCHER.match(uri);
        if (matchCode == STICKERS_ASSET_CODE) {
            List<String> pathSegments = uri.getPathSegments();
            if (pathSegments.size() == 3) {
                String identifier = pathSegments.get(1);
                String fileName = pathSegments.get(2);
                
                File dir = new File(getContext().getFilesDir(), "stickers/" + identifier);
                File file = new File(dir, fileName);
                
                if (file.exists()) {
                    return new AssetFileDescriptor(ParcelFileDescriptor.open(file, ParcelFileDescriptor.MODE_READ_ONLY), 0, AssetFileDescriptor.UNKNOWN_LENGTH);
                }
            }
        }
        return super.openAssetFile(uri, mode);
    }

    @Nullable
    @Override
    public String getType(@NonNull Uri uri) {
        int matchCode = MATCHER.match(uri);
        if (matchCode == METADATA_CODE) return "vnd.android.cursor.dir/vnd." + AUTHORITY + "." + METADATA;
        if (matchCode == STICKERS_CODE) return "vnd.android.cursor.dir/vnd." + AUTHORITY + "." + STICKERS;
        if (matchCode == STICKERS_ASSET_CODE) return "image/webp";
        return null;
    }

    @Nullable
    @Override
    public Uri insert(@NonNull Uri uri, @Nullable ContentValues values) { return null; }
    @Override
    public int delete(@NonNull Uri uri, @Nullable String selection, @Nullable String[] selectionArgs) { return 0; }
    @Override
    public int update(@NonNull Uri uri, @Nullable ContentValues values, @Nullable String selection, @Nullable String[] selectionArgs) { return 0; }
}


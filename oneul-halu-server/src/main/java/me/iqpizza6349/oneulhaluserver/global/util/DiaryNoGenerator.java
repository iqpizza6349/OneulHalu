package me.iqpizza6349.oneulhaluserver.global.util;

import java.util.Date;
import java.util.concurrent.ThreadLocalRandom;

public final class DiaryNoGenerator {

    public static String generate() {
        int randomNo = ThreadLocalRandom.current()
                .nextInt(900000) + 100000;
        return String.format("%tY%<tm%<td%<tH-%d", new Date(), randomNo);
    }
}

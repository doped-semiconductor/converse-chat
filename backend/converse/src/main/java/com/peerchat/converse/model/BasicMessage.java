package com.peerchat.converse.model;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BasicMessage {
    private String sender;
    private String text;
    private MessageType type;

    @Override
    public String toString() {
        return "\nBasicMessage{" +
                "sender='" + sender + '\'' +
                ", text='" + text + '\'' +
                ", type=" + type +
                '}';
    }
}

package com.peerchat.converse.service;

import java.util.Random;

import com.peerchat.converse.entity.Room;
import com.peerchat.converse.repo.RoomRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class RandomNumberGenerator {

    @Autowired
    private RoomRepo roomRepo;

    private int generateRandomSixDigitNumber() {
        Random random = new Random();
        return random.nextInt(900000) + 100000;
    }

    public String generateValidRoomID(){
        int x = 0;
        while(x<500){
            int gen = generateRandomSixDigitNumber();
//            System.out.println("Generated: "+gen);
            Room r = roomRepo.findByName(gen);
//            System.out.println("Room: "+r);
            if(roomRepo.findByName(gen)==null){
                return String.valueOf(gen);
            }
            x++;
        }
        return "";
    }
}

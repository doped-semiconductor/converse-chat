package com.peerchat.converse.repo;

import com.peerchat.converse.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepo extends JpaRepository<Room, Integer> {
    Room findByName(Integer name);
}

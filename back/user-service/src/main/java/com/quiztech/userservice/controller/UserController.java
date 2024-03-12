package com.quiztech.userservice.controller;

import com.quiztech.userservice.dto.UserRequest;
import com.quiztech.userservice.utils.Response;
import org.apache.http.protocol.ResponseServer;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Set;

public interface UserController {
    @PostMapping("add")
    ResponseEntity<Response> add(@RequestBody UserRequest request);
    @PutMapping("update")
    ResponseEntity<Response> update(@RequestBody UserRequest request);
    @GetMapping("get/{email}")
    ResponseEntity<Response> get(@PathVariable String email);
    @GetMapping("all")
    ResponseEntity<Response> all();
    @DeleteMapping("delete/{id}")
    @PreAuthorize("hasRole('ROLE_app_admin')")
    ResponseEntity<Response> delete(@PathVariable String id);

    @PatchMapping("subscribe")
    ResponseEntity<Response> toSubscribe(@RequestBody Map<String, String> email);
    @PatchMapping("unsubscribe")
    ResponseEntity<Response> unsubscribe(@RequestBody Map<String, String> email);
    @PatchMapping("add-role")
    @PreAuthorize("hasRole('ROLE_app_admin')")
    ResponseEntity<Response> addRole(@RequestBody Map<String, String> roles);
    @PatchMapping("remove-role")
    @PreAuthorize("hasRole('ROLE_app_admin')")
    ResponseEntity<Response> removeRole(@RequestBody Map<String, String> roles);
}

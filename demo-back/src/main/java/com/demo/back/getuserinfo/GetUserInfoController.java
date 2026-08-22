package com.demo.back.getuserinfo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3001")
public class GetUserInfoController {

    private final UserInfoResponse userInfoResponse;

    public GetUserInfoController(
            @Value("${demo.user.name}") String name,
            @Value("${demo.user.age}") int age,
            @Value("${demo.user.phone}") String phone,
            @Value("${demo.user.signup-date}") String signupDate,
            @Value("${demo.user.signup-ip}") String signupIp,
            @Value("${demo.user.device-os}") String deviceOs
    ) {
        this.userInfoResponse = new UserInfoResponse(
                name,
                age,
                phone,
                signupDate,
                signupIp,
                deviceOs
        );
    }

    @GetMapping({"/api/user-info", "/getuserinfo"})
    public UserInfoResponse getUserInfo() {
        return userInfoResponse;
    }
}
